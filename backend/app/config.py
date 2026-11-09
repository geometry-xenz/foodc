import os
from pydantic import BaseModel

class Settings(BaseModel):
    PROJECT_NAME: str = "DRISHYAM: Computational Gastronomy Copilot"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"
    
    # Foodoscope Configuration
    FOODOSCOPE_API_KEY: str = os.getenv("FOODOSCOPE_API_KEY", "")
    FOODOSCOPE_BASE_URL: str = os.getenv("FOODOSCOPE_BASE_URL", "https://api.foodoscope.com")
    RECIPEDB_BASE_URL: str = os.getenv("RECIPEDB_BASE_URL", "https://api.foodoscope.com/recipe2-api")
    FLAVORDB_BASE_URL: str = os.getenv("FLAVORDB_BASE_URL", "https://api.foodoscope.com/flavordb")
    
    # Vision & LLM Provider (Fallback / Deep Inspect)
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    VISION_PROVIDER: str = os.getenv("VISION_PROVIDER", "gemini-2.0-flash")
    
    # Caching & Resilience
    CACHE_DIR: str = os.getenv("CACHE_DIR", "backend/cache")
    CACHE_TTL: int = int(os.getenv("CACHE_TTL", "86400")) # 24 hours
    OFFLINE_MODE: bool = os.getenv("OFFLINE_MODE", "false").lower() in ("true", "1", "yes")

settings = Settings()
