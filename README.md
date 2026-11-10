# DRISHYAM — Computational Gastronomy & Personalised Nutrition

> **“See your ingredients. Discover your possibilities.”**

DRISHYAM is a production-ready computational gastronomy platform. It reads the
volatile chemistry of a real pantry, ranks what can be cooked right now, and
translates every recommendation into metabolic targets derived from the user’s
own biology.

The experience ships as two connected surfaces:

- A cinematic 3D landing page with a scroll-scrubbed film, an 800-particle
  Three.js field, and five pinned storytelling scenes.
- A responsive authenticated workspace with Dashboard, Pantry, Recipes,
  Nutrition and Planner views.

---

## Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16.4 (App Router, Turbopack), React 19 |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS v4, custom glass/gold design system |
| 3D / motion | Three.js, GSAP + ScrollTrigger |
| Data | Prisma 6 + SQLite |
| Auth | bcrypt password hashing, HTTP-only JWT session cookie (`jose`) |
| UI primitives | Radix Dialog, Lucide icons, local Fontsource fonts |

---

## Quick Start

```bash
cd /home/suman/personal/foodc

npm install

# Create the local database and seed all real datasets
npx prisma db push
npm run db:seed

# Development
npm run dev          # http://localhost:3000

# Production preview
npm run build
npm run start
```

The `.env` file only needs:

```dotenv
DATABASE_URL="file:./dev.db"
JWT_SECRET="change_me_in_production"
```

### Demo Account

- **Email:** `demo@drishyam.ai`
- **Password:** `drishyam2026`

Or use **Instant demo kitchen** on the login page. The demo account is fully
seeded with a pantry, a profile, three planned meals, and a Lean Bulk protocol.

**Live preview in this workspace:** `http://localhost:3100`

---

## What Is Real

Everything numeric flows through the engine. There are no static score lists.

- **27** Indian ingredients with nutrition profiles, aliases, flavour descriptors
  and volatile compound mappings.
- **12** molecularly profiled recipes with per-serving macros, instructions and
  pairing notes.
- **100** ingredient ↔ volatile compound links across **65** unique compounds.
- **6** evidence-based goal protocols.
- Demo pantry of **14** items, three assigned meals, and a computed **3,230 kcal**
  Lean Bulk target for the 74 kg / 178 cm / 26 y active demo profile.

### Composite recipe score

```
0.30 × core coverage
+ 0.20 × pantry utilisation
+ 0.20 × flavour coherence
+ 0.30 × gap fit
```

The score is then personalised by goal (protein density, calorie fit, fibre fit).
Scoring is implemented once in `lib/gastronomy.ts` and reused by the dashboard,
recipes, planner and APIs.

### Molecular coherence

`lib/flavor.ts` normalises aliases (`Haldi Powder → turmeric`, `Jeera → cumin`),
resolves FlavorDB entities, and scores pairwise coherence with Jaccard overlap
plus documented culinary synergy bridges. It is deterministic and bounded.

### Metabolic engine

`lib/goals.ts` ports Mifflin-St Jeor exactly:

```
male:   BMR = 10w + 6.25h − 5a + 5
female: BMR = 10w + 6.25h − 5a − 161
TDEE = BMR × activity multiplier
```

Goal protocols then adjust energy and macros. Protein is anchored per kilogram;
fat or carbohydrate absorbs the remaining energy. Recomposition is isocaloric;
Athletic Performance is exactly 55% carbohydrate energy.

### One-Ingredient Unlock

`lib/gastronomy.ts` only recommends an ingredient when it is the **single hard
missing item** for one or more recipes and has a positive molecular pairing.
Results are ranked by dishes unlocked, then pairwise affinity.

---

## Routes

| Route | Surface |
| --- | --- |
| `/` | Cinematic landing experience |
| `/login` | Sign in / register / instant demo |
| `/app` | Dashboard: pantry signals, ranked dishes, unlock, day totals |
| `/app/pantry` | Inventory CRUD, vision-ingest simulation, aroma overlap |
| `/app/recipes` | Scored recipe grid, filters, detail modal, unlock hero |
| `/app/nutrition` | Live biometrics form, BMR/TDEE, macro ledger, goal protocols |
| `/app/planner` | Day view, meal assignment, macro balance, totals |

### API

```
POST /api/auth/login | /register | /demo | /logout
GET  /api/auth/me
GET/POST /api/pantry          PATCH/DELETE /api/pantry/[id]
GET  /api/recipes             GET /api/recipes/[id]
GET/POST /api/nutrition/targets
POST /api/nutrition/analyze
GET/POST /api/planner         DELETE /api/planner/[id]
```

All non-auth routes require the session cookie and scope every query to the
signed-in user.

---

## Project Layout

```text
app/                     Next.js routes, layouts and API handlers
components/
  app/                   Dashboard, pantry, recipes, nutrition, planner UI
  scenes/                Three.js / canvas landing scenes
  ui/                    Shared primitives
lib/
  gastronomy.ts          Composite scoring, personalisation, unlock engine
  flavor.ts              Normalisation, FlavorDB entities, coherence
  goals.ts               Mifflin-St Jeor, TDEE, six protocols
  nutrition.ts           Unit conversion and macro analysis
  data-access.ts         User-scoped server queries
  data/                  recipes.json, flavordb.json, nutrition.json
prisma/
  schema.prisma          User, Profile, PantryItem, Recipe, Ingredient,
                         FlavorCompound, IngredientCompound, Goal, MealPlanEntry
  seed.ts                Fully deterministic seed
scripts/
  verify-engines.ts      Math and engine assertions
  verify-visual.py       Multi-viewport Playwright verification
backend/ frontend/       Archived FastAPI + Vite implementation (reference only)
```

---

## Verification

```bash
# 15 deterministic engine assertions
npm run verify:engines

# Type checking / production build
npx tsc --noEmit
npm run build

# Desktop, tablet and mobile screenshots + runtime checks
npm run verify:visual
```

`verify:visual` logs in with the demo account, visits every workspace route,
opens the recipe detail and planner assignment dialogs, checks for console/page
errors, and asserts there is no horizontal overflow at 1440×900, 834×1112 or
390×844. Screenshots and `report.json` land in `screenshots/`.

The script auto-detects a Playwright Chromium build under
`~/.cache/ms-playwright`; set `CHROMIUM_PATH` to override.

---

## Design System

Deep-black `#080808`, saffron `#FF8A32`, gold `#E8B56A`, cream `#F6EFE4`.
Glass pills, hairline gold borders, Cormorant Garamond display type, Manrope UI
type, custom scrollbar, film grain, preloader and magnetic buttons.

Motion respects `prefers-reduced-motion`: the hero video freezes on a frame,
particles render statically, and scroll reveals are disabled.

The archived `backend/` and `frontend/` directories are preserved for audit and
comparison; the active application is the Next.js project at the repository root.
