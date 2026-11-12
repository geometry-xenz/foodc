"""
Deep Inspect vision service.
Adheres to DRISHYAM Master Specification §4, §5.4, §21, and D7:
- Requires explicit user consent.
- Enforces closed culinary vocabulary.
- Calls live Gemini Vision with resilient multi-model fallback or OpenAI.
- Returns 503 if no vision provider key is present or inference fails. NEVER fakes a demo detection.
"""
import base64
import json
import logging
import re
import time
import uuid
from typing import Any, Dict, List
import httpx
from app.config import get_settings
from app.core.exceptions import AppException
from app.services.gastronomy import norm

logger = logging.getLogger("drishyam.vision")
settings = get_settings()

PROMPT = """You are DRISHYAM Kitchen Vision Inspector, an expert culinary vision AI specialized in Indian, Asian, and Global gastronomy, spices, and ingredients.
Analyze the image carefully and detect all visible food ingredients, raw produce, fresh herbs, aromatics, whole spices, spice powders, pulses, grains, and condiments.

Rules:
- Identify whole spices (e.g. cumin seeds, mustard seeds, star anise, cardamom, cinnamon, cloves, black pepper, coriander seeds).
- Identify ground/powdered spices (e.g. turmeric powder, red chilli powder, coriander powder, cumin powder, garam masala, paprika).
- Identify fresh aromatics & herbs (e.g. ginger, garlic, green chillies, curry leaves, cilantro, coriander, mint).
- Identify staples and produce (e.g. onions, tomatoes, potatoes, paneer, lentils, chickpeas, rice, oil, curd/yogurt).
- Use canonical English lowercase ingredient names (e.g. "turmeric", "cumin", "clove", "cardamom", "cinnamon", "tomato", "chilli powder", "garlic", "paneer").
- Provide confidence score between 0.50 and 1.00.
- Return strictly JSON format without markdown fences or additional prose:
{"ingredients": [{"name": "turmeric", "confidence": 0.95, "category": "spice"}]}
"""


def _parse_response(text: str) -> List[Dict[str, Any]]:
    m = re.search(r"\{.*\}", text, re.S)
    if not m:
        return []
    try:
        data = json.loads(m.group(0))
        items = []
        seen = set()
        for it in data.get("ingredients", []):
            raw_name = str(it.get("name", "")).strip().lower()
            name = norm(raw_name)
            if name and name not in seen:
                seen.add(name)
                conf = float(it.get("confidence", 0.85))
                category = str(it.get("category", "ingredient")).strip().lower()
                items.append({
                    "name": name,
                    "confidence": round(min(max(conf, 0.1), 1.0), 2),
                    "category": category,
                })
        return items
    except Exception:
        return []


async def deep_inspect(image_bytes: bytes, mime_type: str, consent: bool) -> Dict[str, Any]:
    if not consent:
        raise AppException(
            status_code=400,
            code="CONSENT_REQUIRED",
            message="Deep Inspect requires explicit user consent before image processing."
        )

    if len(image_bytes) > 8 * 1024 * 1024:
        raise AppException(
            status_code=413,
            code="PAYLOAD_TOO_LARGE",
            message="Image exceeds maximum permitted size of 8 MB."
        )

    gemini_key = settings.GEMINI_API_KEY or settings.GOOGLE_API_KEY
    openai_key = settings.OPENAI_API_KEY

    if not gemini_key and not openai_key:
        raise AppException(
            status_code=503,
            code="SERVICE_UNAVAILABLE",
            message="No vision provider key is configured on the server. Set GEMINI_API_KEY or OPENAI_API_KEY."
        )

    b64 = base64.b64encode(image_bytes).decode("utf-8")
    now_ms = int(time.time() * 1000)

    # 1. Try Gemini Vision models with ordered resilient fallback
    if gemini_key:
        candidate_models = [
            settings.VISION_MODEL,
            "gemini-flash-lite-latest",
            "gemini-3.6-flash",
            "gemini-3.1-flash-lite",
            "gemini-3.5-flash",
        ]
        models_to_try = []
        for m in candidate_models:
            if m and m not in models_to_try:
                models_to_try.append(m)

        for model_name in models_to_try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent"
            body = {
                "contents": [{
                    "parts": [
                        {"text": PROMPT},
                        {"inline_data": {"mime_type": mime_type, "data": b64}},
                    ]
                }],
                "generationConfig": {"temperature": 0.1, "maxOutputTokens": 600},
            }
            try:
                async with httpx.AsyncClient(timeout=12.0) as client:
                    res = await client.post(url, params={"key": gemini_key}, json=body)
                    if res.status_code == 200:
                        text = res.json()["candidates"][0]["content"]["parts"][0]["text"]
                        items = _parse_response(text)
                        if items:
                            candidates = [
                                {
                                    "id": str(uuid.uuid4()),
                                    "name": item["name"],
                                    "quantity": 100.0,
                                    "unit": "g",
                                    "source": "gemini_vision",
                                    "confidence": item["confidence"],
                                    "confirmed": False,
                                    "updatedAtMs": now_ms,
                                }
                                for item in items
                            ]
                            return {
                                "provider": "gemini",
                                "model": model_name,
                                "ingredients": items,
                                "candidates": candidates,
                                "provenance": "gemini_vision",
                            }
                    else:
                        logger.warning(f"Gemini {model_name} returned {res.status_code}: {res.text[:150]}")
            except Exception as e:
                logger.error(f"Gemini {model_name} inspect failed: {e}")

    # 2. Try OpenAI
    if openai_key:
        try:
            async with httpx.AsyncClient(timeout=25.0) as client:
                res = await client.post(
                    "https://api.openai.com/v1/chat/completions",
                    headers={"Authorization": f"Bearer {openai_key}"},
                    json={
                        "model": "gpt-4o-mini",
                        "temperature": 0.1,
                        "response_format": {"type": "json_object"},
                        "messages": [{
                            "role": "user",
                            "content": [
                                {"type": "text", "text": PROMPT},
                                {"type": "image_url", "image_url": {"url": f"data:{mime_type};base64,{b64}"}}
                            ]
                        }]
                    }
                )
                if res.status_code == 200:
                    content = res.json()["choices"][0]["message"]["content"]
                    items = _parse_response(content)
                    candidates = [
                        {
                            "id": str(uuid.uuid4()),
                            "name": item["name"],
                            "quantity": 100.0,
                            "unit": "g",
                            "source": "openai_vision",
                            "confidence": item["confidence"],
                            "confirmed": False,
                            "updatedAtMs": now_ms,
                        }
                        for item in items
                    ]
                    return {
                        "provider": "openai",
                        "model": "gpt-4o-mini",
                        "ingredients": items,
                        "candidates": candidates,
                        "provenance": "openai_vision",
                    }
        except Exception as e:
            logger.error(f"OpenAI inspect failed: {e}")

    raise AppException(
        status_code=503,
        code="VISION_FAILED",
        message="Vision provider returned an error or unparseable response."
    )
