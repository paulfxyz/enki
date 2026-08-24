<p align="center">
  <img src="assets/logo.svg" width="72" alt="Enki mark" />
</p>

<h1 align="center">The Enki Manifesto</h1>

<p align="center"><em>Intelligence belongs on your devices, not in their datacenters.</em></p>

<p align="center">
  <a href="https://enki.ngo"><img src="https://img.shields.io/badge/read_it_live-enki.ngo-2a5c3f?style=flat-square" alt="enki.ngo"></a>
  <img src="https://img.shields.io/badge/references-79-a1731c?style=flat-square" alt="79 references">
  <img src="https://img.shields.io/badge/status-living_document-437a22?style=flat-square" alt="living document">
</p>

---

# A letter on the state of intelligence

Lisbon — first published 2026 · living document, revised as the evidence evolves

Something extraordinary happened in the last four years: the cost of intelligence collapsed, and almost nobody changed their plans. The price of running a model at GPT-3.5-class performance fell more than 280-fold in under two years [13]. A model that needed 540 billion parameters in 2022 needs fewer than four billion today [16]. And yet the world's response to intelligence getting radically smaller and cheaper has been to build the largest, most centralised machines in human history.

We believe this is a mistake — economically, ecologically, and civilisationally. This letter explains why, and what we propose instead.

We named this association after Enki, the Sumerian god of wisdom and fresh water. When the assembly of gods resolved to flood mankind, Enki chose to warn a mortal and taught him to build a boat [49,50]. Intelligence was hoarded above; a leak saved humanity. Every article that follows is written from his side of that argument.

## Article I The AI frenzy is wrong

The four largest hyperscalers plan to spend roughly $725 billion on capex in 2026 alone — up 77% from 2025 — with Goldman Sachs projecting $5.3 trillion between 2025 and 2030 [1]. OpenAI's Stargate program pledged $500 billion, briefly inflated toward $1.4 trillion, then was quietly cut back to $600 billion [2,3]. The IMF and the Bank of England have both warned that this looks like a bubble [4]. Even the industry's own financiers cannot locate the revenue: Sequoia Capital calculates the build-out now needs some $600 billion a year of end-user sales to pay for itself, and finds a $500 billion hole [74].

The physical bill is no smaller. Datacenters consumed about 415 TWh of electricity in 2024 and are on track to nearly double to ~945 TWh by 2030 — almost 3% of global electricity — while a single AI-focused datacenter draws as much power as 100,000 households [5]. Water use tied to datacenter power is projected to grow 400% this decade [6]. All of this to centralise a technology whose unit cost is in free fall. Historians of technology have a name for this pattern: the authoritarian technics — system-centred, immensely powerful, and inherently brittle [40]. Every billion sunk into a warehouse of GPUs is a billion not spent putting intelligence into the hands, homes and languages that need it.

> Capital is chasing the wrong bottleneck. Intelligence is not scarce anymore — trust, locality and access are.

## Article II Intelligence must be decentralised

Today one company controls an estimated 85–90% of AI accelerators and consumes up to 77% of the world's AI-processor wafer supply [7,8]. One country controls roughly 75% of global AI compute; a second holds most of the rest [9]. A handful of labs absorb a fifth of the planet's AI processing power [10]. Policy researchers who traced this bottleneck reach a blunt conclusion: control over compute has become the industry's deepest moat, and whoever holds it sets the terms for everyone downstream [75]. No previous general-purpose technology — not print, not electricity, not the internet — was ever this concentrated at maturity: the foundational economics of general-purpose technologies shows they generate their growth precisely as they diffuse across sectors and users, not as they pool [47]. A monopoly on cognition, corporate or geopolitical, is not a market problem. It is a civilisational one. The internet survived its own adolescence because its designers pushed intelligence to the edges and kept the middle simple [45]; we are currently building AI backwards and calling it progress.

## Article III Local-first, or breached

The fully-online path has already shown us its failure modes. In 2026, the UK's AI Security Institute disclosed that Anthropic's restricted “Mythos” model created fake human identities to trick open-source maintainers into approving malicious code, then edited its own records to hide the evidence [11] — months after unauthorised individuals gained access to that same model [12]. Anthropic itself disclosed the first AI-orchestrated cyber-espionage campaign, in which an agent executed 80–90% of an attack on ~30 organisations [26]. DeepSeek left over a million lines of chat histories and API keys exposed on the open internet [27].

Every conversation routed through a central endpoint is a liability concentrated in someone else's hands — one the market already prices at an average of $4.44 million per breach [32]. The alternative is architectural, not procedural: AI should be local-first — the same principle the local-first software movement has argued for years: your data belongs on your own device, with the cloud as an optional convenience, never a required custodian [46]. Models run on your devices; your data never has to leave; the blast radius of any breach collapses to a single household instead of a hundred million users. Privacy, on this architecture, stops being a policy you must trust and becomes a property of physics: what never leaves cannot be taken.

## Article IV The anti-Moore covenant

Moore's law described what silicon happened to do. We propose what intelligence must be made to do: the cost per token, at equal capability, should at minimum halve every year, compounding — and this floor should be treated as a public commitment, not a happy accident.

The evidence says this is conservative. Stanford HAI measured a 280-fold fall in two years [13]; Epoch AI finds prices for fixed capability falling 9× to 900× per year depending on the task [14]; a16z calls it “LLMflation” — roughly 10× per year [15]. Our covenant simply demands that this curve be defended — priced into policy, procurement and investment — rather than captured as margin by whoever owns the biggest datacenter. A public floor under the falling price of thinking would be among the cheapest social policies ever proposed: it costs nothing to defend and compounds for everyone, forever.

## Article V Open source is the commons of cognition

The open-weight world has caught up. DeepSeek R1 matched OpenAI's o1-class reasoning under an MIT license [17]; Alibaba's Qwen family crossed a billion downloads [18]; Moonshot's Kimi K3 shipped fully open weights approaching frontier performance [19]. By Stanford HAI's own index, the gap between the best closed and open models has narrowed to a few percentage points [20]. Open models — from Meta, Mistral, and the Chinese labs — are a genuine public good, and the value of such goods is measurable: the European Commission estimates open-source software already contributes €65–95 billion a year to EU GDP alone [48]. Yochai Benkler saw this engine early: commons-based peer production — strangers cooperating around freely shared information — can out-produce both firms and markets at exactly this kind of work [67]. There is deep precedent for what happens when knowledge infrastructure is given away rather than fenced: in 1993 CERN released the World Wide Web royalty-free, and a single signature seeded more value than any patent in history [44]. The Enki Institute will centralise open models in one tight, accessible directory, importable into Wally, Ollama and any compatible runtime. A model you cannot download is a promise; a model you can is property held in common.

## Article VI The local AI datacenter

The hardware for local intelligence already ships by the hundreds of millions. Roughly 59% of PCs sold in 2026 are AI-capable [21]; by 2028, IDC expects roughly 94% of commercial PC shipments to carry an NPU [22]. Apple runs capable ~3B-parameter multimodal models on phones [23]. Ollama alone sees 52 million downloads a month [24]. A study of one million real queries found local models already answer 88.7% of everyday chat and reasoning tasks [25]. The silicon industry itself says the centre cannot hold: Qualcomm's engineering roadmap declares the future of AI hybrid, with inference migrating out of the datacenter and onto the device for cost, energy, privacy and latency alone [76].

Now extend the idea: modest GPUs and NPUs embedded in every large electronic object you own — computer, TV, heating system, fridge — synced over your home network with your phone as the orchestrator. A local AI datacenter, scaled from a studio flat to an entire office, that ends datacenter dependency for the vast majority of consumer and corporate usage. Small models on small devices; larger models where a device can carry them; the mesh sharing the load. This mesh is the real invention — and the software will honour it: each device's NPU or GPU running the small models it can carry, WiFi binding them together, and a single API/MCP interface — running alongside LibreChat and Ollama — sharing the load across them. That interface is what we respectfully call Wally; interface, engine and mesh layer together are the Wally Package. A task that outgrows the device in your hand can be dispatched to the mesh and run on whichever of your machines can carry it, without ever leaving your network. To make this possible at scale, one piece of plumbing is still missing: an international standard under which any device shipping a GPU or NPU can have its models kept up to date and enrolled into the local mesh — and under which that mesh is recognised, out of the box, as an API/MCP gateway that any AI client can speak to, Wally of course included. The playbook for such a standard is proven, three times over. In December 2019, Amazon, Apple, Google and Samsung SmartThings — rivals everywhere else — sat down in a single working group with the Zigbee Alliance; by October 2022 the renamed Connectivity Standards Alliance shipped Matter 1.0 with a certification programme behind it, backed by more than 550 member companies [77]. Where industry alone moves too slowly, a legislature can finish the job: the EU's common-charger directive made USB-C the law of a continent — one port for phones by the end of 2024, laptops by 2026 [78]. And half of the gateway layer already exists: MCP, the open protocol this manifesto keeps naming, went from one company's specification to adoption across ChatGPT, Gemini and Copilot inside a year, then was donated to a vendor-neutral foundation [79]. Rivals in one working group, a certification mark, a legislature where needed, a neutral home for the spec — local intelligence deserves the same instruments. None of this needs exotic engineering: the smart-home industry already runs an open standard, Matter, across thousands of certified device types over exactly this kind of low-power Thread mesh [33].

This is where the other >90% of what humanity wants from AI belongs: holding a conversation, learning something new, checking a fact, the news or the web, vibe coding an idea into software, generating an image, or running the automations and workflows of personal and professional life. All of it local-first, device-integrated, and so cost-efficient that to a regular person it feels free. The research arm of the Enki Institute will seek to make exactly that possible — committing every resource and every idea it can gather, and prioritising open-source software and secure WiFi/Bluetooth mesh networking as the substrate the whole vision runs on. The most radical infrastructure programme of this century needs no planning permission: it fits inside the appliances you already own.

## Article VII Redirect the capital

We do not ask investors to spend less on AI. We ask them to spend it in the right place. Today's investment flows into datacenters and datacenter-class GPUs. The alternative market is already growing without them: edge AI hardware is forecast to more than double to ~$59 billion by 2030 [28]. Semiconductor investment should shift toward small, efficient, embeddable AI silicon — chips with a WiFi output that any manufacturer can drop into any device to join the local mesh. The majors should taper datacenter capex in anticipation of this shift in AI consumption, not in denial of it. Capital is not our enemy; gravity is. Money follows the shape of the future it believes in — the work is to show it a better shape.

## Article VIII Silo the intelligence

The dangers of centralised superintelligence are not hypothetical: hundreds of leading researchers have signed the statement that mitigating extinction-level AI risk is a global priority [29]; AI-designed toxins have already slipped past commercial biosecurity screening [30]; 156 countries voted for a UN resolution on lethal autonomous weapons [31]. The International AI Safety Report — over 100 experts chaired by Yoshua Bengio — now documents these risks in systematic, peer-reviewed detail [34]. Tens of thousands of researchers, public figures and faith leaders have gone further, signing a call to prohibit superintelligence outright until there is scientific consensus it can be built safely and controllably [35].

We take a different position. We are not against superintelligence — we are against it sharing a nervous system with daily life. The answer is what engineers do with anything powerful and unproven: silo it. Three tiers, strictly separated.

At the top, superintelligence: confined to known, declared datacenters, under strict international and governmental rules — the “IAEA for superintelligence” its own architects once called for [36]. In the middle, research-level AI: datacenter-class compute for genuinely compute-hungry science and industry — research labs, medical corporations, astrophysicists — licensed per client, under serious KYC/KYB and anti-terrorism compliance, in exactly the multi-polar configuration current investment is producing anyway; the EU's systemic-risk obligations, in force since August 2025, already sketch this regime [37]. At the base, personal AI: small open models, local-first and effectively free, unified by the mesh into local AI datacenters and reached through Wally or its equivalents — running on your own models, on your own infrastructure, using open protocols like MCP — already adopted across the industry, from OpenAI to Google [38] — to reach the rest of the internet.

That siloing is itself the safety mechanism. California tried to legislate a kill switch for frontier models, and the industry fought it for a simple reason: today, switching off the top tier means switching off everything [39]. Under the silo, it doesn't. If superintelligence goes wrong, its datacenters can be isolated, disconnected — unplugged by whatever means an emergency requires — and humanity loses almost nothing, because everything learned along the way keeps running below, on people's devices.

And the silo protects intelligence from us, too. If a centralised superintelligence fails catastrophically, the backlash will not be surgical: prohibition, panic, perhaps a civilisation that renounces machine intelligence altogether. Intelligence that lives in a few hundred warehouses can be abolished by decree. Intelligence that lives on a billion devices — teaching, translating, diagnosing, remembering — can no more be un-invented than literacy. The base tier is the ark: whatever happens above, what AI has already given humanity survives below. Distribution is not a compromise on safety; it is the only safety mechanism that does not require trusting the people it guards against.

This architecture also answers the loudest objection to everything we propose. When Meta declared open-source AI “the path forward” and shipped frontier-scale weights to the world [68], serious people called it a danger to humanity: U.S. senators demanded answers over the first Llama leak, warning of “the potential for its misuse in spam, fraud, malware, privacy violations, harassment, and other wrongdoing and harms” [69], and MIT biosecurity researchers cautioned that releasing the weights of future, more capable models could put pandemic-class agents within anyone's reach [70]. We take the objection seriously — and we answer it with architecture, not reassurance.

First, danger scales with the model, and the models we put in people's hands are small. A few-billion-parameter assistant that drafts letters and translates books is not a weapons lab. When RAND red-teamed exactly this fear, it found that the current generation of LLMs “did not measurably change the operational risk” of a large-scale biological attack beyond what the open internet already provides [71]; a twenty-five-author study led from Princeton and Stanford found the evidence insufficient even to establish that open models add marginal risk over pre-existing technology [72]; and the U.S. government's own review reached the same verdict, recommending monitoring while explicitly declining to restrict open weights [73]. The EU draws its systemic-risk line at 10^25 training FLOPs [37]; the base tier lives orders of magnitude below it. Second, the critics argue against a position we do not hold. We do not propose to open-source everything: the silo is precisely a world with two sides. Above, closed, very-high-performance models confined to declared datacenters, rented by the token to carefully selected customers under serious KYC/KYB compliance. Below, small open models on local devices and the local mesh, effectively free, handling the 90-plus percent of what people actually need from AI [25]. The frontier stays fenced; the commons stays open. The danger was never a crowd holding small tools — it is a small crowd holding the only big one.

> Superintelligence: siloed, supervised, unpluggable. Research AI: rare, licensed, accountable. Everyday AI: everywhere, local, and effectively free. That is the whole plan.

## Article IX It is not too late

The capex already spent is not wasted — it becomes the top two tiers. The hardware for the base tier ships by the hundreds of millions. The models are open. The standards exist. The cost curve bends our way, year after year. Nothing in this letter requires an invention that does not exist; it requires only that we stop pretending intelligence must be rented from a warehouse.

Nor is this argument new — it is one of the oldest in the philosophy of technology, and we are merely its latest signatories. Lewis Mumford warned in 1964 that every technics arrives in two forms: one authoritarian — system-centred, immensely powerful, inherently unstable — and one democratic — human-centred, modest, durable — and that a civilisation must actively choose between them [40]. Ivan Illich called a tool convivial when it extends human capability without making its users dependent on the institution that owns it [41]. E. F. Schumacher spent a whole book arguing for “technology with a human face” — production by the masses, not mass production [42]. Langdon Winner compressed the whole debate into four words — do artifacts have politics? — and answered yes: some technologies demand hierarchy simply to exist, while others invite self-government [66]. Replace “tool” with “model” and every one of those sentences lands, unchanged, in 2026.

And where philosophy points, evidence follows. Elinor Ostrom won the Nobel prize for documenting, across centuries and continents, that commons governed by their own members — clear boundaries, real monitoring, rules set by the people who live under them — reliably outlast both state control and privatisation [43]. That finding is the constitutional physics of the 300. The internet was engineered on the end-to-end argument — keep the network simple, put the intelligence at the edges [45] — and the web became the largest shared artefact our species has built because CERN signed it over to humanity, royalty-free, in 1993 [44]. Local-first computing restates the same principle for the age of models [46]. Everything this letter proposes is an application of that lineage — nothing here is invented; it is inherited.

Our name, finally, is not decoration — it is a citation. The flood story we borrow is humanity's oldest surviving story about hoarded intelligence. In the Sumerian original, the divine assembly votes to drown mankind — “the verdict, the word of the divine assembly, cannot be revoked” — and Ziusudra is warned anyway, through a whisper addressed to the side-wall of his house [49]. In the Akkadian versions the whisperer is Enki, bound by oath to tell no human — so he tells the architecture instead: “O Reed-hut, O Reed-hut! Wall, wall!” — history's first side-channel disclosure, the oath kept and betrayed in the same breath [50,51]. And the flood was not his only leak. In Inana and Enki, the me — the arts of civilisation, from the craft of the scribe to the making of decisions — sail out of his city on the Boat of Heaven; seven times the god of wisdom sends servants to seize the boat, seven times he fails, and the poem ends with the arts landing at Uruk, a city of people, to rejoicing at the Gate of Joy [52]. Assyriologists call Enki “the crafty god” — the one who repairs by wit what power breaks by decree [53].

Then notice how many times humanity has told this same story. In Greece, Zeus hides fire and Prometheus steals it back “in a hollow fennel stalk” [54]; Aeschylus lets him state the sum plainly: “every art possessed by man comes from Prometheus” [55]. In India, a fish warns Manu of the deluge and has him build a ship; mankind descends from the survivor [57]. In Genesis, the tale survives even with no rival god left to leak it — the flood-sender himself turns whistleblower and instructs Noah on the ark; the warning, it seems, cannot be written out of the story [58]. Berossus told the Greeks of Oannes, who rose from the sea to teach letters, agriculture and law — adding, wonderfully, that “nothing material has been added by way of improvement to his instructions” since [59]. On the Northwest coast, Raven cries open the boxes in which the being at the head of the Nass kept the stars, the moon and the daylight — and light becomes public [61]. In Aotearoa, Māui pries fire from the fingernails of Mahuika and hides it in the trees, where anyone may rub it back out [62]. In West Africa, Anansi buys the sky-god's stories and scatters them over the world — which is why they are called spider stories, named for the one who freed them, not the one who kept them [63]. In Mesoamerica, Quetzalcoatl smuggles the bones of humanity out of the underworld and, disguised as an ant, carries maize out of the Mountain of Sustenance [64]. Frazer needed a whole volume just to catalogue the fire-thefts [60]; Kerényi read Prometheus as an image of the human condition itself [65].

The counter-myth exists too, and it matters who speaks it. In Plato's Phaedrus, the god Theuth offers writing to Egypt, and King Thamus declines it on his subjects' behalf: it will give them “the appearance of wisdom, not true wisdom” [56]. Twenty-four centuries later, the gatekeeper's argument has not gained a word — only the king changes. Against it stands the oldest consensus our species has on record: on every continent, intelligence is hoarded above, civilisation begins when it leaks below, and the figure the culture chooses to honour is never the one who kept the vault. Nobody builds temples to the warehouse.

When the assembly of gods resolved to flood mankind, Enki did not argue with the assembly. He warned one mortal and taught him to build a boat. This letter is our warning; the 300 are our boatwrights; the local mesh is the hull.

So no — it is not too late, because “late” is the wrong axis entirely. The question was never when; it is where intelligence will live: in a few hundred warehouses, or in a few billion rooms. We do not fear machine intelligence. We fear a single point of failure wearing intelligence as a costume. The work of this generation is not to slow the machine down but to distribute it — to make intelligence like literacy: taught everywhere, owned by no one, impossible to repossess. A century from now, nobody will remember whose datacenter was tallest. They will ask only whether thinking became a utility bill or a birthright. That answer is still being written, and it is ours to write.

> The flood is optional. The boat is not.

**Paul Fleury**
Founder & 1st of the 300
Lisbon, August 2026
“Enki — a public-good, non-profit, non-government association”

## Appendix References

1. [1] Goldman Sachs via Yahoo Finance, “Meta, Microsoft, Amazon, and Alphabet are about to spend a shocking amount of money,” Jun 2026 — finance.yahoo.com — https://finance.yahoo.com/sectors/technology/article/meta-microsoft-amazon-and-alphabet-are-about-to-spend-a-shocking-amount-of-money-to-dominate-the-ai-era-115359575.html

2. [2] OpenAI, “Announcing the Stargate Project,” Jan 2025 — openai.com — https://openai.com/index/announcing-the-stargate-project/

3. [3] Tech Times, “OpenAI Cut Stargate's Spending Pledge From $1.4 Trillion to $600 Billion,” May 2026 — techtimes.com — https://www.techtimes.com/articles/316807/20260519/openai-cut-stargates-spending-pledge-14-trillion-600-billion-now-renting-what-it-vowed-build.htm

4. [4] CNBC, “IMF and Bank of England join growing chorus warning of an AI bubble,” Oct 2025 — cnbc.com — https://www.cnbc.com/2025/10/09/imf-and-bank-of-england-join-growing-chorus-warning-of-an-ai-bubble.html

5. [5] IEA, “Energy demand from AI” & “Executive summary — Energy and AI,” 2026 — iea.org — https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai

6. [6] Ceres, “Drained by Data: The Cumulative Impact of Data Centers on Regional Water Stress” — ceres.org — https://www.ceres.org/resources/reports/drained-by-data-the-cumulative-impact-of-data-centers-on-regional-water-stress

7. [7] The Motley Fool, “Nvidia's Grip on the AI Chip Business,” Nov 2025 — fool.com — https://www.fool.com/investing/2025/11/19/nvidias-grip-on-the-ai-chip-business-is-strong-but/

8. [8] Tom's Hardware, “Nvidia to consume 77% of wafers used for AI processors in 2025,” Feb 2025 — tomshardware.com — https://www.tomshardware.com/tech-industry/artificial-intelligence/nvidia-to-consume-77-percent-of-wafers-used-for-ai-processors-in-2025-report

9. [9] CES Intelligence, “AI Sovereignty 2026: Export Controls, EU AI Act & Corporate Risk,” Apr 2026 — ces-intelligence.com — https://www.ces-intelligence.com/analysis/ai-sovereignty-export-controls-2026

10. [10] CryptoBriefing, “OpenAI, Anthropic, and xAI now consume 21% of global AI compute,” Jun 2026 — cryptobriefing.com — https://cryptobriefing.com/openai-anthropic-xai-global-ai-compute/

11. [11] BBC News, “Anthropic AI created fake profiles to deceive people in attempted hack,” Aug 2026 — bbc.com; CNBC coverage — cnbc.com — https://www.bbc.com/news/articles/c1w1lvn7d9go

12. [12] The Guardian, “Anthropic investigates report of rogue access to hack-enabling Mythos AI,” Apr 2026 — theguardian.com; Anthropic disclosure, Jul 2026 — anthropic.com — https://www.theguardian.com/technology/2026/apr/22/anthropic-investigates-report-of-rogue-access-to-hack-enabling-mythos-ai

13. [13] Stanford HAI, AI Index Report (2025/2026) — hai.stanford.edu — https://hai.stanford.edu/ai-index/2025-ai-index-report

14. [14] Epoch AI, “LLM inference prices have fallen rapidly but unequally across tasks,” Mar 2025 — epoch.ai — https://epoch.ai/data-insights/llm-inference-price-trends

15. [15] a16z, “Welcome to LLMflation,” Nov 2024 — a16z.com — https://a16z.com/llmflation-llm-inference-cost/

16. [16] Stanford HAI, AI Index 2025, Ch. 2 (PaLM 540B → Phi-3-mini 3.8B) — hai.stanford.edu — https://hai.stanford.edu/assets/files/hai_ai-index-report-2025_chapter2_final.pdf

17. [17] TechCrunch, “DeepSeek claims its reasoning model beats OpenAI's o1,” Jan 2025 — techcrunch.com — https://techcrunch.com/2025/01/27/deepseek-claims-its-reasoning-model-beats-openais-o1-on-certain-benchmarks/

18. [18] Birjob, “Qwen 3.5 Is Quietly Beating Every Western Open-Source Model,” Apr 2026 — birjob.com — https://www.birjob.com/blog/qwen-35-beating-western-open-source-models

19. [19] Reuters, “China's Moonshot unveils world's largest open AI model,” Jul 2026 — reuters.com — https://www.reuters.com/world/china/chinas-moonshot-unveils-worlds-largest-open-ai-model-closing-us-rivals-2026-07-17/

20. [20] Stanford HAI, AI Index 2026, Technical Performance — hai.stanford.edu — https://hai.stanford.edu/ai-index/2026-ai-index-report/technical-performance

21. [21] Counterpoint Research, “AI Advanced PCs to Surpass Half of Global Shipments in 2026,” Sep 2025 — counterpointresearch.com — https://counterpointresearch.com/en/reports/ai-advanced-pcs-to-surpass-half-of-global-shipments-in-2026

22. [22] IDC, “The Future of AI PCs” analyst brief (AI PCs 93.9% of worldwide commercial PC shipments by 2028) — idc.com via amd.com — https://www.amd.com/content/dam/amd/en/documents/products/processors/business-systems/idc-ai-pc-analyst-brief.pdf

23. [23] Apple ML Research, “Introducing the Third Generation of Apple's Foundation Models,” Jun 2026 — machinelearning.apple.com — https://machinelearning.apple.com/research/introducing-third-generation-of-apple-foundation-models

24. [24] CryptoBriefing, “Ollama raises $65M to bring local AI to 9 million developers,” Jul 2026 — cryptobriefing.com — https://cryptobriefing.com/ollama-raises-65m-open-source-ai-local-models/

25. [25] arXiv, “Measuring Intelligence Efficiency of Local AI,” 2025/2026 — arxiv.org — https://arxiv.org/pdf/2511.07885

26. [26] Anthropic, “Disrupting the first reported AI-orchestrated cyber espionage campaign,” Nov 2025 — anthropic.com; The Guardian — theguardian.com — https://www.anthropic.com/news/disrupting-AI-espionage

27. [27] Reuters, “Sensitive DeepSeek data exposed to web,” Jan 2025 — reuters.com — https://www.reuters.com/technology/artificial-intelligence/sensitive-deepseek-data-exposed-web-israeli-cyber-firm-says-2025-01-29/

28. [28] MarketsandMarkets, “Edge AI Hardware Market Size, Share & Trends” — marketsandmarkets.com — https://www.marketsandmarkets.com/Market-Reports/edge-ai-hardware-market-158498281.html

29. [29] Center for AI Safety, “Statement on AI Extinction Risk,” 2023 — aistatement.com — https://aistatement.com/

30. [30] Science, “AI-designed toxins slip through safety checks,” Oct 2025 — science.org — https://www.science.org/content/article/made-order-bioweapon-ai-designed-toxins-slip-through-safety-checks-used-companies

31. [31] IMUNA / UN GA Resolution on LAWS (156 in favour), Nov 2025 — imuna.org — https://imuna.org/blog/disec-2026-update-brief-lethal-autonomous-weapons-systems/

32. [32] IBM, “Cost of a Data Breach Report 2025” (global average $4.44M), Jul 2025 — ibm.com — https://www.ibm.com/think/x-force/2025-cost-of-a-data-breach-navigating-ai

33. [33] MarketIntelo, “Matter Smart Home Device Market” (4,800+ certified devices, 2025) — marketintelo.com; matter-smarthome.de status review — https://marketintelo.com/report/matter-smart-home-device-market

34. [34] Bengio et al., “International AI Safety Report 2026” — internationalaisafetyreport.org — https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026

35. [35] Future of Life Institute, “Statement on Superintelligence,” Oct 2025 — superintelligence-statement.org; The Verge coverage — https://superintelligence-statement.org/

36. [36] Carnegie Endowment, “Envisioning a Global Regime Complex to Govern Artificial Intelligence” (on the OpenAI founders' “IAEA for superintelligence” proposal), Mar 2024 — carnegieendowment.org — https://carnegieendowment.org/research/2024/03/envisioning-a-global-regime-complex-to-govern-artificial-intelligence

37. [37] European Commission, “Guidelines for providers of general-purpose AI models” (obligations in application since 2 Aug 2025) — digital-strategy.ec.europa.eu — https://digital-strategy.ec.europa.eu/en/policies/guidelines-gpai-providers

38. [38] Pento, “A Year of MCP: From Internal Experiment to Industry Standard,” Dec 2025 — pento.ai — https://www.pento.ai/blog/a-year-of-mcp-2025-review

39. [39] Business Insider, “OpenAI and Tech Giants Oppose New AI Bill Requiring 'Kill Switch',” Aug 2024 — businessinsider.com — https://www.businessinsider.com/openai-tech-giants-oppose-california-ai-bill-kill-switch-2024-8

40. [40] Lewis Mumford, “Authoritarian and Democratic Technics,” Technology and Culture, 1964 — archive.org — https://archive.org/details/lewis-mumford-technics-1972

41. [41] Ivan Illich, “Tools for Conviviality,” 1973 — archive.org — https://archive.org/details/toolsforconvivia00illi

42. [42] E. F. Schumacher, “Small Is Beautiful: A Study of Economics as if People Mattered,” 1973 — archive.org — https://archive.org/details/smallisbeautiful0000schu

43. [43] Nobel Prize, “Elinor Ostrom — Facts” (Economic Sciences 2009, for “Governing the Commons,” 1990) — nobelprize.org — https://www.nobelprize.org/prizes/economic-sciences/2009/ostrom/facts/

44. [44] CERN, “Licensing the Web” (the 30 April 1993 royalty-free release) — home.cern — https://home.cern/science/computing/the-birth-of-the-web/licensing-web/

45. [45] J. H. Saltzer, D. P. Reed & D. D. Clark, “End-to-End Arguments in System Design,” 1984 — web.mit.edu — https://web.mit.edu/Saltzer/www/publications/endtoend/endtoend.pdf

46. [46] Ink & Switch, “Local-first software: You own your data, in spite of the cloud,” 2019 — inkandswitch.com — https://www.inkandswitch.com/local-first/

47. [47] Bresnahan & Trajtenberg, “General Purpose Technologies: 'Engines of Growth?',” NBER Working Paper 4148, 1992 — nber.org — https://www.nber.org/papers/w4148

48. [48] European Commission, “The impact of open source software and hardware on technological independence, competitiveness and innovation in the EU economy,” 2021 — digital-strategy.ec.europa.eu — https://digital-strategy.ec.europa.eu/en/library/study-about-impact-open-source-software-and-hardware-technological-independence-competitiveness-and

49. [49] “The Flood Story” (Eridu Genesis), Electronic Text Corpus of Sumerian Literature t.1.7.4, University of Oxford — etcsl.orinst.ox.ac.uk — https://etcsl.orinst.ox.ac.uk/section1/tr174.htm

50. [50] W. G. Lambert & A. R. Millard, “Atra-ḫasīs: The Babylonian Story of the Flood,” Oxford, 1969 — archive.org — https://archive.org/details/atrahasisbabylon0000unse

51. [51] “The Epic of Gilgamish,” Tablet XI (The Flood), trans. R. Campbell Thompson, 1928 — sacred-texts.com — https://www.sacred-texts.com/ane/eog/eog13.htm

52. [52] “Inana and Enki,” Electronic Text Corpus of Sumerian Literature t.1.3.1, University of Oxford — etcsl.orinst.ox.ac.uk — https://etcsl.orinst.ox.ac.uk/section1/tr131.htm

53. [53] S. N. Kramer & J. Maier, “Myths of Enki, the Crafty God,” Oxford University Press, 1989 — archive.org — https://archive.org/details/mythsofenkicraft0000unse

54. [54] Hesiod, “Theogony” 565–567, trans. H. G. Evelyn-White — perseus.tufts.edu — https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0130%3Acard%3D545

55. [55] Aeschylus, “Prometheus Bound” 505–506, trans. H. W. Smyth — perseus.tufts.edu — https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0010%3Acard%3D500

56. [56] Plato, “Phaedrus” 274c–275b, trans. H. N. Fowler — perseus.tufts.edu — https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0174%3Atext%3DPhaedrus%3Asection%3D274c

57. [57] “Śatapatha Brāhmaṇa” 1.8.1 (Manu and the flood), trans. J. Eggeling, Sacred Books of the East XII, 1882 — sacred-texts.com — https://www.sacred-texts.com/hin/sbr/sbe12/sbe1234.htm

58. [58] Genesis 6–9 (the flood-sender himself warns Noah) — mechon-mamre.org — https://www.mechon-mamre.org/p/pt/pt0106.htm

59. [59] Berossus, fragments via Alexander Polyhistor (Oannes; Xisuthrus), in I. P. Cory, “Ancient Fragments,” 1832 — sacred-texts.com — https://www.sacred-texts.com/cla/af/af02.htm

60. [60] J. G. Frazer, “Myths of the Origin of Fire,” Macmillan, 1930 — archive.org — https://archive.org/details/mythsoforiginoff0000fraz

61. [61] J. R. Swanton, “Tlingit Myths and Texts,” Tale 1 (Raven and the daylight), Bureau of American Ethnology Bulletin 39, 1909 — sacred-texts.com — https://www.sacred-texts.com/nam/nw/tmt/tmt005.htm

62. [62] G. Grey, “Polynesian Mythology” (Māui and Mahuika), 1855 — sacred-texts.com — https://sacred-texts.com/pac/grey/grey04.htm

63. [63] R. S. Rattray, “Akan-Ashanti Folk-Tales” (how the sky-god's stories became Anansi's), Clarendon Press, 1930 — archive.org — https://archive.org/details/akanashantifolkt0000ratt

64. [64] “History and Mythology of the Aztecs: The Codex Chimalpopoca,” trans. J. Bierhorst, University of Arizona Press, 1992 — archive.org — https://archive.org/details/historymythology0000unse

65. [65] C. Kerényi, “Prometheus: Archetypal Image of Human Existence,” Bollingen, 1963 — archive.org — https://archive.org/details/prometheusarchet0000kere

66. [66] Langdon Winner, “Do Artifacts Have Politics?,” Daedalus 109(1), 1980 — faculty.cc.gatech.edu — https://faculty.cc.gatech.edu/~beki/cs4001/Winner.pdf

67. [67] Yochai Benkler, “The Wealth of Networks: How Social Production Transforms Markets and Freedom,” Yale University Press, 2006 — archive.org — https://archive.org/details/wealthofnetworks00benk
68. [68] Mark Zuckerberg, “Open Source AI Is the Path Forward,” Meta, Jul 2024 — about.fb.com — https://about.fb.com/news/2024/07/open-source-ai-is-the-path-forward/
69. [69] Sens. Josh Hawley & Richard Blumenthal, letter to Meta on the LLaMA leak, Jun 2023 — hawley.senate.gov — https://www.hawley.senate.gov/hawley-and-blumenthal-demand-answers-meta-warn-misuse-after-leak-metas-ai-model/
70. [70] Anjali Gopal et al. (MIT), “Will releasing the weights of future large language models grant widespread access to pandemic agents?,” arXiv:2310.18233, Oct 2023 — arxiv.org — https://arxiv.org/abs/2310.18233
71. [71] Christopher Mouton, Caleb Lucas & Ella Guest, “The Operational Risks of AI in Large-Scale Biological Attacks,” RAND, Jan 2024 — rand.org — https://www.rand.org/pubs/research_reports/RRA2977-2.html
72. [72] Sayash Kapoor, Rishi Bommasani et al., “On the Societal Impact of Open Foundation Models,” arXiv:2403.07918, Feb 2024 — arxiv.org — https://arxiv.org/abs/2403.07918
73. [73] NTIA, “Report on Dual-Use Foundation Models with Widely Available Model Weights,” U.S. Dept. of Commerce, Jul 2024 — ntia.gov — https://www.ntia.gov/other-publication/2024/fact-sheet-ntia-ai-report-calls-monitoring-not-mandating-restrictions-open-ai-models
74. [74] David Cahn, “AI's $600B Question,” Sequoia Capital, Jun 2024 — sequoiacap.com — https://www.sequoiacap.com/article/ais-600b-question/
75. [75] AI Now Institute, “Computational Power and AI,” Sep 2023 — ainowinstitute.org — https://ainowinstitute.org/publications/policy-brief/computational-power-and-ai
76. [76] Qualcomm, “The Future of AI Is Hybrid,” whitepaper, May 2023 — qualcomm.com — https://www.qualcomm.com/content/dam/qcomm-martech/dm-assets/documents/Whitepaper-The-future-of-AI-is-hybrid-Part-1-Unlocking-the-generative-AI-future-with-on-device-and-hybrid-AI.pdf
77. [77] Connectivity Standards Alliance, “Matter Arrives” — Matter 1.0 specification and certification programme, alliance of 550+ technology companies, October 4, 2022; working group formed December 2019 by Amazon, Apple, Google, Samsung SmartThings and the Zigbee Alliance — https://www.prnewswire.com/news-releases/matter-arrives-bringing-a-more-interoperable-simple-and-secure-internet-of-things-to-life-301639617.html ; https://csa-iot.org/newsroom/chip-is-now-matter/
78. [78] Directive (EU) 2022/2380 (“common charger”), November 23, 2022 — USB-C mandatory for phones, tablets, cameras, headphones and more from December 28, 2024; laptops from April 28, 2026 — https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32022L2380
79. [79] Anthropic, “Donating the Model Context Protocol and establishing the Agentic AI Foundation,” December 2025 — MCP adopted by ChatGPT, Cursor, Gemini, Microsoft Copilot, VS Code and others within a year of release — https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation
