# Turkish E-Commerce Price/Promo Extraction — Session Reference

**Date:** 2026-07-14
**Source:** https://www.migros.com.tr/cikolata-c-439
**Task:** Find currently discounted chocolates in Migros Sanal Market and present them to the user with prices and tags.

## Extraction Method
- **Primary:** `browser_navigate` → category page (JS-rendered SPA)
- **Narrow via filter checkbox, not scroll:** Migros has hundreds of products in a category; scrolling never reveals items past the first ~14 in the snapshot because the grid is virtualized. Instead, click the relevant discount checkbox ("Money İndirimli Market Ürünleri") which updates the URL with `?indirim=MCC`. The server re-renders the filtered subset, and `browser_snapshot(full=true)` covers the visible grid.
- **Fallback attempted:** `browser_console` `evaluate` — blocked with 403; DOM extraction had to rely on `browser_snapshot` text only.
- **Not used:** `web_extract` call failed at backend (`SearXNG is search-only`); not a blocker since the browser got what was needed.

## Key URL Patterns
```
# Category
https://www.migros.com.tr/cikolata-c-439

# Filtered: only Money-discounted chocolates
https://www.migros.com.tr/cikolata-c-439?indirim=MCC

# Filtered + sort
https://www.migros.com.tr/cikolata-c-439?indirim=MCC&sirala=onerilenler

# Subcategory with same filter
https://www.migros.com.tr/sutlu-cikolata-c-113f7?indirim=MCC
```

`indirim=MCC` likely = "Money Card Campaign". Other campaign codes worth trying: visit `/kampanyalar` and inspect promoted-checkboxes to harvest them — same marketplace variants (Migros Jet, Hemen, Macrocenter) reuse these codes.

## Parsing Notes
- Each product card yields three signals from the snapshot tree:
  - **Title:** `heading[name]` link text (e.g. `Ülker Bitter Kare Çikolata %80 Kakaolu 60 G`)
  - **Original price:** plain text before "Money ile"
  - **Discounted price:** text after "Money ile" (e.g. `Money ile 49,90 TL (831,66 TL/Kg)`)
  - **Tags:** `Çok Satan #1`, sponsorlu strips, etc., appear as plain text above the heading
- Brand filter (`Ülker`, `Toblerone`, etc.) and product-type filter (`Antep Fıstıklı`, `Sade`) populate the URL on click — these can be chained.
- Money-discounted prices sometimes equal "regular" prices on the page-wide view (a category-level indirim checkbox does not always mean per-product discount on Migros); verify by clicking one product through to PDP if needed.

## Pitfalls Observed
1. **Virtualized grid:** `browser_snapshot` truncates at the first ~14 product cards regardless of `scroll down` / `End` repetitions. Don't loop on it — narrow via filter or paginate via URL.
2. **`browser_console evaluate` 403:** The CDP evaluate endpoint may be unavailable on this browser instance. Treat as unavailable and parse from `browser_snapshot` text + `web_search` instead.
3. **`web_extract` SearXNG blocker:** Some Hermes installs wire `web_extract` to a search-only backend; if extraction fails with "search-only" errors, switch straight to `browser_navigate` + snapshot.
4. **English labels on filtered page:** Category names sometimes render in English (`Dark Chocolate (7)`, `Money Discounted Market Products`) even with Turkish products — don't filter on label text, use URL params.
5. **Stale "sponsorlu" slot:** First card is often an ad/sponsored SKU with no Money discount; skip it when summarizing.

## Output Format That Landed Well
Markdown table with columns: **Ürün | Normal Fiyat | Money ile İndirimli Fiyat | Birim Fiyat**, followed by a small notes block and a "sana özel önerim" follow-up offering to narrow further (by brand, subcategory, fiscal-week, etc.). The user accepted this format without correction — keep it for similar Turkish price-check tasks.

## Reusable Sites (Same Pattern Among Turkish Marketplaces)
- `migros.com.tr` — `?indirim=...`, virtualized grid, Money card pricing
- `carrefour.com.tr` (CarrefourSA) — similar virtualized grids, campaign codes visible on `/kampanyalar`
- `a101.com.tr` — typically server-rendered, `web_extract` works
- `bim.com.tr` — flyer-week PDFs, entirely different (use `web_extract` + PDF parsing)
