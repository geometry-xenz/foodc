import os
import json
import time
import hashlib
from typing import Optional, Any
from backend.app.config import settings

class DiskCache:
    def __init__(self, cache_dir: Optional[str] = None, default_ttl: Optional[int] = None):
        self.cache_dir = cache_dir or settings.CACHE_DIR
        self.default_ttl = default_ttl or settings.CACHE_TTL
        os.makedirs(self.cache_dir, exist_ok=True)
        self.memory_store = {}

    def _get_key_hash(self, key: str) -> str:
        return hashlib.sha256(key.encode("utf-8")).hexdigest()

    def get(self, key: str) -> Optional[Any]:
        now = time.time()
        
        # Check memory cache first
        if key in self.memory_store:
            data, exp = self.memory_store[key]
            if exp > now:
                return data
            else:
                del self.memory_store[key]

        # Check disk cache
        h = self._get_key_hash(key)
        filepath = os.path.join(self.cache_dir, f"{h}.json")
        if os.path.exists(filepath):
            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    entry = json.load(f)
                if entry.get("expires_at", 0) > now:
                    val = entry.get("value")
                    self.memory_store[key] = (val, entry["expires_at"])
                    return val
                else:
                    os.remove(filepath)
            except Exception:
                pass
        return None

    def set(self, key: str, value: Any, ttl: Optional[int] = None) -> None:
        ttl = ttl if ttl is not None else self.default_ttl
        expires_at = time.time() + ttl
        self.memory_store[key] = (value, expires_at)
        
        h = self._get_key_hash(key)
        filepath = os.path.join(self.cache_dir, f"{h}.json")
        try:
            with open(filepath, "w", encoding="utf-8") as f:
                json.dump({"key": key, "expires_at": expires_at, "value": value}, f)
        except Exception:
            pass

cache = DiskCache()
