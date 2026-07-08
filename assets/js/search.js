/* =================================================================
   SLG Masterworks - Cinematic Search
   Full-screen overlay · Live product results · Keyboard navigation
   Recent searches · Category filters · Animated transitions
   ================================================================= */

(function () {
  'use strict';

  /* ---- Path detection (same as components.js) ---- */
  const inSub = document.body.dataset.sub === 'true';
  const r = inSub ? '../' : '';

  /* ---- Inject CSS ---- */
  const style = document.createElement('style');
  style.textContent = `
  /* ======================================================
     SEARCH OVERLAY
     ====================================================== */

  .slg-search-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    background: rgba(10, 17, 38, 0.97);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.32s cubic-bezier(0.4, 0, 0.2, 1);
    overflow-y: auto;
  }
  .slg-search-overlay.open {
    opacity: 1;
    pointer-events: all;
  }

  /* ---- Close button ---- */
  .slg-search-close {
    position: fixed;
    top: 1.5rem;
    right: 1.75rem;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 50%;
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: rgba(255,255,255,0.7);
    transition: background 0.2s, color 0.2s;
    z-index: 10001;
    flex-shrink: 0;
  }
  .slg-search-close:hover { background: var(--gold); color: #fff; border-color: var(--gold); }

  /* ---- Search header ---- */
  .slg-search-head {
    padding: 4rem 5vw 0;
    max-width: 860px;
    width: 100%;
    margin: 0 auto;
    flex-shrink: 0;
  }

  .slg-search-label {
    font-family: 'Oswald', sans-serif;
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.38em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1.1rem;
    display: block;
  }

  .slg-search-input-wrap {
    display: flex;
    align-items: center;
    gap: 1rem;
    border-bottom: 1.5px solid rgba(255,255,255,0.18);
    padding-bottom: 1rem;
    transition: border-color 0.2s;
  }
  .slg-search-input-wrap:focus-within {
    border-color: var(--gold);
  }

  .slg-search-icon {
    color: rgba(255,255,255,0.4);
    flex-shrink: 0;
  }

  .slg-search-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(1.6rem, 4vw, 2.8rem);
    font-weight: 300;
    color: #fff;
    letter-spacing: -0.02em;
    caret-color: var(--gold);
    -webkit-appearance: none;
    appearance: none;
  }
  /* hide browser's native search clear (the blue x) - keep only our custom one */
  .slg-search-input::-webkit-search-cancel-button,
  .slg-search-input::-webkit-search-decoration { -webkit-appearance: none; appearance: none; display: none; }
  .slg-search-input::placeholder {
    color: rgba(255,255,255,0.22);
  }

  .slg-search-clear {
    background: transparent;
    border: none;
    color: rgba(255,255,255,0.55);
    cursor: pointer;
    padding: 4px;
    display: none;
    flex-shrink: 0;
    transition: color 0.2s;
  }
  .slg-search-clear:hover { color: var(--gold); }
  .slg-search-clear.show { display: flex; }

  /* ---- Filter pills ---- */
  .slg-search-filters {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-top: 1.5rem;
  }

  .slg-filter-pill {
    font-family: 'Oswald', sans-serif;
    font-size: 0.62rem;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    padding: 0.42rem 1rem;
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 100px;
    color: rgba(255,255,255,0.55);
    background: transparent;
    cursor: pointer;
    transition: all 0.18s;
    white-space: nowrap;
  }
  .slg-filter-pill:hover {
    border-color: rgba(255,255,255,0.5);
    color: rgba(255,255,255,0.9);
  }
  .slg-filter-pill.active {
    background: var(--gold);
    border-color: var(--gold);
    color: #fff;
  }

  /* ---- Results area ---- */
  .slg-search-body {
    flex: 1;
    max-width: 860px;
    width: 100%;
    margin: 0 auto;
    padding: 2rem 5vw 5rem;
  }

  /* ---- Section title ---- */
  .slg-results-title {
    font-family: 'Oswald', sans-serif;
    font-size: 0.62rem;
    font-weight: 500;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-bottom: 1.2rem;
    margin-top: 0;
  }

  /* ---- Product results grid ---- */
  .slg-results-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.25rem;
    margin-bottom: 2.5rem;
  }

  .slg-result-card {
    display: block;
    text-decoration: none;
    border-radius: 3px;
    overflow: hidden;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    transition: border-color 0.2s, transform 0.2s, background 0.2s;
    cursor: pointer;
    outline: none;
    animation: slgFadeUp 0.28s ease both;
  }
  .slg-result-card:hover,
  .slg-result-card.focused {
    border-color: var(--gold);
    background: rgba(201, 168, 76, 0.06);
    transform: translateY(-3px);
  }

  @keyframes slgFadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .slg-result-img-wrap {
    aspect-ratio: 4/3;
    overflow: hidden;
    background: rgba(255,255,255,0.04);
  }
  .slg-result-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
    display: block;
  }
  .slg-result-card:hover .slg-result-img,
  .slg-result-card.focused .slg-result-img {
    transform: scale(1.05);
  }

  .slg-result-info {
    padding: 0.85rem 0.9rem 1rem;
  }
  .slg-result-cat {
    font-family: 'Oswald', sans-serif;
    font-size: 0.58rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--gold);
    display: block;
    margin-bottom: 0.3rem;
  }
  .slg-result-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.88rem;
    font-weight: 400;
    color: #fff;
    display: block;
    margin-bottom: 0.4rem;
    line-height: 1.3;
  }
  .slg-result-title mark {
    background: transparent;
    color: var(--gold);
    font-weight: 600;
  }
  .slg-result-price {
    font-family: 'Oswald', sans-serif;
    font-size: 0.75rem;
    font-weight: 400;
    letter-spacing: 0.06em;
    color: rgba(255,255,255,0.5);
  }

  /* ---- Keyboard hint ---- */
  .slg-result-card .slg-enter-hint {
    display: none;
    position: absolute;
    bottom: 0.6rem;
    right: 0.7rem;
    font-size: 0.6rem;
    font-family: 'Oswald', sans-serif;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    opacity: 0;
    transition: opacity 0.15s;
  }
  .slg-result-card { position: relative; }
  .slg-result-card.focused .slg-enter-hint { display: block; opacity: 1; }

  /* ---- No results ---- */
  .slg-no-results {
    text-align: center;
    padding: 3rem 0;
    animation: slgFadeUp 0.2s ease both;
  }
  .slg-no-results h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.1rem;
    font-weight: 300;
    color: rgba(255,255,255,0.55);
    margin: 0 0 0.5rem;
  }
  .slg-no-results p {
    font-size: 0.82rem;
    color: rgba(255,255,255,0.28);
  }

  /* ---- Recent searches ---- */
  .slg-recents {
    margin-bottom: 2.5rem;
  }
  .slg-recent-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .slg-recent-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.38rem 0.85rem;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 100px;
    cursor: pointer;
    transition: border-color 0.18s, background 0.18s;
  }
  .slg-recent-item:hover { border-color: rgba(255,255,255,0.35); background: rgba(255,255,255,0.09); }
  .slg-recent-item span {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.8rem;
    font-weight: 300;
    color: rgba(255,255,255,0.6);
  }
  .slg-recent-del {
    background: transparent;
    border: none;
    color: rgba(255,255,255,0.25);
    cursor: pointer;
    padding: 0;
    font-size: 0.9rem;
    line-height: 1;
    display: flex;
    align-items: center;
    transition: color 0.15s;
  }
  .slg-recent-del:hover { color: var(--gold); }

  /* ---- Featured collections (empty state) ---- */
  .slg-featured-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  .slg-featured-card {
    display: block;
    position: relative;
    border-radius: 3px;
    overflow: hidden;
    aspect-ratio: 3/2;
    cursor: pointer;
    text-decoration: none;
    transition: transform 0.25s;
  }
  .slg-featured-card:hover { transform: scale(1.02); }
  .slg-featured-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s;
  }
  .slg-featured-card:hover img { transform: scale(1.06); }
  .slg-featured-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(10,17,38,0.75) 0%, transparent 55%);
  }
  .slg-featured-label {
    position: absolute;
    bottom: 0.8rem;
    left: 0.9rem;
    z-index: 1;
    font-family: 'Oswald', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #fff;
  }

  /* ---- Divider ---- */
  .slg-search-divider {
    border: none;
    border-top: 1px solid rgba(255,255,255,0.07);
    margin: 0 0 2rem;
  }

  /* ---- Responsive ---- */
  @media (max-width: 640px) {
    .slg-search-head { padding: 3rem 1.5rem 0; }
    .slg-search-body { padding: 1.5rem 1.5rem 4rem; }
    .slg-search-input { font-size: 1.5rem; }
    .slg-results-grid { grid-template-columns: 1fr 1fr; gap: 0.85rem; }
    .slg-featured-grid { grid-template-columns: 1fr; }
    .slg-search-close { top: 1rem; right: 1rem; }
  }
  `;
  document.head.appendChild(style);

  /* ================================================================
     BUILD OVERLAY HTML
     ================================================================ */
  const overlay = document.createElement('div');
  overlay.className = 'slg-search-overlay';
  overlay.id = 'slgSearchOverlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-label', 'Search');
  overlay.setAttribute('aria-modal', 'true');

  overlay.innerHTML = `
    <!-- Close button -->
    <button class="slg-search-close" id="slgSearchClose" aria-label="Close search">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>

    <!-- Search header -->
    <div class="slg-search-head">
      <span class="slg-search-label">Search Collection</span>

      <div class="slg-search-input-wrap">
        <svg class="slg-search-icon" width="22" height="22" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/>
        </svg>
        <input
          class="slg-search-input"
          id="slgSearchInput"
          type="search"
          placeholder="Search artworks, collections…"
          autocomplete="off"
          autocorrect="off"
          spellcheck="false"
          aria-label="Search artworks"
        />
        <button class="slg-search-clear" id="slgSearchClear" aria-label="Clear search">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
            <circle cx="12" cy="12" r="9"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        </button>
      </div>

      <!-- Filter pills -->
      <div class="slg-search-filters" id="slgFilters">
        <button class="slg-filter-pill active" data-filter="all">All</button>
        <button class="slg-filter-pill" data-filter="wildlife">Wildlife</button>
        <button class="slg-filter-pill" data-filter="landscape">Landscape</button>
        <button class="slg-filter-pill" data-filter="water">Water</button>
        <button class="slg-filter-pill" data-filter="open">Open Editions</button>
        <button class="slg-filter-pill" data-filter="collectors-reserve">Collector's Reserve Edition</button>
      </div>
    </div>

    <!-- Body (results / empty state) -->
    <div class="slg-search-body" id="slgSearchBody">
      <!-- Populated dynamically -->
    </div>
  `;

  document.body.appendChild(overlay);

  /* ================================================================
     STATE
     ================================================================ */
  const RECENT_KEY = 'slg_recent_searches';
  const MAX_RECENT = 6;
  let activeFilter = 'all';
  let focusedIndex = -1;
  let currentQuery = '';

  /* ================================================================
     HELPERS
     ================================================================ */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const inp = () => document.getElementById('slgSearchInput');
  const body = () => document.getElementById('slgSearchBody');

  /* Recent searches */
  function getRecents() {
    try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; } catch { return []; }
  }
  function saveRecent(q) {
    if (!q || q.length < 2) return;
    let list = getRecents().filter(x => x.toLowerCase() !== q.toLowerCase());
    list.unshift(q);
    list = list.slice(0, MAX_RECENT);
    localStorage.setItem(RECENT_KEY, JSON.stringify(list));
  }
  function removeRecent(q) {
    const list = getRecents().filter(x => x !== q);
    localStorage.setItem(RECENT_KEY, JSON.stringify(list));
  }

  /* Score-based fuzzy search */
  function scoreMatch(product, query) {
    const q = query.toLowerCase().trim();
    if (!q) return 0;
    const title = (product.title || '').toLowerCase();
    const cat   = (product.category || '').toLowerCase();
    const tags  = (product.tags || []).join(' ').toLowerCase();

    if (title === q) return 100;
    if (title.startsWith(q)) return 80;
    if (title.includes(q)) return 60;
    // word-level match
    const words = q.split(/\s+/);
    const matchCount = words.filter(w => title.includes(w) || cat.includes(w) || tags.includes(w)).length;
    if (matchCount === words.length) return 40;
    if (matchCount > 0) return 20 * (matchCount / words.length);
    if (cat.includes(q) || tags.includes(q)) return 10;
    return 0;
  }

  /* Highlight matching text */
  function highlight(text, query) {
    if (!query) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark>$1</mark>');
  }

  /* Filter products */
  function filterProducts(query) {
    const products = window.SLG_PRODUCTS || [];
    let list = products;

    // Category / tag filter
    if (activeFilter !== 'all') {
      list = list.filter(p =>
        p.category === activeFilter ||
        p.edition === activeFilter ||
        (p.tags || []).includes(activeFilter)
      );
    }

    // Text search
    if (query && query.trim()) {
      list = list
        .map(p => ({ p, score: scoreMatch(p, query) }))
        .filter(x => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(x => x.p);
    }

    return list;
  }

  /* Category representative image for featured cards */
  const featuredData = [
    { label: 'Wildlife', filter: 'wildlife',  img: 'assets/images/Wildlife/Leopard-9265-no-blood-web.jpg', href: 'the-images.html?collection=wildlife' },
    { label: 'Landscape', filter: 'landscape', img: 'assets/images/Faces/Page-6253-MAIN-website.jpg', href: 'the-images.html?collection=landscape' },
    { label: 'Water',     filter: 'water',     img: 'assets/images/Beneath the Pier/Pier MAIN web.jpg', href: 'the-images.html?collection=water' },
  ];

  /* ================================================================
     RENDER
     ================================================================ */
  function render(query) {
    currentQuery = query;
    focusedIndex = -1;

    if (!query && activeFilter === 'all') {
      renderEmpty();
    } else {
      const results = filterProducts(query);
      renderResults(results, query);
    }
  }

  function renderEmpty() {
    const recents = getRecents();
    let html = '';

    if (recents.length) {
      html += `<p class="slg-results-title">Recent Searches</p>
        <div class="slg-recents">
          <div class="slg-recent-list" id="slgRecentList">
            ${recents.map(q => `
              <div class="slg-recent-item" data-recent="${q.replace(/"/g,'&quot;')}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                  <circle cx="12" cy="12" r="9"/><polyline points="12 8 12 12 14.5 14.5"/>
                </svg>
                <span>${q}</span>
                <button class="slg-recent-del" data-del="${q.replace(/"/g,'&quot;')}" aria-label="Remove">×</button>
              </div>`).join('')}
          </div>
        </div>
        <hr class="slg-search-divider" />`;
    }

    html += `<p class="slg-results-title">Browse Collections</p>
      <div class="slg-featured-grid">
        ${featuredData.map(f => `
          <a class="slg-featured-card" href="${r}${f.href}">
            <img src="${r}${f.img}" alt="${f.label}" loading="lazy" />
            <span class="slg-featured-label">${f.label}</span>
          </a>`).join('')}
      </div>`;

    body().innerHTML = html;
    bindRecentEvents();
  }

  function renderResults(products, query) {
    if (!products.length) {
      body().innerHTML = `
        <div class="slg-no-results">
          <h3>No results for "${query}"</h3>
          <p>Try a different keyword, or browse a collection above.</p>
        </div>`;
      return;
    }

    const count = products.length;
    const countLabel = count === 1 ? '1 artwork found' : `${count} artworks found`;

    body().innerHTML = `
      <p class="slg-results-title">${query ? countLabel : 'Collection'}</p>
      <div class="slg-results-grid" id="slgResultsGrid">
        ${products.map((p, i) => `
          <a class="slg-result-card" href="${r}${p.href}"
             style="animation-delay: ${Math.min(i * 0.04, 0.3)}s"
             data-idx="${i}"
             tabindex="-1">
            <div class="slg-result-img-wrap">
              <img class="slg-result-img" src="${r}${p.img}" alt="${p.title}" loading="lazy" />
            </div>
            <div class="slg-result-info">
              <span class="slg-result-cat">${p.category}</span>
              <span class="slg-result-title">${highlight(p.title, query)}</span>
              <span class="slg-result-price">${p.priceLabel || 'From $' + p.price}</span>
            </div>
            <span class="slg-enter-hint">↵ Open</span>
          </a>`).join('')}
      </div>`;

    bindCardEvents();
  }

  /* ================================================================
     KEYBOARD NAVIGATION
     ================================================================ */
  function getCards() { return $$('.slg-result-card'); }

  function setFocus(idx) {
    const cards = getCards();
    cards.forEach((c, i) => {
      c.classList.toggle('focused', i === idx);
    });
    focusedIndex = idx;
    if (cards[idx]) cards[idx].scrollIntoView({ block: 'nearest' });
  }

  function bindCardEvents() {
    getCards().forEach(card => {
      card.addEventListener('click', function (e) {
        const query = inp().value.trim();
        if (query) saveRecent(query);
        close();
      });
    });
  }

  function bindRecentEvents() {
    $$('.slg-recent-item').forEach(item => {
      item.addEventListener('click', function (e) {
        if (e.target.closest('.slg-recent-del')) return;
        const q = this.dataset.recent;
        inp().value = q;
        render(q);
      });
    });
    $$('.slg-recent-del').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        removeRecent(this.dataset.del);
        renderEmpty();
      });
    });
  }

  /* ================================================================
     OPEN / CLOSE
     ================================================================ */
  function open() {
    overlay.classList.add('open');
    document.documentElement.style.overflow = 'hidden';
    setTimeout(() => {
      const input = inp();
      if (input) input.focus();
    }, 80);
    render('');
  }

  function close() {
    overlay.classList.remove('open');
    document.documentElement.style.overflow = '';
    const input = inp();
    if (input) input.value = '';
    render('');
  }

  /* ================================================================
     EVENT LISTENERS
     ================================================================ */

  /* Close button */
  document.getElementById('slgSearchClose').addEventListener('click', close);

  /* Click outside the content area */
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });

  /* ESC key */
  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('open')) return;

    if (e.key === 'Escape') { close(); return; }

    const cards = getCards();
    if (!cards.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocus(Math.min(focusedIndex + 1, cards.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (focusedIndex <= 0) {
        setFocus(-1);
        inp().focus();
      } else {
        setFocus(focusedIndex - 1);
      }
    } else if (e.key === 'Enter' && focusedIndex >= 0 && cards[focusedIndex]) {
      const query = inp().value.trim();
      if (query) saveRecent(query);
      window.location.href = cards[focusedIndex].href;
    }
  });

  /* Input: live search with debounce */
  let debounceTimer = null;
  const searchInput = document.getElementById('slgSearchInput');
  const clearBtn    = document.getElementById('slgSearchClear');

  searchInput.addEventListener('input', function () {
    const q = this.value;
    clearBtn.classList.toggle('show', q.length > 0);
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => render(q), 120);
  });

  /* Clear button */
  clearBtn.addEventListener('click', function () {
    searchInput.value = '';
    this.classList.remove('show');
    render('');
    searchInput.focus();
  });

  /* Filter pills */
  document.getElementById('slgFilters').addEventListener('click', function (e) {
    const pill = e.target.closest('.slg-filter-pill');
    if (!pill) return;
    $$('.slg-filter-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    activeFilter = pill.dataset.filter;
    render(searchInput.value);
    searchInput.focus();
  });

  /* ================================================================
     WIRE THE NAV SEARCH BUTTON
     ================================================================ */
  function wireButton() {
    /* The button is injected by components.js - wait for it */
    const btn = document.querySelector('.nav-icon[aria-label="Search"]');
    if (btn) {
      btn.addEventListener('click', open);
    } else {
      setTimeout(wireButton, 100);
    }
  }
  wireButton();

  /* Also wire keyboard shortcut: / or Ctrl+K */
  document.addEventListener('keydown', function (e) {
    if (overlay.classList.contains('open')) return;
    const tag = (document.activeElement || {}).tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    if (e.key === '/' || (e.ctrlKey && e.key === 'k') || (e.metaKey && e.key === 'k')) {
      e.preventDefault();
      open();
    }
  });

  /* Expose globally (for any future use) */
  window.SLGSearch = { open, close };

})();
