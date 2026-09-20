<h1 align="center">The Model Registry</h1>

<p align="center"><em>Open weights, honest costs, validated by members.</em></p>

---

A public dataset with one purpose: **proof**. The manifesto argues that the cost of everyday intelligence has collapsed; the model registry is where we document it happening, model by model, in numbers anyone can check.

## The directory

**Twenty-five open models we actually trust** — every one of them runnable on limited hardware: a desktop GPU, a laptop, even a phone. We promote the models best adapted to self-hosting — and aim to help develop them — because intelligence you can hold is intelligence nobody can take away.

For each model the directory declares:

- what it's good at, and where it falls short,
- what it needs to run — memory, hardware class,
- honest costs: hosted-API reference rates per 1M tokens alongside the self-hosted path. Never "free" — **effectively free**: the cost is the open-source model itself, either rented by the token from a datacenter host or self-hosted on hardware you already own.

Model entries are **validated by members**, and re-validated as weights, licences and prices move. The same directory feeds the [Enki device](DEVICE.md): the models it carries are drawn from this list, sized to its compute and quantised for its memory — and the directory stays importable into Ollama and any compatible runtime.

## Why it lives in a repo

A directory hosted only on a website is a promise; one whose data ships in a public git history is a record. Corrections are commits, disagreements are issues, and the whole dataset ([`data.js`](../data.js)) can be forked by anyone who stops trusting us — which is exactly the property we want.

**Browse it live:** [enki.ngo](https://enki.ngo) — every model with its cloud-vs-self-hosted pricing duel.

---

<p align="center">
  <sub>Part of the <a href="../README.md">Enki repository</a> · <a href="../MANIFESTO.md">Manifesto, Articles V–VII</a> · <a href="https://enki.ngo">enki.ngo</a></sub>
</p>
