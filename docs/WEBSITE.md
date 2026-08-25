<h1 align="center">The website</h1>

<p align="center"><em>Zero dependencies, no build step, 100% vibe-coded.</em></p>

---

[enki.ngo](https://enki.ngo) is a hand-tuned static site — vanilla HTML, CSS and JavaScript, no framework, no bundler, no package.json. This repository **is** the site: what you read here is byte-for-byte what the server serves.

## The files

| File | Purpose |
|---|---|
| `index.html` | The whole site — hero, manifesto modal, standards, Why Enki, Wally, registry, models, institute & advisory, membership |
| `style.css` | The design system: warm paper palette, forest green + Sumerian gold, light and dark themes, all components |
| `app.js` | Behaviour: theme toggle, modals, scroll reveals, registry search/filter/sort, submission wizard, membership application |
| `data.js` | Seed dataset — the registry of ≥90% vibe-coded builds and the directory of open models |
| `base.css` | Minimal reset and primitives loaded before the design system |
| `.htaccess` | Cache policy: HTML always revalidates; versioned CSS/JS/SVG cache for a year |
| `assets/` | The mark (`logo.svg`), the banner and the engravings |

## Conventions

- **Cache-busting** — `style.css`, `app.js` and `data.js` are referenced with a `?v=YYYYMMDD-NN` query. Any change to those files bumps the version everywhere; HTML/text-only edits don't.
- **Typography** — Zodiak (display serif), Satoshi (text), JetBrains Mono (data), served from Fontshare/CDN.
- **Themes** — light is the warm-paper default; dark is a full re-tint via `data-theme="dark"`, not a filter.
- **Accessibility** — semantic landmarks, `aria-label`s on icon controls, focus-visible states, `prefers-reduced-motion` honoured.
- **Modals** — the manifesto and application flows are in-page modals; deep links use `data-open-modal` and `data-modal-anchor` attributes.

## Running locally

```bash
git clone https://github.com/paulfxyz/enki.git
cd enki
python3 -m http.server 8080
# open http://localhost:8080
```

No install, no build. Editing a file and refreshing is the whole workflow.

## Submissions

Registry submissions and membership applications post to an interim, access-controlled store (Supabase) using a publishable key — write-only from the browser, read by humans. Where the data ultimately lives is a decision for the 300, like everything else. ([Governance →](GOVERNANCE.md))

## Deployment

The site is served at **[enki.ngo](https://enki.ngo)**, with a mirror at **[enki.pplx.app](https://enki.pplx.app)**. `MANIFESTO.md` and `docs/` are repository-only — the site carries the same text in `index.html`.

---

<p align="center">
  <sub>Part of the <a href="../README.md">Enki repository</a> · <a href="https://enki.ngo">enki.ngo</a></sub>
</p>
