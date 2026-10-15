(() => {
  'use strict';
  const sidebar = document.querySelector('.cy-sidebar');
  if (!sidebar) return;
  const toggle = sidebar.querySelector('.cy-sidebar__toggle');
  const mobile = window.matchMedia('(max-width: 640px)');
  const key = 'cydak-sidebar-collapsed';
  let collapsed = mobile.matches;
  try {
    const saved = localStorage.getItem(key);
    if (saved !== null && !mobile.matches) collapsed = saved === 'true';
  } catch {}
  function apply() {
    sidebar.classList.toggle('cy-sidebar--collapsed', collapsed);
    toggle.setAttribute('aria-expanded', String(!collapsed));
    toggle.setAttribute('aria-label', collapsed ? 'Expandir menu' : 'Recolher menu');
    toggle.title = collapsed ? 'Expandir menu' : 'Recolher menu';
  }
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    collapsed = !collapsed;
    apply();
    if (!mobile.matches) {
      try { localStorage.setItem(key, String(collapsed)); } catch {}
    }
  });
  sidebar.querySelectorAll('.cy-sidebar__group > summary').forEach(summary => {
    summary.addEventListener('click', event => {
      if (!collapsed) return;
      event.preventDefault();
      collapsed = false;
      apply();
      summary.parentElement.open = true;
    });
  });
  function activeLink() {
    const hash = window.location.hash || '#conteudo';
    sidebar.querySelectorAll('.cy-sidebar__link').forEach(link => {
      if (link.hash === hash) {
        link.setAttribute('aria-current', 'location');
        const group = link.closest('details');
        if (group) group.open = true;
      } else link.removeAttribute('aria-current');
    });
  }
  sidebar.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      const target = document.getElementById(link.hash.slice(1));
      if (target instanceof HTMLDetailsElement) target.open = true;
      if (mobile.matches) {
        collapsed = true;
        apply();
        if (target) {
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      }
    });
  });
  sidebar.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      collapsed = true;
      toggle.focus();
      apply();
    }
  });
  mobile.addEventListener('change', () => {
    collapsed = mobile.matches;
    if (!mobile.matches) {
      try { collapsed = localStorage.getItem(key) === 'true'; } catch {}
    }
    apply();
  });
  window.addEventListener('hashchange', activeLink);
  apply();
  activeLink();
})();
