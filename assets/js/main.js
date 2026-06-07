/* =================================================================
   SLG Masterworks — Page Interactions
   components.js handles nav injection + nav interactions.
   This file handles: hero slider · gallery filter · newsletter ·
   contact form · canvas preview modal.
   ================================================================= */

(function () {
  'use strict';

  /* ================================================================
     HERO SLIDER  (homepage only)
     ================================================================ */
  const heroSection = document.querySelector('.hero-slider');
  if (heroSection) {
    const slides   = Array.from(heroSection.querySelectorAll('.hero-slide'));
    const dots     = Array.from(heroSection.querySelectorAll('.hero-dot'));
    const seeMore  = document.getElementById('seMoreBtn');
    const prevBtn  = document.getElementById('heroPrev');
    const nextBtn  = document.getElementById('heroNext');
    let current    = 0;
    let timer      = null;

    function goTo(n) {
      slides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = ((n % slides.length) + slides.length) % slides.length;
      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
      if (seeMore) seeMore.href = slides[current].dataset.href || '#';
    }

    function startTimer() { timer = setInterval(() => goTo(current + 1), 5500); }
    function stopTimer()  { clearInterval(timer); }
    function resetTimer() { stopTimer(); startTimer(); }

    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); resetTimer(); });
    dots.forEach(d => d.addEventListener('click', () => { goTo(+d.dataset.slide); resetTimer(); }));

    heroSection.addEventListener('mouseenter', stopTimer);
    heroSection.addEventListener('mouseleave', startTimer);
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { goTo(current + 1); resetTimer(); }
      if (e.key === 'ArrowLeft')  { goTo(current - 1); resetTimer(); }
    });

    startTimer();
  }

  /* ================================================================
     FEATURED CAROUSEL — seamless clone loop
     ================================================================ */
  document.querySelectorAll('[data-featured-carousel]').forEach(carousel => {
    const track = carousel.querySelector('.featured-track');
    const group = carousel.querySelector('.featured-group');
    if (!track || !group || track.querySelector('.featured-group.is-clone')) return;
    const clone = group.cloneNode(true);
    clone.classList.add('is-clone');
    clone.setAttribute('aria-hidden', 'true');
    clone.querySelectorAll('a').forEach(a => a.setAttribute('tabindex', '-1'));
    track.appendChild(clone);
  });

  /* ================================================================
     NEWSLETTER  (all pages)
     ================================================================ */
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input');
      const btn   = form.querySelector('button');
      if (input && input.value) {
        btn.textContent = 'Thank You ✓';
        input.value = '';
        setTimeout(() => (btn.textContent = 'Subscribe'), 3000);
      }
    });
  });

  /* ================================================================
     CONTACT FORM  (contact.html)
     ================================================================ */
  const cf = document.querySelector('[data-contact-form]');
  if (cf) {
    cf.addEventListener('submit', e => {
      e.preventDefault();
      const status = cf.querySelector('[data-status]');
      if (status) {
        status.textContent = 'Thank you — your note has been received. Sarah will reply within 1–2 days.';
        status.style.color = 'var(--blue)';
      }
      cf.reset();
    });
  }

  /* ================================================================
     NAV HEIGHT → CSS variable (for images-panel top offset)
     ================================================================ */
  function setNavHeight() {
    const nav = document.getElementById('site-nav');
    if (nav) {
      document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px');
    }
  }
  setNavHeight();
  window.addEventListener('resize', setNavHeight);

})();

/* ================================================================
   PRINT CAROUSEL — auto-scroll with pause on hover (rAF-driven)
   ================================================================ */
window.addEventListener('load', function () {
  document.querySelectorAll('.print-carousel').forEach(function (carousel) {
    const track = carousel.querySelector('.print-track');
    if (!track) return;

    // Clone items for seamless loop
    const origItems = Array.from(track.children);
    origItems.forEach(function (item) {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });

    // Force flex, no overflow-x scroll
    track.style.display = 'flex';
    track.style.flexWrap = 'nowrap';
    track.style.overflowX = 'visible';
    track.style.width = 'max-content';
    track.style.maxWidth = 'none';
    track.style.scrollSnapType = 'none';
    carousel.style.overflow = 'hidden';

    // Measure AFTER cloning + styles applied
    const halfW = track.scrollWidth / 2;
    if (halfW <= 0) return;

    let x = 0;
    let paused = false;
    const speed = 0.6;

    carousel.addEventListener('mouseenter', function () { paused = true; });
    carousel.addEventListener('mouseleave', function () { paused = false; });

    (function tick() {
      if (!paused) {
        x += speed;
        if (x >= halfW) x -= halfW;
        track.style.transform = 'translateX(-' + x + 'px)';
      }
      requestAnimationFrame(tick);
    })();
  });
});
