const SESSION_COOKIE = 'wip_session';
const SESSION_MAX_AGE = 12 * 60 * 60;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 8;
const AUDIT_RETENTION_SECONDS = 30 * 24 * 60 * 60;
const attempts = new Map();
const encoder = new TextEncoder();

function json(data, init = {}) {
  const headers = new Headers(init.headers);
  headers.set('Content-Type', 'application/json; charset=UTF-8');
  headers.set('Cache-Control', 'no-store');
  return applySecurityHeaders(new Response(JSON.stringify(data), { ...init, headers }), true);
}

function base64UrlEncode(value) {
  const bytes = typeof value === 'string' ? encoder.encode(value) : value;
  let binary = '';
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/g, '');
}

function base64UrlDecode(value) {
  const normalized = value.replaceAll('-', '+').replaceAll('_', '/');
  const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
  return atob(padded);
}

async function hmac(value, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  return new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(value)));
}

async function safeEqual(left, right) {
  const [a, b] = await Promise.all([
    crypto.subtle.digest('SHA-256', encoder.encode(String(left ?? ''))),
    crypto.subtle.digest('SHA-256', encoder.encode(String(right ?? ''))),
  ]);
  const x = new Uint8Array(a);
  const y = new Uint8Array(b);
  let result = 0;
  for (let index = 0; index < x.length; index += 1) result |= x[index] ^ y[index];
  return result === 0;
}

function readCookie(request, name) {
  const source = request.headers.get('Cookie') || '';
  for (const part of source.split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key === name) return rest.join('=');
  }
  return '';
}

async function createSession(role, secret) {
  const now = Math.floor(Date.now() / 1000);
  const payload = base64UrlEncode(JSON.stringify({ role, iat: now, exp: now + SESSION_MAX_AGE }));
  const signature = base64UrlEncode(await hmac(payload, secret));
  return `${payload}.${signature}`;
}

async function verifySession(request, secret) {
  if (!secret) return null;
  const token = readCookie(request, SESSION_COOKIE);
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;
  const expected = base64UrlEncode(await hmac(payload, secret));
  if (!(await safeEqual(signature, expected))) return null;
  try {
    const data = JSON.parse(base64UrlDecode(payload));
    if (!data.exp || data.exp <= Math.floor(Date.now() / 1000)) return null;
    if (!['team', 'admin'].includes(data.role)) return null;
    return data;
  } catch {
    return null;
  }
}

function sessionCookie(token) {
  return `${SESSION_COOKIE}=${token}; Path=/; Max-Age=${SESSION_MAX_AGE}; HttpOnly; Secure; SameSite=Lax`;
}

function clearSessionCookie() {
  return `${SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;
}

function clientKey(request, mode) {
  return `${request.headers.get('CF-Connecting-IP') || 'unknown'}:${mode}`;
}

function maskedIp(request) {
  const value = request.headers.get('CF-Connecting-IP') || 'unknown';
  if (value.includes('.')) return value.replace(/\.\d+$/, '.*');
  if (value.includes(':')) return `${value.split(':').slice(0, 3).join(':')}:*`;
  return value;
}

async function recordAudit(env, request, event) {
  if (!env.WIP_ACCESS_AUDIT) return;
  const now = Date.now();
  const reverseTime = String(9_999_999_999_999 - now).padStart(13, '0');
  const key = `audit:${reverseTime}:${crypto.randomUUID()}`;
  await env.WIP_ACCESS_AUDIT.put(key, JSON.stringify({
    time: new Date(now).toISOString(),
    ip: maskedIp(request),
    userAgent: (request.headers.get('User-Agent') || '未知设备').slice(0, 160),
    ...event,
  }), { expirationTtl: AUDIT_RETENTION_SECONDS });
}

async function recentAuditEvents(env, limit = 30) {
  if (!env.WIP_ACCESS_AUDIT) return [];
  const listed = await env.WIP_ACCESS_AUDIT.list({ prefix: 'audit:', limit });
  const values = await Promise.all(
    listed.keys.map((item) => env.WIP_ACCESS_AUDIT.get(item.name, 'json')),
  );
  return values.filter(Boolean);
}

function getAttemptState(request, mode) {
  const key = clientKey(request, mode);
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || now - current.startedAt > LOGIN_WINDOW_MS) {
    const fresh = { count: 0, startedAt: now };
    attempts.set(key, fresh);
    return { key, state: fresh };
  }
  return { key, state: current };
}

function checkOrigin(request) {
  const origin = request.headers.get('Origin');
  return !origin || origin === new URL(request.url).origin;
}

async function readBody(request) {
  try {
    const length = Number(request.headers.get('Content-Length') || 0);
    if (length > 4096) return null;
    return await request.json();
  } catch {
    return null;
  }
}

async function handleLogin(request, env, mode, context) {
  if (request.method !== 'POST') return json({ error: '请求方式不支持' }, { status: 405 });
  if (!checkOrigin(request)) return json({ error: '请求来源无效' }, { status: 403 });

  const { key, state } = getAttemptState(request, mode);
  if (state.count >= LOGIN_MAX_ATTEMPTS) {
    return json({ error: '尝试次数过多，请 15 分钟后再试' }, { status: 429 });
  }

  const body = await readBody(request);
  if (!body) return json({ error: '登录信息格式无效' }, { status: 400 });

  const teamPassword = env.TEAM_PASSWORD;
  const adminUser = env.ADMIN_USER;
  const adminPassword = env.ADMIN_PASSWORD;
  const sessionSecret = env.SESSION_SECRET;
  if (!teamPassword || !adminUser || !adminPassword || !sessionSecret) {
    return json({ error: '团队入口尚未完成服务端配置' }, { status: 503 });
  }

  const valid = mode === 'admin'
    ? (await safeEqual(body.username, adminUser)) && (await safeEqual(body.password, adminPassword))
    : await safeEqual(body.password, teamPassword);

  if (!valid) {
    state.count += 1;
    attempts.set(key, state);
    context?.waitUntil(recordAudit(env, request, { action: 'login', role: mode, success: false }));
    return json(
      { error: mode === 'admin' ? '管理员账号或密码不正确' : '团队访问口令不正确' },
      { status: 401 },
    );
  }

  attempts.delete(key);
  const role = mode === 'admin' ? 'admin' : 'team';
  const token = await createSession(role, sessionSecret);
  context?.waitUntil(recordAudit(env, request, { action: 'login', role, success: true }));
  return json({ authenticated: true, role }, { headers: { 'Set-Cookie': sessionCookie(token) } });
}

function applySecurityHeaders(response, noStore = false) {
  const headers = new Headers(response.headers);
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'SAMEORIGIN');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  if (noStore) headers.set('Cache-Control', 'no-store');
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function redirectToAccess(request) {
  const source = new URL(request.url);
  const target = new URL('/access/', source.origin);
  target.searchParams.set('next', `${source.pathname}${source.search}`);
  return Response.redirect(target.toString(), 302);
}

function isProtectedPath(pathname, prefix) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export default {
  async fetch(request, env, context) {
    const url = new URL(request.url);
    const session = await verifySession(request, env.SESSION_SECRET);

    if (url.pathname === '/api/auth/session') {
      return json({
        authenticated: Boolean(session),
        role: session?.role || 'guest',
        label: session?.role === 'admin' ? '管理员' : session?.role === 'team' ? '团队成员' : '访客',
        user: session?.role === 'admin' ? (env.ADMIN_USER || '') : '',
      });
    }
    if (url.pathname === '/api/auth/team-login') return handleLogin(request, env, 'team', context);
    if (url.pathname === '/api/auth/admin-login') return handleLogin(request, env, 'admin', context);
    if (url.pathname === '/api/auth/logout') {
      if (request.method !== 'POST') return json({ error: '请求方式不支持' }, { status: 405 });
      if (!checkOrigin(request)) return json({ error: '请求来源无效' }, { status: 403 });
      if (session) {
        context?.waitUntil(recordAudit(env, request, { action: 'logout', role: session.role, success: true }));
      }
      return json({ authenticated: false }, { headers: { 'Set-Cookie': clearSessionCookie() } });
    }

    if (url.pathname === '/api/admin/overview') {
      if (session?.role !== 'admin') return json({ error: '仅管理员可以查看' }, { status: 403 });
      return json({
        auditEnabled: Boolean(env.WIP_ACCESS_AUDIT),
        teamAccessConfigured: Boolean(env.TEAM_PASSWORD),
        adminAccessConfigured: Boolean(env.ADMIN_USER && env.ADMIN_PASSWORD),
        sessionHours: SESSION_MAX_AGE / 3600,
        rateLimit: LOGIN_MAX_ATTEMPTS,
        logRetentionDays: AUDIT_RETENTION_SECONDS / 86400,
        events: await recentAuditEvents(env),
      });
    }

    if (url.pathname === '/access' || url.pathname === '/access.html') {
      return Response.redirect(new URL('/access/', url.origin).toString(), 302);
    }

    if (url.pathname === '/team') {
      return Response.redirect(new URL('/team/', url.origin).toString(), 302);
    }
    if (isProtectedPath(url.pathname, '/team') && !session) return redirectToAccess(request);

    if (url.pathname === '/admin') {
      return Response.redirect(new URL('/admin/', url.origin).toString(), 302);
    }
    if (isProtectedPath(url.pathname, '/admin')) {
      if (!session) return redirectToAccess(request);
      if (session.role !== 'admin') {
        return url.pathname === '/admin/'
          ? Response.redirect(new URL('/team/', url.origin).toString(), 302)
          : json({ error: '仅管理员可以访问' }, { status: 403 });
      }
    }

    const response = await env.ASSETS.fetch(request);
    const protectedResponse = isProtectedPath(url.pathname, '/team') || isProtectedPath(url.pathname, '/admin');
    return applySecurityHeaders(response, protectedResponse);
  },
};
