"""
In-process rate limiting with sliding window.
Adheres to §5.3: limits per IP/email and 10 req/min for Deep Inspect.
"""
import time
from collections import defaultdict
from typing import Dict, List
from fastapi import Request
from app.core.exceptions import AppException

# key -> list of timestamps
_rate_limits: Dict[str, List[float]] = defaultdict(list)


def check_rate_limit(key: str, max_requests: int, window_seconds: int):
    now = time.time()
    cutoff = now - window_seconds
    timestamps = [t for t in _rate_limits[key] if t > cutoff]
    if len(timestamps) >= max_requests:
        raise AppException(
            status_code=429,
            code="RATE_LIMIT_EXCEEDED",
            message=f"Rate limit exceeded. Maximum {max_requests} requests per {window_seconds} seconds."
        )
    timestamps.append(now)
    _rate_limits[key] = timestamps
