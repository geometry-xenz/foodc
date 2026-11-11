"""
Offline-First Sync API.
Conforms to §5.4 and §5.5 (bootstrap, delta changes, and idempotent push).
"""
from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.dependencies import get_current_user
from app.database import get_db
from app.models.entities import User
from app.schemas.api_models import SyncPushRequest
from app.services.synchronization import SyncService

router = APIRouter(prefix="/api/sync", tags=["sync"])


@router.get("/bootstrap")
async def sync_bootstrap(user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    """Full bootstrap of user dataset for mobile offline storage initialization."""
    service = SyncService(db, user)
    return await service.get_changes(since_cursor=None, limit=1000)


@router.get("/changes")
async def sync_changes(
    since: Optional[str] = Query(None),
    limit: int = 500,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Delta synchronization since a given cursor."""
    service = SyncService(db, user)
    return await service.get_changes(since_cursor=since, limit=limit)


@router.post("/push")
async def sync_push(
    req: SyncPushRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Push local client mutation operations to the server."""
    service = SyncService(db, user)
    results = await service.push_ops([op.model_dump() for op in req.ops])
    await db.commit()
    return {"results": results}


@router.get("/status")
async def sync_status(user: User = Depends(get_current_user)):
    return {
        "ok": True,
        "user_id": str(user.id),
        "status": "synchronized"
    }
