"""
Goal and metabolic calculation engine.
Adheres to DRISHYAM Master Specification §5.7 and §8.
Implements Mifflin-St Jeor formula, TDEE, 8 fitness protocols, and strict safety bounds.
"""
from typing import Any, Dict, List, Optional, Tuple


def calculate_bmr(gender: str, weight_kg: float, height_cm: float, age: int) -> float:
    """Mifflin-St Jeor BMR equation."""
    base = 10.0 * weight_kg + 6.25 * height_cm - 5.0 * age
    if gender.lower() == "male":
        return round(base + 5.0, 1)
    else:  # female, non_binary default to female baseline for safety
        return round(base - 161.0, 1)


def calculate_tdee(bmr: float, activity_level: str) -> float:
    """TDEE using standard PAL multipliers."""
    multipliers = {
        "sedentary": 1.2,
        "light": 1.375,
        "moderate": 1.55,
        "active": 1.725,
        "very_active": 1.9,
    }
    multiplier = multipliers.get(activity_level.lower(), 1.55)
    return round(bmr * multiplier, 1)


def calculate_macro_targets(
    gender: str,
    weight_kg: float,
    height_cm: float,
    age: int,
    activity_level: str,
    goal: str,
    overrides: Optional[Dict[str, float]] = None
) -> Dict[str, Any]:
    """
    Computes precise metabolic targets across the 8 supported protocols.
    Enforces safety bounds and returns calculation audit trail.
    """
    bmr = calculate_bmr(gender, weight_kg, height_cm, age)
    tdee = calculate_tdee(bmr, activity_level)

    # Floor boundaries
    gender_floor = 1500.0 if gender.lower() == "male" else 1200.0
    absolute_calorie_floor = max(bmr, gender_floor)

    warnings: List[str] = []
    goal_key = goal.lower().strip()

    # Protocol definitions
    if goal_key == "fat_loss":
        # -20% deficit, high protein to preserve LBM
        target_calories = tdee * 0.80
        protein_g = weight_kg * 2.2
        fat_g = max(35.0, (target_calories * 0.25) / 9.0)
        remaining_kcal = target_calories - (protein_g * 4.0 + fat_g * 9.0)
        carbs_g = max(50.0, remaining_kcal / 4.0)

    elif goal_key == "lean_bulk":
        # +10% slight surplus, hyper-lean growth
        target_calories = tdee * 1.10
        protein_g = weight_kg * 2.0
        fat_g = (target_calories * 0.25) / 9.0
        remaining_kcal = target_calories - (protein_g * 4.0 + fat_g * 9.0)
        carbs_g = max(100.0, remaining_kcal / 4.0)

    elif goal_key == "bulk":
        # +15% moderate surplus
        target_calories = tdee * 1.15
        protein_g = weight_kg * 1.9
        fat_g = (target_calories * 0.28) / 9.0
        remaining_kcal = target_calories - (protein_g * 4.0 + fat_g * 9.0)
        carbs_g = max(150.0, remaining_kcal / 4.0)

    elif goal_key == "dirty_bulk":
        # +25% aggressive surplus with explicit trade-off advisory
        target_calories = tdee * 1.25
        protein_g = weight_kg * 1.8
        fat_g = (target_calories * 0.32) / 9.0
        remaining_kcal = target_calories - (protein_g * 4.0 + fat_g * 9.0)
        carbs_g = max(200.0, remaining_kcal / 4.0)
        warnings.append(
            "Dirty bulk protocol carries higher adipose accumulation trade-offs. "
            "Monitor blood biomarkers and arterial elasticity."
        )

    elif goal_key == "recomposition":
        # -5% mild deficit / near-maintenance, peak protein
        target_calories = tdee * 0.95
        protein_g = weight_kg * 2.3
        fat_g = (target_calories * 0.25) / 9.0
        remaining_kcal = target_calories - (protein_g * 4.0 + fat_g * 9.0)
        carbs_g = max(80.0, remaining_kcal / 4.0)

    elif goal_key == "athletic_performance":
        # +5% performance fueling, high carbohydrate bias
        target_calories = tdee * 1.05
        protein_g = weight_kg * 1.8
        carbs_g = weight_kg * 5.5  # glycogen replenishment
        remaining_kcal = target_calories - (protein_g * 4.0 + carbs_g * 4.0)
        fat_g = max(40.0, remaining_kcal / 9.0)

    elif goal_key == "general_health":
        # Equilibrium, balanced macros: 50% carbs, 25% protein, 25% fat
        target_calories = tdee
        protein_g = (target_calories * 0.25) / 4.0
        fat_g = (target_calories * 0.25) / 9.0
        carbs_g = (target_calories * 0.50) / 4.0

    else:  # maintenance
        target_calories = tdee
        protein_g = weight_kg * 1.7
        fat_g = (target_calories * 0.28) / 9.0
        remaining_kcal = target_calories - (protein_g * 4.0 + fat_g * 9.0)
        carbs_g = max(100.0, remaining_kcal / 4.0)

    # Enforce minimum calorie floor safety bounds
    if target_calories < absolute_calorie_floor:
        warnings.append(
            f"Calculated intake ({round(target_calories)} kcal) was below safety threshold "
            f"({round(absolute_calorie_floor)} kcal). Adjusted to biological minimum."
        )
        target_calories = absolute_calorie_floor

    # Handle user manual overrides if provided
    is_override = False
    if overrides:
        is_override = True
        if "calories" in overrides:
            val = float(overrides["calories"])
            if val < absolute_calorie_floor:
                warnings.append(f"Manual calorie override ({val} kcal) is below recommended metabolic floor ({round(absolute_calorie_floor)} kcal).")
            target_calories = val
        if "protein_g" in overrides:
            protein_g = float(overrides["protein_g"])
        if "carbs_g" in overrides:
            carbs_g = float(overrides["carbs_g"])
        if "fat_g" in overrides:
            fat_g = float(overrides["fat_g"])

    return {
        "bmr_kcal": round(bmr),
        "tdee_kcal": round(tdee),
        "target_calories_kcal": round(target_calories),
        "target_protein_g": round(protein_g, 1),
        "target_carbs_g": round(carbs_g, 1),
        "target_fat_g": round(fat_g, 1),
        "target_fiber_g": 30.0,
        "is_override": is_override,
        "warnings": warnings,
        "provenance": "calculated",
    }
