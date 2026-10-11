/* English editorial audit, 11 October 2026.
 * Publisher facts, not Enki benchmarks. Legacy translations are intentionally unchanged.
 * Sources are attached per model; hosted prices are a dated OpenRouter catalogue snapshot.
 */
if (['en', 'fr'].includes(window.ENKI_LANG || 'en')) window.ENKI_MODELS = [
  {
    "divider": "Large checkpoints",
    "note": "Over 70B listed parameters. Server-class candidates, not guaranteed fits."
  },
  {
    "id": "deepseek-v41-flash",
    "name": "DeepSeek V4.1 Flash",
    "maker": "DeepSeek",
    "license": "MIT",
    "priceIn": "$0.3",
    "priceOut": "$1.2",
    "selfHost": "No minimum memory verified; active parameters do not represent the stored weights.",
    "pros": [
      "552B backbone; 8B active in prefill, 16B in decode. Image and text input; up to 1M-token context."
    ],
    "cons": [
      "The repository also lists 763B parameters in metadata. Resolve checkpoint composition before sizing hardware."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash",
        "type": "web"
      }
    ],
    "total": 552,
    "priceSource": "https://openrouter.ai/deepseek/deepseek-v4.1-flash",
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "mistral-large-3",
    "name": "Mistral Large 3",
    "maker": "Mistral AI",
    "license": "Apache-2.0",
    "priceIn": "$0.5",
    "priceOut": "$1.5",
    "selfHost": "Publisher deployment: FP8 on 8×H200. Not a consumer-device recommendation.",
    "pros": [
      "675B total and 41B active, according to the model overview. Text and vision; 256K context."
    ],
    "cons": [
      "The published FP8 deployment uses an 8×H200 node; lower precision is a separate deployment configuration."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/mistralai/Mistral-Large-3-675B-Instruct-2512",
        "type": "web"
      }
    ],
    "total": 675,
    "priceSource": "https://openrouter.ai/mistralai/mistral-large-2512",
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "glm-53-flash",
    "name": "GLM-5.3-Flash",
    "maker": "Z.ai (Zhipu)",
    "license": "MIT",
    "priceIn": "$0.15",
    "priceOut": "$0.5",
    "selfHost": "Size the complete checkpoint, KV cache and runtime; Enki has not benchmarked it.",
    "pros": [
      "320B total and 18B active. Native image and text input."
    ],
    "cons": [
      "No minimum memory requirement verified. Benchmark rankings depend on the evaluation and date."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/zai-org/GLM-5.3-Flash",
        "type": "web"
      }
    ],
    "total": 320,
    "priceSource": "https://openrouter.ai/z-ai/glm-5.3-flash",
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "mimo-v26-flash",
    "name": "MiMo-V2.6-Flash-RL",
    "maker": "Xiaomi",
    "license": "Not verified",
    "priceIn": "Not verified",
    "priceOut": "Not verified",
    "selfHost": "No minimum memory verified for the linked RL checkpoint.",
    "pros": [
      "The MiMo-V2.6-Flash-RL card describes 309B total and 15B active parameters, with text, image, video and audio input."
    ],
    "cons": [
      "Licence terms were not established from the reviewed card. Its examples load custom code; review that code before use."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Flash-RL",
        "type": "web"
      }
    ],
    "total": 309,
    "priceSource": null,
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "minimax-m25",
    "name": "MiniMax M2.5",
    "maker": "MiniMax",
    "license": "Modified MIT",
    "priceIn": "$0.27",
    "priceOut": "$1.08",
    "selfHost": "No minimum memory verified; a model name is not a deployment specification.",
    "pros": [
      "The model card lists 229B parameters and text generation."
    ],
    "cons": [
      "Modified MIT is not identical to MIT. Review the licence file; example loading requires custom code."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/MiniMaxAI/MiniMax-M2.5",
        "type": "web"
      }
    ],
    "total": 229,
    "priceSource": "https://openrouter.ai/minimax/minimax-m2.5",
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "qwen38-flash-next",
    "name": "Qwen3.8-Flash-Next",
    "maker": "Alibaba Qwen",
    "license": "Qwen Community 1.0",
    "priceIn": "Not verified",
    "priceOut": "Not verified",
    "selfHost": "180B listed total, not a 6B memory footprint. Minimum hardware not verified.",
    "pros": [
      "The card lists 125B language parameters, 51B n-gram embeddings and 4B MTP parameters; 6B activated."
    ],
    "cons": [
      "262,144-token native context; extension to 1M needs configuration. Community terms require review."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/Qwen/Qwen3.8-Flash-Next",
        "type": "web"
      }
    ],
    "total": 180,
    "priceSource": null,
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "nemotron-3-super",
    "name": "Nemotron 3 Super 120B A12B",
    "maker": "NVIDIA",
    "license": "NVIDIA Nemotron Open Model",
    "priceIn": "$0.08",
    "priceOut": "$0.45",
    "selfHost": "Publisher minimum for FP8: 2×H100 80GB; one B200/B300 is also described.",
    "pros": [
      "120B total and 12B active in the overview. Text input and output; up to 1M context."
    ],
    "cons": [
      "The linked FP8 card specifies server hardware. NVIDIA's model licence and NIM container terms are separate."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Super-120B-A12B-FP8",
        "type": "web"
      }
    ],
    "total": 120,
    "priceSource": "https://openrouter.ai/nvidia/nemotron-3-super-120b-a12b",
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "gpt-oss-120b",
    "name": "gpt-oss-120b",
    "maker": "OpenAI",
    "license": "Apache-2.0",
    "priceIn": "$0.037",
    "priceOut": "$0.17",
    "selfHost": "Publisher target: one 80GB GPU with the supported MXFP4 implementation.",
    "pros": [
      "117B total and 5.1B active. The publisher describes single-80GB-GPU operation with MXFP4 MoE weights."
    ],
    "cons": [
      "Requires the Harmony format. Check context, concurrency and runtime before claiming a fit."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/openai/gpt-oss-120b",
        "type": "web"
      }
    ],
    "total": 117,
    "priceSource": "https://openrouter.ai/openai/gpt-oss-120b",
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "intern-s1",
    "name": "Intern-S1",
    "maker": "Shanghai AI Laboratory",
    "license": "Apache-2.0",
    "priceIn": "Not verified",
    "priceOut": "Not verified",
    "selfHost": "Server-scale deployment. Custom model code must be reviewed before execution.",
    "pros": [
      "241B total: a 235B language model and 6B vision encoder. Text, image and video input."
    ],
    "cons": [
      "The unquantized card lists 8×A100/H100 or 4×H200 deployment; FP8 has different requirements."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/internlm/Intern-S1",
        "type": "web"
      }
    ],
    "total": 241,
    "priceSource": null,
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "step-37-flash",
    "name": "Step 3.7 Flash",
    "maker": "StepFun",
    "license": "Apache-2.0",
    "priceIn": "$0.2",
    "priceOut": "$1.15",
    "selfHost": "Publisher llama.cpp guidance: 120GB minimum, 128GB recommended; runtime overhead still matters.",
    "pros": [
      "The overview describes 198B total and about 11B active. Text and image input; 256K context."
    ],
    "cons": [
      "The llama.cpp section specifies at least 120GB unified memory/VRAM and recommends 128GB."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/stepfun-ai/Step-3.7-Flash",
        "type": "web"
      }
    ],
    "total": 198,
    "priceSource": "https://openrouter.ai/stepfun/step-3.7-flash",
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "mistral-small-4",
    "name": "Mistral Small 4",
    "maker": "Mistral AI",
    "license": "Apache-2.0",
    "priceIn": "$0.15",
    "priceOut": "$0.6",
    "selfHost": "119B total weights must be accounted for; minimum memory not verified.",
    "pros": [
      "119B total and 6.5B active. Text and image input; 256K context."
    ],
    "cons": [
      "Despite its name, this is a large MoE checkpoint. A 24GB-device fit is not established by the reviewed card."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/mistralai/Mistral-Small-4-119B-2603",
        "type": "web"
      }
    ],
    "total": 119,
    "priceSource": "https://openrouter.ai/mistralai/mistral-small-2603",
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "qwen3-coder-next",
    "name": "Qwen3 Coder Next",
    "maker": "Alibaba Qwen",
    "license": "Apache-2.0",
    "priceIn": "$0.12",
    "priceOut": "$0.8",
    "selfHost": "Not a 3B-size checkpoint; no 32GB-device fit verified.",
    "pros": [
      "80B total and 3B active, with a native 262,144-token context."
    ],
    "cons": [
      "Supports non-thinking mode. Reducing context can help with out-of-memory errors but does not remove the weights."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/Qwen/Qwen3-Coder-Next",
        "type": "web"
      }
    ],
    "total": 80,
    "priceSource": "https://openrouter.ai/qwen/qwen3-coder-next",
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "divider": "Mid-sized checkpoints",
    "note": "Over 14B through 70B listed parameters. Quantization and runtime must be specified."
  },
  {
    "id": "jais-70b",
    "name": "Jais-adapted-70B",
    "maker": "Inception (G42, UAE)",
    "license": "Apache-2.0",
    "priceIn": "Not verified",
    "priceOut": "Not verified",
    "selfHost": "No minimum memory verified for this checkpoint.",
    "pros": [
      "The linked Jais-adapted-70B checkpoint is a 70B text model with a 4,096-token context."
    ],
    "cons": [
      "This is a specific adapted checkpoint, not a current-generation Jais model. Loading requires custom code."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/inception42/jais-adapted-70b",
        "type": "web"
      }
    ],
    "total": 70,
    "priceSource": null,
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "qwen38-27b",
    "name": "Qwen3.8 27B",
    "maker": "Alibaba Qwen",
    "license": "Apache-2.0",
    "priceIn": "$0.04",
    "priceOut": "$2.3",
    "selfHost": "Memory must cover the full multimodal checkpoint, KV cache and runtime.",
    "pros": [
      "27B language parameters; text, image and video input. Native context: 262,144 tokens."
    ],
    "cons": [
      "The card separately lists 28B model size. Extending context to 1M changes deployment requirements."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/Qwen/Qwen3.8-27B",
        "type": "web"
      }
    ],
    "total": 27,
    "priceSource": "https://openrouter.ai/qwen/qwen3.8-27b",
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "gemma-4-31b",
    "name": "Gemma 4 31B",
    "maker": "Google",
    "license": "Apache-2.0",
    "priceIn": "$0.09",
    "priceOut": "$0.34",
    "selfHost": "No minimum memory verified. Quantization and context length affect the requirement.",
    "pros": [
      "30.7B total parameters; text and image input, with a 256K-token context."
    ],
    "cons": [
      "The 31B card lists audio as unavailable. Do not infer the smaller Gemma variants' capabilities."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/google/gemma-4-31B-it",
        "type": "web"
      }
    ],
    "total": 31,
    "priceSource": "https://openrouter.ai/google/gemma-4-31b-it",
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "muse-glimmer-30b",
    "name": "Muse Glimmer 30B",
    "maker": "Meta",
    "license": "Apache-2.0",
    "priceIn": "$0.3",
    "priceOut": "$1.2",
    "selfHost": "Publisher targets vary by format: 24GB, 32GB or 64GB VRAM; weights alone are not total memory.",
    "pros": [
      "Approximately 29.6B parameters including vision. Text and image input; no audio input or output."
    ],
    "cons": [
      "The card targets 24GB VRAM for its K-Quant-17GB variant. It states the model is not intended for under-18s."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/meta-models/Muse-Glimmer-30B",
        "type": "web"
      }
    ],
    "total": 29.6,
    "priceSource": "https://openrouter.ai/meta/muse-glimmer-30b",
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "nemotron-3-nano-30b",
    "name": "Nemotron 3 Nano 30B A3B",
    "maker": "NVIDIA",
    "license": "NVIDIA Nemotron Open Model",
    "priceIn": "$0.06",
    "priceOut": "$0.24",
    "selfHost": "No minimum memory verified for the linked BF16 checkpoint.",
    "pros": [
      "30B total and 3.5B active. Text model with up to 1M context."
    ],
    "cons": [
      "Configuration defaults to 256K because longer context requires more memory. Review NVIDIA's model terms."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16",
        "type": "web"
      }
    ],
    "total": 30,
    "priceSource": "https://openrouter.ai/nvidia/nemotron-3-nano-30b-a3b",
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "k2-horizon-32b",
    "name": "K2 Horizon 32B",
    "maker": "IFM (Abu Dhabi)",
    "license": "Apache-2.0",
    "priceIn": "Not verified",
    "priceOut": "Not verified",
    "selfHost": "Published recipe: 2×H200. Smaller quantized deployments need separate testing.",
    "pros": [
      "The benchmark table lists 32B total and active parameters. Native context: 524,288 tokens."
    ],
    "cons": [
      "The publisher's validated BF16 SGLang recipe uses 2×H200. Metadata separately lists 35B."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/IFM/K2-Horizon-32B",
        "type": "web"
      }
    ],
    "total": 32,
    "priceSource": null,
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "seed-oss-36b",
    "name": "Seed-OSS-36B-Base",
    "maker": "ByteDance Seed",
    "license": "Apache-2.0",
    "priceIn": "Not verified",
    "priceOut": "Not verified",
    "selfHost": "No minimum memory verified; the card describes 4-bit and 8-bit options.",
    "pros": [
      "The linked Seed-OSS-36B-Base is a 36B text model with 512K context."
    ],
    "cons": [
      "A base checkpoint is not interchangeable with a chat-tuned variant. Quantized formats need separate validation."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/ByteDance-Seed/Seed-OSS-36B-Base",
        "type": "web"
      }
    ],
    "total": 36,
    "priceSource": null,
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "olmo-31-32b",
    "name": "Olmo 3.1 32B",
    "maker": "Ai2 (Allen Institute)",
    "license": "Apache-2.0",
    "priceIn": "Not verified",
    "priceOut": "Not verified",
    "selfHost": "No minimum memory verified; precision, context and runtime determine the requirement.",
    "pros": [
      "32B text-generation model. The card specifies Transformers 4.57.0 or later."
    ],
    "cons": [
      "The publisher warns about inaccurate and harmful outputs. Research guidelines do not constitute an Enki safety assessment."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/allenai/Olmo-3.1-32B-Think",
        "type": "web"
      }
    ],
    "total": 32,
    "priceSource": null,
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "exaone-45-33b",
    "name": "EXAONE 4.5 33B",
    "maker": "LG AI Research",
    "license": "EXAONE 1.2 NC",
    "priceIn": "Not verified",
    "priceOut": "Not verified",
    "selfHost": "Publisher 256K-context example: one H200 or 4×A100 40GB.",
    "pros": [
      "33B total including vision; text and image input. Context: 262,144 tokens."
    ],
    "cons": [
      "The linked licence is noncommercial. Do not treat this entry as unrestricted commercial-use software."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/LGAI-EXAONE/EXAONE-4.5-33B",
        "type": "web"
      }
    ],
    "total": 33,
    "priceSource": null,
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "hy-mt2-30b",
    "name": "Hunyuan Hy-MT2 30B A3B",
    "maker": "Tencent Hunyuan",
    "license": "Apache-2.0",
    "priceIn": "Not verified",
    "priceOut": "Not verified",
    "selfHost": "No minimum memory verified from the reviewed card.",
    "pros": [
      "A 30B translation-oriented checkpoint under Apache-2.0."
    ],
    "cons": [
      "The card says there is no default system prompt. Transformers v5 does not support its translation pipeline; load directly."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/tencent/Hy-MT2-30B-A3B",
        "type": "web"
      }
    ],
    "total": 30,
    "priceSource": null,
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "sarvam-30b",
    "name": "Sarvam 30B",
    "maker": "Sarvam AI (India)",
    "license": "Apache-2.0",
    "priceIn": "Not verified",
    "priceOut": "Not verified",
    "selfHost": "No minimum memory verified; custom runtime support needs testing.",
    "pros": [
      "The card lists 32B total and 2.4B non-embedding active parameters."
    ],
    "cons": [
      "The documented vLLM setup uses a custom fork or hot-patch. Voice-related use cases do not establish direct audio support."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/sarvamai/sarvam-30b",
        "type": "web"
      }
    ],
    "total": 32,
    "priceSource": null,
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "hyperclova-seed-32b",
    "name": "HyperCLOVAX-SEED-Think-32B",
    "maker": "Naver (Korea)",
    "license": "HyperCLOVA X SEED 32B Think",
    "priceIn": "Not verified",
    "priceOut": "Not verified",
    "selfHost": "No minimum memory verified from the reviewed evidence.",
    "pros": [
      "HyperCLOVAX-SEED-Think-32B is a Korean-focused model with a stated 128K-token context."
    ],
    "cons": [
      "The card names a custom Model License Agreement. Review its full terms before deployment or redistribution."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/naver-hyperclovax/HyperCLOVAX-SEED-Think-32B",
        "type": "web"
      }
    ],
    "total": 32,
    "priceSource": null,
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "sea-lion-v4-27b",
    "name": "Gemma-SEA-LION-v4 27B",
    "maker": "AI Singapore",
    "license": "Not verified",
    "priceIn": "Not verified",
    "priceOut": "Not verified",
    "selfHost": "Publisher example: a 32GB-RAM laptop; runtime and quantization must be identified.",
    "pros": [
      "Google's project page describes a Gemma 3 27B-based model for Southeast Asian languages, with text and image input."
    ],
    "cons": [
      "The page describes laptop use with 32GB RAM but does not establish a general requirement or the exact licence."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://deepmind.google/models/gemma/gemmaverse/sea-lion-v4/",
        "type": "web"
      }
    ],
    "total": 27,
    "priceSource": null,
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "eurollm-22b",
    "name": "EuroLLM 22B Instruct 2512",
    "maker": "EuroLLM consortium (EU)",
    "license": "Apache-2.0",
    "priceIn": "Not verified",
    "priceOut": "Not verified",
    "selfHost": "Minimum memory not verified; account for weights, context and runtime.",
    "pros": [
      "The EuroLLM-22B-Instruct-2512 card describes a multilingual text model with a 32,768-token context."
    ],
    "cons": [
      "Use the exact instruction-tuned checkpoint and supported runtime. Language quality still needs task-specific testing."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/utter-project/EuroLLM-22B-Instruct-2512",
        "type": "web"
      }
    ],
    "total": 22,
    "priceSource": null,
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "gpt-oss-20b",
    "name": "gpt-oss-20b",
    "maker": "OpenAI",
    "license": "Apache-2.0",
    "priceIn": "$0.018",
    "priceOut": "$0.09",
    "selfHost": "Publisher target: 16GB with supported MXFP4 quantization; not an arbitrary-format guarantee.",
    "pros": [
      "21B total and 3.6B active. The publisher describes operation within 16GB with MXFP4."
    ],
    "cons": [
      "Requires Harmony formatting. Runtime support and workload must match the publisher's configuration."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/openai/gpt-oss-20b",
        "type": "web"
      }
    ],
    "total": 21,
    "priceSource": "https://openrouter.ai/openai/gpt-oss-20b",
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "bonsai-27b",
    "name": "Ternary Bonsai 2 27B",
    "maker": "PrismML",
    "license": "Apache-2.0",
    "priceIn": "Not verified",
    "priceOut": "Not verified",
    "selfHost": "Publisher model footprint: 5.9GB. Total memory must include context and runtime.",
    "pros": [
      "Ternary Bonsai 2 27B supports text and image input with a stated 262K context."
    ],
    "cons": [
      "The published 5.9GB model footprint excludes any unreported runtime overhead. Custom low-bit kernels are required."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://prismml.com/news/bonsai-2-27b",
        "type": "web"
      }
    ],
    "total": 27,
    "priceSource": null,
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "ernie-45-21b",
    "name": "ERNIE 4.5 21B A3B PT",
    "maker": "Baidu",
    "license": "Apache-2.0",
    "priceIn": "Not verified",
    "priceOut": "Not verified",
    "selfHost": "No minimum memory verified; active parameters are not the stored model size.",
    "pros": [
      "21B total and 3B active text model, with a 131,072-token context."
    ],
    "cons": [
      "The linked PT checkpoint uses PyTorch-style weights. Follow its runtime-version guidance."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/baidu/ERNIE-4.5-21B-A3B-PT",
        "type": "web"
      }
    ],
    "total": 21,
    "priceSource": null,
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "divider": "Compact checkpoints",
    "note": "Over 4B through 14B listed parameters. Memory is more than the weight file."
  },
  {
    "id": "phi-4",
    "name": "Phi-4 14B",
    "maker": "Microsoft",
    "license": "MIT",
    "priceIn": "$0.07",
    "priceOut": "$0.14",
    "selfHost": "No minimum inference memory verified from the card.",
    "pros": [
      "The model summary describes a 14B text model with a 16K-token context."
    ],
    "cons": [
      "The card's training hardware is not an inference requirement. Task and language quality need local evaluation."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/microsoft/phi-4",
        "type": "web"
      }
    ],
    "total": 14,
    "priceSource": "https://openrouter.ai/microsoft/phi-4",
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "qwen35-9b",
    "name": "Qwen3.5 9B",
    "maker": "Alibaba Qwen",
    "license": "Apache-2.0",
    "priceIn": "$0.1",
    "priceOut": "$0.15",
    "selfHost": "No minimum memory verified; include the vision component and KV cache.",
    "pros": [
      "9B language parameters, with text, image and video input. Native context: 262,144 tokens."
    ],
    "cons": [
      "Metadata lists 10B total model size. Long context and supported runtime versions affect memory needs."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/Qwen/Qwen3.5-9B",
        "type": "web"
      }
    ],
    "total": 9,
    "priceSource": "https://openrouter.ai/qwen/qwen3.5-9b",
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "nemotron-nano-9b",
    "name": "Nemotron Nano 9B v2 Base",
    "maker": "NVIDIA",
    "license": "NVIDIA Open Model",
    "priceIn": "Not verified",
    "priceOut": "Not verified",
    "selfHost": "The card lists Linux and NVIDIA deployment options; no minimum memory verified.",
    "pros": [
      "The linked Nano-9B-v2-Base is an 8.89B text model with 128K context."
    ],
    "cons": [
      "This is a base checkpoint. Review the NVIDIA Open Model licence and use an appropriate tuned variant for chat."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/nvidia/NVIDIA-Nemotron-Nano-9B-v2-Base",
        "type": "web"
      }
    ],
    "total": 8.89,
    "priceSource": null,
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "olmo-3-7b",
    "name": "Olmo 3 7B Instruct DPO",
    "maker": "Ai2 (Allen Institute)",
    "license": "Apache-2.0",
    "priceIn": "Not verified",
    "priceOut": "Not verified",
    "selfHost": "No minimum memory verified; quantization needs runtime-specific testing.",
    "pros": [
      "The linked Olmo-3-7B-Instruct-DPO is a 7B text model."
    ],
    "cons": [
      "Requires Transformers 4.57.0 or later. The card's generation limit is not a verified full context limit."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/allenai/Olmo-3-7B-Instruct-DPO",
        "type": "web"
      }
    ],
    "total": 7,
    "priceSource": null,
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "ministral-3-14b",
    "name": "Ministral 3 14B",
    "maker": "Mistral AI",
    "license": "Apache-2.0",
    "priceIn": "$0.2",
    "priceOut": "$0.2",
    "selfHost": "Publisher FP8 fit: 24GB VRAM. Validate context and concurrency separately.",
    "pros": [
      "14B model with text and vision support, and 256K context."
    ],
    "cons": [
      "The publisher describes FP8 fitting in 24GB VRAM. Further quantization is a different memory and quality trade-off."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/mistralai/Ministral-3-14B-Instruct-2512",
        "type": "web"
      }
    ],
    "total": 14,
    "priceSource": "https://openrouter.ai/mistralai/ministral-14b-2512",
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "ministral-3-8b",
    "name": "Ministral 3 8B",
    "maker": "Mistral AI",
    "license": "Apache-2.0",
    "priceIn": "$0.15",
    "priceOut": "$0.15",
    "selfHost": "Publisher FP8 fit: 12GB VRAM; not a blanket 5GB-device recommendation.",
    "pros": [
      "Text and image model with 256K context; metadata separately lists 9B model size."
    ],
    "cons": [
      "The publisher describes FP8 fitting in 12GB VRAM. Smaller-format claims need their own configuration."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/mistralai/Ministral-3-8B-Instruct-2512",
        "type": "web"
      }
    ],
    "total": 8,
    "priceSource": "https://openrouter.ai/mistralai/ministral-8b-2512",
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "falcon-h1r-7b",
    "name": "Falcon H1R 7B",
    "maker": "TII (UAE)",
    "license": "Falcon LLM licence",
    "priceIn": "Not verified",
    "priceOut": "Not verified",
    "selfHost": "No minimum memory verified from the linked announcement.",
    "pros": [
      "The publisher describes a 7B reasoning-oriented text model."
    ],
    "cons": [
      "The Falcon LLM licence is custom, not Apache-2.0. Review its terms before redistribution or commercial deployment."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/blog/tiiuae/falcon-h1r-7b",
        "type": "web"
      }
    ],
    "total": 7,
    "priceSource": null,
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "apertus-8b",
    "name": "Apertus 8B Instruct 2509",
    "maker": "EPFL · ETH Zürich · CSCS",
    "license": "Apache-2.0",
    "priceIn": "Not verified",
    "priceOut": "Not verified",
    "selfHost": "Minimum memory not verified; use the exact checkpoint and runtime.",
    "pros": [
      "Apertus 8B Instruct 2509 has an official Apache-2.0 licence file from the Swiss AI team."
    ],
    "cons": [
      "The licence file does not establish the complete checkpoint's deployment requirements. Review accompanying policies as well."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/swiss-ai/Apertus-8B-Instruct-2509/blob/main/LICENSE.txt",
        "type": "web"
      }
    ],
    "total": 8,
    "priceSource": null,
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "plamo-2-8b",
    "name": "PLaMo 2 8B",
    "maker": "Preferred Networks (Japan)",
    "license": "PLaMo Community",
    "priceIn": "Not verified",
    "priceOut": "Not verified",
    "selfHost": "No minimum memory verified. The card pins several runtime dependencies.",
    "pros": [
      "The card describes an 8B English/Japanese text model."
    ],
    "cons": [
      "Commercial use requires prior registration and annual revenue/sales at or below ¥1 billion under the stated terms; attribution requirements also apply."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/pfnet/plamo-2-8b",
        "type": "web"
      }
    ],
    "total": 8,
    "priceSource": null,
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "gemma-4-e4b",
    "name": "Gemma 4 E4B",
    "maker": "Google",
    "license": "Apache-2.0",
    "priceIn": "Not verified",
    "priceOut": "Not verified",
    "selfHost": "No minimum memory verified; E4B does not mean 4B total stored parameters.",
    "pros": [
      "8B parameters including embeddings; 4.5B effective. Text, image and audio input; 128K context."
    ],
    "cons": [
      "The card limits audio to 30 seconds and video to 60 seconds at one frame per second."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/google/gemma-4-E4B",
        "type": "web"
      }
    ],
    "total": 8,
    "priceSource": null,
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "gemma-4-e2b",
    "name": "Gemma 4 E2B",
    "maker": "Google",
    "license": "Apache-2.0",
    "priceIn": "Not verified",
    "priceOut": "Not verified",
    "selfHost": "No minimum memory verified; effective parameters are not a runtime memory figure.",
    "pros": [
      "5.1B parameters including embeddings; 2.3B effective. Text, image and audio input; 128K context."
    ],
    "cons": [
      "Designed for local devices, but the card does not establish compatibility with every phone or laptop."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/google/gemma-4-E2B",
        "type": "web"
      }
    ],
    "total": 5.1,
    "priceSource": null,
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "divider": "Small checkpoints",
    "note": "Up to 4B listed parameters. Phone compatibility still needs device-level testing."
  },
  {
    "id": "qwen35-4b",
    "name": "Qwen3.5 4B",
    "maker": "Alibaba Qwen",
    "license": "Apache-2.0",
    "priceIn": "Not verified",
    "priceOut": "Not verified",
    "selfHost": "No minimum memory verified; multimedia components, context and runtime count.",
    "pros": [
      "4B language parameters; text, image and video input. Native context: 262,144 tokens."
    ],
    "cons": [
      "The listing separately reports 5B model size. A small name does not establish phone compatibility."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/Qwen/Qwen3.5-4B",
        "type": "web"
      }
    ],
    "total": 4,
    "priceSource": null,
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "phi-4-mini",
    "name": "Phi-4-mini 3.8B",
    "maker": "Microsoft",
    "license": "MIT",
    "priceIn": "Not verified",
    "priceOut": "Not verified",
    "selfHost": "No minimum memory verified from the card.",
    "pros": [
      "3.8B text model with a 128K-token context."
    ],
    "cons": [
      "Default Flash Attention has hardware requirements; older GPUs need the card's alternative attention setting."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/microsoft/Phi-4-mini-instruct",
        "type": "web"
      }
    ],
    "total": 3.8,
    "priceSource": null,
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "minicpm5-2b",
    "name": "MiniCPM5 2B",
    "maker": "OpenBMB",
    "license": "Apache-2.0",
    "priceIn": "Not verified",
    "priceOut": "Not verified",
    "selfHost": "No minimum memory verified; standard architecture support is not a phone-fit test.",
    "pros": [
      "The card lists about 2.52B parameters and a 131,072-token context."
    ],
    "cons": [
      "Uses standard LlamaForCausalLM support. Review the publisher's usage guidance as well as the licence."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/openbmb/MiniCPM5-2B",
        "type": "web"
      }
    ],
    "total": 2.52,
    "priceSource": null,
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "llama-32-3b",
    "name": "Llama 3.2 3B",
    "maker": "Meta",
    "license": "Llama 3.2 Community",
    "priceIn": "$0.05",
    "priceOut": "$0.33",
    "selfHost": "Publisher OnePlus 12 BF16 example: 7,419MB RSS, not a universal minimum.",
    "pros": [
      "3.21B text model with a 128K context in the full-precision family."
    ],
    "cons": [
      "Custom licence and acceptable-use terms apply, including attribution and a large-platform licensing condition."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/meta-llama/Llama-3.2-3B-Instruct",
        "type": "web"
      }
    ],
    "total": 3.21,
    "priceSource": "https://openrouter.ai/meta-llama/llama-3.2-3b-instruct",
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "llama-32-1b",
    "name": "Llama 3.2 1B Base",
    "maker": "Meta",
    "license": "Llama 3.2 Community",
    "priceIn": "Not verified",
    "priceOut": "Not verified",
    "selfHost": "Publisher OnePlus 12 BF16 example: 3,185MB RSS; quantized deployments differ.",
    "pros": [
      "1.23B text model. Full-precision context is 128K; listed quantized text models use 8K."
    ],
    "cons": [
      "Custom licence, acceptable-use and attribution terms apply. Check whether a base or instruction-tuned checkpoint is needed."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/meta-llama/Llama-3.2-1B",
        "type": "web"
      }
    ],
    "total": 1.23,
    "priceSource": null,
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "ministral-3-3b",
    "name": "Ministral 3 3B",
    "maker": "Mistral AI",
    "license": "Apache-2.0",
    "priceIn": "$0.1",
    "priceOut": "$0.1",
    "selfHost": "Publisher FP8 fit: 8GB VRAM. Do not infer total memory from the 3B label.",
    "pros": [
      "3.4B language parameters plus a 0.4B vision encoder; 256K context."
    ],
    "cons": [
      "The publisher describes FP8 fitting in 8GB VRAM. Further quantization requires separate checks."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/mistralai/Ministral-3-3B-Instruct-2512",
        "type": "web"
      }
    ],
    "total": 3.8,
    "priceSource": "https://openrouter.ai/mistralai/ministral-3b-2512",
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "smollm3-3b",
    "name": "SmolLM3 3B",
    "maker": "Hugging Face",
    "license": "Apache-2.0",
    "priceIn": "Not verified",
    "priceOut": "Not verified",
    "selfHost": "No minimum memory verified; runtime support starts with Transformers 4.53.0.",
    "pros": [
      "3B text model trained with 64K context; the card describes extension to 128K with YaRN."
    ],
    "cons": [
      "The default configuration is 65,536 tokens. Longer context needs changed settings and more memory."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/HuggingFaceTB/SmolLM3-3B",
        "type": "web"
      }
    ],
    "total": 3,
    "priceSource": null,
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "granite-4-micro",
    "name": "Granite 4.0 Micro",
    "maker": "IBM",
    "license": "Apache-2.0",
    "priceIn": "Not verified",
    "priceOut": "Not verified",
    "selfHost": "No minimum memory verified; the card includes a CPU-loading option.",
    "pros": [
      "3B dense text model with a 128K sequence length."
    ],
    "cons": [
      "Granite 4.0 Micro is not the same checkpoint as Granite 4.0 H Micro. Do not borrow another variant's price or memory figure."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/ibm-granite/granite-4.0-micro",
        "type": "web"
      }
    ],
    "total": 3,
    "priceSource": null,
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "lfm25-12b",
    "name": "LFM2.5 1.2B Thinking",
    "maker": "Liquid AI",
    "license": "LFM 1.0",
    "priceIn": "Not verified",
    "priceOut": "Not verified",
    "selfHost": "Publisher examples range from 719MB to 1,600MB; under-1GB is not universal.",
    "pros": [
      "The linked LFM2.5-1.2B-Thinking is a 1.17B text model with a 32,768-token context."
    ],
    "cons": [
      "Custom licence terms need review. Reported device memory varies with the configuration and context."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/LiquidAI/LFM2.5-1.2B-Thinking",
        "type": "web"
      }
    ],
    "total": 1.17,
    "priceSource": null,
    "audited": true,
    "priceDate": "11 October 2026"
  },
  {
    "id": "inkubalm-04b",
    "name": "InkubaLM 0.4B",
    "maker": "Lelapa AI (South Africa)",
    "license": "CC BY-NC 4.0",
    "priceIn": "Not verified",
    "priceOut": "Not verified",
    "selfHost": "No minimum memory verified. Small size does not remove licence or security obligations.",
    "pros": [
      "0.422B text model with a maximum sequence length of 2,048 tokens."
    ],
    "cons": [
      "The licence is noncommercial. Access requires accepting conditions; examples load custom code."
    ],
    "links": [
      {
        "label": "Publisher evidence",
        "url": "https://huggingface.co/lelapa/InkubaLM-0.4B",
        "type": "web"
      }
    ],
    "total": 0.422,
    "priceSource": null,
    "audited": true,
    "priceDate": "11 October 2026"
  }
];
