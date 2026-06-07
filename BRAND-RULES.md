# SLG Masterworks — Brand & Design Rules
*Sarah L Glabman Fine Art Photography*
*Last updated: June 2026*

---

## Philosophy

Inspired by Peter Lik's approach: **huge images, lots of breathing room, very little text.**
The photography does the talking. The design gets out of the way.

> "Simplicity. It has to be easy to navigate."  — Sarah

---

## Color Palette — Navy Blue & Gold

This is the definitive color system. Navy replaces all black. Gold replaces all blue highlights.

### Light / Body Sections
| Token | Hex | Use |
|-------|-----|-----|
| `--bg` | `#FFFFFF` | Main page background |
| `--bg-2` | `#F6F6F4` | Alternate sections |
| `--surface` | `#EEEEEC` | Card backgrounds |
| `--ink` | `#141414` | Body text (stays dark for readability) |
| `--ink-muted` | `#666662` | Captions, secondary text |
| `--line` | `#E0E0DC` | Borders, hairlines |

### Brand Colors
| Token | Hex | Use |
|-------|-----|-----|
| **`--blue`** | **`#1B3F7B`** | Medium navy — nav underlines, section accents |
| `--blue-deep` | `#0D1B35` | Dark navy — replaces all black backgrounds |
| **`--gold`** | **`#C9A84C`** | **Primary accent — labels, CTAs, hover states, highlights** |
| `--gold-light` | `#DDB95A` | Lighter gold — hover states |
| `--gold-deep` | `#A8892A` | Deeper gold — pressed states |

### Dark Sections (Footer, Dropdown Panels, Gallery Headers)
| Token | Hex | Use |
|-------|-----|-----|
| `--footer-bg` | `#0D1B35` | Footer + all dark section backgrounds |
| `--footer-text` | `#A8A8A4` | Footer body text |
| `--footer-heading` | `#C9A84C` | Footer labels, headings, links — **gold** |
| `--footer-ink` | `#F0F0EE` | Footer brand name |

**Rule:** No pure black (#000 / #111 / #0A0A0A) anywhere on the site. All dark backgrounds use `#0D1B35` (dark navy).

---

## Typography

| Role | Font | Weight | Treatment |
|------|------|--------|-----------|
| **Section Labels** | Oswald | 500 | ALL CAPS · 0.32em tracking · **gold** |
| **Main Titles** (h1, h2) | Montserrat | 300–400 (Light) | Sentence case · tight tracking |
| **Subheadings** (h3, h4) | Montserrat | 400–500 | Normal |
| **Body / Descriptions** | Open Sans | 300–400 | Normal · 1.7 line-height |
| **Signature** | Pinyon Script | 400 | Branding only (logo signature) |
| **Nav Items** | Oswald | 500 | ALL CAPS · 0.2em tracking |

### Google Fonts import (all pages):
```html
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500&family=Montserrat:wght@300;400;600;700&family=Open+Sans:wght@300;400;500&family=Pinyon+Script&display=swap" rel="stylesheet" />
```

### CSS Variables:
```css
--display: "Oswald", "Arial Narrow", sans-serif;
--title:   "Montserrat", sans-serif;
--sans:    "Open Sans", -apple-system, sans-serif;
--script:  "Pinyon Script", "Allura", cursive;
```

---

## Navigation Structure

```
[SLG Masterworks logo]  ···  [THE IMAGES ▾] [SHOP] [THE ARTIST] [SHOWROOM] [CONTACT]  ···  [🔍] [🛒] [☰]
```

- Logo: **far left**, Montserrat 700
- Nav items: **center**, Oswald 500, ALL CAPS
- Icons right: Search, Cart, Hamburger
- Background: white/92% opacity with blur — sticky
- Active underline: 1px solid **gold** (`--gold`), slides in on hover
- On homepage: **transparent over hero**, turns solid white on scroll

### "THE IMAGES" Mega Menu:
Full-width dark panel with 3 typographic options: **Wildlife · Landscape · Cityscape**
- Clicking "The Images" text → `the-images.html` (master page)
- Clicking caret → opens dropdown panel → each option → filtered collection page

---

## Homepage Section Order

1. **Hero Slider** — Full viewport, transparent nav overlay, 3 slides: Wildlife → Landscape → Cityscape
2. **New Arrivals** — Label + h2 + Sarah's paragraph + print scroll
3. **Best Sellers** — Label + h2 + Sarah's paragraph + print scroll
4. **Artist Story** — Full-width image fading to white + centered story text
5. **Quote block** — Italic serif quote + attribution
6. **Newsletter** — Minimal email signup
7. **Footer** — Dark navy (`#0D1B35`), Sarah's photo darkened, gold headings

---

## Hero Slider Rules

- **Always 3 slides**: Wildlife → Landscape → Cityscape
- Full viewport, transparent nav overlays the image
- Each slide: eyebrow label · large title · location · **BUY NOW** + **SEE MORE** buttons (equal-size outlined boxes)
- Numbered segment track at bottom: `01 — 02 — 03` (Oswald, hairline track)
- Auto-advance every 5.5s, pause on hover, keyboard arrow support
- **NO "Shop on Etsy" button anywhere**

---

## Footer Rules

- Background: `#0D1B35` (dark navy — NOT black)
- Sarah's photo behind dark overlay (opacity ~28%)
- Photo file: `assets/images/ChatGPT Image.jpg`
- Heading labels: Oswald 500, **gold** (`#C9A84C`)
- Brand name: Montserrat 700, white
- 4-column grid: Brand + social / The Images / The Artist / Service

---

## Print Card Layout

```
┌─────────────────────────────┐
│    [Image — contained]      │
├─────────────────────────────┤
│ Title          From $395    │
├─────────────────────────────┤
│ LOCATION TAG                │
└─────────────────────────────┘
```

- Background: `--bg-2`
- Border: 1px `--line` → hover: 1px **gold**
- Price label: Oswald, **gold**
- Tag: Oswald, `--ink-muted`, ALL CAPS

---

## What to Avoid

- ❌ Pure black (`#000`, `#111`, `#0A0A0A`) — use dark navy `#0D1B35` instead
- ❌ Mid-range blue highlights — use **gold** for all accent/highlight states
- ❌ Swirly / decorative fonts outside of the signature
- ❌ "Shop on Etsy" buttons anywhere
- ❌ Cluttered layouts — always ask: can we remove this element?
- ❌ Text competing with the photography

## What to Keep / Reinforce

- ✅ Huge images — let them breathe
- ✅ White space is design, not emptiness
- ✅ Every section label in Oswald ALL CAPS gold above Montserrat title
- ✅ Navy blue backgrounds on dark sections, gold accents for all highlights
- ✅ Photography categories always in trio: Wildlife · Landscape · Cityscape
- ✅ Footer always dark navy with the artist photo

---

## File Structure

```
SLG Art 060626/
├── index.html              ← Homepage
├── about.html              ← The Artist
├── gallery.html            ← All Prints / Shop
├── contact.html            ← Contact
├── the-images.html         ← Collections master page
├── 404.html
├── collections/
│   ├── wildlife.html
│   ├── landscape.html
│   ├── coastal.html
│   ├── baby-leopard.html
│   ├── moonrise-namibia.html
│   └── beneath-the-pier.html
├── assets/
│   ├── css/style.css       ← All styles (shared)
│   ├── images/
│   │   ├── ChatGPT Image.jpg  ← Footer background
│   │   └── [all photo assets]
│   └── js/
│       ├── components.js   ← Shared header + footer injector
│       └── main.js         ← Page interactions
└── BRAND-RULES.md          ← This file
```
