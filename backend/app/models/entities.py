"""
SQLAlchemy 2 models adhering to DRISHYAM Master Specification §5.1, §5.2, and §19.
All entities use UUID primary keys, explicit timestamps, versions, and tombstones (deleted_at).
"""
import uuid
from datetime import datetime, timezone
from typing import List, Optional
from sqlalchemy import (
    Boolean,
    DateTime,
    Float,
    ForeignKey,
    Index,
    Integer,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


# ==============================================================================
# Mixins
# ==============================================================================

class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=utcnow, nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=utcnow, onupdate=utcnow, nullable=False
    )
    deleted_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), nullable=True
    )


class VersionedMixin(TimestampMixin):
    version: Mapped[int] = mapped_column(Integer, default=1, nullable=False)


# ==============================================================================
# Identity & Auth (§5.3, D3)
# ==============================================================================

class User(Base, TimestampMixin):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    name: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    # Relationships
    profile: Mapped[Optional["UserProfile"]] = relationship("UserProfile", back_populates="user", cascade="all, delete-orphan", uselist=False)
    sessions: Mapped[List["AuthSession"]] = relationship("AuthSession", back_populates="user", cascade="all, delete-orphan")
    pantry_items: Mapped[List["PantryItem"]] = relationship("PantryItem", back_populates="user", cascade="all, delete-orphan")
    meal_plans: Mapped[List["MealPlan"]] = relationship("MealPlan", back_populates="user", cascade="all, delete-orphan")
    meal_logs: Mapped[List["MealLog"]] = relationship("MealLog", back_populates="user", cascade="all, delete-orphan")
    saved_recipes: Mapped[List["SavedRecipe"]] = relationship("SavedRecipe", back_populates="user", cascade="all, delete-orphan")
    shopping_items: Mapped[List["ShoppingItem"]] = relationship("ShoppingItem", back_populates="user", cascade="all, delete-orphan")


class UserProfile(Base, VersionedMixin):
    __tablename__ = "user_profiles"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    
    age: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    gender: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)  # male, female, non_binary, prefer_not_to_say
    height_cm: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    weight_kg: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    activity_level: Mapped[Optional[str]] = mapped_column(String(30), default="moderate")  # sedentary, light, moderate, active, very_active
    experience_level: Mapped[Optional[str]] = mapped_column(String(30), default="intermediate")
    kitchen_equipment: Mapped[Optional[list]] = mapped_column(JSONB, default=list)

    user: Mapped["User"] = relationship("User", back_populates="profile")


class AuthSession(Base):
    __tablename__ = "auth_sessions"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    client: Mapped[str] = mapped_column(String(20), nullable=False)  # "web" | "android"
    
    # Opaque token hashes (SHA-256)
    session_hash: Mapped[Optional[str]] = mapped_column(String(64), index=True, nullable=True)
    access_hash: Mapped[Optional[str]] = mapped_column(String(64), index=True, nullable=True)
    refresh_hash: Mapped[Optional[str]] = mapped_column(String(64), index=True, nullable=True)
    
    access_expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    refresh_expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    revoked_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, nullable=False)

    user: Mapped["User"] = relationship("User", back_populates="sessions")


class PasswordResetToken(Base):
    __tablename__ = "password_reset_tokens"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    token_hash: Mapped[str] = mapped_column(String(64), index=True, nullable=False)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    used_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, nullable=False)


# ==============================================================================
# Personalisation & Preferences (§5.1, §7, §19)
# ==============================================================================

class FitnessGoal(Base, VersionedMixin):
    __tablename__ = "fitness_goals"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    
    primary_goal: Mapped[str] = mapped_column(String(40), default="maintenance", nullable=False)  # fat_loss, lean_bulk, bulk, dirty_bulk, maintenance, recomposition, athletic_performance, general_health
    secondary_goals: Mapped[list] = mapped_column(JSONB, default=list, nullable=False)
    target_weight_kg: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    weekly_change_kg: Mapped[Optional[float]] = mapped_column(Float, nullable=True)


class DietaryPreference(Base, VersionedMixin):
    __tablename__ = "dietary_preferences"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    
    lifestyle: Mapped[str] = mapped_column(String(30), default="none", nullable=False)  # vegetarian, vegan, eggetarian, pescatarian, non_vegetarian, none
    restrictions: Mapped[list] = mapped_column(JSONB, default=list, nullable=False)     # dairy_free, lactose_free, gluten_free, jain, etc.


class Allergy(Base, VersionedMixin):
    __tablename__ = "allergies"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    allergen: Mapped[str] = mapped_column(String(50), nullable=False)  # peanut, tree_nut, dairy, egg, soy, gluten, shellfish, fish, etc.
    severity: Mapped[str] = mapped_column(String(20), default="severe")


class IngredientExclusion(Base, VersionedMixin):
    __tablename__ = "ingredient_exclusions"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    ingredient_name: Mapped[str] = mapped_column(String(100), nullable=False)
    reason: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)


class UserSettings(Base, VersionedMixin):
    __tablename__ = "user_settings"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    
    sound_enabled: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    haptics_enabled: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    unit_system: Mapped[str] = mapped_column(String(20), default="metric", nullable=False)  # metric, imperial
    reduced_motion: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)


class NutritionTarget(Base, VersionedMixin):
    __tablename__ = "nutrition_targets"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    
    bmr_kcal: Mapped[float] = mapped_column(Float, nullable=False)
    tdee_kcal: Mapped[float] = mapped_column(Float, nullable=False)
    target_calories_kcal: Mapped[float] = mapped_column(Float, nullable=False)
    target_protein_g: Mapped[float] = mapped_column(Float, nullable=False)
    target_carbs_g: Mapped[float] = mapped_column(Float, nullable=False)
    target_fat_g: Mapped[float] = mapped_column(Float, nullable=False)
    target_fiber_g: Mapped[float] = mapped_column(Float, default=30.0, nullable=False)
    
    is_override: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    overrides: Mapped[dict] = mapped_column(JSONB, default=dict, nullable=False)


# ==============================================================================
# Catalogue & Culinary Science (§5.2, §12, §13)
# ==============================================================================

class PantryCategory(Base):
    __tablename__ = "pantry_categories"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    description: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)


class Ingredient(Base):
    __tablename__ = "ingredients"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    display_name: Mapped[str] = mapped_column(String(100), nullable=False)
    category: Mapped[str] = mapped_column(String(50), nullable=False)
    diet_flags: Mapped[list] = mapped_column(JSONB, default=list, nullable=False)  # ["vegetarian", "vegan", ...]
    allergen_flags: Mapped[list] = mapped_column(JSONB, default=list, nullable=False)
    fdc_id: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    provenance: Mapped[str] = mapped_column(String(50), default="curated_fixture", nullable=False)

    aliases: Mapped[List["IngredientAlias"]] = relationship("IngredientAlias", back_populates="ingredient", cascade="all, delete-orphan")
    nutrition: Mapped[Optional["IngredientNutrition"]] = relationship("IngredientNutrition", back_populates="ingredient", uselist=False, cascade="all, delete-orphan")


class IngredientAlias(Base):
    __tablename__ = "ingredient_aliases"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    ingredient_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("ingredients.id", ondelete="CASCADE"), nullable=False)
    alias: Mapped[str] = mapped_column(String(100), index=True, nullable=False)
    language: Mapped[str] = mapped_column(String(10), default="en", nullable=False)  # "en", "hi", etc.

    ingredient: Mapped["Ingredient"] = relationship("Ingredient", back_populates="aliases")


class IngredientNutrition(Base):
    __tablename__ = "ingredient_nutrition"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    ingredient_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("ingredients.id", ondelete="CASCADE"), unique=True, nullable=False)
    
    # Nutrition per 100g
    calories: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    protein_g: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    carbs_g: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    fat_g: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    fiber_g: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    sugar_g: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    sodium_mg: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    micros: Mapped[dict] = mapped_column(JSONB, default=dict, nullable=False)
    grams_per_piece: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    provenance: Mapped[str] = mapped_column(String(50), default="usda_fdc", nullable=False)

    ingredient: Mapped["Ingredient"] = relationship("Ingredient", back_populates="nutrition")


class Recipe(Base):
    __tablename__ = "recipes"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title: Mapped[str] = mapped_column(String(200), index=True, nullable=False)
    cuisine: Mapped[str] = mapped_column(String(50), nullable=False)
    diet: Mapped[str] = mapped_column(String(30), nullable=False)
    minutes: Mapped[int] = mapped_column(Integer, default=30, nullable=False)
    servings: Mapped[int] = mapped_column(Integer, default=2, nullable=False)
    utensils: Mapped[list] = mapped_column(JSONB, default=list, nullable=False)
    
    # Calculated Nutrition per serving
    calories: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    protein_g: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    carbs_g: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    fat_g: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    fiber_g: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)

    source: Mapped[str] = mapped_column(String(50), default="demo", nullable=False)  # recipedb_live, demo
    source_id: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)

    ingredients: Mapped[List["RecipeIngredient"]] = relationship("RecipeIngredient", back_populates="recipe", cascade="all, delete-orphan")
    instructions: Mapped[List["RecipeInstruction"]] = relationship("RecipeInstruction", back_populates="recipe", cascade="all, delete-orphan", order_by="RecipeInstruction.step_number")


class RecipeIngredient(Base):
    __tablename__ = "recipe_ingredients"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    recipe_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("recipes.id", ondelete="CASCADE"), nullable=False)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    quantity: Mapped[float] = mapped_column(Float, default=100.0, nullable=False)
    unit: Mapped[str] = mapped_column(String(20), default="g", nullable=False)
    is_core: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    recipe: Mapped["Recipe"] = relationship("Recipe", back_populates="ingredients")


class RecipeInstruction(Base):
    __tablename__ = "recipe_instructions"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    recipe_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("recipes.id", ondelete="CASCADE"), nullable=False)
    step_number: Mapped[int] = mapped_column(Integer, nullable=False)
    instruction: Mapped[str] = mapped_column(Text, nullable=False)

    recipe: Mapped["Recipe"] = relationship("Recipe", back_populates="instructions")


class FlavourCompound(Base):
    __tablename__ = "flavour_compounds"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(150), index=True, nullable=False)
    pubchem_id: Mapped[Optional[int]] = mapped_column(Integer, unique=True, nullable=True)
    aroma_profile: Mapped[list] = mapped_column(JSONB, default=list, nullable=False)


class IngredientCompound(Base):
    __tablename__ = "ingredient_compounds"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    ingredient_name: Mapped[str] = mapped_column(String(100), index=True, nullable=False)
    compound_name: Mapped[str] = mapped_column(String(150), index=True, nullable=False)
    pubchem_id: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)

    __table_args__ = (
        UniqueConstraint("ingredient_name", "compound_name", name="uq_ing_compound"),
    )


class ExternalCache(Base):
    __tablename__ = "external_cache"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    cache_key: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    payload: Mapped[dict] = mapped_column(JSONB, nullable=False)
    is_miss: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    fetched_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, nullable=False)


# ==============================================================================
# User Data & Synchronization (§5.5, §10, §14, §15)
# ==============================================================================

class PantryItem(Base, VersionedMixin):
    __tablename__ = "pantry_items"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    category: Mapped[str] = mapped_column(String(50), default="Spices", nullable=False)
    quantity: Mapped[float] = mapped_column(Float, default=100.0, nullable=False)
    unit: Mapped[str] = mapped_column(String(20), default="g", nullable=False)
    
    confidence: Mapped[float] = mapped_column(Float, default=1.0, nullable=False)
    confirmed: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    source: Mapped[str] = mapped_column(String(50), default="manual", nullable=False)  # manual, android_scanner, deep_inspect, import
    
    expires_on: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    low_stock_at: Mapped[Optional[float]] = mapped_column(Float, nullable=True)

    user: Mapped["User"] = relationship("User", back_populates="pantry_items")


class SavedRecipe(Base, VersionedMixin):
    __tablename__ = "saved_recipes"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    recipe_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("recipes.id", ondelete="CASCADE"), nullable=False)
    notes: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    user: Mapped["User"] = relationship("User", back_populates="saved_recipes")
    recipe: Mapped["Recipe"] = relationship("Recipe")


class RecipeHistory(Base):
    __tablename__ = "recipe_history"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    recipe_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("recipes.id", ondelete="CASCADE"), nullable=False)
    event_type: Mapped[str] = mapped_column(String(20), nullable=False)  # viewed, cooked
    recorded_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, nullable=False)


class MealPlan(Base, VersionedMixin):
    __tablename__ = "meal_plans"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    title: Mapped[str] = mapped_column(String(100), default="Weekly Plan", nullable=False)
    start_date: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    end_date: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)

    user: Mapped["User"] = relationship("User", back_populates="meal_plans")
    meals: Mapped[List["PlannedMeal"]] = relationship("PlannedMeal", back_populates="plan", cascade="all, delete-orphan")


class PlannedMeal(Base, VersionedMixin):
    __tablename__ = "planned_meals"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    plan_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("meal_plans.id", ondelete="CASCADE"), index=True, nullable=False)
    recipe_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("recipes.id", ondelete="CASCADE"), nullable=False)
    
    date: Mapped[str] = mapped_column(String(10), nullable=False)  # YYYY-MM-DD
    meal_type: Mapped[str] = mapped_column(String(30), nullable=False)  # breakfast, lunch, dinner, snack
    position: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    servings: Mapped[float] = mapped_column(Float, default=1.0, nullable=False)

    plan: Mapped["MealPlan"] = relationship("MealPlan", back_populates="meals")
    recipe: Mapped["Recipe"] = relationship("Recipe")


class MealLog(Base, VersionedMixin):
    __tablename__ = "meal_logs"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    
    date: Mapped[str] = mapped_column(String(10), index=True, nullable=False)  # YYYY-MM-DD
    meal_type: Mapped[str] = mapped_column(String(30), nullable=False)
    eaten_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, nullable=False)
    
    # Nutrition Snapshot
    total_calories: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    total_protein_g: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    total_carbs_g: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    total_fat_g: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    notes: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    user: Mapped["User"] = relationship("User", back_populates="meal_logs")
    items: Mapped[List["MealLogItem"]] = relationship("MealLogItem", back_populates="meal_log", cascade="all, delete-orphan")


class MealLogItem(Base):
    __tablename__ = "meal_log_items"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    meal_log_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("meal_logs.id", ondelete="CASCADE"), nullable=False)
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    recipe_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), nullable=True)
    servings: Mapped[float] = mapped_column(Float, default=1.0, nullable=False)
    calories: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    protein_g: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    carbs_g: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    fat_g: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)

    meal_log: Mapped["MealLog"] = relationship("MealLog", back_populates="items")


class DailyNutritionSummary(Base, TimestampMixin):
    __tablename__ = "daily_nutrition_summaries"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    date: Mapped[str] = mapped_column(String(10), nullable=False)
    
    total_calories: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    total_protein_g: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    total_carbs_g: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    total_fat_g: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    total_fiber_g: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)

    __table_args__ = (
        UniqueConstraint("user_id", "date", name="uq_user_daily_summary"),
    )


class ShoppingItem(Base, VersionedMixin):
    __tablename__ = "shopping_items"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    quantity: Mapped[float] = mapped_column(Float, default=1.0, nullable=False)
    unit: Mapped[str] = mapped_column(String(20), default="piece", nullable=False)
    purchased: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    reason: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)  # "low_stock", "recipe_gap"
    recipe_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), nullable=True)

    user: Mapped["User"] = relationship("User", back_populates="shopping_items")


class SyncOp(Base):
    __tablename__ = "sync_ops"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    op_id: Mapped[str] = mapped_column(String(64), nullable=False)
    entity: Mapped[str] = mapped_column(String(50), nullable=False)
    entity_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=False)
    applied_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, nullable=False)

    __table_args__ = (
        UniqueConstraint("user_id", "op_id", name="uq_user_op_id"),
    )
