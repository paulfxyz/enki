<?php
/**
 * enki.ngo form backend — replaces Supabase (which auto-pauses on free tier).
 * Stores submissions in SQLite OUTSIDE the web root: ../../private_data/enki_submissions.db
 * POST  {kind,name,email,payload,page,user_agent}  -> {"ok":true}
 * GET   ?key=<admin token from config.php>          -> JSON export
 * config.php (FTP-only, never in git) defines ENKI_ADMIN_KEY and ENKI_IP_SALT.
 *
 * Big picture for anyone new to PHP backends: the browser (app.js's
 * wizard code) POSTs a small JSON blob here whenever someone submits
 * a registry entry, membership application, or contact message. This
 * one file: (1) decides whether the browser is even allowed to talk
 * to us (CORS), (2) opens/creates a tiny SQLite database file sitting
 * outside the public web folder so nobody can download it directly,
 * (3) on GET, lets an admin with a secret key export everything as
 * JSON, and (4) on POST, checks the submitted data is sane, rate-
 * limits repeat senders, and inserts a new row. New entries land as
 * "pending" and only appear on the public site after a human reviews
 * them — this script only ever stores them, nothing here publishes
 * them automatically.
 */

/* ---- Step 1: CORS — decide who's allowed to call this endpoint ----
   Only requests from Enki's own domains get the special headers that
   let a browser's JavaScript read the response; browsers block
   cross-site responses by default unless the server explicitly opts
   in like this. OPTIONS is the "pre-flight" check browsers send
   before certain POSTs — answered with an empty 204 so the real POST
   can follow. */
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

/* ---- Step 2: SQLite storage ----
   Opens (creating on first run) a SQLite database file one level
   above the web root, so it's on the server's disk but never directly
   reachable by URL. SQLite is a whole database engine that lives in a
   single file — no separate database server to install or manage,
   which keeps this small form backend simple to host. The table has
   one row per submission; nothing here marks rows as published —
   that happens later, by a human reviewing the export below. */
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

/* ---- Step 3a: GET — admin export ----
   Only usable with the correct secret key (set in the untracked
   config.php), compared with hash_equals() instead of == so the
   comparison always takes the same amount of time regardless of how
   much of the key is right — a defence against timing attacks. With
   no or a wrong key it pretends the endpoint doesn't exist (404)
   rather than saying "wrong password", giving an attacker less
   information to work with. On success it dumps every stored
   submission as JSON — this is how a human reviews pending entries. */
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

/* ---- Step 3b: POST — validate the incoming submission ----
   Nothing sent by a browser is ever trusted as-is: the raw body is
   size-capped at 8KB before it's even parsed, must decode as valid
   JSON, and every individual field is trimmed and cut down to a safe
   maximum length. `kind` (e.g. "registry", "membership", "contact")
   must match a strict lowercase-letters/dash/underscore pattern so it
   can't be used to smuggle anything unexpected into the database. */
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
// (the IP itself is never stored — only a salted one-way hash of it,
// just enough to spot "too many submissions from the same visitor"
// without keeping their real address on disk)
$st = $db->prepare("SELECT COUNT(*) c FROM submissions WHERE ip_hash = :ip AND created_at > strftime('%Y-%m-%dT%H:%M:%fZ','now','-10 minutes')");
$st->bindValue(':ip', $ipHash);
$c = $st->execute()->fetchArray(SQLITE3_ASSOC)['c'] ?? 0;
if ($c >= 10) { http_response_code(429); echo '{"ok":false,"error":"slow down"}'; exit; }

/* ---- Step 4: insert + JSON response ----
   Uses a "prepared statement" (placeholders like :k filled in via
   bindValue) rather than pasting the values straight into the SQL
   text — this is what keeps user-typed text from ever being
   interpreted as part of the database command itself. On success the
   browser gets back a tiny {"ok":true} with HTTP 201 ("created");
   the front-end wizard code in app.js is what then shows the
   "thanks, your submission is pending review" success state. */
$ins = $db->prepare('INSERT INTO submissions (kind,name,email,payload,page,user_agent,ip_hash)
                     VALUES (:k,:n,:e,:p,:pg,:ua,:ip)');
$ins->bindValue(':k', $kind);  $ins->bindValue(':n', $name);  $ins->bindValue(':e', $email);
$ins->bindValue(':p', $payload); $ins->bindValue(':pg', $page); $ins->bindValue(':ua', $ua);
$ins->bindValue(':ip', $ipHash);
if ($ins->execute()) { http_response_code(201); echo '{"ok":true}'; }
else { http_response_code(500); echo '{"ok":false,"error":"write failed"}'; }
