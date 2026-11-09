import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, RedirectResponse

from backend.app.config import settings
from backend.app.database import init_db, SessionLocal
from backend.app.models.user import User, Profile, Preference, FitnessGoal, PantryItem
from backend.app.core.security import get_password_hash
from backend.app.services.goal_calculator import compute_nutrition_targets
from backend.app.routes import (
    health,
    auth,
    profile,
    pantry,
    recipes,
    recommend,
    flavordb,
    nutrition,
    meal_planner,
    shopping
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database tables
    init_db()
    
    # Seed demo chef user if not present
    db = SessionLocal()
    try:
        demo_user = db.query(User).filter(User.email == "demo@drishyam.ai").first()
        if not demo_user:
            demo_user = User(
                email="demo@drishyam.ai",
                hashed_password=get_password_hash("drishyam2026"),
                full_name="Chef Suman"
            )
            db.add(demo_user)
            db.commit()
            db.refresh(demo_user)

            prof = Profile(user_id=demo_user.id, age=26, height_cm=176, weight_kg=72, target_weight_kg=75)
            pref = Preference(user_id=demo_user.id, dietary_lifestyle="vegetarian")
            targets = compute_nutrition_targets(72, 176, 26, "male", "active", "lean_bulk")
            goal = FitnessGoal(
                user_id=demo_user.id,
                primary_goal="lean_bulk",
                target_calories=targets["target_calories"],
                target_protein_g=targets["target_protein_g"],
                target_carbs_g=targets["target_carbs_g"],
                target_fat_g=targets["target_fat_g"],
                target_fibre_g=targets["target_fibre_g"]
            )
            db.add_all([prof, pref, goal])

            # Seed Indian pantry staples
            default_staples = [
                ("turmeric", "Spices", 250, "g"),
                ("cumin", "Whole Spices", 200, "g"),
                ("mustard seeds", "Whole Spices", 150, "g"),
                ("red chilli", "Spices", 200, "g"),
                ("coriander seeds", "Whole Spices", 200, "g"),
                ("garam masala", "Spices", 100, "g"),
                ("salt", "Baking & Seasoning", 1000, "g"),
                ("onion", "Fresh Produce", 1000, "g"),
                ("tomato", "Fresh Produce", 800, "g"),
                ("garlic", "Fresh Produce", 250, "g"),
                ("ginger", "Fresh Produce", 200, "g"),
                ("green chilli", "Fresh Produce", 150, "g"),
                ("cooking oil", "Oils & Vinegars", 1000, "ml"),
                ("rice", "Grains", 1000, "g")
            ]
            for s_name, s_cat, s_qty, s_unit in default_staples:
                db.add(PantryItem(user_id=demo_user.id, name=s_name, category=s_cat, quantity=s_qty, unit=s_unit))

            db.commit()
    except Exception as e:
        print(f"Warning: Database seeding error: {e}")
    finally:
        db.close()

    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="DRISHYAM — AI-Powered Computational Gastronomy, Recipe Discovery & Personalized Nutrition Platform",
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Also expose /health at root for load balancers and probes
@app.get("/health")
async def root_health():
    return await health.health_check()

# Register API routers
app.include_router(health.router, prefix=settings.API_PREFIX)
app.include_router(auth.router, prefix=settings.API_PREFIX)
app.include_router(profile.router, prefix=settings.API_PREFIX)
app.include_router(pantry.router, prefix=settings.API_PREFIX)
app.include_router(recipes.router, prefix=settings.API_PREFIX)
app.include_router(recommend.router, prefix=settings.API_PREFIX)
app.include_router(flavordb.router, prefix=settings.API_PREFIX)
app.include_router(nutrition.router, prefix=settings.API_PREFIX)
app.include_router(meal_planner.router, prefix=settings.API_PREFIX)
app.include_router(shopping.router, prefix=settings.API_PREFIX)

# Static files and assets
frontend_dist = os.path.join(os.path.dirname(__file__), "..", "..", "frontend", "dist")

if os.path.exists(frontend_dist):
    # Mount assets subfolder
    assets_dir = os.path.join(frontend_dist, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    # Mount videos subfolder
    videos_dir = os.path.join(frontend_dist, "videos")
    if os.path.exists(videos_dir):
        app.mount("/videos", StaticFiles(directory=videos_dir), name="videos")

    # Mount images subfolder
    images_dir = os.path.join(frontend_dist, "images")
    if os.path.exists(images_dir):
        app.mount("/images", StaticFiles(directory=images_dir), name="images")

    @app.api_route("/", methods=["GET", "HEAD"])
    def index():
        return FileResponse(os.path.join(frontend_dist, "index.html"))

    @app.api_route("/app{full_path:path}", methods=["GET", "HEAD"])
    def app_spa(full_path: str = ""):
        return FileResponse(os.path.join(frontend_dist, "index.html"))
else:
    @app.api_route("/", methods=["GET", "HEAD"])
    def index():
        return {
            "name": "DRISHYAM AI Computational Gastronomy Platform",
            "status": "online",
            "api_docs": "/docs",
            "health": "/api/health"
        }
