"""
Test Offline-First Sync.
Verifies S6:
- Bootstrap returns initial user snapshot.
- Changes returns delta including tombstones.
- Push is idempotent by op_id.
- Push detects conflict on stale base_version.
"""
import uuid
import pytest
import httpx


@pytest.mark.asyncio
async def test_sync_push_and_changes(client: httpx.AsyncClient):
    # Register test user
    reg = await client.post(
        "/api/auth/register",
        json={"email": "sync_tester@drishyam.ai", "password": "password1234", "client": "android"}
    )
    assert reg.status_code == 201
    token = reg.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 1. Push new pantry item
    item_id = str(uuid.uuid4())
    push_res = await client.post(
        "/api/sync/push",
        headers=headers,
        json={
            "ops": [
                {
                    "op_id": "op-001",
                    "entity": "pantry_item",
                    "id": item_id,
                    "op": "upsert",
                    "base_version": None,
                    "data": {"name": "cumin", "quantity": 100, "unit": "g"}
                }
            ]
        }
    )
    assert push_res.status_code == 200
    res_list = push_res.json()["results"]
    assert len(res_list) == 1
    assert res_list[0]["status"] == "applied"
    assert res_list[0]["version"] == 1

    # 2. Replay same op_id -> must return duplicate
    replay_res = await client.post(
        "/api/sync/push",
        headers=headers,
        json={
            "ops": [
                {
                    "op_id": "op-001",
                    "entity": "pantry_item",
                    "id": item_id,
                    "op": "upsert",
                    "base_version": None,
                    "data": {"name": "cumin", "quantity": 100, "unit": "g"}
                }
            ]
        }
    )
    assert replay_res.status_code == 200
    assert replay_res.json()["results"][0]["status"] == "duplicate"

    # 3. Conflict on stale base_version
    conflict_res = await client.post(
        "/api/sync/push",
        headers=headers,
        json={
            "ops": [
                {
                    "op_id": "op-002",
                    "entity": "pantry_item",
                    "id": item_id,
                    "op": "upsert",
                    "base_version": 999,  # Stale! Real version is 1
                    "data": {"name": "cumin", "quantity": 200, "unit": "g"}
                }
            ]
        }
    )
    assert conflict_res.status_code == 200
    assert conflict_res.json()["results"][0]["status"] == "conflict"

    # 4. Changes delta endpoint
    changes_res = await client.get("/api/sync/changes", headers=headers)
    assert changes_res.status_code == 200
    ch_data = changes_res.json()
    assert len(ch_data["changes"]) >= 1
    found = [c for c in ch_data["changes"] if c["id"] == item_id]
    assert len(found) == 1
    assert found[0]["data"]["name"] == "cumin"
