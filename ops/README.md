# Enki deployment operations

Production runs on SiteGround; a static Perplexity preview cannot execute or verify the PHP endpoint. The 11 October 2026 release used a checksum-verified script fetched from the public repository and invoked through a temporary SiteGround cron.

## Release 89

- **Pinned application revision:** `3804e6ce72d06fb5bd1249241d48a3eeeda877b2`. `deploy-release-89.sh` installs this revision only; it is deliberately not a generic “deploy latest” command.
- **Metadata follow-up:** `87e291003484d2c6547780597280e570184ba820` corrects three manifesto description tags from an old count to 98 references/background readings. This follow-up was installed separately and checked against SHA-256 `37e5a743b4ba6da73799aa71cb5b900c6af5ff143467e78a620297b7e9847b99`.
- **Production safeguards:** the installer checks PHP, SQLite, secret configuration and the existing database location, then creates code-only rollback copies outside `public_html`. It neither overwrites configuration nor moves the database. It copies only the listed English-release files, leaving the film and translations alone.
- **Completion:** the `installed` marker is created only after file-by-file comparison and a successful initial retention invocation. Both temporary installation jobs were removed after verification.
- **Permanent schedule:** the CLI retention job runs at minute 17 each hour. Its status/error output remains in `private_data`, outside the web root. A successful installation invocation does not establish that future cron runs cannot fail; monitor failures.

## Avoid the failed routes

- **Local browser upload:** passing a sandbox path to the local Comet upload helper produced a zero-byte server archive despite a success response. Confirm server-side size and contents; never equate an upload toast or extraction toast with a successful release.
- **Comet control:** the CDP connection repeatedly failed with an unknown session identifier. The authorised fallback was Comet's own AppleScript interface after the user enabled the necessary account and browser permissions. Do not bypass authentication, Privacy Gate refusals or device restrictions.
- **SiteGround cron identifiers:** refresh the cron list after a create/delete before acting on another job. Stale rows produced “Failed to delete cron job”; refreshing and selecting the exact intended job resolved it.
- **Public endpoint checks:** SiteGround's protection challenged sandbox HTTP clients. The normal Comet session could verify live responses without disabling security controls. Only invalid POST probes were used in production; successful-write tests used an isolated database.

For a later release, prepare a new pinned revision and explicit file list; do not reuse the old completion marker, silently switch to the moving `main` branch, or restore applicant data with a code rollback. See `docs/PRIVACY-OPERATIONS.md` for retention, exports and restoration responsibilities.
# File Manager release follow-up (12 October 2026)

The English/French UI follow-up uses SiteGround File Manager directly, without a deployment cron or new scheduler. Browser-bridge uploads had previously reported success while creating a zero-byte ZIP; do not treat that acknowledgement as a release.

The working fallback used Comet's authorised AppleScript JavaScript interface to interact with File Manager's ordinary upload input and overwrite dialog. Public release files were fetched from the pinned GitHub commit, checked with SHA-256 in the browser, supplied as real browser `File` objects, and uploaded through the UI. Multiple files were accepted together. Check the upload-success count and non-zero sizes, then fetch the public files from an ordinary enki.ngo browser tab and compare their SHA-256 hashes to the checkout.

Only approved frontend files, language assets, French narration and documentation were replaced. Do not include private configuration, database files, server logs or applicant exports. Retain the source commit for rollback. Leave the existing retention schedule unchanged unless the controller explicitly chooses a different policy; no new installer job is needed for this route.
