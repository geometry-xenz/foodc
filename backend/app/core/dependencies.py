"""
FastAPI dependency injection.
Resolves user from either httpOnly session cookie or Authorization Bearer header.
"""
from datetime import datetime, timezone
from typing import Optional
from fastapi import Cookie, Depends, Header, Request
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.exceptions import UnauthorizedException
from app.core.security import COOKIE_NAME, hash_token
from app.database import get_db
from app.models.entities import AuthSession, User


async def get_current_user_optional(
    request: Request,
    drishyam_session: Optional[str] = Cookie(None, alias=COOKIE_NAME),
    authorization: Optional[str] = Header(None),
    db: AsyncSession = Depends(get_db),
) -> Optional[User]:
    token: Optional[str] = None
    is_session_cookie = False

    if authorization and authorization.startswith("Bearer "):
        token = authorization.split("Bearer ")[1].strip()
        is_session_cookie = False
    elif drishyam_session:
        token = drishyam_session
        is_session_cookie = True

    if not token:
        return None

    hashed = hash_token(token)
    now = datetime.now(timezone.utc)

    if is_session_cookie:
        stmt = (
            select(AuthSession)
            .where(
                AuthSession.session_hash == hashed,
                AuthSession.revoked_at.is_(None),
                AuthSession.access_expires_at > now,
            )
        )
    else:
        stmt = (
            select(AuthSession)
            .where(
                AuthSession.access_hash == hashed,
                AuthSession.revoked_at.is_(None),
                AuthSession.access_expires_at > now,
            )
        )

    res = await db.execute(stmt)
    session = res.scalar_one_or_none()
    if not session:
        return None

    # Fetch user
    user_stmt = select(User).where(User.id == session.user_id, User.is_active == True)
    user_res = await db.execute(user_stmt)
    user = user_res.scalar_one_or_none()

    # Save session info on request
    request.state.session_id = session.id
    request.state.client = session.client
    return user


async def get_current_user(
    user: Optional[User] = Depends(get_current_user_optional),
) -> User:
    if not user:
        raise UnauthorizedException("Invalid or expired authentication credentials")
    return user
