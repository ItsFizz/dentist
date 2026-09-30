/* ============================================
   DR AIMAN DENTIST — MAIN JAVASCRIPT
   Lightweight: scroll reveal, navbar, mobile menu
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Elements ----
  const navbar   = document.getElementById('navbar');
  const toggle   = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const links    = navLinks.querySelectorAll('a');

  // ================================================
  // 1. NAVBAR — Solid on scroll
  // ================================================
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 40);
    lastScroll = y;
  }, { passive: true });

  // ================================================
  // 2. MOBILE MENU TOGGLE
  // ================================================
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ================================================
  // 3. ACTIVE NAV LINK ON SCROLL
  // ================================================
  const sections = document.querySelectorAll('section[id], header[id]');
  const observerNav = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-30% 0px -70% 0px' });

  sections.forEach(sec => observerNav.observe(sec));

  // ================================================
  // 4. SCROLL REVEAL — Fade-in on intersection
  //    Lightweight: uses IntersectionObserver, no jank
  // ================================================
  const revealTargets = document.querySelectorAll(
    '.service-card, .review-card, .about-grid, .contact-grid, .info-card, .hero-stats, .map-container'
  );

  revealTargets.forEach(el => el.classList.add('reveal'));

  const observerReveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observerReveal.unobserve(entry.target);  // Once visible, stop observing
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => observerReveal.observe(el));

  // ================================================
  // 5. SMOOTH SCROLL — For browsers that need help
  // ================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
