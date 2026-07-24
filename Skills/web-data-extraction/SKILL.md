---
name: web-data-extraction
description: Extract structured data from dynamic websites using browser automation — pagination handling, infinite scroll, dynamic content, and saving results to structured files.
tags: [browser, scraping, pagination, dynamic-content, data-extraction, research]
---

# Web Data Extraction Skill

## When to Use
- Target site requires JavaScript rendering (SPA, React, Vue, etc.)
- Content loads dynamically (infinite scroll, "Load More", pagination via JS)
- Need to extract structured data across multiple pages
- Simple `web_extract`/`curl` fails due to bot protection or JS requirements

## Tools & Order
1. **browser_navigate** → load initial page
2. **browser_snapshot(full=true)** → get full DOM (first page)
3. **If pagination**: detect pattern (URL param `?page=N`, "Next" button, infinite scroll)
   - URL param: loop `browser_navigate` with incremented page
   - Button: `browser_click` on "Next" → `browser_snapshot` each page
   - Infinite scroll: `browser_scroll(down)` → wait → `browser_snapshot` until no new content
4. **web_extract** as fallback for static pages (faster, cheaper)
5. **execute_code** to parse/clean/transform raw text into structured data
6. **write_file** to save results (JSON, CSV, Markdown)

## Key Patterns

### Pagination via URL Parameter
```python
# Detect pattern: ?page=1, ?page=2, etc.
for page in range(1, max_pages+1):
    url = f"{base_url}?page={page}"
    browser_navigate(url)
    snapshot = browser_snapshot(full=True)
    # parse...
```

### Pagination via "Next" Button
```python
while True:
    snapshot = browser_snapshot(full=True)
    # parse current page
    next_btn = find_element(snapshot, "Next", "Load more", ">")
    if not next_btn or next_btn.disabled:
        break
    browser_click(next_btn.ref)
    time.sleep(1)  # wait for load
```

### Infinite Scroll
```python
last_height = 0
while True:
    browser_scroll("down")
    time.sleep(1.5)
    snapshot = browser_snapshot(full=True)
    new_height = get_scroll_height(snapshot)
    if new_height == last_height:
        break
    last_height = new_height
```

## Parsing Strategy
- **Prefer**: Use `execute_code` with regex/BeautifulSoup on the raw markdown from `web_extract` or snapshot text
- Model names often in headings (`h3`, `heading[level=3]`) or link text
- Look for consistent patterns: "Model Name" + description + metrics (downloads, date, tags)
- Save raw snapshots to disk for debugging (`write_file` with `.raw.txt`)

## Output Formats
- **JSON** for programmatic use
- **CSV** for spreadsheet analysis
- **Markdown** for human-readable reports (like this session)
- Always include: source URL, extraction timestamp, page count, total items

## Pitfalls & Fixes
| Problem | Fix |
|---------|-----|
| Snapshot truncated to ~14 items even with `full=true` | `browser_snapshot` caps ~8000 chars and truncates virtualized grids. Try tighter URL filters (e.g. `?indirim=...` on Turkish marketplaces), pagination via URL param, or accept a partial capture and present the visible items cleanly. Repeating `scroll down` / `End` rarely helps on virtualized lists. |
| Bot detection / stealth warning | Use `web_extract` first; only browser if JS required. Accept lower success rate. |
| `browser_console evaluate` returns 403 / blocked | The CDP `evaluate` endpoint may be disabled on remote/debug browser instances. Fall back to DOM parsing via `browser_snapshot` text, not assume JS-hook debugging works. |
| Dynamic content not loaded | Wait after click/scroll: `time.sleep(1-2)` or poll for specific element |
| Duplicate items across pages | Deduplicate by unique key (model slug, URL, ID) in `execute_code` |
| File not visible on desktop | File exists — refresh file manager (`F5` or `xdg-open ~/Desktop/`) |

## Example Workflow (This Session)
1. `browser_navigate` to NVIDIA Build models page with filters
2. `web_extract` on pages 1-4 (static content worked, faster than browser)
3. `execute_code` to parse model names from descriptions
4. `write_file` → `~/Desktop/nvidia_nim_models.md` (full list)
5. `web_search` for benchmarks on top models
6. `execute_code` to synthesize analysis
7. `write_file` → `~/Desktop/nvidia_nim_top10_analysis.md`

## References
- `references/nvidia-nim-extraction.md` — this session's raw extraction notes
- `references/turkish-ecommerce-price-checks.md` — Migros/Turkish-marketplace pattern: virtualized grid + `?indirim=...` filter; when `browser_console evaluate` is blocked; Bing/Money-discount URL recipes