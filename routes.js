/* Clean localized URLs. Content language is part of the URL, never a cookie. */
(function () {
  'use strict';
  var routes = window.ENKI_ROUTE_DATA;
  var doc = document.documentElement;
  var lang = doc.getAttribute('data-locale') || 'en';
  var page = doc.getAttribute('data-page') || 'index';
  function decode(p) { try { return decodeURIComponent(p); } catch (_) { return ''; } }
  function resolve(path) {
    var parts = decode(path).replace(/^\/|\/$/g, '').replace(/\.html$/, '').split('/');
    var locale = routes[parts[0]] ? parts.shift() : null;
    var slug = parts.join('/');
    var map = routes[locale || 'en'];
    var key = Object.keys(map).find(function (k) { return map[k] === slug; });
    if (!key && Object.prototype.hasOwnProperty.call(map, slug)) key = slug;
    if (!key) key = Object.keys(routes.en).find(function (k) { return routes.en[k] === slug; });
    return key ? {lang: locale, page: key} : null;
  }
  function pathFor(locale, key) {
    if (!routes[locale] || !Object.prototype.hasOwnProperty.call(routes[locale], key)) return null;
    return '/' + locale + (routes[locale][key] ? '/' + encodeURIComponent(routes[locale][key]) : '');
  }
  function localize(href, locale) {
    if (!href || href[0] === '#' || /^(mailto:|tel:|data:|javascript:)/i.test(href)) return href;
    var url;
    try { url = new URL(href, location.href); } catch (_) { return href; }
    if (![location.host, 'enki.ngo', 'www.enki.ngo'].includes(url.host)) return href;
    var found = resolve(url.pathname);
    if (!found) return href;
    var requested = url.searchParams.get('lang');
    var target = routes[requested] ? requested : (locale || lang);
    url.searchParams.delete('lang');
    return pathFor(target, found.page) + url.search + url.hash;
  }
  function fixLinks(root) {
    var links = [];
    if (root.matches && root.matches('a[href]')) links.push(root);
    if (root.querySelectorAll) links = links.concat(Array.from(root.querySelectorAll('a[href]')));
    links.forEach(function (a) {
      var old = a.getAttribute('href'), next = localize(old);
      if (old !== next) a.setAttribute('href', next);
    });
  }
  function switchLanguage(locale) {
    var path = pathFor(locale, page);
    if (!path) return;
    try { localStorage.setItem('enki-lang', locale); } catch (_) {}
    var params = new URLSearchParams(location.search); params.delete('lang');
    location.assign(path + (params.toString() ? '?' + params.toString() : '') + location.hash);
  }
  window.ENKI_ROUTES = {resolve: resolve, path: pathFor, localize: localize, fixLinks: fixLinks, switchLanguage: switchLanguage};
  window.ENKI_LANG = lang;
  window.ENKI_PAGE = page;
  doc.lang = lang;
  doc.dir = ['ar', 'he', 'ur'].includes(lang) ? 'rtl' : 'ltr';
  try { localStorage.setItem('enki-lang', lang); } catch (_) {}
  if (lang !== 'en') document.write('<script src="/assets/i18n/' + lang + '.js?v=20261012-100"><\/script>');
  document.addEventListener('DOMContentLoaded', function () {
    fixLinks(document);
    new MutationObserver(function (records) {
      records.forEach(function (r) { r.addedNodes.forEach(function (n) { if (n.nodeType === 1) fixLinks(n); }); });
    }).observe(document.body, {childList: true, subtree: true});
  });
})();
