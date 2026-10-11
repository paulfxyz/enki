# The website

Enki is a multi-page site using HTML, CSS and JavaScript, with a PHP/SQLite submissions endpoint. There is no frontend framework or build step; the website is implemented, while the AI device, mesh and Institute it describes are proposals.

## Structure

- **Pages:** `index.html`, `manifesto.html`, `device.html`, `client.html`, `standard.html`, `institute.html`, `join.html`, `models.html`, `apply.html`, `simple.html` and the English-only `privacy.html`.
- **Presentation:** `base.css`, `style.css` and `swiss.css` provide the layered styles. Clean public URLs omit `.html`; the hosting configuration must resolve them.
- **Behaviour:** `app.js` handles shared controls and forms; `apply.js` implements the founding-seat wizard; `simple.js` renders the short explanation and narration.
- **Catalogue:** `data.js` retains the legacy data used by existing translations. `registry-en.js` supplies the audited English catalogue, with publisher links, a dated pricing snapshot and no unsupported self-hosting savings.
- **Languages:** the main site has English plus nineteen dictionaries; the simple explanation has ten versions. The October editorial audit changes English only. Existing translations are not synchronized or re-certified by that audit.
- **Media:** English narration must match the revised short explanation. Other language narration and dictionaries remain unchanged pending explicit approval.

## Local review

Serve the repository with a static server that resolves clean URLs, such as `serve . -l 8091 --no-clipboard`. Editing a file and reloading is sufficient for the frontend; a static server cannot execute PHP.

Published domains use the production submissions endpoint; review previews block submissions before sending anything. Localhost uses a local endpoint. During automated testing, intercept requests with mocks; never submit fabricated applications to production. To test actual storage, run the PHP endpoint in an isolated directory with its own database outside the served root.

## Submissions

The browser sends JSON in a form-encoded field to `https://enki.ngo/api/submit.php`. The dedicated application caps the combined JSON at 5 MiB, while the server accepts up to 6 MiB of JSON and a 9 MiB transport body. Hosting limits may be lower and must be verified during deployment.

The browser requires a successful response and `ok: true` before showing receipt. On error it keeps the answers on the page; those answers are not guaranteed to survive reload or tab closure. The backend stores submissions in SQLite outside the web root and rate-limits using a pseudonymous IP hash. The English privacy notice names Paul Fleury as interim controller; the approved application-retention ceiling is twelve months. `api/retention.php` is an hourly CLI cleanup job, with a second cleanup before writes/exports. Read [privacy operations](PRIVACY-OPERATIONS.md) for deployment and processor checks; hosting logs and recovery copies remain separate.

## Release checks

- **English:** review copy, references, model facts, diagrams, metadata and narration together.
- **Compatibility:** inspect desktop/mobile layouts, both themes and language switching; do not equate loaded translations with editorial parity.
- **Forms:** test validation, edit/back navigation, attachment limits, storage acknowledgement, server failures and retained answers.
- **Deployment:** bump asset versions consistently, commit the tested working revision, and review a private preview before publishing. A local commit or preview is not evidence that either public domain changed.
