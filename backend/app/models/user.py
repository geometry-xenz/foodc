import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from backend.app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), default="Chef")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    is_active = Column(Boolean, default=True)

    profile = relationship("Profile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    preference = relationship("Preference", back_populates="user", uselist=False, cascade="all, delete-orphan")
    goal = relationship("FitnessGoal", back_populates="user", uselist=False, cascade="all, delete-orphan")
    pantry_items = relationship("PantryItem", back_populates="user", cascade="all, delete-orphan")
    saved_recipes = relationship("SavedRecipe", back_populates="user", cascade="all, delete-orphan")
    meal_logs = relationship("MealLog", back_populates="user", cascade="all, delete-orphan")
    meal_plans = relationship("MealPlan", back_populates="user", cascade="all, delete-orphan")
    shopping_items = relationship("ShoppingItem", back_populates="user", cascade="all, delete-orphan")


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    age = Column(Integer, default=26)
    height_cm = Column(Float, default=175.0)
    weight_kg = Column(Float, default=70.0)
    target_weight_kg = Column(Float, default=70.0)
    biological_sex = Column(String(20), default="male") # male, female
    activity_level = Column(String(50), default="moderate") # sedentary, light, moderate, active, very_active
    measurement_units = Column(String(20), default="metric") # metric, imperial

    user = relationship("User", back_populates="profile")


class Preference(Base):
    __tablename__ = "preferences"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    dietary_lifestyle = Column(String(50), default="any") # vegetarian, vegan, eggetarian, pescatarian, non-vegetarian, jain, any
    allergies = Column(JSON, default=list) # ["peanuts", "dairy", "gluten", "soy", "shellfish", "eggs"]
    excluded_ingredients = Column(JSON, default=list)
    cuisine_preferences = Column(JSON, default=list) # ["North Indian", "South Indian", "Asian", "Mediterranean"]
    taste_preferences = Column(JSON, default=list) # ["spicy", "tangy", "savoury"]
    cooking_utensils = Column(JSON, default=lambda: ["pan", "pot", "spatula", "stove"])
    max_cooking_minutes = Column(Integer, default=45)

    user = relationship("User", back_populates="preference")


class FitnessGoal(Base):
    __tablename__ = "fitness_goals"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    primary_goal = Column(String(50), default="lean_bulk")
    # Options: fat_loss, lean_bulk, traditional_bulk, dirty_bulk, maintenance, recomposition, general_health, athletic_performance
    target_calories = Column(Float, default=2400.0)
    target_protein_g = Column(Float, default=150.0)
    target_carbs_g = Column(Float, default=260.0)
    target_fat_g = Column(Float, default=70.0)
    target_fibre_g = Column(Float, default=35.0)

    user = relationship("User", back_populates="goal")


class PantryItem(Base):
    __tablename__ = "pantry_items"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String(100), nullable=False)
    category = Column(String(50), default="Spices") # Spices, Vegetables, Fruits, Grains, Legumes, Dairy, Meat/Seafood, Oils, Other
    quantity = Column(Float, default=100.0)
    unit = Column(String(20), default="g")
    is_available = Column(Boolean, default=True)
    source = Column(String(50), default="manual") # manual, imported, camera
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="pantry_items")


class SavedRecipe(Base):
    __tablename__ = "saved_recipes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    recipe_id = Column(String(100), nullable=False)
    title = Column(String(255), nullable=False)
    image_url = Column(String(500), nullable=True)
    cuisine = Column(String(100), nullable=True)
    diet = Column(String(50), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="saved_recipes")


class MealLog(Base):
    __tablename__ = "meal_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    recipe_id = Column(String(100), nullable=True)
    recipe_title = Column(String(255), nullable=False)
    meal_type = Column(String(50), default="lunch") # breakfast, lunch, dinner, snack
    servings = Column(Float, default=1.0)
    calories = Column(Float, default=0.0)
    protein = Column(Float, default=0.0)
    carbs = Column(Float, default=0.0)
    fat = Column(Float, default=0.0)
    logged_date = Column(String(20), default=lambda: datetime.date.today().isoformat())
    logged_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="meal_logs")


class MealPlan(Base):
    __tablename__ = "meal_plans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    planned_date = Column(String(20), nullable=False) # YYYY-MM-DD
    day_of_week = Column(String(20), default="Monday")
    meal_type = Column(String(50), default="lunch") # breakfast, lunch, dinner, snack
    recipe_id = Column(String(100), nullable=False)
    recipe_title = Column(String(255), nullable=False)
    servings = Column(Float, default=1.0)
    calories = Column(Float, default=0.0)
    protein = Column(Float, default=0.0)

    user = relationship("User", back_populates="meal_plans")


class ShoppingItem(Base):
    __tablename__ = "shopping_items"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    ingredient_name = Column(String(100), nullable=False)
    quantity = Column(Float, default=1.0)
    unit = Column(String(20), default="item")
    is_purchased = Column(Boolean, default=False)
    recipe_source = Column(String(255), nullable=True)

    user = relationship("User", back_populates="shopping_items")
