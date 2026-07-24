# NVIDIA NIM Preview Models Extraction — Session Reference

**Date:** 2025-07-14  
**Source:** https://build.nvidia.com/models?orderBy=weightPopular%3ADESC&filters=nimType%3Anim_type_preview  
**Total Models:** 76 (4 pages × 24/page, last page 4)

## Extraction Method
- **Primary:** `web_extract` on paginated URLs (static HTML worked, no JS rendering needed)
  - Page 1: `...&page=1` (default)
  - Page 2: `...&page=2`
  - Page 3: `...&page=3`
  - Page 4: `...&page=4`
- **Fallback attempted:** `browser_navigate` + `browser_snapshot` — worked but snapshots truncated; `web_extract` gave full markdown cheaper/faster

## Page URLs
```
https://build.nvidia.com/models?orderBy=weightPopular%3ADESC&filters=nimType%3Anim_type_preview
https://build.nvidia.com/models?orderBy=weightPopular%3ADESC&filters=nimType%3Anim_type_preview&page=2
https://build.nvidia.com/models?orderBy=weightPopular%3ADESC&filters=nimType%3Anim_type_preview&page=3
https://build.nvidia.com/models?orderBy=weightPopular%3ADESC&filters=nimType%3Anim_type_preview&page=4
```

## Parsing Notes
- Model names appear in **headings (h3)** and **link text** in the raw markdown
- First two models have explicit slugs in DOM: `nemotron-3-super-120b-a12b`, `nemotron-3-ultra-550b-a55b`
- Remaining models extracted from description text (e.g., "Qwen3-Next Instruct blends...", "DeepSeek V4 Flash is a 284B MoE...")
- Pages 3-4 contain many specialized models (bio, safety, TTS, autonomous driving) with only descriptions visible

## Output Files Created
- `~/Desktop/nvidia_nim_models.md` — full 76-model list in popularity order
- `~/Desktop/nvidia_nim_top10_analysis.md` — benchmark-based top 10 with use-case recommendations

## Benchmarks Researched (web_search)
| Model | Key Benchmarks |
|-------|----------------|
| nemotron-3-ultra-550b-a55b | MMLU-Pro 66.6, HumanEval ~85%, GPQA ~55%, AgentBench SOTA |
| deepseek-v4-flash | HumanEval ~90%, MBPP ~85%, LiveCodeBench top-tier |
| qwen3-next-80b-a3b-instruct | MMLU-Pro 78.4, MMLU-Redux 83.0, 10× throughput vs dense 32B |
| nemotron-3-super-120b-a12b | MMLU-Pro ~65%, HumanEval ~80%, strong agentic |
| glm-5.2 | MMLU ~80%, HumanEval ~80%, AgentBench SOTA |
| minimax-m2-7-230b | MMLU ~78%, HumanEval ~78% |
| qwen-3.5-vlm-400b-moe | MMMU ~68%, VQAv2 ~82% |

## Lessons Learned
1. **Try `web_extract` first** on paginated sites — often works even for "dynamic" sites if content is server-rendered
2. **Pagination via URL param** is trivial to loop; no browser automation needed
3. **Model names in descriptions** require regex/parsing; headings in DOM are cleaner but need browser
4. **File not visible on Linux desktop** = file manager cache; `xdg-open` or F5 fixes