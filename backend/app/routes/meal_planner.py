import datetime
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from backend.app.database import get_db
from backend.app.models.user import User, MealPlan
from backend.app.core.security import get_current_user

router = APIRouter(prefix="/meal-plans", tags=["Meal Planner"])

class MealPlanCreate(BaseModel):
    planned_date: str # YYYY-MM-DD
    day_of_week: Optional[str] = "Today"
    meal_type: str = "lunch" # breakfast, lunch, dinner, snack
    recipe_id: str
    recipe_title: str
    servings: Optional[float] = 1.0
    calories: Optional[float] = 300.0
    protein: Optional[float] = 15.0

@router.get("")
def get_meal_plans(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    plans = db.query(MealPlan).filter(MealPlan.user_id == user.id).order_by(MealPlan.planned_date.asc()).all()
    return [
        {
            "id": p.id,
            "planned_date": p.planned_date,
            "day_of_week": p.day_of_week,
            "meal_type": p.meal_type,
            "recipe_id": p.recipe_id,
            "recipe_title": p.recipe_title,
            "servings": p.servings,
            "calories": p.calories,
            "protein": p.protein
        }
        for p in plans
    ]

@router.post("")
def add_meal_plan(plan: MealPlanCreate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    new_plan = MealPlan(
        user_id=user.id,
        planned_date=plan.planned_date,
        day_of_week=plan.day_of_week,
        meal_type=plan.meal_type,
        recipe_id=plan.recipe_id,
        recipe_title=plan.recipe_title,
        servings=plan.servings,
        calories=plan.calories,
        protein=plan.protein
    )
    db.add(new_plan)
    db.commit()
    db.refresh(new_plan)
    return new_plan

@router.delete("/{plan_id}")
def delete_meal_plan(plan_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    item = db.query(MealPlan).filter(MealPlan.id == plan_id, MealPlan.user_id == user.id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Meal plan not found.")
    db.delete(item)
    db.commit()
    return {"message": "Meal plan deleted."}
