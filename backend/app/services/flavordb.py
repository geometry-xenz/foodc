"""
Async FlavorDB Client & Molecular Aroma Network.
Computes volatile compound overlap and chemical pairings.
Adheres to §5.4, §12, and D5.
"""
from datetime import datetime, timezone
import json
import logging
from typing import Any, Dict, List, Optional, Set
import httpx
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.config import get_settings
from app.models.entities import ExternalCache, FlavourCompound, IngredientCompound

logger = logging.getLogger("drishyam.flavordb")
settings = get_settings()

_calls = {"n": 0}


class FlavorDBService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.api_key = settings.FOODOSCOPE_API_KEY
        self.base_url = settings.FOODOSCOPE_FLAVORDB_BASE.rstrip("/")
        self.timeout = settings.FOODOSCOPE_TIMEOUT

    async def get_ingredient_compounds(self, ingredient: str) -> List[Dict[str, Any]]:
        """Return volatile aroma compounds for an ingredient."""
        ing_clean = ingredient.strip().lower()
        if not ing_clean:
            return []

        # Check local database first
        stmt = select(IngredientCompound).where(IngredientCompound.ingredient_name == ing_clean)
        res = await self.db.execute(stmt)
        rows = res.scalars().all()
        if rows:
            return [{"name": r.compound_name, "pubchem_id": r.pubchem_id} for r in rows]

        # Check cache
        cache_key = f"flavordb:compounds:{ing_clean}"
        stmt_c = select(ExternalCache).where(ExternalCache.cache_key == cache_key)
        res_c = await self.db.execute(stmt_c)
        cached = res_c.scalar_one_or_none()
        if cached:
            return cached.payload.get("compounds", [])

        # Live call to FlavorDB if available
        if not self.api_key or _calls["n"] >= settings.FOODOSCOPE_MAX_CALLS:
            return []

        # Step 1: get entity id by readable alias
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "ApiKey": self.api_key,
            "Accept": "application/json"
        }
        try:
            _calls["n"] += 1
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                r1 = await client.get(
                    f"{self.base_url}/entities/by-entity-alias-readable",
                    headers=headers,
                    params={"entity_alias_readable": ing_clean}
                )
                if r1.status_code != 200:
                    return []
                data1 = r1.json()
                entity_id = self._extract_entity_id(data1)
                if not entity_id:
                    return []

                # Step 2: fetch compact molecules
                _calls["n"] += 1
                r2 = await client.get(
                    f"{self.base_url}/entities/by-id/{entity_id}/molecules-compact",
                    headers=headers
                )
                if r2.status_code == 200:
                    compounds = self._extract_molecules(r2.json())
                    # Cache in DB
                    for comp in compounds:
                        ic = IngredientCompound(
                            ingredient_name=ing_clean,
                            compound_name=comp["name"],
                            pubchem_id=comp.get("pubchem_id")
                        )
                        self.db.add(ic)
                    await self.db.flush()
                    return compounds
        except Exception as e:
            logger.error(f"FlavorDB fetch error for {ing_clean}: {e}")

        return []

    async def shared_compounds(self, ing_a: str, ing_b: str) -> List[str]:
        """Compute intersection of aroma compounds between two ingredients."""
        comp_a = await self.get_ingredient_compounds(ing_a)
        comp_b = await self.get_ingredient_compounds(ing_b)

        names_a = {c["name"].lower() for c in comp_a if "name" in c}
        names_b = {c["name"].lower() for c in comp_b if "name" in c}
        return list(names_a.intersection(names_b))

    def _extract_entity_id(self, data: Any) -> Optional[int]:
        if isinstance(data, dict):
            if "entity_id" in data:
                return data["entity_id"]
            if "id" in data:
                return data["id"]
            for val in data.values():
                if isinstance(val, dict) and "entity_id" in val:
                    return val["entity_id"]
        return None

    def _extract_molecules(self, data: Any) -> List[Dict[str, Any]]:
        raw_list = []
        if isinstance(data, list):
            raw_list = data
        elif isinstance(data, dict):
            for k in ("molecules", "compounds", "data"):
                if isinstance(data.get(k), list):
                    raw_list = data[k]
                    break

        molecules = []
        for item in raw_list:
            if isinstance(item, dict):
                name = item.get("common_name") or item.get("name") or item.get("compound_name")
                if name:
                    molecules.append({
                        "name": str(name).strip(),
                        "pubchem_id": item.get("pubchem_id")
                    })
        return molecules
