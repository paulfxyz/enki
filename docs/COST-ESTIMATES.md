# Registry cost estimates

These figures are illustrative scenarios, not measured performance, quotations or audited savings. Hardware compatibility, quality, latency, model quantisation and sustained throughput have not been validated. The founding 300 are a proposed future membership; their formation does not guarantee benchmark collection.

## Shared workload

Both sides use one million total tokens with 80% input and 20% output. The cloud figure blends the dated per-model input/output snapshot when present; otherwise it uses the hypothetical size-tier input/output prices below. A missing rate is not evidence that no provider exists. Original source URLs and dates remain in the data for traceability, without adding a provider attribution to every card.

## Illustrative assumptions

All amounts are USD. These are assumed budgets and aggregate batched speeds, not tested configurations or hardware purchase recommendations.

| Listed total parameters | Hardware budget | Power | Output tokens/s | Assumed missing hosted input/output per million |
|---|---:|---:|---:|---:|
| More than 70B | 40,000 | 2 kW | 800 | 0.25 / 1.00 |
| More than 15B to 70B | 5,000 | 0.6 kW | 300 | 0.10 / 0.40 |
| More than 5B to 15B | 1,800 | 0.25 kW | 180 | 0.08 / 0.25 |
| Up to 5B | 800 | 0.10 kW | 120 | 0.05 / 0.15 |

Input processing is assumed ten times faster than output. Purchased hardware is amortised over three years at 50% utilisation, with electricity at USD 0.20/kWh. The estimation tiers are not the editorial catalogue group boundaries. Total listed parameters are only a coarse proxy: mixture-of-experts architecture, full checkpoint composition and precision can make a scenario unsuitable.

Hourly active cost equals hardware budget divided by (3 × 365 × 24 × 0.5), plus power in kW multiplied by 0.20. Cost per million total tokens equals hourly cost × 1,000,000 × (0.8 / input tokens per second + 0.2 / output tokens per second) / 3,600.

The comparison excludes labour, networking, tax, financing, cooling beyond the assumed power budget, and redundancy. It assumes powered-down idle time. Single-user intermittent use can cost far more per token, and batching may add latency. Ratios compare the larger cost to the smaller one and are rounded to one decimal; “about the same” is used below a 1.05 ratio. No ratio is forced to favour self-hosting.

## Release boundary

This UI revision adds no scheduler or Computer automation. It does not modify the existing production retention schedule, applicant data or PHP endpoint. The estimates should be replaced by reproducible, per-model measurements when sufficient evidence is available.
