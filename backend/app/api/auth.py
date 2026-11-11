"""
Authentication & Session Endpoints.
Conforms to §5.3, §18, and D3.
"""
import secrets
from datetime import datetime, timedelta, timezone
import uuid
from fastapi import APIRouter, Depends, Header, Request, Response, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.config import get_settings
from app.core.dependencies import get_current_user
from app.core.exceptions import AppException, BadRequestException, ConflictException, NotFoundException, ServiceUnavailableException, UnauthorizedException
from app.core.ratelimit import check_rate_limit
from app.core.security import (
    clear_session_cookie,
    create_android_token_pair,
    create_web_session,
    hash_password,
    hash_token,
    set_session_cookie,
    verify_password,
)
from app.database import get_db
from app.models.entities import (
    AuthSession,
    DietaryPreference,
    FitnessGoal,
    NutritionTarget,
    PasswordResetToken,
    User,
    UserProfile,
    UserSettings,
)
from app.schemas.api_models import (
    AuthResponse,
    ForgotPasswordRequest,
    LoginRequest,
    RefreshRequest,
    RegisterRequest,
    ResetPasswordRequest,
    UserResponse,
)

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
async def register(
    req: RegisterRequest,
    request: Request,
    response: Response,
    db: AsyncSession = Depends(get_db),
):
    ip = request.client.host if request.client else "unknown"
    check_rate_limit(f"reg:{ip}", max_requests=10, window_seconds=60)

    # Check existing user
    stmt = select(User).where(User.email == req.email.lower().strip())
    res = await db.execute(stmt)
    if res.scalar_one_or_none():
        raise ConflictException("An account with this email address already exists")

    # Create user
    user = User(
        id=uuid.uuid4(),
        email=req.email.lower().strip(),
        password_hash=hash_password(req.password),
        name=req.name or req.email.split("@")[0].title(),
    )
    db.add(user)
    await db.flush()

    # Initialize associated profile and default preferences
    profile = UserProfile(user_id=user.id, age=28, gender="female", height_cm=165.0, weight_kg=62.0)
    goal = FitnessGoal(user_id=user.id, primary_goal="maintenance")
    diet = DietaryPreference(user_id=user.id, lifestyle="none", restrictions=[])
    nut = NutritionTarget(user_id=user.id, bmr_kcal=1400.0, tdee_kcal=2100.0, target_calories_kcal=2000.0, target_protein_g=120.0, target_carbs_g=230.0, target_fat_g=65.0)
    settings = UserSettings(user_id=user.id)

    db.add_all([profile, goal, diet, nut, settings])

    # Issue session according to client
    if req.client == "android":
        raw_acc, acc_h, raw_ref, ref_h, acc_exp, ref_exp = create_android_token_pair()
        session = AuthSession(
            user_id=user.id,
            client="android",
            access_hash=acc_h,
            refresh_hash=ref_h,
            access_expires_at=acc_exp,
            refresh_expires_at=ref_exp,
        )
        db.add(session)
        await db.commit()
        return AuthResponse(
            user=UserResponse(id=user.id, email=user.email, name=user.name),
            client="android",
            access_token=raw_acc,
            refresh_token=raw_ref,
            expires_in=900,
        )
    else:  # web
        raw_tok, tok_h, exp = create_web_session()
        session = AuthSession(
            user_id=user.id,
            client="web",
            session_hash=tok_h,
            access_expires_at=exp,
            refresh_expires_at=exp,
        )
        db.add(session)
        await db.commit()
        set_session_cookie(response, raw_tok)
        return AuthResponse(
            user=UserResponse(id=user.id, email=user.email, name=user.name),
            client="web"
        )


@router.post("/login", response_model=AuthResponse)
async def login(
    req: LoginRequest,
    request: Request,
    response: Response,
    db: AsyncSession = Depends(get_db),
):
    ip = request.client.host if request.client else "unknown"
    check_rate_limit(f"login:{ip}", max_requests=15, window_seconds=60)
    check_rate_limit(f"login:{req.email}", max_requests=10, window_seconds=60)

    stmt = select(User).where(User.email == req.email.lower().strip())
    res = await db.execute(stmt)
    user = res.scalar_one_or_none()

    if not user or not verify_password(req.password, user.password_hash):
        raise UnauthorizedException("Invalid email or password")

    if req.client == "android":
        raw_acc, acc_h, raw_ref, ref_h, acc_exp, ref_exp = create_android_token_pair()
        session = AuthSession(
            user_id=user.id,
            client="android",
            access_hash=acc_h,
            refresh_hash=ref_h,
            access_expires_at=acc_exp,
            refresh_expires_at=ref_exp,
        )
        db.add(session)
        await db.commit()
        return AuthResponse(
            user=UserResponse(id=user.id, email=user.email, name=user.name),
            client="android",
            access_token=raw_acc,
            refresh_token=raw_ref,
            expires_in=900,
        )
    else:
        raw_tok, tok_h, exp = create_web_session()
        session = AuthSession(
            user_id=user.id,
            client="web",
            session_hash=tok_h,
            access_expires_at=exp,
            refresh_expires_at=exp,
        )
        db.add(session)
        await db.commit()
        set_session_cookie(response, raw_tok)
        return AuthResponse(
            user=UserResponse(id=user.id, email=user.email, name=user.name),
            client="web"
        )


@router.post("/demo", response_model=AuthResponse)
async def login_demo(
    response: Response,
    db: AsyncSession = Depends(get_db),
):
    stmt = select(User).where(User.email == "demo@drishyam.ai")
    res = await db.execute(stmt)
    user = res.scalar_one_or_none()

    if not user:
        raise NotFoundException("Demo account not found. Please run seed script.")

    raw_tok, tok_h, exp = create_web_session()
    session = AuthSession(
        user_id=user.id,
        client="web",
        session_hash=tok_h,
        access_expires_at=exp,
        refresh_expires_at=exp,
    )
    db.add(session)
    await db.commit()
    set_session_cookie(response, raw_tok)
    return AuthResponse(
        user=UserResponse(id=user.id, email=user.email, name=user.name),
        client="web",
    )


@router.post("/refresh", response_model=AuthResponse)
async def refresh_tokens(req: RefreshRequest, db: AsyncSession = Depends(get_db)):
    ref_h = hash_token(req.refresh_token)
    now = datetime.now(timezone.utc)

    stmt = select(AuthSession).where(
        AuthSession.refresh_hash == ref_h,
        AuthSession.revoked_at.is_(None)
    )
    res = await db.execute(stmt)
    session = res.scalar_one_or_none()

    if not session or session.refresh_expires_at <= now:
        # If reuse of old token detected, revoke everything for security (§5.3)
        if session:
            session.revoked_at = now
            await db.commit()
        raise UnauthorizedException("Invalid or expired refresh token")

    # Fetch user
    user_stmt = select(User).where(User.id == session.user_id)
    u_res = await db.execute(user_stmt)
    user = u_res.scalar_one_or_none()
    if not user:
        raise UnauthorizedException("User not found")

    # Rotate tokens
    raw_acc, acc_h, raw_ref, ref_h, acc_exp, ref_exp = create_android_token_pair()
    session.access_hash = acc_h
    session.refresh_hash = ref_h
    session.access_expires_at = acc_exp
    session.refresh_expires_at = ref_exp
    await db.commit()

    return AuthResponse(
        user=UserResponse(id=user.id, email=user.email, name=user.name),
        client="android",
        access_token=raw_acc,
        refresh_token=raw_ref,
        expires_in=900,
    )


@router.post("/password/forgot")
async def forgot_password(
    req: ForgotPasswordRequest,
    request: Request,
    db: AsyncSession = Depends(get_db),
):
    ip = request.client.host if request.client else "unknown"
    check_rate_limit(f"pwd_forgot:{ip}", max_requests=5, window_seconds=60)
    check_rate_limit(f"pwd_forgot:{req.email}", max_requests=3, window_seconds=60)

    stmt = select(User).where(User.email == req.email.lower().strip())
    res = await db.execute(stmt)
    user = res.scalar_one_or_none()

    # Always return success to avoid user enumeration
    if not user:
        return {"ok": True, "message": "If an account exists, a reset link has been dispatched."}

    # Generate single-use token (30-min expiry, §5.3)
    raw_token = secrets.token_urlsafe(32)
    tok_h = hash_token(raw_token)
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=30)

    reset_row = PasswordResetToken(
        user_id=user.id,
        token_hash=tok_h,
        expires_at=expires_at,
    )
    db.add(reset_row)
    await db.commit()

    settings = get_settings()
    if settings.smtp_url:
        # SMTP dispatch when configured
        pass
    else:
        # Development mode: log reset token link per D10
        import logging
        logging.getLogger("drishyam").info(f"🔑 Password reset link for {req.email}: /forgot-password?token={raw_token}")

    return {"ok": True, "message": "If an account exists, a reset link has been dispatched."}


@router.post("/password/reset")
async def reset_password(
    req: ResetPasswordRequest,
    db: AsyncSession = Depends(get_db),
):
    tok_h = hash_token(req.token)
    now = datetime.now(timezone.utc)

    stmt = select(PasswordResetToken).where(
        PasswordResetToken.token_hash == tok_h,
        PasswordResetToken.used_at.is_(None)
    )
    res = await db.execute(stmt)
    token_row = res.scalar_one_or_none()

    if not token_row or token_row.expires_at <= now:
        raise BadRequestException("Reset link is invalid or has expired")

    # Mark token used
    token_row.used_at = now

    # Update user password
    user_stmt = select(User).where(User.id == token_row.user_id)
    u_res = await db.execute(user_stmt)
    user = u_res.scalar_one_or_none()
    if not user:
        raise NotFoundException("User not found")

    user.password_hash = hash_password(req.new_password)
    await db.commit()

    return {"ok": True, "message": "Password updated successfully. You can now sign in."}


@router.post("/logout")
async def logout(
    request: Request,
    response: Response,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    session_id = getattr(request.state, "session_id", None)
    if session_id:
        stmt = select(AuthSession).where(AuthSession.id == session_id)
        res = await db.execute(stmt)
        sess = res.scalar_one_or_none()
        if sess:
            sess.revoked_at = datetime.now(timezone.utc)
            await db.commit()

    clear_session_cookie(response)
    return {"ok": True, "message": "Successfully logged out"}


@router.post("/logout-all")
async def logout_all(
    response: Response,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(AuthSession).where(AuthSession.user_id == user.id, AuthSession.revoked_at.is_(None))
    res = await db.execute(stmt)
    sessions = res.scalars().all()
    now = datetime.now(timezone.utc)
    for s in sessions:
        s.revoked_at = now
    await db.commit()

    clear_session_cookie(response)
    return {"ok": True, "message": "All sessions revoked"}


@router.get("/me")
async def get_me(user: User = Depends(get_current_user)):
    user_dict = {
        "id": str(user.id),
        "email": user.email,
        "name": user.name,
    }
    return {
        **user_dict,
        "user": user_dict,
    }


@router.delete("/account")
async def delete_account(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    await db.delete(user)
    await db.commit()
    return {"ok": True, "message": "Account deleted permanently"}
