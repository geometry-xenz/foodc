import os
import json
import logging
from typing import Dict, Any, List
from backend.app.services.flavordb import flavordb_client
from backend.app.models.schemas import NutritionRequest, NutritionResponse

logger = logging.getLogger(__name__)

DATA_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "nutrition_dataset.json")

class NutritionService:
    def __init__(self):
        self._nutrition_data = self._load_data()

    def _load_data(self) -> Dict[str, Any]:
        try:
            if os.path.exists(DATA_FILE):
                with open(DATA_FILE, "r", encoding="utf-8") as f:
                    return json.load(f)
        except Exception as e:
            logger.error(f"Error loading nutrition dataset: {e}")
        return {"ingredients": {}}

    def normalize(self, name: str) -> str:
        return flavordb_client.normalize_ingredient(name)

    def calculate_nutrition(self, request: NutritionRequest) -> NutritionResponse:
        total_cal = 0.0
        total_protein = 0.0
        total_carbs = 0.0
        total_fat = 0.0
        total_fibre = 0.0
        total_sugar = 0.0
        total_sodium = 0.0
        total_sat_fat = 0.0
        total_iron = 0.0
        total_calcium = 0.0
        total_vit_c = 0.0

        breakdowns = []
        ingredients_db = self._nutrition_data.get("ingredients", {})

        for item in request.ingredients:
            raw_name = item.get("name", "")
            norm = self.normalize(raw_name)
            qty = float(item.get("quantity", 50))
            unit = item.get("unit", "g").lower()

            # Convert units to grams approximately
            grams = qty
            if unit in ("ml", "milliliter"):
                grams = qty * 1.0
            elif unit in ("tbsp", "tablespoon"):
                grams = qty * 14.0
            elif unit in ("tsp", "teaspoon"):
                grams = qty * 4.5
            elif unit in ("pinch", "pinches"):
                grams = qty * 0.5
            elif unit in ("pieces", "pods", "cloves", "large"):
                # Rough average piece weights
                if "egg" in norm:
                    grams = qty * 50.0
                elif "garlic" in norm:
                    grams = qty * 4.0
                elif "cardamom" in norm or "clove" in norm:
                    grams = qty * 0.5
                else:
                    grams = qty * 20.0

            profile = ingredients_db.get(norm)
            if not profile:
                # Fuzzy fallback
                for k, v in ingredients_db.items():
                    if k in norm or norm in k:
                        profile = v
                        break

            if profile:
                p100 = profile.get("per_100g", {})
                factor = grams / 100.0

                c_cal = p100.get("calories", 0) * factor
                c_prot = p100.get("protein", 0) * factor
                c_carb = p100.get("carbs", 0) * factor
                c_fat = p100.get("fat", 0) * factor
                c_fib = p100.get("fibre", 0) * factor
                c_sug = p100.get("sugar", 0) * factor
                c_sod = p100.get("sodium_mg", 0) * factor
                c_sat = p100.get("saturated_fat", 0) * factor
                c_iron = p100.get("iron_mg", 0) * factor
                c_calc = p100.get("calcium_mg", 0) * factor
                c_vitc = p100.get("vitamin_c_mg", 0) * factor

                total_cal += c_cal
                total_protein += c_prot
                total_carbs += c_carb
                total_fat += c_fat
                total_fibre += c_fib
                total_sugar += c_sug
                total_sodium += c_sod
                total_sat_fat += c_sat
                total_iron += c_iron
                total_calcium += c_calc
                total_vit_c += c_vitc

                breakdowns.append({
                    "ingredient": profile.get("name", raw_name),
                    "amount": f"{qty} {unit} ({round(grams, 1)}g)",
                    "calories": round(c_cal, 1),
                    "protein_g": round(c_prot, 1),
                    "carbs_g": round(c_carb, 1),
                    "fat_g": round(c_fat, 1),
                    "primary_contribution": "Protein & Fat" if c_prot > 5 or c_fat > 5 else "Carbs & Micronutrients" if c_carb > 5 else "Aromatics & Spices"
                })
            else:
                # Modest estimate for unlisted spices/aromatics
                breakdowns.append({
                    "ingredient": raw_name.title(),
                    "amount": f"{qty} {unit}",
                    "calories": 10.0,
                    "protein_g": 0.2,
                    "carbs_g": 1.5,
                    "fat_g": 0.2,
                    "primary_contribution": "Aromatics & Flavoring (Estimated)"
                })

        servings = max(1, request.servings)

        return NutritionResponse(
            calories_total=round(total_cal, 1),
            calories_per_serving=round(total_cal / servings, 1),
            protein_total=round(total_protein, 1),
            protein_per_serving=round(total_protein / servings, 1),
            carbs_total=round(total_carbs, 1),
            carbs_per_serving=round(total_carbs / servings, 1),
            fat_total=round(total_fat, 1),
            fat_per_serving=round(total_fat / servings, 1),
            fibre_total=round(total_fibre, 1),
            fibre_per_serving=round(total_fibre / servings, 1),
            sugar_total=round(total_sugar, 1),
            sodium_total_mg=round(total_sodium, 1),
            saturated_fat_g=round(total_sat_fat, 1),
            micronutrients={
                "Iron": f"{round(total_iron / servings, 1)} mg",
                "Calcium": f"{round(total_calcium / servings, 1)} mg",
                "Vitamin C": f"{round(total_vit_c / servings, 1)} mg"
            },
            ingredient_breakdown=breakdowns,
            data_source="computational_nutrition_profile (Food Composition Database)",
            is_estimate=True
        )

nutrition_service = NutritionService()
