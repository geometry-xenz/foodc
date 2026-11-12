"""
Offline-First Sync API.
Conforms to §5.4 and §5.5 (bootstrap, delta changes, and idempotent push).
Supports web/CLI sync operations and Android client SyncPushRequestDto / SyncStatusResponseDto.
"""
from datetime import datetime, timezone
import time
from typing import Optional
import uuid
from fastapi import APIRouter, Depends, Query
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.dependencies import get_current_user
from app.database import get_db
from app.models.entities import PantryItem, User
from app.schemas.api_models import SyncPushRequest
from app.services.gastronomy import norm
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
    """Push local client mutation operations to the server (supports ops and pantryUpdates)."""
    now = datetime.now(timezone.utc)
    server_version = int(time.time())

    # 1. Handle Android direct pantryUpdates list
    if req.pantryUpdates:
        synced_count = 0
        for p in req.pantryUpdates:
            raw_name = str(p.get("name", "")).strip()
            if not raw_name:
                continue
            canonical = norm(raw_name)
            qty = float(p.get("quantity", 100.0))
            unit = str(p.get("unit", "g"))
            src = str(p.get("source", "android_sync"))
            conf = float(p.get("confidence", 1.0))
            confirmed = bool(p.get("confirmed", True))

            # Upsert
            stmt = select(PantryItem).where(
                PantryItem.user_id == user.id,
                PantryItem.name.ilike(canonical),
                PantryItem.deleted_at.is_(None)
            )
            res = await db.execute(stmt)
            existing = res.scalar_one_or_none()
            if existing:
                existing.quantity = qty
                existing.unit = unit
                existing.source = src
                existing.confidence = conf
                existing.confirmed = confirmed
                existing.version += 1
                existing.updated_at = now
            else:
                raw_id = p.get("id")
                item_uuid = uuid.uuid4()
                if raw_id:
                    try:
                        item_uuid = uuid.UUID(str(raw_id))
                    except (ValueError, TypeError):
                        pass

                new_p = PantryItem(
                    id=item_uuid,
                    user_id=user.id,
                    name=canonical,
                    quantity=qty,
                    unit=unit,
                    source=src,
                    confidence=conf,
                    confirmed=confirmed,
                    version=1,
                    updated_at=now,
                )
                db.add(new_p)
            synced_count += 1

        await db.commit()
        return {
            "status": "synchronized",
            "serverVersion": server_version,
            "syncedRecords": synced_count,
        }

    # 2. Handle generic SyncOpItem list
    if req.ops:
        service = SyncService(db, user)
        results = await service.push_ops([op.model_dump() for op in req.ops])
        await db.commit()
        return {
            "status": "synchronized",
            "serverVersion": server_version,
            "syncedRecords": len(req.ops),
            "results": results,
        }

    return {
        "status": "synchronized",
        "serverVersion": server_version,
        "syncedRecords": 0,
    }


@router.get("/status")
async def sync_status(user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    stmt = select(func.count(PantryItem.id)).where(PantryItem.user_id == user.id, PantryItem.deleted_at.is_(None))
    res = await db.execute(stmt)
    count = res.scalar_one() or 0
    now_version = int(time.time())

    return {
        "status": "synchronized",
        "serverVersion": now_version,
        "syncedRecords": count,
        "ok": True,
        "user_id": str(user.id),
    }
