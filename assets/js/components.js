/* =================================================================
   SLG Masterworks — Shared Components
   Injects the site header and footer into every page automatically.
   Path-aware: reads data-sub="true" on <body> for collection pages.
   ================================================================= */

(function () {
  'use strict';

  /* ---- Path helper ---- */
  const inSub = document.body.dataset.sub === 'true';
  const r = inSub ? '../' : '';          // root prefix for links & assets

  /* ---- Detect active page ---- */
  const p = window.location.pathname;
  const on = (seg) => p.includes(seg);
  const active = (seg) => on(seg) ? ' class="is-active"' : '';
  /* came from the shop? (collection pages are shared by The Images + The Shop) */
  const fromShop = (new URLSearchParams(window.location.search).get('from') === 'shop')
                   || /\/the-shop\.html/i.test(document.referrer);

  /* ================================================================
     HEADER HTML
     Logo left · Nav center (THE IMAGES / SHOP / THE ARTIST / SHOWROOM / CONTACT)
     Icons right: search, cart, hamburger
     ================================================================ */
  const headerHTML = `
<header class="nav" id="site-nav">
  <div class="nav-inner">

    <!-- Logo -->
    <a href="${r}index.html" class="brand" aria-label="SLG Masterworks home">
      <img src="${r}assets/images/SLG-Signature-Logo-Header.svg.svg" alt="SLG Masterworks" class="brand-logo" />
    </a>

    <!-- Centre navigation -->
    <nav class="nav-center" aria-label="Primary">
      <ul class="nav-links" id="navLinks">

        <!-- THE IMAGES — direct link to master page -->
        <li class="nav-item-images" id="navImages">
          <a href="${r}the-images.html" class="nav-link-main${(on('the-images') || on('collections/')) && !fromShop ? ' is-active' : ''}">
            The Images
          </a>
        </li>

        <li><a href="${r}the-shop.html"${(on('shop') || fromShop) ? ' class="is-active"' : ''}>The Shop</a></li>
        <li><a href="${r}the-artist.html"${active('the-artist')}>The Artist</a></li>
        <li><a href="${r}showroom.html"${active('showroom')}>Showroom</a></li>
        <li><a href="${r}contact.html"${active('contact')}>Contact</a></li>

      </ul>
    </nav>

    <!-- Right icons -->
    <div class="nav-icons">
      <button class="nav-icon" aria-label="Search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/>
        </svg>
      </button>
      <button class="nav-icon nav-cart" aria-label="Cart">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M1 2h3.4l2.4 11.6a1.6 1.6 0 0 0 1.6 1.3h9.1a1.6 1.6 0 0 0 1.6-1.2L22 6.2H5.3"/>
          <circle cx="9" cy="20" r="1.5" fill="currentColor" stroke="none"/>
          <circle cx="18" cy="20" r="1.5" fill="currentColor" stroke="none"/>
        </svg>
        <span class="cart-count" id="cartCount">0</span>
      </button>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>

  </div>
</header>`;

  /* ================================================================
     FOOTER HTML
     Dark background · ChatGPT Image.jpg behind dark overlay
     4-column grid: brand + social / collections / artist / service
     ================================================================ */
  const footerHTML = `
<footer class="footer" id="site-footer">

  <!-- Artist photo background (darkened) -->
  <div class="footer-photo-bg" aria-hidden="true">
    <img src="${r}assets/images/Sarah Footer Image.jpg" alt="" loading="lazy" />
  </div>

  <div class="footer-content">
    <div class="footer-grid">

      <!-- Brand -->
      <div class="footer-col-brand">
        <div class="footer-brand">
          <img src="${r}assets/images/SLG-Signature-Logo-Footer.svg.svg" alt="SLG Masterworks" class="footer-brand-logo" />
        </div>
        <p class="footer-tag">Fine art Wildlife, Landscape, Water photography.<br>Limited-edition signed prints. Scottsdale, Arizona.<br>Shipped across North America<br>and Canada.</p>
        <div class="socials">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="Instagram">
            <svg viewBox="0 0 24 24"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener" aria-label="Facebook">
            <svg viewBox="0 0 24 24"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"/></svg>
          </a>
          <a href="https://www.tiktok.com/" target="_blank" rel="noopener" aria-label="TikTok">
            <svg viewBox="0 0 24 24"><path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"/></svg>
          </a>
        </div>
      </div>

      <!-- The Images -->
      <div>
        <h4>Quick Links</h4>
        <ul>
          <li><a href="${r}the-images.html">The Images</a></li>
          <li><a href="${r}the-shop.html">The Shop</a></li>
          <li><a href="${r}the-artist.html">The Artist</a></li>
          <li><a href="${r}showroom.html">Showroom</a></li>
          <li><a href="${r}contact.html">Contact</a></li>
        </ul>
      </div>

      <!-- Collections -->
      <div>
        <h4>Collections</h4>
        <ul>
          <li><a href="${r}the-images.html?collection=wildlife">Wildlife</a></li>
          <li><a href="${r}the-images.html?collection=landscape">Landscape</a></li>
          <li><a href="${r}the-images.html?collection=water">Water</a></li>
          <li><a href="${r}the-shop.html?tag=new">New Arrivals</a></li>
          <li><a href="${r}the-shop.html?tag=best">Best Sellers</a></li>
        </ul>
      </div>

      <!-- Service -->
      <div>
        <h4>Service</h4>
        <ul>
          <li><a href="#">Shipping Info</a></li>
          <li><a href="#">Care &amp; Handling</a></li>
          <li><a href="#">Returns &amp; FAQ</a></li>
          <li><a href="#">Custom Sizing</a></li>
          <li><a href="${r}contact.html">Custom Commissions</a></li>
        </ul>
      </div>

    </div>

    <div class="footer-bottom">
      <span class="footer-copy">© <span class="footer-year"></span> SLG.Art · Sarah L Glabman. All rights reserved. &nbsp;|&nbsp; Design &amp; Development by &nbsp;<a href="https://www.behance.net/advarto" target="_blank" rel="noopener" aria-label="Bisen Brandcraft"><img src="${r}assets/images/BB_DP_Logo_1.svg" alt="Bisen Brandcraft" class="bb-logo" /></a></span>
    </div>
  </div>

</footer>`;

  /* ================================================================
     INJECT INTO PAGE
     ================================================================ */
  document.body.insertAdjacentHTML('afterbegin', headerHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  /* ---- Year ---- */
  document.querySelectorAll('.footer-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* ---- Cart (items, badge, slide-in drawer) ---- */
  (function () {
    const KEY = 'slg_cart';
    const read  = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } };
    const write = (items) => localStorage.setItem(KEY, JSON.stringify(items));
    const count = () => read().reduce((n, it) => n + (it.qty || 1), 0);
    const total = () => read().reduce((s, it) => s + (it.price || 0) * (it.qty || 1), 0);
    const money = (n) => '$' + Number(n).toLocaleString('en-US');

    /* inject drawer markup */
    document.body.insertAdjacentHTML('beforeend', `
      <div class="cart-drawer-overlay" id="cartOverlay"></div>
      <aside class="cart-drawer" id="cartDrawer" aria-label="Shopping cart" aria-hidden="true">
        <div class="cart-drawer-head">
          <h2>Your Cart</h2>
          <button class="cart-drawer-close" id="cartClose" aria-label="Close cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="cart-drawer-body" id="cartBody"></div>
        <div class="cart-drawer-foot" id="cartFoot"></div>
      </aside>`);

    const overlay = document.getElementById('cartOverlay');
    const drawer  = document.getElementById('cartDrawer');
    const cbody   = document.getElementById('cartBody');
    const cfoot   = document.getElementById('cartFoot');
    const badge   = document.getElementById('cartCount');

    function renderBadge() {
      if (!badge) return;
      const n = count();
      badge.textContent = n;
      badge.style.display = n > 0 ? 'flex' : 'none';
    }

    function renderDrawer() {
      const items = read();
      if (!items.length) {
        cbody.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
        cfoot.innerHTML = '';
        return;
      }
      cbody.innerHTML = items.map((it, i) => `
        <div class="cart-item">
          <div class="cart-item-info">
            <span class="cart-item-title">${it.title}</span>
            <span class="cart-item-meta">${money(it.price)}${it.qty > 1 ? ' &times; ' + it.qty : ''}</span>
          </div>
          <button class="cart-item-remove" data-remove="${i}" aria-label="Remove item">&times;</button>
        </div>`).join('');
      cfoot.innerHTML = `
        <div class="cart-total"><span>Total</span><span>${money(total())}</span></div>
        <a href="${r}checkout.html" class="cart-checkout">Proceed to Checkout</a>`;
      cbody.querySelectorAll('[data-remove]').forEach(b => b.addEventListener('click', () => {
        const items2 = read(); items2.splice(+b.dataset.remove, 1); write(items2); refresh();
      }));
    }

    function refresh() { renderBadge(); renderDrawer(); }
    function open()  { renderDrawer(); drawer.classList.add('open'); overlay.classList.add('open'); drawer.setAttribute('aria-hidden', 'false'); document.documentElement.style.overflow = 'hidden'; }
    function close() { drawer.classList.remove('open'); overlay.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); document.documentElement.style.overflow = ''; }

    const cartBtn = document.querySelector('.nav-cart');
    if (cartBtn) cartBtn.addEventListener('click', open);
    document.getElementById('cartClose').addEventListener('click', close);
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

    window.SLGCart = {
      count, total, items: read,
      open, close,
      add(item) {
        if (typeof item !== 'object' || item === null) item = { title: 'Print', price: 0 };
        const items = read();
        const ex = items.find(x => x.title === item.title);
        if (ex) ex.qty = (ex.qty || 1) + 1;
        else items.push({ title: item.title, price: +item.price || 0, qty: 1 });
        write(items); refresh();
      },
      remove(title) { write(read().filter(x => x.title !== title)); refresh(); },
      clear() { write([]); refresh(); }
    };
    refresh();
  })();

  /* ---- Hamburger menu drawer ---- */
  (function () {
    const toggle = document.getElementById('navToggle');
    if (!toggle) return;

    document.body.insertAdjacentHTML('beforeend', `
      <div class="menu-overlay" id="menuOverlay"></div>
      <aside class="menu-drawer" id="menuDrawer" aria-label="Menu" aria-hidden="true">
        <div class="menu-head">
          <span class="menu-title">Menu</span>
          <button class="menu-close" id="menuClose" aria-label="Close menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="menu-body">
          <div class="menu-account">
            <a href="${r}account.html" class="menu-btn menu-btn-primary">Sign In</a>
            <a href="${r}register.html" class="menu-btn menu-btn-ghost">Create Account</a>
          </div>
          <nav class="menu-nav">
            <a href="${r}the-images.html">The Images</a>
            <a href="${r}the-shop.html">The Shop</a>
            <a href="${r}the-artist.html">The Artist</a>
            <a href="${r}showroom.html">Showroom</a>
            <a href="${r}contact.html">Contact</a>
          </nav>
          <div class="menu-news">
            <h3>Subscribe to our Newsletter</h3>
            <p>New releases, limited editions &amp; studio notes — straight to your inbox.</p>
            <form class="menu-news-form" id="menuNewsForm" novalidate>
              <input type="email" id="menuNewsEmail" placeholder="Your email address" required />
              <button type="submit">Subscribe</button>
            </form>
            <p class="menu-news-msg" id="menuNewsMsg"></p>
          </div>
        </div>
        <div class="menu-foot">
          <a href="mailto:hello@slg.art">hello@slg.art</a>
          <span>Scottsdale, Arizona · Ships to North America &amp; Canada</span>
        </div>
      </aside>`);

    const overlay = document.getElementById('menuOverlay');
    const drawer  = document.getElementById('menuDrawer');

    function open()  { drawer.classList.add('open'); overlay.classList.add('open'); toggle.classList.add('is-active'); toggle.setAttribute('aria-expanded', 'true'); drawer.setAttribute('aria-hidden', 'false'); document.documentElement.style.overflow = 'hidden'; }
    function close() { drawer.classList.remove('open'); overlay.classList.remove('open'); toggle.classList.remove('is-active'); toggle.setAttribute('aria-expanded', 'false'); drawer.setAttribute('aria-hidden', 'true'); document.documentElement.style.overflow = ''; }

    toggle.addEventListener('click', () => drawer.classList.contains('open') ? close() : open());
    document.getElementById('menuClose').addEventListener('click', close);
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    drawer.querySelectorAll('.menu-nav a').forEach(a => a.addEventListener('click', close));

    const form = document.getElementById('menuNewsForm');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('menuNewsEmail');
      const msg = document.getElementById('menuNewsMsg');
      const ok = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value.trim());
      if (!ok) {
        msg.textContent = 'Please enter a valid email address.';
        msg.className = 'menu-news-msg error';
        return;
      }
      msg.textContent = "Thank you — you're on the list.";
      msg.className = 'menu-news-msg success';
      email.value = '';
    });
  })();

  /* ---- Collapsible sidebar filter groups (first open, rest collapsed) ---- */
  (function () {
    const groups = document.querySelectorAll('.ti-filter-group, .shop-filter-group');
    groups.forEach((group, i) => {
      if (i > 0) group.classList.add('collapsed');
      const h = group.querySelector('h3');
      if (h) h.addEventListener('click', () => group.classList.toggle('collapsed'));
    });
  })();

  /* ---- Breadcrumb: middle crumb reflects the section you came from ----
     The Shop  → Home › The Shop › [Print]
     otherwise → Home › The Images › [Print]                              */
  (function () {
    const bc = document.querySelector('.product-breadcrumb');
    if (!bc) return;
    const links = bc.querySelectorAll('a');
    if (!links[1]) return;            // links[0] = Home, links[1] = section
    if (fromShop) {
      links[1].textContent = 'The Shop';
      links[1].setAttribute('href', r + 'the-shop.html');
    } else {
      links[1].textContent = 'The Images';
      links[1].setAttribute('href', r + 'the-images.html');
    }
  })();

  /* ---- Homepage: fixed transparent nav that turns solid on scroll ---- */
  const isHomepage = (window.location.pathname.endsWith('index.html') ||
                      window.location.pathname === '/' ||
                      window.location.pathname.endsWith('/') &&
                      !window.location.pathname.includes('collections'));
  if (isHomepage) {
    document.body.classList.add('is-homepage');
    const scrollThreshold = 80;
    function handleNavScroll() {
      const nav = document.getElementById('site-nav');
      if (!nav) return;
      nav.classList.toggle('nav-scrolled', window.scrollY > scrollThreshold);
    }
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll(); // run once on load
  }

  /* ================================================================
     NAV INTERACTIONS
     ================================================================ */
  const nav       = document.getElementById('site-nav');
  const navToggle = document.getElementById('navToggle');
  const imagesPanel  = document.getElementById('imagesPanel');
  const imagesCaret  = document.getElementById('imagesCaret');
  const imagesClose  = document.getElementById('imagesPanelClose');

  /* -- Mobile hamburger now handled by the slide-in menu drawer above -- */

  /* -- Images panel open/close -- */
  function openPanelFn() {
    imagesPanel.classList.add('open');
    imagesPanel.setAttribute('aria-hidden', 'false');
    imagesCaret.setAttribute('aria-expanded', 'true');
    imagesCaret.classList.add('open');
    document.body.classList.add('panel-open');
  }
  function closePanelFn() {
    if (!imagesPanel) return;
    imagesPanel.classList.remove('open');
    imagesPanel.setAttribute('aria-hidden', 'true');
    if (imagesCaret) { imagesCaret.setAttribute('aria-expanded', 'false'); imagesCaret.classList.remove('open'); }
    document.body.classList.remove('panel-open');
  }

  if (imagesCaret && imagesPanel) {
    imagesCaret.addEventListener('click', e => {
      e.stopPropagation();
      imagesPanel.classList.contains('open') ? closePanelFn() : openPanelFn();
    });
  }
  if (imagesClose) imagesClose.addEventListener('click', closePanelFn);

  // Close on outside click
  document.addEventListener('click', e => {
    if (imagesPanel && imagesPanel.classList.contains('open')) {
      if (!e.target.closest('#navImages') && !e.target.closest('#imagesPanel')) {
        closePanelFn();
      }
    }
  });

  // Close on ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closePanelFn();
  });

  // Close panel when a link inside it is clicked
  if (imagesPanel) {
    imagesPanel.querySelectorAll('a').forEach(a => a.addEventListener('click', closePanelFn));
  }

  /* -- Active link highlight -- */
  const here = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#navLinks a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('/').pop();
    if (href && href !== '#' && href === here) a.classList.add('is-active');
  });

  /* ================================================================
     SCROLL REVEAL (shared across all pages)
     ================================================================ */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  /* ================================================================
     COUNT-UP STATS (animate numbers when scrolled into view)
     ================================================================ */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const animate = el => {
      const target   = parseFloat(el.getAttribute('data-count')) || 0;
      const suffix   = el.getAttribute('data-suffix') || '';
      const prefix   = el.getAttribute('data-prefix') || '';
      const duration = 1600;
      const start    = performance.now();
      const easeOut  = t => 1 - Math.pow(1 - t, 3);
      const step = now => {
        const p = Math.min((now - start) / duration, 1);
        const val = Math.round(easeOut(p) * target);
        el.textContent = prefix + val + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if ('IntersectionObserver' in window) {
      const cio = new IntersectionObserver(
        entries => entries.forEach(e => {
          if (e.isIntersecting) { animate(e.target); cio.unobserve(e.target); }
        }),
        { threshold: 0.4 }
      );
      counters.forEach(el => cio.observe(el));
    } else {
      counters.forEach(animate);
    }
  }

})();

/* ---- Product page: "Select Size" ko dropdown banana ---- */
(function () {
  const list = document.getElementById('size-options');
  if (!list || !list.querySelector('.size-btn')) return;

  const wrap = document.createElement('div');
  wrap.className = 'size-dropdown';
  list.parentNode.insertBefore(wrap, list);

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'size-dd-trigger';
  trigger.setAttribute('aria-haspopup', 'listbox');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.innerHTML = '<span class="size-dd-label"></span><span class="size-dd-caret" aria-hidden="true"></span>';
  wrap.appendChild(trigger);
  wrap.appendChild(list);

  const label = trigger.querySelector('.size-dd-label');
  function syncLabel() {
    const a = list.querySelector('.size-btn.active');
    if (!a) { label.innerHTML = 'Select Size'; return; }
    const dim = a.querySelector('.size-dim');
    const sub = a.querySelector('.size-label');
    label.innerHTML = (dim ? dim.innerHTML : a.textContent) +
      (sub ? ' &nbsp;<span class="size-dd-sub">· ' + sub.textContent + '</span>' : '');
  }
  function close() { wrap.classList.remove('open'); trigger.setAttribute('aria-expanded', 'false'); }

  trigger.addEventListener('click', () => {
    wrap.classList.toggle('open');
    trigger.setAttribute('aria-expanded', wrap.classList.contains('open'));
  });
  /* page ka apna handler pehle चलता hai (active set karta hai), phir ye */
  list.addEventListener('click', (e) => {
    if (e.target.closest('.size-btn')) { syncLabel(); close(); }
  });
  document.addEventListener('click', (e) => { if (!wrap.contains(e.target)) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  syncLabel();
})();

/* ---- Mobile: "rotate phone" prompt (5s baad, portrait only) ---- */
(function () {
  const isSmallTouch = window.matchMedia('(max-width: 767px)').matches &&
                       ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  if (!isSmallTouch) return;

  /* Kab dikhana hai: pehli visit pe, ya jab user page REFRESH kare.
     Site ke andar normal navigation (link clicks) pe dobara nahi. */
  const navEntry = (performance.getEntriesByType && performance.getEntriesByType('navigation')[0]) || null;
  const isReload = navEntry ? navEntry.type === 'reload' : false;
  if (sessionStorage.getItem('slg_rotate_prompt_shown') && !isReload) return;

  const portrait = window.matchMedia('(orientation: portrait)');

  setTimeout(function () {
    if (!portrait.matches) return;          // pehle se landscape me hai

    const el = document.createElement('div');
    el.className = 'rotate-prompt';
    el.setAttribute('role', 'status');
    el.innerHTML =
      '<svg class="rotate-prompt-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
        '<rect x="7" y="3" width="10" height="18" rx="2"/><line x1="11" y1="18" x2="13" y2="18"/>' +
      '</svg>' +
      '<span><strong>Rotate your phone</strong> for the best view — Sarah’s artworks look stunning in landscape.</span>' +
      '<button class="rotate-prompt-close" aria-label="Dismiss">×</button>';
    document.body.appendChild(el);
    requestAnimationFrame(function () { el.classList.add('show'); });
    sessionStorage.setItem('slg_rotate_prompt_shown', '1');

    function hide() {
      el.classList.remove('show');
      setTimeout(function () { el.remove(); }, 600);
    }
    el.querySelector('.rotate-prompt-close').addEventListener('click', hide);
    /* user ne rotate kar liya → prompt ka kaam khatam */
    portrait.addEventListener
      ? portrait.addEventListener('change', function (e) { if (!e.matches) hide(); })
      : portrait.addListener(function (e) { if (!e.matches) hide(); });
    /* 12 second baad khud hat jaye */
    setTimeout(hide, 12000);
  }, 5000);
})();

/* ---- Product page: room-preview thumbnails (collapse by default,
        selection pe expand + thumbnail→selection reverse sync) ---- */
(function () {
  const thumbs = document.getElementById('product-thumbs');
  if (!thumbs) return;

  /* "View Room Previews" toggle link (image ke neeche) */
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'thumbs-toggle';
  thumbs.parentElement.insertBefore(toggle, thumbs);

  function setExpanded(on) {
    thumbs.classList.toggle('expanded', on);
    toggle.innerHTML = on
      ? 'Hide Room Previews &nbsp;▴'
      : 'View Room Previews &nbsp;▾';
  }
  setExpanded(false);
  toggle.addEventListener('click', function () {
    setExpanded(!thumbs.classList.contains('expanded'));
  });

  /* koi bhi size / presentation / frame select hote hi thumbnails expand */
  ['size-options', 'presentation-options', 'frame-colors'].forEach(function (id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('click', function (e) {
      const b = e.target.closest('button');
      if (b && !b.classList.contains('disabled')) setExpanded(true);
    });
  });

  /* thumbnail click → size/presentation/frame selection auto-sync */
  thumbs.addEventListener('click', function (e) {
    const btn = e.target.closest('.product-thumb');
    if (!btn) return;
    const key = btn.dataset.imgKey || '';
    if (key === 'hero') {
      /* Web Preview: poora panel default unselected state pe reset */
      if (window.SLGResetToDefault) window.SLGResetToDefault();
      const ddLabel = document.querySelector('.size-dd-label');
      if (ddLabel) ddLabel.innerHTML = 'Select Size';
      return;
    }
    const m = key.match(/^(\d+x\d+)_(unframed|framed)(?:_(black|brown))?$/);
    if (!m) return;
    const size = m[1], pres = m[2] === 'framed' ? 'framed' : 'acrylic', frame = m[3];

    const sBtn = document.querySelector('.size-btn[data-size="' + size + '"]');
    if (sBtn && !sBtn.classList.contains('active')) sBtn.click();

    const pBtn = document.querySelector('.presentation-btn[data-presentation="' + pres + '"]');
    if (pBtn && !pBtn.classList.contains('active') && !pBtn.classList.contains('disabled')) pBtn.click();

    if (frame) {
      const fBtn = document.querySelector('.frame-color-btn[data-frame="' + frame + '"]');
      if (fBtn && !fBtn.classList.contains('active')) fBtn.click();
    }
  });
})();

/* ================================================================
   LOAD SEARCH  — injected after components so nav exists
   ================================================================ */
(function () {
  const s = document.createElement('script');
  const inSub = document.body.dataset.sub === 'true';
  s.src = (inSub ? '../' : '') + 'assets/js/search.js';
  s.defer = true;
  document.head.appendChild(s);
})();
