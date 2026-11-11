"""
Meal Planning API.
Conforms to §5.4 and §14 (supports drag-and-drop move and reorder via date/meal_type/position).
"""
from datetime import datetime, timedelta, timezone
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
from app.models.entities import FitnessGoal, MealPlan, NutritionTarget, PlannedMeal, Recipe, User

router = APIRouter(prefix="/api", tags=["meal_planner"])


class AddPlannedMealRequest(BaseModel):
    recipe_id: uuid.UUID
    date: str  # YYYY-MM-DD
    meal_type: str = "dinner"
    position: int = 0
    servings: float = 1.0


class MovePlannedMealRequest(BaseModel):
    date: Optional[str] = None
    meal_type: Optional[str] = None
    position: Optional[int] = None
    servings: Optional[float] = None
    version: Optional[int] = None


@router.get("/meal-plans")
async def get_active_plan(user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    stmt = (
        select(MealPlan)
        .options(selectinload(MealPlan.meals).selectinload(PlannedMeal.recipe))
        .where(MealPlan.user_id == user.id)
        .order_by(MealPlan.start_date.desc())
    )
    res = await db.execute(stmt)
    plan = res.scalars().first()

    if not plan:
        now = datetime.now(timezone.utc)
        plan = MealPlan(
            id=uuid.uuid4(),
            user_id=user.id,
            title="Weekly Meal Plan",
            start_date=now,
            end_date=now + timedelta(days=7),
        )
        db.add(plan)
        await db.commit()
        await db.refresh(plan, ["meals"])

    return {
        "id": str(plan.id),
        "title": plan.title,
        "start_date": plan.start_date.isoformat(),
        "end_date": plan.end_date.isoformat(),
        "version": plan.version,
        "meals": [
            {
                "id": str(m.id),
                "date": m.date,
                "meal_type": m.meal_type,
                "position": m.position,
                "servings": m.servings,
                "recipe": {
                    "id": str(m.recipe.id),
                    "title": m.recipe.title,
                    "cuisine": m.recipe.cuisine,
                    "calories": m.recipe.calories,
                    "protein_g": m.recipe.protein_g,
                } if m.recipe else None,
                "version": m.version,
            }
            for m in plan.meals
            if m.deleted_at is None
        ]
    }


@router.post("/meal-plans/{plan_id}/meals")
async def add_meal_to_plan(
    plan_id: uuid.UUID,
    req: AddPlannedMealRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(MealPlan).where(MealPlan.id == plan_id, MealPlan.user_id == user.id)
    res = await db.execute(stmt)
    plan = res.scalar_one_or_none()
    if not plan:
        raise NotFoundException("Meal plan not found")

    planned_meal = PlannedMeal(
        id=uuid.uuid4(),
        plan_id=plan.id,
        recipe_id=req.recipe_id,
        date=req.date,
        meal_type=req.meal_type,
        position=req.position,
        servings=req.servings,
        version=1,
    )
    db.add(planned_meal)
    plan.version += 1
    await db.commit()
    return {"ok": True, "id": str(planned_meal.id), "version": planned_meal.version}


@router.put("/planned-meals/{meal_id}")
async def move_planned_meal(
    meal_id: uuid.UUID,
    req: MovePlannedMealRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    stmt = (
        select(PlannedMeal)
        .join(PlannedMeal.plan)
        .where(PlannedMeal.id == meal_id, MealPlan.user_id == user.id)
    )
    res = await db.execute(stmt)
    meal = res.scalar_one_or_none()
    if not meal or meal.deleted_at is not None:
        raise NotFoundException("Planned meal not found")

    if req.date is not None: meal.date = req.date
    if req.meal_type is not None: meal.meal_type = req.meal_type
    if req.position is not None: meal.position = req.position
    if req.servings is not None: meal.servings = req.servings
    meal.version += 1
    await db.commit()
    return {"ok": True, "version": meal.version}


@router.delete("/planned-meals/{meal_id}")
async def delete_planned_meal(
    meal_id: uuid.UUID,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    stmt = (
        select(PlannedMeal)
        .join(PlannedMeal.plan)
        .where(PlannedMeal.id == meal_id, MealPlan.user_id == user.id)
    )
    res = await db.execute(stmt)
    meal = res.scalar_one_or_none()
    if not meal or meal.deleted_at is not None:
        raise NotFoundException("Planned meal not found")

    meal.deleted_at = datetime.now(timezone.utc)
    meal.version += 1
    await db.commit()
    return {"ok": True, "version": meal.version}


class PlannerAddRequest(BaseModel):
    date: str
    mealType: Optional[str] = None
    meal_type: Optional[str] = None
    recipeId: Optional[str] = None
    recipe_id: Optional[str] = None
    servings: float = 1.0


@router.get("/planner")
async def get_planner_day(
    date: Optional[str] = None,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    target_date = date or datetime.now(timezone.utc).strftime("%Y-%m-%d")

    # Find meals for this user on this date
    stmt = (
        select(PlannedMeal)
        .join(PlannedMeal.plan)
        .options(selectinload(PlannedMeal.recipe))
        .where(
            MealPlan.user_id == user.id,
            PlannedMeal.date == target_date,
            PlannedMeal.deleted_at.is_(None),
        )
        .order_by(PlannedMeal.position.asc(), PlannedMeal.created_at.asc())
    )
    res = await db.execute(stmt)
    meals = res.scalars().all()

    entries = []
    tot_cal = 0.0
    tot_pro = 0.0
    tot_carb = 0.0
    tot_fat = 0.0

    for m in meals:
        cal = round((m.recipe.calories_kcal if m.recipe else 0.0) * m.servings, 1)
        pro = round((m.recipe.protein_g if m.recipe else 0.0) * m.servings, 1)
        carb = round((m.recipe.carbs_g if m.recipe else 0.0) * m.servings, 1)
        fat = round((m.recipe.fat_g if m.recipe else 0.0) * m.servings, 1)
        tot_cal += cal
        tot_pro += pro
        tot_carb += carb
        tot_fat += fat

        entries.append({
            "id": str(m.id),
            "date": m.date,
            "mealType": m.meal_type,
            "recipeId": str(m.recipe_id),
            "servings": m.servings,
            "calories": cal,
            "protein": pro,
            "carbs": carb,
            "fat": fat,
            "title": m.recipe.title if m.recipe else "",
        })

    # User targets
    t_stmt = select(NutritionTarget).where(NutritionTarget.user_id == user.id)
    t_res = await db.execute(t_stmt)
    t = t_res.scalar_one_or_none()

    g_stmt = select(FitnessGoal).where(FitnessGoal.user_id == user.id)
    g_res = await db.execute(g_stmt)
    g = g_res.scalar_one_or_none()

    targets = None
    if t:
        targets = {
            "primaryGoal": g.primary_goal if g else "lean_bulk",
            "calories": t.target_calories_kcal,
            "proteinG": t.target_protein_g,
            "carbsG": t.target_carbs_g,
            "fatG": t.target_fat_g,
            "fiberG": t.target_fiber_g,
            "bmr": t.bmr_kcal,
            "tdee": t.tdee_kcal,
        }

    return {
        "date": target_date,
        "entries": entries,
        "totals": {
            "calories": round(tot_cal, 1),
            "protein": round(tot_pro, 1),
            "carbs": round(tot_carb, 1),
            "fat": round(tot_fat, 1),
        },
        "targets": targets,
    }


@router.post("/planner", status_code=201)
async def add_planner_meal(
    req: PlannerAddRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    rec_id_str = req.recipeId or req.recipe_id
    if not rec_id_str:
        raise AppException(400, "MISSING_RECIPE_ID", "recipeId is required")

    try:
        rec_uuid = uuid.UUID(rec_id_str)
    except ValueError:
        raise AppException(400, "INVALID_RECIPE_ID", "Invalid recipeId format")

    rec_stmt = select(Recipe).where(Recipe.id == rec_uuid)
    rec_res = await db.execute(rec_stmt)
    recipe = rec_res.scalar_one_or_none()
    if not recipe:
        raise NotFoundException("Recipe not found")

    # Active plan
    plan_stmt = select(MealPlan).where(MealPlan.user_id == user.id).order_by(MealPlan.start_date.desc())
    plan_res = await db.execute(plan_stmt)
    plan = plan_res.scalars().first()
    if not plan:
        now = datetime.now(timezone.utc)
        plan = MealPlan(
            id=uuid.uuid4(),
            user_id=user.id,
            title="Weekly Meal Plan",
            start_date=now,
            end_date=now + timedelta(days=7),
        )
        db.add(plan)
        await db.flush()

    m_type = req.mealType or req.meal_type or "dinner"
    servings = req.servings if req.servings > 0 else 1.0

    planned = PlannedMeal(
        id=uuid.uuid4(),
        plan_id=plan.id,
        recipe_id=recipe.id,
        date=req.date,
        meal_type=m_type,
        servings=servings,
        position=0,
    )
    db.add(planned)
    await db.commit()

    cal = round(recipe.calories_kcal * servings, 1)
    pro = round(recipe.protein_g * servings, 1)
    carb = round(recipe.carbs_g * servings, 1)
    fat = round(recipe.fat_g * servings, 1)

    return {
        "entry": {
            "id": str(planned.id),
            "date": planned.date,
            "mealType": planned.meal_type,
            "recipeId": str(planned.recipe_id),
            "servings": planned.servings,
            "calories": cal,
            "protein": pro,
            "carbs": carb,
            "fat": fat,
            "title": recipe.title,
        }
    }


@router.delete("/planner/{meal_id}")
async def delete_planner_meal(
    meal_id: uuid.UUID,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    stmt = (
        select(PlannedMeal)
        .join(PlannedMeal.plan)
        .where(PlannedMeal.id == meal_id, MealPlan.user_id == user.id)
    )
    res = await db.execute(stmt)
    meal = res.scalar_one_or_none()
    if not meal or meal.deleted_at is not None:
        raise NotFoundException("Planned meal not found")

    meal.deleted_at = datetime.now(timezone.utc)
    meal.version += 1
    await db.commit()
    return {"ok": True}
