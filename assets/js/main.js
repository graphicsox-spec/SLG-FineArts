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
   PRODUCT IMAGE LIGHTBOX
   Click to open · Scroll to zoom · Drag to pan · Dbl-click reset
   Gracefully does nothing on non-product pages.
   ================================================================ */
(function () {
  var hero = document.getElementById('product-hero');
  if (!hero) return;

  // Build overlay once
  var lb = document.createElement('div');
  lb.className = 'slg-lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Artwork enlarged view');
  lb.innerHTML = '<button class="slg-lightbox-close" aria-label="Close enlarged view">&#215;</button>'
               + '<img class="slg-lightbox-img" alt="" />';
  document.body.appendChild(lb);

  var lbImg   = lb.querySelector('.slg-lightbox-img');
  var lbClose = lb.querySelector('.slg-lightbox-close');

  // ── Zoom + pan state ──────────────────────────────────────────
  var scale   = 1;
  var tx = 0, ty = 0;          // translate offsets (in scaled pixels)
  var MIN_SCALE = 1, MAX_SCALE = 5;
  var dragging = false;
  var dragX0, dragY0, tx0, ty0;

  function applyTransform() {
    lbImg.style.transform = 'scale(' + scale + ') translate(' + tx + 'px, ' + ty + 'px)';
    // Cursor feedback
    if (scale > 1) {
      lb.style.cursor    = 'default';
      lbImg.style.cursor = dragging ? 'grabbing' : 'grab';
    } else {
      lb.style.cursor    = 'zoom-out';
      lbImg.style.cursor = '';
    }
  }

  function resetTransform() {
    scale = 1; tx = 0; ty = 0;
    lbImg.style.transition = 'transform 0.25s ease';
    applyTransform();
    setTimeout(function () { lbImg.style.transition = ''; }, 260);
  }

  // ── Open / Close ─────────────────────────────────────────────
  function openLb() {
    lbImg.src = hero.src;
    lbImg.alt = hero.alt || '';
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    scale = 1; tx = 0; ty = 0;
    applyTransform();
    // Replay open animation, then clear its fill-mode lock so wheel-zoom can work.
    // CSS animation fill-mode:both freezes transform:scale(1) after the animation
    // ends, which overrides the JS transform. Setting animation to 'none' after
    // animationend releases that lock.
    lbImg.style.animation = 'none';
    lbImg.offsetWidth; // force reflow so browser registers the reset
    lbImg.style.animation = '';
    lbImg.addEventListener('animationend', function onEnd() {
      lbImg.style.animation = 'none';
      lbImg.removeEventListener('animationend', onEnd);
    });
  }
  function closeLb() {
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(function () { lbImg.src = ''; scale = 1; tx = 0; ty = 0; }, 320);
  }

  // Open on hero click
  hero.parentElement.addEventListener('click', openLb);

  // X button always closes
  lbClose.addEventListener('click', function (e) { e.stopPropagation(); closeLb(); });

  // Backdrop click: reset zoom first, then close on next click
  lb.addEventListener('click', function (e) {
    if (e.target !== lb) return;
    if (scale > 1) { resetTransform(); } else { closeLb(); }
  });

  // Escape: reset if zoomed, else close
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') { scale > 1 ? resetTransform() : closeLb(); }
  });

  // ── Scroll to zoom ────────────────────────────────────────────
  lb.addEventListener('wheel', function (e) {
    if (!lb.classList.contains('is-open')) return;
    e.preventDefault();

    var step   = e.deltaY < 0 ? 0.18 : -0.18;   // up = zoom in
    var newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale + step));

    // Zoom toward the mouse pointer position
    var rect  = lbImg.getBoundingClientRect();
    var cx    = e.clientX - (rect.left + rect.width  / 2);
    var cy    = e.clientY - (rect.top  + rect.height / 2);
    var ratio = newScale / scale;
    tx = ratio * tx + cx * (1 - ratio) / newScale;
    ty = ratio * ty + cy * (1 - ratio) / newScale;

    scale = newScale;
    if (scale === MIN_SCALE) { tx = 0; ty = 0; }
    applyTransform();
  }, { passive: false });

  // ── Drag to pan (only when zoomed) ───────────────────────────
  lbImg.addEventListener('mousedown', function (e) {
    if (scale <= 1) return;
    e.preventDefault();
    dragging = true;
    dragX0 = e.clientX; dragY0 = e.clientY;
    tx0 = tx; ty0 = ty;
    applyTransform();
  });

  document.addEventListener('mousemove', function (e) {
    if (!dragging) return;
    tx = tx0 + (e.clientX - dragX0) / scale;
    ty = ty0 + (e.clientY - dragY0) / scale;
    applyTransform();
  });

  document.addEventListener('mouseup', function () {
    if (!dragging) return;
    dragging = false;
    applyTransform();
  });

  // ── Double-click to reset zoom ────────────────────────────────
  lbImg.addEventListener('dblclick', function (e) {
    e.stopPropagation();
    resetTransform();
  });

  // ── Touch pinch-zoom (mobile) ─────────────────────────────────
  var touchDist0 = null, scaleAtPinch = 1;
  lb.addEventListener('touchstart', function (e) {
    if (e.touches.length === 2) {
      touchDist0 = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      scaleAtPinch = scale;
    }
  }, { passive: true });

  lb.addEventListener('touchmove', function (e) {
    if (e.touches.length !== 2 || touchDist0 === null) return;
    e.preventDefault();
    var dist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
    scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scaleAtPinch * dist / touchDist0));
    if (scale === MIN_SCALE) { tx = 0; ty = 0; }
    applyTransform();
  }, { passive: false });

  lb.addEventListener('touchend', function () { touchDist0 = null; });
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
