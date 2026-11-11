# DRISHYAM — Demo Mode & Evaluation Walkthrough

DRISHYAM provides a zero-setup evaluation pathway for hackathon judges, code reviewers, and prospective users.

---

## 1. Instant Demo Access

### Pre-Seeded Evaluation Account
A fully populated demo profile is available directly in the database:
- **Email:** `demo@drishyam.ai`
- **Password:** `drishyam2026`
- **One-Click Demo Button:** Both the Web login page (`/login`) and Android login screen feature an **"Explore with Demo Account"** button that bypasses credential entry and establishes an authenticated session immediately.

### Pre-Populated State
The demo account includes:
- **Pantry Inventory:** 18 categorized kitchen spices and staples (Turmeric, Cumin, Mustard Seeds, Kashmiri Chili, Basmati Rice, Ghee, Chickpeas, etc.) with realistic detection confidences and source provenance badges (`android_scanner` and `usda_foundation`).
- **Active Meal Plan:** Weekly lunch and dinner slots assigned with balanced computational gastronomy recipes.
- **Nutrition Targets:** Calibrated against a 2,200 kcal balanced maintenance goal with realistic daily intake logs.
- **Flavour Network:** Interactive 3D molecular aroma graph nodes ready for real-time manipulation.

---

## 2. Public Showcase API (`GET /api/public/showcase`)

For visitors evaluating the public landing page without logging in:
- The public showcase endpoint provides real, live engine calculations from the PostgreSQL database.
- It returns catalogue counts (ingredients, recipes, volatile aroma compounds), sample flavor graphs, and recipe rankings under three distinct goals (Hypertrophy, Endurance, Balanced).
- **Zero invented numbers:** All metrics derive directly from the canonical database tables.

---

## 3. Recommended Evaluation Tour

1. **Step 1: Explore Landing Page (`/`)**
   - Scroll through the kinetic hero animation driven by GSAP and Three.js.
   - Inspect the live molecular aroma network and toggle nodes to inspect chemical compounds.
2. **Step 2: Sign In or Click Demo Access**
   - Click "Explore Demo". Notice immediate transition to `/app`.
3. **Step 3: Inspect Pantry (`/app/pantry`)**
   - Note the provenance badges on items (`EDGE SCAN`, `CONFIDENCE 98%`).
   - Add a custom item or update quantities.
4. **Step 4: Recipe Discovery & Cooking Mode (`/app/recipes`)**
   - Filter recipes by goal or cuisine.
   - Click a recipe to open full details. Launch fullscreen **Cooking Mode** with step-by-step cooking timers.
5. **Step 5: Launch Android Scanner on Mobile / Emulator**
   - Open the Android app, navigate to **Scanner**.
   - Observe real-time bounding box tracking, 1000ms stability gating, and haptic feedback on ingredient confirmation.
   - Watch the new item synchronize to the Web pantry dashboard via `POST /api/sync/push`.
