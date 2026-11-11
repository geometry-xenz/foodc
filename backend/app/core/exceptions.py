"""
Custom domain exceptions and error schemas.
Adheres to §5.4: standard error format {error: {code, message, request_id}}
"""
from typing import Any, Optional
from fastapi import HTTPException, Request, status
from fastapi.responses import JSONResponse


class AppException(HTTPException):
    def __init__(
        self,
        status_code: int,
        code: str,
        message: str,
        details: Optional[Any] = None,
    ):
        super().__init__(status_code=status_code, detail=message)
        self.code = code
        self.message = message
        self.details = details


class UnauthorizedException(AppException):
    def __init__(self, message: str = "Authentication required"):
        super().__init__(status.HTTP_401_UNAUTHORIZED, "UNAUTHORIZED", message)


class ForbiddenException(AppException):
    def __init__(self, message: str = "Access forbidden"):
        super().__init__(status.HTTP_403_FORBIDDEN, "FORBIDDEN", message)


class NotFoundException(AppException):
    def __init__(self, message: str = "Resource not found"):
        super().__init__(status.HTTP_404_NOT_FOUND, "NOT_FOUND", message)


class ConflictException(AppException):
    def __init__(self, message: str = "Conflict detected", details: Optional[Any] = None):
        super().__init__(status.HTTP_409_CONFLICT, "CONFLICT", message, details)


class ValidationException(AppException):
    def __init__(self, message: str = "Validation failed", details: Optional[Any] = None):
        super().__init__(status.HTTP_422_UNPROCESSABLE_ENTITY, "VALIDATION_ERROR", message, details)


class BadRequestException(AppException):
    def __init__(self, message: str = "Bad request"):
        super().__init__(status.HTTP_400_BAD_REQUEST, "BAD_REQUEST", message)


class ServiceUnavailableException(AppException):
    def __init__(self, message: str = "Service unavailable"):
        super().__init__(status.HTTP_503_SERVICE_UNAVAILABLE, "SERVICE_UNAVAILABLE", message)


async def app_exception_handler(request: Request, exc: AppException):
    request_id = getattr(request.state, "request_id", "unknown")
    content = {
        "error": {
            "code": exc.code,
            "message": exc.message,
            "request_id": request_id,
        }
    }
    if exc.details is not None:
        content["error"]["details"] = exc.details
    return JSONResponse(status_code=exc.status_code, content=content)
