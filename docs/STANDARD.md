# The proposed Enki standard

English reference copy, 11 October 2026. This is a proposal, not a shipped or ratified system.

03 · The standard

A local AI mesh needs agreement and engineering: compatible runtimes, trustworthy enrolment, measured capabilities and affordable hardware. These four proposed clauses borrow useful patterns, but the combined standard is not yet implemented or adopted.

[Help write it](https://enki.ngo/join)[See the reference device](https://enki.ngo/device)

## Four clauses. A standard to build.

### Model currency

Supported devices would receive owner-controlled, signed model updates. Signatures establish provenance and integrity; quality, safety and licence rights require separate checks.

### Mesh enrolment

Discovery would locate compatible peers. A separate authenticated enrolment flow, with owner consent, would declare capabilities and grant access.

### Gateway recognition

A proposed gateway would expose an inference API and separate MCP tools. Compatibility depends on client support, authentication, runtime features and the platform's rules.

### Neutral custody

The proposed specification would need neutral stewardship, published tests and a certification process. No standards-body adoption or statutory mandate is claimed.

### The remaining work is substantial.

First make whole-request routing dependable. Cross-device execution, changing resource availability, key recovery and multi-vendor conformance need research and testing. A protocol sketch is not a shipped system.

[Read Article VII in the manifesto →](https://enki.ngo/manifesto)

The engineering

### ENKI-1 — the wire protocol, drafted like we mean it.

Six proposed mechanisms, borrowing from secure software distribution and authenticated networks. Existing components reduce uncertainty; they do not remove the need to test the combined system.

E1 · 01**Device profile**Proposed profile: supported runtimes and formats, available memory, bandwidth, measured sustained speed and thermal limits. Refresh changing capacity before scheduling.

E1 · 02**Signed snapshots**TUF-inspired metadata with separated signing roles, protected roots and expiry checks. A valid signature is not a model safety assessment.

E1 · 03**Content-addressed weights**Proposed content-addressed chunks and LAN-first caching, with owner-approved peers. Chunk size and hash choices await performance and compatibility testing.

E1 · 04**Delta updates**Use verified deltas only when smaller than a full download. Retraining or quantisation can change most weights; savings are not guaranteed.

E1 · 05**Revocation & rollback**Fresh signed metadata authorises recovery to an approved version. Prevent malicious rollback; show failures when no compatible safe version exists.

E1 · 06**Capability handshake**Inference API and MCP tools are distinct. Publish capabilities and permissions; cross-device model splitting remains experimental.

## Open protocols. Real implementation work.

The proposal is open for scrutiny. The 300 would develop and govern it.

[Help write it](https://enki.ngo/join)[See the reference device](https://enki.ngo/device)

### ENKI-1 — the draft, in full

#### 01 · Device profile

A proposed signed profile describes supported runtimes, formats, available memory, bandwidth and measured sustained performance. Peak TOPS alone is not a scheduling guarantee. Resource availability changes, so admission checks must be refreshed for each workload. Profiles should be shared only with enrolled, authorised gateways.

#### 02 · Signed snapshots

The proposal borrows TUF's separation of root, targets, snapshot and timestamp roles, with expiry and version checks. The exact signing quorum and recovery procedure remain to be specified. Devices verify metadata before trusting model files, then verify downloaded content. Signing is not a quality or safety review. [TUF specification](https://theupdateframework.github.io/specification/latest/).

#### 03 · Content-addressed weights

Content-addressed, resumable downloads could reuse verified chunks from opted-in LAN peers. A 64 MiB chunk and BLAKE3 are candidate choices, not settled protocol constants. Licence terms govern redistribution; reaching neighbours or public mirrors needs explicit configuration and funding. Neither locality nor encryption hides every traffic pattern.

#### 04 · Delta updates

A binary delta may reduce downloads when successive artefacts share enough bytes. Retraining, tensor changes, compression or quantisation may eliminate that benefit. The updater should compare verified patch and full-download sizes, check the exact base hash, and fall back safely. “Typical savings” needs a measured corpus before it becomes a claim.

#### 05 · Revocation and rollback

Revocation and recovery need an explicit policy. Fresh signed metadata could authorise an older, still-approved model, without accepting stale metadata or undoing anti-rollback protections. Devices must check runtime and data compatibility, expose failed recovery, and stop unsafe execution when no approved version works. Offline devices cannot learn a new revocation until they reconnect.

#### 06 · Capability handshake

A proposed gateway would offer a versioned inference API, a capability document and a distinct MCP tool interface. Clients still need support for the relevant API, authentication and features; MCP alone does not replace a hosted client's inference provider. Whole-request routing comes first. Layer splitting requires a compatible distributed runtime and evidence that the network cost is worthwhile.

**Status: proposal.** ENKI-1 currently consists of engineering notes, not a complete RFC, implementation or conformance suite. Versioned specifications and reproducible tests must precede certification.
