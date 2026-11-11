# DRISHYAM — Computational Gastronomy & Personalized Nutrition Ecosystem

> **“See your ingredients. Discover your possibilities.”**

DRISHYAM is a production-grade, cross-platform computational gastronomy and metabolic nutrition ecosystem. It pairs real-time on-device computer vision on Android with a shared computational gastronomy engine (FlavorDB & Foodoscope) and an authenticated Next.js web application.

---

## 1. System Architecture & Components

```
+-------------------------------------------------------------------------+
|                                DRISHYAM                                 |
+-------------------------------------------------------------------------+
       |                                                    |
       v                                                    v
+-------------------------------+          +-------------------------------+
|     Android Native Client     |          |       Next.js Web Client      |
|  - Jetpack Compose            |          |  - App Router / React 19      |
|  - CameraX + LiteRT (TFLite)  |          |  - Three.js + GSAP Motion     |
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

---

## 2. Core Principles & Constraints

- **Single Authoritative Backend:** One asynchronous Python (FastAPI + PostgreSQL) backend powers both the Next.js web app and Android native app.
- **Strict Multi-Tenant Isolation:** Complete database separation between user accounts.
- **Zero Fake Fallbacks (§26):**
  - **No camera on web:** Camera scanning is reserved exclusively for the native Android client (§3.1).
  - **No hallucinated detections:** If real camera inputs or models are unavailable, zero detections are emitted.
  - **Explicit provenance badging:** Every data point displays its exact source (`android_scanner`, `usda_foundation`, `calculated_mifflin_st_jeor`, or `manual`).
- **Offline-First Synchronization (§5.5):** Mutations are queued locally in SQLite (Room) with UUID `op_id`s. On reconnect, duplicate operations return idempotent duplicate confirmations, and concurrent conflicts resolve in favor of the authoritative server state.

---

## 3. Technology Stack

| Layer | Technologies |
|---|---|
| **Authoritative Backend** | Python 3.11+, FastAPI, SQLAlchemy 2.0 (`asyncpg` / `psycopg`), Pydantic v2 |
| **Relational Database** | PostgreSQL 15+, Alembic migrations |
| **Web Application** | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 |
| **Web 3D & Kinetic Motion** | Three.js 0.180, GSAP 3.15 + ScrollTrigger, Cormorant Garamond / Manrope |
| **Native Android Client** | Kotlin 1.9+, Jetpack Compose, CameraX, Room 2.6, Retrofit 2.11, WorkManager |
| **On-Device Edge Vision** | TensorFlow Lite (LiteRT) 2.16+, ML Kit OCR, EfficientNet-Lite, EfficientDet-Lite |
| **Reverse Proxy & Ops** | Caddy 2 (automatic HTTPS), Docker & Docker Compose |

---

## 4. Quick Start & Execution

### 4.1 Prerequisites
- PostgreSQL running locally or via Docker.
- Python 3.11+ with virtual environment tools.
- Node.js 20+ and npm.
- Java Development Kit (JDK 21) and Android SDK 34+.

### 4.2 Start FastAPI Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Run migrations and start server
alembic upgrade head
uvicorn app.main:app --host 127.0.0.1 --port 8000
```
*API docs available at: `http://localhost:8000/docs`*

### 4.3 Start Next.js Web Application
```bash
npm install
npm run build
npm run start -- -p 3100
```
*Web dashboard available at: `http://localhost:3100`*

### 4.4 Build Android Native App
```bash
cd android
./gradlew assembleDebug
```
*Debug APK generated at: `android/app/build/outputs/apk/debug/app-debug.apk`*

---

## 5. Automated Verification & Testing

### 5.1 Cross-Platform End-to-End Test Suite (S15)
Exercises all 6 end-to-end integration scenarios against the live FastAPI backend:
```bash
python scripts/verify-cross-platform.py
```
- **Scenario 1:** Cross-platform registration and login (Web $\leftrightarrow$ Android).
- **Scenario 2:** Android scanner push $\to$ Web inventory inspection $\to$ Web edit $\to$ Android delta sync.
- **Scenario 3:** Offline outbox batch push with idempotent replay detection.
- **Scenario 4:** Stale `base_version` concurrent conflict handling (server authoritative).
- **Scenario 5:** Multi-tenant data isolation and cross-tenant edit rejection (HTTP 404).
- **Scenario 6:** Complete account deletion cascading and session token revocation.

### 5.2 Android Unit Test Suites
```bash
cd android
./gradlew testDebugUnitTest
```
- Tests 401 synchronized token refresh with automatic single retry (`TokenAuthenticatorTest`).
- Tests offline-first sync contracts and Room outbox operations (`SyncAndContractTest`).
- Tests scanner persistence, 1000ms stability gating, and 0.75 confidence thresholds (`ScannerPipelineTest`).

---

## 6. Demo & Evaluation Walkthrough

- **One-Click Demo Access:** Click **"Explore with Demo Account"** on the web or mobile login screens.
- **Pre-seeded Credentials:**
  - **Email:** `demo@drishyam.ai`
  - **Password:** `drishyam2026`
- **Showcase API:** `GET /api/public/showcase` provides real engine statistics, recipe rankings across 3 fitness goals, and sample molecular aroma network graphs with zero mock data.

---

## 7. Documentation Index

- [Architecture & Decisions D1–D11](file:///home/suman/personal/foodc/docs/architecture.md)
- [REST API Specification](file:///home/suman/personal/foodc/docs/api.md)
- [Database Schema & ER Diagram](file:///home/suman/personal/foodc/docs/database.md)
- [Offline-First Sync Protocol](file:///home/suman/personal/foodc/docs/sync.md)
- [Kinetic Design & Motion System](file:///home/suman/personal/foodc/docs/motion.md)
- [Android Client Guide & Architecture](file:///home/suman/personal/foodc/docs/android.md)
- [Edge Vision Scanner & Model Card](file:///home/suman/personal/foodc/docs/scanner.md)
- [Production Deployment & Docker](file:///home/suman/personal/foodc/docs/deployment.md)
- [Demo Mode & Tour Walkthrough](file:///home/suman/personal/foodc/docs/demo-mode.md)
- [System Limitations & Boundaries](file:///home/suman/personal/foodc/docs/limitations.md)
- [Third-Party Model Licences](file:///home/suman/personal/foodc/third_party_models.yaml)
