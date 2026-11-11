# DRISHYAM — API Specification & Reference

The DRISHYAM REST API is served by FastAPI on port 8000. Interactive OpenAPI documentation is available locally at:
- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`

---

## 1. Authentication & Session Protocol

### Credentials & Sessions
- **Password storage:** Native `hashlib.scrypt` with random salt per user.
- **Dual Transport:**
  - **Web browsers:** Secure `httpOnly`, `SameSite=Lax` cookie named `drishyam_session`.
  - **Android mobile clients:** Header `Authorization: Bearer <access_token>`.

### Error Response Envelope
All non-2xx responses return a consistent error body:
```json
{
  "detail": "Description of error",
  "code": "ERROR_CODE",
  "status": 400
}
```

---

## 2. API Endpoints

### 2.1 Authentication (`/api/auth`)

| Method | Path | Auth Required | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | No | Registers user, returns access + refresh tokens and session cookie. |
| `POST` | `/api/auth/login` | No | Authenticates email & password. |
| `POST` | `/api/auth/refresh` | No | Uses refresh token to rotate session and issue new access token. |
| `POST` | `/api/auth/logout` | Yes | Revokes current session. |
| `POST` | `/api/auth/logout-all` | Yes | Revokes all active sessions for current user. |
| `GET`  | `/api/auth/me` | Yes | Returns authenticated user profile and settings. |
| `DELETE`| `/api/auth/account` | Yes | Completely deletes user account and all personal data. |

### 2.2 Offline-First Sync (`/api/sync`)

| Method | Path | Auth Required | Description |
|---|---|---|---|
| `GET`  | `/api/sync/bootstrap` | Yes | Initial snapshot of all user collections for fresh client setup. |
| `GET`  | `/api/sync/changes` | Yes | Delta changes since cursor (`?since=<cursor>&limit=500`). Includes tombstones. |
| `POST` | `/api/sync/push` | Yes | Idempotent batch push of local client mutations. |
| `GET`  | `/api/sync/status` | Yes | Verifies sync server state and current user identity. |

#### Push Request Format:
```json
{
  "ops": [
    {
      "op_id": "550e8400-e29b-41d4-a716-446655440000",
      "entity": "pantry_item",
      "id": "c9bf9e57-1685-4c89-bafb-ff5af830be8a",
      "op": "upsert",
      "base_version": 1,
      "data": {
        "name": "turmeric",
        "category": "Powdered Spices",
        "quantity": 250.0,
        "unit": "g",
        "confidence": 0.98,
        "confirmed": true,
        "source": "android_scanner"
      }
    }
  ]
}
```

#### Push Response Outcomes:
- `applied`: Mutation written to PostgreSQL, new `version` returned.
- `duplicate`: `op_id` already exists in database; mutation skipped idempotently.
- `conflict`: Stale `base_version` detected; returns server authoritative row.
- `rejected`: Invalid UUID or schema failure.

### 2.3 Pantry Management (`/api/pantry`)

| Method | Path | Auth Required | Description |
|---|---|---|---|
| `GET`  | `/api/pantry` | Yes | List active pantry items with provenance and confidence badging. |
| `POST` | `/api/pantry` | Yes | Add item or merge into existing canonical ingredient. |
| `PUT`  | `/api/pantry/{id}` | Yes | Update item quantity, unit, or category. Increments version. |
| `DELETE`| `/api/pantry/{id}` | Yes | Soft-deletes pantry item (writes tombstone for sync). |
| `GET`  | `/api/pantry/catalog`| No | Read-only global ingredient catalog with nutritional breakdown. |

### 2.4 Computational Gastronomy & Recipes (`/api/recipes`)

| Method | Path | Auth Required | Description |
|---|---|---|---|
| `GET`  | `/api/recipes/recommend` | Yes | Personalized recipe recommendations ranked via hybrid Gastronomy + Goal fit. |
| `GET`  | `/api/recipes/{id}` | Yes | Full recipe instructions, macro breakdown, and substitution hints. |
| `GET`  | `/api/recipes/flavour-network` | Yes | FlavorDB shared compound graph nodes and links for 3D visualizers. |
| `POST` | `/api/recipes/{id}/save` | Yes | Bookmark recipe to user's saved list. |
| `DELETE`| `/api/recipes/{id}/save`| Yes | Remove bookmark. |

### 2.5 Nutrition & Goal Calculation (`/api/nutrition`)

| Method | Path | Auth Required | Description |
|---|---|---|---|
| `GET`  | `/api/nutrition/targets` | Yes | User's daily calorie and macro goals with Mifflin-St Jeor formula breakdown. |
| `PUT`  | `/api/nutrition/targets` | Yes | Override daily calorie or macro targets with automated safety clamping. |
| `GET`  | `/api/nutrition/intake` | Yes | Summary of logged meals against daily target rings. |
| `POST` | `/api/nutrition/log-meal`| Yes | Log consumed meal or recipe into daily intake log. |

### 2.6 Public Showcase & Health (`/api/public`, `/api/health`)

| Method | Path | Auth Required | Description |
|---|---|---|---|
| `GET`  | `/api/public/showcase` | No | Real computational engine stats and sample aroma graphs for landing page. |
| `GET`  | `/api/health` | No | Backend health check, DB connection status, uptime. |
| `POST` | `/api/scan/deep-inspect`| Yes | Single-frame ephemeral cloud vision inference with rate limiting (§21). |
