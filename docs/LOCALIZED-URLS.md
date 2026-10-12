# Localized URLs

Every public page has a locale-prefixed canonical path. English uses `/en`; French uses `/fr`, `/fr/300`, `/fr/manifeste`, `/fr/client`, `/fr/norme`, `/fr/registre`, `/fr/appareil`, `/fr/institut`, `/fr/en-bref`, `/fr/candidature` and `/fr/confidentialite`.

## Sources and build

- **Route map:** `routes.json` owns all twenty languages and eleven page identities. Latin-language slugs use unaccented lowercase words; non-Latin languages use native scripts. Membership is `300` everywhere.
- **Templates:** the eleven root HTML files and existing dictionaries remain the editorial sources. Asset URLs must stay root-relative so nested routes do not break CSS, scripts, images, fonts or audio.
- **Build:** run `npm ci` once, then `npm run build:locales` after source changes. It generates `routes-data.js`, localized HTML payloads at `assets/i18n/pages-<lang>.json`, 220 sitemap entries with language alternates, and ignored static-preview directories.
- **No request-time translation:** production only reads already-built public HTML from the allowlisted locale/page payload. No model/API calls, database writes, recurring automation or credentials are involved in page routing.
- **Rendering:** initial HTML has the localized text, title, description, canonical URL, `og:url`, language, direction and alternate links. Client scripts still render interactive sections and dynamic controls; `/simple` also has an initial six-section text fallback.

## Routing

`.htaccess` directs recognized locale and legacy page paths to `router.php`; assets and the existing API stay outside those rewrite rules. The router looks up page identities in `routes.json`, never in a user-supplied filesystem path.

- `/` redirects to `/en`.
- `/join?lang=fr` and `/join.html?lang=fr` redirect permanently to `/fr/300`.
- `/fr/manifesto` redirects to `/fr/manifeste`.
- `/fr/manifeste/` redirects to `/fr/manifeste`.
- A valid legacy `lang` query selects the target language and is removed. Other query parameters are retained.
- Unsupported localized paths return 404, not the homepage.
- A shared localized URL wins over browser preferences. The language chooser maps the same page identity into the new language and preserves its fragment.

`DirectorySlash Off` and `RewriteOptions AllowNoSlash` prevent Apache's automatic directory slash redirect from fighting canonical routes when generated preview directories also exist. Directory listing is disabled.

## Quiet simple edition

The simple edition is an accessibility-first direct-link destination. It never initializes or displays the arrival film, regardless of language, saved preferences or legacy aliases. `/simple` and `/fr/simple` redirect to the appropriate localized simple page. Narration is optional and starts only through the visitor's own play control.

## Deployment and verification

Upload all twenty generated payloads first, then the route map, versioned route bootstrap, page router, scripts and documentation. Activate the new `.htaccess` after its runtime dependencies are present; upload root source templates afterwards, since the router now serves the prepared payloads. This avoids exposing new language links before routing is active. Do not upload `node_modules` or the generated preview directories to SiteGround.

Keep a copy of the preceding `.htaccess` and source revision for rollback. Verify direct language homes, `/fr/300`, localized slugs, native-script paths, language switching, canonical and alternate tags, legacy redirects, invalid paths, nested assets, narration and application navigation. Do not submit fabricated applications during QA.

These routing changes do not imply that all language editions have the same editorial revision. Release 98 remains the newest English/French content baseline until the other eighteen editions are explicitly brought forward.
