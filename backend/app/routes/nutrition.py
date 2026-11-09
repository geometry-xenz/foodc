import datetime
from typing import Optional, List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from backend.app.database import get_db
from backend.app.models.user import User, MealLog, FitnessGoal
from backend.app.core.security import get_current_user, get_current_user_optional
from backend.app.services.nutrition import nutrition_service
from backend.app.models.schemas import NutritionRequest, NutritionResponse

router = APIRouter(prefix="/nutrition", tags=["Nutrition Intelligence"])

class MealLogCreate(BaseModel):
    recipe_id: Optional[str] = None
    recipe_title: str
    meal_type: str = "lunch" # breakfast, lunch, dinner, snack
    servings: Optional[float] = 1.0
    calories: float
    protein: float
    carbs: float
    fat: float
    logged_date: Optional[str] = None

@router.post("/analyze", response_model=NutritionResponse)
async def analyze_nutrition(payload: NutritionRequest):
    return nutrition_service.calculate_nutrition(payload)

@router.post("/meal-log")
def log_meal(meal: MealLogCreate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    today_str = meal.logged_date or datetime.date.today().isoformat()
    log = MealLog(
        user_id=user.id,
        recipe_id=meal.recipe_id,
        recipe_title=meal.recipe_title,
        meal_type=meal.meal_type,
        servings=meal.servings or 1.0,
        calories=meal.calories * (meal.servings or 1.0),
        protein=meal.protein * (meal.servings or 1.0),
        carbs=meal.carbs * (meal.servings or 1.0),
        fat=meal.fat * (meal.servings or 1.0),
        logged_date=today_str
    )
    db.add(log)
    db.commit()
    db.refresh(log)
    return {"message": "Meal logged successfully.", "log": log}

@router.get("/summary")
def get_daily_nutrition_summary(
    date: Optional[str] = None,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    target_date = date or datetime.date.today().isoformat()
    logs = db.query(MealLog).filter(MealLog.user_id == user.id, MealLog.logged_date == target_date).all()

    consumed_cal = sum(l.calories for l in logs)
    consumed_prot = sum(l.protein for l in logs)
    consumed_carbs = sum(l.carbs for l in logs)
    consumed_fat = sum(l.fat for l in logs)

    goal = db.query(FitnessGoal).filter(FitnessGoal.user_id == user.id).first()
    target_cal = goal.target_calories if goal else 2400.0
    target_prot = goal.target_protein_g if goal else 150.0
    target_carbs = goal.target_carbs_g if goal else 260.0
    target_fat = goal.target_fat_g if goal else 70.0

    return {
        "date": target_date,
        "consumed": {
            "calories": round(consumed_cal, 1),
            "protein_g": round(consumed_prot, 1),
            "carbs_g": round(consumed_carbs, 1),
            "fat_g": round(consumed_fat, 1)
        },
        "targets": {
            "calories": round(target_cal, 1),
            "protein_g": round(target_prot, 1),
            "carbs_g": round(target_carbs, 1),
            "fat_g": round(target_fat, 1),
            "primary_goal": goal.primary_goal if goal else "lean_bulk"
        },
        "remaining": {
            "calories": max(0.0, round(target_cal - consumed_cal, 1)),
            "protein_g": max(0.0, round(target_prot - consumed_prot, 1)),
            "carbs_g": max(0.0, round(target_carbs - consumed_carbs, 1)),
            "fat_g": max(0.0, round(target_fat - consumed_fat, 1))
        },
        "meals_logged_count": len(logs),
        "recent_meals": [
            {
                "id": l.id,
                "title": l.recipe_title,
                "meal_type": l.meal_type,
                "calories": round(l.calories, 1),
                "protein_g": round(l.protein, 1),
                "servings": l.servings
            }
            for l in logs
        ]
    }

@router.get("/history")
def get_nutrition_history(days: int = 7, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    logs = db.query(MealLog).filter(MealLog.user_id == user.id).order_by(MealLog.logged_at.desc()).limit(days * 4).all()
    return [
        {
            "id": l.id,
            "title": l.recipe_title,
            "meal_type": l.meal_type,
            "calories": round(l.calories, 1),
            "protein_g": round(l.protein, 1),
            "carbs_g": round(l.carbs, 1),
            "fat_g": round(l.fat, 1),
            "date": l.logged_date
        }
        for l in logs
    ]
