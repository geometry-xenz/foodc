import pytest
from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.services.goal_calculator import calculate_bmr, calculate_tdee, compute_nutrition_targets

client = TestClient(app)

def test_health():
    res = client.get("/api/health")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "healthy"
    assert "integrations" in data

def test_goal_calculation():
    # 70kg, 175cm, 25yr male
    bmr = calculate_bmr(70, 175, 25, "male")
    assert bmr > 1600 and bmr < 1800
    tdee = calculate_tdee(bmr, "moderate")
    assert tdee > 2400

    targets = compute_nutrition_targets(70, 175, 25, "male", "moderate", "fat_loss")
    assert targets["target_calories"] < tdee
    assert targets["target_protein_g"] >= 140

def test_auth_and_pantry_workflow():
    # Demo login
    login_res = client.post("/api/auth/demo-login")
    assert login_res.status_code == 200
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Profile fetch
    prof_res = client.get("/api/profile", headers=headers)
    assert prof_res.status_code == 200

    # Add pantry item
    add_res = client.post("/api/pantry", headers=headers, json={
        "name": "cardamom",
        "category": "Spices",
        "quantity": 25,
        "unit": "g"
    })
    assert add_res.status_code == 200
    item_id = add_res.json()["id"]

    # Get pantry
    list_res = client.get("/api/pantry", headers=headers)
    assert list_res.status_code == 200
    names = [i["name"] for i in list_res.json()]
    assert "cardamom" in names

    # Clean up item
    del_res = client.delete(f"/api/pantry/{item_id}", headers=headers)
    assert del_res.status_code == 200

def test_recommendation_and_allergies():
    # Test recommendation with ingredients
    rec_res = client.post("/api/recommend", json={
        "ingredients": ["cumin", "turmeric", "lentils", "garlic", "onion"],
        "diet": "vegan",
        "minutes": 45
    })
    assert rec_res.status_code == 200
    data = rec_res.json()
    assert len(data["recipes"]) > 0
    top = data["recipes"][0]
    assert "final_personalized_score" in top
    assert "gastronomy_score" in top
    assert "why_drishyam_recommended" in top

def test_flavordb_substitute():
    sub_res = client.get("/api/substitute?ingredient=cumin")
    assert sub_res.status_code == 200
    data = sub_res.json()
    assert data["query_ingredient"] == "cumin"
    assert len(data["substitutions"]) > 0

def test_nutrition_analyze():
    nut_res = client.post("/api/nutrition/analyze", json={
        "recipe_title": "Paneer Dish",
        "servings": 2,
        "ingredients": [
            {"name": "paneer", "quantity": 200, "unit": "g"},
            {"name": "tomato", "quantity": 150, "unit": "g"},
            {"name": "oil", "quantity": 15, "unit": "ml"}
        ]
    })
    assert nut_res.status_code == 200
    nut_data = nut_res.json()
    assert nut_data["calories_per_serving"] > 0
    assert nut_data["protein_per_serving"] > 10
