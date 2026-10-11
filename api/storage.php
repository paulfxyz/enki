<?php
/**
 * Shared storage and retention. The database stays outside public_html.
 * This file exposes no HTTP action; maintenance is CLI-only in retention.php.
 */
function enki_db(): SQLite3 {
  $dir = dirname(__DIR__, 2) . '/private_data';
  if (!is_dir($dir) && !mkdir($dir, 0700, true) && !is_dir($dir)) {
    throw new RuntimeException('Private storage unavailable');
  }
  $db = new SQLite3($dir . '/enki_submissions.db');
  $db->enableExceptions(true);
  $db->busyTimeout(3000);
  // Overwrite deleted cells in the live database; host backups are separate.
  $db->exec('PRAGMA secure_delete = ON');
  $db->exec("CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    kind TEXT NOT NULL,
    name TEXT, email TEXT, payload TEXT,
    page TEXT, user_agent TEXT, ip_hash TEXT)");
  return $db;
}

function enki_expiry_cutoff(?DateTimeImmutable $now = null): string {
  $now = $now ?? new DateTimeImmutable('now', new DateTimeZone('UTC'));
  return $now->setTimezone(new DateTimeZone('UTC'))->modify('-12 months')->format('Y-m-d\TH:i:s.v\Z');
}

function enki_cleanup(SQLite3 $db, ?DateTimeImmutable $now = null): array {
  $now = $now ?? new DateTimeImmutable('now', new DateTimeZone('UTC'));
  $db->exec('BEGIN IMMEDIATE');
  try {
    // The approved limit covers both current and legacy membership forms.
    // Contact messages and registry proposals are not silently deleted here.
    $stmt = $db->prepare("DELETE FROM submissions
      WHERE kind IN ('membership','application') AND created_at <= :cutoff");
    $stmt->bindValue(':cutoff', enki_expiry_cutoff($now), SQLITE3_TEXT);
    $stmt->execute();
    $deleted = $db->changes();
    // The rate limiter needs ten minutes, not a year of browser identifiers.
    $stmt = $db->prepare("UPDATE submissions SET ip_hash = NULL, user_agent = NULL
      WHERE created_at <= :cutoff AND (ip_hash IS NOT NULL OR user_agent IS NOT NULL)");
    $stmt->bindValue(':cutoff', $now->setTimezone(new DateTimeZone('UTC'))->modify('-1 day')->format('Y-m-d\TH:i:s.v\Z'), SQLITE3_TEXT);
    $stmt->execute();
    $minimized = $db->changes();
    $db->exec('COMMIT');
    return ['applications_deleted' => $deleted, 'technical_fields_cleared' => $minimized];
  } catch (Throwable $e) {
    $db->exec('ROLLBACK');
    throw $e;
  }
}
