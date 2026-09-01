/* ============================================================
   ENKI — app.js
   Theme toggle · hero mesh canvas · scroll reveal ·
   registry live search / filters / sort · add-entry wizard ·
   manifesto modal · toast
   ============================================================ */
(function () {
  'use strict';

  /* ---------------- Submissions store (interim: Supabase, write-only key) ---------------- */
  const DB_URL = 'https://slrzxnalnpitwyvzzxme.supabase.co/rest/v1/enki_submissions';
  const DB_KEY = 'sb_publishable_c2gNflxvwF_g9pidq0ZTSA_RnkJVC5D';
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
        headers: { 'Content-Type': 'application/json', apikey: DB_KEY, Prefer: 'return=minimal' },
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
      toggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
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
            t === 'all' ? 'All tools' : esc(t)
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

  /* ---- Model registry (Registry 02) ---- */
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
          <div class="model-card__price">
            <span class="model-card__amount">${esc(m.priceIn)} <em>/</em> ${esc(m.priceOut)}</span>
            <span class="model-card__unit">per 1M tokens · hosted · in / out</span>
            ${m.selfHost ? `<span class="model-card__self">${esc(m.selfHost)}</span>` : ''}
          </div>
        </div>
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
  }
  renderModels();

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
            ${e.pending ? '<span class="badge badge--pending">pending review</span>' : ''}
            ${repoBadge(e)}
          </div>
          <p class="entry__desc">${highlight(e.desc, q)}</p>
          <div class="entry__badges">
            ${e.tools.map((t) => `<span class="badge badge--tool">${highlight(t, q)}</span>`).join('')}
            ${e.models.map((m) => `<span class="badge">${highlight(m, q)}</span>`).join('')}
            <span class="badge badge--vibe">${e.vibe}% vibe-coded</span>
          </div>
        </div>
        <div class="entry__cost">
          <div class="entry__cost-value">${fmtUSD(e.cost)}</div>
          <div class="entry__cost-label">total build cost</div>
        </div>
      </article>`
      )
      .join('');
    emptyEl && emptyEl.classList.toggle('is-visible', rows.length === 0);
    if (countEl)
      countEl.innerHTML = `<b>${rows.length}</b> / ${state.entries.length} builds listed · total declared cost <b>${fmtUSD(
        rows.reduce((s, e) => s + Number(e.cost), 0)
      )}</b>`;
  }

  /* Live search (debounced) */
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
          ? 'URL'
          : 'Public link <span class="hint">demo, blog post, launch page — anything we can visit</span>';
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
      nextBtn.textContent = n === panels.length - 1 ? 'Submit build' : 'Continue';
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

    function validate(n) {
      if (n === 0) {
        if (!fields.name.value.trim()) return fail(fields.name, 'Give your build a name.');
        if (!fields.desc.value.trim() || fields.desc.value.trim().length < 20)
          return fail(fields.desc, 'Describe it in at least 20 characters.');
        if (!fields.srcType())
          return fail(wizard.querySelector('input[name="src-type"]'), 'Tell us whether the code is public.');
        if (!fields.url.value.trim() || !/^https?:\/\/.+\..+/.test(fields.url.value.trim()))
          return fail(fields.url, fields.srcType().value === 'open' ? 'A live URL is required (https://\u2026).' : 'Something public is required — a demo, a blog post, a launch page\u2026');
        if (fields.srcType().value === 'open' && !parseRepo(fields.repo.value))
          return fail(fields.repo, 'Link the code — github.com/owner/repo.');
      }
      if (n === 1) {
        if (!fields.tools.value.trim()) return fail(fields.tools, 'Which AI interface did you build with?');
        if (!fields.models.value.trim()) return fail(fields.models, 'List at least one model.');
        const v = parseInt(fields.vibe.value, 10);
        if (isNaN(v) || v < 90 || v > 100)
          return fail(fields.vibe, 'The registry lists builds that are 90\u2013100% vibe-coded.');
      }
      if (n === 2) {
        const c = parseFloat(fields.cost.value);
        if (isNaN(c) || c < 0) return fail(fields.cost, 'Enter your total cost in USD (0 is fine).');
        if (!fields.costType()) return fail(wizard.querySelector('.radio-card input'), 'Pick what the cost covers.');
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
        <dt>Product</dt><dd>${esc(fields.name.value)} · ${esc(fields.url.value)}</dd>
        ${
          fields.srcType() && fields.srcType().value === 'open'
            ? `<dt>Code</dt><dd>github.com/${esc(parseRepo(fields.repo.value) || '')}</dd>`
            : `<dt>Public link</dt><dd>${esc(fields.url.value)} · not open source</dd>`
        }
        <dt>Description</dt><dd>${esc(fields.desc.value)}</dd>
        <dt>AI interface</dt><dd>${esc(fields.tools.value)}</dd>
        <dt>Models</dt><dd>${esc(fields.models.value)}</dd>
        <dt>Vibe-coded</dt><dd>${esc(fields.vibe.value)}%</dd>
        <dt>Total cost</dt><dd>${fmtUSD(parseFloat(fields.cost.value) || 0)} (${
        fields.costType() ? esc(fields.costType().value) : ''
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
        showToast('Could not reach the registry — nothing was saved. Please try again.');
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
      showToast('Build submitted — pending review');
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
        urlLabel.innerHTML = 'URL';
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
     ============================================================ */
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
    function setMenu(open) {
      mobileMenu.classList.toggle('is-open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
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
        ['Name', jName.value.trim()],
        ['Email', jEmail.value.trim()],
        ['Based in', jLocation.value.trim() || '—'],
        ['Contributing', picked('j-contrib').join(', ')],
        ['Why', trunc(jWhy.value.trim(), 120)],
        ['How', trunc(jBring.value.trim(), 120)],
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
      jNext.textContent = n === jPanels.length - 1 ? 'Send application' : 'Continue';
      jMeter.textContent = `${n + 1} / ${jPanels.length}`;
      if (n === jPanels.length - 1) buildJoinReview();
      const body = joinform.querySelector('.wizard__body');
      if (body) body.scrollTop = 0;
    }

    function validateJStep(n) {
      let ok = true;
      if (n === 0) {
        if (!jName.value.trim()) {
          jError(jName, 'Your name is required.');
          ok = false;
        } else jError(jName);
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(jEmail.value.trim())) {
          jError(jEmail, 'A valid email is required.');
          ok = false;
        } else jError(jEmail);
      }
      if (n === 1) {
        if (jWhy.value.trim().length < 20) {
          jError(jWhy, 'Tell us a little more — a couple of honest sentences.');
          ok = false;
        } else jError(jWhy);
      }
      if (n === 2) {
        const contribChecks = joinform.querySelectorAll('input[name="j-contrib"]');
        if (!picked('j-contrib').length) {
          jError(contribChecks[0], 'Pick at least one — skills, networks or capital/donations.');
          ok = false;
        } else jError(contribChecks[0]);
        if (jBring.value.trim().length < 20) {
          jError(jBring, 'This is what we select on — be concrete about how you would help.');
          ok = false;
        } else jError(jBring);
      }
      if (n === 3) {
        if (!jConsent.checked) {
          jError(jConsent, 'Please confirm you understand the process.');
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
          showToast('Could not send your application — nothing was saved. Please try again.');
          return;
        }
        joinform.classList.add('is-done');
        showToast('Application sent — one of 300.');
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
        ['Name', cName.value.trim()],
        ['Email', cEmail.value.trim()],
        ['Organisation', cOrg.value.trim() || '—'],
        ['Reason', cReason() ? cReason().value : '—'],
        ['Message', trunc(cMsg.value.trim(), 140)],
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
      cNext.textContent = n === cPanels.length - 1 ? 'Send message' : 'Continue';
      cMeter.textContent = `${n + 1} / ${cPanels.length}`;
      if (n === cPanels.length - 1) buildContactReview();
      const body = contactform.querySelector('.wizard__body');
      if (body) body.scrollTop = 0;
    }

    function validateCStep(n) {
      let ok = true;
      if (n === 0) {
        if (!cName.value.trim()) {
          cError(cName, 'Your name is required.');
          ok = false;
        } else cError(cName);
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cEmail.value.trim())) {
          cError(cEmail, 'A valid email is required.');
          ok = false;
        } else cError(cEmail);
      }
      if (n === 1) {
        const radios = contactform.querySelectorAll('input[name="c-reason"]');
        if (!cReason()) {
          cError(radios[0], 'Pick the option closest to your situation.');
          ok = false;
        } else cError(radios[0]);
      }
      if (n === 2) {
        if (cMsg.value.trim().length < 20) {
          cError(cMsg, 'A couple of sentences helps us route you to the right person.');
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
          showToast('Could not send your message — nothing was saved. Please try again.');
          return;
        }
        contactform.classList.add('is-done');
        showToast('Message sent — we read everything.');
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

/* ---------------- Click sparks ---------------- */
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

/* ============ WHO WE'RE LOOKING FOR — inline profile search ============ */
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
    allBtn.textContent = showAll && !q ? 'Collapse ↑' : 'Browse all ' + P.length + ' →';
    allBtn.setAttribute('aria-expanded', String(showAll && !q));
    list.classList.toggle('is-all', showAll && !q);
  }

  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function render(items, total, q) {
    if (!items.length) {
      list.innerHTML =
        '<li class="seek__empty">No match in our examples — but the list is not a fence. If you bring it, we want to hear about it.</li>';
      foot.textContent = '0 of ' + P.length + ' examples matched — apply anyway.';
      return;
    }
    list.innerHTML = items
      .map(
        (p) =>
          '<li><span class="seek__tag">' + esc(p.c) + '</span><span class="seek__txt">' + esc(p.t) + '</span></li>'
      )
      .join('');
    if (!q) {
      foot.textContent = 'Showing 5 of ' + P.length + ' examples — type to search the rest.';
    } else {
      foot.textContent =
        'Top ' + items.length + ' of ' + total + ' matching example' + (total > 1 ? 's' : '') + '.';
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
        foot.textContent = 'All ' + P.length + ' examples — one for every seat.';
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

/* Wally mock-up: interactive compute selector (concept demo) */
(() => {
  const runsel = document.querySelector('.wally-runsel');
  if (!runsel) return;
  const statusEl = document.querySelector('[data-compute-status]');
  const badgeEl = document.querySelector('.wally-window__model');
  const copy = {
    device: ['bonsai-27b · local', 'compute: pinned to this device · nothing dispatched, nothing leaves it'],
    mesh: ['bonsai-27b · mesh', 'mesh: embedding rebuild → dispatched to mac-mini · stayed on your network'],
    auto: ['bonsai-27b · local', 'auto: task routed to the cheapest device that can carry it · mesh on standby'],
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

  /* ---- Mobile tap-to-expand cards ---- */
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
