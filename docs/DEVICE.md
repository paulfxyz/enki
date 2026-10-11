# The proposed Enki device

English reference copy, 11 October 2026. This is a proposal, not a shipped or ratified system.

02 · The hardware

A pocket-sized local-AI concept: efficient silicon, a WiFi radio and one brass button. The goal is useful inference on devices you control, with a phone handling setup. Local-only operation and external connections must be clearly distinguished.

**Concept** — these are renders, not photographs. The device does not exist yet; designing and building it is precisely what the 300 are being assembled for.

[Help build it](https://enki.ngo/join)

One buttonProposed WiFi meshUSB-C ![Concept render of the Enki device: a palm-sized bone-white ceramic pebble with a round brass power button, a tiny battery LED, a single USB-C port and no screen](assets/img/enki-device-hero.jpg?v=3)

Enki One — bone ceramic, one brass button, USB-C. Nothing else.

## Six design goals. One proposed box.

### Runs the models itself

The target is to run selected, licensed open-weight models on the box itself. Supported models, memory use and sustained speed remain to be tested.

### Works with compatible devices

The proposed mesh would enrol only compatible devices the owner authorises. It would first route whole tasks to a capable machine, not automatically combine every nearby chip.

### A documented gateway for clients

A planned inference API and separate MCP tools would expose the mesh to compatible clients. LAN access requires authentication; hosted apps need a permitted bridge and may see the returned data.

### Owner-controlled model updates

Signed, versioned releases would make provenance and integrity checkable. Updates still require licence checks, testing, bandwidth and a recovery policy; “latest” does not always mean “best”.

### On. Off. That is the interface.

A companion app is planned for enrolment and updates. Setup time, physical controls and accessibility are targets to validate, not measured product features.

### Designed for local custody

The local-only path should keep prompts and answers on authorised devices. Cloud clients, remote tools and update services have different data flows, which must be disclosed and controlled.

Open design files planned Palm-sized ceramic pebble Target: one button, no screen or mandatory account Funded or no-margin pricing: a goal

![Concept render of the bone-white ceramic Enki device held in a hand, with a phone running the companion app, smart glasses and earbuds on a table behind it](assets/img/enki-device-context.jpg?v=3)

Set up from a phone, answering to glasses and earbuds.

### Outside your safe AI environments

Compatible home or office devices can host useful local workloads. A portable device could extend that option outside the building; it would not make every phone, network or task secure by default.

### Distributed like a public good

Enki intends to publish open designs rather than require one manufacturer. Funded distribution and no-margin pricing are goals, not a funded programme or a confirmed unit price. Manufacture, certification, repairs and energy remain real costs.

Everyday workloads

### The blueprint is the deliverable

The intended deliverable is a buildable set of schematics, firmware and enclosure files. MIT is the intended software licence; hardware-documentation licensing and third-party model licences must be specified separately. No named manufacturer is a partner, and no production-ready blueprint is claimed today.

Higher-risk capabilities

### Frontier AI, independently scrutinised

Our governance proposal calls for independently tested containment and enforceable oversight of systems with consequential capabilities. A physical disconnect can reduce exposure; it is not a universal safety guarantee.

The engineering

### EK1: a reference concept, engineered like we mean it.

Six engineering decisions to test before this can become a buildable product. These notes are a design brief, not a bill of materials, a working prototype or a promise of measured performance.

EK · 01**Compute & memory**Target: efficient silicon and sufficient memory for selected models, context caches and retrieval. Runtime compatibility and sustained speed still need testing.

EK · 02**Verified boot**Separate firmware-verification trust anchors, device-identity keys and data-encryption keys. Secure boot is one defence, not a complete security guarantee.

EK · 03**Silent by design**Passive cooling is a target. Shell materials, internal heat spreaders, touch temperature and sustained power need thermal validation.

EK · 04**Radios & mesh**Bluetooth-assisted commissioning and authenticated WiFi transport are proposed. Peer downloads stay within explicitly authorised networks.

EK · 05**Owner-controlled networking**Target: no mandatory account or telemetry. Network updates and remote tools remain explicit connections; a radio-off mode also stops wireless clients reaching the box.

EK · 06**Repairable by right**Target: documented parts, serviceable fasteners and repair instructions. Storage design, licensing and certification remain open engineering decisions.

## It does not exist yet.
That is the point.

Designing and building it is precisely what the 300 are being assembled for.

[Help build it — apply for a seat](https://enki.ngo/join)

### Spec sheet — concept targets

**Form factor:** Palm-sized ceramic pebble — smooth, rounded, pocketable; bone-white shell, one brass button

**Interface:** One power button. No screen. Companion mobile app over Bluetooth & WiFi

**Compute:** NPU-class silicon for quantised open models in the small-to-mid range

**Models:** Target: selected, licensed models with tested runtimes and owner-controlled, signed updates

**Mesh:** Proposed authenticated WiFi network of compatible, owner-authorised devices

**Protocol:** Proposed inference API and separate MCP tools, using a local bridge or authenticated LAN address

**Clients:** Compatible clients only; platform support, permissions and data flows need verification

**Price:** Funded distribution or a no-margin purchase price is the goal. Unit cost, funding and support are not settled.

### EK1 — the reference notes, in full

#### 01 · Compute and memory

The design starts with memory, runtime support and sustained power, not a peak accelerator score. Weights, context caches, embeddings and the operating system compete for capacity. A small model with a long context may need more memory than its download suggests. We must publish model-specific measurements before naming a supported configuration.

#### 02 · Verified boot, one root of trust

Firmware verification should use a protected publisher trust anchor; device identity should use a distinct, non-exportable key where supported; data should use separate encryption keys with a recovery policy. A hardware security boundary limits some attacks, not every physical or software compromise. Key provisioning, rotation, loss and recovery remain to be designed and tested.

#### 03 · Thermal design is the spec

Passive cooling is a target, not a verified capability of the ceramic render. The enclosure, heat spreaders, surface-temperature limits and ambient conditions must be tested together. Supported workloads must be based on sustained thermal performance rather than a short benchmark burst.

#### 04 · Radios and the mesh role

Bluetooth-assisted enrolment and authenticated WiFi transport are proposed. Discovery finds candidates; the owner authorises membership. Cached model chunks may be fetched from opted-in LAN peers. Reaching a neighbouring household or the wider internet is a separate trust and network decision, never an automatic extension of the mesh.

#### 05 · Nothing phones home

The intended local-only mode needs no cloud account or telemetry. Updating models still contacts a registry or mirror, and remote tools create their own data flows. A proposed hardware radio control would disconnect wireless clients as well as outside services; offline access would need a separately designed wired interface. Those behaviours must be tested before being promised.

#### 06 · Repairable by right

Repairability is a design requirement: publish parts, assembly steps, service access and software recovery procedures. Socketed storage, battery replacement and enclosure fasteners remain subject to space, thermal and safety constraints. Open files help repair; they do not by themselves guarantee spare parts or prevent incompatible products.

**Status: reference concept.** No prototype, validated bill of materials, production certification or manufacturing partnership is claimed. The 300 are being assembled to turn the brief into measured engineering.
