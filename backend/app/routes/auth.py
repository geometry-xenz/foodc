import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session

from backend.app.database import get_db
from backend.app.models.user import User, Profile, Preference, FitnessGoal, PantryItem
from backend.app.core.security import verify_password, get_password_hash, create_access_token, get_current_user
from backend.app.services.goal_calculator import compute_nutrition_targets

router = APIRouter(prefix="/auth", tags=["Authentication"])

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str = "Culinary Creator"

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict

@router.post("/register", response_model=TokenResponse)
def register(req: RegisterRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == req.email.lower()).first()
    if existing:
        raise HTTPException(status_code=400, detail="An account with this email already exists.")

    new_user = User(
        email=req.email.lower(),
        hashed_password=get_password_hash(req.password),
        full_name=req.full_name
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Initialize default profile, preference, goal
    prof = Profile(user_id=new_user.id)
    pref = Preference(user_id=new_user.id)
    
    targets = compute_nutrition_targets(70, 175, 26, "male", "moderate", "lean_bulk")
    goal = FitnessGoal(
        user_id=new_user.id,
        primary_goal="lean_bulk",
        target_calories=targets["target_calories"],
        target_protein_g=targets["target_protein_g"],
        target_carbs_g=targets["target_carbs_g"],
        target_fat_g=targets["target_fat_g"],
        target_fibre_g=targets["target_fibre_g"]
    )
    db.add_all([prof, pref, goal])

    # Add default pantry staples
    default_staples = [
        ("turmeric", "Spices", 50, "g"),
        ("cumin", "Spices", 80, "g"),
        ("onion", "Vegetables", 500, "g"),
        ("tomato", "Vegetables", 400, "g"),
        ("garlic", "Vegetables", 80, "g"),
        ("lentils", "Legumes", 500, "g")
    ]
    for s_name, s_cat, s_qty, s_unit in default_staples:
        db.add(PantryItem(user_id=new_user.id, name=s_name, category=s_cat, quantity=s_qty, unit=s_unit))

    db.commit()

    token = create_access_token({"sub": str(new_user.id), "email": new_user.email})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": new_user.id,
            "email": new_user.email,
            "full_name": new_user.full_name
        }
    }

@router.post("/login", response_model=TokenResponse)
def login(req: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email.lower()).first()
    if not user or not verify_password(req.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password.")

    token = create_access_token({"sub": str(user.id), "email": user.email})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name
        }
    }

@router.post("/demo-login", response_model=TokenResponse)
def demo_login(db: Session = Depends(get_db)):
    """Fast single-click login for demonstration mode"""
    demo_email = "demo@drishyam.ai"
    user = db.query(User).filter(User.email == demo_email).first()
    if not user:
        # Create demo user
        user = User(
            email=demo_email,
            hashed_password=get_password_hash("drishyam2026"),
            full_name="Drishyam Demo Chef"
        )
        db.add(user)
        db.commit()
        db.refresh(user)

        prof = Profile(user_id=user.id, age=26, height_cm=178, weight_kg=74, target_weight_kg=76)
        pref = Preference(user_id=user.id, dietary_lifestyle="vegetarian")
        targets = compute_nutrition_targets(74, 178, 26, "male", "active", "lean_bulk")
        goal = FitnessGoal(
            user_id=user.id,
            primary_goal="lean_bulk",
            target_calories=targets["target_calories"],
            target_protein_g=targets["target_protein_g"],
            target_carbs_g=targets["target_carbs_g"],
            target_fat_g=targets["target_fat_g"],
            target_fibre_g=targets["target_fibre_g"]
        )
        db.add_all([prof, pref, goal])

        # Add starter pantry items
        default_staples = [
            ("turmeric", "Spices", 50, "g"),
            ("cumin", "Spices", 80, "g"),
            ("black pepper", "Spices", 40, "g"),
            ("onion", "Vegetables", 500, "g"),
            ("tomato", "Vegetables", 400, "g"),
            ("garlic", "Vegetables", 80, "g"),
            ("ginger", "Vegetables", 100, "g"),
            ("paneer", "Dairy", 250, "g"),
            ("lentils", "Legumes", 500, "g"),
            ("rice", "Grains", 1000, "g")
        ]
        for s_name, s_cat, s_qty, s_unit in default_staples:
            db.add(PantryItem(user_id=user.id, name=s_name, category=s_cat, quantity=s_qty, unit=s_unit))
        db.commit()

    token = create_access_token({"sub": str(user.id), "email": user.email})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name
        }
    }

@router.get("/me")
def get_me(user: User = Depends(get_current_user)):
    return {
        "id": user.id,
        "email": user.email,
        "full_name": user.full_name,
        "created_at": user.created_at.isoformat()
    }

@router.post("/logout")
def logout():
    return {"message": "Logged out successfully."}
