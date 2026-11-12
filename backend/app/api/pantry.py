"""
Pantry Management API.
Conforms to §5.4, §10, and D4 (version checks and alias deduplication).
"""
from datetime import datetime, timezone
import uuid
from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.core.dependencies import get_current_user
from app.core.exceptions import ConflictException, NotFoundException
from app.database import get_db
from app.models.entities import Ingredient, IngredientAlias, PantryItem, User
from app.schemas.api_models import PantryItemCreate, PantryItemUpdate
from app.services.gastronomy import norm

router = APIRouter(prefix="/api/pantry", tags=["pantry"])


async def resolve_canonical_name(db: AsyncSession, raw_name: str) -> str:
    n = norm(raw_name)
    # Check alias table
    stmt = select(IngredientAlias).where(IngredientAlias.alias.ilike(n))
    res = await db.execute(stmt)
    alias = res.scalar_one_or_none()
    if alias:
        stmt_ing = select(Ingredient).where(Ingredient.id == alias.ingredient_id)
        res_ing = await db.execute(stmt_ing)
        ing = res_ing.scalar_one_or_none()
        if ing:
            return ing.name
    return n


@router.get("/catalog")
async def get_ingredient_catalog(db: AsyncSession = Depends(get_db)):
    stmt = (
        select(Ingredient)
        .options(selectinload(Ingredient.nutrition))
        .order_by(Ingredient.category, Ingredient.name)
    )
    res = await db.execute(stmt)
    ingredients = res.scalars().all()
    return [
        {
            "name": ing.name,
            "displayName": ing.display_name or ing.name.title(),
            "category": ing.category,
            "calories": ing.nutrition.calories if ing.nutrition else 0.0,
            "protein": ing.nutrition.protein_g if ing.nutrition else 0.0,
            "carbs": ing.nutrition.carbs_g if ing.nutrition else 0.0,
            "fat": ing.nutrition.fat_g if ing.nutrition else 0.0,
            "fiber": ing.nutrition.fiber_g if ing.nutrition else 0.0,
        }
        for ing in ingredients
    ]


@router.get("")
async def get_pantry(user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    stmt = (
        select(PantryItem)
        .where(PantryItem.user_id == user.id, PantryItem.deleted_at.is_(None))
        .order_by(PantryItem.created_at.desc())
    )
    res = await db.execute(stmt)
    items = res.scalars().all()
    now_ms = int(datetime.now(timezone.utc).timestamp() * 1000)
    return [
        {
            "id": str(i.id),
            "name": i.name,
            "category": i.category,
            "quantity": i.quantity,
            "unit": i.unit,
            "confidence": i.confidence,
            "confirmed": i.confirmed,
            "source": i.source,
            "version": i.version,
            "updatedAtMs": int(i.updated_at.timestamp() * 1000) if i.updated_at else now_ms,
        }
        for i in items
    ]


@router.post("")
async def add_pantry_item(
    item: PantryItemCreate,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    canonical = await resolve_canonical_name(db, item.name)

    # Check for existing non-deleted item
    stmt = (
        select(PantryItem)
        .where(
            PantryItem.user_id == user.id,
            PantryItem.name.ilike(canonical),
            PantryItem.deleted_at.is_(None),
        )
    )
    res = await db.execute(stmt)
    existing = res.scalar_one_or_none()
    now = datetime.now(timezone.utc)
    now_ms = int(now.timestamp() * 1000)

    if existing:
        existing.quantity += item.quantity
        existing.confidence = max(existing.confidence, item.confidence)
        existing.version += 1
        existing.updated_at = now
        await db.commit()
        return {
            "id": str(existing.id),
            "name": existing.name,
            "category": existing.category,
            "quantity": existing.quantity,
            "unit": existing.unit,
            "confidence": existing.confidence,
            "confirmed": existing.confirmed,
            "source": existing.source,
            "version": existing.version,
            "updatedAtMs": int(existing.updated_at.timestamp() * 1000),
            "updated": True,
        }

    item_id = uuid.uuid4()
    if item.id:
        try:
            item_id = uuid.UUID(item.id)
        except (ValueError, TypeError):
            pass

    new_item = PantryItem(
        id=item_id,
        user_id=user.id,
        name=canonical,
        category=item.category,
        quantity=item.quantity,
        unit=item.unit,
        confidence=item.confidence,
        confirmed=item.confirmed,
        source=item.source,
        version=1,
    )
    db.add(new_item)
    await db.commit()
    return {
        "id": str(new_item.id),
        "name": new_item.name,
        "category": new_item.category,
        "quantity": new_item.quantity,
        "unit": new_item.unit,
        "confidence": new_item.confidence,
        "confirmed": new_item.confirmed,
        "source": new_item.source,
        "version": 1,
        "updatedAtMs": int(new_item.created_at.timestamp() * 1000) if new_item.created_at else now_ms,
        "created": True,
    }


@router.put("/{item_id}")
async def update_pantry_item(
    item_id: uuid.UUID,
    item: PantryItemUpdate,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(PantryItem).where(PantryItem.id == item_id, PantryItem.user_id == user.id)
    res = await db.execute(stmt)
    existing = res.scalar_one_or_none()
    if not existing or existing.deleted_at is not None:
        raise NotFoundException("Pantry item not found")

    if item.version is not None and existing.version != item.version:
        raise ConflictException("Pantry item was modified on another device. Please reload.")

    if item.name is not None: existing.name = item.name
    if item.category is not None: existing.category = item.category
    if item.quantity is not None: existing.quantity = item.quantity
    if item.unit is not None: existing.unit = item.unit
    if item.confidence is not None: existing.confidence = item.confidence
    if item.confirmed is not None: existing.confirmed = item.confirmed
    existing.version += 1
    await db.commit()
    return {"ok": True, "version": existing.version}


@router.delete("/{item_id}")
async def delete_pantry_item(
    item_id: uuid.UUID,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(PantryItem).where(PantryItem.id == item_id, PantryItem.user_id == user.id)
    res = await db.execute(stmt)
    existing = res.scalar_one_or_none()
    if not existing or existing.deleted_at is not None:
        raise NotFoundException("Pantry item not found")

    existing.deleted_at = datetime.now(timezone.utc)
    existing.version += 1
    await db.commit()
    return {"ok": True, "version": existing.version}
