import assert from 'node:assert/strict';
import worker from '../public/_worker.js';

const origin = 'https://example.test';
const baseEnv = {
  TEAM_PASSWORD: 'team-test-password',
  ADMIN_USER: 'admin-test-user',
  ADMIN_PASSWORD: 'admin-test-password',
  SESSION_SECRET: 'test-session-secret-with-sufficient-length',
  ASSETS: {
    fetch(request) {
      const path = new URL(request.url).pathname;
      return Promise.resolve(new Response(`asset:${path}`, {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=UTF-8' },
      }));
    },
  },
};

const pending = [];
const context = {
  waitUntil(promise) {
    pending.push(Promise.resolve(promise));
  },
};

function request(path, init = {}) {
  return new Request(`${origin}${path}`, init);
}

async function call(path, init = {}, env = baseEnv) {
  return worker.fetch(request(path, init), env, context);
}

async function login(path, body, ip) {
  return call(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: origin,
      'CF-Connecting-IP': ip,
    },
    body: JSON.stringify(body),
  });
}

function cookieFrom(response) {
  return response.headers.get('Set-Cookie')?.split(';')[0] || '';
}

async function run() {
  let response = await call('/');
  assert.equal(response.status, 200, '公开首页应允许访客访问');
  assert.equal(await response.text(), 'asset:/');
  assert.equal(response.headers.get('X-Content-Type-Options'), 'nosniff');

  response = await call('/fde/');
  assert.equal(response.status, 200, '公开 FDE 内容应允许访客访问');

  response = await call('/access', { redirect: 'manual' });
  assert.equal(response.status, 302);
  assert.equal(response.headers.get('Location'), `${origin}/access/`);

  response = await call('/access/');
  assert.equal(response.status, 200, '登录页应公开可访问');

  response = await call('/team/', { redirect: 'manual' });
  assert.equal(response.status, 302, '访客访问团队入口应跳转登录');
  assert.equal(response.headers.get('Location'), `${origin}/access/?next=%2Fteam%2F`);

  response = await login('/api/auth/team-login', { password: 'wrong' }, '203.0.113.10');
  assert.equal(response.status, 401, '错误团队口令应被拒绝');

  response = await login('/api/auth/team-login', { password: baseEnv.TEAM_PASSWORD }, '203.0.113.11');
  assert.equal(response.status, 200, '正确团队口令应登录成功');
  assert.match(response.headers.get('Set-Cookie') || '', /HttpOnly/);
  assert.match(response.headers.get('Set-Cookie') || '', /Secure/);
  assert.match(response.headers.get('Set-Cookie') || '', /SameSite=Lax/);
  const teamCookie = cookieFrom(response);

  response = await call('/api/auth/session', { headers: { Cookie: teamCookie } });
  assert.equal(response.headers.get('X-Content-Type-Options'), 'nosniff');
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  assert.equal((await response.json()).role, 'team');

  response = await call('/team/', { headers: { Cookie: teamCookie } });
  assert.equal(response.status, 200, '团队身份应能访问团队入口');
  assert.equal(response.headers.get('Cache-Control'), 'no-store');

  response = await call('/admin/', { headers: { Cookie: teamCookie }, redirect: 'manual' });
  assert.equal(response.status, 302, '团队身份不能进入管理员页');
  assert.equal(response.headers.get('Location'), `${origin}/team/`);

  response = await login('/api/auth/admin-login', {
    username: baseEnv.ADMIN_USER,
    password: baseEnv.ADMIN_PASSWORD,
  }, '203.0.113.12');
  assert.equal(response.status, 200, '正确管理员凭证应登录成功');
  const adminCookie = cookieFrom(response);

  response = await call('/admin/', { headers: { Cookie: adminCookie } });
  assert.equal(response.status, 200, '管理员应能访问管理状态页');

  response = await call('/api/admin/overview', { headers: { Cookie: adminCookie } });
  assert.equal(response.status, 200);
  const overview = await response.json();
  assert.equal(overview.teamAccessConfigured, true);
  assert.equal(overview.adminAccessConfigured, true);
  assert.equal(overview.sessionHours, 12);

  response = await call('/api/auth/logout', {
    method: 'POST',
    headers: { Cookie: adminCookie, Origin: origin },
  });
  assert.equal(response.status, 200);
  assert.match(response.headers.get('Set-Cookie') || '', /Max-Age=0/);

  response = await login('/api/auth/team-login', { password: baseEnv.TEAM_PASSWORD }, '203.0.113.13');
  assert.equal(response.status, 200);

  response = await call('/api/auth/team-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: 'https://evil.test' },
    body: JSON.stringify({ password: baseEnv.TEAM_PASSWORD }),
  });
  assert.equal(response.status, 403, '跨站登录请求应被拒绝');

  response = await call('/api/auth/team-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: origin },
    body: '{invalid',
  });
  assert.equal(response.status, 400, '无效 JSON 应返回明确错误');

  response = await call('/api/auth/team-login', { method: 'GET' });
  assert.equal(response.status, 405, '登录接口只允许 POST');

  const missingSecrets = { ...baseEnv, TEAM_PASSWORD: '' };
  response = await call('/api/auth/team-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: origin, 'CF-Connecting-IP': '203.0.113.15' },
    body: JSON.stringify({ password: 'anything' }),
  }, missingSecrets);
  assert.equal(response.status, 503, '缺少 Secret 时受控入口应安全失败');
  response = await call('/', {}, missingSecrets);
  assert.equal(response.status, 200, '缺少 Secret 不应影响公开站');

  await Promise.all(pending);
  console.log('Access worker tests passed: public, team, admin, logout and failure boundaries.');
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
