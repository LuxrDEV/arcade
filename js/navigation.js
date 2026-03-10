// ==========================================
// NAVIGATION.JS
// ==========================================
const Navigation = (() => {
  const pages = ['feed','communities','explore','activity','messages','profile'];
  let current = 'feed';

  function init() {
    // nav items in sidebar and bottom nav use data-page
    // but we attach listeners in HTML via onclick for sidebar-left
    // Bottom nav items also use data-page — wired in HTML DOMContentLoaded
  }

  function navigate(page) {
    if (!pages.includes(page)) return;

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('[data-page]').forEach(el => el.classList.remove('active'));

    const pageEl = document.getElementById(`page-${page}`);
    if (pageEl) pageEl.classList.add('active');

    document.querySelectorAll(`[data-page="${page}"]`).forEach(el => el.classList.add('active'));

    current = page;
    window.scrollTo(0, 0);
  }

  function getCurrent() { return current; }

  return { init, navigate, getCurrent };
})();