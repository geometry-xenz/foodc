"""
Recipe Catalogue, Discovery, and History Endpoints.
Conforms to §5.4 and §11.
"""
from datetime import datetime, timezone
from typing import List, Optional
import uuid
from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.core.dependencies import get_current_user, get_current_user_optional
from app.core.exceptions import NotFoundException
from app.database import get_db
from app.models.entities import (
    Ingredient,
    IngredientCompound,
    PantryItem,
    Recipe,
    RecipeHistory,
    SavedRecipe,
    User,
)
from app.services.gastronomy import norm, score_recipe
from app.services.recipedb import RecipeDBService

router = APIRouter(prefix="/api", tags=["recipes"])


@router.get("/recipes")
async def list_recipes(
    q: Optional[str] = None,
    cuisine: Optional[str] = None,
    diet: Optional[str] = None,
    max_minutes: Optional[int] = None,
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Recipe).options(selectinload(Recipe.ingredients), selectinload(Recipe.instructions))
    if q:
        stmt = stmt.where(Recipe.title.ilike(f"%{q.strip()}%"))
    if cuisine and cuisine.lower() != "all":
        stmt = stmt.where(Recipe.cuisine.ilike(cuisine.strip()))
    if diet and diet.lower() not in ("all", "any"):
        stmt = stmt.where(Recipe.diet.ilike(diet.strip()))
    if max_minutes:
        stmt = stmt.where(Recipe.minutes <= max_minutes)

    res = await db.execute(stmt)
    recipes = res.scalars().all()
    return [
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
            "source": r.source,
            "ingredients": [i.name for i in r.ingredients],
        }
        for r in recipes
    ]


@router.get("/recipes/{recipe_id}")
async def get_recipe_detail(
    recipe_id: uuid.UUID,
    servings: Optional[int] = Query(None),
    user: Optional[User] = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
):
    stmt = (
        select(Recipe)
        .options(selectinload(Recipe.ingredients), selectinload(Recipe.instructions))
        .where(Recipe.id == recipe_id)
    )
    res = await db.execute(stmt)
    recipe = res.scalar_one_or_none()
    if not recipe:
        raise NotFoundException("Recipe not found")

    base_servings = recipe.servings
    multiplier = (servings / base_servings) if servings and servings > 0 else 1.0

    pantry_names = []
    # Log viewed event in history if authenticated
    if user:
        history = RecipeHistory(
            user_id=user.id,
            recipe_id=recipe.id,
            event_type="viewed"
        )
        db.add(history)
        await db.commit()

        p_stmt = select(PantryItem.name).where(PantryItem.user_id == user.id, PantryItem.deleted_at.is_(None))
        p_res = await db.execute(p_stmt)
        pantry_names = [norm(n) for n in p_res.scalars().all()]

    # Fetch compounds and nutrition profiles for ingredients
    ing_names = [norm(i.name) for i in recipe.ingredients]
    comp_stmt = select(IngredientCompound).where(IngredientCompound.ingredient_name.in_(ing_names))
    comp_res = await db.execute(comp_stmt)
    comp_map = {}
    for c in comp_res.scalars().all():
        comp_map.setdefault(c.ingredient_name.lower(), []).append(c.compound_name)

    cat_stmt = (
        select(Ingredient)
        .options(selectinload(Ingredient.nutrition))
        .where(Ingredient.name.in_(ing_names))
    )
    cat_res = await db.execute(cat_stmt)
    cat_map = {i.name.lower(): i for i in cat_res.scalars().all()}

    # Score recipe against pantry
    cand_dict = {
        "id": str(recipe.id),
        "title": recipe.title,
        "ingredients": [i.name for i in recipe.ingredients],
        "core_ingredients": [i.name for i in recipe.ingredients if i.is_core] or [i.name for i in recipe.ingredients[:4]],
        "calories": recipe.calories,
        "protein": recipe.protein_g,
        "carbs": recipe.carbs_g,
        "fat": recipe.fat_g,
    }
    sc, details = score_recipe(cand_dict, pantry_names)

    detailed_ingredients = []
    missing_list = []
    for i in recipe.ingredients:
        n = norm(i.name)
        is_avail = n in pantry_names or n in {"salt", "oil", "water", "sugar"}
        cat = cat_map.get(n)
        cmps = comp_map.get(n, [])
        macros = None
        if cat and cat.nutrition:
            macros = {
                "calories": round(cat.nutrition.calories, 1),
                "protein": round(cat.nutrition.protein_g, 1),
                "carbs": round(cat.nutrition.carbs_g, 1),
                "fat": round(cat.nutrition.fat_g, 1),
                "fibre": round(cat.nutrition.fiber_g, 1),
            }

        detailed_ingredients.append({
            "name": i.name,
            "displayName": i.name.title(),
            "quantity": round(i.quantity * multiplier, 1),
            "unit": i.unit,
            "is_core": i.is_core,
            "available": is_avail,
            "compounds": cmps,
            "flavor": cmps[:3],
            "scientificName": f"{i.name.title()} spp.",
            "macros": macros,
        })
        if not is_avail:
            missing_list.append({"name": i.name, "displayName": i.name.title()})

    score_breakdown = {
        "coreCoverage": round(details.get("core_coverage", 0.0), 3),
        "pantryUtilisation": round(details.get("utilisation", 0.0), 3),
        "flavourCoherence": round(details.get("flavour_coherence", 0.0), 3),
        "gapFit": round(details.get("gap_fit", 0.0), 3),
    }

    scored_obj = {
        "recipeId": str(recipe.id),
        "recipe": cand_dict,
        "score": round(sc, 3),
        "scoreBreakdown": score_breakdown,
        "ingredientsAvailable": [i.name for i in recipe.ingredients if norm(i.name) in pantry_names],
        "ingredientsMissing": [i.name for i in recipe.ingredients if norm(i.name) not in pantry_names],
    }

    recipe_obj = {
        "id": str(recipe.id),
        "title": recipe.title,
        "cuisine": recipe.cuisine,
        "diet": recipe.diet,
        "minutes": recipe.minutes,
        "servings": servings or base_servings,
        "calories": round(recipe.calories * multiplier, 1),
        "protein": round(recipe.protein_g * multiplier, 1),
        "protein_g": round(recipe.protein_g * multiplier, 1),
        "carbs": round(recipe.carbs_g * multiplier, 1),
        "carbs_g": round(recipe.carbs_g * multiplier, 1),
        "fat": round(recipe.fat_g * multiplier, 1),
        "fat_g": round(recipe.fat_g * multiplier, 1),
        "fiber": round(recipe.fiber_g * multiplier, 1),
        "fiber_g": round(recipe.fiber_g * multiplier, 1),
        "source": recipe.source,
        "nutrition_per_serving": {
            "calories": round(recipe.calories * multiplier, 1),
            "protein": round(recipe.protein_g * multiplier, 1),
            "carbs": round(recipe.carbs_g * multiplier, 1),
            "fat": round(recipe.fat_g * multiplier, 1),
            "fibre": round(recipe.fiber_g * multiplier, 1),
        },
        "molecular_profile": {
            "dominant_aroma": "aromatic",
            "coherence_score": 0.85,
            "notes": "Shared terpene and phenylpropanoid pathways",
        },
        "ingredients": detailed_ingredients,
        "instructions": [ins.instruction for ins in recipe.instructions],
        "instruction_steps": [
            {"step": ins.step_number, "text": ins.instruction}
            for ins in recipe.instructions
        ],
    }

    return {
        **recipe_obj,
        "recipe": recipe_obj,
        "score": score_breakdown,
        "scored": scored_obj,
        "ingredients": detailed_ingredients,
        "missing": missing_list,
    }


@router.get("/instructions/{recipe_id}")
async def get_instructions(recipe_id: str, db: AsyncSession = Depends(get_db)):
    # Check if UUID
    try:
        rid = uuid.UUID(recipe_id)
        stmt = select(Recipe).options(selectinload(Recipe.instructions)).where(Recipe.id == rid)
        res = await db.execute(stmt)
        recipe = res.scalar_one_or_none()
        if recipe and recipe.instructions:
            return {"steps": [ins.instruction for ins in recipe.instructions]}
    except ValueError:
        pass

    # Check live RecipeDB fallback
    client = RecipeDBService(db)
    steps = await client.get_instructions(recipe_id)
    return {"steps": steps}


@router.post("/recipes/{recipe_id}/save")
async def save_recipe(
    recipe_id: uuid.UUID,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(SavedRecipe).where(SavedRecipe.user_id == user.id, SavedRecipe.recipe_id == recipe_id)
    res = await db.execute(stmt)
    if res.scalar_one_or_none():
        return {"ok": True, "message": "Recipe already saved"}

    saved = SavedRecipe(user_id=user.id, recipe_id=recipe_id)
    db.add(saved)
    await db.commit()
    return {"ok": True, "message": "Recipe saved to your cookbook"}


@router.delete("/recipes/{recipe_id}/save")
async def unsave_recipe(
    recipe_id: uuid.UUID,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(SavedRecipe).where(SavedRecipe.user_id == user.id, SavedRecipe.recipe_id == recipe_id)
    res = await db.execute(stmt)
    saved = res.scalar_one_or_none()
    if saved:
        await db.delete(saved)
        await db.commit()
    return {"ok": True, "message": "Recipe removed from cookbook"}


@router.get("/saved")
async def list_saved(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    stmt = (
        select(SavedRecipe)
        .options(selectinload(SavedRecipe.recipe))
        .where(SavedRecipe.user_id == user.id)
    )
    res = await db.execute(stmt)
    items = res.scalars().all()
    return [
        {
            "id": str(s.recipe.id),
            "title": s.recipe.title,
            "cuisine": s.recipe.cuisine,
            "diet": s.recipe.diet,
            "minutes": s.recipe.minutes,
            "calories": s.recipe.calories,
            "protein_g": s.recipe.protein_g,
        }
        for s in items
        if s.recipe
    ]
