# Config YAML vs JSON String Pitfall

## Problem
A configuration value that should be a YAML list was stored as a JSON-encoded string, causing silent failures when code checked `isinstance(value, list)`.

## Specific Case: Hermes Agent `model.favorites`

### Symptom
The "★ Favoriler" (favorites) section didn't appear in the `/model` picker.

### Root Cause Investigation
1. **Error/Symptom**: Favorites tab missing from model picker UI
2. **Code Trace**:
   - `_load_favorites()` in `hermes_cli/model_switch.py:339` checks `if isinstance(fav_list, list):`
   - `load_config()` in `hermes_cli/config.py` loads YAML
   - Config file had `favorites: '[{"model": "..."}]'` (JSON string)

### Evidence
```bash
# Before fix
python3 -c "
import yaml
with open('/home/abc/.hermes/config.yaml') as f:
    config = yaml.safe_load(f)
print(type(config['model']['favorites']))  # <class 'str'>
"

# After fix
python3 -c "
import yaml
with open('/home/abc/.hermes/config.yaml') as f:
    config = yaml.safe_load(f)
print(type(config['model']['favorites']))  # <class 'list'>
"
```

### Fix
Convert JSON string to proper YAML list in config.yaml:

```yaml
# BROKEN (JSON string)
model:
  favorites: '[{"model": "...", "provider": "...", "label": "..."}]'

# FIXED (YAML list)
model:
  favorites:
    - model: "..."
      provider: "..."
      label: "..."
    - model: "..."
      provider: "..."
      label: "..."
```

### Verification
```python
from hermes_cli.model_switch import _load_favorites
favs = _load_favorites()
print(len(favs))  # Should be > 0
```

## Lesson
When editing YAML configs programmatically (via `hermes config set` or similar), ensure the value is written as native YAML structure, not as a JSON string. The YAML parser will parse JSON strings as strings, not as lists/objects.

## Commands to Avoid This
```bash
# Use hermes config set for proper YAML serialization
hermes config set model.favorites '[{"model": "...", "provider": "...", "label": "..."}]'

# Then verify with python
python3 -c "import yaml; print(type(yaml.safe_load(open('config.yaml'))['model']['favorites']))"
```