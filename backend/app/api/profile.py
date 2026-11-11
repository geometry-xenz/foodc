"""
Profile, preferences, goals, and targets endpoints.
Conforms to §5.4, §7, §8, and D4 (version checks on PUT).
"""
from typing import Optional
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.dependencies import get_current_user
from app.core.exceptions import ConflictException, NotFoundException
from app.database import get_db
from app.models.entities import (
    Allergy,
    DietaryPreference,
    FitnessGoal,
    NutritionTarget,
    User,
    UserProfile,
    UserSettings,
)
from app.schemas.api_models import (
    GoalCalculateRequest,
    GoalUpdateRequest,
    PreferenceUpdateRequest,
    ProfileUpdateRequest,
    SettingsUpdateRequest,
)
from app.services.goal_calculator import calculate_macro_targets

router = APIRouter(prefix="/api", tags=["profile_and_goals"])


@router.get("/profile")
async def get_profile(user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    stmt = select(UserProfile).where(UserProfile.user_id == user.id)
    res = await db.execute(stmt)
    prof = res.scalar_one_or_none()
    if not prof:
        prof = UserProfile(user_id=user.id)
        db.add(prof)
        await db.commit()
    return {
        "id": str(prof.id),
        "age": prof.age,
        "gender": prof.gender,
        "height_cm": prof.height_cm,
        "weight_kg": prof.weight_kg,
        "activity_level": prof.activity_level,
        "experience_level": prof.experience_level,
        "kitchen_equipment": prof.kitchen_equipment,
        "version": prof.version,
    }


@router.put("/profile")
async def update_profile(
    req: ProfileUpdateRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(UserProfile).where(UserProfile.user_id == user.id)
    res = await db.execute(stmt)
    prof = res.scalar_one_or_none()
    if not prof:
        raise NotFoundException("Profile not found")

    if req.version is not None and prof.version != req.version:
        raise ConflictException("Profile was modified on another device. Please reload.")

    if req.age is not None: prof.age = req.age
    if req.gender is not None: prof.gender = req.gender
    if req.height_cm is not None: prof.height_cm = req.height_cm
    if req.weight_kg is not None: prof.weight_kg = req.weight_kg
    if req.activity_level is not None: prof.activity_level = req.activity_level
    if req.experience_level is not None: prof.experience_level = req.experience_level
    if req.kitchen_equipment is not None: prof.kitchen_equipment = req.kitchen_equipment
    prof.version += 1
    await db.commit()
    return {"ok": True, "version": prof.version}


@router.get("/preferences")
async def get_preferences(user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    stmt = select(DietaryPreference).where(DietaryPreference.user_id == user.id)
    res = await db.execute(stmt)
    pref = res.scalar_one_or_none()
    if not pref:
        pref = DietaryPreference(user_id=user.id, lifestyle="none", restrictions=[])
        db.add(pref)
        await db.commit()

    # Get allergies
    a_stmt = select(Allergy).where(Allergy.user_id == user.id)
    a_res = await db.execute(a_stmt)
    allergies = [a.allergen for a in a_res.scalars().all()]

    return {
        "lifestyle": pref.lifestyle,
        "restrictions": pref.restrictions or [],
        "allergies": allergies,
        "version": pref.version,
    }


@router.put("/preferences")
async def update_preferences(
    req: dict,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(DietaryPreference).where(DietaryPreference.user_id == user.id)
    res = await db.execute(stmt)
    pref = res.scalar_one_or_none()
    if not pref:
        pref = DietaryPreference(user_id=user.id, lifestyle="none", restrictions=[])
        db.add(pref)
        await db.flush()

    if req.get("version") is not None and pref.version != req.get("version"):
        raise ConflictException("Preferences were modified on another device. Please reload.")

    if "lifestyle" in req and req["lifestyle"] is not None:
        pref.lifestyle = req["lifestyle"]
    if "restrictions" in req and req["restrictions"] is not None:
        pref.restrictions = req["restrictions"]
    pref.version += 1

    # Update allergies if supplied
    if "allergies" in req and req["allergies"] is not None:
        # Delete old allergies
        del_stmt = select(Allergy).where(Allergy.user_id == user.id)
        existing = (await db.execute(del_stmt)).scalars().all()
        for e in existing:
            await db.delete(e)

        # Add new allergies
        for al in req["allergies"]:
            db.add(Allergy(user_id=user.id, allergen=al))

    await db.commit()
    return {"ok": True, "version": pref.version}


@router.get("/goals")
async def get_goals(user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    stmt = select(FitnessGoal).where(FitnessGoal.user_id == user.id)
    res = await db.execute(stmt)
    g = res.scalar_one_or_none()
    if not g:
        g = FitnessGoal(user_id=user.id, primary_goal="maintenance")
        db.add(g)
        await db.commit()
    return {
        "primary_goal": g.primary_goal,
        "secondary_goals": g.secondary_goals,
        "target_weight_kg": g.target_weight_kg,
        "version": g.version,
    }


@router.post("/goals/calculate")
async def calculate_goal_targets(req: GoalCalculateRequest):
    return calculate_macro_targets(
        gender=req.gender,
        weight_kg=req.weight_kg,
        height_cm=req.height_cm,
        age=req.age,
        activity_level=req.activity_level,
        goal=req.goal,
        overrides=req.overrides,
    )


@router.get("/nutrition/targets")
async def get_nutrition_targets(user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    stmt = select(NutritionTarget).where(NutritionTarget.user_id == user.id)
    res = await db.execute(stmt)
    t = res.scalar_one_or_none()
    if not t:
        t = NutritionTarget(user_id=user.id, bmr_kcal=1400.0, tdee_kcal=2100.0, target_calories_kcal=2000.0, target_protein_g=120.0, target_carbs_g=230.0, target_fat_g=65.0)
        db.add(t)
        await db.commit()

    prof_stmt = select(UserProfile).where(UserProfile.user_id == user.id)
    prof_res = await db.execute(prof_stmt)
    prof = prof_res.scalar_one_or_none()

    goal_stmt = select(FitnessGoal).where(FitnessGoal.user_id == user.id)
    goal_res = await db.execute(goal_stmt)
    goal = goal_res.scalar_one_or_none()

    targets_dict = {
        "primaryGoal": goal.primary_goal if goal else "lean_bulk",
        "calories": t.target_calories_kcal,
        "proteinG": t.target_protein_g,
        "carbsG": t.target_carbs_g,
        "fatG": t.target_fat_g,
        "fiberG": t.target_fiber_g,
        "bmr": t.bmr_kcal,
        "tdee": t.tdee_kcal,
        "bmr_kcal": t.bmr_kcal,
        "tdee_kcal": t.tdee_kcal,
        "target_calories_kcal": t.target_calories_kcal,
        "target_protein_g": t.target_protein_g,
        "target_carbs_g": t.target_carbs_g,
        "target_fat_g": t.target_fat_g,
        "target_fiber_g": t.target_fiber_g,
        "is_override": t.is_override,
        "overrides": t.overrides,
        "version": t.version,
    }
    return {
        "targets": targets_dict,
        "profile": {
            "age": prof.age if prof else 28,
            "sex": prof.gender if prof else "female",
            "weightKg": prof.weight_kg if prof else 64.0,
            "heightCm": prof.height_cm if prof else 168.0,
            "activityLevel": prof.activity_level if prof else "moderate",
        } if prof else None,
        "goal": {
            "primaryGoal": goal.primary_goal if goal else "lean_bulk",
        } if goal else None,
        **targets_dict,
    }


class TargetUpdatePayload(BaseModel):
    goal: Optional[str] = None
    sex: Optional[str] = None
    gender: Optional[str] = None
    age: Optional[int] = None
    weightKg: Optional[float] = None
    weight_kg: Optional[float] = None
    heightCm: Optional[float] = None
    height_cm: Optional[float] = None
    activityLevel: Optional[str] = None
    activity_level: Optional[str] = None
    target_calories_kcal: Optional[float] = None
    target_protein_g: Optional[float] = None
    target_carbs_g: Optional[float] = None
    target_fat_g: Optional[float] = None
    version: Optional[int] = None


@router.put("/nutrition/targets")
@router.post("/nutrition/targets")
async def update_nutrition_targets(
    payload: TargetUpdatePayload,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    prof_stmt = select(UserProfile).where(UserProfile.user_id == user.id)
    prof_res = await db.execute(prof_stmt)
    prof = prof_res.scalar_one_or_none()
    if not prof:
        prof = UserProfile(user_id=user.id)
        db.add(prof)

    goal_stmt = select(FitnessGoal).where(FitnessGoal.user_id == user.id)
    goal_res = await db.execute(goal_stmt)
    goal = goal_res.scalar_one_or_none()
    if not goal:
        goal = FitnessGoal(user_id=user.id)
        db.add(goal)

    t_stmt = select(NutritionTarget).where(NutritionTarget.user_id == user.id)
    t_res = await db.execute(t_stmt)
    t = t_res.scalar_one_or_none()
    if not t:
        t = NutritionTarget(user_id=user.id)
        db.add(t)

    # Update profile fields if provided
    gender_val = payload.sex or payload.gender or prof.gender
    prof.gender = gender_val
    if payload.age is not None:
        prof.age = payload.age
    if payload.weightKg is not None or payload.weight_kg is not None:
        prof.weight_kg = payload.weightKg if payload.weightKg is not None else payload.weight_kg
    if payload.heightCm is not None or payload.height_cm is not None:
        prof.height_cm = payload.heightCm if payload.heightCm is not None else payload.height_cm
    act_val = payload.activityLevel or payload.activity_level or prof.activity_level
    prof.activity_level = act_val
    prof.version += 1

    # Update goal
    if payload.goal:
        goal.primary_goal = payload.goal
        goal.version += 1

    # Calculate targets
    calc = calculate_macro_targets(
        gender=prof.gender,
        weight_kg=prof.weight_kg,
        height_cm=prof.height_cm,
        age=prof.age,
        activity_level=prof.activity_level,
        goal=goal.primary_goal,
    )

    t.bmr_kcal = calc["bmr_kcal"]
    t.tdee_kcal = calc["tdee_kcal"]
    t.target_calories_kcal = payload.target_calories_kcal or calc["target_calories_kcal"]
    t.target_protein_g = payload.target_protein_g or calc["target_protein_g"]
    t.target_carbs_g = payload.target_carbs_g or calc["target_carbs_g"]
    t.target_fat_g = payload.target_fat_g or calc["target_fat_g"]
    t.target_fiber_g = calc["target_fiber_g"]
    t.version += 1

    await db.commit()

    targets_dict = {
        "primaryGoal": goal.primary_goal,
        "calories": t.target_calories_kcal,
        "proteinG": t.target_protein_g,
        "carbsG": t.target_carbs_g,
        "fatG": t.target_fat_g,
        "fiberG": t.target_fiber_g,
        "bmr": t.bmr_kcal,
        "tdee": t.tdee_kcal,
        "bmr_kcal": t.bmr_kcal,
        "tdee_kcal": t.tdee_kcal,
        "target_calories_kcal": t.target_calories_kcal,
        "target_protein_g": t.target_protein_g,
        "target_carbs_g": t.target_carbs_g,
        "target_fat_g": t.target_fat_g,
        "target_fiber_g": t.target_fiber_g,
        "is_override": t.is_override,
        "overrides": t.overrides,
        "version": t.version,
    }
    return {
        "targets": targets_dict,
        "profile": {
            "age": prof.age,
            "sex": prof.gender,
            "weightKg": prof.weight_kg,
            "heightCm": prof.height_cm,
            "activityLevel": prof.activity_level,
        },
        "goal": {
            "primaryGoal": goal.primary_goal,
        },
        **targets_dict,
    }


@router.get("/settings")
async def get_settings_api(user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    stmt = select(UserSettings).where(UserSettings.user_id == user.id)
    res = await db.execute(stmt)
    s = res.scalar_one_or_none()
    if not s:
        s = UserSettings(user_id=user.id)
        db.add(s)
        await db.commit()
    return {
        "sound_enabled": s.sound_enabled,
        "haptics_enabled": s.haptics_enabled,
        "unit_system": s.unit_system,
        "reduced_motion": s.reduced_motion,
        "version": s.version,
    }
