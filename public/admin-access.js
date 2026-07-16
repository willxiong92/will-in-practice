(() => {
  const text = (selector, value) => {
    const node = document.querySelector(selector);
    if (node) node.textContent = value;
  };

  function formatTime(value) {
    if (!value) return '未知';
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString('zh-CN');
  }

  function renderEvents(events) {
    const rows = document.querySelector('#audit-rows');
    if (!rows) return;
    rows.replaceChildren();
    if (!events.length) {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.colSpan = 5;
      cell.className = 'admin-empty';
      cell.textContent = '暂无访问记录，或尚未绑定审计存储';
      row.append(cell);
      rows.append(row);
      return;
    }
    events.forEach((event) => {
      const row = document.createElement('tr');
      const values = [
        formatTime(event.time),
        event.role === 'admin' ? '管理员' : '团队成员',
        event.action === 'logout' ? '退出' : '登录',
        event.success ? '成功' : '失败',
        event.ip || '未知',
      ];
      values.forEach((value) => {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.append(cell);
      });
      rows.append(row);
    });
  }

  async function loadOverview() {
    const error = document.querySelector('#admin-load-error');
    if (error) error.hidden = true;
    try {
      const response = await fetch('/api/admin/overview', { headers: { Accept: 'application/json' } });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || '状态读取失败');
      text('#team-access-status', data.teamAccessConfigured ? '已配置' : '未配置');
      text('#admin-access-status', data.adminAccessConfigured ? '已配置' : '未配置');
      text('#session-hours', `${data.sessionHours} 小时`);
      text('#rate-limit', `${data.rateLimit} 次 / 15 分钟`);
      text('#audit-status', data.auditEnabled ? '已启用' : '未绑定');
      text('#audit-retention', data.auditEnabled ? `${data.logRetentionDays} 天` : '不保存');
      text('#audit-count', `${data.events.length} 条`);
      renderEvents(data.events || []);
    } catch (reason) {
      if (error) {
        error.textContent = reason instanceof Error ? reason.message : '状态读取失败';
        error.hidden = false;
      }
    }
  }

  document.querySelector('#admin-refresh')?.addEventListener('click', loadOverview);
  loadOverview();
})();
