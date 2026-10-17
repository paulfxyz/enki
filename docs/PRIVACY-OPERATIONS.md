# Privacy operations

This is an operating checklist for the English privacy notice, not a legal-compliance certification. Paul Fleury is the interim controller while Enki is unregistered; the approved application-retention ceiling is twelve months from submission.

## Purpose and lawful-basis assessment

- **Purpose:** consider self-initiated membership applications, respond to enquiries and prevent form abuse. These are the interests relied on under GDPR Article 6(1)(f), not a claim of official public authority or a contractual employment relationship.
- **Necessity:** name and contact details identify and enable a response; lane, skills, a work example and a professional link support a limited relevance assessment. Country is used for membership context, not nationality or protected-characteristic scoring. Avoid requesting more detail than the review needs.
- **Balance:** applicants deliberately approach the initiative and should reasonably expect private human review. Safeguards include optional file/voice formats, no requested special-category data or ID documents, no automatic admission/scoring, restricted reviewer access, an objection route and a fixed application lifetime. Do not extend this basis to marketing, publication, AI training, identity checks or a new controller.
- **Residual risk:** free-text, voice and uploaded files can reveal sensitive or third-party information. Do not solicit it; remove irrelevant sensitive material rather than relying on the general form pledge as explicit consent. Do not treat the project's philosophical framing as permission to profile beliefs.

The [European Commission's lawful-basis guidance](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/legal-grounds-processing-data_en) requires a case-specific assessment for legitimate interests. Reassess this record if the collection, reviewers, purposes or technology change; a qualified adviser should review high-risk or disputed processing.

## Retention implementation

- **Applications:** `api/storage.php` removes `membership` and legacy `application` records at or before the UTC cutoff of now minus twelve calendar months. The full row, including any file/voice payload, is deleted. Expiry applies to the original application even if a person later joins; create only necessary membership records under a separate notice.
- **Schedule:** configure an hourly SiteGround cron invoking `api/retention.php`. Cleanup also runs before exports and new writes, so an expired application cannot be exported through the API if cron is interrupted. Hourly physical cleanup can lag the anniversary by less than one scheduled interval; monitor failures.
- **Minimisation:** IP hashes and user agents in all submissions are cleared after 24 hours during cleanup. Provider logs are separate.
- **SQLite:** secure-delete overwrites deleted cells in the active database. This does not erase provider backups, prior exports or emails.
- **Enquiries:** the automatic deletion rule does not delete contact/registry records. The controller must review them on resolution and remove what is no longer needed; document a specific lawful reason for any longer retention.
- **Manual copies:** apply the same application deadline to exports and mailbox copies. Record necessary erasure instructions without retaining the deleted application itself; replay them after any backup restoration before review resumes.

`retention.php` is CLI-only: web requests return 404. Its output is counts and a timestamp, not applicant data. Keep job output outside the public root and monitor it.

## Hosting and release checks

The current SiteGround account shows Enki on GrowBig in Eemshaven, Netherlands, with daily system recovery points. SiteGround documents [up to 30 days of access-log archives](https://www.siteground.com/kb/find-website-raw-access-logs) and [30 daily backups for shared hosting](https://www.siteground.com/academy/wordpress-backups); these are different from the application database's retention policy.

- **Controller/processor terms:** verify the contracting account entity and applicable DPA, access roles, sub-processors and international-transfer safeguards. Do not infer an EU-only guarantee from the primary data-centre location or assume a generic regional DPA is the contract for this account.
- **Other recipients:** current HTML loads Google Fonts. Mail providers handle subsequent correspondence. The frontend sends application payloads directly to enki.ngo, not to an LLM.
- **Secrets:** preserve existing untracked `api/config.php`. The admin key must be a strong secret; the IP salt must be a private string of at least 16 bytes. Never upload test configuration, a private database, a production export or a credential to the public repo or preview.
- **Admin export:** use `X-Enki-Admin-Key` in a request header. URL query-string keys are no longer accepted. Restrict and delete downloaded exports; do not paste an admin key into browser URLs.
- **Deployment:** release `submit.php`, `storage.php`, `retention.php` and the frontend together. Configure and verify cron, confirm PHP SQLite support and host body limits, then test that unauthenticated exports fail and rejected requests do not create records.
- **Recovery:** restore code without rolling applicant data back. Before resuming any review after a database restore, run retention and reapply individual erasure requests.

## Rights and future identity checks

Use `hello@enki.ngo` for access, correction, restriction, deletion and objections; verify requests proportionately without routinely asking for ID documents. Keep a small request-handling log and track the applicable response deadline, exceptions and communications.

Applicants can use [Portugal's official CNPD complaint route](https://www2.gov.pt/en/servicos/apresentar-reclamacao-queixa-sobre-a-protecao-de-dados-pessoais). No membership identity provider has been selected: disclose purpose, lawful basis, recipients, transfer arrangements, retention and alternatives before collecting verification documents, and communicate any future controller transfer in advance.
