from fastapi import APIRouter, UploadFile, File, HTTPException
from backend.app.services.vision import vision_service
from backend.app.models.schemas import DeepInspectResponse

router = APIRouter(tags=["Vision"])

@router.post("/scan", response_model=DeepInspectResponse)
async def scan_ingredient_frame(file: UploadFile = File(...)):
    """
    Deep Inspect endpoint for ambiguous spice jars / counter ingredients.
    Accepts an uploaded image frame, processes it through Gemini 2.0 Flash or
    local computational spectral vision fallback.
    """
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be an image.")

    content = await file.read()
    if len(content) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="Image exceeds 10MB limit.")

    result = await vision_service.analyze_image_bytes(content)
    return DeepInspectResponse(**result)
