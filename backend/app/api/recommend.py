"""
Computational Gastronomy Recommendation API.
Conforms to §5.4, §5.6, §11, and §12.
"""
from typing import Any, Dict, List, Optional, Set
from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.core.dependencies import get_current_user_optional
from app.database import get_db
from app.models.entities import (
    Allergy,
    DietaryPreference,
    FitnessGoal,
    IngredientCompound,
    IngredientExclusion,
    NutritionTarget,
    PantryItem,
    Recipe,
    User,
)
from app.schemas.api_models import RecommendRequest
from app.services.flavordb import FlavorDBService
from app.services.gastronomy import norm
from app.services.recipedb import RecipeDBService
from app.services.recommendation import compute_unlock_suggestion, rank_recipes

router = APIRouter(prefix="/api", tags=["recommendation"])


@router.post("/recommend")
async def get_recommendations(
    req: RecommendRequest,
    user: Optional[User] = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
):
    pantry = req.ingredients or []
    user_diet = req.diet
    user_allergies = []
    user_exclusions = []
    daily_target = None

    # If user is authenticated, retrieve user constraints & pantry if empty
    if user:
        if not pantry:
            p_stmt = select(PantryItem).where(PantryItem.user_id == user.id, PantryItem.deleted_at.is_(None))
            p_res = await db.execute(p_stmt)
            pantry = [i.name for i in p_res.scalars().all()]

        # Preferences
        d_stmt = select(DietaryPreference).where(DietaryPreference.user_id == user.id)
        d_res = await db.execute(d_stmt)
        diet_row = d_res.scalar_one_or_none()
        if diet_row and (not user_diet or user_diet == "any"):
            user_diet = diet_row.lifestyle

        # Allergies
        a_stmt = select(Allergy).where(Allergy.user_id == user.id)
        a_res = await db.execute(a_stmt)
        user_allergies = [a.allergen for a in a_res.scalars().all()]

        # Exclusions
        e_stmt = select(IngredientExclusion).where(IngredientExclusion.user_id == user.id)
        e_res = await db.execute(e_stmt)
        user_exclusions = [e.ingredient_name for e in e_res.scalars().all()]

        # Targets
        t_stmt = select(NutritionTarget).where(NutritionTarget.user_id == user.id)
        t_res = await db.execute(t_stmt)
        t_row = t_res.scalar_one_or_none()
        if t_row:
            daily_target = {
                "target_calories_kcal": t_row.target_calories_kcal,
                "target_protein_g": t_row.target_protein_g,
                "target_carbs_g": t_row.target_carbs_g,
                "target_fat_g": t_row.target_fat_g,
            }

    # Fetch candidate recipes from database
    stmt = select(Recipe).options(selectinload(Recipe.ingredients), selectinload(Recipe.instructions))
    res = await db.execute(stmt)
    db_recipes = res.scalars().all()

    candidates: List[Dict[str, Any]] = [
        {
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
            "source": r.source,
            "ingredients": [i.name for i in r.ingredients],
            "utensils": r.utensils,
        }
        for r in db_recipes
    ]

    # Load ingredient compound map for flavour pairing
    comp_stmt = select(IngredientCompound)
    comp_res = await db.execute(comp_stmt)
    flavor_compound_map: Dict[str, Set[str]] = {}
    for ic in comp_res.scalars().all():
        flavor_compound_map.setdefault(norm(ic.ingredient_name), set()).add(ic.compound_name.lower())

    # Rank recipes
    ranked = rank_recipes(
        recipes=candidates,
        pantry=pantry,
        user_diet=user_diet,
        user_allergies=user_allergies,
        user_exclusions=user_exclusions,
        max_minutes=req.minutes,
        daily_target=daily_target,
        slot=req.slot,
        flavor_compound_map=flavor_compound_map,
        top_k=req.top_k,
    )

    unlock = compute_unlock_suggestion(ranked, pantry)

    return {
        "pantry": pantry,
        "count": len(ranked),
        "recipes": ranked,
        "unlock": unlock,
        "source": "recipedb_live" if any(r.get("source") == "recipedb_live" for r in ranked) else "demo",
    }


@router.get("/substitute")
async def get_ingredient_substitute(ingredient: str, db: AsyncSession = Depends(get_db)):
    """Find flavour-match substitutes based on shared volatile molecules."""
    ing_clean = ingredient.strip().lower()
    flavordb = FlavorDBService(db)
    compounds = await flavordb.get_ingredient_compounds(ing_clean)
    if not compounds:
        return {"ingredient": ing_clean, "substitutes": []}

    my_comps = {c["name"].lower() for c in compounds}

    # Find other ingredients in DB sharing compounds
    stmt = select(IngredientCompound).where(IngredientCompound.ingredient_name != ing_clean)
    res = await db.execute(stmt)
    all_compounds = res.scalars().all()

    overlap_map: Dict[str, int] = {}
    for row in all_compounds:
        if row.compound_name.lower() in my_comps:
            overlap_map[row.ingredient_name] = overlap_map.get(row.ingredient_name, 0) + 1

    sorted_subs = sorted(overlap_map.items(), key=lambda x: x[1], reverse=True)[:4]
    return {
        "ingredient": ing_clean,
        "shared_compound_count": len(my_comps),
        "substitutes": [
            {"name": name.title(), "shared_compounds": count}
            for name, count in sorted_subs
        ]
    }
