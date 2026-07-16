(() => {
  const tabs = [...document.querySelectorAll('.access-tab')];
  const panels = [...document.querySelectorAll('.access-tab-panel')];
  const formsWrap = document.querySelector('#access-forms');
  const sessionCard = document.querySelector('#session-card');
  const sessionTitle = document.querySelector('#session-title');
  const sessionText = document.querySelector('#session-text');
  const continueLink = document.querySelector('#continue-link');

  function selectTab(tab) {
    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', active ? 'true' : 'false');
      item.tabIndex = active ? 0 : -1;
    });
    panels.forEach((panel) => {
      const active = panel.id === tab.getAttribute('aria-controls');
      panel.classList.toggle('is-active', active);
      panel.hidden = !active;
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const nextIndex = event.key === 'ArrowRight'
        ? (index + 1) % tabs.length
        : (index - 1 + tabs.length) % tabs.length;
      selectTab(tabs[nextIndex]);
      tabs[nextIndex].focus();
    });
  });

  document.querySelectorAll('.access-password-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const input = document.getElementById(button.dataset.target || '');
      if (!(input instanceof HTMLInputElement)) return;
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      button.textContent = show ? '隐藏' : '显示';
      button.setAttribute('aria-pressed', show ? 'true' : 'false');
    });
  });

  function safeNext(role) {
    const requested = new URLSearchParams(window.location.search).get('next') || '';
    const fallback = role === 'admin' ? '/admin/' : '/team/';
    if (!requested.startsWith('/') || requested.startsWith('//') || requested.includes('\\')) return fallback;
    try {
      const target = new URL(requested, window.location.origin);
      if (target.origin !== window.location.origin) return fallback;
      const allowed = role === 'admin'
        ? target.pathname.startsWith('/admin/') || target.pathname.startsWith('/team/')
        : target.pathname.startsWith('/team/');
      return allowed ? `${target.pathname}${target.search}${target.hash}` : fallback;
    } catch {
      return fallback;
    }
  }

  async function requestJson(path, options = {}) {
    const response = await fetch(path, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    });
    let data = {};
    try { data = await response.json(); } catch { data = {}; }
    if (!response.ok) throw new Error(data.error || '访问服务暂时不可用');
    return data;
  }

  async function submit(form, mode) {
    const error = document.querySelector(`#${mode}-error`);
    const submitButton = form.querySelector('button[type="submit"]');
    error.hidden = true;
    submitButton.disabled = true;
    submitButton.textContent = '正在验证';
    const fields = new FormData(form);
    const payload = mode === 'admin'
      ? { username: fields.get('username'), password: fields.get('password') }
      : { password: fields.get('password') };
    try {
      const result = await requestJson(`/api/auth/${mode}-login`, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      window.location.assign(safeNext(result.role));
    } catch (reason) {
      error.textContent = reason instanceof Error ? reason.message : '验证失败，请稍后再试';
      error.hidden = false;
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = mode === 'admin' ? '安全登录' : '验证并进入';
    }
  }

  document.querySelector('#team-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    submit(event.currentTarget, 'team');
  });
  document.querySelector('#admin-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    submit(event.currentTarget, 'admin');
  });

  document.querySelector('#access-logout')?.addEventListener('click', async () => {
    try { await requestJson('/api/auth/logout', { method: 'POST', body: '{}' }); } catch { /* noop */ }
    window.location.reload();
  });

  requestJson('/api/auth/session')
    .then((session) => {
      if (!session.authenticated) return;
      formsWrap.hidden = true;
      sessionCard.hidden = false;
      sessionTitle.textContent = session.role === 'admin' ? '管理员身份有效' : '团队身份有效';
      sessionText.textContent = '当前登录状态有效，可以继续进入受控入口。';
      continueLink.href = safeNext(session.role);
    })
    .catch(() => {});
})();
