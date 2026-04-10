/* ─────────────────────────────────────────
   Cafeology — Shared Scripts
───────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  // ── Sticky nav scroll class ──
  const nav = document.getElementById('siteNav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // ── Mobile nav toggle ──
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      navMobile.classList.toggle('open');
      navToggle.textContent = navMobile.classList.contains('open') ? '✕' : '☰';
    });
    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMobile.classList.remove('open');
        navToggle.textContent = '☰';
      });
    });
  }

  // ── Set active nav link ──
  // Service sub-pages highlight the parent "Services" link
  const serviceSubPages = ['coffee-trailer.html', 'matcha-cart.html', 'catering.html'];
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav__links a, .nav__mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    // Direct match
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }

    // Mark parent "Services" link active when on a sub-page
    if (serviceSubPages.includes(currentPage) && href === 'services.html') {
      link.classList.add('active');
    }
  });

  // Also highlight the individual service link in the dropdown
  document.querySelectorAll('.nav__dropdown a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) link.classList.add('active');
  });

  // ── FAQ accordion ──
  document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── Menu tabs ──
  document.querySelectorAll('.menu-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('panel-' + tab.dataset.panel);
      if (panel) panel.classList.add('active');
    });
  });

  // ── Contact form submit (prevent default, show success) ──
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('[type="submit"]');
      btn.textContent = 'Message Sent ✓';
      btn.disabled = true;
      btn.style.background = '#5C6B50';
      btn.style.borderColor = '#5C6B50';
    });
  }

});
