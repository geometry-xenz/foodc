"""
Deep Inspect scan endpoint.
Conforms to §4, §5.4, §21, and D7.
Supports both multipart/form-data (web/CLI) and application/json (Android Retrofit).
"""
import base64
import logging
from typing import Optional
from fastapi import APIRouter, File, Form, Query, Request, UploadFile
from app.core.exceptions import AppException
from app.core.ratelimit import check_rate_limit
from app.services.vision import deep_inspect

logger = logging.getLogger("drishyam.scan")
router = APIRouter(prefix="/api/scan", tags=["scan"])


@router.post("/deep-inspect")
async def scan_deep_inspect(
    request: Request,
    image: Optional[UploadFile] = File(None),
    consent: Optional[bool] = Form(None),
    consent_query: Optional[bool] = Query(None, alias="consent"),
):
    ip = request.client.host if request.client else "unknown"
    check_rate_limit(f"inspect:{ip}", max_requests=20, window_seconds=60)

    content_type = request.headers.get("content-type", "")

    # Handle JSON payload (e.g. Android client DeepInspectRequestDto)
    if "application/json" in content_type:
        try:
            body = await request.json()
        except Exception:
            raise AppException(400, "INVALID_JSON", "Invalid JSON payload in request body.")

        raw_b64 = body.get("imageBase64") or body.get("image") or ""
        if not raw_b64:
            raise AppException(400, "MISSING_IMAGE", "Missing imageBase64 in request body.")

        # Strip data URL prefix if present
        if "," in raw_b64:
            header, raw_b64 = raw_b64.split(",", 1)
            mime_type = "image/jpeg"
            if "image/png" in header:
                mime_type = "image/png"
            elif "image/webp" in header:
                mime_type = "image/webp"
        else:
            mime_type = "image/jpeg"

        try:
            image_bytes = base64.b64decode(raw_b64)
        except Exception:
            raise AppException(400, "INVALID_BASE64", "Provided image is not valid base64.")

        is_consented = bool(body.get("userConsentConfirmed", body.get("consent", False)))
        return await deep_inspect(image_bytes, mime_type, consent=is_consented)

    # Handle Multipart payload
    if not image:
        raise AppException(400, "MISSING_IMAGE", "Uploaded file 'image' is required.")

    if not image.content_type or not image.content_type.startswith("image/"):
        raise AppException(400, "INVALID_FILE_TYPE", "Uploaded file must be a valid image.")

    effective_consent = consent if consent is not None else (consent_query if consent_query is not None else False)
    raw_bytes = await image.read()
    return await deep_inspect(raw_bytes, image.content_type, consent=effective_consent)
