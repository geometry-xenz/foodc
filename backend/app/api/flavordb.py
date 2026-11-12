"""
FlavorDB & Molecular Graph API.
Conforms to §5.4, §5.8, and §12.
"""
from typing import List, Optional, Set
from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models.entities import IngredientCompound
from app.services.flavour_graph import compute_flavour_graph_3d
from app.services.flavordb import FlavorDBService

router = APIRouter(prefix="/api/flavour", tags=["flavour"])


@router.get("/graph")
async def get_flavour_graph_3d_endpoint(
    ingredients: Optional[str] = Query(None, description="Comma-separated ingredient list"),
    db: AsyncSession = Depends(get_db),
):
    """
    Returns deterministic 3D Fibonacci sphere coordinates for ingredients and compounds.
    """
    if ingredients:
        ing_list = [i.strip() for i in ingredients.split(",") if i.strip()]
    else:
        # Default showcase ingredients
        ing_list = ["cardamom", "cloves", "cinnamon", "cumin", "turmeric", "black pepper", "ginger", "garlic", "coriander", "mustard seeds"]

    # Load compounds for these ingredients
    stmt = select(IngredientCompound).where(IngredientCompound.ingredient_name.in_([i.lower() for i in ing_list]))
    res = await db.execute(stmt)
    rows = res.scalars().all()

    ing_comp_map = {}
    for r in rows:
        ing_comp_map.setdefault(r.ingredient_name, set()).add(r.compound_name)

    graph_data = compute_flavour_graph_3d(ing_list, ing_comp_map)
    return graph_data


# Declared last so it cannot shadow /graph.
@router.get("/{ingredient}")
async def get_ingredient_flavour_profile(ingredient: str, db: AsyncSession = Depends(get_db)):
    service = FlavorDBService(db)
    compounds = await service.get_ingredient_compounds(ingredient)
    return {
        "ingredient": ingredient,
        "compounds": compounds,
        "compound_count": len(compounds),
        # Live FlavorDB rows carry PubChem ids; seeded catalog rows do not.
        "provenance": (
            "flavordb_live" if compounds and all(c.get("pubchem_id") for c in compounds)
            else "database_catalog" if compounds else "unavailable"
        ),
    }
