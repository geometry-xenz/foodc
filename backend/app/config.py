"""
Application configuration using pydantic-settings.
Adheres to DRISHYAM Master Specification §17 and D1.
"""
from functools import lru_cache
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

    # Core environment
    ENVIRONMENT: str = "development"
    SECRET_KEY: str = "drishyam_super_secret_gastronomy_key_2026_dev_mode"
    DATABASE_URL: str = "postgresql+psycopg://postgres@localhost:5432/drishyam?host=/tmp"
    TEST_DATABASE_URL: str = "postgresql+psycopg://postgres@localhost:5432/drishyam_test?host=/tmp"

    # Foodoscope
    FOODOSCOPE_API_KEY: str = ""
    FOODOSCOPE_RECIPEDB_BASE: str = "https://api.foodoscope.com"
    FOODOSCOPE_FLAVORDB_BASE: str = "https://api.foodoscope.com/flavordb"
    FOODOSCOPE_CACHE_TTL: int = 86400  # 24h
    FOODOSCOPE_MAX_CALLS: int = 150
    FOODOSCOPE_TIMEOUT: float = 15.0

    # Vision Fallback (Deep Inspect only)
    GEMINI_API_KEY: str = ""
    GOOGLE_API_KEY: str = ""
    OPENAI_API_KEY: str = ""
    VISION_MODEL: str = "gemini-flash-lite-latest"

    # USDA FoodData Central
    FDC_API_KEY: str = "DEMO_KEY"

    # Mail / Alerts
    SMTP_URL: str = ""

    # CORS allowlist
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://10.0.2.2:3000",
        "http://localhost:8000",
    ]


@lru_cache()
def get_settings() -> Settings:
    return Settings()
