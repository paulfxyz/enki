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
    'do': '<path d="M5 12h14M13 6l6 6-6 6"/>',
    use: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14 0 18-3-4-3-14.5 0-18z"/>',
    who: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    free: '<path d="M12 2l8 3v6c0 5-3.4 9.3-8 11-4.6-1.7-8-6-8-11V5l8-3z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>'
  };
  var TINT = { what: 'blue', why: 'amber', how: 'green', 'do': 'blue', use: 'rose', who: 'ivory', free: 'green' };
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

  var tabs = document.getElementById('sx-langs');
  LANGS.forEach(function (L) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'sxlang' + (L[0] === cur ? ' is-on' : '');
    b.setAttribute('role', 'tab');
    b.setAttribute('data-l', L[0]);
    b.textContent = L[1];
    b.addEventListener('click', function () {
      cur = L[0];
      try { localStorage.setItem('enki-lang', cur); } catch (e) {}
      tabs.querySelectorAll('.sxlang').forEach(function (x) { x.classList.toggle('is-on', x === b); });
      render();
    });
    tabs.appendChild(b);
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
    var h = '';
    h += sec('what', d.what, d.what.p.map(function (p) { return '<p>' + p + '</p>'; }).join(''));
    h += sec('why', d.why, d.why.p.map(function (p) { return '<p>' + p + '</p>'; }).join(''));
    h += sec('how', d.how, '<ol class="sxsteps">' + d.how.steps.map(function (s, i) {
      return '<li><span class="sxn">' + (i + 1) + '</span><p>' + s + '</p></li>';
    }).join('') + '</ol>');
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
})();
