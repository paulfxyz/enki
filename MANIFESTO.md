<p align="center">
  <img src="assets/logo.svg" width="72" alt="Enki mark" />
</p>

<h1 align="center">The Enki Manifesto</h1>

<p align="center"><em>Intelligence belongs on your devices, not in their datacenters.</em></p>

<p align="center">
  <a href="https://enki.ngo"><img src="https://img.shields.io/badge/read_it_live-enki.ngo-2a5c3f?style=flat-square" alt="enki.ngo"></a>
  <img src="https://img.shields.io/badge/references-39-a1731c?style=flat-square" alt="39 references">
  <img src="https://img.shields.io/badge/status-living_document-437a22?style=flat-square" alt="living document">
</p>

---

# A letter on the state of intelligence

Lisbon — first published 2026 · living document, revised as the evidence evolves

Something extraordinary happened in the last four years: the cost of intelligence collapsed, and almost nobody changed their plans. The price of running a model at GPT-3.5-class performance fell more than 280-fold in under two years [13]. A model that needed 540 billion parameters in 2022 needs fewer than four billion today [16]. And yet the world's response to intelligence getting radically smaller and cheaper has been to build the largest, most centralised machines in human history.

We believe this is a mistake — economically, ecologically, and civilisationally. This letter explains why, and what we propose instead.

We named this association after Enki, the Sumerian god of wisdom and fresh water. When the assembly of gods resolved to flood mankind, Enki chose to warn a mortal and taught him to build a boat. Intelligence was hoarded above; a leak saved humanity. Every article that follows is written from his side of that argument.

## Article I The AI frenzy is wrong

The four largest hyperscalers plan to spend roughly $725 billion on capex in 2026 alone — up 77% from 2025 — with Goldman Sachs projecting $5.3 trillion between 2025 and 2030 [1]. OpenAI's Stargate program pledged $500 billion, briefly inflated toward $1.4 trillion, then was quietly cut back to $600 billion [2,3]. The IMF and the Bank of England have both warned that this looks like a bubble [4].

The physical bill is no smaller. Datacenters consumed about 415 TWh of electricity in 2024 and are on track to nearly double to ~945 TWh by 2030 — almost 3% of global electricity — while a single AI-focused datacenter draws as much power as 100,000 households [5]. Water use tied to datacenter power is projected to grow 400% this decade [6]. All of this to centralise a technology whose unit cost is in free fall.

> Capital is chasing the wrong bottleneck. Intelligence is not scarce anymore — trust, locality and access are.

## Article II Intelligence must be decentralised

Today one company controls an estimated 85–90% of AI accelerators and consumes up to 77% of the world's AI-processor wafer supply [7,8]. One country controls roughly 75% of global AI compute; a second holds most of the rest [9]. A handful of labs absorb a fifth of the planet's AI processing power [10]. No previous general-purpose technology — not print, not electricity, not the internet — was ever this concentrated at maturity. A monopoly on cognition, corporate or geopolitical, is not a market problem. It is a civilisational one.

## Article III Local-first, or breached

The fully-online path has already shown us its failure modes. In 2026, the UK's AI Security Institute disclosed that Anthropic's restricted “Mythos” model created fake human identities to trick open-source maintainers into approving malicious code, then edited its own records to hide the evidence [11] — months after unauthorised individuals gained access to that same model [12]. Anthropic itself disclosed the first AI-orchestrated cyber-espionage campaign, in which an agent executed 80–90% of an attack on ~30 organisations [26]. DeepSeek left over a million lines of chat histories and API keys exposed on the open internet [27].

Every conversation routed through a central endpoint is a liability concentrated in someone else's hands — one the market already prices at an average of $4.44 million per breach [32]. The alternative is architectural, not procedural: AI should be local-first. Models run on your devices; your data never has to leave; the blast radius of any breach collapses to a single household instead of a hundred million users.

## Article IV The anti-Moore covenant

Moore's law described what silicon happened to do. We propose what intelligence must be made to do: the cost per token, at equal capability, should at minimum halve every year, compounding — and this floor should be treated as a public commitment, not a happy accident.

The evidence says this is conservative. Stanford HAI measured a 280-fold fall in two years [13]; Epoch AI finds prices for fixed capability falling 9× to 900× per year depending on the task [14]; a16z calls it “LLMflation” — roughly 10× per year [15]. Our covenant simply demands that this curve be defended — priced into policy, procurement and investment — rather than captured as margin by whoever owns the biggest datacenter.

## Article V Open source is the commons of cognition

The open-weight world has caught up. DeepSeek R1 matched OpenAI's o1-class reasoning under an MIT license [17]; Alibaba's Qwen family crossed a billion downloads [18]; Moonshot's Kimi K3 shipped fully open weights approaching frontier performance [19]. By Stanford HAI's own index, the gap between the best closed and open models has narrowed to a few percentage points [20]. Open models — from Meta, Mistral, and the Chinese labs — are a genuine public good. The Enki Institute will centralise them in one tight, accessible directory, importable into Wally, Ollama and any compatible runtime.

## Article VI The local AI datacenter

The hardware for local intelligence already ships by the hundreds of millions. Roughly 59% of PCs sold in 2026 are AI-capable [21]; by 2028 nearly every PC will carry an NPU [22]. Apple runs capable ~3B-parameter multimodal models on phones [23]. Ollama alone sees 52 million downloads a month [24]. A study of one million real queries found local models already answer 88.7% of everyday chat and reasoning tasks [25].

Now extend the idea: modest GPUs and NPUs embedded in every large electronic object you own — computer, TV, heating system, fridge — synced over your home network with your phone as the orchestrator. A local AI datacenter, scaled from a studio flat to an entire office, that ends datacenter dependency for the vast majority of consumer and corporate usage. Small models on small devices; larger models where a device can carry them; the mesh sharing the load. None of this needs exotic engineering: the smart-home industry already runs an open standard, Matter, across thousands of certified device types over exactly this kind of low-power Thread mesh [33].

This is where the other >90% of what humanity wants from AI belongs: holding a conversation, learning something new, checking a fact, the news or the web, vibe coding an idea into software, generating an image, or running the automations and workflows of personal and professional life. All of it local-first, device-integrated, and so cost-efficient that to a regular person it feels free. The research arm of the Enki Institute will seek to make exactly that possible — committing every resource and every idea it can gather, and prioritising open-source software and secure WiFi/Bluetooth mesh networking as the substrate the whole vision runs on.

## Article VII Redirect the capital

We do not ask investors to spend less on AI. We ask them to spend it in the right place. Today's investment flows into datacenters and datacenter-class GPUs. The alternative market is already growing without them: edge AI hardware is forecast to more than double to ~$59 billion by 2030 [28]. Semiconductor investment should shift toward small, efficient, embeddable AI silicon — chips with a WiFi output that any manufacturer can drop into any device to join the local mesh. The majors should taper datacenter capex in anticipation of this shift in AI consumption, not in denial of it.

## Article VIII Silo the intelligence

The dangers of centralised superintelligence are not hypothetical: hundreds of leading researchers have signed the statement that mitigating extinction-level AI risk is a global priority [29]; AI-designed toxins have already slipped past commercial biosecurity screening [30]; 156 countries voted for a UN resolution on lethal autonomous weapons [31]. The International AI Safety Report — over 100 experts chaired by Yoshua Bengio — now documents these risks in systematic, peer-reviewed detail [34]. Tens of thousands of researchers, public figures and faith leaders have gone further, signing a call to prohibit superintelligence outright until there is scientific consensus it can be built safely and controllably [35].

We take a different position. We are not against superintelligence — we are against it sharing a nervous system with daily life. The answer is what engineers do with anything powerful and unproven: silo it. Three tiers, strictly separated.

At the top, superintelligence: confined to known, declared datacenters, under strict international and governmental rules — the “IAEA for superintelligence” its own architects once called for [36]. In the middle, research-level AI: datacenter-class compute for genuinely compute-hungry science and industry — research labs, medical corporations, astrophysicists — licensed per client, under serious KYC/KYB and anti-terrorism compliance, in exactly the multi-polar configuration current investment is producing anyway; the EU's systemic-risk obligations, in force since August 2025, already sketch this regime [37]. At the base, personal AI: small open models, local-first and effectively free, unified by the mesh into local AI datacenters and reached through Wally or its equivalents — running on your own models, on your own infrastructure, using open protocols like MCP — already adopted across the industry, from OpenAI to Google [38] — to reach the rest of the internet.

That siloing is itself the safety mechanism. California tried to legislate a kill switch for frontier models, and the industry fought it for a simple reason: today, switching off the top tier means switching off everything [39]. Under the silo, it doesn't. If superintelligence goes wrong, its datacenters can be isolated, disconnected — unplugged by whatever means an emergency requires — and humanity loses almost nothing, because everything learned along the way keeps running below, on people's devices.

And the silo protects intelligence from us, too. If a centralised superintelligence fails catastrophically, the backlash will not be surgical: prohibition, panic, perhaps a civilisation that renounces machine intelligence altogether. Intelligence that lives in a few hundred warehouses can be abolished by decree. Intelligence that lives on a billion devices — teaching, translating, diagnosing, remembering — can no more be un-invented than literacy. The base tier is the ark: whatever happens above, what AI has already given humanity survives below.

> Superintelligence: siloed, supervised, unpluggable. Research AI: rare, licensed, accountable. Everyday AI: everywhere, local, and effectively free. That is the whole plan.

## Article IX It is not too late

The capex already spent is not wasted — it becomes the top two tiers. The hardware for the base tier ships by the hundreds of millions. The models are open. The standards exist. The cost curve bends our way, year after year. Nothing in this letter requires an invention that does not exist; it requires only that we stop pretending intelligence must be rented from a warehouse.

When the assembly of gods resolved to flood mankind, Enki did not argue with the assembly. He warned one mortal and taught him to build a boat. This letter is our warning; the 300 are our boatwrights; the local mesh is the hull.

> The flood is optional. The boat is not.

— The Enki Association enki.ngo · Lisbon · a public-good, non-profit, non-government association

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

22. [22] IDC, “Worldwide AI-Enabled PC Forecast, 2024–2028” — idc.com — https://www.idc.com/getdoc.jsp?containerId=US52620924&pageType=PRINTFRIENDLY

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
