from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from backend.app.database import get_db
from backend.app.models.user import User, PantryItem
from backend.app.core.security import get_current_user, get_current_user_optional

router = APIRouter(prefix="/pantry", tags=["Pantry Management"])

class PantryItemCreate(BaseModel):
    name: str
    category: Optional[str] = "Spices"
    quantity: Optional[float] = 100.0
    unit: Optional[str] = "g"
    source: Optional[str] = "manual"

class PantryItemUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    quantity: Optional[float] = None
    unit: Optional[str] = None
    is_available: Optional[bool] = None

@router.get("")
def get_pantry(user: Optional[User] = Depends(get_current_user_optional), db: Session = Depends(get_db)):
    if not user:
        return []

    items = db.query(PantryItem).filter(PantryItem.user_id == user.id).order_by(PantryItem.created_at.desc()).all()
    return [
        {
            "id": i.id,
            "name": i.name,
            "category": i.category,
            "quantity": i.quantity,
            "unit": i.unit,
            "is_available": i.is_available,
            "source": i.source,
            "created_at": i.created_at.isoformat()
        }
        for i in items
    ]

@router.post("")
def add_pantry_item(item: PantryItemCreate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    norm_name = item.name.strip().lower()
    if not norm_name:
        raise HTTPException(status_code=400, detail="Ingredient name is required.")

    # Check if exists
    existing = db.query(PantryItem).filter(PantryItem.user_id == user.id, PantryItem.name == norm_name).first()
    if existing:
        existing.is_available = True
        existing.quantity += item.quantity
        db.commit()
        db.refresh(existing)
        return existing

    new_item = PantryItem(
        user_id=user.id,
        name=norm_name,
        category=item.category or "Spices",
        quantity=item.quantity or 100.0,
        unit=item.unit or "g",
        source=item.source or "manual"
    )
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

@router.put("/{ingredient_id}")
def update_pantry_item(ingredient_id: int, updates: PantryItemUpdate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    item = db.query(PantryItem).filter(PantryItem.id == ingredient_id, PantryItem.user_id == user.id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Pantry item not found.")

    for k, v in updates.dict(exclude_unset=True).items():
        setattr(item, k, v)

    db.commit()
    db.refresh(item)
    return item

@router.delete("/{ingredient_id}")
def delete_pantry_item(ingredient_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    item = db.query(PantryItem).filter(PantryItem.id == ingredient_id, PantryItem.user_id == user.id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Pantry item not found.")

    db.delete(item)
    db.commit()
    return {"message": "Pantry item removed."}
