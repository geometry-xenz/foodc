"""
Deep Inspect scan endpoint.
Conforms to §4, §5.4, §21, and D7.
"""
from fastapi import APIRouter, File, Form, Request, UploadFile
from app.core.exceptions import AppException
from app.core.ratelimit import check_rate_limit
from app.services.vision import deep_inspect

router = APIRouter(prefix="/api/scan", tags=["scan"])


@router.post("/deep-inspect")
async def scan_deep_inspect(
    request: Request,
    image: UploadFile = File(...),
    consent: bool = Form(False),
):
    ip = request.client.host if request.client else "unknown"
    check_rate_limit(f"inspect:{ip}", max_requests=10, window_seconds=60)

    if not image.content_type or not image.content_type.startswith("image/"):
        raise AppException(400, "INVALID_FILE_TYPE", "Uploaded file must be a valid image")

    raw_bytes = await image.read()
    result = await deep_inspect(raw_bytes, image.content_type, consent=consent)
    return result
