/* ============================================================
   ENKI — app.js
   Theme toggle · hero mesh canvas · scroll reveal ·
   registry live search / filters / sort · add-entry wizard ·
   manifesto modal · toast
   ============================================================ */
(function () {
  'use strict';

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
    lastFocus && lastFocus.focus();
  }
  document.querySelectorAll('[data-open-modal]').forEach((el) =>
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(el.dataset.openModal);
    })
  );
  document.querySelectorAll('.modal').forEach((m) => {
    m.querySelectorAll('[data-close-modal]').forEach((btn) =>
      btn.addEventListener('click', () => closeModal(m))
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
    nextBtn.addEventListener('click', () => {
      if (!validate(step)) return;
      if (step < panels.length - 1) {
        setStep(step + 1);
        return;
      }
      /* submit */
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

    jNext.addEventListener('click', () => {
      if (!validateJStep(jStep)) return;
      if (jStep < jPanels.length - 1) {
        setJStep(jStep + 1);
      } else {
        joinform.classList.add('is-done');
        showToast('Application sent — one of 500.');
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
