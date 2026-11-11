"""
Health and integration status endpoints.
Conforms to §5.4: reports credentials only as present/absent booleans; never exposes secrets.
"""
from fastapi import APIRouter
from app.config import get_settings
from app.services.recipedb import _calls

router = APIRouter(prefix="/api/health", tags=["health"])
settings = get_settings()


@router.get("")
async def health_check():
    return {
        "status": "healthy",
        "service": "DRISHYAM Gastronomy API",
        "version": "2.0.0",
        "database": "postgresql+psycopg"
    }


@router.get("/integrations")
async def integrations_status():
    return {
        "foodoscope": {
            "key_present": bool(settings.FOODOSCOPE_API_KEY),
            "recipedb_base": settings.FOODOSCOPE_RECIPEDB_BASE,
            "flavordb_base": settings.FOODOSCOPE_FLAVORDB_BASE,
            "live_calls_made": _calls["n"],
            "max_call_budget": settings.FOODOSCOPE_MAX_CALLS,
        },
        "vision": {
            "gemini": bool(settings.GEMINI_API_KEY or settings.GOOGLE_API_KEY),
            "openai": bool(settings.OPENAI_API_KEY),
            "model": settings.VISION_MODEL,
        },
        "usda_fdc": {
            "key_present": bool(settings.FDC_API_KEY),
        },
        "smtp": {
            "configured": bool(settings.SMTP_URL),
        }
    }
