from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.app.database import get_db
from backend.app.models.user import User, SavedRecipe
from backend.app.core.security import get_current_user, get_current_user_optional
from backend.app.services.recipedb import recipedb_client

router = APIRouter(prefix="/recipes", tags=["Recipes & Saved Dishes"])

@router.get("/saved/all")
def get_saved_recipes(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    saved = db.query(SavedRecipe).filter(SavedRecipe.user_id == user.id).order_by(SavedRecipe.created_at.desc()).all()
    return [
        {
            "id": s.id,
            "recipe_id": s.recipe_id,
            "title": s.title,
            "image_url": s.image_url,
            "cuisine": s.cuisine,
            "diet": s.diet,
            "created_at": s.created_at.isoformat()
        }
        for s in saved
    ]

@router.get("/{recipe_id}")
async def get_recipe_detail(recipe_id: str):
    rec = await recipedb_client.get_recipe_by_id(recipe_id)
    if not rec:
        raise HTTPException(status_code=404, detail="Recipe not found.")
    return rec

@router.post("/{recipe_id}/save")
async def save_recipe(recipe_id: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    existing = db.query(SavedRecipe).filter(SavedRecipe.user_id == user.id, SavedRecipe.recipe_id == recipe_id).first()
    if existing:
        return {"message": "Recipe already saved.", "saved": True}

    rec = await recipedb_client.get_recipe_by_id(recipe_id)
    title = rec.get("title", f"Recipe {recipe_id}") if rec else f"Recipe {recipe_id}"
    image_url = rec.get("image_url") if rec else None
    cuisine = rec.get("cuisine") if rec else None
    diet = rec.get("diet") if rec else None

    item = SavedRecipe(
        user_id=user.id,
        recipe_id=recipe_id,
        title=title,
        image_url=image_url,
        cuisine=cuisine,
        diet=diet
    )
    db.add(item)
    db.commit()
    return {"message": "Recipe saved successfully.", "saved": True}

@router.delete("/{recipe_id}/save")
def unsave_recipe(recipe_id: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    item = db.query(SavedRecipe).filter(SavedRecipe.user_id == user.id, SavedRecipe.recipe_id == recipe_id).first()
    if item:
        db.delete(item)
        db.commit()
    return {"message": "Recipe removed from saved.", "saved": False}
