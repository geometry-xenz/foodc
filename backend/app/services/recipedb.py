"""
Async RecipeDB Client with database-backed ExternalCache, budget limits, and offline fallback.
Adheres to §5.5, §12, and D5.
"""
from datetime import datetime, timezone
import json
import logging
from typing import Any, Dict, List, Optional
import httpx
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.config import get_settings
from app.models.entities import ExternalCache

logger = logging.getLogger("drishyam.recipedb")
settings = get_settings()

_calls = {"n": 0}


class RecipeDBService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.api_key = settings.FOODOSCOPE_API_KEY
        self.base_url = settings.FOODOSCOPE_RECIPEDB_BASE.rstrip("/")
        self.timeout = settings.FOODOSCOPE_TIMEOUT

    async def _get_cache(self, key: str) -> Optional[dict]:
        stmt = select(ExternalCache).where(ExternalCache.cache_key == key)
        res = await self.db.execute(stmt)
        cached = res.scalar_one_or_none()
        if cached:
            # Check TTL
            age = (datetime.now(timezone.utc) - cached.fetched_at).total_seconds()
            if age < settings.FOODOSCOPE_CACHE_TTL:
                if cached.is_miss:
                    return None
                return cached.payload
        return None

    async def _set_cache(self, key: str, payload: dict, is_miss: bool = False):
        stmt = select(ExternalCache).where(ExternalCache.cache_key == key)
        res = await self.db.execute(stmt)
        existing = res.scalar_one_or_none()
        now = datetime.now(timezone.utc)
        if existing:
            existing.payload = payload
            existing.is_miss = is_miss
            existing.fetched_at = now
        else:
            new_entry = ExternalCache(
                cache_key=key,
                payload=payload,
                is_miss=is_miss,
                fetched_at=now
            )
            self.db.add(new_entry)
        await self.db.flush()

    async def search_by_ingredients(self, ingredients: List[str]) -> List[Dict[str, Any]]:
        """Search recipes containing given ingredients."""
        if not ingredients:
            return []

        cleaned = [i.strip().lower() for i in ingredients if i.strip()]
        cache_key = f"recipedb:by_ing:{','.join(sorted(cleaned))}"
        cached = await self._get_cache(cache_key)
        if cached is not None:
            return cached.get("recipes", [])

        # Live API call
        if not self.api_key or _calls["n"] >= settings.FOODOSCOPE_MAX_CALLS:
            logger.info("Foodoscope API key missing or budget exceeded; using fallback")
            return []

        url = f"{self.base_url}/recipe2-api/recipebyingredient/by-ingredients-categories-title"
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "ApiKey": self.api_key,
            "Accept": "application/json"
        }
        params = {"includeIngredients": ",".join(cleaned)}

        try:
            _calls["n"] += 1
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                resp = await client.get(url, headers=headers, params=params)
                if resp.status_code == 200:
                    data = resp.json()
                    recipes = self._extract_recipes(data)
                    await self._set_cache(cache_key, {"recipes": recipes})
                    return recipes
                elif resp.status_code == 404:
                    await self._set_cache(cache_key, {"recipes": []}, is_miss=True)
                    return []
                else:
                    logger.warning(f"RecipeDB HTTP {resp.status_code}: {resp.text[:100]}")
                    return []
        except Exception as e:
            logger.error(f"RecipeDB fetch error: {e}")
            return []

    async def get_instructions(self, recipe_id: str) -> List[str]:
        """Fetch step-by-step cooking method."""
        cache_key = f"recipedb:instructions:{recipe_id}"
        cached = await self._get_cache(cache_key)
        if cached is not None:
            return cached.get("steps", [])

        if not self.api_key or _calls["n"] >= settings.FOODOSCOPE_MAX_CALLS:
            return []

        url = f"{self.base_url}/recipe2-api/instructions/{recipe_id}"
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "ApiKey": self.api_key,
        }
        try:
            _calls["n"] += 1
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                resp = await client.get(url, headers=headers)
                if resp.status_code == 200:
                    data = resp.json()
                    steps = self._extract_instructions(data)
                    await self._set_cache(cache_key, {"steps": steps})
                    return steps
                elif resp.status_code == 404:
                    await self._set_cache(cache_key, {"steps": []}, is_miss=True)
                    return []
        except Exception as e:
            logger.error(f"RecipeDB instructions error: {e}")
        return []

    def _extract_recipes(self, data: Any) -> List[Dict[str, Any]]:
        raw_list = []
        if isinstance(data, list):
            raw_list = data
        elif isinstance(data, dict):
            for k in ("data", "recipes", "payload", "results"):
                if isinstance(data.get(k), list):
                    raw_list = data[k]
                    break
        
        results = []
        for r in raw_list:
            if not isinstance(r, dict):
                continue
            title = r.get("title") or r.get("recipe_title") or r.get("name") or "Untitled"
            rid = str(r.get("recipe_id") or r.get("id") or "")
            ings = []
            for item in r.get("ingredients", []) or r.get("ingredient_list", []):
                if isinstance(item, str):
                    ings.append(item.lower().strip())
                elif isinstance(item, dict) and "name" in item:
                    ings.append(str(item["name"]).lower().strip())

            results.append({
                "id": rid,
                "title": title,
                "cuisine": r.get("cuisine", "Global"),
                "diet": r.get("diet", "any"),
                "minutes": int(r.get("cook_time") or r.get("total_time") or 30),
                "servings": int(r.get("servings") or 2),
                "ingredients": ings,
                "source": "recipedb_live"
            })
        return results

    def _extract_instructions(self, data: Any) -> List[str]:
        if isinstance(data, list):
            return [str(s).strip() for s in data if str(s).strip()]
        if isinstance(data, dict):
            for k in ("instructions", "steps", "data", "method"):
                val = data.get(k)
                if isinstance(val, list):
                    return [str(s).strip() for s in val if str(s).strip()]
                elif isinstance(val, str):
                    return [line.strip() for line in val.split("\n") if line.strip()]
        return []
