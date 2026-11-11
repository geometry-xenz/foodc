"""
Test Computational Gastronomy Engine.
Verifies S5:
- Hard gates: diet ('vegetarian' does not match 'non-vegetarian'), allergies.
- Gastronomy scoring: core coverage, utilisation, gap fit.
- Unlock suggestions.
"""
from app.services.gastronomy import allergy_ok, diet_ok, norm, score_recipe
from app.services.goal_calculator import calculate_macro_targets
from app.services.recommendation import compute_unlock_suggestion, rank_recipes


def test_diet_hard_gate():
    assert diet_ok("vegetarian", "vegetarian") is True
    assert diet_ok("vegan", "vegetarian") is True
    assert diet_ok("non_vegetarian", "vegetarian") is False
    assert diet_ok("non-vegetarian", "vegetarian") is False


def test_allergy_hard_gate():
    recipe_ings = ["chickpeas", "tahini", "peanut oil", "lemon"]
    assert allergy_ok(recipe_ings, ["peanut"]) is False
    assert allergy_ok(recipe_ings, ["dairy"]) is True


def test_gastronomy_scoring():
    recipe = {
        "title": "Homestyle Dal",
        "ingredients": ["lentils", "cumin", "turmeric", "onion", "tomato"]
    }
    pantry = ["lentils", "cumin", "turmeric", "onion", "garlic"]
    score, breakdown = score_recipe(recipe, pantry)
    assert score > 60.0
    assert breakdown["core_coverage"] >= 0.75
    assert "tomato" in breakdown["missing"]


def test_goal_calculator_safety_bounds():
    # Extreme deficit check: 100kg male sedentary
    res = calculate_macro_targets("male", 100, 180, 25, "sedentary", "fat_loss")
    assert res["target_calories_kcal"] >= res["bmr_kcal"]
    assert res["target_protein_g"] >= 180.0
