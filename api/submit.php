<?php
/**
 * enki.ngo form backend — replaces Supabase (which auto-pauses on free tier).
 * Stores submissions in SQLite OUTSIDE the web root: ../../private_data/enki_submissions.db
 * POST  {kind,name,email,payload,page,user_agent}  -> {"ok":true}
 * GET   ?key=<admin token from config.php>          -> JSON export
 * config.php (FTP-only, never in git) defines ENKI_ADMIN_KEY and ENKI_IP_SALT.
 */

$ALLOWED_ORIGINS = ['https://enki.ngo', 'https://www.enki.ngo', 'https://enki.pplx.app'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $ALLOWED_ORIGINS, true)) {
  header('Access-Control-Allow-Origin: ' . $origin);
  header('Vary: Origin');
  header('Access-Control-Allow-Methods: POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type');
  header('Access-Control-Max-Age: 86400');
}
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') { http_response_code(204); exit; }
header('Content-Type: application/json');
header('Cache-Control: no-store, max-age=0');

@include __DIR__ . '/config.php'; // defines ENKI_ADMIN_KEY, ENKI_IP_SALT (optional)

function db(): SQLite3 {
  $dir = dirname(__DIR__, 2) . '/private_data';
  if (!is_dir($dir)) { mkdir($dir, 0700, true); }
  $db = new SQLite3($dir . '/enki_submissions.db');
  $db->busyTimeout(3000);
  $db->exec("CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    kind TEXT NOT NULL,
    name TEXT, email TEXT, payload TEXT,
    page TEXT, user_agent TEXT, ip_hash TEXT)");
  return $db;
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
  $key = $_GET['key'] ?? '';
  if (!defined('ENKI_ADMIN_KEY') || $key === '' || !hash_equals(ENKI_ADMIN_KEY, $key)) {
    http_response_code(404); echo '{"ok":false}'; exit;
  }
  $db = db();
  $rows = [];
  $res = $db->query('SELECT * FROM submissions ORDER BY id DESC LIMIT 5000');
  while ($r = $res->fetchArray(SQLITE3_ASSOC)) {
    $r['payload'] = json_decode($r['payload'] ?? 'null', true);
    $rows[] = $r;
  }
  echo json_encode(['ok' => true, 'total' => count($rows), 'rows' => $rows]);
  exit;
}

if ($method !== 'POST') { http_response_code(405); echo '{"ok":false}'; exit; }

$raw = file_get_contents('php://input', false, null, 0, 8192);
$data = json_decode($raw ?: '', true);
if (!is_array($data)) { http_response_code(400); echo '{"ok":false,"error":"bad json"}'; exit; }

$kind = substr(trim((string)($data['kind'] ?? '')), 0, 40);
if ($kind === '' || !preg_match('/^[a-z_-]+$/', $kind)) {
  http_response_code(400); echo '{"ok":false,"error":"bad kind"}'; exit;
}
$name  = isset($data['name'])  ? substr(trim((string)$data['name']), 0, 200)  : null;
$email = isset($data['email']) ? substr(trim((string)$data['email']), 0, 200) : null;
$page  = substr((string)($data['page'] ?? ''), 0, 100);
$ua    = substr((string)($data['user_agent'] ?? ''), 0, 200);
$payload = json_encode($data['payload'] ?? new stdClass());
if (strlen($payload) > 6000) { http_response_code(400); echo '{"ok":false,"error":"payload too large"}'; exit; }

$salt = defined('ENKI_IP_SALT') ? ENKI_IP_SALT : 'enki';
$ipHash = substr(hash('sha256', $salt . ($_SERVER['REMOTE_ADDR'] ?? '')), 0, 24);

$db = db();
// throttle: max 10 submissions per IP per 10 minutes
$st = $db->prepare("SELECT COUNT(*) c FROM submissions WHERE ip_hash = :ip AND created_at > strftime('%Y-%m-%dT%H:%M:%fZ','now','-10 minutes')");
$st->bindValue(':ip', $ipHash);
$c = $st->execute()->fetchArray(SQLITE3_ASSOC)['c'] ?? 0;
if ($c >= 10) { http_response_code(429); echo '{"ok":false,"error":"slow down"}'; exit; }

$ins = $db->prepare('INSERT INTO submissions (kind,name,email,payload,page,user_agent,ip_hash)
                     VALUES (:k,:n,:e,:p,:pg,:ua,:ip)');
$ins->bindValue(':k', $kind);  $ins->bindValue(':n', $name);  $ins->bindValue(':e', $email);
$ins->bindValue(':p', $payload); $ins->bindValue(':pg', $page); $ins->bindValue(':ua', $ua);
$ins->bindValue(':ip', $ipHash);
if ($ins->execute()) { http_response_code(201); echo '{"ok":true}'; }
else { http_response_code(500); echo '{"ok":false,"error":"write failed"}'; }
