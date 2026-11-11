"""
Deep Inspect vision service.
Adheres to DRISHYAM Master Specification §4, §5.4, §21, and D7:
- Requires explicit user consent.
- Enforces closed culinary vocabulary.
- Calls Gemini 2.0 Flash or OpenAI.
- Returns 503 if no vision provider key is present. NEVER fakes a demo detection.
"""
import base64
import json
import logging
import re
from typing import Any, Dict, List
import httpx
from app.config import get_settings
from app.core.exceptions import AppException

logger = logging.getLogger("drishyam.vision")
settings = get_settings()

PROMPT = """You are DRISHYAM Kitchen Vision Inspector. Identify visible food ingredients or spices in this photo.
Rules:
- Only detect food items, whole spices, spice powders, or culinary ingredients.
- Use canonical English names (e.g. "turmeric", "cumin", "clove", "tomato", "chilli powder", "salt").
- Return strictly JSON format without markdown fences or additional prose:
{"ingredients": [{"name": "turmeric", "confidence": 0.94}]}
"""


def _parse_response(text: str) -> List[Dict[str, Any]]:
    m = re.search(r"\{.*\}", text, re.S)
    if not m:
        return []
    try:
        data = json.loads(m.group(0))
        items = []
        for it in data.get("ingredients", []):
            name = str(it.get("name", "")).strip().lower()
            if name:
                conf = float(it.get("confidence", 0.75))
                items.append({
                    "name": name,
                    "confidence": round(min(max(conf, 0.0), 1.0), 2)
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

    # 1. Try Gemini
    if gemini_key:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{settings.VISION_MODEL}:generateContent"
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
            async with httpx.AsyncClient(timeout=25.0) as client:
                res = await client.post(url, params={"key": gemini_key}, json=body)
                if res.status_code == 200:
                    text = res.json()["candidates"][0]["content"]["parts"][0]["text"]
                    items = _parse_response(text)
                    return {
                        "provider": "gemini",
                        "ingredients": items,
                        "provenance": "deep_inspect"
                    }
        except Exception as e:
            logger.error(f"Gemini inspect failed: {e}")

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
                    return {
                        "provider": "openai",
                        "ingredients": items,
                        "provenance": "deep_inspect"
                    }
        except Exception as e:
            logger.error(f"OpenAI inspect failed: {e}")

    raise AppException(
        status_code=503,
        code="VISION_FAILED",
        message="Vision provider returned an error or unparseable response."
    )
