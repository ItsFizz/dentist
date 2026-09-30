/* ============================================
   DR AIMAN DENTIST — JAVASCRIPT
   Optimized for smooth performance on all devices
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const links = navLinks ? navLinks.querySelectorAll('a') : [];

  // ================================================
  // 1. NAVBAR SCROLL SHADOW
  // ================================================
  const handleScroll = () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ================================================
  // 2. MOBILE MENU HANDLING
  // ================================================
  const closeMenu = () => {
    if (toggle && navLinks) {
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
      document.body.classList.remove('menu-open');
    }
  };

  const openMenu = () => {
    if (toggle && navLinks) {
      toggle.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
      navLinks.classList.add('open');
      document.body.classList.add('menu-open');
    }
  };

  if (toggle && navLinks) {
    toggle.setAttribute('aria-expanded', 'false');

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = navLinks.classList.contains('open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close when clicking any nav link
    links.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close when clicking outside of menu
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('open')) {
        if (!navLinks.contains(e.target) && !toggle.contains(e.target)) {
          closeMenu();
        }
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeMenu();
      }
    });

    // Close on resize > 860px
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860 && navLinks.classList.contains('open')) {
        closeMenu();
      }
    }, { passive: true });
  }

  // ================================================
  // 3. ACTIVE NAV LINK HIGHLIGHTING
  // ================================================
  const sections = document.querySelectorAll('section[id], header[id]');
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerNav = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(l => {
            const href = l.getAttribute('href');
            l.classList.toggle('active', href === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach(sec => observerNav.observe(sec));
  }

  // ================================================
  // 4. SCROLL REVEAL (Safe & Instant for Visible Items)
  // ================================================
  const revealTargets = document.querySelectorAll(
    '.service-card, .review-card, .contact-card, .info-card, .map-container'
  );

  if ('IntersectionObserver' in window && revealTargets.length > 0) {
    const observerReveal = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observerReveal.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

    revealTargets.forEach(el => {
      // Check if item is already inside the initial viewport
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible');
      } else {
        el.classList.add('reveal');
        observerReveal.observe(el);
      }
    });
  } else {
    // Fallback if IntersectionObserver isn't supported
    revealTargets.forEach(el => el.classList.add('visible'));
  }

  // ================================================
  // 5. SMOOTH SCROLL WITH HEADER OFFSET
  // ================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 70;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
