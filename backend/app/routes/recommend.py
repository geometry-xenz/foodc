import logging
from typing import List, Optional, Dict, Any
from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from backend.app.database import get_db
from backend.app.models.user import User, Preference, FitnessGoal, PantryItem
from backend.app.core.security import get_current_user_optional
from backend.app.services.recipedb import recipedb_client
from backend.app.services.gastronomy import gastronomy_engine
from backend.app.services.flavordb import flavordb_client
from backend.app.config import settings

logger = logging.getLogger(__name__)

router = APIRouter(tags=["Recommendations"])

class PersonalizedRecommendRequest(BaseModel):
    ingredients: Optional[List[str]] = None
    minutes: Optional[int] = 60
    diet: Optional[str] = "any"
    utensils: Optional[List[str]] = Field(default_factory=list)
    nutritional_goals: Optional[List[str]] = Field(default_factory=list)

@router.post("/recommend")
async def recommend_recipes(
    payload: PersonalizedRecommendRequest,
    user: Optional[User] = Depends(get_current_user_optional),
    db: Session = Depends(get_db)
):
    # 1. Resolve Pantry Ingredients
    pantry = payload.ingredients
    if not pantry:
        if user:
            user_items = db.query(PantryItem).filter(PantryItem.user_id == user.id, PantryItem.is_available == True).all()
            if user_items:
                pantry = [i.name for i in user_items]
        if not pantry:
            pantry = ["turmeric", "cumin", "onion", "tomato", "garlic"]

    # 2. Resolve User Preferences & Goals
    diet = payload.diet or "any"
    allergies = []
    excluded = []
    primary_goal = "lean_bulk"
    
    if user:
        pref = db.query(Preference).filter(Preference.user_id == user.id).first()
        if pref:
            if diet == "any" and pref.dietary_lifestyle:
                diet = pref.dietary_lifestyle
            allergies = [a.lower() for a in (pref.allergies or [])]
            excluded = [e.lower() for e in (pref.excluded_ingredients or [])]
        
        goal_record = db.query(FitnessGoal).filter(FitnessGoal.user_id == user.id).first()
        if goal_record and goal_record.primary_goal:
            primary_goal = goal_record.primary_goal

    # 3. Fetch candidate recipes from RecipeDB / offline dataset
    raw_candidates = await recipedb_client.get_candidate_recipes(
        ingredients=pantry,
        diet=diet,
        max_minutes=payload.minutes or 60
    )

    scored_candidates = []
    for recipe in raw_candidates:
        recipe_ing_names = []
        for item in recipe.get("ingredients", []):
            name = item.get("name", "") if isinstance(item, dict) else str(item)
            recipe_ing_names.append(flavordb_client.normalize_ingredient(name))

        # HARD GATE 1: Allergies Check
        contains_allergen = False
        for allergen in allergies:
            if any(allergen in ing or ing in allergen for ing in recipe_ing_names):
                contains_allergen = True
                break
        if contains_allergen:
            continue

        # HARD GATE 2: Excluded Ingredients Check
        contains_excluded = False
        for exc in excluded:
            if any(exc in ing or ing in exc for ing in recipe_ing_names):
                contains_excluded = True
                break
        if contains_excluded:
            continue

        # Gastronomic Scoring
        candidate, score_meta = await gastronomy_engine.score_recipe(pantry, recipe)
        
        # Personalized Fitness Goal Layer
        nut = recipe.get("nutrition_per_serving", {})
        cal = nut.get("calories", 250)
        prot = nut.get("protein", 10)
        
        goal_multiplier = 1.0
        goal_note = ""

        if primary_goal == "fat_loss":
            if prot >= 14 and cal <= 300:
                goal_multiplier = 1.15
                goal_note = f"Ideal high-protein ({prot}g) / low-calorie ({cal} kcal) ratio for fat loss."
            elif cal > 400:
                goal_multiplier = 0.85
                goal_note = f"Higher calories ({cal} kcal) for cutting."
        elif primary_goal in ("lean_bulk", "traditional_bulk"):
            if prot >= 15:
                goal_multiplier = 1.12
                goal_note = f"Solid muscle protein synthesis fuel ({prot}g protein)."
        elif primary_goal == "recomposition":
            if prot >= 15:
                goal_multiplier = 1.10
                goal_note = f"Elevated protein ({prot}g) for body recomposition."

        final_score = round(min(candidate.gastronomy_score.composite_score * goal_multiplier, 1.0), 3)

        why_recommended = (
            f"Uses {int(candidate.gastronomy_score.counter_utilisation * 100)}% of your pantry. "
            f"{goal_note} "
            f"Shares rich {recipe.get('molecular_profile', {}).get('dominant_aroma', 'aroma')} volatile compounds."
        ).strip()

        score_dict = candidate.gastronomy_score.model_dump() if hasattr(candidate.gastronomy_score, 'model_dump') else candidate.gastronomy_score.dict()

        scored_candidates.append({
            "recipe_id": candidate.recipe_id,
            "title": candidate.title,
            "cuisine": candidate.cuisine,
            "diet": candidate.diet,
            "prep_time_minutes": candidate.prep_time_minutes,
            "cook_time_minutes": candidate.cook_time_minutes,
            "total_time_minutes": candidate.total_time_minutes,
            "servings": candidate.servings,
            "image_url": candidate.image_url,
            "ingredients_available": candidate.ingredients_available,
            "ingredients_missing": candidate.ingredients_missing,
            "match_percentage": candidate.match_percentage,
            "gastronomy_score": score_dict,
            "final_personalized_score": final_score,
            "why_drishyam_recommended": why_recommended,
            "calories_per_serving": cal,
            "protein_grams": prot,
            "carbs_grams": nut.get("carbs"),
            "fat_grams": nut.get("fat"),
            "fibre_grams": nut.get("fibre"),
            "one_ingredient_to_buy": candidate.one_ingredient_to_buy,
            "molecular_pairing_notes": candidate.molecular_pairing_notes
        })

    # Sort descending by personalized gastronomy score
    scored_candidates.sort(key=lambda x: x["final_personalized_score"], reverse=True)

    # Compute Unlock Suggestion
    dummy_cands = [await gastronomy_engine.score_recipe(pantry, r) for r in raw_candidates]
    unlock = await gastronomy_engine.compute_unlock_suggestion(pantry, [c[0] for c in dummy_cands])

    return {
        "total_candidates": len(scored_candidates),
        "detected_count": len(pantry),
        "pantry": pantry,
        "recipes": scored_candidates,
        "unlock_suggestion": unlock,
        "primary_fitness_goal": primary_goal,
        "source": "foodoscope_computational_gastronomy_engine"
    }
