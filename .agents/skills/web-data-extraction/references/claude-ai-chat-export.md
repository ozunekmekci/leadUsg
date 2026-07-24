# Claude.ai Shared Chat Export — Session Reference

**Date:** 2026-07-15  
**Source:** https://claude.ai/share/3316de64-df33-4586-9ca8-d2e37e2d4db0  
**Task:** Extract full conversation from a shared Claude.ai chat link

## Extraction Challenges

Claude.ai shared chats are **React SPAs** with virtualized message lists:
- Initial `browser_navigate` + `browser_snapshot(full=true)` only captures the first ~10-15 messages
- Content behind "Show more" buttons is not in the initial DOM
- `browser_scroll(down)` does NOT load more messages (virtualized list, not infinite scroll)
- `browser_console evaluate` may be blocked (403) on remote browser instances

## Working Pattern for This Class of Site

### 1. Expand All Collapsed Sections First
```python
# Click "Show more" / "Show less" buttons to expand message content
snapshot = browser_snapshot()
show_more_btns = find_elements(snapshot, "Show more")
for btn in show_more_btns:
    browser_click(btn.ref)
    time.sleep(0.5)
```

### 2. Use Per-Message "Copy" Buttons (Best for Full Text)
Each message has a "Copy" button in its toolbar. Clicking copies full message text to clipboard — but we can't access clipboard. Instead:
- The button click may expand the message fully in DOM
- Re-snapshot after clicking to capture expanded text

### 3. Pagination via Message Anchors (If Available)
Some shared chats paginate; look for URL patterns like `?page=N` or message ID anchors.

### 4. Fallback: Accept Partial Capture + Note Truncation
If full extraction fails, capture what's visible and document:
- Total messages visible in snapshot
- "X more lines truncated" warning
- Provide source URL for manual retrieval

## Pitfalls Specific to Claude.ai Shares

| Problem | Observation | Workaround |
|---------|-------------|------------|
| Virtualized message list | Only ~12 messages in snapshot even after scroll | Click "Show more" on each collapsed message |
| Files hidden | "Files hidden in shared chats" banner — attachments not in DOM | User must manually download from original chat |
| `web_extract` fails | SearXNG backend is search-only | Must use browser tools |
| `browser_console evaluate` 403 | CDP evaluate endpoint blocked | Parse from snapshot text only |
| Copy button doesn't expose text | Clipboard API not accessible | Click copy → re-snapshot → parse expanded DOM |

## Output Format That Worked

Markdown file with:
- Source URL + metadata header
- Full conversation in chronological order
- Clear "CONTENT TRUNCATED" markers where snapshot cut off
- Reference to original link for manual completion

## Reusable Pattern for Similar SPA Exports

Applies to: ChatGPT shared links, Notion public pages, GitHub Gists with many files, any React virtualized list with expandable items.

**General recipe:**
1. `browser_navigate` → wait for hydration
2. `browser_snapshot` → find all "expand" / "show more" triggers
3. Click each trigger sequentially with small delays
4. Final `browser_snapshot(full=true)` → parse
5. If still truncated: document limitation, provide URL