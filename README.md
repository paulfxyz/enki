<p align="center">
  <img src="assets/logo.svg" width="80" alt="Enki mark" />
</p>

<h1 align="center">Enki</h1>

<p align="center"><strong>Intelligence belongs on your devices, not in their datacenters.</strong></p>

<p align="center">
  <a href="https://enki.ngo"><img src="https://img.shields.io/badge/website-enki.ngo-2a5c3f?style=flat-square" alt="enki.ngo"></a>
  <a href="MANIFESTO.md"><img src="https://img.shields.io/badge/manifesto-86_references-a1731c?style=flat-square" alt="Manifesto, 86 references"></a>
  <img src="https://img.shields.io/badge/association-non--profit_·_non--government-437a22?style=flat-square" alt="Non-profit, non-government association">
  <img src="https://img.shields.io/badge/founding_seats-300-1d221b?style=flat-square" alt="300 founding seats">
  <img src="https://img.shields.io/badge/vibe--coded-100%25-6daa45?style=flat-square" alt="100% vibe-coded">
  <img src="https://img.shields.io/badge/stack-vanilla_HTML/CSS/JS-6e7266?style=flat-square" alt="Vanilla stack">
</p>

<p align="center">
  <img src="assets/banner.jpg" alt="Enki, the Sumerian god of wisdom and fresh water, pouring streams of small stars toward everyday devices joined in a mesh" width="100%" />
</p>

**Enki** is a public-good, non-profit, non-government association named after the Sumerian god of wisdom, fresh water and craft — the one who, when the gods voted to flood mankind, leaked the plan and taught a mortal to build a boat. Intelligence was hoarded above; a leak saved humanity. Everything we do is written from his side of that argument.

The cost of intelligence has collapsed. Our answer to the centralised AI frenzy:

> **High-level AI should be rare, licensed and accountable — everyday AI should be everywhere, local, and effectively free.**

This repository is Enki's home in the open: the manifesto, the doctrine, and the entire enki.ngo website — every file, in public, from day one. As Enki grows, everything that matters will live here.

---

## Start here

| | |
|---|---|
| 📜 **[The Manifesto](MANIFESTO.md)** | A letter on the state of intelligence — ten articles, a postface, **86 references**. The founding document; everything else derives from it. |
| 🏛️ **[Governance — the 300](docs/GOVERNANCE.md)** | How the association is run: 300 founding seats, one member one ballot, the annual mutual audit, the 3× compensation rule. |
| 🕸️ **[Wally & the local mesh](docs/WALLY.md)** | Our ambition: the local AI datacenter in every home, behind one open interface. |
| 📐 **[The standard we need](docs/STANDARD.md)** | Four clauses that would make local intelligence as ordinary as a lightbulb. |
| 📊 **[The Registry & the Models](docs/REGISTRY.md)** | What software really costs now, and the open models we validate for small hardware. |
| 🔧 **[The website](docs/WEBSITE.md)** | How this zero-dependency site is built, run and deployed. |
| ❓ **[FAQ](docs/FAQ.md)** | Short answers to the questions we get most. |

## The six pillars

1. **The Manifesto** — a referenced letter on why the AI capex frenzy is the wrong bottleneck ([read it](MANIFESTO.md))
2. **Wally** — our ambition: an open-source AI interface that treats local, everyday models as first-class citizens ([the plan](docs/WALLY.md))
3. **The Registry** — a public dataset of products that are ≥90% vibe-coded, with tools, models and total USD cost declared
4. **The Models** — a member-validated directory of open models best adapted to self-hosting on limited hardware — a laptop, a desktop, even a phone
5. **The Institute** — socio-economic and cultural research on what abundant intelligence does to societies
6. **The Advisory** — consultancy that carries that evidence into policy rooms and funds the association's public-good work

<p align="center">
  <img src="assets/mesh.jpg" alt="Cutaway of a house at night, its everyday devices joined into one glowing local mesh" width="62%" />
</p>

## The local AI datacenter

The real invention is not a chat window. It lives in the local mesh — **your local AI datacenter** — where every device whose NPU or GPU can carry a small model connects over WiFi and takes the work it can carry, behind a single API/MCP interface. That interface runs alongside a fully open-source fork of LibreChat and an engine sourced from Ollama — we call it **Wally**, and the whole bundle the **Wally Package**.

Wally does not exist yet. It is what we are assembling the 300 to build. [Read the full ambition →](docs/WALLY.md)

## The 300

<p align="center">
  <img src="assets/the-300.jpg" alt="Three hundred figures in concentric rings around a gold Sumerian star" width="62%" />
</p>

Enki is an association you belong to, not a newsletter you subscribe to. The founding core is **limited to 300 seats** — 299 individuals plus Paul Fleury, the founder. There is **no fee and no payment**: applicants are selected on what they can contribute — skills, networks or capital/donations — not on what they can pay. Membership is for **individuals only**, each ID-verified and interviewed, confirmed one by one. Decisions are taken by **DAO-signed votes — one member, one ballot**. Once a year, the whole 300 conduct a mutual audit: the 10% judged to have contributed least leave — no seat exempt, the founder's included — and 30 new recruits step up from the pipeline. [How governance works →](docs/GOVERNANCE.md)

→ **Apply at [enki.ngo](https://enki.ngo)** — every application is read by a person; nobody gets in, or gets passed over, automatically.

## How the site works (for beginners)

Enki's website is deliberately old-fashioned: **no build step, no framework, no bundler**. It's plain HTML, CSS and JavaScript files that a browser reads directly, and a tiny PHP script for the one thing static files can't do (remembering something on a server). If you can open a text editor, you can read the entire site.

**Loading the page and picking a language.** Before anything else renders, a small script in `index.html`'s `<head>` checks `localStorage` for a language the visitor picked on an earlier visit (defaulting to English), and — for Arabic, Hebrew or Urdu — flips the page to right-to-left. If a non-English language is active, it loads that language's dictionary file from `assets/i18n/<lang>.js`. Once the page's HTML has loaded, `app.js` runs a single "apply i18n" pass: it walks every element carrying a `data-i18n="keyNNN"` attribute and swaps in the matching string from the loaded dictionary. Think of `data-i18n` as a sticky note that says *my text lives under this key* — the dictionary is just a big lookup table of `{ "keyNNN": "translated text" }`. There are **20 languages** in total, including three right-to-left ones (`ar`, `he`, `ur`), each shipped as its own dictionary file so nothing is downloaded that isn't needed. The little globe button in the header opens a language picker; choosing one saves the choice and reloads the page.

**The pricing duel widget.** Every entry in the Model Registry gets a flip card that compares two ways of running that model: paying a cloud API by the token, versus self-hosting it on your own hardware. Cloud pricing comes straight from published rates; the self-host side is a plain-text estimate like `Self-host ≈ $0.03–0.70 /1M · 24GB GPU`, meaning "if you ran this yourself, expect roughly this dollar range per million tokens once you count electricity and hardware wear, and you'd need roughly this GPU to do it." Clicking the card flips it over to reveal the verdict: is self-hosting meaningfully cheaper, about the same, or is the cloud actually cheaper for this particular model? Self-hosted use is never called "free" on this site — it still costs real electricity and real hardware, just usually much less than a metered API, which is why we say **effectively free** instead.

**The registry and the forms.** The Registry section lists example products built mostly by AI ("vibe-coded"), each with the tools and models used and a declared build cost, kept in a small in-memory list that re-renders whenever you search, filter by tool, or change the sort order. Below it, an "Add your build" button opens a multi-step form wizard — product details, then the tools/models used, then the cost, then a review screen before you submit. The same wizard pattern (step through fields, validate, show a review, submit) is reused for the membership application and the contact form.

**The PHP/SQLite backend.** All three forms end by sending a small JSON message to `api/submit.php` — the only server-side code in the whole project. It checks the request comes from Enki's own domain, makes sure every field looks sane (right shape, not absurdly long), computes a privacy-preserving hash of the sender's IP just to prevent spam floods, and then stores the whole thing as one row in a small SQLite database file (SQLite is a full database that lives in a single file, so there's no separate database server to run). New submissions are stored as **pending** — nothing is published to the live site automatically; a human reviews the stored submissions before anything appears publicly. See [`api/submit.php`](api/submit.php) for the exact steps, or the longer walkthrough in [`docs/HOW-IT-WORKS.md`](docs/HOW-IT-WORKS.md).

## How the translations were made

All 20 languages are meant to read as if a native speaker wrote them, not as if a machine translated them word-for-word. The process: **19 translator AI agents**, one dedicated to each non-English language, each working from the same English source dictionary and briefed to translate meaning and tone rather than words, followed by a **3-model proofread audit** where a separate set of AI models independently re-read every translated dictionary looking for mistranslations, awkward phrasing, or inconsistent terminology. On top of that, every dictionary passes **structural validation** before it ships: a script checks that it has exactly the same set of keys as the English source (nothing missing, nothing extra), that HTML tags and `{{svg}}`/`{placeholder}` tokens embedded inside translated strings match the English original one-for-one (so formatting can't break in translation), and that the intro film's subtitle cue timings line up cue-for-cue with the English track. Translations live in `assets/i18n/` and are intentionally out of scope for this pass of the codebase — only the surrounding site code was touched here.

## This repository

| Path | Purpose |
|---|---|
| [`MANIFESTO.md`](MANIFESTO.md) | The full manifesto letter — ten articles, the postface, all 86 references |
| [`docs/`](docs/) | The doctrine, one document per pillar, plus the beginner walkthrough |
| [`docs/HOW-IT-WORKS.md`](docs/HOW-IT-WORKS.md) | A kid-friendly, numbered walkthrough of what happens when you open the page, click a language, submit a form, or watch the intro film |
| [`index.html`](index.html) | The whole site: hero, manifesto, standards, Wally, registry, models, institute, membership, and all the modals (language picker, forms, intro film) |
| [`base.css`](base.css) | A small CSS reset/primitives file, loaded before `style.css`, with no visual design of its own |
| [`style.css`](style.css) | Design system — warm paper palette, Zodiak/Satoshi/JetBrains Mono, light + dark themes |
| [`app.js`](app.js) | Every interactive behaviour on the page: i18n apply pass, language modal, registry search/filter/sort, the pricing duel widget, the form wizards, mobile tap-to-expand cards, and the intro film's custom video controller and subtitles |
| [`data.js`](data.js) | Plain data only, no logic: the seed dataset for the Registry, the Model Registry (open-weight models with hosted vs. self-host pricing), and the searchable "who we're looking for" profile examples |
| [`api/submit.php`](api/submit.php) | The one server-side script: validates and stores form submissions (registry entries, membership applications, contact messages) in a small SQLite database, as pending entries awaiting human review |
| [`assets/`](assets/) | The mark, the banner, the engravings, the intro film and its subtitle track |
| [`assets/i18n/`](assets/i18n/) | One dictionary file per language (20 total, including right-to-left Arabic/Hebrew/Urdu), plus the translation and validation scripts used to build and check them |

### Running locally

No build step, no dependencies — any static file server works:

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

The form wizards (registry submissions, membership, contact) need the PHP backend to actually store anything; without it the forms still work in the browser but submission will fail. If you have PHP available:

```bash
php -S localhost:8080
# open http://localhost:8080
```

More in [docs/WEBSITE.md](docs/WEBSITE.md).

### Deployment

The site is published straight from this GitHub repository ([github.com/paulfxyz/enki](https://github.com/paulfxyz/enki)) to its primary domain, **enki.ngo**, with a mirror kept in sync at **enki.pplx.app**. There is no build/CI pipeline to run first — the files in this repo are the files that get served.

## Licence

Code is released under the [MIT licence](LICENSE.md); the manifesto, documents and illustrations under [CC BY-SA 4.0](LICENSE.md). Share it, translate it, argue with it — with attribution, and keep it open.

## Colophon

Designed and built ~100% by AI agents, directed by a human — exactly the way of working the registry documents. Warm paper palette, forest green, Sumerian gold. Typeset in Zodiak, Satoshi and JetBrains Mono.

---

<p align="center">
  <sub>Paul Fleury · Founder & 1st of the 300 · Lisbon, August 2026</sub><br/>
  <sub>© Enki Association · <a href="https://enki.ngo">enki.ngo</a></sub>
</p>
