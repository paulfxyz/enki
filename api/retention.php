<?php
/**
 * Hourly host cron: php /absolute/path/public_html/api/retention.php
 * Only counts are printed, never applicant content or credentials.
 */
if (PHP_SAPI !== 'cli') {
  http_response_code(404);
  exit;
}
require_once __DIR__ . '/storage.php';
@include __DIR__ . '/config.php';
try {
  $result = enki_cleanup(enki_db());
  $configured = defined('ENKI_ADMIN_KEY') && is_string(ENKI_ADMIN_KEY) && strlen(ENKI_ADMIN_KEY) >= 24
    && defined('ENKI_IP_SALT') && is_string(ENKI_IP_SALT) && strlen(ENKI_IP_SALT) >= 16;
  echo json_encode(['ok' => true, 'checked_at' => gmdate('c'),
    'service_config_ready' => $configured, 'php_version' => PHP_VERSION] + $result) . PHP_EOL;
} catch (Throwable $e) {
  fwrite(STDERR, "Enki retention cleanup failed; inspect private storage and retry.\n");
  exit(1);
}
