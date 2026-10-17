<?php
/**
 * enki.ngo form backend — replaces Supabase (which auto-pauses on free tier).
 * Stores submissions in SQLite OUTSIDE the web root: ../../private_data/enki_submissions.db
 * POST  {kind,name,email,payload,page,user_agent}  -> {"ok":true}
 * GET   X-Enki-Admin-Key: <admin token>             -> JSON export
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
$ALLOWED_ORIGINS = ['https://enki.ngo', 'https://www.enki.ngo'];
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
header('X-Content-Type-Options: nosniff');
header('X-Enki-Release: 20261017-101');

@include __DIR__ . '/config.php'; // defines ENKI_ADMIN_KEY, ENKI_IP_SALT (optional)
require_once __DIR__ . '/storage.php';

/* ---- Step 2: SQLite storage ----
   Opens (creating on first run) a SQLite database file one level
   above the web root, so it's on the server's disk but never directly
   reachable by URL. SQLite is a whole database engine that lives in a
   single file — no separate database server to install or manage,
   which keeps this small form backend simple to host. The table has
   one row per submission; nothing here marks rows as published —
   that happens later, by a human reviewing the export below. */
function db(): SQLite3 {
  try {
    $db = enki_db();
    // Defence in depth: expired records cannot be exported even if cron fails.
    enki_cleanup($db);
    return $db;
  } catch (Throwable $e) {
    http_response_code(503);
    echo '{"ok":false,"error":"storage temporarily unavailable"}';
    exit;
  }
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
  // Never accept credentials in a URL, where they leak into logs/history.
  $key = $_SERVER['HTTP_X_ENKI_ADMIN_KEY'] ?? '';
  if (!defined('ENKI_ADMIN_KEY') || !is_string(ENKI_ADMIN_KEY) || $key === '' || !hash_equals(ENKI_ADMIN_KEY, $key)) {
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
if ($origin !== '' && !in_array($origin, $ALLOWED_ORIGINS, true)) {
  http_response_code(403); echo '{"ok":false,"error":"origin not allowed"}'; exit;
}

/* ---- Step 3b: POST — validate the incoming submission ----
   Nothing sent by a browser is ever trusted as-is: the raw body is
   size-capped before it is parsed, must decode as valid
   JSON, and every individual field is trimmed and cut down to a safe
   maximum length. `kind` (e.g. "registry", "membership", "contact")
   must match a strict lowercase-letters/dash/underscore pattern so it
   can't be used to smuggle anything unexpected into the database. */
$maxJsonBytes = 6 * 1024 * 1024;
$maxTransportBytes = 9 * 1024 * 1024;
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > $maxTransportBytes) {
  http_response_code(413); echo '{"ok":false,"error":"request too large"}'; exit;
}
$raw = file_get_contents('php://input', false, null, 0, $maxTransportBytes + 1);
if (strlen($raw) > $maxTransportBytes) {
  http_response_code(413); echo '{"ok":false,"error":"request too large"}'; exit;
}
/* Accept both transports: raw JSON body, or the form-encoded `data`
   field used by the browser to avoid a CORS pre-flight. */
if (isset($_POST['data'])) { $raw = (string)$_POST['data']; }
if (strlen($raw) > $maxJsonBytes) {
  http_response_code(413); echo '{"ok":false,"error":"payload too large"}'; exit;
}
$data = json_decode($raw ?: '', true);
if (!is_array($data)) { http_response_code(400); echo '{"ok":false,"error":"bad json"}'; exit; }
foreach (['kind','name','email','page','user_agent'] as $field) {
  if (isset($data[$field]) && !is_string($data[$field])) {
    http_response_code(400); echo '{"ok":false,"error":"invalid field type"}'; exit;
  }
}

$kind = substr(trim((string)($data['kind'] ?? '')), 0, 40);
if (!in_array($kind, ['membership', 'application', 'contact', 'registry'], true)) {
  http_response_code(400); echo '{"ok":false,"error":"bad kind"}'; exit;
}
$name  = isset($data['name'])  ? substr(trim((string)$data['name']), 0, 200)  : null;
$email = isset($data['email']) ? substr(trim((string)$data['email']), 0, 200) : null;
$page  = substr((string)($data['page'] ?? ''), 0, 100);
$ua    = substr((string)($data['user_agent'] ?? ''), 0, 200);
$payload = json_encode($data['payload'] ?? new stdClass());
if (strlen($payload) > $maxJsonBytes) { http_response_code(413); echo '{"ok":false,"error":"payload too large"}'; exit; }

// A public fallback salt is not a secret. Fail closed if configuration is absent.
if (!defined('ENKI_IP_SALT') || !is_string(ENKI_IP_SALT) || strlen(ENKI_IP_SALT) < 16) {
  http_response_code(503); echo '{"ok":false,"error":"service configuration unavailable"}'; exit;
}
$salt = ENKI_IP_SALT;
$ipHash = substr(hash('sha256', $salt . ($_SERVER['REMOTE_ADDR'] ?? '')), 0, 24);

$db = db();
// throttle: max 10 submissions per IP per 10 minutes
// This table keeps a salted hash rather than the raw IP.
// It is pseudonymous, not anonymous; hosting access logs are separate.
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
try {
$ins = $db->prepare('INSERT INTO submissions (kind,name,email,payload,page,user_agent,ip_hash)
                     VALUES (:k,:n,:e,:p,:pg,:ua,:ip)');
$ins->bindValue(':k', $kind);  $ins->bindValue(':n', $name);  $ins->bindValue(':e', $email);
$ins->bindValue(':p', $payload); $ins->bindValue(':pg', $page); $ins->bindValue(':ua', $ua);
$ins->bindValue(':ip', $ipHash);
if ($ins->execute()) { http_response_code(201); echo '{"ok":true}'; }
else { http_response_code(500); echo '{"ok":false,"error":"write failed"}'; }
} catch (Throwable $e) {
  http_response_code(503); echo '{"ok":false,"error":"write failed"}';
}
