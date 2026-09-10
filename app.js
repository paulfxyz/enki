/* ============================================================
   ENKI — app.js

   This is the ONE JavaScript file that brings the whole page to
   life. There is no build step and no framework: the browser reads
   this file top to bottom, exactly as written, right after the
   page's HTML has loaded.

   The file is organised as a series of independent "chunks" —
   mostly IIFEs, i.e. functions written as (function () { ... })()
   so they run immediately and keep their variables private instead
   of leaking them onto the global `window`. Think of each chunk as
   its own small program with one job:

     - i18n string lookup + apply pass    (translate the page)
     - language modal                     (the "choose a language" popup)
     - theme toggle · hero mesh canvas · scroll reveal · sticky header
     - the REGISTRY (search / filter / sort the list of community builds)
     - the pricing duel widget            (cloud vs self-host cost compare)
     - generic modal open/close plumbing  (shared by every popup on the page)
     - the ADD-ENTRY WIZARD               (multi-step form to submit a build)
     - nav scroll-spy, mobile menu
     - the MEMBERSHIP application wizard and the CONTACT wizard
     - click-spark decoration, the "who we're looking for" search box,
       the Wally compute-selector mock-up, mobile tap-to-expand cards
     - the INTRO FILM MODAL              (the custom video player + subtitles)

   Skim the section banners (the boxed comments with ===== borders)
   to jump straight to the part you're curious about.
   ============================================================ */

/* ---- i18n string lookup ----
   `T(key, fallback)` is the helper every other chunk calls to fetch a
   translated string. If a language dictionary was loaded (see the
   bootstrap `<script>` in index.html's <head>), it looks the key up
   there; otherwise it just returns the English `fallback` text you
   passed in. This means the site still works perfectly even if a
   translation file is missing a key — it silently falls back to English. */
window.T = window.T || function (k, f) {
  var d = window.ENKI_I18N;
  return (d && d.strings && Object.prototype.hasOwnProperty.call(d.strings, k)) ? d.strings[k] : f;
};
/* ---- i18n apply pass ----
   This chunk runs once, right when the page loads, and does the actual
   translating: it walks every element that carries a `data-i18n="..."`
   attribute in the HTML and swaps in the matching string from the loaded
   dictionary. Think of `data-i18n` as a sticky note on an element saying
   "my text lives under this key in the dictionary" — this code reads the
   note and fills in the text. It also handles a few special cases:
   attributes (placeholder, aria-label, title, alt, meta content) via
   `data-i18n-<attr>`, SVG icons embedded inside translated strings via a
   `{{svg1}}` placeholder syntax, and translating the two JS data arrays
   (ENKI_MODELS, ENKI_PROFILES) that get rendered into HTML later by other
   parts of this file. */
(function () {
  var D = window.ENKI_I18N;
  var code = document.querySelector('.lang-toggle__code');
  if (code) code.textContent = (window.ENKI_LANG || 'en').toUpperCase();
  if (!D || !D.strings) return;
  var S = D.strings;
  var has = function (k) { return Object.prototype.hasOwnProperty.call(S, k); };
  if (has('doc.title')) document.title = S['doc.title'];
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var k = el.getAttribute('data-i18n');
    if (!has(k)) return;
    var v = S[k];
    if (v.indexOf('{{svg') > -1) {
      var list = Array.prototype.map.call(el.querySelectorAll('svg'), function (s) { return s.outerHTML; });
      v = v.replace(/\{\{svg(\d+)\}\}/g, function (_, i) { return list[i - 1] || ''; });
    }
    el.innerHTML = v;
  });
  ['placeholder', 'aria-label', 'title', 'alt', 'content'].forEach(function (at) {
    document.querySelectorAll('[data-i18n-' + at + ']').forEach(function (el) {
      var k = el.getAttribute('data-i18n-' + at) + '@' + at;
      if (has(k)) el.setAttribute(at, S[k]);
    });
  });
  if (window.ENKI_MODELS) {
    window.ENKI_MODELS.forEach(function (m) {
      var b = 'md.' + m.id + '.';
      if (has(b + 'selfHost')) m.selfHost = S[b + 'selfHost'];
      ['pros', 'cons'].forEach(function (f) {
        (m[f] || []).forEach(function (_, i) {
          if (has(b + f + '.' + i)) m[f][i] = S[b + f + '.' + i];
        });
      });
    });
  }
  if (window.ENKI_PROFILES) {
    var cats = [];
    window.ENKI_PROFILES.forEach(function (p) {
      if (cats.indexOf(p.c) === -1) cats.push(p.c);
    });
    window.ENKI_PROFILES.forEach(function (p, i) {
      var ci = cats.indexOf(p.c);
      var tk = 'pt.' + ('00' + i).slice(-3);
      if (has(tk)) p.t = S[tk];
      if (has('pc.' + ci)) p.c = S['pc.' + ci];
    });
  }
})();
/* ---- Language modal ----
   Wires up the little globe button in the header: clicking it opens a
   dialog listing all supported languages. Picking one saves the choice
   in `localStorage` (so it's remembered next visit) and reloads the
   page — the i18n bootstrap script in <head> then picks it up and loads
   the right dictionary before anything is drawn. */
(function () {
  var modal = document.getElementById('lang-modal');
  var opener = document.querySelector('[data-lang-toggle]');
  if (!modal || !opener) return;
  var cur = window.ENKI_LANG || 'en';
  modal.querySelectorAll('.langmodal__opt').forEach(function (o) {
    if (o.getAttribute('data-lang') === cur) o.classList.add('is-active');
    o.addEventListener('click', function () {
      var l = o.getAttribute('data-lang');
      if (l === cur) { close(); return; }
      try { localStorage.setItem('enki-lang', l); } catch (e) {}
      location.reload();
    });
  });
  function open() {
    modal.hidden = false;
    requestAnimationFrame(function () { modal.classList.add('is-open'); });
    document.body.style.overflow = 'hidden';
  }
  function close() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(function () { modal.hidden = true; }, 220);
  }
  opener.addEventListener('click', open);
  modal.querySelector('[data-lang-close]').addEventListener('click', close);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) close();
  });
})();
/* ---- Main app IIFE ----
   Everything below runs inside one big "use strict" function so its
   helper variables (state, DOM references, etc.) stay private to this
   file instead of cluttering the global `window` object. */
(function () {
  'use strict';

  /* ---------------- Submissions store ----------------
     Both the "add a build" wizard and the membership/contact forms end
     up calling this one function to actually save what the visitor typed. */
  /* Same-domain PHP+SQLite backend on SiteGround — no third-party DB, nothing to auto-pause. */
  const DB_URL = 'https://enki.ngo/api/submit.php';
  /* Resolves to true only when the write is acknowledged — callers must not
     announce success otherwise (we keep the receipts, starting with our own). */
  function recordSubmission(kind, name, email, payload) {
    let ctl = null;
    let timer = null;
    try {
      if (typeof AbortController !== 'undefined') {
        ctl = new AbortController();
        timer = setTimeout(() => ctl.abort(), 8000);
      }
      return fetch(DB_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind: kind,
          name: name || null,
          email: email || null,
          payload: payload || {},
          page: location.hostname,
          user_agent: (navigator.userAgent || '').slice(0, 200),
        }),
        keepalive: true,
        signal: ctl ? ctl.signal : undefined,
      })
        .then((r) => {
          if (timer) clearTimeout(timer);
          return r.ok;
        })
        .catch(() => {
          if (timer) clearTimeout(timer);
          return false;
        });
    } catch (e) {
      if (timer) clearTimeout(timer);
      return Promise.resolve(false);
    }
  }

  /* ---------------- Theme toggle ---------------- */
  const root = document.documentElement;
  const toggle = document.querySelector('[data-theme-toggle]');
  const sun =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  const moon =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  let theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const applyTheme = () => {
    root.setAttribute('data-theme', theme);
    if (toggle) {
      toggle.innerHTML = theme === 'dark' ? sun : moon;
      toggle.setAttribute('aria-label', theme === 'dark' ? T('js.aria.toLight', 'Switch to light mode') : T('js.aria.toDark', 'Switch to dark mode'));
    }
  };
  applyTheme();
  toggle && toggle.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    applyTheme();
  });

  /* ---------------- Hero mesh canvas ----------------
     Devices as nodes; edges appear when nodes are near —
     a living picture of the "local AI datacenter". */
  const canvas = document.getElementById('mesh');
  if (canvas && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    let w, h, nodes, raf;
    const DENSITY = 1 / 22000;

    function resize() {
      const r = canvas.getBoundingClientRect();
      w = canvas.width = r.width * devicePixelRatio;
      h = canvas.height = r.height * devicePixelRatio;
      const count = Math.min(70, Math.max(24, Math.round(r.width * r.height * DENSITY)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18 * devicePixelRatio,
        vy: (Math.random() - 0.5) * 0.18 * devicePixelRatio,
        r: (Math.random() * 1.6 + 1.1) * devicePixelRatio,
      }));
    }

    function colors() {
      const s = getComputedStyle(root);
      return {
        node: s.getPropertyValue('--color-primary').trim(),
        line: s.getPropertyValue('--color-text-faint').trim(),
      };
    }

    function tick() {
      ctx.clearRect(0, 0, w, h);
      const c = colors();
      const LINK = 120 * devicePixelRatio;
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      ctx.lineWidth = 0.6 * devicePixelRatio;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx.globalAlpha = (1 - d / LINK) * 0.5;
            ctx.strokeStyle = c.line;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = c.node;
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    }

    resize();
    tick();
    addEventListener('resize', () => {
      cancelAnimationFrame(raf);
      resize();
      tick();
    });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else tick();
    });
  }

  /* ---------------- Sticky header shadow ---------------- */
  const header = document.querySelector('.header');
  addEventListener('scroll', () => {
    header && header.classList.toggle('header--scrolled', scrollY > 8);
  }, { passive: true });

  /* ---------------- Scroll reveal ---------------- */
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-revealed');
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  /* ============================================================
     REGISTRY
     The "Registry" section of the page lists community-built AI
     products. This chunk keeps that list in a small `state` object,
     re-renders the visible cards whenever the visitor types in the
     search box, clicks a tool filter chip, or changes the sort order,
     and also renders the model pricing cards further down the page.
     ============================================================ */
  const state = {
    entries: (window.ENKI_SEED || []).slice(),
    q: '',
    tool: 'all',
    sort: 'newest',
  };

  const listEl = document.getElementById('registry-list');
  const emptyEl = document.getElementById('registry-empty');
  const countEl = document.getElementById('registry-count');
  const searchEl = document.getElementById('registry-search');
  const sortEl = document.getElementById('registry-sort');
  const chipRow = document.getElementById('tool-chips');

  const fmtUSD = (n) =>
    '$' + Number(n).toLocaleString('en-US', { maximumFractionDigits: 0 });

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function toolSet() {
    const set = new Set();
    state.entries.forEach((e) => e.tools.forEach((t) => set.add(t)));
    return ['all', ...Array.from(set).sort()];
  }

  function renderChips() {
    if (!chipRow) return;
    chipRow.innerHTML = toolSet()
      .map(
        (t) =>
          `<button class="chip" data-tool="${esc(t)}" aria-pressed="${state.tool === t}">${
            t === 'all' ? T('js.allTools', 'All tools') : esc(t)
          }</button>`
      )
      .join('');
  }

  function filtered() {
    const q = state.q.trim().toLowerCase();
    let out = state.entries.filter((e) => {
      const hay = [e.name, e.desc, e.tools.join(' '), e.models.join(' ')].join(' ').toLowerCase();
      const matchQ = !q || hay.includes(q);
      const matchTool = state.tool === 'all' || e.tools.includes(state.tool);
      return matchQ && matchTool;
    });
    const sorters = {
      newest: (a, b) => new Date(b.date) - new Date(a.date),
      'cost-asc': (a, b) => a.cost - b.cost,
      'cost-desc': (a, b) => b.cost - a.cost,
      name: (a, b) => a.name.localeCompare(b.name),
    };
    return out.sort(sorters[state.sort] || sorters.newest);
  }

  function highlight(text, q) {
    if (!q) return esc(text);
    const safe = esc(text);
    const rx = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
    return safe.replace(rx, '<mark>$1</mark>');
  }

  const GH_ICON =
    '<svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>';

  const WEB_ICON =
    '<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><circle cx="8" cy="8" r="6.4"/><ellipse cx="8" cy="8" rx="2.9" ry="6.4"/><path d="M1.6 8h12.8"/></svg>';

  const LI_ICON =
    '<svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M3.7 1.5a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2ZM2.3 6h2.8v8.5H2.3V6Zm4.5 0h2.7v1.2h.04c.37-.7 1.28-1.44 2.63-1.44 2.8 0 3.33 1.85 3.33 4.25v4.49h-2.8v-3.98c0-.95-.02-2.17-1.32-2.17-1.33 0-1.53 1.03-1.53 2.1v4.05H6.8V6Z"/></svg>';

  const LINK_ICONS = { gh: GH_ICON, web: WEB_ICON, li: LI_ICON };

  function repoBadge(e) {
    if (e.repo)
      return `<a class="badge badge--repo" href="https://github.com/${esc(e.repo)}" target="_blank" rel="noopener noreferrer">${GH_ICON}<span>${esc(e.repo)}</span></a>`;
    try {
      const host = new URL(e.url).hostname.replace(/^www\./, '');
      return `<a class="badge badge--repo" href="${esc(e.url)}" target="_blank" rel="noopener noreferrer">${WEB_ICON}<span>${esc(host)}</span></a>`;
    } catch {
      return '';
    }
  }

  /* ---- Model registry (Registry 02) ----
     Reads pricing straight out of the plain-text fields in data.js
     (see that file's header for the exact string formats) so the
     numbers can be typed as human-readable text like "$0.29" and
     "Self-host ≈ $0.03–0.70 /1M · 24GB GPU" and still be compared
     mathematically here. */
  /* Pulls the dollar amount out of a hosted-API price string, e.g.
     parseMoney('$0.29') -> 0.29. Returns NaN if nothing looks like a price
     (used for models with no hosted lane, shown as '—'). */
  function parseMoney(s) {
    const m = /\$([\d.]+)/.exec(s || '');
    return m ? parseFloat(m[1]) : NaN;
  }
  /* Reads a `selfHost` string like "Self-host ≈ $0.03–0.70 /1M · 24GB GPU"
     and pulls out the low/high price range plus the hardware description
     after the ·. Returns null if the string doesn't match that shape
     (e.g. it's empty). */
  function parseSelfHost(s) {
    const m = /\$([\d.]+)\s*[–—-]\s*\$?([\d.]+)/.exec(s || '');
    if (!m) return null;
    const parts = (s || '').split('·');
    return { lo: +m[1], hi: +m[2], hw: parts.slice(1).join('·').trim() };
  }
  const fN = (n) => (n >= 10 ? String(Math.round(n)) : String(Math.round(n * 100) / 100));
  const fX = (n) => (n >= 10 ? String(Math.round(n)) : String(Math.round(n * 10) / 10));
  /* ---- Pricing duel widget ----
     Builds the little "CLOUD API vs SELF-HOSTED" flip-card shown on
     each model card. It compares the blended hosted price (average of
     input/output token cost) against the self-hosted price range and
     picks one of three verdicts: self-hosting is meaningfully cheaper,
     about the same, or hosted is actually cheaper. The card is a single
     <button> that flips over on click (handled in wireDuels below) to
     reveal that verdict on its back face. */
  function priceDuel(m) {
    const pin = parseMoney(m.priceIn);
    const pout = parseMoney(m.priceOut);
    const self = parseSelfHost(m.selfHost);
    if (self && (isNaN(pin) || isNaN(pout))) {
      return `
      <div class="pduel pduel--solo">
        <span class="pduel__face pduel__face--front">
          <span class="pduel__row pduel__row--local">
            <span class="pduel__tag">${T('js.duel.localOnly', 'LOCAL-ONLY')}</span>
            <span class="pduel__amt">≈ $${fN(self.lo)}–$${fN(self.hi)} <em>${T('js.duel.per1mShort', '/1M')}</em></span>
            <span class="pduel__bar" style="--w:100%"></span>
            <span class="pduel__src">${esc(self.hw || m.selfHost)}</span>
          </span>
          <span class="pduel__src">${T('js.duel.soloNote', 'No hosted reference rate — this one lives on your own hardware.')}</span>
        </span>
      </div>`;
    }
    if (!self || isNaN(pin) || isNaN(pout)) {
      return `<div class="model-card__price"><span class="model-card__amount">${esc(m.priceIn)} <em>/</em> ${esc(m.priceOut)}</span><span class="model-card__unit">${T('js.per1m', 'per 1M tokens · hosted · in / out')}</span>${m.selfHost ? `<span class="model-card__self">${esc(m.selfHost)}</span>` : ''}</div>`;
    }
    const blended = (pin + pout) / 2;
    const mid = (self.lo + self.hi) / 2;
    const mult = blended / mid;
    const cw = blended >= mid ? 100 : Math.max(4, (blended / mid) * 100);
    const lw = mid >= blended ? 100 : Math.max(4, (mid / blended) * 100);
    let verdictBig, verdictLbl, note;
    if (mult >= 1.5) {
      verdictBig = '≈ ' + fX(mult) + '×';
      verdictLbl = T('js.duel.cheaper', 'cheaper self-hosted');
      note = T('js.duel.note', '{cloud} blended cloud vs ≈ {local} self-hosted per 1M tokens — you pay hardware and energy, not per token. Rates: openrouter.ai · artificialanalysis.ai, Aug 2026.')
        .replace('{cloud}', '$' + fN(blended))
        .replace('{local}', '$' + fN(mid));
    } else if (mult > 0.67) {
      verdictBig = '≈ 1×';
      verdictLbl = T('js.duel.par', 'about the same per token');
      note = T('js.duel.parNote', 'Hosted is already cheap here — you self-host for privacy and sovereignty, not savings.');
    } else {
      verdictBig = '↓';
      verdictLbl = T('js.duel.cloudWins', 'cloud is cheaper per token');
      note = T('js.duel.cloudNote', 'The hosted rate undercuts home hardware here — self-hosting buys privacy and sovereignty instead.');
    }
    return `
      <button class="pduel" type="button" aria-label="${T('js.duel.aria', 'Toggle cloud vs self-hosted price comparison')}">
        <span class="pduel__face pduel__face--front">
          <span class="pduel__row pduel__row--cloud">
            <span class="pduel__tag">${T('js.duel.cloud', 'CLOUD API')}</span>
            <span class="pduel__amt">${esc(m.priceIn)} <em>${T('js.duel.in', 'in')}</em> · ${esc(m.priceOut)} <em>${T('js.duel.out', 'out')}</em></span>
            <span class="pduel__bar" style="--w:${cw}%"></span>
            <span class="pduel__src">${T('js.duel.cloudSrc', 'per 1M tokens · hosted API reference rate (openrouter.ai)')}</span>
          </span>
          <span class="pduel__row pduel__row--local">
            <span class="pduel__tag">${T('js.duel.local', 'SELF-HOSTED')}</span>
            <span class="pduel__amt">≈ $${fN(self.lo)}–$${fN(self.hi)} <em>${T('js.duel.per1mShort', '/1M')}</em></span>
            <span class="pduel__bar" style="--w:${lw}%"></span>
            <span class="pduel__src">${esc(self.hw || m.selfHost)}</span>
          </span>
          <span class="pduel__hint">${T('js.duel.hint', 'tap — see the gap')} ⇄</span>
        </span>
        <span class="pduel__face pduel__face--back">
          <span class="pduel__mult">${verdictBig}</span>
          <span class="pduel__multlbl">${verdictLbl}</span>
          <span class="pduel__note">${note}</span>
        </span>
      </button>`;
  }
  /* Renders every model in window.ENKI_MODELS (see data.js) as a card
     into the #model-list grid, then wires up their pricing-duel flip
     interaction and scroll-in animation via wireDuels(). */
  function renderModels() {
    const grid = document.getElementById('model-list');
    if (!grid || !window.ENKI_MODELS) return;
    grid.innerHTML = window.ENKI_MODELS.map(
      (m) => `
      <article class="model-card">
        <div class="model-card__head">
          <div>
            <h3>${esc(m.name)}</h3>
            <span class="model-card__maker">${esc(m.maker)} · ${esc(m.license)}</span>
          </div>
        </div>
        ${priceDuel(m)}
        <ul class="model-card__list model-card__list--pros" role="list">
          ${m.pros.map((p) => `<li>${esc(p)}</li>`).join('')}
        </ul>
        <ul class="model-card__list model-card__list--cons" role="list">
          ${m.cons.map((c) => `<li>${esc(c)}</li>`).join('')}
        </ul>
        <div class="model-card__links">
          ${m.links
            .map(
              (l) =>
                `<a class="badge badge--repo" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${LINK_ICONS[l.type] || WEB_ICON}<span>${esc(l.label)}</span></a>`
            )
            .join('')}
        </div>
      </article>`
    ).join('');
    wireDuels(grid);
  }
  /* Makes each pricing-duel card clickable (flips it to show the
     verdict) and fades cards in as they scroll into view. Cards with
     no hosted price to compare against (`.pduel--solo`) aren't
     clickable since there's nothing to flip to. */
  function wireDuels(grid) {
    grid.querySelectorAll('.pduel:not(.pduel--solo)').forEach((d) => {
      d.addEventListener('click', (e) => {
        e.stopPropagation();
        d.classList.toggle('is-flipped');
      });
    });
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (es) => {
          es.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add('is-in');
              io.unobserve(en.target);
            }
          });
        },
        { threshold: 0.35 }
      );
      grid.querySelectorAll('.pduel').forEach((d) => io.observe(d));
    } else {
      grid.querySelectorAll('.pduel').forEach((d) => d.classList.add('is-in'));
    }
  }
  renderModels();

  /* Rebuilds the list of entry cards in the DOM from `state`.
     Called every time the search text, tool filter or sort order
     changes — it always redraws everything rather than trying to
     patch individual cards, which keeps the logic simple. */
  function render() {
    if (!listEl) return;
    const rows = filtered();
    const q = state.q.trim();
    listEl.innerHTML = rows
      .map(
        (e) => `
      <article class="entry" data-id="${esc(e.id)}">
        <div class="entry__main">
          <div class="entry__title-row">
            <h3 class="entry__name"><a href="${esc(e.url)}" target="_blank" rel="noopener noreferrer">${highlight(e.name, q)}</a></h3>
            ${e.pending ? '<span class="badge badge--pending">' + T('js.badge.pending', 'pending review') + '</span>' : ''}
            ${repoBadge(e)}
          </div>
          <p class="entry__desc">${highlight(e.desc, q)}</p>
          <div class="entry__badges">
            ${e.tools.map((t) => `<span class="badge badge--tool">${highlight(t, q)}</span>`).join('')}
            ${e.models.map((m) => `<span class="badge">${highlight(m, q)}</span>`).join('')}
            <span class="badge badge--vibe">${T('js.badge.vibe', '{n}% vibe-coded').replace('{n}', e.vibe)}</span>
          </div>
        </div>
        <div class="entry__cost">
          <div class="entry__cost-value">${fmtUSD(e.cost)}</div>
          <div class="entry__cost-label">${T('js.entry.totalCost', 'total build cost')}</div>
        </div>
      </article>`
      )
      .join('');
    emptyEl && emptyEl.classList.toggle('is-visible', rows.length === 0);
    if (countEl)
      countEl.innerHTML = T('js.countLine', '<b>{n}</b> / {t} builds listed · total declared cost <b>{s}</b>')
        .replace('{n}', rows.length)
        .replace('{t}', state.entries.length)
        .replace('{s}', fmtUSD(rows.reduce((s, e) => s + Number(e.cost), 0)));
  }

  /* Live search (debounced) — wait 120ms after the visitor stops typing
     before re-rendering, so we don't re-draw the whole list on every
     single keystroke. */
  let debounce;
  searchEl &&
    searchEl.addEventListener('input', (e) => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        state.q = e.target.value;
        render();
      }, 120);
    });

  /* "/" focuses search */
  addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchEl && !document.querySelector('.modal.is-open')) {
      e.preventDefault();
      searchEl && searchEl.focus();
    }
  });

  chipRow &&
    chipRow.addEventListener('click', (e) => {
      const btn = e.target.closest('.chip');
      if (!btn) return;
      state.tool = btn.dataset.tool;
      renderChips();
      render();
    });

  sortEl &&
    sortEl.addEventListener('change', (e) => {
      state.sort = e.target.value;
      render();
    });

  renderChips();
  render();

  /* ============================================================
     MODALS (generic open/close)
     Every popup on the page — the manifesto reader, the add-a-build
     wizard, the membership form, the contact form, etc. — shares this
     same open/close logic instead of each having its own. A button
     with `data-open-modal="some-id"` opens the modal with that id;
     an element inside a modal with `data-close-modal` closes it.
     Accessibility touches: focus moves into the modal on open and
     back to whatever you were focused on before once it closes, the
     page behind it stops scrolling, and Escape always closes
     whichever modal is currently open.
     ============================================================ */
  let lastFocus = null;
  function openModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    lastFocus = document.activeElement;
    m.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    const focusable = m.querySelector('input, button.modal__close, [tabindex]');
    focusable && focusable.focus();
  }
  function closeModal(m) {
    m.classList.remove('is-open');
    document.body.style.overflow = '';
    lastFocus && lastFocus.focus({ preventScroll: true });
  }
  document.querySelectorAll('[data-open-modal]').forEach((el) =>
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(el.dataset.openModal);
      if (el.dataset.modalAnchor) {
        const m = document.getElementById(el.dataset.openModal);
        const target = m && m.querySelector(el.dataset.modalAnchor);
        if (target) requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
      }
    })
  );
  document.querySelectorAll('.modal').forEach((m) => {
    m.querySelectorAll('[data-close-modal]').forEach((btn) =>
      btn.addEventListener('click', () => {
        closeModal(m);
        if (btn.dataset.goto) {
          const target = document.querySelector(btn.dataset.goto);
          target && target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      })
    );
    m.querySelector('.modal__backdrop').addEventListener('click', () => closeModal(m));
  });
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const open = document.querySelector('.modal.is-open');
      open && closeModal(open);
    }
  });

  /* ============================================================
     ADD-ENTRY WIZARD
     The multi-step form visitors use to submit their own AI-built
     product to the Registry. It is a classic "wizard" pattern: one
     panel of fields is shown at a time (`setStep`), each step is
     checked before letting you continue (`validate`), and the final
     step shows a plain-text summary of what you're about to send
     (`buildReview`) before the data is POSTed to the backend and a
     new pending card is inserted at the top of the registry list.
     ============================================================ */
  const wizard = document.getElementById('wizard');
  if (wizard) {
    const panels = Array.from(wizard.querySelectorAll('.wizard__panel'));
    const dots = Array.from(wizard.querySelectorAll('.wizard__step-dot'));
    const backBtn = document.getElementById('wiz-back');
    const nextBtn = document.getElementById('wiz-next');
    const foot = wizard.querySelector('.wizard__foot');
    const success = document.getElementById('wiz-success');
    let step = 0;

    const fields = {
      name: document.getElementById('f-name'),
      url: document.getElementById('f-url'),
      repo: document.getElementById('f-repo'),
      desc: document.getElementById('f-desc'),
      tools: document.getElementById('f-tools'),
      models: document.getElementById('f-models'),
      vibe: document.getElementById('f-vibe'),
      cost: document.getElementById('f-cost'),
      costType: () => wizard.querySelector('input[name="cost-type"]:checked'),
      srcType: () => wizard.querySelector('input[name="src-type"]:checked'),
    };

    /* open-source choice toggles the GitHub field + URL label */
    const fieldRepo = document.getElementById('field-repo');
    const urlLabel = document.getElementById('f-url-label');
    wizard.querySelectorAll('input[name="src-type"]').forEach((r) =>
      r.addEventListener('change', () => {
        const open = r.value === 'open';
        fieldRepo.hidden = !open;
        urlLabel.innerHTML = open
          ? T('js.form.url', 'URL')
          : T('js.form.publicLink', 'Public link <span class="hint">demo, blog post, launch page — anything we can visit</span>');
      })
    );

    /* radio-card visual state — scoped per radio group */
    wizard.querySelectorAll('.radio-card input').forEach((r) =>
      r.addEventListener('change', () => {
        wizard
          .querySelectorAll(`.radio-card input[name="${r.name}"]`)
          .forEach((i) => i.closest('.radio-card').classList.remove('is-checked'));
        r.closest('.radio-card').classList.add('is-checked');
      })
    );

    /* live cost preview */
    const costPreview = document.getElementById('cost-preview-value');
    fields.cost &&
      fields.cost.addEventListener('input', () => {
        const v = parseFloat(fields.cost.value);
        costPreview.textContent = isNaN(v) ? '$0' : fmtUSD(v);
      });

    function setStep(n) {
      step = n;
      panels.forEach((p, i) => p.classList.toggle('is-active', i === n));
      dots.forEach((d, i) => d.classList.toggle('is-active', i <= n));
      backBtn.style.visibility = n === 0 ? 'hidden' : 'visible';
      nextBtn.textContent = n === panels.length - 1 ? T('js.form.submitBuild', 'Submit build') : T('js.form.continue', 'Continue');
      if (n === panels.length - 1) buildReview();
    }

    function fail(el, msg) {
      const f = el.closest('.field');
      f.classList.add('has-error');
      f.querySelector('.error-msg').textContent = msg;
      el.focus();
      return false;
    }
    wizard.addEventListener('input', (e) => {
      const f = e.target.closest('.field');
      f && f.classList.remove('has-error');
    });

    /* Checks the fields on wizard step `n` and, if something's wrong,
       shows an inline error message next to that field and returns
       false (which stops the wizard from advancing). Each step has
       its own rules — step 0 is the product basics, step 1 is the
       tools/models/vibe-score, step 2 is the cost. */
    function validate(n) {
      if (n === 0) {
        if (!fields.name.value.trim()) return fail(fields.name, T('js.err.buildName', 'Give your build a name.'));
        if (!fields.desc.value.trim() || fields.desc.value.trim().length < 20)
          return fail(fields.desc, T('js.err.buildDesc', 'Describe it in at least 20 characters.'));
        if (!fields.srcType())
          return fail(wizard.querySelector('input[name="src-type"]'), T('js.err.buildSrc', 'Tell us whether the code is public.'));
        if (!fields.url.value.trim() || !/^https?:\/\/.+\..+/.test(fields.url.value.trim()))
          return fail(fields.url, fields.srcType().value === 'open' ? T('js.err.buildUrl', 'A live URL is required (https://\u2026).') : T('js.err.buildPublic', 'Something public is required — a demo, a blog post, a launch page\u2026'));
        if (fields.srcType().value === 'open' && !parseRepo(fields.repo.value))
          return fail(fields.repo, T('js.err.buildRepo', 'Link the code — github.com/owner/repo.'));
      }
      if (n === 1) {
        if (!fields.tools.value.trim()) return fail(fields.tools, T('js.err.buildTools', 'Which AI interface did you build with?'));
        if (!fields.models.value.trim()) return fail(fields.models, T('js.err.buildModels', 'List at least one model.'));
        const v = parseInt(fields.vibe.value, 10);
        if (isNaN(v) || v < 90 || v > 100)
          return fail(fields.vibe, T('js.err.buildVibe', 'The registry lists builds that are 90\u2013100% vibe-coded.'));
      }
      if (n === 2) {
        const c = parseFloat(fields.cost.value);
        if (isNaN(c) || c < 0) return fail(fields.cost, T('js.err.buildCost', 'Enter your total cost in USD (0 is fine).'));
        if (!fields.costType()) return fail(wizard.querySelector('.radio-card input'), T('js.err.buildCostType', 'Pick what the cost covers.'));
      }
      return true;
    }

    function parseRepo(v) {
      const m = (v || '')
        .trim()
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/^github\.com\//, '')
        .replace(/\.git$/, '')
        .replace(/\/+$/, '');
      return /^[\w.-]+\/[\w.-]+$/.test(m) ? m : null;
    }

    function buildReview() {
      const dl = document.getElementById('review');
      dl.innerHTML = `
        <dt>${T('js.rv.product', 'Product')}</dt><dd>${esc(fields.name.value)} · ${esc(fields.url.value)}</dd>
        ${
          fields.srcType() && fields.srcType().value === 'open'
            ? `<dt>${T('js.rv.code', 'Code')}</dt><dd>github.com/${esc(parseRepo(fields.repo.value) || '')}</dd>`
            : `<dt>${T('js.rv.publicLink', 'Public link')}</dt><dd>${esc(fields.url.value)} · ${T('js.rv.notOpen', 'not open source')}</dd>`
        }
        <dt>${T('js.rv.description', 'Description')}</dt><dd>${esc(fields.desc.value)}</dd>
        <dt>${T('js.rv.aiInterface', 'AI interface')}</dt><dd>${esc(fields.tools.value)}</dd>
        <dt>${T('js.rv.models', 'Models')}</dt><dd>${esc(fields.models.value)}</dd>
        <dt>${T('js.rv.vibe', 'Vibe-coded')}</dt><dd>${esc(fields.vibe.value)}%</dd>
        <dt>${T('js.rv.totalCost', 'Total cost')}</dt><dd>${fmtUSD(parseFloat(fields.cost.value) || 0)} (${
        fields.costType() ? esc(T('js.val.' + fields.costType().value, fields.costType().value)) : ''
      })</dd>`;
    }

    backBtn.addEventListener('click', () => setStep(Math.max(0, step - 1)));
    nextBtn.addEventListener('click', async () => {
      if (!validate(step)) return;
      if (step < panels.length - 1) {
        setStep(step + 1);
        return;
      }
      /* submit — only confirm once the write is acknowledged */
      nextBtn.disabled = true;
      const saved = await recordSubmission('build', fields.name.value.trim(), null, {
        url: fields.url.value.trim(),
        repo: fields.repo.value.trim(),
        source_type: fields.srcType() ? fields.srcType().value : null,
        desc: fields.desc.value.trim(),
        tools: fields.tools.value.trim(),
        models: fields.models.value.trim(),
        vibe: fields.vibe.value,
        cost: fields.cost.value,
        cost_type: fields.costType() ? fields.costType().value : null,
      });
      nextBtn.disabled = false;
      if (!saved) {
        showToast(T('js.toast.buildFail', 'Could not reach the registry — nothing was saved. Please try again.'));
        return;
      }
      state.entries.unshift({
        id: 'user-' + Date.now(),
        name: fields.name.value.trim(),
        url: fields.url.value.trim(),
        repo: fields.srcType() && fields.srcType().value === 'open' ? parseRepo(fields.repo.value) : null,
        desc: fields.desc.value.trim(),
        tools: fields.tools.value.split(',').map((s) => s.trim()).filter(Boolean),
        models: fields.models.value.split(',').map((s) => s.trim()).filter(Boolean),
        vibe: parseInt(fields.vibe.value, 10),
        cost: parseFloat(fields.cost.value) || 0,
        date: new Date().toISOString().slice(0, 10),
        pending: true,
      });
      renderChips();
      render();
      panels.forEach((p) => p.classList.remove('is-active'));
      foot.style.display = 'none';
      success.classList.add('is-active');
      showToast(T('js.toast.buildOk', 'Build submitted — pending review'));
    });

    /* reset when reopening */
    document.querySelectorAll('[data-open-modal="modal-add"]').forEach((el) =>
      el.addEventListener('click', () => {
        wizard.querySelectorAll('input, textarea').forEach((i) => {
          if (i.type === 'radio') i.checked = false;
          else i.value = '';
        });
        wizard.querySelectorAll('.radio-card').forEach((c) => c.classList.remove('is-checked'));
        wizard.querySelectorAll('.field').forEach((f) => f.classList.remove('has-error'));
        fieldRepo.hidden = true;
        urlLabel.innerHTML = T('js.form.url', 'URL');
        costPreview.textContent = '$0';
        success.classList.remove('is-active');
        foot.style.display = '';
        setStep(0);
      })
    );

    setStep(0);
  }

  /* ---------------- Toast ---------------- */
  /* ============================================================
     NAV SCROLL-SPY — highlight the section you're reading
     ============================================================ */
  (function navSpy() {
    const nav = document.querySelector('.nav');
    if (!nav || !('IntersectionObserver' in window)) return;
    const SPY = {
      manifesto: '#manifesto', standards: '#manifesto', enki: '#manifesto',
      wally: '#wally', registry: '#wally', models: '#wally',
      institute: '#institute', advisory: '#advisory', join: '#join',
    };
    const linkFor = {};
    Object.values(SPY).forEach((href) => {
      linkFor[href] = nav.querySelector(`.nav__dd-toggle[href="${href}"]`) || nav.querySelector(`a[href="${href}"]`);
    });
    let current = null;
    const visible = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) visible.set(en.target.id, en.boundingClientRect.top);
          else visible.delete(en.target.id);
        });
        let best = null, bestTop = Infinity;
        visible.forEach((top, id) => {
          const d = Math.abs(top);
          if (d < bestTop) { bestTop = d; best = id; }
        });
        const target = best ? linkFor[SPY[best]] : null;
        if (target === current) return;
        if (current) current.classList.remove('is-active');
        current = target || null;
        if (current) current.classList.add('is-active');
      },
      { rootMargin: '-20% 0px -55% 0px' }
    );
    Object.keys(SPY).forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
  })();

  /* ============================================================
     MOBILE MENU
     On narrow screens the header's links collapse into a hamburger
     button; this chunk just toggles the full-screen menu panel open
     and closed, and closes it automatically once a link is tapped.
     ============================================================ */
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
    function setMenu(open) {
      mobileMenu.classList.toggle('is-open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? T('js.aria.closeMenu', 'Close menu') : T('js.aria.openMenu', 'Open menu'));
      document.body.style.overflow = open || document.querySelector('.modal.is-open') ? 'hidden' : '';
    }
    menuToggle.addEventListener('click', () => setMenu(!mobileMenu.classList.contains('is-open')));
    mobileMenu.querySelectorAll('a, button').forEach((el) =>
      el.addEventListener('click', () => setMenu(false))
    );
    addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open') && !document.querySelector('.modal.is-open')) setMenu(false);
    });
  }

  /* ============================================================
     MEMBERSHIP APPLICATION
     A second multi-step wizard, structurally the same idea as the
     ADD-ENTRY WIZARD above (steps, per-step validation, a review
     screen) but for people applying to join Enki as one of the 300.
     ============================================================ */
  const joinform = document.getElementById('joinform');
  if (joinform) {
    const jPanels = Array.from(joinform.querySelectorAll('.wizard__panel'));
    const jDots = Array.from(joinform.querySelectorAll('[data-jdot]'));
    const jLines = Array.from(joinform.querySelectorAll('.join-progress__line'));
    const jBack = document.getElementById('join-back');
    const jNext = document.getElementById('join-next');
    const jMeter = document.getElementById('join-meter');
    const jReview = document.getElementById('join-review');
    const jName = document.getElementById('j-name');
    const jEmail = document.getElementById('j-email');
    const jLocation = document.getElementById('j-location');
    const jWhy = document.getElementById('j-why');
    const jBring = document.getElementById('j-bring');
    const jConsent = document.getElementById('j-consent');
    let jStep = 0;

    function jError(input, msg) {
      const field = input.closest('.field');
      field.classList.toggle('has-error', !!msg);
      const em = field.querySelector('.error-msg');
      if (em) em.textContent = msg || '';
    }

    joinform.addEventListener('input', (e) => {
      const f = e.target.closest('.field');
      f && f.classList.remove('has-error');
    });

    /* checkbox chips visual state */
    joinform.querySelectorAll('.radio-card input[type="checkbox"]').forEach((c) =>
      c.addEventListener('change', () => c.closest('.radio-card').classList.toggle('is-checked', c.checked))
    );

    const picked = (name) =>
      [...joinform.querySelectorAll(`input[name="${name}"]:checked`)].map((c) => c.value);

    function buildJoinReview() {
      const esc = (s) => s.replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
      const trunc = (s, n) => (s.length > n ? s.slice(0, n - 1) + '…' : s);
      const rows = [
        [T('js.rv.name', 'Name'), jName.value.trim()],
        [T('js.rv.email', 'Email'), jEmail.value.trim()],
        [T('js.rv.basedIn', 'Based in'), jLocation.value.trim() || '—'],
        [T('js.rv.contributing', 'Contributing'), picked('j-contrib').map((v) => T('js.val.' + v, v)).join(', ')],
        [T('js.rv.why', 'Why'), trunc(jWhy.value.trim(), 120)],
        [T('js.rv.how', 'How'), trunc(jBring.value.trim(), 120)],
      ];
      jReview.innerHTML = rows
        .map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`)
        .join('');
    }

    function setJStep(n) {
      jStep = n;
      jPanels.forEach((p, i) => p.classList.toggle('is-active', i === n));
      jDots.forEach((d, i) => {
        d.classList.toggle('is-active', i === n);
        d.classList.toggle('is-done', i < n);
      });
      jLines.forEach((l, i) => l.classList.toggle('is-filled', i < n));
      jBack.style.visibility = n === 0 ? 'hidden' : 'visible';
      jNext.textContent = n === jPanels.length - 1 ? T('js.form.sendApplication', 'Send application') : T('js.form.continue', 'Continue');
      jMeter.textContent = `${n + 1} / ${jPanels.length}`;
      if (n === jPanels.length - 1) buildJoinReview();
      const body = joinform.querySelector('.wizard__body');
      if (body) body.scrollTop = 0;
    }

    function validateJStep(n) {
      let ok = true;
      if (n === 0) {
        if (!jName.value.trim()) {
          jError(jName, T('js.err.nameReq', 'Your name is required.'));
          ok = false;
        } else jError(jName);
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(jEmail.value.trim())) {
          jError(jEmail, T('js.err.emailReq', 'A valid email is required.'));
          ok = false;
        } else jError(jEmail);
      }
      if (n === 1) {
        if (jWhy.value.trim().length < 20) {
          jError(jWhy, T('js.err.joinWhy', 'Tell us a little more — a couple of honest sentences.'));
          ok = false;
        } else jError(jWhy);
      }
      if (n === 2) {
        const contribChecks = joinform.querySelectorAll('input[name="j-contrib"]');
        if (!picked('j-contrib').length) {
          jError(contribChecks[0], T('js.err.joinContrib', 'Pick at least one — skills, networks or capital/donations.'));
          ok = false;
        } else jError(contribChecks[0]);
        if (jBring.value.trim().length < 20) {
          jError(jBring, T('js.err.joinBring', 'This is what we select on — be concrete about how you would help.'));
          ok = false;
        } else jError(jBring);
      }
      if (n === 3) {
        if (!jConsent.checked) {
          jError(jConsent, T('js.err.joinConsent', 'Please confirm you understand the process.'));
          ok = false;
        } else jError(jConsent);
      }
      return ok;
    }

    jNext.addEventListener('click', async () => {
      if (!validateJStep(jStep)) return;
      if (jStep < jPanels.length - 1) {
        setJStep(jStep + 1);
      } else {
        jNext.disabled = true;
        const saved = await recordSubmission('application', jName.value.trim(), jEmail.value.trim(), {
          location: jLocation ? jLocation.value.trim() : null,
          why: jWhy.value.trim(),
          bring: jBring.value.trim(),
          contributions: [...joinform.querySelectorAll('input[name="j-contrib"]:checked')].map((c) => c.value),
          consent: !!jConsent.checked,
        });
        jNext.disabled = false;
        if (!saved) {
          showToast(T('js.toast.joinFail', 'Could not send your application — nothing was saved. Please try again.'));
          return;
        }
        joinform.classList.add('is-done');
        showToast(T('js.toast.joinOk', 'Application sent — one of 300.'));
      }
    });
    jBack.addEventListener('click', () => jStep > 0 && setJStep(jStep - 1));

    /* fresh form every time the modal opens */
    document.querySelectorAll('[data-open-modal="modal-join"]').forEach((el) =>
      el.addEventListener('click', () => {
        joinform.classList.remove('is-done');
        joinform.querySelectorAll('input[type="text"], input[type="email"], textarea').forEach((i) => (i.value = ''));
        joinform.querySelectorAll('input[type="checkbox"]').forEach((i) => (i.checked = false));
        joinform.querySelectorAll('.radio-card').forEach((c) => c.classList.remove('is-checked'));
        joinform.querySelectorAll('.field').forEach((f) => f.classList.remove('has-error'));
        setJStep(0);
      })
    );
  }

  /* ============================================================
     CONTACT WIZARD (Institute & Advisory)
     A third copy of the same multi-step-form pattern, this time for
     organisations reaching out about the research Institute or the
     policy Advisory rather than applying for membership.
     ============================================================ */
  const contactform = document.getElementById('contactform');
  if (contactform) {
    const cPanels = Array.from(contactform.querySelectorAll('.wizard__panel'));
    const cDots = Array.from(contactform.querySelectorAll('[data-cdot]'));
    const cLines = Array.from(contactform.querySelectorAll('.join-progress__line'));
    const cBack = document.getElementById('c-back');
    const cNext = document.getElementById('c-next');
    const cMeter = document.getElementById('c-meter');
    const cReview = document.getElementById('contact-review');
    const cName = document.getElementById('c-name');
    const cEmail = document.getElementById('c-email');
    const cOrg = document.getElementById('c-org');
    const cMsg = document.getElementById('c-msg');
    let cStep = 0;

    function cError(input, msg) {
      const field = input.closest('.field');
      field.classList.toggle('has-error', !!msg);
      const em = field.querySelector('.error-msg');
      if (em) em.textContent = msg || '';
    }

    contactform.addEventListener('input', (e) => {
      const f = e.target.closest('.field');
      f && f.classList.remove('has-error');
    });

    /* radio chips visual state */
    contactform.querySelectorAll('.radio-card input[type="radio"]').forEach((r) =>
      r.addEventListener('change', () => {
        contactform
          .querySelectorAll(`input[name="${r.name}"]`)
          .forEach((o) => o.closest('.radio-card').classList.toggle('is-checked', o.checked));
      })
    );

    const cReason = () => contactform.querySelector('input[name="c-reason"]:checked');

    function buildContactReview() {
      const esc = (s) => s.replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
      const trunc = (s, n) => (s.length > n ? s.slice(0, n - 1) + '…' : s);
      const rows = [
        [T('js.rv.name', 'Name'), cName.value.trim()],
        [T('js.rv.email', 'Email'), cEmail.value.trim()],
        [T('js.rv.organisation', 'Organisation'), cOrg.value.trim() || '—'],
        [T('js.rv.reason', 'Reason'), cReason() ? T('js.val.' + cReason().value, cReason().value) : '—'],
        [T('js.rv.message', 'Message'), trunc(cMsg.value.trim(), 140)],
      ];
      cReview.innerHTML = rows
        .map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`)
        .join('');
    }

    function setCStep(n) {
      cStep = n;
      cPanels.forEach((p, i) => p.classList.toggle('is-active', i === n));
      cDots.forEach((d, i) => {
        d.classList.toggle('is-active', i === n);
        d.classList.toggle('is-done', i < n);
      });
      cLines.forEach((l, i) => l.classList.toggle('is-filled', i < n));
      cBack.style.visibility = n === 0 ? 'hidden' : 'visible';
      cNext.textContent = n === cPanels.length - 1 ? T('js.form.sendMessage', 'Send message') : T('js.form.continue', 'Continue');
      cMeter.textContent = `${n + 1} / ${cPanels.length}`;
      if (n === cPanels.length - 1) buildContactReview();
      const body = contactform.querySelector('.wizard__body');
      if (body) body.scrollTop = 0;
    }

    function validateCStep(n) {
      let ok = true;
      if (n === 0) {
        if (!cName.value.trim()) {
          cError(cName, T('js.err.nameReq', 'Your name is required.'));
          ok = false;
        } else cError(cName);
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cEmail.value.trim())) {
          cError(cEmail, T('js.err.emailReq', 'A valid email is required.'));
          ok = false;
        } else cError(cEmail);
      }
      if (n === 1) {
        const radios = contactform.querySelectorAll('input[name="c-reason"]');
        if (!cReason()) {
          cError(radios[0], T('js.err.contactReason', 'Pick the option closest to your situation.'));
          ok = false;
        } else cError(radios[0]);
      }
      if (n === 2) {
        if (cMsg.value.trim().length < 20) {
          cError(cMsg, T('js.err.contactMsg', 'A couple of sentences helps us route you to the right person.'));
          ok = false;
        } else cError(cMsg);
      }
      return ok;
    }

    cNext.addEventListener('click', async () => {
      if (!validateCStep(cStep)) return;
      if (cStep < cPanels.length - 1) {
        setCStep(cStep + 1);
      } else {
        cNext.disabled = true;
        const saved = await recordSubmission('contact', cName.value.trim(), cEmail.value.trim(), {
          organisation: cOrg.value.trim() || null,
          reason: cReason() ? cReason().value : null,
          message: cMsg.value.trim(),
        });
        cNext.disabled = false;
        if (!saved) {
          showToast(T('js.toast.contactFail', 'Could not send your message — nothing was saved. Please try again.'));
          return;
        }
        contactform.classList.add('is-done');
        showToast(T('js.toast.contactOk', 'Message sent — we read everything.'));
      }
    });
    cBack.addEventListener('click', () => cStep > 0 && setCStep(cStep - 1));

    /* fresh form every time the modal opens */
    document.querySelectorAll('[data-open-modal="modal-contact"]').forEach((el) =>
      el.addEventListener('click', () => {
        contactform.classList.remove('is-done');
        contactform.querySelectorAll('input[type="text"], input[type="email"], textarea').forEach((i) => (i.value = ''));
        contactform.querySelectorAll('input[type="radio"]').forEach((i) => (i.checked = false));
        contactform.querySelectorAll('.radio-card').forEach((c) => c.classList.remove('is-checked'));
        contactform.querySelectorAll('.field').forEach((f) => f.classList.remove('has-error'));
        setCStep(0);
      })
    );
  }

  const toastEl = document.getElementById('toast');
  let toastTimer;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 3200);
  }

  /* Footer year */
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();

/* ---------------- Click sparks ----------------
   Purely decorative: every click on the page spawns a little burst of
   coloured dots at the cursor. Skipped entirely if the visitor's system
   has "reduce motion" turned on. */
(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const SPARK_COLORS = () => {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    return dark
      ? ['#82c09a', '#d9a844', '#9ccfaf', '#d2d5ca']
      : ['#2a5c3f', '#a1731c', '#d9a844', '#82c09a'];
  };
  document.addEventListener(
    'click',
    (e) => {
      if (e.clientX === 0 && e.clientY === 0) return; // keyboard-triggered
      const colors = SPARK_COLORS();
      const ring = document.createElement('span');
      ring.className = 'click-ring';
      ring.style.left = `${e.clientX}px`;
      ring.style.top = `${e.clientY}px`;
      ring.style.borderColor = colors[0];
      document.body.appendChild(ring);
      ring.addEventListener('animationend', () => ring.remove());
      const n = 12 + Math.floor(Math.random() * 5);
      for (let i = 0; i < n; i++) {
        const s = document.createElement('span');
        s.className = 'click-spark';
        const angle = (Math.PI * 2 * i) / n + Math.random() * 0.6;
        const dist = 30 + Math.random() * 55;
        const size = 5 + Math.random() * 6;
        s.style.left = `${e.clientX}px`;
        s.style.top = `${e.clientY}px`;
        s.style.width = `${size}px`;
        s.style.height = `${size}px`;
        s.style.background = colors[Math.floor(Math.random() * colors.length)];
        s.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
        s.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
        document.body.appendChild(s);
        s.addEventListener('animationend', () => s.remove());
      }
    },
    { passive: true }
  );
})();

/* ============ WHO WE'RE LOOKING FOR — inline profile search ============
   Powers the little search box where visitors can type a skill
   ("lawyer", "rust", "translator"…) and see matching example profiles
   from window.ENKI_PROFILES (see data.js). It's a tiny hand-rolled
   search engine: `score()` gives each profile a relevance score based
   on whether/where the typed words appear, and the top 5 matches are
   shown. With an empty search box it shows 5 defaults, or all profiles
   if "Browse all" was clicked.
   ============================================================ */
(function initSeek() {
  const input = document.getElementById('seek-input');
  const list = document.getElementById('seek-results');
  const foot = document.getElementById('seek-foot');
  const allBtn = document.getElementById('seek-all');
  if (!input || !list || !window.ENKI_PROFILES) return;
  const P = window.ENKI_PROFILES;
  const DEFAULTS = P.filter((p) => p.d);
  let showAll = false;

  function syncAll(q) {
    if (!allBtn) return;
    allBtn.textContent = showAll && !q ? T('js.seek.collapse', 'Collapse ↑') : T('js.seek.browseAll', 'Browse all {n} →').replace('{n}', P.length);
    allBtn.setAttribute('aria-expanded', String(showAll && !q));
    list.classList.toggle('is-all', showAll && !q);
  }

  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function render(items, total, q) {
    if (!items.length) {
      list.innerHTML =
        '<li class="seek__empty">' + T('js.seek.empty', 'No match in our examples — but the list is not a fence. If you bring it, we want to hear about it.') + '</li>';
      foot.textContent = T('js.seek.none', '0 of {n} examples matched — apply anyway.').replace('{n}', P.length);
      return;
    }
    list.innerHTML = items
      .map(
        (p) =>
          '<li><span class="seek__tag">' + esc(p.c) + '</span><span class="seek__txt">' + esc(p.t) + '</span></li>'
      )
      .join('');
    if (!q) {
      foot.textContent = T('js.seek.showing', 'Showing 5 of {n} examples — type to search the rest.').replace('{n}', P.length);
    } else {
      foot.textContent = (total > 1 ? T('js.seek.topN', 'Top {k} of {n} matching examples.') : T('js.seek.top1', 'Top {k} of {n} matching example.'))
        .replace('{k}', items.length)
        .replace('{n}', total);
    }
  }

  function score(p, terms) {
    const hay = (p.t + ' ' + p.c).toLowerCase();
    let s = 0;
    for (const t of terms) {
      const idx = hay.indexOf(t);
      if (idx === -1) return 0;
      s += 10 - Math.min(9, Math.floor(idx / 12));
      if (new RegExp('(^|[^a-z])' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).test(hay)) s += 4;
    }
    return s;
  }

  function run() {
    const q = input.value.trim().toLowerCase();
    if (!q) {
      if (showAll) {
        render(P, P.length, '');
        foot.textContent = T('js.seek.all', 'All {n} examples — one for every seat.').replace('{n}', P.length);
      } else {
        render(DEFAULTS.slice(0, 5), P.length, '');
      }
      syncAll(q);
      return;
    }
    syncAll(q);
    const terms = q.split(/\s+/).slice(0, 6);
    const matches = P.map((p) => ({ p, s: score(p, terms) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s);
    render(matches.slice(0, 5).map((x) => x.p), matches.length, q);
  }

  input.addEventListener('input', run);
  if (allBtn)
    allBtn.addEventListener('click', () => {
      showAll = !showAll;
      if (showAll) input.value = '';
      run();
      if (!showAll) allBtn.blur();
    });
  run();
})();

/* Wally mock-up: interactive compute selector (concept demo)
   Wally itself doesn't exist yet (see docs/WALLY.md) — this is a fake,
   front-end-only demo of how its "where should this task run" selector
   might look and feel: clicking device/mesh/auto just swaps some
   hard-coded label text, no real computation happens. */
(() => {
  const runsel = document.querySelector('.wally-runsel');
  if (!runsel) return;
  const statusEl = document.querySelector('[data-compute-status]');
  const badgeEl = document.querySelector('.wally-window__model');
  const copy = {
    device: ['bonsai-27b · local', T('js.wally.device', 'compute: pinned to this device · nothing dispatched, nothing leaves it')],
    mesh: ['bonsai-27b · mesh', T('js.wally.mesh', 'mesh: embedding rebuild → dispatched to mac-mini · stayed on your network')],
    auto: ['bonsai-27b · local', T('js.wally.auto', 'auto: task routed to the cheapest device that can carry it · mesh on standby')],
  };
  runsel.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-compute]');
    if (!btn) return;
    runsel.querySelectorAll('[data-compute]').forEach((b) => {
      const on = b === btn;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    const mode = copy[btn.dataset.compute];
    if (mode) {
      if (badgeEl) badgeEl.textContent = mode[0];
      if (statusEl) statusEl.textContent = mode[1];
    }
  });

  /* ---- Mobile tap-to-expand cards ----
     On small screens several card types (standards, org, model, registry
     entries) are too tall to show fully, so tapping one toggles an
     `is-x` (expanded) class that reveals the rest of its content. Only
     active below 640px, and taps on real interactive elements inside
     the card (links, buttons, form fields) are ignored so they keep
     working normally instead of just expanding the card. */
  const accMq = window.matchMedia('(max-width: 640px)');
  const ACC_SEL = '.std-card, .org-card, .model-card, .entry';
  document.addEventListener('click', (e) => {
    if (!accMq.matches) return;
    if (e.target.closest('a, button, input, select, textarea, label, sup')) return;
    const card = e.target.closest(ACC_SEL);
    if (!card) return;
    const open = card.classList.toggle('is-x');
    card.setAttribute('aria-expanded', String(open));
  });
  accMq.addEventListener('change', () => {
    if (!accMq.matches)
      document.querySelectorAll('.is-x').forEach((c) => {
        c.classList.remove('is-x');
        c.removeAttribute('aria-expanded');
      });
  });
})();

/* ============ INTRO FILM MODAL ============
   The short arrival film that greets first-time visitors. This chunk
   builds a small custom video player from scratch (play/pause, a
   scrubbable progress bar, a time readout) instead of using the
   browser's default video controls, plus hand-timed subtitles — all
   so the whole thing matches the site's own look. Old-school `var` and
   `function` syntax is used throughout (rather than the `const`/arrow
   style elsewhere in this file) purely by convention of when it was
   written; behaviourally it works the same either way.
   ============================================================ */
(function initIntroFilm() {
  var root = document.getElementById('intro-video');
  if (!root) return;
  var video = document.getElementById('iv-video');
  var screen = document.getElementById('iv-screen');
  var playBtn = document.getElementById('iv-play');
  var subsEl = document.getElementById('iv-subs');
  var closeBtn = document.getElementById('iv-close');
  var foreverBtn = document.getElementById('iv-close-forever');
  var controls = document.getElementById('iv-controls');
  var ctlBtn = document.getElementById('iv-ctl-play');
  var track = document.getElementById('iv-track');
  var trackFill = document.getElementById('iv-track-fill');
  var trackKnob = document.getElementById('iv-knob');
  var timeCur = document.getElementById('iv-time-cur');
  var timeDur = document.getElementById('iv-time-dur');
  var FOREVER_KEY = 'enki-intro-dismissed';
  var FALLBACK_DUR = 124.5;

  /* ---- Subtitles data ----
     Each cue is [startSeconds, endSeconds, text]: while the video's
     current time falls inside that window, that line is shown. These
     are the English cues from assets/enki-intro.en.vtt, copied in here
     directly (rather than fetched from that file) so the subtitles
     work even when the page is opened without a web server, where
     fetching a separate file can be blocked by the browser's
     cross-origin file rules. If a translated dictionary supplies its
     own `cues` (subtitles translated into the visitor's language),
     those are used instead. */
  var CUES = (window.ENKI_I18N && window.ENKI_I18N.cues) || [
    [3.4, 7, 'Only the hard and strong may call themselves Spartans.'],
    [8.3, 10, 'Only the hard.'],
    [10.15, 12.3, 'Only the strong.'],
    [39.6, 43, 'We march.'],
    [44.3, 48.6, 'For our lands, for our families, for our freedoms.'],
    [50.5, 52, 'We march.'],
    [54.5, 57.9, 'Daxos! What a pleasant surprise.'],
    [58.3, 60.1, 'This morning\'s full of surprises, Leonidas.'],
    [60.15, 61, 'We\'ve been tricked.'],
    [61, 62.2, 'Can\'t be more than a few hundred.'],
    [62.3, 63.8, 'This is a surprise.'],
    [63.85, 64.7, 'Silence!'],
    [67.2, 68.9, 'We heard Sparta was on the warpath,'],
    [69.9, 71.3, 'and we were eager to join forces.'],
    [71.8, 76.4, 'If it is blood you seek, you are welcome to join us.'],
    [76.6, 79.3, 'You bring only this handful of soldiers against Xerxes?'],
    [80, 83.1, 'I see I was wrong to expect Sparta\'s commitment to at least match our own.'],
    [84.6, 85.7, 'Doesn\'t it?'],
    [88, 89.4, 'You, there!'],
    [90.1, 91.2, 'What is your profession?'],
    [91.9, 93.9, 'I\'m a potter... sir.'],
    [94.7, 97.4, 'And you, Arcadian!'],
    [97.8, 99, 'What is your profession?'],
    [99.3, 100.5, 'Sculptor, sir.'],
    [102.8, 103.7, 'You?'],
    [104, 105.2, 'Blacksmith.'],
    [110.3, 113.2, 'Spartans! What is your profession?!'],
    [113.6, 119.6, 'HA-OOH! HA-OOH! HA-OOH!'],
    [120.1, 124.3, 'You see, old friend? I brought more soldiers than you did.'],
  ];

  /* Looks up which cue (if any) covers the video's current playback
     time and shows it as the on-screen subtitle line. */
  function renderSubs() {
    var t = video.currentTime;
    var text = '';
    for (var i = 0; i < CUES.length; i++) {
      if (t >= CUES[i][0] && t <= CUES[i][1]) { text = CUES[i][2]; break; }
    }
    if (text) {
      if (subsEl.textContent !== text) subsEl.textContent = text;
      subsEl.classList.add('is-on');
    } else {
      subsEl.classList.remove('is-on');
    }
  }
  /* ---- Controller: timing, progress bar, scrubbing ----
     A hand-built replacement for the browser's native video controls:
     tracks playback time, draws the filled progress bar and its knob,
     and lets the visitor drag ("scrub") the bar to jump to any point
     in the film. `dur()` falls back to a hard-coded duration if the
     browser hasn't figured out the real one yet. */
  function dur() {
    var d = video.duration;
    return isFinite(d) && d > 0 ? d : FALLBACK_DUR;
  }
  function fmt(s) {
    s = Math.max(0, Math.floor(s));
    return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2);
  }
  function updateProgress() {
    var pct = Math.min(100, (video.currentTime / dur()) * 100);
    trackFill.style.width = pct + '%';
    trackKnob.style.left = pct + '%';
    timeCur.textContent = fmt(video.currentTime);
    track.setAttribute('aria-valuenow', String(Math.round(pct)));
  }
  function setDur() { timeDur.textContent = fmt(dur()); }
  video.addEventListener('loadedmetadata', setDur);
  video.addEventListener('durationchange', setDur);
  setDur();
  video.addEventListener('timeupdate', function () { renderSubs(); updateProgress(); });
  video.addEventListener('play', function () { root.classList.add('is-playing'); });
  video.addEventListener('pause', function () { root.classList.remove('is-playing'); });
  setInterval(function () { if (!video.paused) { renderSubs(); updateProgress(); } }, 200);

  controls.addEventListener('click', function (e) { e.stopPropagation(); });
  ctlBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (video.paused) play();
    else video.pause();
  });
  /* Converts a horizontal mouse/touch position over the progress bar
     into a playback time and jumps the video there. */
  var scrubbing = false;
  function seekTo(clientX) {
    var r = track.getBoundingClientRect();
    var f = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    try { video.currentTime = f * dur(); } catch (e) {}
    updateProgress();
    renderSubs();
  }
  track.addEventListener('pointerdown', function (e) {
    e.stopPropagation();
    e.preventDefault();
    scrubbing = true;
    track.classList.add('is-scrubbing');
    try { track.setPointerCapture(e.pointerId); } catch (err) {}
    seekTo(e.clientX);
  });
  track.addEventListener('pointermove', function (e) {
    if (scrubbing) seekTo(e.clientX);
  });
  function endScrub() {
    scrubbing = false;
    track.classList.remove('is-scrubbing');
  }
  track.addEventListener('pointerup', endScrub);
  track.addEventListener('pointercancel', endScrub);

  function openIntro() {
    root.hidden = false;
    document.body.classList.add('introv-open');
  }
  function closeIntro() {
    if (root.hidden) return;
    root.hidden = true;
    document.body.classList.remove('introv-open');
    root.classList.remove('is-playing');
    try { video.pause(); } catch (e) {}
    try { video.currentTime = 0; } catch (e) {}
  }
  function closeForever() {
    try { localStorage.setItem(FOREVER_KEY, '1'); } catch (e) {}
    closeIntro();
  }
  function play() {
    var p = video.play();
    if (p && p.catch) p.catch(function () {});
    root.classList.add('is-playing');
    setTimeout(function () { root.classList.add('introv--hint-done'); }, 4000);
  }

  /* ---- Open/close + play/pause wiring ----
     Click on the film toggles play/pause; a click anywhere else closes
     the modal. "Close forever" remembers the choice in localStorage so
     returning visitors are never shown the intro again. */
  screen.addEventListener('click', function (e) {
    e.stopPropagation();
    if (video.paused) play();
    else video.pause();
  });
  playBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    play();
  });
  closeBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    closeIntro();
  });
  foreverBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    closeForever();
  });
  root.addEventListener('click', closeIntro);
  video.addEventListener('ended', closeIntro);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeIntro();
  });

  var dismissed = false;
  try { dismissed = localStorage.getItem(FOREVER_KEY) === '1'; } catch (e) {}
  if (!dismissed) setTimeout(openIntro, 700);
})();
