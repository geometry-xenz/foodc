"""
Nutrition calculation and unit normalization engine.
Adheres to DRISHYAM Master Specification §5.7 and §13:
- Normalizes metric/imperial cooking units to standard grams.
- Computes macro and micronutrient totals from ingredient profiles.
- Aggregates daily nutrition summaries with provenance tagging.
"""
from typing import Any, Dict, List, Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.entities import DailyNutritionSummary, IngredientNutrition

UNIT_TO_GRAMS = {
    "g": 1.0,
    "gram": 1.0,
    "grams": 1.0,
    "kg": 1000.0,
    "kilogram": 1000.0,
    "mg": 0.001,
    "ml": 1.0,        # assuming density ~1.0 for culinary liquids
    "l": 1000.0,
    "liter": 1000.0,
    "tsp": 5.0,
    "teaspoon": 5.0,
    "tbsp": 15.0,
    "tablespoon": 15.0,
    "cup": 240.0,
    "cups": 240.0,
    "oz": 28.35,
    "lb": 453.59,
}


def normalize_quantity_to_grams(
    quantity: float,
    unit: str,
    grams_per_piece: Optional[float] = None
) -> float:
    """Convert any cooking unit to standard grams."""
    u = unit.lower().strip()
    if u in ("piece", "pieces", "count", "nos", "slice", "slices"):
        return quantity * (grams_per_piece if grams_per_piece else 80.0)
    multiplier = UNIT_TO_GRAMS.get(u, 1.0)
    return quantity * multiplier


async def calculate_recipe_nutrition(
    ingredients: List[Dict[str, Any]],
    servings: int,
    db: AsyncSession
) -> Dict[str, Any]:
    """
    Computes total and per-serving nutrition for a recipe based on its ingredients.
    """
    servings = max(1, servings)
    total_cal = 0.0
    total_pro = 0.0
    total_carb = 0.0
    total_fat = 0.0
    total_fib = 0.0
    total_sug = 0.0
    total_sod = 0.0

    breakdown = []

    for item in ingredients:
        name = str(item.get("name", "")).strip().lower()
        qty = float(item.get("quantity", 100.0))
        unit = str(item.get("unit", "g"))

        # Look up ingredient nutrition in DB
        stmt = (
            select(IngredientNutrition)
            .join(IngredientNutrition.ingredient)
            .where(IngredientNutrition.ingredient.has(name=name))
        )
        res = await db.execute(stmt)
        nut = res.scalar_one_or_none()

        grams_per_piece = nut.grams_per_piece if nut else 80.0
        grams = normalize_quantity_to_grams(qty, unit, grams_per_piece)
        ratio = grams / 100.0

        if nut:
            c = nut.calories * ratio
            p = nut.protein_g * ratio
            cb = nut.carbs_g * ratio
            f = nut.fat_g * ratio
            fb = nut.fiber_g * ratio
            sg = nut.sugar_g * ratio
            sd = nut.sodium_mg * ratio
            prov = nut.provenance
        else:
            # Conservative estimate for unlisted spices/ingredients
            c, p, cb, f, fb, sg, sd = (30.0 * ratio, 1.0 * ratio, 5.0 * ratio, 0.5 * ratio, 1.0 * ratio, 0.0, 5.0 * ratio)
            prov = "estimated"

        total_cal += c
        total_pro += p
        total_carb += cb
        total_fat += f
        total_fib += fb
        total_sug += sg
        total_sod += sd

        breakdown.append({
            "name": name,
            "quantity": qty,
            "unit": unit,
            "grams": round(grams, 1),
            "calories": round(c, 1),
            "protein_g": round(p, 1),
            "carbs_g": round(cb, 1),
            "fat_g": round(f, 1),
            "provenance": prov,
        })

    return {
        "per_serving": {
            "calories": round(total_cal / servings, 1),
            "protein_g": round(total_pro / servings, 1),
            "carbs_g": round(total_carb / servings, 1),
            "fat_g": round(total_fat / servings, 1),
            "fiber_g": round(total_fib / servings, 1),
            "sugar_g": round(total_sug / servings, 1),
            "sodium_mg": round(total_sod / servings, 1),
        },
        "total": {
            "calories": round(total_cal, 1),
            "protein_g": round(total_pro, 1),
            "carbs_g": round(total_carb, 1),
            "fat_g": round(total_fat, 1),
            "fiber_g": round(total_fib, 1),
        },
        "servings": servings,
        "ingredients_breakdown": breakdown,
        "provenance": "calculated",
    }
