from fastapi import APIRouter, HTTPException
from backend.app.services.recipedb import recipedb_client

router = APIRouter(tags=["Instructions"])

@router.get("/instructions/{recipe_id}")
async def get_recipe_instructions(recipe_id: str):
    """
    Returns step-by-step cooking directions and equipment details for a recipe.
    """
    recipe = await recipedb_client.get_recipe_by_id(recipe_id)
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found.")

    return {
        "recipe_id": recipe.get("recipe_id"),
        "title": recipe.get("title"),
        "prep_time_minutes": recipe.get("prep_time_minutes"),
        "cook_time_minutes": recipe.get("cook_time_minutes"),
        "total_time_minutes": recipe.get("total_time_minutes"),
        "servings": recipe.get("servings"),
        "ingredients": recipe.get("ingredients"),
        "utensils": recipe.get("utensils"),
        "instructions": recipe.get("instructions"),
        "nutrition_per_serving": recipe.get("nutrition_per_serving"),
        "molecular_profile": recipe.get("molecular_profile")
    }
