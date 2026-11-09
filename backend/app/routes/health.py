from fastapi import APIRouter
from backend.app.config import settings

router = APIRouter(tags=["Health"])

@router.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "integrations": {
            "recipedb": {
                "configured": bool(settings.FOODOSCOPE_API_KEY),
                "endpoint": settings.RECIPEDB_BASE_URL,
                "mode": "live_api" if settings.FOODOSCOPE_API_KEY and not settings.OFFLINE_MODE else "offline_resilient_dataset"
            },
            "flavordb": {
                "configured": bool(settings.FOODOSCOPE_API_KEY),
                "endpoint": settings.FLAVORDB_BASE_URL,
                "mode": "live_api" if settings.FOODOSCOPE_API_KEY and not settings.OFFLINE_MODE else "offline_molecular_profiles"
            },
            "vlm_deep_inspect": {
                "configured": bool(settings.GEMINI_API_KEY),
                "provider": settings.VISION_PROVIDER,
                "mode": "gemini_vlm" if settings.GEMINI_API_KEY and not settings.OFFLINE_MODE else "edge_spectral_classifier"
            }
        },
        "offline_mode_forced": settings.OFFLINE_MODE,
        "cache_ttl_seconds": settings.CACHE_TTL
    }
