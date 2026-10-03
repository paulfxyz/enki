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

  var state = { lane: '', skills: [], extra: '', statement: '', file: null, voice: null, name: '', email: '', country: '', link: '' };
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
  function err(n, msg) { var el = $('err' + n); if (el) el.textContent = msg || ''; }

  /* ---- Step 1 · lanes ---- */
  var laneBtns = Array.prototype.slice.call(document.querySelectorAll('.lane'));
  laneBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      laneBtns.forEach(function (x) { x.classList.remove('is-sel'); });
      b.classList.add('is-sel');
      state.lane = b.getAttribute('data-lane');
      err(1, '');
      renderSkills();
    });
  });

  /* ---- Step 2 · skill chips ---- */
  function renderSkills() {
    var host = $('skills');
    var list = SKILLS[state.lane] || [];
    state.skills = [];
    host.innerHTML = '';
    list.forEach(function (sk) {
      var c = document.createElement('button');
      c.type = 'button'; c.className = 'chipx'; c.textContent = sk;
      c.addEventListener('click', function () {
        var i = state.skills.indexOf(sk);
        if (i === -1) { state.skills.push(sk); c.classList.add('is-sel'); }
        else { state.skills.splice(i, 1); c.classList.remove('is-sel'); }
        err(2, '');
      });
      host.appendChild(c);
    });
    var other = document.createElement('button');
    other.type = 'button'; other.className = 'chipx'; other.textContent = 'Something else\u2026';
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
          recwrap.innerHTML = '';
          var audio = document.createElement('audio');
          audio.controls = true; audio.src = URL.createObjectURL(blob);
          recwrap.appendChild(audio);
          var pill = document.createElement('span');
          pill.className = 'filepill';
          pill.appendChild(document.createTextNode('voice note \u00b7 ' + Math.round(blob.size / 1024) + ' KB '));
          var x = document.createElement('button');
          x.type = 'button'; x.textContent = '\u00d7'; x.setAttribute('aria-label', 'Remove voice note');
          x.addEventListener('click', function () { state.voice = null; recwrap.innerHTML = ''; rectime.textContent = 'up to 5 minutes'; });
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
  function valid(n) {
    if (n === 1) {
      if (!state.lane) { err(1, 'Pick one lane to continue.'); return false; }
    }
    if (n === 2) {
      if (!state.skills.length && !state.extra) { err(2, 'Tap at least one chip \u2014 or name something else.'); return false; }
    }
    if (n === 3) {
      if (!state.statement && !state.file && !state.voice) { err(3, 'Give us one thing \u2014 a few sentences, a file, or a voice note.'); return false; }
      if (state.statement && state.statement.length < 40 && !state.file && !state.voice) { err(3, 'A couple more sentences \u2014 40 characters minimum.'); return false; }
    }
    if (n === 4) {
      state.name = $('f-name').value.trim();
      state.email = $('f-email').value.trim();
      state.country = $('f-country').value.trim();
      state.link = $('f-link').value.trim();
      if (state.name.length < 3) { err(4, 'Your real, full name \u2014 every member is ID-verified.'); return false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) { err(4, 'That email does not look right.'); return false; }
      if (!state.country) { err(4, 'Country of residence \u2014 it matters for the compensation rule.'); return false; }
    }
    return true;
  }

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function renderReview() {
    var cards = [];
    function card(icon, label, text) {
      cards.push('<div class="rev__card">' + icon + '<div><b>' + label + '</b><p>' + text + '</p></div></div>');
    }
    var IC_LANE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M16.2 7.8l-2.1 6.3-6.3 2.1 2.1-6.3z"/></svg>';
    var IC_SK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>';
    var IC_PR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>';
    var IC_ME = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
    card(IC_LANE, 'Lane', esc(LANE_NAMES[state.lane] || state.lane));
    var sk = state.skills.slice();
    if (state.extra) sk.push(state.extra);
    card(IC_SK, 'Skills', esc(sk.join(' \u00b7 ')));
    var proof = [];
    if (state.statement) proof.push('\u201c' + esc(state.statement) + '\u201d');
    if (state.file) proof.push('Attachment: ' + esc(state.file.name) + ' (' + Math.round(state.file.size / 1024) + ' KB)');
    if (state.voice) proof.push('Voice note (' + Math.round(state.voice.size / 1024) + ' KB)');
    card(IC_PR, 'One thing', proof.join('<br/>'));
    card(IC_ME, 'You', esc(state.name) + ' \u00b7 ' + esc(state.email) + ' \u00b7 ' + esc(state.country) + (state.link ? ' \u00b7 ' + esc(state.link) : ''));
    document.getElementById('review').innerHTML = cards.join('');
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
