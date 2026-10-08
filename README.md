# Portfolio — static HTML + Tailwind CDN + vanilla JS

Single-page design/creative showcase. No build step.

## Setup

No install needed. Use any static server:

```bash
cd portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

Or VS Code Live Server, or `npx serve .`.

## Structure

```
portfolio/
  index.html       # nav, hero, work+modal, about, services, testimonials, contact, footer
  css/styles.css   # reveal animation, modal, reduced-motion
  js/main.js       # theme, menu, filter, modal, form demo, reveal
  assets/          # put covers, portraits, resume.pdf here
  README.md
```

## Customize

1. `index.html` — name, tagline, social links, testimonials, resume href.
2. `js/main.js` `projects` array — replace 6 demo items with real title/category/year/blurb/detail.
3. `assets/` — add images, swap gradient placeholders for `<img src="assets/cover-1.jpg">`.
4. Contact form — currently demo success state. To go live, set `action="https://formspree.io/f/YOUR_ID"` + `method="POST"` or deploy to Netlify with `data-netlify="true"`.
5. Theme defaults to dark; toggle persists in localStorage.

## Deploy

Static hosting: GitHub Pages, Netlify Drop, Vercel, Cloudflare Pages. Just upload `portfolio/`.

## Notes

- Tailwind via CDN (`cdn.tailwindcss.com`) — fine for prototype/portfolio, not for large production apps.
- Prior spec at `docs/superpowers/specs/2026-10-07-portfolio-design.md` targets Astro; this scaffold is the simplified static variant requested 2026-10-07.
