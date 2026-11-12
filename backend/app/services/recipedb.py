"""
Async RecipeDB Client with database-backed ExternalCache, budget limits, and local database fallback.
Adheres to §5.5, §12, and D5.
"""
from datetime import datetime, timezone
import json
import logging
from typing import Any, Dict, List, Optional
import uuid
import httpx
from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.config import get_settings
from app.models.entities import ExternalCache, Recipe, RecipeIngredient, RecipeInstruction

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
        """Search recipes containing given ingredients via Foodoscope RecipeDB or local database fallback."""
        if not ingredients:
            return []

        cleaned = [i.strip().lower() for i in ingredients if i.strip()]
        cache_key = f"recipedb:by_ing:{','.join(sorted(cleaned))}"
        cached = await self._get_cache(cache_key)
        if cached is not None:
            return cached.get("recipes", [])

        # 1. Try Live Foodoscope API call if key configured
        if self.api_key and _calls["n"] < settings.FOODOSCOPE_MAX_CALLS:
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
                        if recipes:
                            await self._set_cache(cache_key, {"recipes": recipes})
                            return recipes
                    elif resp.status_code == 404:
                        await self._set_cache(cache_key, {"recipes": []}, is_miss=True)
                    else:
                        logger.warning(f"Foodoscope RecipeDB HTTP {resp.status_code}: {resp.text[:100]}; falling back to database catalog")
            except Exception as e:
                logger.error(f"RecipeDB live fetch error: {e}")

        # 2. Local Database Catalog Fallback
        return await self._fallback_local_search(cleaned)

    async def _fallback_local_search(self, ingredients: List[str]) -> List[Dict[str, Any]]:
        """Query PostgreSQL Recipe repository for matching recipes."""
        stmt = (
            select(Recipe)
            .options(selectinload(Recipe.ingredients), selectinload(Recipe.instructions))
        )
        res = await self.db.execute(stmt)
        all_recipes = res.scalars().all()

        ing_set = set(ingredients)
        matched = []
        for r in all_recipes:
            r_ings = {i.name.lower() for i in r.ingredients}
            overlap = ing_set.intersection(r_ings)
            if overlap or not ingredients:
                matched.append({
                    "id": str(r.id),
                    "title": r.title,
                    "cuisine": r.cuisine,
                    "diet": r.diet,
                    "minutes": r.minutes,
                    "servings": r.servings,
                    "calories": r.calories,
                    "protein_g": r.protein_g,
                    "carbs_g": r.carbs_g,
                    "fat_g": r.fat_g,
                    "fiber_g": r.fiber_g,
                    "ingredients": [i.name for i in r.ingredients],
                    "instructions": [ins.instruction for ins in r.instructions],
                    "source": "database_catalog"
                })
        return matched

    async def get_instructions(self, recipe_id: str) -> List[str]:
        """Fetch step-by-step cooking method."""
        cache_key = f"recipedb:instructions:{recipe_id}"
        cached = await self._get_cache(cache_key)
        if cached is not None:
            return cached.get("steps", [])

        # Check local database if valid UUID
        try:
            rid = uuid.UUID(recipe_id)
            stmt = select(RecipeInstruction).where(RecipeInstruction.recipe_id == rid).order_by(RecipeInstruction.step_number)
            res = await self.db.execute(stmt)
            steps = [ins.instruction for ins in res.scalars().all()]
            if steps:
                return steps
        except (ValueError, TypeError):
            pass

        # Try Foodoscope API
        if self.api_key and _calls["n"] < settings.FOODOSCOPE_MAX_CALLS:
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
                        if steps:
                            await self._set_cache(cache_key, {"steps": steps})
                            return steps
                    elif resp.status_code == 404:
                        await self._set_cache(cache_key, {"steps": []}, is_miss=True)
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

            # Parse calories and macros if available from Foodoscope
            cal = float(r.get("calories") or r.get("energy_kcal") or r.get("Energy (kcal)") or 350.0)
            pro = float(r.get("protein_g") or r.get("protein") or r.get("Protein (g)") or 15.0)
            carb = float(r.get("carbs_g") or r.get("carbs") or r.get("Carbohydrate, by difference (g)") or 40.0)
            fat = float(r.get("fat_g") or r.get("fat") or r.get("Total lipid (fat) (g)") or 12.0)
            fib = float(r.get("fiber_g") or r.get("fiber") or 4.0)

            results.append({
                "id": rid,
                "title": title,
                "cuisine": r.get("cuisine", "Global"),
                "diet": r.get("diet", "any"),
                "minutes": int(r.get("cook_time") or r.get("total_time") or 30),
                "servings": int(r.get("servings") or 2),
                "calories": cal,
                "protein_g": pro,
                "carbs_g": carb,
                "fat_g": fat,
                "fiber_g": fib,
                "ingredients": ings,
                "source": "foodoscope_live"
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
