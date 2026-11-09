import os
import json
import logging
from typing import Dict, Any, List, Optional
import httpx

from backend.app.config import settings
from backend.app.services.cache import cache

logger = logging.getLogger(__name__)

DATA_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "flavordb_dataset.json")

class FlavorDBClient:
    def __init__(self):
        self.api_key = settings.FOODOSCOPE_API_KEY
        self.base_url = settings.FLAVORDB_BASE_URL
        self._offline_data = self._load_offline_data()

    def _load_offline_data(self) -> Dict[str, Any]:
        try:
            if os.path.exists(DATA_FILE):
                with open(DATA_FILE, "r", encoding="utf-8") as f:
                    return json.load(f)
        except Exception as e:
            logger.error(f"Error loading offline FlavorDB dataset: {e}")
        return {"entities": {}, "substitutions": {}}

    def normalize_ingredient(self, name: str) -> str:
        raw = name.strip().lower()
        mapping = {
            "turmeric powder": "turmeric",
            "haldi": "turmeric",
            "jeera": "cumin",
            "cumin seeds": "cumin",
            "black pepper powder": "black pepper",
            "kali mirch": "black pepper",
            "pepper": "black pepper",
            "chilli powder": "red chilli",
            "red chilli powder": "red chilli",
            "chili": "red chilli",
            "coriander powder": "coriander",
            "dhaniya": "coriander",
            "clove": "cloves",
            "laung": "cloves",
            "elaichi": "cardamom",
            "green cardamom": "cardamom",
            "cinnamon stick": "cinnamon",
            "dalchini": "cinnamon",
            "garlic cloves": "garlic",
            "lasun": "garlic",
            "adrak": "ginger",
            "pyaz": "onion",
            "tamatar": "tomato",
            "rai": "mustard seeds",
            "sarson": "mustard seeds",
            "cottage cheese": "paneer",
            "dal": "lentils",
            "basmati rice": "rice",
            "chana": "chickpeas"
        }
        for k, v in mapping.items():
            if k in raw:
                return v
        return raw

    async def get_entity_profile(self, ingredient_name: str) -> Optional[Dict[str, Any]]:
        norm = self.normalize_ingredient(ingredient_name)
        cache_key = f"flavordb:entity:{norm}"
        cached = cache.get(cache_key)
        if cached:
            return cached

        # Check API if configured
        if self.api_key and not settings.OFFLINE_MODE:
            try:
                headers = {"Authorization": f"Bearer {self.api_key}"}
                url = f"{self.base_url}/entities/by-entity-alias-readable"
                async with httpx.AsyncClient(timeout=4.0) as client:
                    resp = await client.get(url, params={"alias": norm}, headers=headers)
                    if resp.status_code == 200:
                        data = resp.json()
                        cache.set(cache_key, data)
                        return data
            except Exception as e:
                logger.warning(f"FlavorDB API request failed for '{norm}': {e}. Using offline data.")

        # Fallback to local dataset
        entities = self._offline_data.get("entities", {})
        if norm in entities:
            res = entities[norm]
            cache.set(cache_key, res)
            return res

        # Fuzzy check in local dataset
        for ent_name, val in entities.items():
            if ent_name in norm or norm in ent_name:
                cache.set(cache_key, val)
                return val

        return None

    async def get_substitutions(self, ingredient_name: str) -> List[Dict[str, Any]]:
        norm = self.normalize_ingredient(ingredient_name)
        cache_key = f"flavordb:substitute:{norm}"
        cached = cache.get(cache_key)
        if cached:
            return cached

        subs = self._offline_data.get("substitutions", {}).get(norm)
        if subs:
            cache.set(cache_key, subs)
            return subs

        # Compute dynamic shared volatile compound overlap
        target_profile = await self.get_entity_profile(norm)
        if target_profile and "volatile_compounds" in target_profile:
            t_compounds = set(target_profile["volatile_compounds"])
            dynamic_subs = []
            for other_name, other_profile in self._offline_data.get("entities", {}).items():
                if other_name == norm:
                    continue
                o_compounds = set(other_profile.get("volatile_compounds", []))
                shared = t_compounds.intersection(o_compounds)
                if shared:
                    sim = round(len(shared) / max(len(t_compounds), 1), 2)
                    dynamic_subs.append({
                        "name": other_name,
                        "similarity": min(sim, 0.95),
                        "shared_compounds": list(shared),
                        "ratio": "1:1",
                        "notes": f"Shares {len(shared)} volatile flavor molecules ({', '.join(list(shared)[:3])})."
                    })
            dynamic_subs.sort(key=lambda x: x["similarity"], reverse=True)
            res = dynamic_subs[:4]
            cache.set(cache_key, res)
            return res

        return []

    async def compute_molecular_coherence(self, ingredients_a: List[str], ingredients_b: List[str]) -> float:
        """
        Calculates pairwise molecular aroma compound sharing between detected pantry items
        and recipe ingredients using FlavorDB.
        Returns a normalized score between 0.0 and 1.0.
        """
        norm_a = [self.normalize_ingredient(x) for x in ingredients_a]
        norm_b = [self.normalize_ingredient(x) for x in ingredients_b]

        profiles_a = {}
        for item in norm_a:
            p = await self.get_entity_profile(item)
            if p:
                profiles_a[item] = set(p.get("volatile_compounds", []))

        profiles_b = {}
        for item in norm_b:
            p = await self.get_entity_profile(item)
            if p:
                profiles_b[item] = set(p.get("volatile_compounds", []))

        if not profiles_a or not profiles_b:
            return 0.50 # Neutral default

        total_pairs = 0
        shared_score = 0.0

        for item_a, comps_a in profiles_a.items():
            for item_b, comps_b in profiles_b.items():
                if item_a == item_b:
                    shared_score += 1.0
                    total_pairs += 1
                    continue
                intersection = comps_a.intersection(comps_b)
                union = comps_a.union(comps_b)
                if union:
                    jaccard = len(intersection) / len(union)
                    # Synergistic boost for known Indian culinary spice combinations
                    if item_b in self._offline_data.get("entities", {}).get(item_a, {}).get("synergistic_pairs", []):
                        jaccard = max(jaccard, 0.45)
                    shared_score += min(jaccard * 2.0, 1.0)
                    total_pairs += 1

        if total_pairs == 0:
            return 0.50
        coherence = shared_score / total_pairs
        return round(min(max(coherence, 0.20), 1.0), 3)

flavordb_client = FlavorDBClient()
