# Model catalogue

English editorial review: 11 October 2026. These 50 entries are candidates, not certified models or Enki benchmarks. Publisher claims are attributed, and unverified fields stay unverified. Open weights do not imply unrestricted licensing or open-source status. Hardware capacity must cover weights, context caches, runtime and concurrency.

Hosted prices are a dated OpenRouter catalogue snapshot in USD per million tokens, not a quote. Missing prices mean no exact match was verified. No self-hosting cost or savings multiplier is asserted.

## Large checkpoints

Over 70B listed parameters. Server-class candidates, not guaranteed fits.

### DeepSeek V4.1 Flash

- **Licence:** MIT.
- **Publisher description:** 552B backbone; 8B active in prefill, 16B in decode. Image and text input; up to 1M-token context. ([Publisher evidence](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash))
- **Limitations:** The repository also lists 763B parameters in metadata. Resolve checkpoint composition before sizing hardware. ([Publisher evidence](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash))
- **Deployment:** No minimum memory verified; active parameters do not represent the stored weights. ([Publisher evidence](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash))
- **Hosted rate:** $0.3 input / $1.2 output, per million tokens ([OpenRouter](https://openrouter.ai/deepseek/deepseek-v4.1-flash)).

### Mistral Large 3

- **Licence:** Apache-2.0.
- **Publisher description:** 675B total and 41B active, according to the model overview. Text and vision; 256K context. ([Publisher evidence](https://huggingface.co/mistralai/Mistral-Large-3-675B-Instruct-2512))
- **Limitations:** The published FP8 deployment uses an 8×H200 node; lower precision is a separate deployment configuration. ([Publisher evidence](https://huggingface.co/mistralai/Mistral-Large-3-675B-Instruct-2512))
- **Deployment:** Publisher deployment: FP8 on 8×H200. Not a consumer-device recommendation. ([Publisher evidence](https://huggingface.co/mistralai/Mistral-Large-3-675B-Instruct-2512))
- **Hosted rate:** $0.5 input / $1.5 output, per million tokens ([OpenRouter](https://openrouter.ai/mistralai/mistral-large-2512)).

### GLM-5.3-Flash

- **Licence:** MIT.
- **Publisher description:** 320B total and 18B active. Native image and text input. ([Publisher evidence](https://huggingface.co/zai-org/GLM-5.3-Flash))
- **Limitations:** No minimum memory requirement verified. Benchmark rankings depend on the evaluation and date. ([Publisher evidence](https://huggingface.co/zai-org/GLM-5.3-Flash))
- **Deployment:** Size the complete checkpoint, KV cache and runtime; Enki has not benchmarked it. ([Publisher evidence](https://huggingface.co/zai-org/GLM-5.3-Flash))
- **Hosted rate:** $0.15 input / $0.5 output, per million tokens ([OpenRouter](https://openrouter.ai/z-ai/glm-5.3-flash)).

### MiMo-V2.6-Flash-RL

- **Licence:** Not verified.
- **Publisher description:** The MiMo-V2.6-Flash-RL card describes 309B total and 15B active parameters, with text, image, video and audio input. ([Publisher evidence](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Flash-RL))
- **Limitations:** Licence terms were not established from the reviewed card. Its examples load custom code; review that code before use. ([Publisher evidence](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Flash-RL))
- **Deployment:** No minimum memory verified for the linked RL checkpoint. ([Publisher evidence](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Flash-RL))
- **Hosted rate:** No exact rate verified.

### MiniMax M2.5

- **Licence:** Modified MIT.
- **Publisher description:** The model card lists 229B parameters and text generation. ([Publisher evidence](https://huggingface.co/MiniMaxAI/MiniMax-M2.5))
- **Limitations:** Modified MIT is not identical to MIT. Review the licence file; example loading requires custom code. ([Publisher evidence](https://huggingface.co/MiniMaxAI/MiniMax-M2.5))
- **Deployment:** No minimum memory verified; a model name is not a deployment specification. ([Publisher evidence](https://huggingface.co/MiniMaxAI/MiniMax-M2.5))
- **Hosted rate:** $0.27 input / $1.08 output, per million tokens ([OpenRouter](https://openrouter.ai/minimax/minimax-m2.5)).

### Qwen3.8-Flash-Next

- **Licence:** Qwen Community 1.0.
- **Publisher description:** The card lists 125B language parameters, 51B n-gram embeddings and 4B MTP parameters; 6B activated. ([Publisher evidence](https://huggingface.co/Qwen/Qwen3.8-Flash-Next))
- **Limitations:** 262,144-token native context; extension to 1M needs configuration. Community terms require review. ([Publisher evidence](https://huggingface.co/Qwen/Qwen3.8-Flash-Next))
- **Deployment:** 180B listed total, not a 6B memory footprint. Minimum hardware not verified. ([Publisher evidence](https://huggingface.co/Qwen/Qwen3.8-Flash-Next))
- **Hosted rate:** No exact rate verified.

### Nemotron 3 Super 120B A12B

- **Licence:** NVIDIA Nemotron Open Model.
- **Publisher description:** 120B total and 12B active in the overview. Text input and output; up to 1M context. ([Publisher evidence](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Super-120B-A12B-FP8))
- **Limitations:** The linked FP8 card specifies server hardware. NVIDIA's model licence and NIM container terms are separate. ([Publisher evidence](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Super-120B-A12B-FP8))
- **Deployment:** Publisher minimum for FP8: 2×H100 80GB; one B200/B300 is also described. ([Publisher evidence](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Super-120B-A12B-FP8))
- **Hosted rate:** $0.08 input / $0.45 output, per million tokens ([OpenRouter](https://openrouter.ai/nvidia/nemotron-3-super-120b-a12b)).

### gpt-oss-120b

- **Licence:** Apache-2.0.
- **Publisher description:** 117B total and 5.1B active. The publisher describes single-80GB-GPU operation with MXFP4 MoE weights. ([Publisher evidence](https://huggingface.co/openai/gpt-oss-120b))
- **Limitations:** Requires the Harmony format. Check context, concurrency and runtime before claiming a fit. ([Publisher evidence](https://huggingface.co/openai/gpt-oss-120b))
- **Deployment:** Publisher target: one 80GB GPU with the supported MXFP4 implementation. ([Publisher evidence](https://huggingface.co/openai/gpt-oss-120b))
- **Hosted rate:** $0.037 input / $0.17 output, per million tokens ([OpenRouter](https://openrouter.ai/openai/gpt-oss-120b)).

### Intern-S1

- **Licence:** Apache-2.0.
- **Publisher description:** 241B total: a 235B language model and 6B vision encoder. Text, image and video input. ([Publisher evidence](https://huggingface.co/internlm/Intern-S1))
- **Limitations:** The unquantized card lists 8×A100/H100 or 4×H200 deployment; FP8 has different requirements. ([Publisher evidence](https://huggingface.co/internlm/Intern-S1))
- **Deployment:** Server-scale deployment. Custom model code must be reviewed before execution. ([Publisher evidence](https://huggingface.co/internlm/Intern-S1))
- **Hosted rate:** No exact rate verified.

### Step 3.7 Flash

- **Licence:** Apache-2.0.
- **Publisher description:** The overview describes 198B total and about 11B active. Text and image input; 256K context. ([Publisher evidence](https://huggingface.co/stepfun-ai/Step-3.7-Flash))
- **Limitations:** The llama.cpp section specifies at least 120GB unified memory/VRAM and recommends 128GB. ([Publisher evidence](https://huggingface.co/stepfun-ai/Step-3.7-Flash))
- **Deployment:** Publisher llama.cpp guidance: 120GB minimum, 128GB recommended; runtime overhead still matters. ([Publisher evidence](https://huggingface.co/stepfun-ai/Step-3.7-Flash))
- **Hosted rate:** $0.2 input / $1.15 output, per million tokens ([OpenRouter](https://openrouter.ai/stepfun/step-3.7-flash)).

### Mistral Small 4

- **Licence:** Apache-2.0.
- **Publisher description:** 119B total and 6.5B active. Text and image input; 256K context. ([Publisher evidence](https://huggingface.co/mistralai/Mistral-Small-4-119B-2603))
- **Limitations:** Despite its name, this is a large MoE checkpoint. A 24GB-device fit is not established by the reviewed card. ([Publisher evidence](https://huggingface.co/mistralai/Mistral-Small-4-119B-2603))
- **Deployment:** 119B total weights must be accounted for; minimum memory not verified. ([Publisher evidence](https://huggingface.co/mistralai/Mistral-Small-4-119B-2603))
- **Hosted rate:** $0.15 input / $0.6 output, per million tokens ([OpenRouter](https://openrouter.ai/mistralai/mistral-small-2603)).

### Qwen3 Coder Next

- **Licence:** Apache-2.0.
- **Publisher description:** 80B total and 3B active, with a native 262,144-token context. ([Publisher evidence](https://huggingface.co/Qwen/Qwen3-Coder-Next))
- **Limitations:** Supports non-thinking mode. Reducing context can help with out-of-memory errors but does not remove the weights. ([Publisher evidence](https://huggingface.co/Qwen/Qwen3-Coder-Next))
- **Deployment:** Not a 3B-size checkpoint; no 32GB-device fit verified. ([Publisher evidence](https://huggingface.co/Qwen/Qwen3-Coder-Next))
- **Hosted rate:** $0.12 input / $0.8 output, per million tokens ([OpenRouter](https://openrouter.ai/qwen/qwen3-coder-next)).

## Mid-sized checkpoints

Over 14B through 70B listed parameters. Quantization and runtime must be specified.

### Jais-adapted-70B

- **Licence:** Apache-2.0.
- **Publisher description:** The linked Jais-adapted-70B checkpoint is a 70B text model with a 4,096-token context. ([Publisher evidence](https://huggingface.co/inception42/jais-adapted-70b))
- **Limitations:** This is a specific adapted checkpoint, not a current-generation Jais model. Loading requires custom code. ([Publisher evidence](https://huggingface.co/inception42/jais-adapted-70b))
- **Deployment:** No minimum memory verified for this checkpoint. ([Publisher evidence](https://huggingface.co/inception42/jais-adapted-70b))
- **Hosted rate:** No exact rate verified.

### Qwen3.8 27B

- **Licence:** Apache-2.0.
- **Publisher description:** 27B language parameters; text, image and video input. Native context: 262,144 tokens. ([Publisher evidence](https://huggingface.co/Qwen/Qwen3.8-27B))
- **Limitations:** The card separately lists 28B model size. Extending context to 1M changes deployment requirements. ([Publisher evidence](https://huggingface.co/Qwen/Qwen3.8-27B))
- **Deployment:** Memory must cover the full multimodal checkpoint, KV cache and runtime. ([Publisher evidence](https://huggingface.co/Qwen/Qwen3.8-27B))
- **Hosted rate:** $0.04 input / $2.3 output, per million tokens ([OpenRouter](https://openrouter.ai/qwen/qwen3.8-27b)).

### Gemma 4 31B

- **Licence:** Apache-2.0.
- **Publisher description:** 30.7B total parameters; text and image input, with a 256K-token context. ([Publisher evidence](https://huggingface.co/google/gemma-4-31B-it))
- **Limitations:** The 31B card lists audio as unavailable. Do not infer the smaller Gemma variants' capabilities. ([Publisher evidence](https://huggingface.co/google/gemma-4-31B-it))
- **Deployment:** No minimum memory verified. Quantization and context length affect the requirement. ([Publisher evidence](https://huggingface.co/google/gemma-4-31B-it))
- **Hosted rate:** $0.09 input / $0.34 output, per million tokens ([OpenRouter](https://openrouter.ai/google/gemma-4-31b-it)).

### Muse Glimmer 30B

- **Licence:** Apache-2.0.
- **Publisher description:** Approximately 29.6B parameters including vision. Text and image input; no audio input or output. ([Publisher evidence](https://huggingface.co/meta-models/Muse-Glimmer-30B))
- **Limitations:** The card targets 24GB VRAM for its K-Quant-17GB variant. It states the model is not intended for under-18s. ([Publisher evidence](https://huggingface.co/meta-models/Muse-Glimmer-30B))
- **Deployment:** Publisher targets vary by format: 24GB, 32GB or 64GB VRAM; weights alone are not total memory. ([Publisher evidence](https://huggingface.co/meta-models/Muse-Glimmer-30B))
- **Hosted rate:** $0.3 input / $1.2 output, per million tokens ([OpenRouter](https://openrouter.ai/meta/muse-glimmer-30b)).

### Nemotron 3 Nano 30B A3B

- **Licence:** NVIDIA Nemotron Open Model.
- **Publisher description:** 30B total and 3.5B active. Text model with up to 1M context. ([Publisher evidence](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16))
- **Limitations:** Configuration defaults to 256K because longer context requires more memory. Review NVIDIA's model terms. ([Publisher evidence](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16))
- **Deployment:** No minimum memory verified for the linked BF16 checkpoint. ([Publisher evidence](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16))
- **Hosted rate:** $0.06 input / $0.24 output, per million tokens ([OpenRouter](https://openrouter.ai/nvidia/nemotron-3-nano-30b-a3b)).

### K2 Horizon 32B

- **Licence:** Apache-2.0.
- **Publisher description:** The benchmark table lists 32B total and active parameters. Native context: 524,288 tokens. ([Publisher evidence](https://huggingface.co/IFM/K2-Horizon-32B))
- **Limitations:** The publisher's validated BF16 SGLang recipe uses 2×H200. Metadata separately lists 35B. ([Publisher evidence](https://huggingface.co/IFM/K2-Horizon-32B))
- **Deployment:** Published recipe: 2×H200. Smaller quantized deployments need separate testing. ([Publisher evidence](https://huggingface.co/IFM/K2-Horizon-32B))
- **Hosted rate:** No exact rate verified.

### Seed-OSS-36B-Base

- **Licence:** Apache-2.0.
- **Publisher description:** The linked Seed-OSS-36B-Base is a 36B text model with 512K context. ([Publisher evidence](https://huggingface.co/ByteDance-Seed/Seed-OSS-36B-Base))
- **Limitations:** A base checkpoint is not interchangeable with a chat-tuned variant. Quantized formats need separate validation. ([Publisher evidence](https://huggingface.co/ByteDance-Seed/Seed-OSS-36B-Base))
- **Deployment:** No minimum memory verified; the card describes 4-bit and 8-bit options. ([Publisher evidence](https://huggingface.co/ByteDance-Seed/Seed-OSS-36B-Base))
- **Hosted rate:** No exact rate verified.

### Olmo 3.1 32B

- **Licence:** Apache-2.0.
- **Publisher description:** 32B text-generation model. The card specifies Transformers 4.57.0 or later. ([Publisher evidence](https://huggingface.co/allenai/Olmo-3.1-32B-Think))
- **Limitations:** The publisher warns about inaccurate and harmful outputs. Research guidelines do not constitute an Enki safety assessment. ([Publisher evidence](https://huggingface.co/allenai/Olmo-3.1-32B-Think))
- **Deployment:** No minimum memory verified; precision, context and runtime determine the requirement. ([Publisher evidence](https://huggingface.co/allenai/Olmo-3.1-32B-Think))
- **Hosted rate:** No exact rate verified.

### EXAONE 4.5 33B

- **Licence:** EXAONE 1.2 NC.
- **Publisher description:** 33B total including vision; text and image input. Context: 262,144 tokens. ([Publisher evidence](https://huggingface.co/LGAI-EXAONE/EXAONE-4.5-33B))
- **Limitations:** The linked licence is noncommercial. Do not treat this entry as unrestricted commercial-use software. ([Publisher evidence](https://huggingface.co/LGAI-EXAONE/EXAONE-4.5-33B))
- **Deployment:** Publisher 256K-context example: one H200 or 4×A100 40GB. ([Publisher evidence](https://huggingface.co/LGAI-EXAONE/EXAONE-4.5-33B))
- **Hosted rate:** No exact rate verified.

### Hunyuan Hy-MT2 30B A3B

- **Licence:** Apache-2.0.
- **Publisher description:** A 30B translation-oriented checkpoint under Apache-2.0. ([Publisher evidence](https://huggingface.co/tencent/Hy-MT2-30B-A3B))
- **Limitations:** The card says there is no default system prompt. Transformers v5 does not support its translation pipeline; load directly. ([Publisher evidence](https://huggingface.co/tencent/Hy-MT2-30B-A3B))
- **Deployment:** No minimum memory verified from the reviewed card. ([Publisher evidence](https://huggingface.co/tencent/Hy-MT2-30B-A3B))
- **Hosted rate:** No exact rate verified.

### Sarvam 30B

- **Licence:** Apache-2.0.
- **Publisher description:** The card lists 32B total and 2.4B non-embedding active parameters. ([Publisher evidence](https://huggingface.co/sarvamai/sarvam-30b))
- **Limitations:** The documented vLLM setup uses a custom fork or hot-patch. Voice-related use cases do not establish direct audio support. ([Publisher evidence](https://huggingface.co/sarvamai/sarvam-30b))
- **Deployment:** No minimum memory verified; custom runtime support needs testing. ([Publisher evidence](https://huggingface.co/sarvamai/sarvam-30b))
- **Hosted rate:** No exact rate verified.

### HyperCLOVAX-SEED-Think-32B

- **Licence:** HyperCLOVA X SEED 32B Think.
- **Publisher description:** HyperCLOVAX-SEED-Think-32B is a Korean-focused model with a stated 128K-token context. ([Publisher evidence](https://huggingface.co/naver-hyperclovax/HyperCLOVAX-SEED-Think-32B))
- **Limitations:** The card names a custom Model License Agreement. Review its full terms before deployment or redistribution. ([Publisher evidence](https://huggingface.co/naver-hyperclovax/HyperCLOVAX-SEED-Think-32B))
- **Deployment:** No minimum memory verified from the reviewed evidence. ([Publisher evidence](https://huggingface.co/naver-hyperclovax/HyperCLOVAX-SEED-Think-32B))
- **Hosted rate:** No exact rate verified.

### Gemma-SEA-LION-v4 27B

- **Licence:** Not verified.
- **Publisher description:** Google's project page describes a Gemma 3 27B-based model for Southeast Asian languages, with text and image input. ([Publisher evidence](https://deepmind.google/models/gemma/gemmaverse/sea-lion-v4/))
- **Limitations:** The page describes laptop use with 32GB RAM but does not establish a general requirement or the exact licence. ([Publisher evidence](https://deepmind.google/models/gemma/gemmaverse/sea-lion-v4/))
- **Deployment:** Publisher example: a 32GB-RAM laptop; runtime and quantization must be identified. ([Publisher evidence](https://deepmind.google/models/gemma/gemmaverse/sea-lion-v4/))
- **Hosted rate:** No exact rate verified.

### EuroLLM 22B Instruct 2512

- **Licence:** Apache-2.0.
- **Publisher description:** The EuroLLM-22B-Instruct-2512 card describes a multilingual text model with a 32,768-token context. ([Publisher evidence](https://huggingface.co/utter-project/EuroLLM-22B-Instruct-2512))
- **Limitations:** Use the exact instruction-tuned checkpoint and supported runtime. Language quality still needs task-specific testing. ([Publisher evidence](https://huggingface.co/utter-project/EuroLLM-22B-Instruct-2512))
- **Deployment:** Minimum memory not verified; account for weights, context and runtime. ([Publisher evidence](https://huggingface.co/utter-project/EuroLLM-22B-Instruct-2512))
- **Hosted rate:** No exact rate verified.

### gpt-oss-20b

- **Licence:** Apache-2.0.
- **Publisher description:** 21B total and 3.6B active. The publisher describes operation within 16GB with MXFP4. ([Publisher evidence](https://huggingface.co/openai/gpt-oss-20b))
- **Limitations:** Requires Harmony formatting. Runtime support and workload must match the publisher's configuration. ([Publisher evidence](https://huggingface.co/openai/gpt-oss-20b))
- **Deployment:** Publisher target: 16GB with supported MXFP4 quantization; not an arbitrary-format guarantee. ([Publisher evidence](https://huggingface.co/openai/gpt-oss-20b))
- **Hosted rate:** $0.018 input / $0.09 output, per million tokens ([OpenRouter](https://openrouter.ai/openai/gpt-oss-20b)).

### Ternary Bonsai 2 27B

- **Licence:** Apache-2.0.
- **Publisher description:** Ternary Bonsai 2 27B supports text and image input with a stated 262K context. ([Publisher evidence](https://prismml.com/news/bonsai-2-27b))
- **Limitations:** The published 5.9GB model footprint excludes any unreported runtime overhead. Custom low-bit kernels are required. ([Publisher evidence](https://prismml.com/news/bonsai-2-27b))
- **Deployment:** Publisher model footprint: 5.9GB. Total memory must include context and runtime. ([Publisher evidence](https://prismml.com/news/bonsai-2-27b))
- **Hosted rate:** No exact rate verified.

### ERNIE 4.5 21B A3B PT

- **Licence:** Apache-2.0.
- **Publisher description:** 21B total and 3B active text model, with a 131,072-token context. ([Publisher evidence](https://huggingface.co/baidu/ERNIE-4.5-21B-A3B-PT))
- **Limitations:** The linked PT checkpoint uses PyTorch-style weights. Follow its runtime-version guidance. ([Publisher evidence](https://huggingface.co/baidu/ERNIE-4.5-21B-A3B-PT))
- **Deployment:** No minimum memory verified; active parameters are not the stored model size. ([Publisher evidence](https://huggingface.co/baidu/ERNIE-4.5-21B-A3B-PT))
- **Hosted rate:** No exact rate verified.

## Compact checkpoints

Over 4B through 14B listed parameters. Memory is more than the weight file.

### Phi-4 14B

- **Licence:** MIT.
- **Publisher description:** The model summary describes a 14B text model with a 16K-token context. ([Publisher evidence](https://huggingface.co/microsoft/phi-4))
- **Limitations:** The card's training hardware is not an inference requirement. Task and language quality need local evaluation. ([Publisher evidence](https://huggingface.co/microsoft/phi-4))
- **Deployment:** No minimum inference memory verified from the card. ([Publisher evidence](https://huggingface.co/microsoft/phi-4))
- **Hosted rate:** $0.07 input / $0.14 output, per million tokens ([OpenRouter](https://openrouter.ai/microsoft/phi-4)).

### Qwen3.5 9B

- **Licence:** Apache-2.0.
- **Publisher description:** 9B language parameters, with text, image and video input. Native context: 262,144 tokens. ([Publisher evidence](https://huggingface.co/Qwen/Qwen3.5-9B))
- **Limitations:** Metadata lists 10B total model size. Long context and supported runtime versions affect memory needs. ([Publisher evidence](https://huggingface.co/Qwen/Qwen3.5-9B))
- **Deployment:** No minimum memory verified; include the vision component and KV cache. ([Publisher evidence](https://huggingface.co/Qwen/Qwen3.5-9B))
- **Hosted rate:** $0.1 input / $0.15 output, per million tokens ([OpenRouter](https://openrouter.ai/qwen/qwen3.5-9b)).

### Nemotron Nano 9B v2 Base

- **Licence:** NVIDIA Open Model.
- **Publisher description:** The linked Nano-9B-v2-Base is an 8.89B text model with 128K context. ([Publisher evidence](https://huggingface.co/nvidia/NVIDIA-Nemotron-Nano-9B-v2-Base))
- **Limitations:** This is a base checkpoint. Review the NVIDIA Open Model licence and use an appropriate tuned variant for chat. ([Publisher evidence](https://huggingface.co/nvidia/NVIDIA-Nemotron-Nano-9B-v2-Base))
- **Deployment:** The card lists Linux and NVIDIA deployment options; no minimum memory verified. ([Publisher evidence](https://huggingface.co/nvidia/NVIDIA-Nemotron-Nano-9B-v2-Base))
- **Hosted rate:** No exact rate verified.

### Olmo 3 7B Instruct DPO

- **Licence:** Apache-2.0.
- **Publisher description:** The linked Olmo-3-7B-Instruct-DPO is a 7B text model. ([Publisher evidence](https://huggingface.co/allenai/Olmo-3-7B-Instruct-DPO))
- **Limitations:** Requires Transformers 4.57.0 or later. The card's generation limit is not a verified full context limit. ([Publisher evidence](https://huggingface.co/allenai/Olmo-3-7B-Instruct-DPO))
- **Deployment:** No minimum memory verified; quantization needs runtime-specific testing. ([Publisher evidence](https://huggingface.co/allenai/Olmo-3-7B-Instruct-DPO))
- **Hosted rate:** No exact rate verified.

### Ministral 3 14B

- **Licence:** Apache-2.0.
- **Publisher description:** 14B model with text and vision support, and 256K context. ([Publisher evidence](https://huggingface.co/mistralai/Ministral-3-14B-Instruct-2512))
- **Limitations:** The publisher describes FP8 fitting in 24GB VRAM. Further quantization is a different memory and quality trade-off. ([Publisher evidence](https://huggingface.co/mistralai/Ministral-3-14B-Instruct-2512))
- **Deployment:** Publisher FP8 fit: 24GB VRAM. Validate context and concurrency separately. ([Publisher evidence](https://huggingface.co/mistralai/Ministral-3-14B-Instruct-2512))
- **Hosted rate:** $0.2 input / $0.2 output, per million tokens ([OpenRouter](https://openrouter.ai/mistralai/ministral-14b-2512)).

### Ministral 3 8B

- **Licence:** Apache-2.0.
- **Publisher description:** Text and image model with 256K context; metadata separately lists 9B model size. ([Publisher evidence](https://huggingface.co/mistralai/Ministral-3-8B-Instruct-2512))
- **Limitations:** The publisher describes FP8 fitting in 12GB VRAM. Smaller-format claims need their own configuration. ([Publisher evidence](https://huggingface.co/mistralai/Ministral-3-8B-Instruct-2512))
- **Deployment:** Publisher FP8 fit: 12GB VRAM; not a blanket 5GB-device recommendation. ([Publisher evidence](https://huggingface.co/mistralai/Ministral-3-8B-Instruct-2512))
- **Hosted rate:** $0.15 input / $0.15 output, per million tokens ([OpenRouter](https://openrouter.ai/mistralai/ministral-8b-2512)).

### Falcon H1R 7B

- **Licence:** Falcon LLM licence.
- **Publisher description:** The publisher describes a 7B reasoning-oriented text model. ([Publisher evidence](https://huggingface.co/blog/tiiuae/falcon-h1r-7b))
- **Limitations:** The Falcon LLM licence is custom, not Apache-2.0. Review its terms before redistribution or commercial deployment. ([Publisher evidence](https://huggingface.co/blog/tiiuae/falcon-h1r-7b))
- **Deployment:** No minimum memory verified from the linked announcement. ([Publisher evidence](https://huggingface.co/blog/tiiuae/falcon-h1r-7b))
- **Hosted rate:** No exact rate verified.

### Apertus 8B Instruct 2509

- **Licence:** Apache-2.0.
- **Publisher description:** Apertus 8B Instruct 2509 has an official Apache-2.0 licence file from the Swiss AI team. ([Publisher evidence](https://huggingface.co/swiss-ai/Apertus-8B-Instruct-2509/blob/main/LICENSE.txt))
- **Limitations:** The licence file does not establish the complete checkpoint's deployment requirements. Review accompanying policies as well. ([Publisher evidence](https://huggingface.co/swiss-ai/Apertus-8B-Instruct-2509/blob/main/LICENSE.txt))
- **Deployment:** Minimum memory not verified; use the exact checkpoint and runtime. ([Publisher evidence](https://huggingface.co/swiss-ai/Apertus-8B-Instruct-2509/blob/main/LICENSE.txt))
- **Hosted rate:** No exact rate verified.

### PLaMo 2 8B

- **Licence:** PLaMo Community.
- **Publisher description:** The card describes an 8B English/Japanese text model. ([Publisher evidence](https://huggingface.co/pfnet/plamo-2-8b))
- **Limitations:** Commercial use requires prior registration and annual revenue/sales at or below ¥1 billion under the stated terms; attribution requirements also apply. ([Publisher evidence](https://huggingface.co/pfnet/plamo-2-8b))
- **Deployment:** No minimum memory verified. The card pins several runtime dependencies. ([Publisher evidence](https://huggingface.co/pfnet/plamo-2-8b))
- **Hosted rate:** No exact rate verified.

### Gemma 4 E4B

- **Licence:** Apache-2.0.
- **Publisher description:** 8B parameters including embeddings; 4.5B effective. Text, image and audio input; 128K context. ([Publisher evidence](https://huggingface.co/google/gemma-4-E4B))
- **Limitations:** The card limits audio to 30 seconds and video to 60 seconds at one frame per second. ([Publisher evidence](https://huggingface.co/google/gemma-4-E4B))
- **Deployment:** No minimum memory verified; E4B does not mean 4B total stored parameters. ([Publisher evidence](https://huggingface.co/google/gemma-4-E4B))
- **Hosted rate:** No exact rate verified.

### Gemma 4 E2B

- **Licence:** Apache-2.0.
- **Publisher description:** 5.1B parameters including embeddings; 2.3B effective. Text, image and audio input; 128K context. ([Publisher evidence](https://huggingface.co/google/gemma-4-E2B))
- **Limitations:** Designed for local devices, but the card does not establish compatibility with every phone or laptop. ([Publisher evidence](https://huggingface.co/google/gemma-4-E2B))
- **Deployment:** No minimum memory verified; effective parameters are not a runtime memory figure. ([Publisher evidence](https://huggingface.co/google/gemma-4-E2B))
- **Hosted rate:** No exact rate verified.

## Small checkpoints

Up to 4B listed parameters. Phone compatibility still needs device-level testing.

### Qwen3.5 4B

- **Licence:** Apache-2.0.
- **Publisher description:** 4B language parameters; text, image and video input. Native context: 262,144 tokens. ([Publisher evidence](https://huggingface.co/Qwen/Qwen3.5-4B))
- **Limitations:** The listing separately reports 5B model size. A small name does not establish phone compatibility. ([Publisher evidence](https://huggingface.co/Qwen/Qwen3.5-4B))
- **Deployment:** No minimum memory verified; multimedia components, context and runtime count. ([Publisher evidence](https://huggingface.co/Qwen/Qwen3.5-4B))
- **Hosted rate:** No exact rate verified.

### Phi-4-mini 3.8B

- **Licence:** MIT.
- **Publisher description:** 3.8B text model with a 128K-token context. ([Publisher evidence](https://huggingface.co/microsoft/Phi-4-mini-instruct))
- **Limitations:** Default Flash Attention has hardware requirements; older GPUs need the card's alternative attention setting. ([Publisher evidence](https://huggingface.co/microsoft/Phi-4-mini-instruct))
- **Deployment:** No minimum memory verified from the card. ([Publisher evidence](https://huggingface.co/microsoft/Phi-4-mini-instruct))
- **Hosted rate:** No exact rate verified.

### MiniCPM5 2B

- **Licence:** Apache-2.0.
- **Publisher description:** The card lists about 2.52B parameters and a 131,072-token context. ([Publisher evidence](https://huggingface.co/openbmb/MiniCPM5-2B))
- **Limitations:** Uses standard LlamaForCausalLM support. Review the publisher's usage guidance as well as the licence. ([Publisher evidence](https://huggingface.co/openbmb/MiniCPM5-2B))
- **Deployment:** No minimum memory verified; standard architecture support is not a phone-fit test. ([Publisher evidence](https://huggingface.co/openbmb/MiniCPM5-2B))
- **Hosted rate:** No exact rate verified.

### Llama 3.2 3B

- **Licence:** Llama 3.2 Community.
- **Publisher description:** 3.21B text model with a 128K context in the full-precision family. ([Publisher evidence](https://huggingface.co/meta-llama/Llama-3.2-3B-Instruct))
- **Limitations:** Custom licence and acceptable-use terms apply, including attribution and a large-platform licensing condition. ([Publisher evidence](https://huggingface.co/meta-llama/Llama-3.2-3B-Instruct))
- **Deployment:** Publisher OnePlus 12 BF16 example: 7,419MB RSS, not a universal minimum. ([Publisher evidence](https://huggingface.co/meta-llama/Llama-3.2-3B-Instruct))
- **Hosted rate:** $0.05 input / $0.33 output, per million tokens ([OpenRouter](https://openrouter.ai/meta-llama/llama-3.2-3b-instruct)).

### Llama 3.2 1B Base

- **Licence:** Llama 3.2 Community.
- **Publisher description:** 1.23B text model. Full-precision context is 128K; listed quantized text models use 8K. ([Publisher evidence](https://huggingface.co/meta-llama/Llama-3.2-1B))
- **Limitations:** Custom licence, acceptable-use and attribution terms apply. Check whether a base or instruction-tuned checkpoint is needed. ([Publisher evidence](https://huggingface.co/meta-llama/Llama-3.2-1B))
- **Deployment:** Publisher OnePlus 12 BF16 example: 3,185MB RSS; quantized deployments differ. ([Publisher evidence](https://huggingface.co/meta-llama/Llama-3.2-1B))
- **Hosted rate:** No exact rate verified.

### Ministral 3 3B

- **Licence:** Apache-2.0.
- **Publisher description:** 3.4B language parameters plus a 0.4B vision encoder; 256K context. ([Publisher evidence](https://huggingface.co/mistralai/Ministral-3-3B-Instruct-2512))
- **Limitations:** The publisher describes FP8 fitting in 8GB VRAM. Further quantization requires separate checks. ([Publisher evidence](https://huggingface.co/mistralai/Ministral-3-3B-Instruct-2512))
- **Deployment:** Publisher FP8 fit: 8GB VRAM. Do not infer total memory from the 3B label. ([Publisher evidence](https://huggingface.co/mistralai/Ministral-3-3B-Instruct-2512))
- **Hosted rate:** $0.1 input / $0.1 output, per million tokens ([OpenRouter](https://openrouter.ai/mistralai/ministral-3b-2512)).

### SmolLM3 3B

- **Licence:** Apache-2.0.
- **Publisher description:** 3B text model trained with 64K context; the card describes extension to 128K with YaRN. ([Publisher evidence](https://huggingface.co/HuggingFaceTB/SmolLM3-3B))
- **Limitations:** The default configuration is 65,536 tokens. Longer context needs changed settings and more memory. ([Publisher evidence](https://huggingface.co/HuggingFaceTB/SmolLM3-3B))
- **Deployment:** No minimum memory verified; runtime support starts with Transformers 4.53.0. ([Publisher evidence](https://huggingface.co/HuggingFaceTB/SmolLM3-3B))
- **Hosted rate:** No exact rate verified.

### Granite 4.0 Micro

- **Licence:** Apache-2.0.
- **Publisher description:** 3B dense text model with a 128K sequence length. ([Publisher evidence](https://huggingface.co/ibm-granite/granite-4.0-micro))
- **Limitations:** Granite 4.0 Micro is not the same checkpoint as Granite 4.0 H Micro. Do not borrow another variant's price or memory figure. ([Publisher evidence](https://huggingface.co/ibm-granite/granite-4.0-micro))
- **Deployment:** No minimum memory verified; the card includes a CPU-loading option. ([Publisher evidence](https://huggingface.co/ibm-granite/granite-4.0-micro))
- **Hosted rate:** No exact rate verified.

### LFM2.5 1.2B Thinking

- **Licence:** LFM 1.0.
- **Publisher description:** The linked LFM2.5-1.2B-Thinking is a 1.17B text model with a 32,768-token context. ([Publisher evidence](https://huggingface.co/LiquidAI/LFM2.5-1.2B-Thinking))
- **Limitations:** Custom licence terms need review. Reported device memory varies with the configuration and context. ([Publisher evidence](https://huggingface.co/LiquidAI/LFM2.5-1.2B-Thinking))
- **Deployment:** Publisher examples range from 719MB to 1,600MB; under-1GB is not universal. ([Publisher evidence](https://huggingface.co/LiquidAI/LFM2.5-1.2B-Thinking))
- **Hosted rate:** No exact rate verified.

### InkubaLM 0.4B

- **Licence:** CC BY-NC 4.0.
- **Publisher description:** 0.422B text model with a maximum sequence length of 2,048 tokens. ([Publisher evidence](https://huggingface.co/lelapa/InkubaLM-0.4B))
- **Limitations:** The licence is noncommercial. Access requires accepting conditions; examples load custom code. ([Publisher evidence](https://huggingface.co/lelapa/InkubaLM-0.4B))
- **Deployment:** No minimum memory verified. Small size does not remove licence or security obligations. ([Publisher evidence](https://huggingface.co/lelapa/InkubaLM-0.4B))
- **Hosted rate:** No exact rate verified.
