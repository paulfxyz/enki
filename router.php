<?php
declare(strict_types=1);
/* Public-page router only. All files are selected from fixed build manifests. */
$routes = json_decode((string) file_get_contents(__DIR__ . '/routes.json'), true);
if (!is_array($routes)) { http_response_code(503); exit('Pages temporarily unavailable.'); }
$rawPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$path = rawurldecode($rawPath);
if (preg_match('/[\x00-\x1f\\\\]/', $path) || str_contains($path, '..')) {
    http_response_code(400); exit('Invalid URL.');
}
// Local QA server: let PHP serve ordinary public assets, never private/dot files.
if (PHP_SAPI === 'cli-server' && !str_contains($path, '/.') &&
    $path !== '/router.php' && is_file(__DIR__ . $path) &&
    !preg_match('/\.html$/', $path)) { return false; }
$parts = explode('/', trim($path, '/'));
$lang = array_key_exists($parts[0], $routes) ? array_shift($parts) : 'en';
$slug = implode('/', $parts);
$slug = preg_replace('/\.html$/', '', $slug);
$page = array_search($slug, $routes[$lang], true);
if ($page === false && array_key_exists($slug, $routes['en'])) $page = $slug;
if ($page === false) $page = array_search($slug, $routes['en'], true);
if ($page === false) {
    http_response_code(404);
    header('Content-Type: text/html; charset=UTF-8');
    header('Cache-Control: no-store');
    echo '<!doctype html><html lang="en"><meta name="viewport" content="width=device-width"><title>Page not found | Enki</title><h1>Page not found</h1><p><a href="/en">Enki</a></p></html>';
    exit;
}
$query = $_GET;
if (isset($query['lang']) && is_string($query['lang']) && isset($routes[$query['lang']])) $lang = $query['lang'];
unset($query['lang']);
$canonical = '/' . $lang . ($routes[$lang][$page] !== '' ? '/' . $routes[$lang][$page] : '');
$encoded = '/' . $lang . ($routes[$lang][$page] !== '' ? '/' . rawurlencode($routes[$lang][$page]) : '');
if ($path !== $canonical || array_key_exists('lang', $_GET)) {
    $suffix = http_build_query($query, '', '&', PHP_QUERY_RFC3986);
    header('Location: ' . $encoded . ($suffix !== '' ? '?' . $suffix : ''), true, 301);
    exit;
}
$file = __DIR__ . '/assets/i18n/pages-' . $lang . '.json';
$pages = json_decode((string) file_get_contents($file), true);
if (!isset($pages[$page]) || !is_string($pages[$page])) { http_response_code(503); exit('Pages temporarily unavailable.'); }
header('Content-Type: text/html; charset=UTF-8');
header('Content-Language: ' . $lang);
header('Cache-Control: no-cache, must-revalidate');
header('X-Content-Type-Options: nosniff');
echo $pages[$page];
