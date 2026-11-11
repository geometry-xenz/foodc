"""
Authentication and security helpers.
Adheres to D3: Opaque tokens, no unmaintained JWT libraries.
Uses Argon2id for passwords and SHA-256 for token storage.
"""
import hashlib
import secrets
from datetime import datetime, timedelta, timezone
from typing import Tuple
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
from fastapi import Response

ph = PasswordHasher(
    time_cost=3,
    memory_cost=65536,
    parallelism=4,
    hash_len=32,
    salt_len=16
)


def hash_password(password: str) -> str:
    return ph.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        return ph.verify(hashed_password, plain_password)
    except VerifyMismatchError:
        return False
    except Exception:
        return False


def generate_opaque_token() -> str:
    """Generate 256-bit URL-safe random token."""
    return secrets.token_urlsafe(32)


def hash_token(token: str) -> str:
    """SHA-256 hash for secure database lookup."""
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def create_web_session() -> Tuple[str, str, datetime]:
    """Returns (raw_session_token, session_hash, expires_at). 7-day sliding expiry."""
    token = generate_opaque_token()
    token_hash = hash_token(token)
    expires_at = datetime.now(timezone.utc) + timedelta(days=7)
    return token, token_hash, expires_at


def create_android_token_pair() -> Tuple[str, str, str, str, datetime, datetime]:
    """Returns (raw_access, access_hash, raw_refresh, refresh_hash, access_expires, refresh_expires)."""
    raw_access = generate_opaque_token()
    access_hash = hash_token(raw_access)
    access_expires = datetime.now(timezone.utc) + timedelta(minutes=15)

    raw_refresh = generate_opaque_token()
    refresh_hash = hash_token(raw_refresh)
    refresh_expires = datetime.now(timezone.utc) + timedelta(days=30)

    return raw_access, access_hash, raw_refresh, refresh_hash, access_expires, refresh_expires


COOKIE_NAME = "drishyam_session"


def set_session_cookie(response: Response, raw_token: str, secure: bool = False):
    response.set_cookie(
        key=COOKIE_NAME,
        value=raw_token,
        httponly=True,
        samesite="lax",
        secure=secure,
        max_age=7 * 24 * 3600,
        path="/"
    )


def clear_session_cookie(response: Response):
    response.delete_cookie(
        key=COOKIE_NAME,
        path="/",
        httponly=True,
        samesite="lax"
    )
