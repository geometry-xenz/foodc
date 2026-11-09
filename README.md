# DRISHYAM — AI-Powered Computational Gastronomy & Personalized Nutrition Platform

> **"See your ingredients. Discover your possibilities."**  
> *"Your kitchen, understood. Your nutrition, decoded."*

---

## 1. Project Overview

**DRISHYAM** is an AI-powered computational gastronomy and personalized nutrition intelligence platform. It bridges molecular culinary science, chemical volatile aroma pairing, real-world pantry inventory management, and metabolic health targets into a unified system.

Powered by **Foodoscope RecipeDB** and **FlavorDB**, DRISHYAM enables users to:
1. Understand what they can actually cook with the ingredients on their kitchen counter.
2. Experience molecular aroma synergies (e.g. why turmeric and black pepper, or cumin and coriander, pair harmoniously).
3. Personalize recipe recommendations based on evidence-based fitness goals (Fat Loss, Lean Bulk, Traditional Bulk, Dirty Bulk, Maintenance, Recomposition, General Health, Athletic Performance).
4. Strictly filter allergens (Peanuts, Tree nuts, Dairy, Eggs, Soy, Gluten, Shellfish) as hard gates.
5. Track daily macronutrient distributions (protein, carbs, fat, fibre) and analyze ingredient-level nutritional contributions.
6. Discover the **"Unlock Suggestion"** — the single missing ingredient that unlocks the most recipes with the highest molecular flavor affinity.

---

## 2. Cinematic Video & Keyframe Assets

- **Cinematic Homepage Video:** `foodoscope.mp4` (`WhatsApp Video 2026-11-10 at 00.01.23.mp4`, 1280x720, 24fps, H.264). Synchronized with user scroll progress via **GSAP ScrollTrigger** and layered with **Three.js** ambient molecular particle clouds.
- **Four Cinematic Keyframes:** Located in `public/images/keyframes/`:
  - `scene1_ingredient_universe.png`: Section 1 — "Every ingredient has a story" (Ingredient Intelligence)
  - `scene2_ai_recognition.png`: Section 2 — "Everything you have. One intelligent pantry" (Intelligent Pantry)
  - `scene3_molecular_science.png`: Section 3 — "Cooking meets chemistry" (Molecular Flavour Science & FlavorDB graph)
  - `scene4_recipe_nutrition.png`: Section 4 & 5 — "Discover what you can actually cook" & "Know what goes onto your plate" (Nutrition Intelligence)

---

## 3. Computational Gastronomy Formula

DRISHYAM ranks recipes using the validated computational gastronomy formula:

$$\text{Gastronomy Score} = 0.30 \times \text{Core Coverage} + 0.20 \times \text{Counter Utilisation} + 0.20 \times \text{Flavour Coherence} + 0.30 \times \text{Gap Fit}$$

- **Core Coverage (30%):** Ensures essential dish-defining ingredients (e.g. lentils in Dal Tadka, paneer in Tikka) are present so complex dishes aren't unfairly penalized.
- **Counter Utilisation (20%):** Rewards recipes that consume what is sitting on the user's counter, actively minimizing kitchen food waste.
- **Flavour Coherence (20%):** Computes shared volatile aroma compounds between pantry items using FlavorDB.
- **Gap Fit (30%):** Measures ease and accessibility of missing items (excluding basic staples like salt, water, and oil).
- **Nutritional Goal Multiplier:** Amplifies recipes matching the user's active fitness target (e.g., protein density bonus for fat loss and lean bulk).

---

## 4. Architecture & Technology Stack

```text
foodc/
├── backend/
│   └── app/
│       ├── main.py              # FastAPI application & SPA mounting
│       ├── config.py            # Environment configuration
│       ├── database.py          # SQLAlchemy engine & sessionmaker
│       ├── core/security.py     # Password hashing & JWT auth
│       ├── models/user.py       # SQLAlchemy ORM models
│       ├── routes/              # Auth, Profile, Pantry, Recipes, Nutrition, etc.
│       ├── services/            # Recipedb, Flavordb, Gastronomy, Nutrition, Goal calculator
│       └── data/                # Resilient offline datasets (20+ authentic recipes, FlavorDB profiles)
├── frontend/
│   ├── src/
│   │   ├── views/               # LandingView, AppView, AuthModal, OnboardingModal
│   │   ├── three/               # Hero particle scene & FlavorDB 2D/3D canvas network
│   │   ├── video/               # GSAP ScrollTrigger video scrubber
│   │   ├── services/            # API client & local stores
│   │   ├── styles/              # Design system variables, landing, and application CSS
│   │   ├── router.js            # Client-side router (/ and /app)
│   │   └── main.js              # Application entrypoint
│   └── dist/                    # Production Vite build
├── public/                      # Static video and keyframe images
├── tests/                       # Automated backend tests (pytest)
└── requirements.txt
```

---

## 5. Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### Installation
```bash
# 1. Clone repository and navigate to directory
cd /home/suman/personal/foodc

# 2. Set up Python virtual environment
python3 -m venv venv
./venv/bin/pip install -r requirements.txt

# 3. Build frontend assets
cd frontend
npm install
npm run build
cd ..
```

### Running the Application
```bash
# Start the unified DRISHYAM production server (port 8000)
./venv/bin/uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload
```

Once running, open your browser at:
- **Website & Experience:** `http://localhost:8000/`
- **Application Workspace:** `http://localhost:8000/app`
- **Interactive API Documentation:** `http://localhost:8000/docs`

### Instant Demo Sign-In
To explore the application without manual registration, click **"⚡ Instant Demo Sign In"** in the auth modal or sign in with:
- **Email:** `demo@drishyam.ai`
- **Password:** `drishyam2026`

---

## 6. Testing
To run the automated test suite:
```bash
PYTHONPATH=. ./venv/bin/pytest tests/
```
All tests verify authentication, profile and goal calculation, pantry CRUD, recipe ranking with hard allergy gates, FlavorDB substitutions, and nutritional calculations.
