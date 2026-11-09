from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from backend.app.database import get_db
from backend.app.models.user import User, ShoppingItem, PantryItem, MealPlan
from backend.app.core.security import get_current_user
from backend.app.services.recipedb import recipedb_client

router = APIRouter(prefix="/shopping", tags=["Shopping List"])

class ShoppingItemCreate(BaseModel):
    ingredient_name: str
    quantity: Optional[float] = 1.0
    unit: Optional[str] = "pack"
    recipe_source: Optional[str] = "Personal"

@router.get("/items")
def get_shopping_items(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    items = db.query(ShoppingItem).filter(ShoppingItem.user_id == user.id).all()
    return [
        {
            "id": i.id,
            "ingredient_name": i.ingredient_name,
            "quantity": i.quantity,
            "unit": i.unit,
            "is_purchased": i.is_purchased,
            "recipe_source": i.recipe_source
        }
        for i in items
    ]

@router.post("/items")
def add_shopping_item(item: ShoppingItemCreate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    new_item = ShoppingItem(
        user_id=user.id,
        ingredient_name=item.ingredient_name.strip().title(),
        quantity=item.quantity,
        unit=item.unit,
        recipe_source=item.recipe_source
    )
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

@router.put("/items/{item_id}")
def toggle_purchased(item_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    item = db.query(ShoppingItem).filter(ShoppingItem.id == item_id, ShoppingItem.user_id == user.id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found.")
    item.is_purchased = not item.is_purchased
    db.commit()
    return {"message": "Status updated.", "is_purchased": item.is_purchased}

@router.delete("/items/{item_id}")
def delete_shopping_item(item_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    item = db.query(ShoppingItem).filter(ShoppingItem.id == item_id, ShoppingItem.user_id == user.id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found.")
    db.delete(item)
    db.commit()
    return {"message": "Item deleted."}

@router.get("/suggestions")
async def get_shopping_suggestions(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Intelligently aggregates missing ingredients from planned meals and pantry shortages.
    """
    pantry_names = {i.name.lower() for i in db.query(PantryItem).filter(PantryItem.user_id == user.id).all()}
    plans = db.query(MealPlan).filter(MealPlan.user_id == user.id).all()

    suggestions = []
    seen = set()

    for p in plans:
        recipe = await recipedb_client.get_recipe_by_id(p.recipe_id)
        if recipe:
            for ing in recipe.get("ingredients", []):
                name = ing.get("name", "") if isinstance(ing, dict) else str(ing)
                clean_name = name.lower().strip()
                if clean_name not in pantry_names and clean_name not in seen and clean_name not in ("salt", "water", "oil"):
                    seen.add(clean_name)
                    suggestions.append({
                        "ingredient_name": clean_name.title(),
                        "suggested_for_recipe": p.recipe_title,
                        "quantity": ing.get("quantity", 1) if isinstance(ing, dict) else 1,
                        "unit": ing.get("unit", "item") if isinstance(ing, dict) else "item"
                    })

    # Add default culinary essentials if suggestions are few
    if len(suggestions) < 3:
        for staple in ["Coriander Leaves", "Garam Masala", "Ginger Root", "Mustard Seeds"]:
            if staple.lower() not in pantry_names and staple.lower() not in seen:
                suggestions.append({
                    "ingredient_name": staple,
                    "suggested_for_recipe": "Pantry Restock",
                    "quantity": 1,
                    "unit": "pack"
                })

    return suggestions
