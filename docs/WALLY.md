<p align="center">
  <img src="../assets/mesh.jpg" alt="Cutaway of a house at night, its everyday devices joined into one glowing local mesh" width="70%" />
</p>

<h1 align="center">Wally & the local AI datacenter</h1>

<p align="center"><em>Our ambition — not yet available.</em></p>

---

**Wally doesn't exist yet.** It is what we are assembling the 300 to build. This page describes an ambition, stated plainly so it can be judged — and joined.

## The real invention is not the chat window

It lives in the local mesh — **your local AI datacenter** — where every device whose NPU or GPU can carry a small model connects over WiFi and shares the load behind a single API/MCP interface. That interface runs alongside a fully open-source fork of LibreChat and an engine sourced from Ollama. We respectfully call it **Wally**, and the whole bundle the **Wally Package**.

```
 Interface            Engine              Mesh layer           The bundle
 LibreChat fork   +   Ollama-sourced  +   API/MCP, ours    =   Wally Package
```

One app for web, desktop and mobile. A local model on your own hardware — or any remote API when you choose it. Your tools connected over MCP. **Nothing phones home unless you tell it to.**

## What the mesh changes

A modern home already contains more silicon than a datacenter rack of the recent past: a laptop, a desktop, a phone, a TV, a console — each shipping an NPU or GPU capable of carrying a small model. Alone, each is a toy. Joined over WiFi and orchestrated behind one endpoint, they are a datacenter you already paid for, running models that are effectively free — the cost being only the open-source model itself, whether self-hosted on your own hardware or rented by the token from a datacenter host.

The mesh routes each task to the cheapest device that can carry it: the heavy summary to the desktop GPU, the quick rewrite to the phone, the overnight batch to whatever is idle. Conversations, embeddings and memory stay on-device by default; sync happens on your network, on your terms.

## The path

We will aim to get there in the open, in stages:

1. **Fine-tune the interface.** A fully open-source LibreChat fork with an Ollama-sourced engine, tuned until local, everyday models are first-class citizens rather than a fallback.
2. **Build the mesh layer.** The API/MCP interface that lets every capable device in the household enrol, declare what it can carry, and share the load — the part we consider the real invention.
3. **Go native.** We aim to extend the fine-tuned LibreChat + Ollama setup into solutions running natively on desktop and mobile — hopefully with Microsoft, Google and Apple lending a hand in that effort.

For the mesh to ship in every device rather than live in a hobbyist's weekend, one international standard has to exist — we can already name its four clauses. ([The standard we need →](STANDARD.md))

## Why "Wally"

Every household name for intelligence so far has lived in someone else's building. Wally is meant to be the opposite: a name for the intelligence that lives in yours — unassuming, domestic, and entirely on your side of the wall.

---

<p align="center">
  <sub>Part of the <a href="../README.md">Enki repository</a> · <a href="../MANIFESTO.md">Manifesto, Article VI</a> · <a href="https://enki.ngo">enki.ngo</a></sub>
</p>
