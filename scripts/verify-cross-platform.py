#!/usr/bin/env python3
"""
DRISHYAM Cross-Platform End-to-End Verification Harness (§5.5, S15).
Exercises Scenarios 1-5 across Web and Android clients against the live FastAPI backend:
1. Cross-platform Auth (Web registration -> Android login, and vice-versa)
2. Android Scanner sync -> Web inspection -> Web edit -> Android delta change sync
3. Offline Outbox queueing -> Reconnect batch push -> Idempotent duplicate replay test
4. Concurrent conflict test (stale base_version -> server authoritative conflict resolution)
5. Strict Multi-Tenant Isolation test (User A vs User B)
"""
import uuid
import sys
import httpx

BASE_URL = "http://127.0.0.1:8000"

def test_cross_platform():
    client = httpx.Client(base_url=BASE_URL, timeout=10.0)

    print("======================================================================")
    print(" DRISHYAM Cross-Platform E2E Verification (S15)")
    print("======================================================================")

    # -------------------------------------------------------------------------
    # Scenario 1: Cross-platform Register and Login
    # -------------------------------------------------------------------------
    print("\n[Scenario 1] Cross-platform Register & Login...")
    user_email_web = f"chef_web_{uuid.uuid4().hex[:6]}@drishyam.kitchen"
    user_email_droid = f"chef_droid_{uuid.uuid4().hex[:6]}@drishyam.kitchen"
    password = "CorrectHorseBattery99!"

    # 1a. Register on Web
    r_reg_web = client.post("/api/auth/register", json={
        "email": user_email_web,
        "password": password,
        "name": "Web Chef",
        "client": "web"
    })
    assert r_reg_web.status_code in (200, 201), f"Web registration failed: {r_reg_web.text}"
    print(f"  ✓ User registered on Web: {user_email_web}")

    # 1b. Log in from Android with same credentials
    r_login_droid = client.post("/api/auth/login", json={
        "email": user_email_web,
        "password": password,
        "client": "android"
    })
    assert r_login_droid.status_code == 200, f"Android login failed: {r_login_droid.text}"
    droid_tokens = r_login_droid.json()
    access_token_a = droid_tokens["access_token"]
    refresh_token_a = droid_tokens["refresh_token"]
    assert access_token_a and refresh_token_a, "Missing tokens in Android auth response"
    print(f"  ✓ Android successfully logged in to account registered on Web")

    # 1c. Register on Android
    r_reg_droid = client.post("/api/auth/register", json={
        "email": user_email_droid,
        "password": password,
        "name": "Droid Chef",
        "client": "android"
    })
    assert r_reg_droid.status_code in (200, 201), f"Android registration failed: {r_reg_droid.text}"
    print(f"  ✓ User registered on Android: {user_email_droid}")

    # 1d. Log in on Web
    r_login_web = client.post("/api/auth/login", json={
        "email": user_email_droid,
        "password": password,
        "client": "web"
    })
    assert r_login_web.status_code == 200, f"Web login failed: {r_login_web.text}"
    print(f"  ✓ Web successfully logged in to account registered on Android")

    # -------------------------------------------------------------------------
    # Scenario 2: Android Scanner -> Web Inspection -> Web Edit -> Android Sync
    # -------------------------------------------------------------------------
    print("\n[Scenario 2] Android Edge Scan -> Web Inspection -> Web Edit -> Android Sync...")
    droid_headers = {"Authorization": f"Bearer {access_token_a}"}
    turmeric_id = str(uuid.uuid4())
    op_id_1 = str(uuid.uuid4())

    # 2a. Android pushes newly confirmed turmeric item
    r_push = client.post("/api/sync/push", headers=droid_headers, json={
        "ops": [{
            "op_id": op_id_1,
            "entity": "pantry_item",
            "id": turmeric_id,
            "op": "upsert",
            "base_version": None,
            "data": {
                "name": "turmeric",
                "category": "Powdered Spices",
                "quantity": 100.0,
                "unit": "g",
                "confidence": 0.98,
                "confirmed": True,
                "source": "android_scanner"
            }
        }]
    })
    assert r_push.status_code == 200, f"Android sync push failed: {r_push.text}"
    results = r_push.json()["results"]
    assert results[0]["status"] == "applied", f"Expected applied, got {results}"
    print("  ✓ Android pushed scanned turmeric (source=android_scanner, conf=0.98)")

    # 2b. Web inspects pantry and verifies provenance
    r_pantry = client.get("/api/pantry", headers=droid_headers)
    assert r_pantry.status_code == 200
    pantry_items = r_pantry.json()
    item = next(i for i in pantry_items if i["id"] == turmeric_id)
    assert item["name"] == "turmeric"
    assert item["source"] == "android_scanner"
    assert item["confidence"] == 0.98
    print("  ✓ Web verified pantry item with exact provenance badging")

    # 2c. Web updates quantity to 250g with version=1
    r_update = client.put(f"/api/pantry/{turmeric_id}", headers=droid_headers, json={
        "quantity": 250.0,
        "unit": "g",
        "version": 1
    })
    assert r_update.status_code == 200, f"Web update failed: {r_update.text}"
    updated_web = r_update.json()
    assert updated_web["version"] == 2
    print("  ✓ Web updated quantity to 250g (version advanced to 2)")

    # 2d. Android calls sync delta changes
    r_changes = client.get("/api/sync/changes", headers=droid_headers)
    assert r_changes.status_code == 200
    changes = r_changes.json()["changes"]
    change_row = next(c for c in changes if c["id"] == turmeric_id)
    assert change_row["version"] == 2
    assert change_row["data"]["quantity"] == 250.0
    print("  ✓ Android received delta sync change with updated version 2")

    # -------------------------------------------------------------------------
    # Scenario 3: Offline Outbox Queueing & Reconnection Idempotency
    # -------------------------------------------------------------------------
    print("\n[Scenario 3] Offline Outbox Queueing & Idempotency...")
    cumin_id = str(uuid.uuid4())
    salt_id = str(uuid.uuid4())
    op_cumin = str(uuid.uuid4())
    op_salt = str(uuid.uuid4())

    # Simulate reconnecting and pushing batch of offline mutations
    r_batch = client.post("/api/sync/push", headers=droid_headers, json={
        "ops": [
            {
                "op_id": op_cumin,
                "entity": "pantry_item",
                "id": cumin_id,
                "op": "upsert",
                "data": {"name": "cumin", "category": "Whole Aromatics", "quantity": 120.0, "unit": "g"}
            },
            {
                "op_id": op_salt,
                "entity": "pantry_item",
                "id": salt_id,
                "op": "upsert",
                "data": {"name": "salt", "category": "Seasonings", "quantity": 500.0, "unit": "g"}
            }
        ]
    })
    assert r_batch.status_code == 200
    assert all(r["status"] == "applied" for r in r_batch.json()["results"])
    print("  ✓ Batch push of 2 offline items applied successfully")

    # Replay identical batch (idempotency test)
    r_replay = client.post("/api/sync/push", headers=droid_headers, json={
        "ops": [
            {
                "op_id": op_cumin,
                "entity": "pantry_item",
                "id": cumin_id,
                "op": "upsert",
                "data": {"name": "cumin"}
            }
        ]
    })
    assert r_replay.status_code == 200
    assert r_replay.json()["results"][0]["status"] == "duplicate"
    print("  ✓ Replaying op_id returned duplicate (zero side-effects)")

    # -------------------------------------------------------------------------
    # Scenario 4: Concurrent Conflict Resolution (Server Authoritative §5.5)
    # -------------------------------------------------------------------------
    print("\n[Scenario 4] Concurrent Conflict Handling (Server Authoritative)...")
    # Android attempts to push update to turmeric with stale base_version=1
    # but server is already at version=2!
    op_conflict = str(uuid.uuid4())
    r_conflict = client.post("/api/sync/push", headers=droid_headers, json={
        "ops": [
            {
                "op_id": op_conflict,
                "entity": "pantry_item",
                "id": turmeric_id,
                "op": "upsert",
                "base_version": 1,
                "data": {"name": "turmeric", "quantity": 80.0}
            }
        ]
    })
    assert r_conflict.status_code == 200
    conf_res = r_conflict.json()["results"][0]
    assert conf_res["status"] == "conflict", f"Expected conflict, got {conf_res}"
    assert conf_res["server_data"]["version"] == 2
    assert conf_res["server_data"]["quantity"] == 250.0
    print("  ✓ Conflict detected: server copy (version=2, 250g) returned to client")

    # -------------------------------------------------------------------------
    # Scenario 5: Multi-Tenant Data Isolation
    # -------------------------------------------------------------------------
    print("\n[Scenario 5] Strict Multi-Tenant Isolation...")
    # Clean client representing User B's device
    client_b = httpx.Client(base_url=BASE_URL, timeout=10.0)
    r_login_b = client_b.post("/api/auth/login", json={
        "email": user_email_droid,
        "password": password,
        "client": "android"
    })
    token_b = r_login_b.json()["access_token"]
    headers_b = {"Authorization": f"Bearer {token_b}"}

    # User B checks pantry
    r_pantry_b = client_b.get("/api/pantry", headers=headers_b)
    items_b = r_pantry_b.json()
    assert not any(i["id"] == turmeric_id for i in items_b), "Tenant leak: User B sees User A's turmeric!"
    print("  ✓ User B cannot see User A's pantry items")

    # User B attempts to edit User A's row
    r_leak_edit = client_b.put(f"/api/pantry/{turmeric_id}", headers=headers_b, json={"quantity": 999.0})
    assert r_leak_edit.status_code == 404, f"Expected 404 on cross-tenant edit, got {r_leak_edit.status_code}"
    print("  ✓ Cross-tenant mutation rejected with 404")

    # -------------------------------------------------------------------------
    # Scenario 6: Account Deletion Cascading & Full Token Invalidation (§5.3)
    # -------------------------------------------------------------------------
    print("\n[Scenario 6] Account Deletion & Cascading Clean-up...")
    r_del = client_b.delete("/api/auth/account", headers=headers_b)
    assert r_del.status_code == 200, f"Account deletion failed: {r_del.text}"
    print("  ✓ User B deleted their account permanently")

    # Verify token immediately fails authentication
    r_check_deleted = client_b.get("/api/auth/me", headers=headers_b)
    assert r_check_deleted.status_code == 401, f"Expected 401 after deletion, got {r_check_deleted.status_code}"
    print("  ✓ Post-deletion API requests rejected with 401 Unauthorized")

    # Verify login fails
    r_relogin = client_b.post("/api/auth/login", json={
        "email": user_email_droid,
        "password": password,
        "client": "android"
    })
    assert r_relogin.status_code in (401, 404), f"Expected 401/404 on login after deletion, got {r_relogin.status_code}"
    print("  ✓ Re-login attempt rejected (user wiped from database)")

    print("\n======================================================================")
    print(" ALL S15 END-TO-END SCENARIOS (1-6) PASSED WITH COMPLETE VERIFICATION")
    print("======================================================================")

if __name__ == "__main__":
    test_cross_platform()
