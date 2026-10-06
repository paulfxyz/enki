/* ============================================================
   /simple · "Enki, in simple words" — one page, ten languages.
   Content lives in the JSON block below (keyed by language);
   this script renders it and swaps languages in place.
   ============================================================ */
(function () {
  'use strict';
  var DATA = JSON.parse(document.getElementById('sx-data').textContent);
  var LANGS = [
    ['en', 'English'], ['fr', 'Français'], ['de', 'Deutsch'], ['es', 'Español'],
    ['pt', 'Português'], ['zh', '中文'], ['ja', '日本語'], ['hi', 'हिन्दी'],
    ['ar', 'العربية'], ['ru', 'Русский']
  ];
  var RTL = { ar: 1 };
  var SV = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
  var ICONS = {
    what: '<path d="M12 21c-4.5 0-8-3.5-8-8s3.5-8 8-8 8 3.5 8 8-3.5 8-8 8z"/><path d="M12 13v-1c1.5 0 2.5-1 2.5-2.2S13.4 7.6 12 7.6s-2.5 1-2.5 2.2M12 16.4h.01"/>',
    why: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>',
    how: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>',
    priv: '<rect x="4" y="10" width="16" height="11" rx="2.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15.5" r="1.6" fill="currentColor" stroke="none"/>',
    'do': '<path d="M5 12h14M13 6l6 6-6 6"/>',
    use: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14 0 18-3-4-3-14.5 0-18z"/>',
    who: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    free: '<path d="M12 2l8 3v6c0 5-3.4 9.3-8 11-4.6-1.7-8-6-8-11V5l8-3z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    split: '<path d="M12 3v18" stroke-dasharray="3 3"/><rect x="2.5" y="7" width="7" height="10" rx="2"/><path d="M17 7l3.5 2v6L17 17l-3.5-2V9z"/>'
  };
  var TINT = { what: 'blue', why: 'amber', how: 'green', priv: 'rose', split: 'amber', 'do': 'blue', use: 'rose', who: 'ivory', free: 'green' };
  var ACTION_ICONS = [
    '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-2.5"/>',
    '<rect x="4.5" y="7.5" width="15" height="9.5" rx="4.75"/><circle cx="12" cy="12.2" r="1.5" fill="currentColor" stroke="none"/>',
    '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    '<rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 7l10 7L22 7"/>'
  ];
  var ACTION_HREFS = ['/manifesto', '/device', '/apply', 'mailto:hello@enki.ngo'];

  var cur = 'en';
  try { cur = localStorage.getItem('enki-lang') || 'en'; } catch (e) {}
  if (!DATA[cur]) cur = 'en';

  var sel = document.getElementById('sx-langsel');
  LANGS.forEach(function (L) {
    var o = document.createElement('option');
    o.value = L[0];
    o.textContent = L[1];
    sel.appendChild(o);
  });
  sel.value = cur;
  sel.addEventListener('change', function () {
    cur = sel.value;
    try { localStorage.setItem('enki-lang', cur); } catch (e) {}
    render();
    if (typeof onLangChange === 'function') onLangChange();
  });

  function sec(key, d, inner) {
    return '<section class="sxsec reveal is-revealed"><span class="gcic gcic--' + TINT[key] + '" aria-hidden="true"><svg ' + SV + '>' + ICONS[key] + '</svg></span>' +
      '<h2>' + d.h + '</h2>' + inner + '</section>';
  }

  function render() {
    var d = DATA[cur];
    var body = document.getElementById('sx-body');
    document.documentElement.setAttribute('lang', cur);
    body.setAttribute('dir', RTL[cur] ? 'rtl' : 'ltr');
    document.getElementById('sx-title').textContent = d.title;
    document.getElementById('sx-read').textContent = d.read;
    var lede = document.getElementById('sx-lede');
    if (lede && d.lede) lede.textContent = d.lede;
    var h = '';
    h += sec('what', d.what, d.what.p.map(function (p) { return '<p>' + p + '</p>'; }).join(''));
    h += sec('why', d.why, d.why.p.map(function (p) { return '<p>' + p + '</p>'; }).join(''));
    h += sec('how', d.how, '<ol class="sxsteps">' + d.how.steps.map(function (s, i) {
      return '<li><span class="sxn">' + (i + 1) + '</span><p>' + s + '</p></li>';
    }).join('') + '</ol>');
    if (d.priv) h += sec('priv', d.priv, d.priv.p.map(function (p) { return '<p>' + p + '</p>'; }).join(''));
    if (d.split) h += sec('split', d.split, d.split.p.map(function (p) { return '<p>' + p + '</p>'; }).join(''));
    h += sec('do', d.act, '<div class="sxacts">' + d.act.items.map(function (a, i) {
      return '<a class="sxact" href="' + ACTION_HREFS[i] + '"><svg ' + SV + '>' + ACTION_ICONS[i] + '</svg><b>' + a[0] + '</b><small>' + a[1] + '</small></a>';
    }).join('') + '</div>');
    h += sec('use', d.use, '<ul class="gticks sxticks">' + d.use.items.map(function (u) { return '<li>' + u + '</li>'; }).join('') + '</ul>');
    h += sec('who', d.who, d.who.p.map(function (p) { return '<p>' + p + '</p>'; }).join(''));
    h += sec('free', d.free, d.free.p.map(function (p) { return '<p>' + p + '</p>'; }).join(''));
    h += '<p class="sxback"><a class="glink" href="/">' + d.back + ' <span class="arr">→</span></a></p>';
    body.innerHTML = h;
  }
  render();

  /* ---------- audio version (all 10 languages) ----------
     One narration file per language (simple-audio-<code>.mp3), same
     narrator voice. Switching language swaps the <audio> source and
     relabels the button; duration updates via loadedmetadata. */
  var LISTEN = {"fr": "Écouter cette page", "de": "Diese Seite anhören", "es": "Escuchar esta página", "pt": "Ouvir esta página", "zh": "收听此页面", "ja": "このページを聞く", "hi": "यह पेज सुनें", "ar": "استمع لهذه الصفحة", "ru": "Слушать эту страницу", "en": "Listen to this page"};
  var playBtn = document.getElementById('sx-play');
  var audio = document.getElementById('sx-audio');
  if (playBtn && audio) {
    var PLAY_IC = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
    var PAUSE_IC = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg>';
    var btnIc = playBtn.querySelector('.sxplay__btn');
    function applyAudioLang() {
      playBtn.hidden = false;
      var want = '/simple-audio-' + cur + '.mp3';
      if (audio.getAttribute('src') !== want) {
        if (!audio.paused) audio.pause();
        audio.setAttribute('src', want);
        audio.load();
      }
      var b = playBtn.querySelector('.sxplay__tx b');
      if (b) b.textContent = LISTEN[cur] || LISTEN.en;
      var ln = document.getElementById('sx-ln');
      if (ln) {
        var L = LANGS.filter(function (x) { return x[0] === cur; })[0];
        ln.textContent = L ? L[1] : 'English';
      }
      playBtn.setAttribute('aria-label', LISTEN[cur] || LISTEN.en);
      /* show the right duration: immediately if metadata is already in,
         otherwise a quiet placeholder until loadedmetadata fires. */
      var dEl = document.getElementById('sx-dur');
      if (dEl) {
        if (audio.readyState >= 1 && audio.duration) {
          var t = Math.round(audio.duration);
          dEl.textContent = Math.floor(t / 60) + ':' + ('0' + (t % 60)).slice(-2);
        } else {
          dEl.textContent = '· · ·';
        }
      }
    }
    window.onLangChange = function () { applyAudioLang(); };
    applyAudioLang();
    function fmt(t) { t = Math.round(t); return Math.floor(t / 60) + ':' + ('0' + (t % 60)).slice(-2); }
    var durEl = document.getElementById('sx-dur');
    audio.addEventListener('loadedmetadata', function () { durEl.textContent = fmt(audio.duration); });
    audio.addEventListener('timeupdate', function () {
      if (!audio.paused && audio.duration) durEl.textContent = fmt(audio.duration - audio.currentTime);
    });
    function setState(playing) {
      playBtn.classList.toggle('is-playing', playing);
      btnIc.innerHTML = playing ? PAUSE_IC : PLAY_IC;
      playBtn.setAttribute('aria-label', playing ? 'Pause the audio version' : 'Listen to the audio version');
    }
    audio.addEventListener('ended', function () { setState(false); durEl.textContent = fmt(audio.duration); });
    audio.addEventListener('pause', function () { setState(false); });
    audio.addEventListener('play', function () { setState(true); });
    playBtn.addEventListener('click', function () { if (audio.paused) { var pr = audio.play(); if (pr && pr.catch) pr.catch(function () {}); } else { audio.pause(); } });
    setState(false);
  }
})();
