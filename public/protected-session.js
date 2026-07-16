(() => {
  async function loadSession() {
    const response = await fetch('/api/auth/session', { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('session unavailable');
    return response.json();
  }

  function accessUrl() {
    const next = `${window.location.pathname}${window.location.search}`;
    return `/access/?next=${encodeURIComponent(next)}`;
  }

  loadSession()
    .then((session) => {
      if (!session.authenticated) {
        window.location.replace(accessUrl());
        return;
      }
      document.querySelectorAll('[data-session-label]').forEach((node) => {
        node.textContent = session.label || '已登录';
      });
    })
    .catch(() => window.location.replace(accessUrl()));

  document.querySelectorAll('[data-logout]').forEach((button) => {
    button.addEventListener('click', async () => {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: '{}',
        });
      } finally {
        window.location.assign('/access/');
      }
    });
  });
})();
