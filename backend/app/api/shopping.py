"""
Shopping List API.
Conforms to §5.4 and §15 (smart suggestions from meal plan minus pantry).
"""
from datetime import datetime, timezone
from typing import Optional
import uuid
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.core.dependencies import get_current_user
from app.core.exceptions import NotFoundException
from app.database import get_db
from app.models.entities import (
    MealPlan,
    PantryItem,
    PlannedMeal,
    Recipe,
    ShoppingItem,
    User,
)
from app.services.gastronomy import is_staple, norm

router = APIRouter(prefix="/api/shopping", tags=["shopping"])


class AddShoppingItemRequest(BaseModel):
    name: str
    quantity: float = 1.0
    unit: str = "piece"
    reason: Optional[str] = "manual"


class UpdateShoppingItemRequest(BaseModel):
    quantity: Optional[float] = None
    unit: Optional[str] = None
    purchased: Optional[bool] = None
    version: Optional[int] = None


@router.get("")
async def get_shopping_list(user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    stmt = (
        select(ShoppingItem)
        .where(ShoppingItem.user_id == user.id, ShoppingItem.deleted_at.is_(None))
        .order_by(ShoppingItem.purchased.asc(), ShoppingItem.created_at.desc())
    )
    res = await db.execute(stmt)
    items = res.scalars().all()
    return [
        {
            "id": str(i.id),
            "name": i.name,
            "quantity": i.quantity,
            "unit": i.unit,
            "purchased": i.purchased,
            "reason": i.reason,
            "version": i.version,
        }
        for i in items
    ]


@router.get("/suggestions")
async def get_shopping_suggestions(user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    """Suggest missing items from active meal plan minus existing pantry inventory."""
    # 1. Pantry ingredients
    p_stmt = select(PantryItem).where(PantryItem.user_id == user.id, PantryItem.deleted_at.is_(None))
    p_res = await db.execute(p_stmt)
    pantry_norms = {norm(p.name) for p in p_res.scalars().all()}

    # 2. Planned meals
    stmt = (
        select(PlannedMeal)
        .join(PlannedMeal.plan)
        .options(selectinload(PlannedMeal.recipe).selectinload(Recipe.ingredients))
        .where(MealPlan.user_id == user.id, PlannedMeal.deleted_at.is_(None))
    )
    res = await db.execute(stmt)
    planned = res.scalars().all()

    missing_map = {}
    for pm in planned:
        if not pm.recipe:
            continue
        for ing in pm.recipe.ingredients:
            n = norm(ing.name)
            if not is_staple(n) and n not in pantry_norms:
                missing_map[n] = {
                    "name": ing.name.title(),
                    "unit": ing.unit,
                    "quantity": ing.quantity * pm.servings,
                    "reason": f"Required for {pm.recipe.title}",
                }

    return list(missing_map.values())


@router.post("/items")
async def add_shopping_item(
    req: AddShoppingItemRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    item = ShoppingItem(
        id=uuid.uuid4(),
        user_id=user.id,
        name=req.name.title(),
        quantity=req.quantity,
        unit=req.unit,
        reason=req.reason,
        purchased=False,
        version=1,
    )
    db.add(item)
    await db.commit()
    return {"ok": True, "id": str(item.id), "version": item.version}


@router.put("/items/{item_id}")
async def update_shopping_item(
    item_id: uuid.UUID,
    req: UpdateShoppingItemRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(ShoppingItem).where(ShoppingItem.id == item_id, ShoppingItem.user_id == user.id)
    res = await db.execute(stmt)
    item = res.scalar_one_or_none()
    if not item or item.deleted_at is not None:
        raise NotFoundException("Shopping item not found")

    if req.quantity is not None: item.quantity = req.quantity
    if req.unit is not None: item.unit = req.unit
    if req.purchased is not None: item.purchased = req.purchased
    item.version += 1
    await db.commit()
    return {"ok": True, "version": item.version}


@router.delete("/items/{item_id}")
async def delete_shopping_item(
    item_id: uuid.UUID,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(ShoppingItem).where(ShoppingItem.id == item_id, ShoppingItem.user_id == user.id)
    res = await db.execute(stmt)
    item = res.scalar_one_or_none()
    if not item or item.deleted_at is not None:
        raise NotFoundException("Shopping item not found")

    item.deleted_at = datetime.now(timezone.utc)
    item.version += 1
    await db.commit()
    return {"ok": True, "version": item.version}
