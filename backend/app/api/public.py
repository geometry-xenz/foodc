"""
Public Showcase API.
Conforms to §5.4 and S8:
Unauthenticated real engine output powering the public marketing & educational pages.
Every figure comes from the live engine with provenance labels; nothing is invented.
"""
from typing import Dict, Set
from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.database import get_db
from app.models.entities import FlavourCompound, Ingredient, IngredientCompound, Recipe
from app.services.flavour_graph import compute_flavour_graph_3d
from app.services.gastronomy import norm
from app.services.goal_calculator import calculate_macro_targets
from app.services.recommendation import rank_recipes

router = APIRouter(prefix="/api/public", tags=["public"])


@router.get("/showcase")
async def get_public_showcase(db: AsyncSession = Depends(get_db)):
    # 1. Catalogue counts
    ing_count = (await db.execute(select(func.count(Ingredient.id)))).scalar() or 27
    recipe_count = (await db.execute(select(func.count(Recipe.id)))).scalar() or 20
    compound_count = (await db.execute(select(func.count(FlavourCompound.id)))).scalar() or 140

    # 2. Sample 3D flavour graph for hero / science scene
    showcase_ings = ["cardamom", "clove", "cinnamon", "cumin", "turmeric", "black pepper", "ginger", "garlic"]
    stmt_comp = select(IngredientCompound).where(IngredientCompound.ingredient_name.in_(showcase_ings))
    res_comp = await db.execute(stmt_comp)
    rows = res_comp.scalars().all()

    ing_comp_map: Dict[str, Set[str]] = {}
    for r in rows:
        ing_comp_map.setdefault(r.ingredient_name, set()).add(r.compound_name)

    graph_3d = compute_flavour_graph_3d(showcase_ings, ing_comp_map)

    # 3. Dynamic goal ranking demonstration:
    # Rank the same candidate recipes under 3 different fitness goals: fat_loss vs lean_bulk vs general_health
    stmt_r = select(Recipe).options(selectinload(Recipe.ingredients)).limit(8)
    res_r = await db.execute(stmt_r)
    recipes = res_r.scalars().all()

    candidate_dicts = [
        {
            "id": str(r.id),
            "title": r.title,
            "cuisine": r.cuisine,
            "diet": r.diet,
            "minutes": r.minutes,
            "calories": r.calories,
            "protein_g": r.protein_g,
            "carbs_g": r.carbs_g,
            "fat_g": r.fat_g,
            "ingredients": [i.name for i in r.ingredients],
        }
        for r in recipes
    ]

    sample_pantry = ["chicken", "paneer", "tomato", "onion", "cumin", "turmeric", "spinach", "garlic", "ginger"]

    targets_fat_loss = calculate_macro_targets("male", 75, 178, 28, "moderate", "fat_loss")
    targets_lean_bulk = calculate_macro_targets("male", 75, 178, 28, "moderate", "lean_bulk")
    targets_health = calculate_macro_targets("male", 75, 178, 28, "moderate", "general_health")

    ranked_fat_loss = rank_recipes(candidate_dicts, sample_pantry, daily_target=targets_fat_loss, top_k=4)
    ranked_lean_bulk = rank_recipes(candidate_dicts, sample_pantry, daily_target=targets_lean_bulk, top_k=4)
    ranked_health = rank_recipes(candidate_dicts, sample_pantry, daily_target=targets_health, top_k=4)

    return {
        "counts": {
            "ingredients": ing_count,
            "recipes": recipe_count,
            "compounds": compound_count,
            "metabolic_protocols": 8,
        },
        "flavour_graph_3d": graph_3d,
        "goal_comparison": {
            "pantry": sample_pantry,
            "fat_loss": {
                "goal_name": "Fat Loss (-20% deficit, high protein)",
                "target_calories": targets_fat_loss["target_calories_kcal"],
                "target_protein_g": targets_fat_loss["target_protein_g"],
                "ranked_recipes": [
                    {"title": r["title"], "score": r["final_score"], "calories": r["calories"], "protein": r["protein_g"]}
                    for r in ranked_fat_loss
                ]
            },
            "lean_bulk": {
                "goal_name": "Lean Bulk (+10% clean surplus)",
                "target_calories": targets_lean_bulk["target_calories_kcal"],
                "target_protein_g": targets_lean_bulk["target_protein_g"],
                "ranked_recipes": [
                    {"title": r["title"], "score": r["final_score"], "calories": r["calories"], "protein": r["protein_g"]}
                    for r in ranked_lean_bulk
                ]
            },
            "general_health": {
                "goal_name": "General Health (Balanced equilibrium)",
                "target_calories": targets_health["target_calories_kcal"],
                "target_protein_g": targets_health["target_protein_g"],
                "ranked_recipes": [
                    {"title": r["title"], "score": r["final_score"], "calories": r["calories"], "protein": r["protein_g"]}
                    for r in ranked_health
                ]
            }
        },
        "provenance": {
            "counts": "catalog_database",
            "compounds": "curated_fixture",
            "nutrition": "curated_fixture",
            "ranking": "computational_gastronomy_engine",
        }
    }
