<p align="center"><img src="assets/logo.svg" width="80" alt="Enki mark"></p>

# Enki

Intelligence belongs within people's reach and control. Enki is an unregistered, public-good founding initiative proposing local-first AI infrastructure, open designs and accountable governance.

<p align="center"><img src="assets/banner.jpg" alt="Enki, the Sumerian god of wisdom and fresh water, imagined above a local mesh of everyday devices" width="100%"></p>

The website and repository are real; the device, mesh, Context Vault, certification programme and Institute are work to be built. The founding target is 300 individuals, not a claim of 300 confirmed members.

> Frontier AI should be independently scrutinised. Everyday AI should be local where practical, portable and honestly costed.

## Start here

- **[The Manifesto](MANIFESTO.md):** ten articles, a postface, and 101 references and background readings. The October 2026 evidence is integrated into the existing articles.
- **[Governance](docs/GOVERNANCE.md):** proposed membership, equal voting, annual rotation and compensation rules; legal form and procedures still need ratification.
- **[Oversight and diffusion](docs/OVERSIGHT.md):** separate oversight for frontier/datacenter-intensive AI and everyday intelligence, connected by a staged, evidence-led path.
- **[The device](docs/DEVICE.md):** a reference concept, not a prototype or production-ready blueprint.
- **[The standard](docs/STANDARD.md):** proposed authenticated enrolment, model distribution, routing and conformance.
- **[The models](docs/MODELS.md):** 50 candidates with publisher evidence, licence notes and a dated hosted-price snapshot. These are not Enki benchmark results.
- **[The website](docs/WEBSITE.md):** implementation, testing and release notes.
- **[How it works](docs/HOW-IT-WORKS.md):** a plain-language walkthrough of the website.
- **[FAQ](docs/FAQ.md):** short answers about status, costs, membership and reuse.

## The six pillars

- **Manifesto:** the case for local alternatives, including their limits and the evidence needed to assess them.
- **Device:** proposed portable hardware for selected local models and compatible clients.
- **Protocol:** a proposed inference API and separate MCP tools, with explicit authentication and permissions.
- **Models:** an editorial catalogue, with a member-led evaluation programme still to be established.
- **Institute:** proposed research on work, culture, power and the technical merits of local-first deployment.
- **Advisory:** a proposed evidence-led advisory programme, subject to qualified staffing and disclosed conflicts.

## The Enki device

The initial mesh objective is dependable whole-request routing among authorised, compatible devices. Combining several devices to execute one model is a separate research problem; memory, bandwidth, heat, runtime support and network latency all matter.

The portable device is intended to make local inference accessible beyond the home. Open build files, funded distribution and no-margin pricing are goals, not existing offers or announced manufacturing partnerships. The [device brief](docs/DEVICE.md) describes what must be tested.

## The 300

The founding proposal reserves no permanently privileged founder's seat. Paul Fleury intends to step back after the founding year into an honorary role without a special vote; at full membership, thirty of the three hundred seats would rotate annually under an agreed review process.

Membership would have no fee and no corporate or proxy seats. Identity checks, interviews, voting, conflicts and appeals require defined procedures; no blockchain voting system is claimed as implemented. Approved work may be compensated subject to funding and a proposed cap whose income measure and treatment of benefits must be specified before use.

Applications are intended for human review, not automatic admission. No reply date is guaranteed, and initial applications should not contain identity documents or sensitive third-party data.

## How the site works

The frontend is plain HTML, CSS and JavaScript, without a framework. Eleven source pages share `app.js`; the application and simple explanation have their own scripts. A small build step materializes their localized versions, served through a whitelisted PHP page router. `api/submit.php` remains the separate PHP/SQLite submissions endpoint. The multilingual [privacy notice](https://enki.ngo/privacy) names Paul Fleury as interim controller; [privacy operations](docs/PRIVACY-OPERATIONS.md) documents the approved twelve-month application limit, cleanup job, admin-header authentication and outstanding processor checks.

All language versions use the model catalogue in `registry-en.js`. Publisher facts and dated hosted rates remain separate from the explicitly hypothetical cost comparison. Cards compare 80% input / 20% output at an illustrative hardware amortisation, electricity and batched-throughput scenario. Missing hosted rates use a size-tier estimate, not a provider quote. Ratios can favour either cloud or self-hosting; they are not audited savings or Enki device benchmarks. See [cost methodology](docs/COST-ESTIMATES.md).

The application requires an acknowledged storage response before showing success. Errors retain answers on the current page, but reload or tab closure can lose them. See the [website guide](docs/WEBSITE.md) for payload limits and isolated testing.

## Translation status

The main site and six-part simple explanation support twenty languages, with narration for each. Release 100 brings the changed English content to every language and adds a full active-copy premium revision in French, Spanish, Simplified Chinese and Russian. Those four editions received an independent source-grounded editorial review; the other fifteen translations received a reviewed changed-content update rather than a new full-site rewrite. This is automated editorial QA, not native-human certification.

All twenty languages have their own localized URLs, such as `/fr`, `/fr/manifeste` and `/fr/300`. Language switching preserves the page, query parameters other than `lang`, and the section anchor. Legacy query-based links redirect to their canonical localized paths. Direct visits to the simple explanation never initialize the arrival film; narration remains a manual choice.

## Running and releasing

Run `npm ci`, then `npm run build:locales`, and serve locally with `php -S 127.0.0.1:8092 router.php`. Test Apache rewrite rules separately with `.htaccess` enabled. Static preview hosting uses generated locale directories and cannot validate production PHP or redirects; test server-side storage separately and mock production submissions during browser QA. See [localized routing](docs/LOCALIZED-URLS.md).

The public targets are [enki.ngo](https://enki.ngo) and [enki.pplx.app](https://enki.pplx.app). A repository revision or private preview is not evidence that either public site has been updated; publishing requires its own deployment and verification.

## Licence

Enki-authored source code is offered under MIT and original Enki content under CC BY-SA 4.0, to the extent the relevant rights are held. Third-party fonts, model weights, trademarks, quotations and film material retain separate rights; see [LICENSE.md](LICENSE.md).
