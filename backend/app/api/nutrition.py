"""
Nutrition analysis and meal logging API.
Conforms to §5.4, §13, and §14.
"""
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional
import uuid
from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.core.dependencies import get_current_user
from app.core.exceptions import NotFoundException
from app.database import get_db
from app.models.entities import DailyNutritionSummary, MealLog, MealLogItem, User
from app.services.nutrition_calculator import calculate_recipe_nutrition

router = APIRouter(prefix="/api/nutrition", tags=["nutrition"])


class AnalyzeRequest(BaseModel):
    ingredients: List[Dict[str, Any]]
    servings: int = 1


class MealLogItemInput(BaseModel):
    name: str
    recipe_id: Optional[uuid.UUID] = None
    servings: float = 1.0
    calories: float = 0.0
    protein_g: float = 0.0
    carbs_g: float = 0.0
    fat_g: float = 0.0


class MealLogCreate(BaseModel):
    date: str  # YYYY-MM-DD
    meal_type: str
    items: List[MealLogItemInput]
    notes: Optional[str] = None


@router.post("/analyze")
async def analyze_nutrition(req: AnalyzeRequest, db: AsyncSession = Depends(get_db)):
    return await calculate_recipe_nutrition(req.ingredients, req.servings, db)


@router.post("/meal-log")
async def create_meal_log(
    req: MealLogCreate,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    total_cal = sum(i.calories * i.servings for i in req.items)
    total_pro = sum(i.protein_g * i.servings for i in req.items)
    total_carb = sum(i.carbs_g * i.servings for i in req.items)
    total_fat = sum(i.fat_g * i.servings for i in req.items)

    log = MealLog(
        id=uuid.uuid4(),
        user_id=user.id,
        date=req.date,
        meal_type=req.meal_type,
        total_calories=total_cal,
        total_protein_g=total_pro,
        total_carbs_g=total_carb,
        total_fat_g=total_fat,
        notes=req.notes,
    )
    db.add(log)

    for item in req.items:
        it = MealLogItem(
            meal_log_id=log.id,
            name=item.name,
            recipe_id=item.recipe_id,
            servings=item.servings,
            calories=item.calories * item.servings,
            protein_g=item.protein_g * item.servings,
            carbs_g=item.carbs_g * item.servings,
            fat_g=item.fat_g * item.servings,
        )
        db.add(it)

    # Update or insert daily nutrition summary in same transaction
    stmt_sum = select(DailyNutritionSummary).where(
        DailyNutritionSummary.user_id == user.id,
        DailyNutritionSummary.date == req.date
    )
    res_sum = await db.execute(stmt_sum)
    summary = res_sum.scalar_one_or_none()
    if summary:
        summary.total_calories += total_cal
        summary.total_protein_g += total_pro
        summary.total_carbs_g += total_carb
        summary.total_fat_g += total_fat
    else:
        summary = DailyNutritionSummary(
            user_id=user.id,
            date=req.date,
            total_calories=total_cal,
            total_protein_g=total_pro,
            total_carbs_g=total_carb,
            total_fat_g=total_fat,
        )
        db.add(summary)

    await db.commit()
    return {"ok": True, "id": str(log.id), "calories": round(total_cal, 1)}


@router.get("/summary")
async def get_nutrition_summary(
    range: str = "day",
    date: Optional[str] = None,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    target_date = date or datetime.now(timezone.utc).strftime("%Y-%m-%d")
    stmt = select(DailyNutritionSummary).where(
        DailyNutritionSummary.user_id == user.id,
        DailyNutritionSummary.date == target_date
    )
    res = await db.execute(stmt)
    summary = res.scalar_one_or_none()

    if not summary:
        return {
            "date": target_date,
            "range": range,
            "calories": 0.0,
            "protein_g": 0.0,
            "carbs_g": 0.0,
            "fat_g": 0.0,
            "fiber_g": 0.0,
            "provenance": "calculated"
        }

    return {
        "date": summary.date,
        "range": range,
        "calories": summary.total_calories,
        "protein_g": summary.total_protein_g,
        "carbs_g": summary.total_carbs_g,
        "fat_g": summary.total_fat_g,
        "fiber_g": summary.total_fiber_g,
        "provenance": "calculated"
    }


@router.get("/history")
async def get_meal_history(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    stmt = (
        select(MealLog)
        .options(selectinload(MealLog.items))
        .where(MealLog.user_id == user.id)
        .order_by(MealLog.eaten_at.desc())
        .limit(30)
    )
    res = await db.execute(stmt)
    logs = res.scalars().all()
    return [
        {
            "id": str(l.id),
            "date": l.date,
            "meal_type": l.meal_type,
            "eaten_at": l.eaten_at.isoformat(),
            "total_calories": l.total_calories,
            "total_protein_g": l.total_protein_g,
            "notes": l.notes,
            "items": [
                {
                    "name": i.name,
                    "servings": i.servings,
                    "calories": i.calories,
                    "protein_g": i.protein_g,
                }
                for i in l.items
            ]
        }
        for l in logs
    ]


@router.delete("/meal-log/{log_id}")
async def delete_meal_log(
    log_id: uuid.UUID,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(MealLog).where(MealLog.id == log_id, MealLog.user_id == user.id)
    res = await db.execute(stmt)
    log = res.scalar_one_or_none()
    if not log:
        raise NotFoundException("Meal log not found")

    # Subtract from daily nutrition summary
    stmt_sum = select(DailyNutritionSummary).where(
        DailyNutritionSummary.user_id == user.id,
        DailyNutritionSummary.date == log.date
    )
    res_sum = await db.execute(stmt_sum)
    summary = res_sum.scalar_one_or_none()
    if summary:
        summary.total_calories = max(0.0, summary.total_calories - log.total_calories)
        summary.total_protein_g = max(0.0, summary.total_protein_g - log.total_protein_g)
        summary.total_carbs_g = max(0.0, summary.total_carbs_g - log.total_carbs_g)
        summary.total_fat_g = max(0.0, summary.total_fat_g - log.total_fat_g)

    await db.delete(log)
    await db.commit()
    return {"ok": True, "message": "Meal log deleted"}
