# DRISHYAM — System Architecture (D1–D11)

DRISHYAM is an intelligent computational gastronomy, edge computer vision, and personalized nutrition ecosystem. It pairs on-device spice and ingredient recognition on Android with a shared cross-platform computational gastronomy backend and an authenticated web application.

---

## 1. Core Architectural Decisions (D1–D11)

### D1: Single Authoritative Backend
A unified, asynchronous Python backend powered by **FastAPI** and **PostgreSQL (asyncpg + SQLAlchemy 2.0)** serves both the Next.js web application and native Android mobile clients. There are no divergent business logic implementations; recipe ranking, nutritional safety bounds, and flavour pairing matrices are evaluated server-side using shared algorithms.

### D2: Strict Contract Freezing & Fixture-Driven Verification
All cross-platform data transfers strictly conform to JSON schemas versioned in `contracts/fixtures/`. Unit and integration test suites on both the web frontend (TypeScript) and Android client (Kotlin) execute against identical fixture payloads, preventing serialization mismatches.

### D3: Native Edge AI Android Client
The mobile application is written in 100% native Kotlin using **Jetpack Compose**, **CameraX**, and **TensorFlow Lite (LiteRT)**. Edge computer vision runs entirely on-device without cloud dependency, preserving user privacy, minimizing bandwidth, and operating smoothly in offline kitchen environments.

### D4: FlavorDB & Culinary Ontology Graphs
The culinary intelligence layer derives from computational gastronomy principles (FlavorDB / Foodoscope). Ingredients and aromatic compounds form an in-memory bipartite graph. Recipe ranking uses a hybrid scoring function:
$$\text{Gastronomy} = 0.30 \cdot \text{Coverage} + 0.20 \cdot \text{Utilisation} + 0.20 \cdot \text{Coherence} + 0.30 \cdot \text{GapFit}$$

### D5: Zero Fake Fallbacks & Explicit Provenance (§26)
In accordance with specification guidelines:
- **No camera on web:** The web client manages pantry, meal planning, and gastronomy analysis. Camera scanning is exclusive to the native Android client.
- **No simulated detections:** When real camera feeds or ML models are unavailable, the detector emits zero detections.
- **Explicit provenance badging:** Every data point displays its authoritative source (`source: android_scanner`, `source: usda_foundation`, `source: calculated_mifflin_st_jeor`, or `source: manual`).

### D6: Offline-First Synchronization & Optimistic Concurrency
Android operates against a local **Room** SQLite database. Mutations are queued in an offline outbox table with unique UUID `op_id`s. Upon reconnection:
- Ops are sent via `POST /api/sync/push`.
- Duplicate `op_id` submissions return `duplicate` with zero side-effects (strict idempotency).
- Stale updates (`base_version != server_version`) return HTTP `409 Conflict` with the authoritative server payload; the server always wins.

### D7: Modern, Robust Session Security
Replaces deprecated libraries (passlib, python-jose) with native cryptography:
- **Password Hashing:** `hashlib.scrypt` with $N=2^{14}, r=8, p=1$ and 128-bit cryptographic salts.
- **Sessions:** High-entropy 256-bit random tokens stored as SHA-256 hashes in `auth_sessions`.
- **Dual Transport:** `drishyam_session` httpOnly, SameSite=Lax cookies for web browsers; `Authorization: Bearer <token>` for Android native APIs.

### D8: Multi-Module Clean Android Architecture
The Android client separates concerns into clean modules:
- `:core:model` — Pure Kotlin domain models.
- `:core:database` — Room entities, DAOs, and migrations.
- `:core:network` — Retrofit 2.11, OkHttp with TokenAuthenticator, Kotlinx Serialization.
- `:core:designsystem` — Motion tokens, Cormorant Garamond / Manrope fonts, color palettes.
- `:core:ui` — HUD Canvas overlays, macro rings, responsive components.
- `:vision` — CameraX frame analysis, IoU tracker, 1000ms stability gate, accumulator.
- `:data` — Repositories and WorkManager `SyncWorker`.
- `:domain` — Pure use cases (`GetPantryUseCase`, `RecommendRecipesUseCase`, etc.).
- `:feature:dashboard`, `:feature:scanner` — Screen implementations.

### D9: Shared Motion & Kinetic Design Tokens (§5.8)
A shared kinetic language bridges Web and Android:
- **Durations:** Instant (90ms), Quick (180ms), Standard (320ms), Emphasized (560ms).
- **Easings:** Standard `(0.2, 0, 0, 1)`, Decelerate `(0.05, 0.7, 0.1, 1)`, Exit `(0.3, 0, 0.8, 0.15)`.
- **Springs:** Damping 0.8, medium-low stiffness.
- **Reduced Motion:** Web honors `prefers-reduced-motion`; Android honors `ANIMATOR_DURATION_SCALE == 0`, disabling continuous sweeps and replacing 3D canvases with static accessible fallbacks.

### D10: Safe Nutritional Science Bounds (§5.7)
Energy requirements are computed via Mifflin-St Jeor equations. Automatic safety clamping prevents harmful diet recommendations:
- Caloric floor: $\ge \max(\text{BMR}, 1200\text{ kcal (F)}, 1500\text{ kcal (M)})$.
- Maximum deficit: 25% of TDEE.
- Maximum surplus: 20% (25% for high-demand hypercaloric goals).

### D11: Edge AI Culinary Model Track & Precision Gating (§9)
Culinary models are gated by precision requirements:
- $\text{Precision} \ge 0.90$: Auto-suggestion permitted.
- $0.75 \le \text{Precision} < 0.90$: Top-2 choice chips presented to user.
- $\text{Precision} < 0.75$: Model disabled; manual input triggered.

---

## 2. High-Level System Architecture Diagram

```
+-------------------------------------------------------------------------+
|                              DRISHYAM SYSTEM                            |
+-------------------------------------------------------------------------+
       |                                                    |
       v                                                    v
+-------------------------------+          +-------------------------------+
|     Android Native Client     |          |       Next.js Web Client      |
|  - Jetpack Compose            |          |  - App Router / React 18      |
|  - CameraX + TFLite Edge      |          |  - Three.js + GSAP Motion     |
|  - Offline Room + Outbox      |          |  - Tailored Dashboards        |
|  - TokenAuthenticator (Retry) |          |  - httpOnly Secure Session    |
+-------------------------------+          +-------------------------------+
       |                                                    |
       |  REST / HTTPS                                      |  REST / HTTPS
       |  Authorization: Bearer                             |  Cookie: drishyam_session
       v                                                    v
+-------------------------------------------------------------------------+
|                  FastAPI Authoritative Backend (:8000)                  |
|  - Auth & Session Service (scrypt + SHA-256)                            |
|  - Offline Sync & Tombstone Delta Engine (§5.5)                         |
|  - Computational Gastronomy & FlavorDB Pairing Graph (§5.6)             |
|  - Nutritional BMR/TDEE Clamped Calculator (§5.7)                       |
|  - Ephemeral Deep Inspect Cloud Vision Analyzer (§21)                   |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                     PostgreSQL Relational Storage                       |
|  - users, auth_sessions, user_profiles, user_settings                   |
|  - pantry_items, sync_ops, shopping_items, meal_logs, meal_plans        |
|  - ingredients, ingredient_aliases, recipes, flavour_compounds          |
+-------------------------------------------------------------------------+
```
