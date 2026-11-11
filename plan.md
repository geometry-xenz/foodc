# DRISHYAM — Completion Plan (v2)

> **Status:** this is a plan only. Nothing has been built, deleted or re-encoded.
> The only work done so far:
> - a read-only audit;
> - Foodoscope credentials added to the gitignored `.env`;
> - two smoke calls to Foodoscope. Both returned 401 (see §1.4).
>
> **Audit date:** 2026-11-10 · **Repo:** `~/personal/foodc` · **Branch:** `main` @ `b33f87b`
>
> **Changes from v1:**
> - **D1 now follows the spec: one FastAPI backend.** The user re-issued the spec unchanged
>   instead of approving the Next.js-backend deviation proposed in v1.
> - New sections on smooth animation, gestures and 3D: §5.8 and steps S8, S11 and S12.
> - The supplied logos are used directly and never regenerated (S2).

---

## 0. Outcome and authority

**Authority**

| ID | Source | Notes |
|---|---|---|
| **A1** | *DRISHYAM Complete Product Development Master Specification* (§1–§26 and the *Final Product Acceptance Criterion* items 1–18), as re-issued by the user | `§n` refers to this document. |
| **A2** | User instructions | Refine using the *ponytail* method: smallest complete change, delete dead and unwanted code. Complete the Android app and the website. Sharpen the website background video. The video to use is the WhatsApp MP4. |
| **A3** | User instruction | "YOLO isn't good enough for identifying spices." |
| **A4** | User instruction | "Smooth animation, gestures, 3D website; the logos are there too." |

**Outcome:**
- One FastAPI and PostgreSQL backend serves a Next.js website and a native Android app.
- All 18 acceptance items pass end to end, with a premium motion, gesture and 3D layer.
- Wherever a credential or a trained model is missing, the product says so and labels where
  each piece of data came from. It never fakes a result.

**Out of scope:**
- a camera scanner on the website (§3.1 and §26 forbid it);
- iOS;
- payments;
- social features.

**Ponytail rules applied to every step:**
- Reuse existing code, especially the working Foodoscope Python.
- No pass-through layers.
- No new dependency for something that takes a few lines.
- Every new non-trivial piece of logic gets one small test.
- Never cut validation, security, accessibility, or anything A1 explicitly asks for.

---

## 1. Audit findings (observed facts)

### 1.1 Next.js app (`app/`, `components/`, `lib/`, `prisma/`)

**Stack and current state**

| Area | Observed |
|---|---|
| Stack | Next.js 16.4.5, React 19, Tailwind 4, GSAP **3.15.1** (`ScrollSmoother`, `SplitText`, `Observer`, `Draggable`, `InertiaPlugin` and `Flip` are all present in `node_modules/gsap`), and three 0.180 (`OrbitControls` is present). |
| Routes | `/`, `/login`, `/app`, `/app/{pantry,recipes,nutrition,planner}` |
| Backend inside the website | Next.js runs its own backend: 13 route handlers in `app/api/**`, using Prisma with SQLite. Supporting code: `lib/{auth,db,data-access,user-service,serializers}.ts`. Engines in `lib/{gastronomy,flavor,goals,nutrition}.ts`. The comments in `gastronomy.ts` say they were "ported from routes/recommend.py". |
| Auth | `lib/auth.ts` puts an HS256 JWT in a cookie. There is no bearer token, no session table and no refresh. The secret falls back to a hard-coded value. |

**Engine and data problems**
- `personalizeScore` (`lib/gastronomy.ts:112-147`) applies hard-coded absolute thresholds,
  for example "protein ≥ 14 g and ≤ 300 kcal earns ×1.15". That breaks §8.3, which requires
  scoring relative to each user's own targets.
- Goals are missing `dirty_bulk` and `general_health`.
- The data has 12 recipes. §20 requires at least 20.
- `nutrition.json` covers 27 ingredients with no source IDs (turmeric matches USDA FDC).
- `flavordb.json` is a curated fixture.

**Fake or dead code**
- Fake scanner: `simulateDetection` (`components/app/pantry-manager.tsx:194`, with buttons at
  lines 230 and 368) adds a random ingredient tagged `source:"vision"`.
- Dead: `components/ui/button.tsx` has 0 importers.
- Unused: `three` is installed but **not imported anywhere**, even though the README claims an
  "800-particle Three.js field".
- `zod` is only used inside `app/api`.

**Hero video**
- `components/hero.tsx:97` plays `public/videos/drishyam-cinematic.mp4` at
  `opacity-55/60` under a full gradient and a vignette.
- Lines 61-75 seek `currentTime` on every animation frame, with no `seeking` guard.

### 1.2 Archived backend (`backend/`, FastAPI, about 2,000 lines)

**What exists**
- `main.py` registers 10 routers.
- `routes/` contains: auth, profile, pantry, recipes, recommend, flavordb, instructions,
  substitute, nutrition, meal_planner, shopping, scan, health.
- `services/` contains: recipedb, flavordb, gastronomy, goal_calculator, nutrition, vision,
  cache.
- `models/user.py` uses SQLAlchemy and already defines User, Profile, Preference (JSON
  allergies and cuisines), FitnessGoal, PantryItem, SavedRecipe, MealLog, MealPlan and
  ShoppingItem.

**Gaps and problems**

| Problem | Detail |
|---|---|
| IDs | Integer primary keys, so the sync design needs changes. |
| Migrations | Tables are created with `create_all()`. There is no Alembic, even though `alembic` is in `requirements.txt`. |
| Startup side effects | Demo data is seeded inside the `lifespan` startup hook. |
| CORS | `allow_origins=["*"]` combined with `allow_credentials=True`, which is unsafe. |
| Auth libraries | `python-jose` and `passlib` (`core/security.py`), both unmaintained. |
| Static serving | Serves `frontend/dist`. |
| Committed cache | 22 cache JSON files are committed under `backend/cache/`. |
| Config naming | Environment variable names (`RECIPEDB_BASE_URL`, …) differ from the Foodoscope/Mise names (`FOODOSCOPE_RECIPEDB_BASE`, …) that the user supplied. |
| **Fake vision fallback** | `services/vision.py:91-99` (`"edge-computational-spectral-fallback"`, `"offline-fallback"`). It must not be ported. |

### 1.3 Other repos, assets and toolchain

**Other directories**
- `frontend/` is an archived Vite app. It includes a built `dist/` and two copies of the video.
- `tests/` holds Python tests that run the archived `uvicorn backend.app.main`.
- Also dead: `requirements.txt` (python-jose and passlib pins), `drishyam.db`, `.pytest_cache/`.
- `skills/system/run-workflow/SKILL.md` is an unrelated agent skill.

**Video**
- Three byte-identical files (md5 `2649386…`):
  - the root `WhatsApp Video 2026-11-10 at 00.01.23.mp4` (the user calls this the "WhatsApp
    MP4"; it is the spec's `foodoscope.mp4`);
  - `public/videos/WhatsApp…mp4`;
  - `public/videos/drishyam-cinematic.mp4`.
- Format: 1280×720 (16:9), H.264 High, 24 fps, 10.03 s, 5.2 Mb/s, with an AAC audio track.

**Logos (untracked, user-supplied; use them as they are, §2.2)**
- `logo.png`: 1254×1254 square app icon.
- `logo1.png`: 1536×1024 RGBA full logo with wordmark. The alpha channel has a faint noise haze,
  but it composites cleanly onto `#080808`.

**Keyframes**
- `~/Downloads/Drishyam_ Computational Gastronomy in Four Scenes.png`: a 1672×941 2×2 grid.
- The four scenes are: 01 Ingredient identification, 02 AI scanning, 03 Flavour science,
  04 Recipe and nutrition.
- Each is only about 836×470, so they work as inset figures but not full-bleed images.

**Android**
- A skeleton of 45 files. Only `feature/dashboard` and `feature/scanner` exist.
- `settings.gradle.kts` includes about 18 modules that do not exist.
- `MainActivity` reuses `DashboardScreen` for the Pantry and Recipes tabs.
- Dependency injection is manual. The launcher icon is the stock `sym_def_app_icon`.
- There is `YoloV8TfLiteDetector`, but no model file.
- Versions: AGP 8.3.2, Kotlin 1.9.23, Compose BOM 2024.06 (shared-element transitions need
  1.7+).

**Model weights**
- None anywhere under `~` (searched 5 levels deep for `.onnx`, `.tflite` and `.pt`).

**Toolchain**

| Tool | State |
|---|---|
| Java | System JDK is 27, which Gradle 8.6 cannot run on. mise has only a JRE 21 (no `javac`). The JDK 21 download appears to have stalled at 37 of 208 MB. |
| Android SDK | Platforms 34 and 37, build-tools 34 and 36, emulator images |
| Python | 3.14.8 (`venv/` exists) |
| Other | Node 26, Postgres 18.4 (mise), Playwright, ffmpeg. `uv` is not installed. |

### 1.4 Foodoscope (`~/personal/Foodoscope` "Mise", and `~/foodoscope/docs`)

**Code to reuse** (do not modify that repo; copy with attribution):

| File | Contents |
|---|---|
| `backend/foodoscope.py` | RecipeDB2/FlavorDB client: TTL cache, remembered-404 miss cache, call budget, response-envelope digging, demo fallback |
| `backend/ranking.py` | The original formula, `norm()`, diet hard gate (fixes the bug where "vegetarian" matches inside "non-vegetarian"), `recipe_diet()` flag and ingredient inference, `suggest_unlock`, `substitutes` |
| `backend/vision.py` | Gemini/OpenAI calls. **Its no-key demo-pantry fallback is fake and is not ported.** |

**Endpoint authority** (`~/foodoscope/docs/API-REFERENCE.md`, "verified live Oct 2026"):
- Send **both** auth headers: `Authorization: Bearer <KEY>` and `ApiKey: <KEY>`.
- RecipeDB:
  - `search-recipe/{id}`
  - `instructions/{id}`
  - `recipebyingredient/by-ingredients-categories-title`
  - `recipe-diet/recipe-diet`
  - `recipes_cuisine/cuisine/{region}`
  - `similar-recipes/{id}?by=process`
  - `ingredientSubstitutes`
- FlavorDB:
  - `entities/by-entity-alias-readable` → `entity_id`
  - `entities/by-id/{id}/molecules-compact` → `pubchem_id` and `common_name`, i.e. **real
    compounds**
  - `food/by-alias?food_pair=`

**Nutrition source** (`DATA-SOURCES.md`): USDA FoodData Central (public domain, has an API).

**Key status:** the supplied key returns **HTTP 401 "Invalid API key"**. Tested 2026-11-10
against FlavorDB `entities/by-entity-alias-readable` and RecipeDB
`recipebyingredient/by-ingredients-categories-title`:
- both headers sent → 401;
- Bearer header only → 401;
- `ApiKey` header only → 400.

The key is stored only in the gitignored `.env`.

---

## 2. Decisions

| # | Decision | Why / tradeoff |
|---|---|---|
| **D1** | **One FastAPI backend at `backend/`**, rebuilt in the spec's §17 layout. It reuses the archived models and services where they are sound, plus the Mise Foodoscope client and ranking code. **Next.js becomes a pure client.** Its rewrite rules proxy `/api/*` to FastAPI, so the browser stays same-origin and cookies keep working. `prisma/`, `app/api/**` and the TypeScript engines are deleted. | The spec names FastAPI in §3, §17 and §25 and was re-issued unchanged. FastAPI also lets us reuse the *working* Python Foodoscope integration (§2.1). The cost is rewiring the web data layer (S7). That is cheaper than maintaining two engines, which §3.1 forbids. |
| **D2** | **PostgreSQL everywhere** (local Postgres 18 from mise). SQLAlchemy 2 with the **async** psycopg 3 driver, Alembic and Pydantic v2. No sync database calls inside async endpoints. | §17. One database engine everywhere means no differences between SQLite and Postgres. |
| **D3** | **Opaque tokens, no JWT library.** Every token is a 256-bit random value stored only as a SHA-256 hash in `AuthSession`. The web uses an httpOnly session cookie with a sliding 7-day expiry. Android uses an access token (15 min) and a rotating refresh token (30 days) held in Keystore-backed storage. Passwords use Argon2id. Logout revokes the session. | Revocable, simple, and it drops the unmaintained `python-jose` and `passlib` libraries. §18 and §21. |
| **D4** | **Server-authoritative sync with version checks.** Every user-owned row carries a UUID (the client may generate it), `version`, `updated_at` and `deleted_at` (a tombstone). Pushes are idempotent by `op_id`. A stale `base_version` gets HTTP 409 plus the server's copy. Web writes send `version` too. | §18.2: "Do not blindly overwrite newer information". |
| **D5** | **Every value carries its provenance:** `recipedb_live`, `flavordb_live`, `usda_fdc`, `curated_fixture`, `demo`, `calculated`, `estimated`, `user`, `scanner_device` or `deep_inspect`. The UI shows a badge for anything that is not live. | §13 and §20. |
| **D6** | **The server owns all nutrition, goal and recommendation maths**, and also the flavour-graph layout. Clients display what the server returns. Offline Android meal logs store server-provided per-serving values multiplied by the portion, and the server recomputes them on sync. | §8.2 and §13 require identical values on every platform. |
| **D7** | **The scanner combines several signals rather than relying on closed-set YOLO**, and uses no AGPL-licensed model (§4). | A3, plus licensing. |
| **D8** | **No pass-through layers.** Backend services query the database directly (no `repositories/` layer that just forwards calls). Android ViewModels call repository interfaces directly (no use cases that just forward calls). Android modules are grouped by cohesion; the mapping from the spec's module list is in §6, S10. | The spec allows "adapt the structure where appropriate". This avoids about a dozen boilerplate modules. |
| **D9** | **Motion, gestures and 3D (§5.8):** use only the already-installed GSAP 3.15 plugins and three 0.180 on the web, and only Compose and AndroidX on Android. **No new animation or 3D libraries.** The video stays a DOM `<video>` and is never used as a WebGL texture. | A4 and §4.3, while avoiding new dependencies. |
| **D10** | **Password reset uses SMTP only when `SMTP_URL` is set.** In development the reset link is written to the server log. In production without SMTP the endpoint returns 503. | Fails honestly instead of pretending an email was sent. |
| **D11** | **Typed contracts.** FastAPI's OpenAPI spec generates `lib/api-types.ts` (dev dependency `openapi-typescript`). Android DTOs are hand-written, and contract tests parse JSON fixtures recorded by the backend tests (`contracts/fixtures/*.json`). | §24 "Typed API contracts". A change in the backend's response shape then breaks the web type-check and the Android tests. |

---

## 3. Change list (ponytail)

### 3.1 Delete

| Path | Reason |
|---|---|
| `frontend/` (everything) | Archived Vite app, including `dist/` and its video copies |
| `tests/`, `requirements.txt`, `drishyam.db`, `.pytest_cache/` | Archived Python residue. New tests go in `backend/tests/` and new dependency pins in `backend/requirements*.txt`. |
| `skills/` | Unrelated agent skill |
| `backend/cache/` (22 committed files) | The cache moves into an `external_cache` database table |
| `backend/app/routes/` | Moved and rewritten under `backend/app/api/` |
| Old `backend/app/core/security.py`, the vision fallback in `backend/app/services/vision.py`, demo seeding in `main.py` `lifespan` | Replaced (D3, D7), or moved into `backend/app/seed.py` |
| `prisma/`, `app/api/**` (13 routes), `lib/{db,auth,data-access,user-service,serializers,gastronomy,flavor,goals,nutrition}.ts` | D1: the website now uses FastAPI. Any logic worth keeping moves to Python. |
| `lib/data/*.json` | **Moved** to `backend/data/seed/`, not deleted |
| `scripts/verify-engines.ts` | Its assertions become pytest tests |
| `lib/types.ts` | Replaced by the generated `lib/api-types.ts`. Types used only by the UI move into the components that use them. |
| npm packages `@prisma/client`, `prisma`, `bcryptjs`, `jose`, `zod`, `tsx` | Unused after D1. Node 26 can run `.ts` scripts directly. |
| `scripts/verify-visual.py` → rewrite as `scripts/verify-visual.ts` (Node with Playwright) | Removes the dependency on `venv/` |
| `components/ui/button.tsx` | No importers |
| The `simulateDetection` code and buttons in `pantry-manager.tsx` | A fake scanner on the website |
| `public/videos/*.mp4` (two copies) | Replaced by the S2 encodes |
| Root `WhatsApp Video …mp4` | **Moved**, not deleted, to `media/source/hero-whatsapp.mp4`, the master for re-encoding |
| `android/domain/`, `YoloV8TfLiteDetector.kt`, `PostProcessor.kt`, the nonexistent module includes, stale `app/build/` and `.idea/` | Replaced by the D7 and D8 designs |
| The README claims "Three.js 800-particle field" and "production-ready" | Not true; the README is rewritten in S16 |

### 3.2 Move or rename

| From | To |
|---|---|
| `app/app/planner` | `app/app/meal-planner` (keep a redirect) |
| `logo.png`, `logo1.png` | `media/brand/` (sources). Derived files go to `public/brand/*`, `app/icon.png`, `app/apple-icon.png`, the OG image, and the Android launcher and splash icons. |
| Keyframe grid | Four crops in `public/images/keyframes/0{1..4}-*.webp` |

---

## 4. Scanner strategy: why not YOLO alone, and what we build

**The problem**
- Loose powders (turmeric, red chilli, coriander, garam masala) are colour-and-texture blobs
  in steel *katoris* or a *masala dabba*. A closed-set box detector has little shape to go on.
- Telling look-alike powders apart is a fine-grained **classification** problem.
- External research (2026; untrusted until verified) found:
  - No good public **detection** dataset for Indian spice powders. The only one is a 747-image,
    25-class Roboflow set (CC BY 4.0) with duplicate classes.
  - Classification sets that do exist:
    - Mendeley *Indian Spices*: 10,991 images, 19 classes, CC BY 4.0.
    - Daffodil spices: 4,059 images, 8 classes, CC BY 4.0.
    - Kaggle vegetables: 21,000 images, 15 classes, CC BY-SA 4.0. Needs legal review.
    - SpiceSpectrum: CC BY-ND. **Do not use.**
  - General vision-language models are weak at look-alike powders: GPT-4o scored 57% on
    12 look-alike salts.
  - **Ultralytics YOLO v8/11/26 is AGPL-3.0, and that applies to trained weights too.**
    Permissively licensed alternatives: MediaPipe/EfficientDet-Lite, YOLOX, RT-DETR, D-FINE,
    RF-DETR-N/S/M (all Apache-2.0).

**Signals.** The scanner fuses these, and the user always confirms (§9.6):

| # | Signal | Runs | Good at | Ships in |
|---|---|---|---|---|
| 1 | **Label OCR**: ML Kit Text Recognition v2 (Latin and **Devanagari**), matched against an alias dictionary (*haldi→turmeric, jeera→cumin, dhaniya→coriander powder, lal mirch→red chilli powder*). Brand words are ignored. | On device, real time, offline | **Packaged spices**. Highest precision. | S13 |
| 2 | **Produce detector**: EfficientDet-Lite0 via MediaPipe Tasks (LiteRT, Apache-2.0, COCO), limited to its food classes (banana, apple, orange, broccoli, carrot). | On device, real time | A few produce items. Real, but limited. | S13 |
| 3 | **Culinary detector + crop classifier**: a class-agnostic "ingredient region" detector (bowl, katori, dabba compartment, heap, jar) feeds a fine-grained EfficientNet-Lite classifier. Look-alike powders form **ambiguity groups**: below the confidence gate the user sees top-2 choice chips instead of an auto-confirm. | On device | Loose and whole spices, Indian produce | **Only after the S14 gate passes.** Until then these classes are listed as "not yet supported". |
| 4 | **Deep Inspect**: one still image, with explicit consent, sent to the backend, which calls Gemini or OpenAI with a **closed vocabulary**. | Cloud, on demand | Mixed scenes, a second opinion | S5 (backend) and S13 (app). Returns 503 if no key is configured. **No demo fallback.** |

**Fusion.** For each tracked region, the highest-priority signal that fired wins, in this
order:
1. OCR
2. Classifier at or above its gate
3. Detector at confidence ≥ 0.75
4. Deep Inspect

Then the §9.5 rules apply: confidence ≥ 0.75, at least 1,000 ms of stable detection measured by
timestamp, deduplication, and the states *in progress, stable, awaiting confirmation, confirmed,
uncertain*.

**How this maps to §9:**
- The §9.4 pipeline stages (preprocessing, local inference, decoding, NMS, box mapping,
  tracking, filtering, accumulator) all remain; only the detector behind them is swappable.
- MediaPipe Tasks runs on **LiteRT, the new name for TensorFlow Lite**, which satisfies §9.2,
  with GPU delegate and CPU fallback. NNAPI is deprecated in Android 15, so it is not used.
- A YOLO decoder is added only if a properly licensed YOLO model is supplied.
- A barcode lookup via Open Food Facts is **deferred**, because OCR already covers packaged
  spices.

---

## 5. Shared contracts (defined once; every step refers back here)

### 5.1 Enumerations

| Name | Values / rule |
|---|---|
| `GoalId` | `fat_loss`, `lean_bulk`, `bulk`, `dirty_bulk`, `maintenance`, `recomposition`, `athletic_performance`, `general_health`. `dirty_bulk` is shown as a *preference* and always carries a trade-off note. |
| `Lifestyle` | `vegetarian`, `vegan`, `eggetarian`, `pescatarian`, `non_vegetarian`, `none` |
| `Restriction` | `dairy_free`, `lactose_free`, `gluten_free`, `jain`, plus custom exclusions |
| `Allergen` | `peanut`, `tree_nut`, `dairy`, `egg`, `soy`, `gluten`, `shellfish`, `fish`, plus custom. Allergens are **hard filters**. If a recipe's composition is unknown, it is still shown but carries an `allergen_unknown` warning. |
| `Cuisine` | The 13 cuisines in §7.4 |
| `Taste` | The 7 tastes in §7.5 |
| `MealType` | `breakfast`, `lunch`, `dinner`, `snack`, `pre_workout`, `post_workout`. Meal preferences add `quick`, `batch_cooking` and `meal_prep`. |
| `PantrySource` | `manual`, `android_scanner`, `deep_inspect`, `import` |
| `PantryCategory` | The 10 categories in §10 |
| `Provenance` | See D5 |

### 5.2 Entities

All entities are SQLAlchemy 2 models, change through Alembic migrations, and use UUID primary
keys. Every user-owned row also has `user_id` (foreign key), `version`, `created_at`,
`updated_at` and `deleted_at`.

| Group | Tables |
|---|---|
| Identity | `user`, `user_profile`, `auth_session` (`client`, `session_hash` / `access_hash`, `refresh_hash`, expiries, `revoked_at`), `password_reset_token` |
| Personalisation (normalised, §19) | `fitness_goal` (primary, `secondary[]`, `target_weight`), `dietary_preference` (lifestyle + restriction rows), `allergy`, `ingredient_exclusion`, `cuisine_preference`, `taste_preference`, `meal_preference`, `nutrition_target` (calculated values + per-field overrides + `is_override`), `user_settings` (sound, haptics, units) |
| Catalogue | `ingredient` (canonical name, category FK, allergen and diet tags, `fdc_id`, provenance), `ingredient_alias`, `pantry_category`, `nutrient`, `ingredient_nutrition` (per 100 g, per nutrient, with provenance), `recipe` (`source`, `source_id`, `fetched_at`), `recipe_ingredient`, `recipe_instruction`, `recipe_nutrition` (calculated, cached, with provenance), `flavour_compound` (`pubchem_id`), `ingredient_compound`, `ingredient_relationship` (similarity or substitute, with provenance), `external_cache` (key, payload, `fetched_at`, `miss`) |
| User data | `pantry_item` (`expires_on`, `low_stock_at`, `confidence`, `confirmed`, `source`), `pantry_change_history`, `saved_recipe`, `recipe_history` (viewed or cooked events), `recipe_recommendation` (log of served results with their score breakdown), `meal_plan`, `planned_meal` (`date`, `meal_type`, `position`, `servings`), `meal_log`, `meal_log_item` (portion, `eaten_at`, notes, nutrient snapshot), `daily_nutrition_summary` (aggregate maintained on every meal-log change, used for trends), `shopping_list`, `shopping_item` (`purchased`, `reason`, `recipe_id?`), `sync_op` (idempotency log, `op_id` unique per user) |

### 5.3 Auth (D3)

**Endpoints**
- `POST /api/auth/register` and `POST /api/auth/login`.
  - Body: `{email, password, name?, client: "web" | "android"}`.
  - When `client` is `web`, the response sets the session cookie.
  - When `client` is `android`, the response is
    `{access_token, refresh_token, expires_in, user}`.
- `POST /api/auth/refresh` rotates the token pair. Reusing an old refresh token revokes the
  session.
- `POST /api/auth/logout`, `POST /api/auth/logout-all`.
- `GET /api/auth/me`.
- `POST /api/auth/password/forgot` and `POST /api/auth/password/reset`. Reset tokens are
  single-use, stored hashed, and expire after 30 minutes.
- `DELETE /api/account` deletes the account and everything that belongs to it (cascade).

**Authorisation**
- One dependency, `current_user`, accepts either the cookie or `Authorization: Bearer`.
- Every query is filtered by `user_id`.

**Cookie and CORS**
- Cookie: `drishyam_session`, `HttpOnly`, `SameSite=Lax`, `Secure` in production.
- CORS uses an explicit allowlist. It is not needed for same-origin web or for Android.

**Rate limits**
- Login, register and forgot-password: limited per IP and per email.
- Deep Inspect: 10 requests per minute per user.
- `shortcut:` the limiter is in-process, so it only holds for a single worker. Move it to
  Postgres or Redis before running multiple workers.

### 5.4 API surface

All responses are JSON. Errors use the shape `{error:{code, message, request_id}}`. Every
response carries `X-Request-ID`.

| Endpoints | Notes |
|---|---|
| Auth (§5.3) | — |
| `GET/PUT /api/profile`, `GET/PUT /api/preferences`, `GET/PUT /api/goals`, `POST /api/goals/calculate`, `GET/PUT /api/nutrition/targets`, `GET/PUT /api/settings` | PUT sends `version` |
| `GET/POST /api/pantry`, `PUT/DELETE /api/pantry/{id}` | Uses the spec's verb (PUT). Deduplicates by canonical name or alias. |
| `POST /api/recommend`, `GET /api/recipes?q=&cuisine=&diet=&max_minutes=`, `GET /api/recipes/{id}?servings=`, `GET /api/instructions/{id}`, `POST/DELETE /api/recipes/{id}/save`, `GET /api/saved`, `GET/POST /api/recipe-history` | — |
| `GET /api/flavour/{ingredient}`, `GET /api/flavour/graph?ingredients=a,b,c`, `GET /api/substitute?ingredient=` | The graph response includes server-computed 3D positions (§5.8) |
| `POST /api/nutrition/analyze`, `GET /api/nutrition/summary?range=day\|week\|month&date=`, `POST /api/nutrition/meal-log`, `GET /api/nutrition/history`, `PUT/DELETE /api/nutrition/meal-log/{id}` | — |
| `GET/POST /api/meal-plans`, `PUT/DELETE /api/meal-plans/{id}`, `POST /api/meal-plans/{id}/meals`, `PUT/DELETE /api/planned-meals/{id}` | Supports move and reorder via `date`, `meal_type` and `position` |
| `GET /api/shopping`, `GET /api/shopping/suggestions`, `POST /api/shopping/items`, `PUT/DELETE /api/shopping/items/{id}`, `POST /api/shopping/from-plan/{plan_id}` | — |
| `POST /api/scan/deep-inspect` | Multipart, a single `image/*` up to 8 MB, requires `consent=true`, processed in memory and never stored |
| `GET /api/sync/bootstrap`, `GET /api/sync/changes?since=`, `POST /api/sync/push`, `GET /api/sync/status` | §5.5 |
| `GET /api/public/showcase` | **No auth.** Real engine output for the public pages: catalogue counts, sample flavour graph, the same recipe set ranked under 3 goals, a sample nutrition breakdown. All provenance-labelled. |
| `GET /api/health`, `GET /api/health/integrations` | Credentials reported only as present/absent booleans, plus call counts and the last error. No secrets. |

### 5.5 Sync

- **Synced entities:**
  - collections: pantry, planned_meal, meal_plan, meal_log (+ items), shopping_list, shopping_item, saved_recipe, recipe_history;
  - singletons: profile, preferences aggregate, goal, nutrition_target, settings.
- **`changes?since=<cursor>`**
  - The cursor is opaque: base64 of `(updated_at, id)`.
  - Returns rows **including tombstones**, 500 per page, as `{changes, cursor, has_more}`.
- **`push`**
  - Request body: `{ops:[{op_id, entity, id, op: "upsert" | "delete", base_version | null, data}]}`.
  - Each op gets one result:
    - `applied{version}`
    - `duplicate{original}` (the `op_id` was already applied)
    - `conflict{server_row}`
    - `rejected{errors}`
  - `data` is validated by Pydantic. A user can only touch their own rows.
- **Client policy:** on conflict, the server wins. Android replaces its local row and shows
  "Updated on another device". Deletes are idempotent. Creates never conflict, because IDs are
  UUIDs.

### 5.6 Recommendation pipeline

Implemented once, in `backend/app/services/gastronomy.py` and `recommendation.py`.

1. **Hard gates:**
   - allergens;
   - exclusions;
   - lifestyle and restrictions (Mise's `_diet_ok` / `recipe_diet`);
   - cooking time no more than 2.5 × the requested limit.
2. **Gastronomy score** (Mise's `rank()`):
   0.30 core coverage + 0.20 utilisation + 0.20 flavour coherence + 0.30 gap fit.
   Each component is in [0, 1].
3. **Personal-fit score.** Separate, with configurable weights. It measures fit **against the
   user's remaining targets for the meal slot**:
   - calories;
   - protein share;
   - macro balance;
   - fibre;
   - time;
   - cuisine and taste.
4. **Final ranking:**
   - `final = gastronomy × (0.5 + 0.5 × fit)`. Both scores are shown, plus a goal explanation
     generated from real numbers (§8.3).
   - A recipe with gastronomy below 0.35 is never promoted to the top.
5. **Unlock suggestion:**
   - Pick the single missing ingredient that maximises
     (recipes it makes feasible × flavour links to the pantry × gain in fit).
   - It comes with a "why" explanation.
   - It is never suggested when the pantry already covers that need.

### 5.7 Goals and nutrition engine

Implemented in `services/goal_calculator.py` and `services/nutrition_calculator.py`.

**Energy and targets**
- Mifflin-St Jeor BMR, then TDEE = BMR × activity multiplier.
- Each of the 8 goals has a documented rule. The UI shows the formula and its assumptions, and
  every target is labelled an *estimate*.

**Safety bounds**
- Calories never go below the larger of BMR and a floor of 1,200 kcal (female) or 1,500 kcal
  (male).
- The deficit is at most 25% of TDEE.
- The surplus is at most +20% (+25% for dirty bulk).
- Users may override targets. An override outside these bounds triggers a warning.

**Units and outputs**
- Supported units: g, kg, ml, l, tsp, tbsp, cup, and piece (using a grams-per-piece value per
  ingredient).
- Outputs:
  - per serving and per 100 g;
  - macros, sugar, saturated fat and sodium;
  - micronutrients that have a source;
  - a per-ingredient breakdown.
- Every number carries its provenance.

### 5.8 Motion, gestures and 3D (A4, §4.3, §22)

**Shared motion tokens**

| Token | Value | Use |
|---|---|---|
| Duration `instant` | 90 ms | Press feedback |
| Duration `quick` | 180 ms | Hover, chips |
| Duration `standard` | 320 ms | Panels, cards |
| Duration `emphasized` | 560 ms | Section and page reveals |
| `scroll` | No duration; tied to scroll progress | Cinematic scrubbing |
| Easing `standard` | `cubic-bezier(.2,0,0,1)` | Most transitions |
| Easing `decelerate` | `cubic-bezier(.05,.7,.1,1)` | Elements entering |
| Easing `exit` | `cubic-bezier(.3,0,.8,.15)` | Elements leaving |
| Gesture springs | Damping 0.8, medium-low stiffness | Drags and swipes |

The tokens are CSS variables on the web and a `DrishyamMotion` object in Compose.

**Rules**
1. Animate only transform and opacity (on Android, use `graphicsLayer`).
2. Never animate layout properties inside a loop.
3. Hold 60 fps.
4. 3D scenes pause when off-screen or when the tab is hidden. Device pixel ratio is capped
   at 2.
5. Low-end devices automatically get fewer particles (`deviceMemory ≤ 4` or
   `hardwareConcurrency ≤ 4`).
6. **Reduced motion**, from `prefers-reduced-motion` on the web or
   `ANIMATOR_DURATION_SCALE == 0` on Android:
   - no smooth scrolling;
   - the video shows its poster or stepped frames;
   - 3D is replaced by a static 2D layout;
   - reveals switch to plain opacity changes.
7. Motion never blocks input:
   - The preloader shows only until the video can play, or for at most 1.2 s, and is skipped on
     repeat visits.
   - Content must be interactive within 600 ms.
8. **Every gesture has a button or keyboard equivalent**, for accessibility.

**Web** (GSAP 3.15 plugins and three 0.180, both already installed)

| Feature | Implementation |
|---|---|
| Smooth scrolling | `ScrollSmoother` on public pages only, with `smoothTouch` off so phones keep native momentum. `/app` uses native scrolling. |
| Headings | `SplitText` masked line reveals, staggered 60 ms, played once |
| Hero | Scroll-scrubbed video (S2) plus a transparent **Three.js aroma layer**: instanced amber particles whose camera dolly follows scroll, with pointer parallax on fine-pointer devices only |
| **Ingredient constellation** (keyframe 1 section) | A 3D cluster of real catalogue ingredients grouped by category, from `/api/public/showcase` |
| **3D flavour graph** (`/flavour-science` and `/app/flavour`) | Ingredient and compound nodes, with an edge whenever an ingredient contains a compound. Shared compounds are highlighted. **Node positions are computed on the server and are deterministic:** ingredients sit on a Fibonacci sphere and each compound sits at the centroid of the ingredients that contain it, so a compound shared by A and B lands between them. This is the same O(n) layout on web and Android. |
| Graph gestures | Drag to rotate (`OrbitControls` with damping), pinch or scroll to zoom, tap or click to select (raycast) and open a detail panel, double-tap to fly to a node (GSAP camera tween). Keyboard: arrows cycle through nodes, Enter selects. A "List view" toggle shows the same data as a table. Without WebGL, it falls back to the **existing 2D `aroma-network.tsx`** canvas. |
| Personalised cooking section | A goal switcher. The same recipes re-rank per goal with real showcase data, and the reorder is animated with `Flip`. |
| App lists | Pantry and recipe filter changes are animated with `Flip`. |
| Meal planner | Drag and drop meals between slots and days with `Draggable` and `InertiaPlugin`, with "Move to…" buttons as the non-gesture equivalent |
| Cooking mode | Swipe between steps (`Observer`), large tap zones, arrow keys, a Wake Lock to keep the screen on |
| Small touches | The existing magnetic CTAs (fine pointer only). Counters animate once on first view. Route transitions use React `<ViewTransition>` only if it is stable in the installed Next 16.4; otherwise there are none. No library is added for this. |

**Android** (Compose and AndroidX only)

| Feature | Implementation |
|---|---|
| Shared-element transitions | Recipe card → recipe detail and pantry row → pantry detail, using `SharedTransitionLayout` (Compose 1.7 or later) |
| Back navigation | Predictive back |
| Splash | Core SplashScreen API showing the real app icon |
| List gestures | `SwipeToDismissBox` on pantry, shopping and meal-log rows, with an undo snackbar. `PullToRefreshBox` triggers a sync. |
| Meal planner | Long-press drag to reorder, with a "Move to…" menu as the alternative |
| Cooking mode | `HorizontalPager` for steps, with large tap targets |
| Camera gestures | Pinch to zoom, tap to focus, vertical drag for exposure |
| **3D flavour graph** | A Canvas pseudo-3D projection of the same server-computed 3D positions: drag to rotate, pinch to zoom, tap to select, with nodes depth-sorted |
| Scanner | Bounding boxes ease towards their new positions, so tracking smoothing is visible. Chips use `animateItem`. |
| Haptics | Fire when a swipe commits, a drag is picked up, or an item is confirmed. They respect the settings toggle. |
| Performance | A Baseline Profile covers startup and the main scrolling screens |

**Logos (§2.2: the supplied files are used and never regenerated)**
- `logo1.png` composited onto `#080808` serves as the nav and footer wordmark (cropped), the
  preloader reveal (a mask and fade over the real image, never redrawn), and the OG image.
- `logo.png` produces the favicon, the apple-touch icon, the Android adaptive icon (66% safe
  zone on a `#080808` background), a monochrome themed icon derived by luminance threshold,
  the splash icon, and the 512 px store icon.

---

## 6. Implementation steps (dependency order; each step includes its code, tests and docs)

Sizes: S small · M medium · L large · XL very large.

### S0 — Toolchain, credentials and baseline (S)

**Do**
- Finish the Temurin **JDK** 21 install. Point Gradle at it in the user-level
  `~/.gradle/gradle.properties`, not in the repo.
- Create `backend/.venv`. The backend will use Python 3.14.8 unless any pinned wheel (for
  example psycopg's binary build) is missing for 3.14, in which case it falls back to 3.13.
- Create the local Postgres databases `drishyam` and `drishyam_test`.
- Run the Foodoscope smoke test: one FlavorDB call and one RecipeDB call with both headers,
  printing only the HTTP status. Expect 200.
- Record a baseline of `npx tsc --noEmit`, `npm run build` and `./gradlew assembleDebug`.

**Done when**
- The baseline results are recorded.
- The Foodoscope status is known: either the key works, or it is still 401 and that is noted
  as a blocker for live checks only.

### S1 — Ponytail cleanup (S) · after S0

**Files**
- Everything listed in §3.1.
- `.gitignore`: add `backend/.venv` and `media/source/*.tmp`.
- `.env.example`.
- `package.json`: `verify:visual` becomes `node scripts/verify-visual.ts`; add `playwright` as
  a dev dependency.

**Note:** the Prisma, `app/api` and `lib` engine deletions **happen in S7**, together with the
rewiring, so the website never breaks between steps. S1 only deletes code nothing uses.

**Verification**
- `git grep -nE "frontend/|uvicorn backend.app.main|drishyam-cinematic|simulateDetection|ui/button"`
  returns 0 hits.
- `tsc` and `build` are no worse than the baseline.

### S2 — Brand assets and a sharper hero video (M) · after S1 · can run in parallel with S3

**Why the video looks soft (root causes found in the audit)**
1. A 720p source is upscaled on screens 1080p and larger.
2. The 55–60% opacity plus the overlays crush contrast.
3. Long-GOP seeking and stacked rAF seeks show late or partially decoded frames while
   scrolling.

**Encode** from `media/source/hero-whatsapp.mp4` to `public/videos/hero-{720,1080,1440}.mp4`
- H.264 High, yuv420p, no audio (`-an`), `+faststart`.
- CRF 16–18, `-preset slow -tune film`.
- **Keyframe every 4 frames** (`-g 4 -keyint_min 4 -sc_threshold 0`), so each scroll seek
  decodes at most a few frames.
- Upscale with `scale=…:flags=lanczos`, then apply light luma-only sharpening:
  `unsharp=5:5:0.5:5:5:0`.
- Keep the 1080p file at about 12 MB or less.
- Regenerate `hero-poster.webp` from the master.

**Known limit:** sharpening cannot add real detail. Genuinely more detail needs an AI
upscaler (Real-ESRGAN or Topaz, not installed) or a higher-resolution source. This is listed
as a limitation.

**`components/hero.tsx` changes**
- Pick the source from `innerWidth × devicePixelRatio`.
- Raise opacity to 0.85–1 and keep the gradient on the text side only.
- No CSS transforms on the video.
- Keep blur and backdrop-filter effects away from the focal area.
- Seek only when `!video.seeking`, always to the latest target. Use `requestVideoFrameCallback`
  when available.
- Keep the reduced-motion still frame and the fallback to the poster on errors.

**Brand:** produce every asset in §5.8 "Logos" and the four keyframe crops.

**Verification**
1. **Sharpness:** screenshots at 2560×1440 before and after; the Laplacian variance of the hero
   region must go up. Record both numbers.
2. **Seek latency:** the gap between `seeking` and `seeked` during a scripted scroll has p95
   under about 50 ms on desktop Chrome. Record it.
3. **Fallbacks:** reduced motion and a 404 on the video both still render the poster, with no
   console errors.
4. **Icons:** the favicon, apple-touch icon and Android icons are generated from `logo.png`,
   with byte-level provenance noted in `media/brand/README.md`.

### S3 — Backend foundation: layout, config, database and seed (L) · after S1 · **[ONE-WAY]**

**Files**

```
backend/
  app/
    main.py, config.py (pydantic-settings, Mise env names)
    api/
    core/ (security.py, dependencies.py, exceptions.py, logging.py, ratelimit.py)
    models/
    schemas/
    services/
    seed.py
  migrations/ (Alembic)
  data/seed/
  tests/
  requirements.txt, requirements-dev.txt
```

Requirements: fastapi, uvicorn, sqlalchemy 2, psycopg[binary], alembic, pydantic-settings,
argon2-cffi, httpx, python-multipart. Dev: pytest, pytest-asyncio, respx.

**Behavior**
- **Models:** reuse the archived ones where possible, migrated to UUID primary keys,
  `version`, timestamps and tombstones. Add the rest of §5.2.
- **Middleware:** `X-Request-ID`, JSON logs that never include email, tokens or passwords, the
  error envelope, a CORS allowlist, `TrustedHost` in production.
- **Seed** (`python -m app.seed`, idempotent):
  - **20 or more recipes** across every lifestyle and at least 6 cuisines. Recipe nutrition is
    **calculated** from ingredient quantities, never typed in by hand.
  - Ingredient nutrition from USDA FDC (`scripts/fetch_fdc.py`, using `FDC_API_KEY` or
    `DEMO_KEY`), with `fdc_id` and the retrieval date. Items FDC does not have (garam masala,
    paneer) are marked `estimated` with the method used.
  - Aliases in Hindi and English. Allergen and diet tags. The 10 pantry categories.
  - The demo user, labelled `demo`.
- Seeding is never triggered from the app's `lifespan` startup hook.

**Rollback:** run `alembic downgrade base`, revert the commit, reseed. Only seed data is lost.

**Kill criterion:** if psycopg wheels or Alembic misbehave on Python 3.14 or Postgres 18, stop
and use Python 3.13 and Postgres 16 from mise.

**Verification**
- `alembic upgrade head` succeeds on an empty database.
- `pytest tests/test_seed.py` checks: at least 20 recipes; every ingredient has nutrition
  provenance; stored recipe nutrition equals the engine's recalculation.

### S4 — Auth and sessions (M) · after S3

**Files:** `core/security.py`, `api/auth.py`, `api/account.py`, `core/ratelimit.py`.

**Behavior:** as defined in §5.3. In production the app refuses to start without an explicit
`SECRET_KEY`, which is used for cookie signing and CSRF.

**CSRF protection:** `SameSite=Lax` cookies, plus an `Origin`/`Referer` check on any
cookie-authenticated request that changes data.

**Verification** (pytest against `drishyam_test`)

| Area | Checks |
|---|---|
| Cross-platform login | Register with `client=web`, then log in with `client=android` using the same credentials, and the other way round |
| Token refresh | Rotation works. Replaying an old refresh token returns 401 and revokes the session. |
| Session end | Logout returns 401 afterwards. An expired access token returns 401, and refresh then works. `logout-all` ends all sessions. |
| Isolation | User A gets 404 on user B's rows. |
| Rate limits | The request after the limit returns 429. |
| Password reset | The reset token is single-use. |
| Account deletion | It removes every row the user owns. |
| CSRF | A request with a foreign `Origin` returns 403. |

### S5 — Domain services and APIs (XL) · after S4

**Files**
- `services/recipedb.py` and `services/flavordb.py`: Mise's `foodoscope.py` made async with
  httpx. They send **both** auth headers, use timeouts, retry twice with backoff on 5xx or
  timeouts (never on 4xx), treat 429 as "fall back and label it demo", cache results in
  `external_cache` (including remembered misses), and enforce the call budget.
- `services/gastronomy.py`: Mise's `ranking.py`.
- `services/recommendation.py`: §5.6.
- `services/goal_calculator.py` and `services/nutrition_calculator.py`: §5.7.
- `services/vision.py`: Deep Inspect with no fake fallback.
- `services/{pantry,meal_planner,shopping,flavour_graph}.py`.
- `api/*` for every endpoint in §5.4 except sync.

**Behavior**
- **Recipes:**
  - Live RecipeDB results are cached in `recipe` with `source=recipedb_live`.
  - Without a working key, results come with `source=demo` and the response says so.
- **Flavour data:**
  - Look up the FlavorDB entity, then fetch its `molecules-compact` list. Those are the real
    compounds.
  - Shared compounds are the intersection of two ingredients' compound sets.
  - The fixture is labelled `curated_fixture`.
  - `scripts/snapshot_flavordb.py` saves a provenance-tagged offline snapshot once a working
    key is available.
- **Substitutes:** FlavorDB similarity plus RecipeDB `ingredientSubstitutes`, filtered by the
  user's hard gates.
- **Shopping:**
  - Suggestions = missing ingredients for planned recipes, minus what is in the pantry, plus
    low-stock items.
  - Merged by canonical name. Nothing is suggested if the pantry already covers it.
- **Meal logs:** store server-calculated snapshots, recalculated on every edit.
  `daily_nutrition_summary` is kept up to date in the same transaction.
- **`/api/public/showcase`:** returns real engine output, labelled with provenance.

**Verification** (pytest)

| Area | Checks |
|---|---|
| Goals | Golden BMR and TDEE values for all 8 goals, including the floors and caps |
| Allergies | A hard filter: a peanut recipe never appears for a peanut-allergic user |
| Diet filter | `vegetarian` does not match `non-vegetarian` |
| Target-relative ranking | The same recipe ranks differently for `fat_loss` and `lean_bulk`. A 900 kcal high-protein dish does not rank first for a 1,600 kcal cut. |
| Unlock | Never suggests an ingredient the user already has |
| Nutrition | 2 × one serving equals two servings. Unit boundaries are correct. |
| Foodoscope client (respx) | Both headers are sent. A 404 is remembered as a miss. 429 falls back to the `demo` label. Retries happen on 5xx only. |
| Deep Inspect | 400 without consent, 413 over 8 MB, 503 with no provider |
| Flavour graph | Layout is deterministic: the same input gives the same positions |
| Contract fixtures | Every response shape is recorded to `contracts/fixtures/*.json` |

### S6 — Sync API (M) · after S5

**Files:** `services/synchronization.py`, `api/sync.py`, plus `version` checks in every route
that changes data.

**Verification** (pytest)
- Bootstrap followed by `changes` from an empty cursor returns everything. Paging works when
  `has_more` is true.
- Replaying the same `op_id` returns `duplicate` with no side effects.
- A stale `base_version` returns `conflict` with the server row.
- A delete followed by a stale update keeps the tombstone.
- Using another user's row ID is rejected.
- A web PUT with a stale `version` returns 409.
- Two concurrent pushes to the same row leave exactly one winner.

### S7 — Rewire the website onto FastAPI (M) · after S5 and S6

**Files**
- `next.config.ts`: rewrite `/api/:path*` to `${API_ORIGIN}/api/:path*`.
- `lib/api.ts`: a server-side fetch that forwards the session cookie, raises a typed
  `ApiError`, and redirects to `/login` on 401.
- `lib/api-types.ts`: generated by `npm run gen:api`.
- The Next 16 request proxy (middleware): redirect `/app/*` requests that have no cookie. The
  backend still decides whether the session is valid.
- Existing pages and components: switch them from `lib/*` and Prisma to the API.
- Then delete `prisma/`, `app/api/**` and the `lib` engines (§3.1).

**Done when** the existing 5 app pages and the login page work against FastAPI, with no Prisma
left in the repo.

**Verification**
- `tsc` passes.
- `npm run gen:api` produces no diff (types are up to date).
- `verify-visual.ts` passes the login flow and the existing routes.
- `git grep -n prisma` returns 0 hits.

### S8 — Public website: 3D, motion and gestures (XL) · after S2. Pages can start now; showcase data comes from S5.

**Files**
- `app/page.tsx` and the `components/landing-*` files.
- The 3D modules: `components/three/{hero-aroma,ingredient-constellation,flavour-graph}.tsx`,
  sharing one hook, `useThreeScene` (renderer lifecycle, DPR cap, pausing via
  IntersectionObserver and visibility, disposal).
- New routes: `/about`, `/how-it-works`, `/flavour-science`, `/nutrition`, `/features`,
  `/privacy`, `/terms`, `/contact` (mailto link only, no backend), `/register` and
  `/forgot-password` (both reuse the auth form).
- A shared `content-page.tsx`.

**Behavior**
- **Navigation, exactly as §5.1 specifies:**
  - Left: logo and wordmark.
  - Centre: Discover (→ `/features`) · How it works · Flavour Science · Nutrition · About.
  - Right: Sign in · Launch DRISHYAM.
- **Hero copy:**
  - Eyebrow: "THE INTELLIGENT KITCHEN".
  - Headline: "Your ingredients. Your nutrition. Your next great meal."
  - Description: as given in §5.1.
  - CTAs: "Start exploring" and "Discover how it works".
- **Sections:** the six from §5.1, each mapped to a keyframe inset image, plus the final CTA:
  "Make more of what's already in your kitchen."
- All motion, 3D and gestures follow §5.8.
- Every figure comes from `/api/public/showcase`. Nothing is invented.
- Privacy and terms pages include the camera and Deep Inspect disclosures (§21).

**Verification** (`verify-visual.ts`)

| Area | Checks |
|---|---|
| Viewports | 1440×900, 834×1112 and 390×844: no console errors, no horizontal overflow, every nav link returns 200 |
| Reduced motion | No ScrollSmoother, no WebGL canvas, and the 2D or list fallback is visible |
| WebGL disabled | The 2D aroma network renders instead |
| Gestures | A scripted drag rotates the graph (the camera position changes), a tap selects a node (the detail panel opens), and keyboard navigation works |
| Performance | Median frame time stays at or under 18 ms during a scripted scroll on desktop, sampled with rAF |
| Lighthouse (mobile) | Performance ≥ 85, accessibility ≥ 90, CLS < 0.05 |

### S9 — Website authenticated app (XL) · after S7

**Routes (§5.2)**

| Route | Contents |
|---|---|
| `/app` | Dashboard |
| `/app/pantry` | Pantry |
| `/app/recipes` | Recipe discovery |
| `/app/recipes/[id]` | Recipe detail plus cooking mode (§5.8) |
| `/app/flavour` | 3D flavour graph |
| `/app/nutrition` | Nutrition for day, week and month |
| `/app/goals` | 8 goal cards, biometrics and target overrides, split out of `nutrition-studio.tsx` |
| `/app/meal-planner` | Daily and weekly planning, drag and drop, totals against targets, "Build shopping list" |
| `/app/meal-history` | Create, edit and delete meals; adjust portions |
| `/app/saved` | Saved recipes |
| `/app/shopping` | Shopping list |
| `/app/profile` | Profile |
| `/app/settings` | Includes "log out of all devices" and account deletion |

**Reuse** `app-shell`, `consumption-rings`, `unlock-card`, `recipes-workspace` and
`aroma-network` rather than duplicating them.

**Rules**
- Real data only. Empty states point the user to the next action.
- Pantry rows created by Android show a source badge and the detection confidence, and can be
  edited and deleted.
- Unsaved form input survives network errors.
- A 409 shows "Changed on another device — reload".
- Data that is not live shows a provenance badge.

**Verification**
- `verify-visual.ts` logs in, visits every route, and exercises create, edit and delete for
  pantry, meal plan (including drag), meal log and shopping. It then reloads to confirm the
  changes persisted.
- A no-dead-buttons check clicks every button and link on every page.
- All three viewports are covered.

### S10 — Android foundation (L) · after the §5 contracts are frozen (it can run alongside S5–S6, and must pass against them)

**Module graph (D8).** How the spec's §6.2 modules map onto ours:

```
build-logic/convention  drishyam.android.{library,feature}       ← build-logic
app                     NavHost; bottom bar Home·Scan·Pantry·Discover·Nutrition; drawer for the rest
core/model              §5.1/§5.2 types                          ← core/model, core/common
core/designsystem       tokens §4.2 + DrishyamMotion §5.8, Cormorant Garamond + Manrope fonts,
                        shared UI components                     ← core/designsystem, core/ui
core/network            Retrofit, kotlinx.serialization, AuthInterceptor, refresh Authenticator
core/database           Room entities/DAOs, OutboxOp, exported schemas, migrations
core/datastore          settings + Keystore/Tink token store     ← core/datastore, core/security
core/data               repositories + SyncWorker (WorkManager)  ← data/*, core/sync, core/domain
core/testing            fakes + contract-fixture loader          ← core/testing
vision                  camera/, pipeline/, tracking/, accumulator/
feature/auth            login, register, reset
feature/onboarding
feature/home            dashboard
feature/scanner         live scanner, results
feature/pantry          list, detail
feature/recipes         discover, detail, cooking mode           ← recipes, recipe-details
feature/flavour         flavour science
feature/nutrition       dashboard, goals, meal logs              ← nutrition, goals, meal-logs
feature/planner         meal planner, shopping                   ← meal-planner, shopping
feature/account         profile, settings, saved recipes         ← profile, settings, saved-recipes
```

**Versions**
- The newest stable AGP that runs on JDK 21.
- Kotlin 2.x with the Compose compiler plugin.
- Compose BOM with Compose 1.7 or later (needed for shared-element transitions).
- compileSdk and targetSdk 36 or higher, matching an installed platform.
- Hilt with KSP.
- Confirm the whole combination builds.

**Configuration**
- The base URL is set per build type. Debug uses `http://10.0.2.2:8000` and can be overridden
  in `local.properties`.
- Release builds must use HTTPS, with cleartext traffic disabled.

**Verification**
- `./gradlew assembleDebug testDebugUnitTest` passes.
- JVM tests:
  - a 401 triggers a single refresh, then one retry;
  - the outbox keeps order and the `op_id` is idempotent;
  - a conflict replaces the local row;
  - **contract tests** parse every `contracts/fixtures/*.json`.
- The Room schema is exported and the migration test passes.

### S11 — Android features other than the scanner (XL) · after S10

**Screens (§6.4)**

| Group | Screens |
|---|---|
| Entry | Splash, login, register, password reset |
| Onboarding | Profile → goal → lifestyle and allergies → cuisine, taste and meal preferences → targets |
| Core | Dashboard; pantry list and detail (offline) |
| Recipes | Discover; recipe detail; cooking mode (keeps the screen on, one-handed bottom controls, timers, finish → log meal) |
| Insight | Flavour science (3D Canvas, §5.8); nutrition by day, week and month; goals |
| Planning | Meal planner (drag to reorder); meal logs; shopping |
| Account | Saved recipes, profile, settings (separate sound and haptic toggles, privacy, logout, delete account) |

All motion and gestures follow §5.8.

**Verification**
- Compose UI tests:
  - the onboarding flow;
  - add, edit and swipe-delete a pantry item while offline, reconnect, and confirm it synced;
  - drag-reorder a planned meal;
  - page through cooking steps.
- Emulator run against the local backend, with screenshots of every screen.
- Jank check: `adb shell dumpsys gfxinfo` on the dashboard and pantry scroll stays under 5%
  janky frames on the emulator. Real-device numbers are recorded in S15.

### S12 — Baseline Profile and motion polish on Android (S) · after S11

**Do**
- Add an `androidx.baselineprofile` producer covering startup, the dashboard and the pantry
  scroll.
- Audit reduced-motion handling for custom infinite animations such as the scanner sweep.

**Verification:** a Macrobenchmark startup run with and without the profile, with both numbers
recorded.

### S13 — Android scanner (XL) · after S10. Deep Inspect also needs S5.

**Camera (CameraX)**
- Preview plus `ImageAnalysis` (`KEEP_ONLY_LATEST`, YUV) on a background executor.
- Front and rear camera, torch, tap to focus, exposure compensation, pinch to zoom.
- Freeze frame, manual capture, stop and resume.
- Permission rationale and denied screens.

**Pipeline**
- Signals 1, 2 and 4 from §4 run now. Signal 3 is a slot driven by
  `assets/models/manifest.json`, which stays empty until S14 passes its gate.
- Every signal implements a common `IngredientSignal` interface.
- Boxes are mapped with CameraX `CoordinateTransform`, handling rotation and the FILL and FIT
  scale modes.
- An IoU tracker uses `elapsedRealtimeNanos` timestamps.
- The accumulator applies the §9.5 rules and states.

**UI (§9.6)**
- Top bar: back, settings, torch, switch camera.
- Middle: boxes with label and confidence, and the scan animation.
- Bottom sheet: status, count, editable chips, manual add, freeze, "Confirm to pantry".
- Only confirmed items are written to Room and the outbox.
- A chime and a haptic fire once per newly confirmed item, never for duplicates.

**Deep Inspect**
- Show the consent sheet first.
- Send one JPEG (longest side ≤ 1600 px, EXIF stripped).
- Show the returned candidates as the same confirmation chips.

**Lifecycle**
- Analysis stops when the screen is hidden, and the detectors and executor are closed.
- Nothing runs on the main thread.

**Telemetry:** a debug overlay plus logcat showing FPS, latency (p50 and p95) and memory.
Frame skipping adapts when latency goes over budget.

**Verification**
- JVM tests:
  - 1,000 ms persistence driven by synthetic timestamps, so frame rate does not matter;
  - deduplication;
  - a confidence of 0.749 is rejected and 0.75 is accepted;
  - box mapping at 0°, 90° and 270°, in both FILL and FIT;
  - OCR alias matching: "MDH Haldi Powder 100g" gives turmeric, "जीरा" gives cumin,
    "Garam Masala" gives garam masala, and "Chilli Sauce" matches nothing.
- Instrumented tests: the detector loads and runs on a fixture image; the camera permission
  flow works.
- On a **physical device**, record FPS, latency, memory and thermal state over 5 minutes.

### S14 — Culinary model track (ML, L) · runs alongside everything else; ships only through its gate

1. **Data**
   - Mendeley *Indian Spices* (19 classes) and Daffodil (8 classes), both CC BY 4.0.
   - The Roboflow spices set, relabelled with region boxes only.
   - Kaggle vegetables, after legal review.
   - **Our own photos**:
     - masala dabba, katoris, jars and packets;
     - 3 lighting conditions;
     - 2 or more phones;
     - at least 300 crops per class;
     - a held-out *kitchen-only* test set of at least 50 per class.
   - Keep a `third_party_models.yaml` that records the licence of every piece of code,
     weights and data.
2. **Training** with Apache-licensed tools only: MediaPipe Model Maker. Train an
   EfficientNet-Lite classifier and an EfficientDet-Lite "ingredient region" detector. Export
   to LiteRT with metadata, in int8 and fp16.
3. **Gate, per class**
   - Precision of 0.90 or more → the class may be auto-suggested.
   - 0.75 to 0.90 → top-2 choice chips only.
   - Below 0.75 → not shipped.
   - Publish the confusion matrix for the four look-alike powders.
4. **Benchmark** on a mid-range phone and a flagship: FPS, p95 latency, APK size increase.

**Done when:** the model card (`docs/scanner.md`), gate results and manifest are committed.

### S15 — Cross-platform end-to-end checks (L) · after S9, S11 and S13

**Scenarios** (run with one backend, the emulator and Playwright)
1. Register on the web and log in on Android, then the reverse.
2. On Android, scan or manually confirm turmeric. After sync, the web shows its source and
   confidence. Edit it on the web, and Android picks up the change.
3. With Android in airplane mode: change the pantry, log a meal, and scan offline. After
   reconnecting, there are no duplicates and no lost edits.
4. Edit the same item at the same time on web and Android. Expect a visible 409 or conflict
   message, never a silent overwrite.
5. Two separate accounts stay fully isolated from each other.

**Also check:**
- **Security:**
  - No secrets in the APK (`apkanalyzer`, `strings`).
  - Cookie flags are correct in production.
  - Rate limits are enforced.
  - Account deletion removes everything.
- **Performance:** measure and record all the numbers on real hardware.

**Done when:** every row of §8 has its evidence.

### S16 — Documentation and delivery (M) · after S15

**Files**
- A truthful `README.md`.
- `docs/architecture.md` (D1–D11).
- `docs/api.md`, linking to FastAPI's `/docs` plus examples.
- `docs/database.md`, with an ER diagram.
- `docs/sync.md`.
- `docs/motion.md`, covering the §5.8 tokens and rules.
- `docs/android.md`: build guide and debug APK.
- `docs/scanner.md`: model card, licences, measured performance.
- `docs/deployment.md`: Postgres, uvicorn behind Caddy with HTTPS, Next.js production build,
  environment variables, release keystore. Includes `deploy/docker-compose.yml` (postgres,
  api, web, caddy).
- `docs/demo-mode.md`.
- `docs/limitations.md`.
- `.env.example` and `backend/.env.example`, listing every variable with no values.

**Deliverables**
- Debug APK.
- Release build configuration, with signing read from environment variables.
- Next.js production build.
- Final report covering: implemented features, working and missing integrations, missing
  credentials and model weights, tests run with their actual output, performance numbers,
  limitations, and build and deployment status.

---

## 7. Dependencies and parallel work

```
S0 → S1 ─┬→ S2 ──────────────→ S8 (showcase data needs S5) ─┐
         └→ S3 → S4 → S5 → S6 → S7 → S9 ───────────────────┼→ S15 → S16
                   §5 frozen → S10 → S11 → S12 ─────────────┤
                               S10 → S13 ───────────────────┘
S14 (ML) runs from S1 onward and feeds S13 only through the model manifest.
```

**Can run in parallel** (each pair in its own git worktree):
- S2/S8 alongside S3–S7.
- S10–S13 alongside S7–S9.
- S14 alongside everything.

**Must not run in parallel (one writer at a time):**
- `backend/migrations`
- `package-lock.json`
- `android/gradle/libs.versions.toml`
- `contracts/fixtures` (written by S5 and S6 only)

---

## 8. Requirement checklist

| Spec | Requirement | Steps | Evidence |
|---|---|---|---|
| §2 | Audit; reuse Foodoscope | §1, S5 | This plan; Mise client and ranking ported, with tests |
| §3.1 | Shared identity and data; no scanner on the web | S1, S4, S6, S7 | Fake scan removed; S15 scenarios 1 and 2 |
| §4 | Unified design system | S2, S8–S11 | Shared tokens; screenshots |
| §5.1 | Public routes, nav, hero, scroll video with Three.js and GSAP, sections | S2, S8 | `verify-visual` across routes, reduced-motion and no-WebGL runs |
| §5.2 | 13 app routes with real data | S9 | `verify-visual` create/edit/delete run |
| §6 | Android stack, modules, navigation, screens | S10–S13 | Gradle build; screenshots |
| §7 | 8 goals; lifestyles; allergies; cuisines, tastes, meals | S5, S9, S11 | Golden goal tests; hard allergy filter test |
| §8 | BMR/TDEE, overrides, safety bounds, explanations | S5 | Engine tests |
| §9 | CameraX, on-device inference, 0.75 / 1,000 ms rules, states, feedback, Deep Inspect, performance | S13, S14 | Tracker tests; device measurements |
| §10 | Pantry: categories, aliases, dedupe, expiry, low stock, source, confidence | S3, S5, S9, S11 | Dedupe test (`haldi` == `turmeric`) |
| §11 | Recommendation inputs, recipe cards, detail, cooking mode | S5, S9, S11 | Ranking tests; cooking-mode UI tests |
| §12 | RecipeDB, FlavorDB, ranking formula, unlock, real-compound visualisation | S5, S8, S9, S11 | respx tests; provenance badges. **Live use is blocked until a working key exists.** |
| §13 | One nutrition engine with provenance | S3, S5 | Seed self-check; identical web and Android values in S15 |
| §14 | Meal planning and meal logs | S5, S9, S11 | CRUD tests; drag-and-drop tests |
| §15 | Shopping list | S5, S9, S11 | Suggestion tests |
| §16 | Feature parity | S9, S11, S13 | Parity checklist in `docs/` |
| §17 | FastAPI, PostgreSQL, SQLAlchemy, Alembic, Pydantic, tracing, logging, rate limits | S3–S6 | pytest; migrations |
| §18 | Cross-platform auth; offline-first sync | S4, S6, S10, S15 | Sync tests; scenarios 1–5 |
| §19 | Database entities | S3 | Migration |
| §20 | 20+ labelled demo recipes; provenance | S3, S5 | Seed self-check |
| §21 | Security and privacy | S4, S5, S13, S15 | S15 security checks |
| §22 | Performance | S2, S8, S12, S13, S15 | Recorded numbers |
| §23 | Automated tests, actually run | All | Command output in the final report |
| §25 | Deliverables and documentation | S16 | Files present; APK built |
| A2 | Ponytail cleanup | S1, S7 | `git grep` checks |
| A2 | Sharper WhatsApp video | S2 | Sharpness and seek measurements |
| A3 | Better spice recognition than YOLO alone | §4, S13, S14 | Gate report |
| A4 | Smooth animation, gestures, 3D, logos | §5.8, S2, S8, S9, S11, S12 | Gesture and fallback tests; frame-time and jank numbers; icons generated from the supplied logos |

---

## 9. Risks, assumptions and missing inputs

| Item | Impact | Resolution |
|---|---|---|
| **Foodoscope key returns 401 ("Invalid API key")** | Live RecipeDB and FlavorDB cannot be verified, so the product runs on labelled demo and fixture data | User checks or regenerates the key, then reruns the S0 smoke test |
| No Gemini or OpenAI key | Deep Inspect returns 503, as designed | User supplies a key |
| No trained culinary model | Spices are covered only by OCR and Deep Inspect until S14 passes its gate | S14 data collection (300+ crops per class) |
| AGPL licence (Ultralytics) | Shipping it would force open-sourcing the app or buying a licence | Use only Apache-licensed tools (§4) |
| CC BY-SA licence (Kaggle vegetables) | Share-alike terms may extend to the trained weights | Legal review, or drop the dataset |
| Python 3.14 is very new | Some dependency wheels may be missing | S3 kill criterion: fall back to 3.13 |
| Keyframes are about 836×470 | Cannot be used full-bleed | Use them as insets, or the user supplies originals |
| The video source is 720p | Encoding improves perceived sharpness but cannot add detail | Optional AI upscaling or a higher-resolution source |
| No physical Android device confirmed | Camera FPS, thermal and battery numbers cannot be measured | User connects a device over ADB; otherwise those numbers are reported as "unmeasured" |
| JDK 21 install stalled | Android cannot build | S0 |
| No SMTP server | No password-reset emails | D10 |
| Scope is very large (XL steps) | Long delivery time | Build in vertical slices; every step ends with something working and tested |

---

## 10. Definition of done

- All 18 Final Acceptance items have evidence (§8).
  - Item 9 (recipe discovery) is shown in demo mode and marked *live-unverified* until a
    working Foodoscope key exists.
  - Item 7 (scanning) covers only classes that are really supported: packaged spices via OCR,
    COCO produce, and any S14 classes that passed the gate.
- The following all pass, with their output captured in the final report:
  - `pytest`
  - `npm run build`, `tsc`, `gen:api` with no diff
  - `verify-visual.ts`
  - `./gradlew assembleDebug testDebugUnitTest`
- None of these remain: fake detections, unlabelled demo data, dead buttons, dead code from
  §3.1, or Prisma.

Next: build (start with S0 → S1).
