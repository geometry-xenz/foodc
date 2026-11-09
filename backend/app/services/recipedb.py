import os
import json
import logging
from typing import Dict, Any, List, Optional
import httpx

from backend.app.config import settings
from backend.app.services.cache import cache

logger = logging.getLogger(__name__)

DATA_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "demo_dataset.json")

class RecipeDBClient:
    def __init__(self):
        self.api_key = settings.FOODOSCOPE_API_KEY
        self.base_url = settings.RECIPEDB_BASE_URL
        self._offline_recipes = self._load_offline_recipes()

    def _load_offline_recipes(self) -> List[Dict[str, Any]]:
        try:
            if os.path.exists(DATA_FILE):
                with open(DATA_FILE, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    return data.get("recipes", [])
        except Exception as e:
            logger.error(f"Error loading offline RecipeDB dataset: {e}")
        return []

    async def get_candidate_recipes(
        self,
        ingredients: List[str],
        diet: str = "any",
        max_minutes: int = 60
    ) -> List[Dict[str, Any]]:
        cache_key = f"recipedb:cand:{':'.join(sorted(ingredients))}:{diet}:{max_minutes}"
        cached = cache.get(cache_key)
        if cached:
            return cached

        # Check API if configured
        if self.api_key and not settings.OFFLINE_MODE:
            try:
                headers = {"Authorization": f"Bearer {self.api_key}"}
                url = f"{self.base_url}/recipebyingredient/by-ingredients-categories-title"
                params = {
                    "ingredients": ",".join(ingredients),
                    "diet": diet if diet != "any" else "",
                    "time": max_minutes
                }
                async with httpx.AsyncClient(timeout=4.0) as client:
                    resp = await client.get(url, params=params, headers=headers)
                    if resp.status_code == 200:
                        data = resp.json()
                        recipes = data.get("payload", {}).get("data", [])
                        if recipes:
                            cache.set(cache_key, recipes)
                            return recipes
            except Exception as e:
                logger.warning(f"RecipeDB API query failed: {e}. Falling back to offline dataset.")

        # Offline Dataset Filtering
        candidates = []
        for r in self._offline_recipes:
            # Diet filtering
            if diet != "any":
                if diet == "vegetarian" and r["diet"] not in ("vegetarian", "vegan"):
                    continue
                if diet == "vegan" and r["diet"] != "vegan":
                    continue
                if diet == "non-vegetarian" and r["diet"] != "non-vegetarian":
                    continue

            # Time filtering
            if r["total_time_minutes"] > max_minutes:
                continue

            candidates.append(r)

        cache.set(cache_key, candidates)
        return candidates

    async def get_recipe_by_id(self, recipe_id: str) -> Optional[Dict[str, Any]]:
        for r in self._offline_recipes:
            if r["recipe_id"] == recipe_id:
                return r
        return None

recipedb_client = RecipeDBClient()
