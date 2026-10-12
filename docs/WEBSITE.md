# The website

Enki is a multi-page site using HTML, CSS and JavaScript, with a PHP/SQLite submissions endpoint. There is no frontend framework or build step; the website is implemented, while the AI device, mesh and Institute it describes are proposals.

## Structure

- **Pages:** `index.html`, `manifesto.html`, `device.html`, `client.html`, `standard.html`, `institute.html`, `join.html`, `models.html`, `apply.html`, `simple.html` and `privacy.html`.
- **Presentation:** `base.css`, `style.css` and `swiss.css` provide the layered styles. Clean public URLs omit `.html`; the hosting configuration must resolve them.
- **Behaviour:** `app.js` handles shared controls and forms; `apply.js` implements the founding-seat wizard; `simple.js` renders the short explanation and narration.
- **Catalogue:** `registry-en.js` supplies the shared fifty-model catalogue; each language dictionary translates its prose while preserving model identities and values. `data.js` retains legacy structures. Explicit scenario estimates and rounded cost ratios are not verified savings; see [methodology](COST-ESTIMATES.md). Hardware qualifications use full-width notes, and one collapsible assumptions panel includes the uncertainty disclaimer.
- **Languages:** all twenty supported languages include the October 12 content catch-up, including privacy, forms, metadata and Registry notes. `?lang=<code>` selects and saves a language. Arabic, Hebrew and Urdu use right-to-left layout. Changed or missing strings were translated through the approved OpenRouter route; existing accepted strings were retained. Targeted reviews check numerical differences, privacy meaning and the simple explanation, not independent native-speaker certification of every sentence.
- **Media:** all twenty simple-page narrations follow the six-part explanation: manifesto, protocol, client, Registry, device and Institute, followed by project status. Recordings are generated through OpenRouter, checked against the final script and cached by language. English and French accepted recordings are reused. Transcript correspondence and browser playback do not establish a comprehensive native-speaker acoustic review.
- **Landing and motion:** the six programme cards follow Manifesto, Device, Client, Standard, Institute, Registry. Manifesto and Device each occupy a full-width row, followed by Client beside Standard and Institute beside Registry. Hardware keeps its landscape framing; the final pair uses matching 4:3 illustration frames without cropping the artwork. Section numbers are synchronized across all languages; global navigation order is unchanged. Client, Registry and Institute art follows the existing illustration family. The Client diagram has blue inward and green outward particles on both sides; reduced-motion preferences pause its SVG animation.
- **Manifesto:** the main final appeal remains in Article X. The reworked postface develops the mythology, the caution about tools and wisdom, and the closing boat metaphor, without changing the 98-entry reference inventory.

## Local review

Serve the repository with a static server that resolves clean URLs, such as `serve . -l 8091 --no-clipboard`. Editing a file and reloading is sufficient for the frontend; a static server cannot execute PHP.

Published domains use the production submissions endpoint; review previews block submissions before sending anything. Localhost uses a local endpoint. During automated testing, intercept requests with mocks; never submit fabricated applications to production. To test actual storage, run the PHP endpoint in an isolated directory with its own database outside the served root.

## Submissions

The browser sends JSON in a form-encoded field to `https://enki.ngo/api/submit.php`. The dedicated application caps the combined JSON at 5 MiB, while the server accepts up to 6 MiB of JSON and a 9 MiB transport body. Hosting limits may be lower and must be verified during deployment.

The browser requires a successful response and `ok: true` before showing receipt. On error it keeps the answers on the page; those answers are not guaranteed to survive reload or tab closure. The backend stores submissions in SQLite outside the web root and rate-limits using a pseudonymous IP hash. The English privacy notice names Paul Fleury as interim controller; the approved application-retention ceiling is twelve months. `api/retention.php` is an hourly CLI cleanup job, with a second cleanup before writes/exports. Read [privacy operations](PRIVACY-OPERATIONS.md) for deployment and processor checks; hosting logs and recovery copies remain separate.

## Release checks

- **Language coverage:** validate active keys, placeholders, HTML, references, model facts, diagrams, metadata and narration together across the twenty supported languages.
- **Compatibility:** inspect desktop/mobile layouts, both themes and language switching; do not equate loaded translations with editorial parity.
- **Forms:** test validation, edit/back navigation, attachment limits, storage acknowledgement, server failures and retained answers.
- **Deployment:** bump asset versions consistently, commit the tested working revision, and review a private preview before publishing. A local commit or preview is not evidence that either public domain changed.
