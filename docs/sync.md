# DRISHYAM — Offline-First Synchronization Protocol

DRISHYAM implements an offline-first, client-driven, server-authoritative synchronization protocol conforming to Master Specification §5.5 and §18.

---

## 1. Protocol Architecture

```
+--------------------------------------------------------------------------+
|                            ANDROID CLIENT (ROOM)                         |
|  - Local mutations written immediately to SQLite entities                |
|  - Each mutation generates an OutboxOp with a client-generated UUID      |
|  - Room flow notifies UI instantly with zero network delay               |
+--------------------------------------------------------------------------+
                                     |
               (Network available? Periodic WorkManager / Manual Sync)
                                     v
                  POST /api/sync/push { ops: [ ... ] }
                                     |
                                     v
+--------------------------------------------------------------------------+
|                        FASTAPI BACKEND ENGINE                            |
|  1. Validate user tenancy (user_id matches authenticated session)        |
|  2. Check SyncOp ledger for op_id (duplicate idempotency gate)           |
|  3. Verify base_version against current DB version (conflict detection)  |
|  4. If match: apply mutation, increment version, record SyncOp           |
|  5. If conflict: abort row mutation, return authoritative server copy    |
+--------------------------------------------------------------------------+
                                     |
                  HTTP 200 { results: [ applied | duplicate | conflict ] }
                                     v
+--------------------------------------------------------------------------+
|                         ANDROID RECONCILIATION                           |
|  - applied: OutboxOp pruned from local queue                             |
|  - duplicate: OutboxOp pruned without side effects                       |
|  - conflict: OutboxOp removed, local Room row updated with server_data   |
+--------------------------------------------------------------------------+
```

---

## 2. Cursor Pagination & Delta Sync (`GET /api/sync/changes`)

- **Cursor Format:** Opaque base64-encoded string representing `(updated_at, entity_id)`:
  $$\text{cursor} = \text{base64}( \text{ISO8601}(\text{updated\_at}) + \text{"|"} + \text{UUID} )$$
- **Tombstones:** When a row is deleted, `deleted_at` is populated and `version` is incremented. The sync engine emits the deleted row with `"deleted": true` and `"data": null` so client caches purge the row locally.
- **Page Size:** Default 500 rows per page. The response payload returns `{ "changes": [...], "cursor": "<next_cursor>", "has_more": boolean }`.

---

## 3. Idempotent Mutation Push (`POST /api/sync/push`)

### Mutation Request Structure
```json
{
  "ops": [
    {
      "op_id": "550e8400-e29b-41d4-a716-446655440000",
      "entity": "pantry_item",
      "id": "c9bf9e57-1685-4c89-bafb-ff5af830be8a",
      "op": "upsert",
      "base_version": 1,
      "data": {
        "name": "cumin",
        "category": "Whole Aromatics",
        "quantity": 120.0,
        "unit": "g",
        "confidence": 0.96,
        "confirmed": true,
        "source": "android_scanner"
      }
    }
  ]
}
```

### Result Statuses
1. **`applied`**:
   The operation succeeded. The new version number is returned:
   ```json
   { "op_id": "...", "status": "applied", "version": 2 }
   ```
2. **`duplicate`**:
   The `op_id` was already recorded in `sync_ops`. The mutation is ignored, preventing repeated inserts or double increments:
   ```json
   { "op_id": "...", "status": "duplicate" }
   ```
3. **`conflict`**:
   The client's `base_version` did not match the current server version (concurrent edits from another device). The server is authoritative:
   ```json
   {
     "op_id": "...",
     "status": "conflict",
     "server_data": {
       "id": "c9bf9e57-1685-4c89-bafb-ff5af830be8a",
       "version": 3,
       "name": "cumin",
       "quantity": 250.0,
       "unit": "g"
     }
   }
   ```
4. **`rejected`**:
   Validation error (e.g. malformed UUID, missing required fields).

---

## 4. Verification & Testing

The complete sync life cycle is verified end-to-end by:
- **`scripts/verify-cross-platform.py`**: Executes multi-device sync, batch pushes, duplicate replays, conflict detection, and isolation.
- **`SyncAndContractTest.kt`**: Tests Android Room and Outbox contracts on JVM without requiring an emulator.
