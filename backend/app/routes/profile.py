from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from backend.app.database import get_db
from backend.app.models.user import User, Profile, Preference, FitnessGoal
from backend.app.core.security import get_current_user
from backend.app.services.goal_calculator import compute_nutrition_targets

router = APIRouter(tags=["User Profile & Preferences"])

class ProfileUpdateRequest(BaseModel):
    age: Optional[int] = None
    height_cm: Optional[float] = None
    weight_kg: Optional[float] = None
    target_weight_kg: Optional[float] = None
    biological_sex: Optional[str] = None
    activity_level: Optional[str] = None
    measurement_units: Optional[str] = None

class PreferencesUpdateRequest(BaseModel):
    dietary_lifestyle: Optional[str] = None
    allergies: Optional[List[str]] = None
    excluded_ingredients: Optional[List[str]] = None
    cuisine_preferences: Optional[List[str]] = None
    taste_preferences: Optional[List[str]] = None
    cooking_utensils: Optional[List[str]] = None
    max_cooking_minutes: Optional[int] = None

class CalculateGoalRequest(BaseModel):
    primary_goal: str
    weight_kg: Optional[float] = None
    height_cm: Optional[float] = None
    age: Optional[int] = None
    biological_sex: Optional[str] = None
    activity_level: Optional[str] = None

class GoalUpdateRequest(BaseModel):
    primary_goal: str
    target_calories: float
    target_protein_g: float
    target_carbs_g: float
    target_fat_g: float
    target_fibre_g: float

@router.get("/profile")
def get_user_profile(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    prof = db.query(Profile).filter(Profile.user_id == user.id).first()
    if not prof:
        prof = Profile(user_id=user.id)
        db.add(prof)
        db.commit()
        db.refresh(prof)
    return {
        "id": prof.id,
        "full_name": user.full_name,
        "email": user.email,
        "age": prof.age,
        "height_cm": prof.height_cm,
        "weight_kg": prof.weight_kg,
        "target_weight_kg": prof.target_weight_kg,
        "biological_sex": prof.biological_sex,
        "activity_level": prof.activity_level,
        "measurement_units": prof.measurement_units
    }

@router.put("/profile")
def update_user_profile(req: ProfileUpdateRequest, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    prof = db.query(Profile).filter(Profile.user_id == user.id).first()
    if not prof:
        prof = Profile(user_id=user.id)
        db.add(prof)

    for k, v in req.dict(exclude_unset=True).items():
        setattr(prof, k, v)
    db.commit()
    db.refresh(prof)
    return {"message": "Profile updated successfully.", "profile": prof}

@router.get("/preferences")
def get_preferences(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    pref = db.query(Preference).filter(Preference.user_id == user.id).first()
    if not pref:
        pref = Preference(user_id=user.id)
        db.add(pref)
        db.commit()
        db.refresh(pref)
    return {
        "dietary_lifestyle": pref.dietary_lifestyle,
        "allergies": pref.allergies or [],
        "excluded_ingredients": pref.excluded_ingredients or [],
        "cuisine_preferences": pref.cuisine_preferences or [],
        "taste_preferences": pref.taste_preferences or [],
        "cooking_utensils": pref.cooking_utensils or ["pan", "pot", "spatula", "stove"],
        "max_cooking_minutes": pref.max_cooking_minutes or 45
    }

@router.put("/preferences")
def update_preferences(req: PreferencesUpdateRequest, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    pref = db.query(Preference).filter(Preference.user_id == user.id).first()
    if not pref:
        pref = Preference(user_id=user.id)
        db.add(pref)

    for k, v in req.dict(exclude_unset=True).items():
        setattr(pref, k, v)
    db.commit()
    return {"message": "Preferences updated successfully."}

@router.post("/goals/calculate")
def calculate_goals(req: CalculateGoalRequest, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    prof = db.query(Profile).filter(Profile.user_id == user.id).first()
    w = req.weight_kg or (prof.weight_kg if prof else 70.0)
    h = req.height_cm or (prof.height_cm if prof else 175.0)
    a = req.age or (prof.age if prof else 26)
    s = req.biological_sex or (prof.biological_sex if prof else "male")
    act = req.activity_level or (prof.activity_level if prof else "moderate")

    targets = compute_nutrition_targets(w, h, a, s, act, req.primary_goal)
    return targets

@router.get("/goals")
def get_goal(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    goal = db.query(FitnessGoal).filter(FitnessGoal.user_id == user.id).first()
    if not goal:
        targets = compute_nutrition_targets(70, 175, 26, "male", "moderate", "lean_bulk")
        goal = FitnessGoal(
            user_id=user.id,
            primary_goal="lean_bulk",
            target_calories=targets["target_calories"],
            target_protein_g=targets["target_protein_g"],
            target_carbs_g=targets["target_carbs_g"],
            target_fat_g=targets["target_fat_g"],
            target_fibre_g=targets["target_fibre_g"]
        )
        db.add(goal)
        db.commit()
        db.refresh(goal)
    return {
        "primary_goal": goal.primary_goal,
        "target_calories": goal.target_calories,
        "target_protein_g": goal.target_protein_g,
        "target_carbs_g": goal.target_carbs_g,
        "target_fat_g": goal.target_fat_g,
        "target_fibre_g": goal.target_fibre_g
    }

@router.put("/goals")
def update_goal(req: GoalUpdateRequest, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    goal = db.query(FitnessGoal).filter(FitnessGoal.user_id == user.id).first()
    if not goal:
        goal = FitnessGoal(user_id=user.id)
        db.add(goal)

    goal.primary_goal = req.primary_goal
    goal.target_calories = req.target_calories
    goal.target_protein_g = req.target_protein_g
    goal.target_carbs_g = req.target_carbs_g
    goal.target_fat_g = req.target_fat_g
    goal.target_fibre_g = req.target_fibre_g

    db.commit()
    return {"message": "Goal updated successfully."}

@router.get("/nutrition/targets")
def get_nutrition_targets(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return get_goal(user, db)
