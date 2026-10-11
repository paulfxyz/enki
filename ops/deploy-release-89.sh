#!/usr/bin/env bash
# Run on SiteGround via a temporary cron. Never place this script in public_html.
# Retains only a source checkout and a code-only rollback copy outside the web root.
set -Eeuo pipefail
umask 077
ROOT=/home/customer/www/enki.ngo
SHA=3804e6ce72d06fb5bd1249241d48a3eeeda877b2
STAGE="$ROOT/enki-release-89"
SOURCE="$STAGE/source"
BACKUP="$STAGE/code-before"
mkdir -p "$STAGE"
[[ -f "$STAGE/installed" ]] && exit 0
mkdir "$STAGE/install.lock" 2>/dev/null || exit 0
trap 'rmdir "$STAGE/install.lock"' EXIT
exec >> "$STAGE/install.log" 2>&1
echo "Starting Enki release $SHA"
[[ -d "$ROOT/public_html" && -s "$ROOT/public_html/api/config.php" ]]
[[ -f "$ROOT/private_data/enki_submissions.db" ]]
php -r 'exit(PHP_VERSION_ID >= 70400 && class_exists("SQLite3") ? 0 : 1);'
php -r 'include $argv[1]; exit(defined("ENKI_ADMIN_KEY") && is_string(ENKI_ADMIN_KEY) && strlen(ENKI_ADMIN_KEY)>=24 && defined("ENKI_IP_SALT") && is_string(ENKI_IP_SALT) && strlen(ENKI_IP_SALT)>=16 ? 0 : 1);' "$ROOT/public_html/api/config.php"
if [[ ! -d "$SOURCE/.git" ]]; then
  git init "$SOURCE"
  git -C "$SOURCE" remote add origin https://github.com/paulfxyz/enki.git
fi
git -C "$SOURCE" fetch --depth 1 origin "$SHA"
git -C "$SOURCE" checkout --detach FETCH_HEAD
[[ "$(git -C "$SOURCE" rev-parse HEAD)" == "$SHA" ]]
for file in api/submit.php api/storage.php api/retention.php; do
  php -l "$SOURCE/$file"
done
FILES=(
  LICENSE.md MANIFESTO.md README.md
  api/.htaccess api/retention.php api/storage.php api/submit.php
  app.js apply.html apply.js assets/i18n/en.json client.html data.js device.html
  docs/DEVICE.md docs/FAQ.md docs/GOVERNANCE.md docs/HOW-IT-WORKS.md
  docs/MODELS.md docs/PRIVACY-OPERATIONS.md docs/STANDARD.md docs/WEBSITE.md
  index.html institute.html join.html manifesto.html models.html privacy.html
  registry-en.js simple-audio-en.mp3 simple.html simple.js sitemap.xml
  standard.html swiss.css
)
for file in "${FILES[@]}"; do
  [[ -f "$SOURCE/$file" && ! -L "$ROOT/public_html/$file" ]]
  if [[ -f "$ROOT/public_html/$file" && ! -f "$BACKUP/$file" ]]; then
    mkdir -p "$BACKUP/$(dirname "$file")"
    cp -p "$ROOT/public_html/$file" "$BACKUP/$file"
  fi
done
for file in "${FILES[@]}"; do
  target="$ROOT/public_html/$file"
  mkdir -p "$(dirname "$target")"
  chmod 755 "$(dirname "$target")"
  cp "$SOURCE/$file" "$target.enki89.tmp"
  chmod 644 "$target.enki89.tmp"
  mv -f "$target.enki89.tmp" "$target"
  cmp -s "$SOURCE/$file" "$target"
done
php "$ROOT/public_html/api/retention.php" > "$ROOT/private_data/retention-status.json.tmp"
php -r '$v=json_decode(file_get_contents($argv[1]),true); exit(!($v["ok"] && $v["service_config_ready"]));' "$ROOT/private_data/retention-status.json.tmp"
mv "$ROOT/private_data/retention-status.json.tmp" "$ROOT/private_data/retention-status.json"
printf '%s\n' "$SHA" > "$STAGE/installed"
echo "Installed ${#FILES[@]} files; verified byte-for-byte. Film, translations, config and database location preserved."
cat "$ROOT/private_data/retention-status.json"
