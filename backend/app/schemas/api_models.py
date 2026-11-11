"""
Pydantic v2 schemas for typed API contracts.
Conforms to DRISHYAM Master Specification §5.4 and D11.
"""
from datetime import datetime
from typing import Any, Dict, List, Optional
import uuid
from pydantic import BaseModel, EmailStr, Field


# ==============================================================================
# Auth Schemas
# ==============================================================================

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)
    name: Optional[str] = None
    client: str = Field("web", pattern="^(web|android)$")


class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    client: str = Field("web", pattern="^(web|android)$")


class RefreshRequest(BaseModel):
    refresh_token: str


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str = Field(..., min_length=8)


class UserResponse(BaseModel):
    id: uuid.UUID
    email: str
    name: Optional[str] = None


class AuthResponse(BaseModel):
    user: UserResponse
    client: str
    access_token: Optional[str] = None
    refresh_token: Optional[str] = None
    expires_in: Optional[int] = None


# ==============================================================================
# Profile & Goals Schemas
# ==============================================================================

class ProfileUpdateRequest(BaseModel):
    age: Optional[int] = None
    gender: Optional[str] = None
    height_cm: Optional[float] = None
    weight_kg: Optional[float] = None
    activity_level: Optional[str] = None
    experience_level: Optional[str] = None
    kitchen_equipment: Optional[List[str]] = None
    version: Optional[int] = None


class GoalCalculateRequest(BaseModel):
    age: int
    gender: str
    height_cm: float
    weight_kg: float
    activity_level: str
    goal: str
    overrides: Optional[Dict[str, float]] = None


class GoalUpdateRequest(BaseModel):
    primary_goal: str
    secondary_goals: Optional[List[str]] = None
    target_weight_kg: Optional[float] = None
    version: Optional[int] = None


class PreferenceUpdateRequest(BaseModel):
    lifestyle: str
    restrictions: Optional[List[str]] = None
    version: Optional[int] = None


class SettingsUpdateRequest(BaseModel):
    sound_enabled: Optional[bool] = None
    haptics_enabled: Optional[bool] = None
    unit_system: Optional[str] = None
    reduced_motion: Optional[bool] = None
    version: Optional[int] = None


# ==============================================================================
# Pantry Schemas
# ==============================================================================

class PantryItemCreate(BaseModel):
    name: str
    category: str = "Spices"
    quantity: float = 100.0
    unit: str = "g"
    confidence: float = 1.0
    confirmed: bool = True
    source: str = "manual"


class PantryItemUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    quantity: Optional[float] = None
    unit: Optional[str] = None
    confidence: Optional[float] = None
    confirmed: Optional[bool] = None
    version: Optional[int] = None


# ==============================================================================
# Recipe & Recommendation Schemas
# ==============================================================================

class RecommendRequest(BaseModel):
    ingredients: Optional[List[str]] = None
    minutes: Optional[int] = None
    diet: str = "any"
    utensils: Optional[List[str]] = None
    top_k: int = 10
    slot: str = "dinner"


# ==============================================================================
# Sync Schemas (§5.5)
# ==============================================================================

class SyncOpItem(BaseModel):
    op_id: str
    entity: str
    id: str
    op: str = "upsert"  # upsert, delete
    base_version: Optional[int] = None
    data: Optional[Dict[str, Any]] = None


class SyncPushRequest(BaseModel):
    ops: List[SyncOpItem]
