"""
DRISHYAM FastAPI Application.
Conforms to DRISHYAM Master Specification §3, §17, §25, and D1.
Serves both Next.js Web App and Native Android Mobile Application.
"""
from contextlib import asynccontextmanager
import time
import uuid
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.api import (
    auth,
    flavordb,
    health,
    meal_planner,
    nutrition,
    pantry,
    profile,
    public,
    recipes,
    recommend,
    scan,
    shopping,
    sync,
)
from app.config import get_settings
from app.core.exceptions import AppException, app_exception_handler
from app.database import engine
from app.models.entities import Base

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Ensure database schema exists on startup
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()


app = FastAPI(
    title="DRISHYAM — Computational Gastronomy & Metabolic Intelligence API",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# Exception handlers
app.add_exception_handler(AppException, app_exception_handler)

# CORS Allowlist
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["X-Request-ID"],
)


@app.middleware("http")
async def request_id_and_timing_middleware(request: Request, call_next):
    req_id = request.headers.get("X-Request-ID") or str(uuid.uuid4())
    request.state.request_id = req_id
    start_time = time.perf_counter()

    try:
        response = await call_next(request)
    except Exception as exc:
        import traceback
        traceback.print_exc()
        response = JSONResponse(
            status_code=500,
            content={
                "error": {
                    "code": "INTERNAL_SERVER_ERROR",
                    "message": "An unexpected server error occurred.",
                    "request_id": req_id,
                }
            },
        )

    duration_ms = (time.perf_counter() - start_time) * 1000.0
    response.headers["X-Request-ID"] = req_id
    response.headers["X-Response-Time"] = f"{duration_ms:.2f}ms"
    return response


# Register Routers
app.include_router(public.router)
app.include_router(health.router)
app.include_router(auth.router)
app.include_router(profile.router)
app.include_router(pantry.router)
app.include_router(recipes.router)
app.include_router(recommend.router)
app.include_router(flavordb.router)
app.include_router(nutrition.router)
app.include_router(meal_planner.router)
app.include_router(shopping.router)
app.include_router(scan.router)
app.include_router(sync.router)
