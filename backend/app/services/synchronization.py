"""
Offline-First Synchronization Engine.
Adheres to DRISHYAM Master Specification §5.5 and §18:
- Server-authoritative with optimistic client concurrency.
- Idempotent op execution via op_id tracking.
- Stale base_version detection returning HTTP 409 conflict payload.
"""
import base64
from datetime import datetime, timezone
import json
from typing import Any, Dict, List, Optional
import uuid
from sqlalchemy import and_, select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.entities import (
    DietaryPreference,
    FitnessGoal,
    MealLog,
    MealPlan,
    NutritionTarget,
    PantryItem,
    PlannedMeal,
    SavedRecipe,
    ShoppingItem,
    SyncOp,
    User,
    UserProfile,
    UserSettings,
)


def encode_cursor(dt: datetime, row_id: uuid.UUID) -> str:
    raw = f"{dt.isoformat()}|{str(row_id)}"
    return base64.b64encode(raw.encode("utf-8")).decode("utf-8")


def decode_cursor(cursor: str) -> Optional[tuple]:
    try:
        raw = base64.b64decode(cursor.encode("utf-8")).decode("utf-8")
        dt_str, row_id_str = raw.split("|", 1)
        return datetime.fromisoformat(dt_str), uuid.UUID(row_id_str)
    except Exception:
        return None


class SyncService:
    def __init__(self, db: AsyncSession, user: User):
        self.db = db
        self.user = user

    async def get_changes(self, since_cursor: Optional[str] = None, limit: int = 500) -> Dict[str, Any]:
        """Fetch delta changes across user collections including tombstones."""
        min_dt = datetime.min.replace(tzinfo=timezone.utc)
        if since_cursor:
            decoded = decode_cursor(since_cursor)
            if decoded:
                min_dt, _ = decoded

        changes: List[Dict[str, Any]] = []

        # 1. Pantry items
        p_stmt = (
            select(PantryItem)
            .where(PantryItem.user_id == self.user.id, PantryItem.updated_at >= min_dt)
            .order_by(PantryItem.updated_at.asc())
            .limit(limit)
        )
        res_p = await self.db.execute(p_stmt)
        for item in res_p.scalars().all():
            changes.append({
                "entity": "pantry_item",
                "id": str(item.id),
                "version": item.version,
                "deleted": item.deleted_at is not None,
                "updated_at": item.updated_at.isoformat(),
                "data": {
                    "name": item.name,
                    "category": item.category,
                    "quantity": item.quantity,
                    "unit": item.unit,
                    "confidence": item.confidence,
                    "confirmed": item.confirmed,
                    "source": item.source,
                } if not item.deleted_at else None
            })

        # 2. Shopping items
        s_stmt = (
            select(ShoppingItem)
            .where(ShoppingItem.user_id == self.user.id, ShoppingItem.updated_at >= min_dt)
            .order_by(ShoppingItem.updated_at.asc())
            .limit(limit)
        )
        res_s = await self.db.execute(s_stmt)
        for s in res_s.scalars().all():
            changes.append({
                "entity": "shopping_item",
                "id": str(s.id),
                "version": s.version,
                "deleted": s.deleted_at is not None,
                "updated_at": s.updated_at.isoformat(),
                "data": {
                    "name": s.name,
                    "quantity": s.quantity,
                    "unit": s.unit,
                    "purchased": s.purchased,
                    "reason": s.reason,
                } if not s.deleted_at else None
            })

        has_more = len(changes) >= limit
        next_cursor = None
        if changes:
            last = changes[-1]
            last_dt = datetime.fromisoformat(last["updated_at"])
            next_cursor = encode_cursor(last_dt, uuid.UUID(last["id"]))

        return {
            "changes": changes,
            "cursor": next_cursor,
            "has_more": has_more
        }

    async def push_ops(self, ops: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Process mutation operations with idempotency and conflict detection."""
        results = []

        for op in ops:
            op_id = str(op.get("op_id", ""))
            entity = str(op.get("entity", ""))
            entity_id_str = str(op.get("id", ""))
            action = str(op.get("op", "upsert"))
            base_version = op.get("base_version")
            data = op.get("data") or {}

            try:
                entity_id = uuid.UUID(entity_id_str)
            except Exception:
                results.append({"op_id": op_id, "status": "rejected", "error": "Invalid UUID format"})
                continue

            # Idempotency check: has this op_id already been applied?
            stmt_dup = select(SyncOp).where(SyncOp.user_id == self.user.id, SyncOp.op_id == op_id)
            res_dup = await self.db.execute(stmt_dup)
            if res_dup.scalar_one_or_none():
                results.append({"op_id": op_id, "status": "duplicate"})
                continue

            # Handle PantryItem
            if entity == "pantry_item":
                stmt_row = select(PantryItem).where(PantryItem.id == entity_id, PantryItem.user_id == self.user.id)
                res_row = await self.db.execute(stmt_row)
                row = res_row.scalar_one_or_none()

                if action == "delete":
                    if row:
                        row.deleted_at = datetime.now(timezone.utc)
                        row.version += 1
                        results.append({"op_id": op_id, "status": "applied", "version": row.version})
                    else:
                        results.append({"op_id": op_id, "status": "applied", "version": 1})

                else:  # upsert
                    if row:
                        if base_version is not None and row.version != base_version:
                            # Conflict! Server copy wins
                            results.append({
                                "op_id": op_id,
                                "status": "conflict",
                                "server_data": {
                                    "id": str(row.id),
                                    "version": row.version,
                                    "name": row.name,
                                    "quantity": row.quantity,
                                    "unit": row.unit,
                                }
                            })
                            continue
                        row.name = data.get("name", row.name)
                        row.category = data.get("category", row.category)
                        row.quantity = float(data.get("quantity", row.quantity))
                        row.unit = data.get("unit", row.unit)
                        row.source = data.get("source", row.source)
                        row.confidence = float(data.get("confidence", row.confidence))
                        row.confirmed = bool(data.get("confirmed", row.confirmed))
                        row.version += 1
                        new_version = row.version
                    else:
                        new_item = PantryItem(
                            id=entity_id,
                            user_id=self.user.id,
                            name=data.get("name", "Unknown"),
                            category=data.get("category", "Spices"),
                            quantity=float(data.get("quantity", 100.0)),
                            unit=data.get("unit", "g"),
                            source=data.get("source", "manual"),
                            confidence=float(data.get("confidence", 1.0)),
                            confirmed=bool(data.get("confirmed", True)),
                            version=1
                        )
                        self.db.add(new_item)
                        new_version = 1

                    results.append({"op_id": op_id, "status": "applied", "version": new_version})

            # Record SyncOp
            sync_op = SyncOp(
                user_id=self.user.id,
                op_id=op_id,
                entity=entity,
                entity_id=entity_id
            )
            self.db.add(sync_op)

        await self.db.flush()
        return results
