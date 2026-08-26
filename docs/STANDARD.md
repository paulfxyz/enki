<h1 align="center">The standard we need</h1>

<p align="center"><em>Four clauses that would make local intelligence as ordinary as a lightbulb.</em></p>

<p align="center">
  <img src="../assets/standard.svg" alt="The four clauses: model currency, mesh enrolment, gateway recognition, neutral custody" width="100%" />
</p>

---

For the local AI datacenter to ship in every device rather than live in a hobbyist's weekend, one international standard has to exist. We can already name its four clauses. This page carries Article VII of the [manifesto](../MANIFESTO.md), where each claim is referenced.

## Clause I — Model currency

Any device shipping a GPU or NPU receives **verified updates to the small models it carries** — each release signed by its publisher, countersigned after validation, logged to a public transparency ledger, and revocable the moment a fault is found. The machinery already exists: OpenSSF Model Signing v1.0 and Sigstore bring exactly this signing-and-transparency pattern to model artifacts. A model is not a one-time factory decision; it is a maintained component of the device.

## Clause II — Mesh enrolment

A new device joins the household mesh with **a single confirmation**. It declares what it can carry — memory, memory bandwidth, thermal envelope — and accepts work sized to that declaration, the way Matter commissions a lightbulb in seconds. Discovery records are hints, never authority: every gateway connection is mutually authenticated against keys exchanged at enrolment, and nothing announced on the network can override them.

## Clause III — Gateway recognition

The mesh presents itself as **one endpoint speaking an open API/MCP dialect**, so any AI client — Wally, of course, included, but equally any chatbot you happen to prefer — can plug into it without a driver, a subscription or anyone's permission.

## Clause IV — Neutral custody

The specification lives in a **vendor-neutral body** where rivals hold each other honest, with a certification mark consumers can trust — and, where industry stalls, a legislature willing to finish the job as Europe did with the common charger.

---

## How it runs, end to end

Every part of the pipeline is proven somewhere already:

1. **Pull** — a model ships like a container image: a signed, content-addressed package pulled from a public registry (the pattern Ollama uses to distribute models today), published in several quantisations and in the formats each accelerator demands — one index serving many kinds of silicon, as container registries already serve ARM and x86 from a single name — so each device takes the variant its declared capability can carry: the phone pulls the 4-bit 3-billion compiled for its NPU, the desktop GPU pulls the 27-billion.
2. **Announce** — a device declares itself on the home network with the same zero-configuration discovery that lets a laptop find a printer or a Chromecast (mDNS/DNS-SD, standardised since 2013, running in billions of devices).
3. **Route** — the gateway (any capable machine in the house; Wally's mesh layer is one implementation) keeps the map of who holds what and routes each request, whole, to the one device that can serve it — session-aware, so a conversation stays pinned to the machine already holding its context. The reply never leaves your network. Distribution pays for itself the way software updates already do: a model pulled once into a household is served from inside it to every other device, and mirrors and ISP caches carry the rest.
4. **Aggregate** — when a model outgrows every single device, its layers can be split across several: pipeline parallelism over ordinary WiFi, which prima.cpp already demonstrates with 70B models on four home machines. The capability declarations of mesh enrolment are exactly what such a scheduler needs to place each slice.

Registry, discovery and routing are solved problems in adjacent domains, waiting to be pointed at models. Two pieces are genuinely unbuilt — a capability record precise enough to schedule against, and the matching layer that serves one signed model to many kinds of silicon — and aggregation remains live research, not a shipped guarantee. The remainder is the least glamorous work in technology: writing the specification, testing conformance, and getting rivals to sign the same page. That is what standards bodies are for.

## Nothing here asks for new physics

Each clause is already running somewhere — for lightbulbs, chargers or chat tools. What is missing is only the decision to apply the same instruments to intelligence. Drafting, arguing for and defending that standard — in standards bodies, in policy rooms, in public — will be among the first mandates of the Enki Institute's policy arm.

**Read it in context:** [Manifesto — Article VII](../MANIFESTO.md), with references for Matter commissioning, the EU common-charger directive and the API/MCP precedents.

---

<p align="center">
  <sub>Part of the <a href="../README.md">Enki repository</a> · <a href="https://enki.ngo">enki.ngo</a></sub>
</p>
