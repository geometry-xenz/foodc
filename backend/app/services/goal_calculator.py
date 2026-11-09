import logging
from typing import Dict, Any

logger = logging.getLogger(__name__)

ACTIVITY_MULTIPLIERS = {
    "sedentary": 1.2,
    "light": 1.375,
    "moderate": 1.55,
    "active": 1.725,
    "very_active": 1.9
}

def calculate_bmr(weight_kg: float, height_cm: float, age: int, sex: str = "male") -> float:
    """
    Calculates Basal Metabolic Rate using the validated Mifflin-St Jeor equation.
    """
    if str(sex).lower() == "female":
        bmr = (10.0 * weight_kg) + (6.25 * height_cm) - (5.0 * age) - 161.0
    else:
        bmr = (10.0 * weight_kg) + (6.25 * height_cm) - (5.0 * age) + 5.0
    return round(bmr, 1)

def calculate_tdee(bmr: float, activity_level: str = "moderate") -> float:
    """
    Calculates Total Daily Energy Expenditure (TDEE).
    """
    mult = ACTIVITY_MULTIPLIERS.get(activity_level.lower(), 1.55)
    return round(bmr * mult, 1)

def compute_nutrition_targets(
    weight_kg: float,
    height_cm: float,
    age: int,
    sex: str = "male",
    activity_level: str = "moderate",
    primary_goal: str = "lean_bulk"
) -> Dict[str, Any]:
    """
    Computes personalized daily calorie and macronutrient targets based on user physical metrics and specific fitness goal.
    """
    bmr = calculate_bmr(weight_kg, height_cm, age, sex)
    tdee = calculate_tdee(bmr, activity_level)

    goal = str(primary_goal).lower()
    
    # Target calorie adjustments
    if goal == "fat_loss":
        target_calories = max(tdee - 500, 1300)
        protein_per_kg = 2.2
        fat_pct = 0.25
        fibre_target = 35.0
        rationale = "Controlled 500 kcal deficit with high protein to maximize fat oxidation while preserving lean mass."
    elif goal == "lean_bulk":
        target_calories = tdee + 250
        protein_per_kg = 2.0
        fat_pct = 0.25
        fibre_target = 35.0
        rationale = "Modest 250 kcal surplus supporting progressive muscle protein synthesis with minimal adipose gain."
    elif goal == "traditional_bulk":
        target_calories = tdee + 500
        protein_per_kg = 1.8
        fat_pct = 0.28
        fibre_target = 30.0
        rationale = "Robust 500 kcal surplus maximizing glycogen replenishment and strength adaptation."
    elif goal == "dirty_bulk":
        target_calories = tdee + 750
        protein_per_kg = 1.6
        fat_pct = 0.32
        fibre_target = 25.0
        rationale = "High calorie surplus prioritizing rapid mass gain. Note: Higher rate of fat deposition expected."
    elif goal == "recomposition":
        target_calories = tdee - 100
        protein_per_kg = 2.3
        fat_pct = 0.25
        fibre_target = 35.0
        rationale = "Near-isocaloric intake with elevated protein to stimulate muscle synthesis during subtle fat loss."
    elif goal == "athletic_performance":
        target_calories = tdee + 200
        protein_per_kg = 1.8
        fat_pct = 0.22
        fibre_target = 35.0
        rationale = "Carbohydrate-dense fueling strategy to sustain high glycogen turnover and rapid recovery."
    else: # maintenance or general_health
        target_calories = tdee
        protein_per_kg = 1.6
        fat_pct = 0.28
        fibre_target = 32.0
        rationale = "Energy balance formula supporting metabolic homeostasis, longevity and balanced macronutrient distribution."

    target_protein_g = round(weight_kg * protein_per_kg, 1)
    protein_calories = target_protein_g * 4.0

    fat_calories = target_calories * fat_pct
    target_fat_g = round(fat_calories / 9.0, 1)

    carb_calories = max(target_calories - protein_calories - fat_calories, 0)
    target_carbs_g = round(carb_calories / 4.0, 1)

    return {
        "bmr": bmr,
        "tdee": tdee,
        "primary_goal": goal,
        "target_calories": round(target_calories, 0),
        "target_protein_g": target_protein_g,
        "target_carbs_g": target_carbs_g,
        "target_fat_g": target_fat_g,
        "target_fibre_g": fibre_target,
        "macro_distribution_pct": {
            "protein": round((protein_calories / target_calories) * 100, 1),
            "carbs": round((carb_calories / target_calories) * 100, 1),
            "fat": round((fat_calories / target_calories) * 100, 1)
        },
        "rationale": rationale,
        "disclaimer": "All nutritional calculations are evidence-based estimates based on standard metabolic equations."
    }
