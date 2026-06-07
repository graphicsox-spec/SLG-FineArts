# SLG Masterworks — Fine Art Photography Website

A static, editorial-style website for **SLGMasterworks** by Sarah —
landscape & wildlife fine art photography based in Scottsdale, Arizona.

Reference inspiration: [lik.com](https://lik.com/)
Connected Etsy store: [etsy.com/shop/SLGMasterworks](https://www.etsy.com/shop/SLGMasterworks)

---

## Design Direction

- **Style** — Light editorial / magazine layout. Off-white background, dark serif headlines, generous whitespace.
- **Typography** — Cormorant Garamond (serif) + Inter (sans). Loaded from Google Fonts.
- **Palette** — Warm bone `#FAF7F2`, cream `#F2EDE4`, deep charcoal `#1A1714`, bronze accent `#8B6F47`.
- **Motion** — Subtle scroll-reveal, smooth hover transitions, no heavy animation.
- **Built for 2026** — semantic HTML, system fonts fallback, prefers-reduced-motion support, responsive grids, mobile-first.

---

## File Structure

```
SLG Art/
├── index.html                  Home
├── gallery.html                All prints with category filter
├── about.html                  Sarah's bio & process
├── contact.html                Contact form + studio details
├── collections/
│   ├── wildlife.html           Wildlife collection
│   ├── landscape.html          Landscape collection
│   ├── desert.html             Desert & Southwest collection
│   └── coastal.html            Coastal collection
├── assets/
│   ├── css/style.css           All styling (single stylesheet)
│   ├── js/main.js              Nav, scroll reveal, filter, form stubs
│   └── images/                 (Sarah — drop your product images here)
├── .gitignore
└── README.md
```

---

## Running Locally

It's a plain static site — no build step.

```bash
# from the project folder
python3 -m http.server 8000
# or with Node
npx serve .
```

Then open `http://localhost:8000`.

---

## What Sarah Needs to Do (TODOs)

Every place where Sarah's own photography should replace a placeholder Unsplash image is marked with a comment:

```html
<!-- TODO Sarah: replace with ... -->
```

To swap images:

1. Drop your photos into `assets/images/` (suggested filenames: `cathedral-rock.jpg`, `leopard.jpg`, etc.)
2. Replace each `https://images.unsplash.com/...` URL with `assets/images/<your-filename>.jpg`
3. Update the `alt=""` text to describe the photo
4. Keep aspect ratios close to `4/5` (vertical) for grid cards and `4/5` to `5/6` for editorial blocks

Other things to update:

- **Email** — `contact.html`: replace `hello@slgmasterworks.com` with your real address
- **Instagram / Pinterest** — update the `href="#"` links in every footer to your real handles
- **Form backend** — both the newsletter and contact form are front-end stubs only. To make them work, point them at Formspree, Netlify Forms, Mailchimp, or any other service
- **Bio copy** — `about.html` has placeholder bio text in your voice; tweak it to match how you'd actually introduce yourself

---

## Deploying

The site is one folder of static files — drop it anywhere:

- **GitHub Pages** — push to a repo, enable Pages on the `main` branch
- **Netlify / Vercel** — drag the folder into their dashboard
- **Cloudflare Pages** — connect the repo
- **Etsy + custom domain** — you can keep selling on Etsy and use this as your portfolio + brand site

---

## Browser Support

Tested for: Chrome, Safari, Firefox, Edge (latest 2 versions).
Designed mobile-first; degrades gracefully on older browsers.

---

© SLG Masterworks. All photography © Sarah, all rights reserved.
