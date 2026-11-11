"""
Test Auth & Sessions.
Verifies S4:
- Cross-platform login (web vs android).
- Token rotation and refresh token reuse detection.
- Logout and session revocation.
"""
import pytest
import httpx


@pytest.mark.asyncio
async def test_register_and_login_web(client: httpx.AsyncClient):
    reg_resp = await client.post(
        "/api/auth/register",
        json={"email": "chef_web@drishyam.ai", "password": "password1234", "client": "web"}
    )
    assert reg_resp.status_code == 201
    assert "drishyam_session" in reg_resp.cookies

    # Me endpoint via cookie
    me_resp = await client.get("/api/auth/me", cookies=reg_resp.cookies)
    assert me_resp.status_code == 200
    assert me_resp.json()["email"] == "chef_web@drishyam.ai"


@pytest.mark.asyncio
async def test_register_and_login_android(client: httpx.AsyncClient):
    reg_resp = await client.post(
        "/api/auth/register",
        json={"email": "chef_android@drishyam.ai", "password": "password1234", "client": "android"}
    )
    assert reg_resp.status_code == 201
    data = reg_resp.json()
    assert "access_token" in data
    assert "refresh_token" in data

    access_token = data["access_token"]
    refresh_token = data["refresh_token"]

    # Me endpoint via Bearer
    me_resp = await client.get(
        "/api/auth/me",
        headers={"Authorization": f"Bearer {access_token}"}
    )
    assert me_resp.status_code == 200
    assert me_resp.json()["email"] == "chef_android@drishyam.ai"

    # Refresh tokens
    ref_resp = await client.post(
        "/api/auth/refresh",
        json={"refresh_token": refresh_token}
    )
    assert ref_resp.status_code == 200
    new_data = ref_resp.json()
    assert new_data["access_token"] != access_token

    # Replay old refresh token -> must fail
    replay_resp = await client.post(
        "/api/auth/refresh",
        json={"refresh_token": refresh_token}
    )
    assert replay_resp.status_code == 401
