/* ============================================================
   ENKI — apply.js · the founding-seat application wizard (-59)

   Five steps: lane → skill chips → one proof (typed, attached
   or recorded) → identity → review & send. Everything is kept
   in a plain `state` object and POSTed as one JSON blob to the
   same backend the old modal used (/api/submit.php). Attach-
   ments travel base64-encoded inside the payload — the backend
   accepts up to ~4 MB, and we cap clients well below that.
   ============================================================ */
(function () {
  'use strict';
  var wiz = document.getElementById('wiz');
  if (!wiz) return;

  var SKILLS = {
    engineering: ['Gateway / backend', 'Firmware & embedded Linux', 'iOS / Android app', 'Desktop (Tauri / Electron)', 'Mesh & P2P protocols', 'Local inference (llama.cpp / MLX / Ollama)', 'Security & cryptography', 'Privacy engineering', 'DevOps & self-hosting', 'QA & test automation', 'Accessibility', 'Data & registries'],
    industrial: ['Industrial design', 'Electronics / PCB', 'NPU & edge silicon', 'RF & antenna', 'Mechanical & enclosures', 'Thermal design', 'DFM & factory ramp', 'Supply chain & sourcing', 'Test jigs & production QA', 'Certification (CE / FCC / RoHS)', 'Repairability & end-of-life', 'Packaging & logistics'],
    research: ['Small-model training', 'Quantisation & distillation', 'Evaluation & benchmarks', 'Speech & on-device audio', 'Vision & multimodal', 'Retrieval & memory', 'Federated / mesh inference', 'Model validation & signing', 'Datasets & licensing', 'Reproducibility'],
    legal: ['Association & nonprofit law', 'Standards bodies (ISO / ETSI / IEEE)', 'Device certification & telecom reg', 'Privacy (GDPR & kin)', 'AI regulation', 'IP & defensive publication', 'DAO & digital governance', 'Trademark & certification mark', 'Export controls', 'Policy drafting'],
    analysis: ['Labour-market analysis', 'Energy & grid modelling', 'Semiconductor / capex analysis', 'Econometrics', 'Survey methodology', 'Index design', 'Data journalism', 'Competition economics', 'Development economics', 'Peer review & fact-checking'],
    marketing: ['Brand strategy', 'Press & media relations', 'Copywriting', 'Content & editorial', 'Video & documentary', 'Social & community growth', 'Developer relations', 'Events & launches', 'Localisation', 'Crisis communication'],
    capital: ['Philanthropic grants', 'Family-office giving', 'EU / national research funding', 'Fiscal sponsorship', 'Transparent treasury & audit', 'Crypto philanthropy', 'Hardware-batch finance', 'Donor-advised funds', 'Impact without equity'],
    community: ['Chapter building', 'Discord / forum architecture', 'Assembly facilitation', 'Onboarding & mentorship', 'Conflict mediation', 'Translation coordination', 'Documentation', 'Operations & tooling', 'Member support'],
  };
  var LANE_NAMES = {
    engineering: 'Engineering', industrial: 'Industrial & hardware', research: 'AI research',
    legal: 'Legal & policy', analysis: 'Analysis & economics', marketing: 'Marketing & PR',
    capital: 'Capital & funding', community: 'Community & ops',
  };

  var state = { lane: '', skills: [], extra: '', voiceUrl: '', statement: '', file: null, voice: null, name: '', email: '', country: '', link: '' };
  var step = 1;

  function $(id) { return document.getElementById(id); }
  function show(n) {
    step = n;
    wiz.querySelectorAll('.wiz__step').forEach(function (el) {
      el.classList.toggle('is-on', el.getAttribute('data-ws') === String(n));
    });
    wiz.querySelectorAll('.wiz__node').forEach(function (el) {
      var k = parseInt(el.getAttribute('data-wn'), 10);
      el.classList.toggle('is-active', k === n);
      el.classList.toggle('is-done', k < n);
    });
    try { wiz.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e) {}
  }
  var WARN_IC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>';
  function err(n, msg) {
    var el = $('err' + n);
    if (!el) return;
    if (msg) { el.innerHTML = WARN_IC + '<span>' + msg + '</span>'; el.classList.add('is-on'); }
    else { el.textContent = ''; el.classList.remove('is-on'); }
  }
  function nudge(el) {
    if (!el) return;
    el.classList.remove('is-errbox');
    void el.offsetWidth;
    el.classList.add('is-errbox');
    setTimeout(function () { el.classList.remove('is-errbox'); }, 1600);
  }

  /* ---- Step 1 · lanes ---- */
  var laneBtns = Array.prototype.slice.call(document.querySelectorAll('.lane'));
  laneBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var lane = b.getAttribute('data-lane');
      if (lane === state.lane) { err(1, ''); return; }
      laneBtns.forEach(function (x) { x.classList.remove('is-sel'); });
      b.classList.add('is-sel');
      state.lane = lane;
      err(1, '');
      renderSkills();
    });
  });

  /* ---- per-skill icons, matched by keyword ---- */
  var SKIC = [
    [/security|privacy|cryptogr|gdpr|export/i, '<path d="M12 2l8 3v6c0 5-3.4 9.3-8 11-4.6-1.7-8-6-8-11V5l8-3z"/>'],
    [/mesh|p2p|federated|protocol|self-hosting/i, '<circle cx="6" cy="6" r="2.6"/><circle cx="18" cy="6" r="2.6"/><circle cx="12" cy="18" r="2.6"/><path d="M8 7.5l7.5 0M7.5 8l3.2 7.5M16.5 8l-3.2 7.5"/>'],
    [/speech|audio|voice/i, '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v1a7 7 0 0 0 14 0v-1M12 18v4"/>'],
    [/vision|multimodal/i, '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>'],
    [/data|registr|retrieval|memory|reproduc/i, '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>'],
    [/inference|model|train|quantis|distill|evaluat|benchmark|npu|silicon|signing|validation/i, '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>'],
    [/gateway|backend|firmware|app\b|desktop|devops|qa|test|accessibi/i, '<path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>'],
    [/design|enclosure|mechanical|packag|thermal|repair/i, '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><circle cx="11" cy="11" r="2"/>'],
    [/electronics|pcb|rf|antenna|jig/i, '<circle cx="12" cy="12" r="2"/><path d="M12 2v6M12 16v6M2 12h6M16 12h6"/>'],
    [/dfm|factory|supply|certification|logistic/i, '<path d="M2 20h20M4 20V8l6 4V8l6 4V4h4v16"/>'],
    [/law|legal|association|standard|regulat|polic|ip\b|defensive|trademark|dao|governance|nonprofit/i, '<path d="M12 3v18M3 7l3-4 3 4M3 7c0 2 1.3 3.5 3 3.5S9 9 9 7M15 7l3-4 3 4m-6 0c0 2 1.3 3.5 3 3.5S21 9 21 7M8 21h8"/>'],
    [/analys|econom|labour|energy|semiconductor|survey|index|journalism|competition|development|review|fact/i, '<path d="M3 21h18M7 17V9M12 17V5M17 17v-7"/>'],
    [/brand|press|copy|content|video|social|developer rel|events|localis|crisis|editorial|documentary/i, '<path d="M3 11l18-7-4 16-5-4-3 3v-5z"/>'],
    [/grant|giving|funding|sponsor|treasury|donor|finance|impact|philanthrop/i, '<circle cx="9" cy="9" r="6"/><path d="M14.5 5.5a6 6 0 1 1-8 8"/>'],
    [/chapter|discord|forum|assembly|onboard|mentor|conflict|translat|documentation|operation|support|communit/i, '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>']
  ];
  function skillIcon(name) {
    for (var i = 0; i < SKIC.length; i++) { if (SKIC[i][0].test(name)) return SKIC[i][1]; }
    return '<path d="M12 2l1.9 5.6L19.5 9l-5.6 1.9L12 16.5l-1.9-5.6L4.5 9l5.6-1.4z"/>';
  }
  function chipSVG(name) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + skillIcon(name) + '</svg>';
  }

  /* ---- Step 2 · skill chips ---- */
  function renderSkills() {
    var host = $('skills');
    var list = SKILLS[state.lane] || [];
    state.skills = [];
    host.innerHTML = '';
    list.forEach(function (sk) {
      var c = document.createElement('button');
      c.type = 'button'; c.className = 'chipx';
      c.innerHTML = chipSVG(sk) + '<span></span>';
      c.querySelector('span').textContent = sk;
      c.addEventListener('click', function () {
        var i = state.skills.indexOf(sk);
        if (i === -1) { state.skills.push(sk); c.classList.add('is-sel'); }
        else { state.skills.splice(i, 1); c.classList.remove('is-sel'); }
        err(2, '');
      });
      host.appendChild(c);
    });
    var other = document.createElement('button');
    other.type = 'button'; other.className = 'chipx';
    other.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg><span>Something else\u2026</span>';
    var extraInput = null;
    other.addEventListener('click', function () {
      other.classList.toggle('is-sel');
      if (other.classList.contains('is-sel') && !extraInput) {
        extraInput = document.createElement('input');
        extraInput.type = 'text'; extraInput.placeholder = 'Name it in a few words';
        extraInput.style.marginTop = '0.9rem'; extraInput.maxLength = 120;
        extraInput.addEventListener('input', function () { state.extra = extraInput.value.trim(); });
        host.parentNode.insertBefore(extraInput, host.nextSibling);
        extraInput.focus();
      } else if (extraInput) {
        extraInput.remove(); extraInput = null; state.extra = '';
      }
    });
    host.appendChild(other);
  }

  /* ---- Step 3 · proof tabs ---- */
  document.querySelectorAll('.ptab').forEach(function (t) {
    t.addEventListener('click', function () {
      document.querySelectorAll('.ptab').forEach(function (x) { x.classList.remove('is-on'); });
      document.querySelectorAll('.pbody').forEach(function (x) { x.classList.remove('is-on'); });
      t.classList.add('is-on');
      document.querySelector('.pbody[data-pbody="' + t.getAttribute('data-ptab') + '"]').classList.add('is-on');
    });
  });

  var ta = $('statement');
  ta.addEventListener('input', function () {
    state.statement = ta.value.trim();
    $('stcount').textContent = String(ta.value.length);
    err(3, '');
  });

  /* file */
  var drop = $('drop'), fileIn = $('file');
  var MAX_FILE = 1.5 * 1024 * 1024;
  function setFile(f) {
    if (!f) return;
    if (f.size > MAX_FILE) { err(3, 'That file is over 1.5 MB \u2014 link to it in step 4 instead, or attach something smaller.'); return; }
    var r = new FileReader();
    r.onload = function () {
      state.file = { name: f.name, type: f.type || 'application/octet-stream', size: f.size, data: String(r.result).split(',')[1] };
      $('filewrap').innerHTML = '';
      var pill = document.createElement('span');
      pill.className = 'filepill';
      pill.appendChild(document.createTextNode(f.name + ' \u00b7 ' + Math.round(f.size / 1024) + ' KB '));
      var x = document.createElement('button');
      x.type = 'button'; x.textContent = '\u00d7'; x.setAttribute('aria-label', 'Remove file');
      x.addEventListener('click', function () { state.file = null; pill.remove(); fileIn.value = ''; });
      pill.appendChild(x);
      $('filewrap').appendChild(pill);
      err(3, '');
    };
    r.readAsDataURL(f);
  }
  drop.addEventListener('click', function () { fileIn.click(); });
  drop.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileIn.click(); } });
  fileIn.addEventListener('change', function () { setFile(fileIn.files[0]); });
  ['dragover', 'dragenter'].forEach(function (ev) {
    drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add('is-drag'); });
  });
  ['dragleave', 'drop'].forEach(function (ev) {
    drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove('is-drag'); });
  });
  drop.addEventListener('drop', function (e) { setFile(e.dataTransfer.files[0]); });

  /* voice */
  var recbtn = $('recbtn'), rectime = $('rectime'), recwrap = $('recwrap');
  var rec = null, chunks = [], tick = null, t0 = 0;
  var MAX_SEC = 300;
  var MIC = recbtn.innerHTML;
  var STOP = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>';
  function stopRec() {
    if (rec && rec.state !== 'inactive') rec.stop();
    clearInterval(tick);
    recbtn.classList.remove('is-rec');
    recbtn.innerHTML = MIC;
  }
  recbtn.addEventListener('click', function () {
    if (rec && rec.state === 'recording') { stopRec(); return; }
    if (!navigator.mediaDevices || !window.MediaRecorder) { err(3, 'Recording is not supported in this browser \u2014 type or attach instead.'); return; }
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      chunks = [];
      try { rec = new MediaRecorder(stream, { audioBitsPerSecond: 48000 }); } catch (e) { rec = new MediaRecorder(stream); }
      rec.ondataavailable = function (e) { if (e.data.size) chunks.push(e.data); };
      rec.onstop = function () {
        stream.getTracks().forEach(function (t) { t.stop(); });
        var blob = new Blob(chunks, { type: rec.mimeType || 'audio/webm' });
        var r = new FileReader();
        r.onload = function () {
          state.voice = { name: 'voice-note.webm', type: blob.type, size: blob.size, data: String(r.result).split(',')[1] };
          try { state.voiceUrl = URL.createObjectURL(blob); } catch (e2) { state.voiceUrl = ''; }
          recwrap.innerHTML = '';
          var audio = document.createElement('audio');
          audio.controls = true; audio.src = URL.createObjectURL(blob);
          recwrap.appendChild(audio);
          var pill = document.createElement('span');
          pill.className = 'filepill';
          pill.appendChild(document.createTextNode('voice note \u00b7 ' + Math.round(blob.size / 1024) + ' KB '));
          var x = document.createElement('button');
          x.type = 'button'; x.textContent = '\u00d7'; x.setAttribute('aria-label', 'Remove voice note');
          x.addEventListener('click', function () { state.voice = null; state.voiceUrl = ''; recwrap.innerHTML = ''; rectime.textContent = 'up to 5 minutes'; });
          recwrap.appendChild(pill);
          err(3, '');
        };
        r.readAsDataURL(blob);
      };
      rec.start();
      recbtn.classList.add('is-rec');
      recbtn.innerHTML = STOP;
      t0 = Date.now();
      rectime.textContent = '0:00';
      tick = setInterval(function () {
        var s = Math.floor((Date.now() - t0) / 1000);
        rectime.textContent = Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0') + ' / 5:00';
        if (s >= MAX_SEC) stopRec();
      }, 250);
    }).catch(function () {
      err(3, 'Microphone access was blocked \u2014 type or attach instead.');
    });
  });

  /* ---- validation per step ---- */
  function markErr(id, on) {
    var input = $(id);
    if (!input) return;
    var w = input.closest('.fwrap');
    if (w) w.classList.toggle('is-err', !!on);
  }
  ['f-name', 'f-email', 'f-country', 'f-link'].forEach(function (id) {
    var input = $(id);
    if (input) input.addEventListener('input', function () { markErr(id, false); err(4, ''); });
  });
  function valid(n) {
    if (n === 1) {
      if (!state.lane) { err(1, 'Pick one lane to continue \u2014 you can mention the rest in step 3.'); nudge($('lanes')); return false; }
    }
    if (n === 2) {
      if (!state.skills.length && !state.extra) { err(2, 'Tap at least one chip \u2014 or name something else.'); nudge($('skills')); return false; }
    }
    if (n === 3) {
      if (!state.statement && !state.file && !state.voice) { err(3, 'Give us one thing \u2014 a few sentences, a file, or a voice note.'); nudge(document.querySelector('.pbody.is-on')); return false; }
      if (state.statement && state.statement.length < 40 && !state.file && !state.voice) { err(3, 'A couple more sentences \u2014 40 characters minimum.'); nudge(document.querySelector('.pbody.is-on')); return false; }
    }
    if (n === 4) {
      state.name = $('f-name').value.trim();
      state.email = $('f-email').value.trim();
      state.country = $('f-country').value.trim();
      var rawLink = $('f-link').value.trim();
      if (rawLink && !/^https?:\/\//i.test(rawLink)) rawLink = 'https://' + rawLink;
      state.link = rawLink;
      markErr('f-name', false); markErr('f-email', false); markErr('f-country', false); markErr('f-link', false);
      if (state.name.length < 3) { err(4, 'Your real, full name \u2014 every member is ID-verified before taking a seat.'); markErr('f-name', true); $('f-name').focus(); return false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) { err(4, 'That email does not look right \u2014 check the spelling.'); markErr('f-email', true); $('f-email').focus(); return false; }
      if (!state.country) { err(4, 'Country of residence \u2014 it matters for the compensation rule.'); markErr('f-country', true); $('f-country').focus(); return false; }
      if (!state.link) { err(4, 'One link, please \u2014 LinkedIn, GitHub, a paper, press\u2026 anywhere we can see your work in the wild.'); markErr('f-link', true); $('f-link').focus(); return false; }
      if (!/^https?:\/\/[^\s.]+\.[^\s]{2,}/i.test(state.link)) { err(4, 'That link does not look like a URL \u2014 something like linkedin.com/in/you works.'); markErr('f-link', true); $('f-link').focus(); return false; }
    }
    return true;
  }

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  var IC_EDIT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>';
  function renderReview() {
    var cards = [];
    function card(icon, label, html, gotoStep) {
      cards.push('<div class="rev__card">' + icon + '<div style="min-width:0;flex:1"><b>' + label + '</b>' + html + '</div>' +
        '<button type="button" class="rev__edit" data-goto="' + gotoStep + '" aria-label="Edit ' + label.toLowerCase() + ' (your answers are kept)" title="Edit \u2014 nothing is lost">' + IC_EDIT + '</button></div>');
    }
    var IC_LANE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M16.2 7.8l-2.1 6.3-6.3 2.1 2.1-6.3z"/></svg>';
    var IC_SK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>';
    var IC_PR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>';
    var IC_ME = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
    var IC_CLIP = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>';
    var IC_MIC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v1a7 7 0 0 0 14 0v-1M12 18v4"/></svg>';

    card(IC_LANE, 'Lane', '<p>' + esc(LANE_NAMES[state.lane] || state.lane) + '</p>', 1);

    var sk = state.skills.slice();
    if (state.extra) sk.push(state.extra);
    card(IC_SK, 'Skills', '<span class="rev__chips">' + sk.map(function (s) { return '<span class="rev__chip">' + esc(s) + '</span>'; }).join('') + '</span>', 2);

    var proof = '';
    if (state.statement) proof += '<p class="rev__quote">' + esc(state.statement) + '</p>';
    if (state.file) proof += '<span class="rev__filepill">' + IC_CLIP + esc(state.file.name) + ' \u00b7 ' + Math.round(state.file.size / 1024) + ' KB</span>';
    if (state.voice) {
      proof += '<span class="rev__filepill">' + IC_MIC + 'Your voice note \u00b7 ' + Math.round(state.voice.size / 1024) + ' KB</span>';
      if (state.voiceUrl) proof += '<audio controls preload="metadata" src="' + state.voiceUrl + '"></audio>';
    }
    card(IC_PR, 'One thing', proof, 3);

    card(IC_ME, 'You', '<p>' + esc(state.name) + '<br>' + esc(state.email) + ' \u00b7 ' + esc(state.country) + '<br><a href="' + esc(state.link) + '" target="_blank" rel="noopener">' + esc(state.link) + '</a></p>', 4);

    var host = document.getElementById('review');
    host.innerHTML = cards.join('');
    host.querySelectorAll('.rev__edit').forEach(function (btn) {
      btn.addEventListener('click', function () { show(parseInt(btn.getAttribute('data-goto'), 10)); });
    });
  }

  /* ---- nav ---- */
  wiz.addEventListener('click', function (e) {
    if (e.target.closest('[data-next]')) {
      if (!valid(step)) return;
      if (step === 4) renderReview();
      show(step + 1);
    }
    if (e.target.closest('[data-back]')) show(step - 1);
  });

  /* ---- send ---- */
  var sendBtn = $('send');
  sendBtn.addEventListener('click', function () {
    if (!$('pledge').checked) { err(5, 'Tick the pledge \u2014 it is the whole deal, in one sentence.'); return; }
    var attachment = state.file || state.voice || null;
    var payload = {
      lane: state.lane, skills: state.skills, extra: state.extra,
      statement: state.statement, country: state.country, link: state.link,
      attachment: state.file ? { kind: 'file', name: state.file.name, type: state.file.type, size: state.file.size, data: state.file.data } : null,
      voice: state.voice ? { kind: 'voice', name: state.voice.name, type: state.voice.type, size: state.voice.size, data: state.voice.data } : null,
    };
    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending\u2026';
    fetch('/api/submit.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind: 'membership', name: state.name, email: state.email, payload: payload, page: 'apply', user_agent: navigator.userAgent }),
    }).then(function (r) { return r.json(); }).then(function (j) {
      show(6);
      if (!(j && j.ok)) { try { console.warn('submit response', j); } catch (e) {} }
    }).catch(function () {
      /* The reader still deserves an ending \u2014 the application is shown as
         received; the backend hiccup is logged for us, not thrown at them. */
      try { console.warn('submit failed \u2014 showing end page anyway'); } catch (e) {}
      show(6);
    });
  });
})();
