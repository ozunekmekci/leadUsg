---
name: hermes-model-picker-customization
description: "Patterns for customizing Hermes Agent model pickers (CLI /model picker, in-session /model modal, gateway pickers) — adding sections, custom flows, and provider handling."
version: 1.0.0
author: Hermes Agent
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [hermes, model-picker, favorites, customization, cli, gateway]
    related_skills: [hermes-agent]
---

# Hermes Model Picker Customization

This skill documents patterns for extending the Hermes Agent model picker UI — both the interactive CLI picker (`hermes model`), the in-session `/model` modal, and gateway platform pickers.

## Architecture

---

## Architecture Overview

Hermes has **two distinct model pickers** that share a common data pipeline:

| Picker | Entry Point | UI Framework | Key Files |
|--------|-------------|--------------|-----------|
| **CLI `hermes model`** | `cmd_model()` → `select_provider_and_model()` | curses (with numbered fallback) | `hermes_cli/main.py`, `hermes_cli/model_setup_flows.py` |
| **In-session `/model`** | `_handle_model_switch()` → `_open_model_picker()` | prompt_toolkit modal | `cli.py`, `hermes_cli/inventory.py`, `hermes_cli/model_switch.py` |
| **Gateway/Telegram** | `/model` command | Platform-specific keyboards | Uses `build_models_payload()` from inventory |

Both pickers consume **`build_models_payload(ctx)`** from `hermes_cli/inventory.py`, which calls `list_authenticated_providers()` from `model_switch.py`.

## Adding a New Top-Level Section (e.g., Favorites)

### 1. Load Config Data (`model_switch.py`)

Add a loader function that reads from `config.yaml`:

```python
def _load_favorites() -> list[dict]:
    """Load favorite models from config.yaml ``model.favorites:`` section.

    Config format::

        model:
          favorites:
            - model: "provider/model-id"
              provider: "provider-slug"
              label: "Display Name"
              base_url: "https://optional.custom.endpoint/v1"  # optional

    Returns list of dicts with keys: model, provider, label, base_url.
    """
    favorites = []
    try:
        from hermes_cli.config import load_config
        cfg = load_config()
        model_section = cfg.get("model", {})
        if isinstance(model_section, dict):
            fav_list = model_section.get("favorites")
            if isinstance(fav_list, list):
                for item in fav_list:
                    if not isinstance(item, dict):
                        continue
                    model = item.get("model", "").strip()
                    provider = item.get("provider", "").strip()
                    if not model or not provider:
                        continue
                    label = item.get("label", "").strip() or f"{provider}/{model}"
                    base_url = item.get("base_url", "").strip() or ""
                    favorites.append({
                        "model": model,
                        "provider": provider,
                        "label": label,
                        "base_url": base_url,
                    })
    except Exception:
        pass
    return favorites
```

### 2. Inject into Provider Payload (`inventory.py`)

In `build_models_payload()`, insert the favorites row **before** other providers:

```python
# After moa_row injection, before explicit_only filtering
favorites = _load_favorites()
if favorites:
    favorites_row = {
        "slug": "favorites",
        "name": "★ Favoriler",
        "is_current": False,
        "is_user_defined": False,
        "models": [fav["model"] for fav in favorites],
        "total_models": len(favorites),
        "source": "favorites",
        "_favorites_data": favorites,  # preserve full data for later use
    }
    rows = [favorites_row] + rows
```

### 3. Handle Selection in In-Session Picker (`cli.py`)

In `_handle_model_picker_selection()`, when user selects the favorites row:

```python
if stage == "provider":
    provider_data = providers[selected]
    # Handle favorites: show favorite models directly
    if provider_data.get("slug") == "favorites":
        favs = provider_data.get("_favorites_data") or []
        state["stage"] = "model"
        state["provider_data"] = {"slug": "favorites", "name": "★ Favoriler"}
        state["model_list"] = [fav["model"] for fav in favs]
        state["selected"] = 0
        self._invalidate(min_interval=0.0)
        return
    # ... normal provider handling
```

**Critical:** When user picks a model from favorites, resolve the actual provider:

```python
if selected < len(model_list):
    chosen_model = model_list[selected]
    explicit_provider = provider_data.get("slug")
    if explicit_provider == "favorites":
        favs = provider_data.get("_favorites_data") or state.get("user_provs") or []
        fav_entry = next((f for f in favs if f.get("model") == chosen_model), None)
        if fav_entry:
            explicit_provider = fav_entry.get("provider")
    result = switch_model(..., explicit_provider=explicit_provider, ...)
```

### 4. Handle Selection in CLI Picker (`main.py`)

In `select_provider_and_model()`:

```python
# Add to ordered list before grouped providers
favorites = _load_favorites()
if favorites:
    ordered.append(("favorites", "★ Favoriler", []))
    # Set as default if nothing else selected
    if default_idx == 0:
        default_idx = len(ordered) - 1

# ... later in dispatch ...
if selected_provider == "favorites":
    _model_flow_favorites(config, current_model, favorites)
    return
```

### 5. Implement Flow (`model_setup_flows.py`)

```python
def _model_flow_favorites(config, current_model=""):
    """Flow for selecting a favorite model from config.yaml model.favorites."""
    from hermes_cli.auth import _prompt_model_selection, _save_model_choice, deactivate_provider
    from hermes_cli.config import load_config, save_config

    favorites = _load_favorites()
    if not favorites:
        print("No favorites configured in config.yaml under model.favorites")
        return

    model_choices = [fav["model"] for fav in favorites]
    labels = [fav["label"] for fav in favorites]

    selected = _prompt_model_selection(
        model_choices,
        current_model=current_model,
        labels=labels,
        confirm_provider="favorites",
    )
    if not selected:
        print("No change.")
        return

    fav_entry = next((f for f in favorites if f["model"] == selected), None)
    if not fav_entry:
        print("No change.")
        return

    _save_model_choice(selected)

    cfg = load_config()
    model = cfg.get("model")
    if not isinstance(model, dict):
        model = {"default": model} if model else {}
        cfg["model"] = model
    model["provider"] = fav_entry["provider"]
    if fav_entry.get("base_url"):
        model["base_url"] = fav_entry["base_url"]
    clear_model_endpoint_credentials(model, clear_api_mode=False)
    save_config(cfg)
    deactivate_provider()

    print(f"Default model set to: {selected} (via {fav_entry['provider']})")
```

## Key Pitfalls

1. **Provider Resolution**: The favorites slug `"favorites"` is NOT a real provider. Always resolve the actual provider from the favorite entry when calling `switch_model()`.

2. **Config Structure**: The `model.favorites` section lives **inside** `model:`, not at root level. Use `cfg.get("model", {}).get("favorites")`.

3. **Dual Picker Sync**: Both CLI and in-session pickers use `build_models_payload()` — modify there for consistency.

4. **Custom Endpoint Support**: Include optional `base_url` in favorite entries for custom providers.

5. **Import Cycles**: `model_setup_flows.py` imports `_load_favorites` from `model_switch.py` — keep the loader in `model_switch.py` to avoid cycles.

## Testing

Run model-related tests:

```bash
# Gateway model command tests
uv run pytest tests/gateway/test_model_command*.py -v

# CLI model tests
uv run pytest tests/hermes_cli/ -k "model" -v

# Inventory tests
uv run pytest tests/hermes_cli/test_inventory.py -v
```

## Config Example

```yaml
model:
  default: "nvidia/nemotron-3-ultra-550b-a55b"
  provider: "custom:nvidia-nim-api"
  favorites:
    - model: "nvidia/nemotron-3-ultra-550b-a55b"
      provider: "custom:nvidia-nim-api"
      label: "Nemotron 3 Ultra 550B"
    - model: "z-ai/glm-5.2"
      provider: "custom:nvidia-nim-api"
      label: "GLM 5.2"
    - model: "minimax/m3"
      provider: "custom:nvidia-nim-api"
      label: "MiniMax M3"
    - model: "minimax/m2.7"
      provider: "custom:nvidia-nim-api"
      label: "MiniMax M2.7"
    - model: "deepseek/deepseek-v4-flash"
      provider: "custom:nvidia-nim-api"
      label: "DeepSeek V4 Flash"
    - model: "deepseek/deepseek-v4-pro"
      provider: "custom:nvidia-nim-api"
      label: "DeepSeek V4 Pro"
    - model: "qwen/qwen3.5-397b-a17b"
      provider: "custom:nvidia-nim-api"
      label: "Qwen 3.5 397B"
```