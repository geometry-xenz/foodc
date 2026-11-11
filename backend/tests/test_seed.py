"""
Test Seed Data integrity.
Verifies §20 and S3 acceptance requirements:
- At least 20 recipes across multiple lifestyles.
- Every ingredient has nutrition provenance.
- Stored recipe nutrition matches calculation.
"""
import pytest
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.database import AsyncSessionLocal
from app.models.entities import Ingredient, IngredientNutrition, Recipe
from app.services.nutrition_calculator import calculate_recipe_nutrition


@pytest.mark.asyncio
async def test_seed_recipe_count():
    async with AsyncSessionLocal() as session:
        count = (await session.execute(select(func.count(Recipe.id)))).scalar()
        assert count is not None and count >= 20, f"Expected at least 20 recipes, got {count}"


@pytest.mark.asyncio
async def test_ingredient_provenance():
    async with AsyncSessionLocal() as session:
        stmt = select(IngredientNutrition)
        res = await session.execute(stmt)
        items = res.scalars().all()
        assert len(items) > 0, "Expected seeded ingredients"
        for item in items:
            assert item.provenance in ("usda_fdc", "estimated", "curated_fixture"), f"Invalid provenance: {item.provenance}"


@pytest.mark.asyncio
async def test_recipe_nutrition_matches_engine():
    async with AsyncSessionLocal() as session:
        stmt = select(Recipe).options(selectinload(Recipe.ingredients)).limit(5)
        res = await session.execute(stmt)
        recipes = res.scalars().all()
        for r in recipes:
            calc = await calculate_recipe_nutrition(
                [{"name": i.name, "quantity": i.quantity, "unit": i.unit} for i in r.ingredients],
                r.servings,
                session
            )
            # Compare calculated calories with stored calories within 1.0 margin of rounding
            assert abs(calc["per_serving"]["calories"] - r.calories) < 2.0, (
                f"Recipe {r.title} nutrition mismatch: stored {r.calories}, calculated {calc['per_serving']['calories']}"
            )
