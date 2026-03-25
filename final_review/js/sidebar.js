// Shared sidebar renderer — call renderSidebar(activePage) in each page

function renderSidebar(activePage) {
  const pages = [
    { id: 'overview',    href: '../pages/overview.html',    label: 'Overview',          icon: `<rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/><rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>` },
    { id: 'traffic',     href: '../pages/traffic.html',     label: 'Aircraft Traffic',  icon: `<path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>` },
    { id: 'congestion',  href: '../pages/congestion.html',  label: 'Congestion',        icon: `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 8v4l3 3" stroke="currentColor" stroke-width="2"/>` },
    { id: 'delays',      href: '../pages/delays.html',      label: 'Delays & Cancel',   icon: `<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" stroke-width="2"/><line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="currentColor"/>` },
    { id: 'weather',     href: '../pages/weather.html',     label: 'Weather Impact',    icon: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" stroke="currentColor" stroke-width="2"/>` },
    { id: 'predictor',   href: '../pages/predictor.html',   label: 'AI Predictor',      icon: `<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>` },
    { id: 'map',         href: '../pages/map.html',         label: 'Flight Map',        icon: `<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" stroke-width="2"/>` },
    { id: 'about',       href: '../pages/about.html',       label: 'About',             icon: `<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" stroke-width="2"/><line x1="12" y1="8" x2="12.01" y2="8" stroke="currentColor" stroke-width="3"/>` }
  ];

  const html = `
    <aside class="sidebar">
      <div class="sidebar-logo">
        <a class="logo-mark" href="../pages/overview.html">
          <div class="logo-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            </svg>
          </div>
          <div>
            <div class="logo-text">AirIndia</div>
            <div class="logo-sub">Traffic Control</div>
          </div>
        </a>
      </div>
      <div class="nav-section">Navigation</div>
      ${pages.map(p => `
        <a href="${p.href}" class="nav-item ${p.id === activePage ? 'active' : ''}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">${p.icon}</svg>
          <span>${p.label}</span>
        </a>
      `).join('')}
      <div class="sidebar-footer">
        <div>5 Indian Airports · Real Data</div>
        <div style="margin-top:4px;color:#1e2d44">DEL · BOM · BLR · MAA · CCU</div>
      </div>
    </aside>`;
  document.getElementById('sidebar-mount').innerHTML = html;
}
