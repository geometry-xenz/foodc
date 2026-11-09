import { initHeroThreeScene } from '../three/heroScene.js';
import { initFlavorGraph } from '../three/flavorGraph.js';
import { initScrollVideo } from '../video/scrollVideo.js';
import { openAuthModal } from './authModal.js';

export function renderLandingView(container, onNavigateToApp) {
  container.innerHTML = `
    <!-- Top Navigation Header -->
    <header class="navbar-wrapper">
      <nav class="navbar glass-pill">
        <a href="#" class="brand-group">
          <div class="brand-symbol">D</div>
          <span class="brand-name">DRISHYAM</span>
        </a>

        <div class="nav-links">
          <a href="#ingredient-intelligence" class="nav-link">Discover</a>
          <a href="#ingredient-intelligence" class="nav-link">How it works</a>
          <a href="#flavour-science" class="nav-link">Flavour science</a>
          <a href="#nutrition-intelligence" class="nav-link">Nutrition</a>
          <a href="#personalized-cooking" class="nav-link">Goals</a>
        </div>

        <div class="nav-actions">
          <button id="nav-signin-btn" class="btn-ghost">Sign In</button>
          <button id="nav-launch-btn" class="btn-primary">Launch DRISHYAM</button>
          <button id="nav-mobile-menu-btn" class="btn-mobile-toggle" aria-label="Toggle menu">☰</button>
        </div>
      </nav>
    </header>

    <!-- Mobile Drawer -->
    <div id="mobile-menu-drawer" class="mobile-drawer">
      <a href="#ingredient-intelligence" class="mobile-drawer-link">Discover</a>
      <a href="#ingredient-intelligence" class="mobile-drawer-link">How it works</a>
      <a href="#flavour-science" class="mobile-drawer-link">Flavour science</a>
      <a href="#nutrition-intelligence" class="mobile-drawer-link">Nutrition</a>
      <a href="#personalized-cooking" class="mobile-drawer-link">Goals</a>
      <button id="mobile-launch-btn" class="btn-primary" style="margin-top: 8px; width: 100%;">Launch DRISHYAM ➔</button>
    </div>

    <!-- Scroll-Controlled Cinematic Hero -->
    <div class="hero-scroll-container" id="hero-section">
      <div class="hero-sticky-frame">
        <!-- Scroll Scrubbed Cinematic Video -->
        <video id="hero-cinematic-video" class="hero-video-bg" playsinline muted preload="auto">
          <source src="/videos/WhatsApp%20Video%202026-11-10%20at%2000.01.23.mp4" type="video/mp4" />
          <source src="/videos/WhatsApp Video 2026-11-10 at 00.01.23.mp4" type="video/mp4" />
        </video>

        <!-- Three.js Ambient Particle & Amber Light Overlay -->
        <canvas id="hero-three-canvas" class="hero-three-canvas"></canvas>

        <!-- Vignette & Lighting Gradients -->
        <div class="hero-vignette"></div>

        <!-- Floating HUD Vision Markers in Hero -->
        <div class="hero-vision-hud">
          <div class="hud-box" style="top: 28%; left: 16%; width: 140px; height: 110px;">
            <div class="hud-tag">TURMERIC (94%)</div>
          </div>
          <div class="hud-box" style="top: 36%; right: 18%; width: 160px; height: 120px; animation-delay: -2s;">
            <div class="hud-tag">CUMIN SEEDS (92%)</div>
          </div>
          <div class="hud-box" style="bottom: 24%; left: 32%; width: 130px; height: 100px; animation-delay: -4s;">
            <div class="hud-tag">CLOVES (89%)</div>
          </div>
        </div>

        <!-- Hero Content Overlay -->
        <div class="hero-content">
          <div class="hero-eyebrow">
            <span class="status-dot"></span>
            THE INTELLIGENT KITCHEN
          </div>

          <h1 class="hero-title">
            Your ingredients.<br />
            Your nutrition.<br />
            <span class="gradient-text-amber">Your next great meal.</span>
          </h1>

          <p class="hero-desc">
            Discover what you can cook, understand the science of flavour and make every meal work towards your goals. Powered by computational gastronomy and Foodoscope.
          </p>

          <div class="hero-cta-group">
            <button id="hero-start-btn" class="btn-primary">
              Start Exploring ➔
            </button>
            <a href="#ingredient-intelligence" class="btn-secondary">
              Discover How It Works
            </a>
          </div>

          <div style="font-family: var(--font-mono); font-size: 0.74rem; color: var(--text-muted); letter-spacing: 0.1em; text-transform: uppercase;">
            Powered by Foodoscope RecipeDB & FlavorDB • Molecular Gastronomy
          </div>
        </div>

        <div class="hero-scroll-indicator">
          <div class="scroll-mouse-icon">
            <div class="scroll-wheel"></div>
          </div>
          <span>SCROLL TO DISCOVER</span>
        </div>
      </div>
    </div>

    <!-- Section 1: Ingredient Intelligence -->
    <section class="drishyam-section" id="ingredient-intelligence">
      <div class="section-header">
        <span class="section-eyebrow">INTELLIGENT RECOGNITION & CATALOG</span>
        <h2 class="section-title">Every ingredient has a story.</h2>
        <p class="section-desc">
          From ancient Indian whole spices to kitchen staples, DRISHYAM analyzes botanical profiles, flavor volatility and nutritional composition in real time.
        </p>
      </div>

      <!-- Scene 1 Botanical Spectrum Telemetry Card -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 36px; align-items: center; margin-bottom: 54px;">
        <div class="glass-panel" style="padding: 28px; border-radius: var(--radius-xl); box-shadow: var(--shadow-elevated); background: linear-gradient(135deg, rgba(24,24,24,0.9), rgba(16,16,16,0.95)); border: 1px solid var(--border-subtle);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <span class="badge badge-amber">Botanical Spectrum • Scientific Profiling</span>
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-primary);">AI SPECTRUM</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-bottom: 20px;">
            <div style="background: rgba(255,255,255,0.03); border-radius: var(--radius-md); padding: 14px; border: 1px solid rgba(255,255,255,0.06);">
              <div style="font-size: 0.72rem; color: var(--text-tertiary); text-transform: uppercase;">Curcuma longa</div>
              <div style="font-size: 1.1rem; font-weight: 700; color: var(--accent-primary); margin: 4px 0;">Turmeric</div>
              <div style="font-size: 0.78rem; color: var(--text-secondary);">Curcumin, Turmerone, Zingiberene</div>
            </div>
            <div style="background: rgba(255,255,255,0.03); border-radius: var(--radius-md); padding: 14px; border: 1px solid rgba(255,255,255,0.06);">
              <div style="font-size: 0.72rem; color: var(--text-tertiary); text-transform: uppercase;">Cuminum cyminum</div>
              <div style="font-size: 1.1rem; font-weight: 700; color: var(--accent-secondary); margin: 4px 0;">Cumin Seeds</div>
              <div style="font-size: 0.78rem; color: var(--text-secondary);">Cuminaldehyde, Terpenes, Cymene</div>
            </div>
            <div style="background: rgba(255,255,255,0.03); border-radius: var(--radius-md); padding: 14px; border: 1px solid rgba(255,255,255,0.06);">
              <div style="font-size: 0.72rem; color: var(--text-tertiary); text-transform: uppercase;">Syzygium aromaticum</div>
              <div style="font-size: 1.1rem; font-weight: 700; color: #E8B56A; margin: 4px 0;">Whole Cloves</div>
              <div style="font-size: 0.78rem; color: var(--text-secondary);">Eugenol 85%, Caryophyllene</div>
            </div>
            <div style="background: rgba(255,255,255,0.03); border-radius: var(--radius-md); padding: 14px; border: 1px solid rgba(255,255,255,0.06);">
              <div style="font-size: 0.72rem; color: var(--text-tertiary); text-transform: uppercase;">Elettaria cardamomum</div>
              <div style="font-size: 1.1rem; font-weight: 700; color: #4ADE80; margin: 4px 0;">Green Cardamom</div>
              <div style="font-size: 0.78rem; color: var(--text-secondary);">1,8-Cineole, Terpinyl acetate</div>
            </div>
          </div>
          <div style="padding: 16px; background: rgba(255,138,50,0.08); border-radius: var(--radius-md); border-left: 3px solid var(--accent-primary);">
            <div style="font-size: 0.82rem; color: var(--text-primary); font-weight: 600;">Molecular Pairing Coherence</div>
            <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 2px;">98.4% shared aromatic volatile affinity mapped across Foodoscope FlavorDB.</div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 18px;">
          <div class="glass-card" style="padding: 20px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
              <span style="font-size: 1.4rem;">✨</span>
              <h4 style="font-size: 1.05rem; font-weight: 700;">Powders & Whole Aromatics</h4>
            </div>
            <p style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.6;">
              Accurately tracks turmeric, red chilli, coriander powder, black pepper, cumin seeds, cloves, cardamom, and cinnamon stick profiles with zero ambiguity.
            </p>
          </div>

          <div class="glass-card" style="padding: 20px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
              <span style="font-size: 1.4rem;">🧅</span>
              <h4 style="font-size: 1.05rem; font-weight: 700;">Counter Staples & Aromatics</h4>
            </div>
            <p style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.6;">
              Detects onions, tomatoes, garlic bulbs, fresh ginger root, green chillies, lemons, curry leaves and coconut in seconds.
            </p>
          </div>

          <div class="glass-card" style="padding: 20px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
              <span style="font-size: 1.4rem;">🫙</span>
              <h4 style="font-size: 1.05rem; font-weight: 700;">Pantry Auto-Accumulation</h4>
            </div>
            <p style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.6;">
              Add items manually or organize your digital kitchen with live quantity tracking, unit conversions, and expiry warnings.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: How It Works -->
    <section class="drishyam-section" id="how-it-works">
      <div class="section-header">
        <span class="section-eyebrow">THE ARCHITECTURE</span>
        <h2 class="section-title">From your kitchen counter to your dining table.</h2>
        <p class="section-desc">
          Four interconnected intelligence layers working together in milliseconds to turn raw spices into culinary masterpieces.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 36px; align-items: center;">
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <div class="glass-card" style="padding: 22px; border-left: 3px solid var(--accent-primary);">
            <div style="font-size: 0.8rem; font-family: var(--font-mono); color: var(--accent-primary); margin-bottom: 4px;">LAYER 01</div>
            <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 6px;">Zero-Cost Vision & Detection</h4>
            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
              High-accuracy ingredient classification optimized for real kitchen lighting and textures.
            </p>
          </div>

          <div class="glass-card" style="padding: 22px; border-left: 3px solid var(--accent-secondary);">
            <div style="font-size: 0.8rem; font-family: var(--font-mono); color: var(--accent-secondary); margin-bottom: 4px;">LAYER 02</div>
            <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 6px;">Temporal Accumulator & Digital Pantry</h4>
            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
              Ingredients are confirmed with human-in-the-loop control, building an inventory with zero duplicate entries.
            </p>
          </div>

          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
            Your pantry synchronizes with your profile, dietary lifestyle (Vegetarian, Vegan, Non-Vegetarian) and specific allergen restrictions.
          </p>

          <div style="display: flex; gap: 12px; margin-top: 6px;">
            <button id="pantry-launch-btn" class="btn-primary" style="padding: 12px 24px;">Manage Your Pantry ➔</button>
          </div>
        </div>

        <!-- Scene 2 Real-Time Pantry Detection Telemetry Card -->
        <div class="glass-panel" style="padding: 28px; border-radius: var(--radius-xl); box-shadow: var(--shadow-elevated); background: linear-gradient(135deg, rgba(20,20,20,0.95), rgba(10,10,10,0.98)); border: 1px solid var(--border-subtle); position: relative;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h4 style="font-size: 1.15rem; font-weight: 700;">Real-Time Pantry Detection</h4>
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-primary); display: flex; align-items: center; gap: 6px;">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #4ADE80; box-shadow: 0 0 8px #4ADE80;"></span>
              AI ENGINE READY
            </div>
          </div>
          <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 20px;">Instant edge classification of culinary staples.</p>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,138,50,0.3); border-radius: var(--radius-md);">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="color: var(--accent-primary); font-size: 1.1rem;">🧂</span>
                <div>
                  <div style="font-size: 0.92rem; font-weight: 600;">Turmeric Powder</div>
                  <div style="font-size: 0.72rem; color: var(--text-tertiary);">Curcuminoid spice • 250g</div>
                </div>
              </div>
              <span class="badge badge-green">94% Confidence</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(232,181,106,0.3); border-radius: var(--radius-md);">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="color: var(--accent-secondary); font-size: 1.1rem;">🌱</span>
                <div>
                  <div style="font-size: 0.92rem; font-weight: 600;">Whole Cumin Seeds</div>
                  <div style="font-size: 0.72rem; color: var(--text-tertiary);">Terpene aromatic • 200g</div>
                </div>
              </div>
              <span class="badge badge-green">92% Confidence</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: var(--radius-md);">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 1.1rem;">🧅</span>
                <div>
                  <div style="font-size: 0.92rem; font-weight: 600;">Red Onion & Fresh Garlic</div>
                  <div style="font-size: 0.72rem; color: var(--text-tertiary);">Allium aromatics • Staple base</div>
                </div>
              </div>
              <span class="badge badge-amber">89% Confidence</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Molecular Flavour Science -->
    <section class="drishyam-section" id="flavour-science">
      <div class="section-header">
        <span class="section-eyebrow">MOLECULAR COMPUTATIONAL GASTRONOMY</span>
        <h2 class="section-title">Cooking meets chemistry.</h2>
        <p class="section-desc">
          Foodoscope FlavorDB maps the chemical volatile compounds of food. Ingredients that share aroma molecules taste harmonious together.
        </p>
      </div>

      <!-- Interactive FlavorDB Graph Visualization -->
      <div class="flavor-network-container">
        <canvas id="flavor-network-canvas" class="flavor-network-canvas"></canvas>
        <div id="flavor-info-overlay" class="flavor-info-overlay"></div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 32px;">
        <div class="glass-card" style="padding: 22px;">
          <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--accent-primary); margin-bottom: 8px;">
            Curcumin + Piperine Synergy
          </h4>
          <p style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.6;">
            Turmeric's anti-inflammatory curcumin has low natural bioavailability. Piperine from black pepper inhibits glucuronidation, increasing curcumin absorption by over 2000%.
          </p>
        </div>

        <div class="glass-card" style="padding: 22px;">
          <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--accent-secondary); margin-bottom: 8px;">
            Eugenol Whole-Spice Quartet
          </h4>
          <p style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.6;">
            Cloves, cinnamon, cardamom, and bay leaf share volatile eugenol and cineole terpenes. When bloomed in hot oil or ghee, they release an intensely balanced aromatic bouquet.
          </p>
        </div>
      </div>
    </section>

    <!-- Section 4 & 5: Recipe Discovery & Nutrition Intelligence -->
    <section class="drishyam-section" id="nutrition-intelligence">
      <div class="section-header">
        <span class="section-eyebrow">NUTRITIONAL GASTRONOMY DASHBOARD</span>
        <h2 class="section-title">Know what goes onto your plate.</h2>
        <p class="section-desc">
          Complete nutritional breakdown of calories, protein, carbohydrates, fats, and dietary fibre. Understand exactly what each ingredient contributes to your health.
        </p>
      </div>

      <!-- Scene 4 Live Dish & Interactive Dashboard -->
      <div class="nutrition-preview-grid">
        <div class="dish-visual-card glass-panel" style="padding: 28px; border-radius: var(--radius-xl); display: flex; flex-direction: column; justify-content: space-between; background: linear-gradient(135deg, rgba(22,22,22,0.95), rgba(12,12,12,0.98)); border: 1px solid var(--border-subtle);">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
              <span class="badge badge-green">94% Pantry Match</span>
              <span class="badge badge-amber">Gastronomy Score: 88/100</span>
            </div>
            <div style="font-size: 2.2rem; margin-bottom: 10px;">🍲</div>
            <h3 style="font-size: 1.4rem; font-weight: 700; margin-bottom: 8px;">Paneer Tikka Masala Skillet</h3>
            <p style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.6;">
              Spiced cottage cheese seared with ginger, garlic, and cumin. Synergizes rich lactic diacetyl umami with eugenol and piperine aromatics.
            </p>
          </div>
          <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between;">
            <div>
              <div style="font-size: 0.72rem; color: var(--text-tertiary);">TOTAL TIME</div>
              <div style="font-size: 0.95rem; font-weight: 600;">25 mins</div>
            </div>
            <div>
              <div style="font-size: 0.72rem; color: var(--text-tertiary);">ENERGY</div>
              <div style="font-size: 0.95rem; font-weight: 600; color: var(--accent-primary);">365 kcal</div>
            </div>
            <div>
              <div style="font-size: 0.72rem; color: var(--text-tertiary);">PROTEIN</div>
              <div style="font-size: 0.95rem; font-weight: 600; color: #4ADE80;">17.5g</div>
            </div>
          </div>
        </div>

        <div class="nutrition-dashboard-card glass-panel">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 16px;">
            <div>
              <span class="badge badge-amber" style="font-size: 0.7rem; margin-bottom: 4px;">Verified RecipeDB Dish</span>
              <h3 style="font-size: 1.35rem; font-weight: 700;">Paneer Tikka Masala Skillet</h3>
            </div>
            <div style="text-align: right;">
              <span style="font-family: var(--font-mono); font-size: 1.7rem; font-weight: 800; color: var(--accent-primary);">365</span>
              <span style="font-size: 0.78rem; color: var(--text-muted); display: block;">kcal / serving</span>
            </div>
          </div>

          <!-- Animated Macro Rings -->
          <div class="macro-ring-container">
            <div class="macro-box">
              <span class="macro-label">Protein</span>
              <div class="macro-val" style="color: #2ED573;">17.5g</div>
              <span style="font-size: 0.68rem; color: var(--text-muted);">Paneer • High</span>
            </div>
            <div class="macro-box">
              <span class="macro-label">Carbs</span>
              <div class="macro-val" style="color: #FFB800;">14.8g</div>
              <span style="font-size: 0.68rem; color: var(--text-muted);">Tomato • Onion</span>
            </div>
            <div class="macro-box">
              <span class="macro-label">Total Fat</span>
              <div class="macro-val" style="color: #FF4757;">26.2g</div>
              <span style="font-size: 0.68rem; color: var(--text-muted);">Dairy • Oil</span>
            </div>
            <div class="macro-box">
              <span class="macro-label">Fibre</span>
              <div class="macro-val" style="color: #00D2D3;">3.9g</div>
              <span style="font-size: 0.68rem; color: var(--text-muted);">Spices • Veg</span>
            </div>
          </div>

          <!-- Ingredient Contribution Breakdown -->
          <div>
            <h4 style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 10px;">
              Ingredient Contribution Analysis
            </h4>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; justify-content: space-between; font-size: 0.82rem; padding: 8px 12px; background: rgba(255,255,255,0.03); border-radius: var(--radius-sm);">
                <span>🧀 <strong>Fresh Paneer (100g)</strong></span>
                <span style="color: #2ED573; font-family: var(--font-mono);">18.3g Protein • 296 kcal</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.82rem; padding: 8px 12px; background: rgba(255,255,255,0.03); border-radius: var(--radius-sm);">
                <span>🍅 <strong>Ripe Tomatoes (150g)</strong></span>
                <span style="color: #FFB800; font-family: var(--font-mono);">5.8g Carbs • 27 kcal</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.82rem; padding: 8px 12px; background: rgba(255,255,255,0.03); border-radius: var(--radius-sm);">
                <span>🧄 <strong>Garlic & Ginger (20g)</strong></span>
                <span style="color: var(--accent-secondary); font-family: var(--font-mono);">Allicin + Gingerol Volatiles</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 6: Personalized Cooking -->
    <section class="drishyam-section" id="personalized-cooking" style="padding-top: 30px;">
      <div class="section-header">
        <span class="section-eyebrow">PERSONALIZED NUTRITION GOALS</span>
        <h2 class="section-title">Food that fits your goals.</h2>
        <p class="section-desc">
          Whether you are cutting fat, gaining lean mass, or optimizing athletic recovery, DRISHYAM personalizes your recipe ranking based on validated metabolic targets.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 18px;">
        <div class="glass-card" style="padding: 22px;">
          <div style="font-size: 1.7rem; margin-bottom: 10px;">🔥</div>
          <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 6px;">Fat Loss / Cutting</h4>
          <p style="font-size: 0.84rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 12px;">
            Controlled 500 kcal deficit, elevated protein density (2.2g/kg), and high fibre to maintain satiety.
          </p>
          <span class="badge badge-amber">Protein Dense • Deficit</span>
        </div>

        <div class="glass-card" style="padding: 22px;">
          <div style="font-size: 1.7rem; margin-bottom: 10px;">💪</div>
          <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 6px;">Lean Bulk</h4>
          <p style="font-size: 0.84rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 12px;">
            Targeted 250 kcal surplus providing amino acids for muscle synthesis with minimal adipose gain.
          </p>
          <span class="badge badge-gold">Clean Surplus • 2.0g/kg</span>
        </div>

        <div class="glass-card" style="padding: 22px;">
          <div style="font-size: 1.7rem; margin-bottom: 10px;">⚖️</div>
          <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 6px;">Body Recomposition</h4>
          <p style="font-size: 0.84rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 12px;">
            Near-isocaloric intake with elevated protein (2.3g/kg) to stimulate muscle repair during fat oxidation.
          </p>
          <span class="badge badge-green">Isocaloric • Recomp</span>
        </div>

        <div class="glass-card" style="padding: 22px;">
          <div style="font-size: 1.7rem; margin-bottom: 10px;">🥗</div>
          <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 6px;">General Health</h4>
          <p style="font-size: 0.84rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 12px;">
            Focusing on gut microbiome prebiotic diversity, polyphenol-rich spices, and balanced energy balance.
          </p>
          <span class="badge badge-gold">Longevity • Prebiotics</span>
        </div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section class="final-cta-section">
      <div style="max-width: 760px; margin: 0 auto; text-align: center;">
        <span class="section-eyebrow">YOUR KITCHEN, SCIENTIFICALLY DECODED</span>
        <h2 style="font-family: var(--font-serif); font-size: clamp(2.2rem, 4.5vw, 3.6rem); font-weight: 700; margin: 14px 0 18px 0;">
          Make more of what's already in your kitchen.
        </h2>
        <p style="font-size: clamp(1rem, 2vw, 1.15rem); color: var(--text-secondary); line-height: 1.7; margin-bottom: 28px;">
          Your pantry is full of possibilities. Let DRISHYAM discover them.
        </p>

        <button id="cta-launch-btn" class="btn-primary" style="padding: 15px 34px; font-size: 1.05rem;">
          Launch DRISHYAM ➔
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div style="display: flex; align-items: center; gap: 10px;">
        <div class="brand-symbol" style="width: 26px; height: 26px; font-size: 0.85rem;">D</div>
        <span style="font-family: var(--font-serif); font-weight: 700; letter-spacing: 0.15em; color: #FFF;">DRISHYAM</span>
        <span style="font-size: 0.78rem; color: var(--text-muted); margin-left: 10px;">© 2026 DRISHYAM. All rights reserved.</span>
      </div>

      <div style="display: flex; gap: 18px; font-size: 0.85rem; flex-wrap: wrap; justify-content: center;">
        <a href="#hero-section" style="color: var(--text-secondary);">Product</a>
        <a href="#ingredient-intelligence" style="color: var(--text-secondary);">Features</a>
        <a href="#flavour-science" style="color: var(--text-secondary);">FlavorDB</a>
        <a href="#nutrition-intelligence" style="color: var(--text-secondary);">Nutrition</a>
        <a href="https://github.com" target="_blank" style="color: var(--text-secondary);">GitHub</a>
      </div>
    </footer>
  `;

  // Initialize Three.js Hero Canvas
  const threeCanvas = container.querySelector('#hero-three-canvas');
  const threeCleanup = initHeroThreeScene(threeCanvas);

  // Initialize Scroll Video Controller
  const videoElem = container.querySelector('#hero-cinematic-video');
  const scrollContainer = container.querySelector('#hero-section');
  const scrollCleanup = initScrollVideo(videoElem, scrollContainer);

  // Initialize FlavorDB Molecular Network Canvas
  const flavorCanvas = container.querySelector('#flavor-network-canvas');
  const flavorInfo = container.querySelector('#flavor-info-overlay');
  const flavorCleanup = initFlavorGraph(flavorCanvas, flavorInfo);

  // Mobile Menu Drawer Handler
  const mobileToggle = container.querySelector('#nav-mobile-menu-btn');
  const mobileDrawer = container.querySelector('#mobile-menu-drawer');
  if (mobileToggle && mobileDrawer) {
    mobileToggle.onclick = () => {
      mobileDrawer.classList.toggle('open');
      mobileToggle.innerText = mobileDrawer.classList.contains('open') ? '✕' : '☰';
    };
    mobileDrawer.querySelectorAll('.mobile-drawer-link').forEach(link => {
      link.onclick = () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.innerText = '☰';
      };
    });
    container.querySelector('#mobile-launch-btn').onclick = () => {
      mobileDrawer.classList.remove('open');
      onNavigateToApp();
    };
  }

  // Navigation and Action Handlers
  container.querySelector('#nav-signin-btn').onclick = () => {
    openAuthModal('login', (user) => {
      onNavigateToApp();
    });
  };

  container.querySelector('#nav-launch-btn').onclick = () => onNavigateToApp();
  container.querySelector('#hero-start-btn').onclick = () => onNavigateToApp();
  container.querySelector('#pantry-launch-btn').onclick = () => onNavigateToApp();
  container.querySelector('#cta-launch-btn').onclick = () => onNavigateToApp();

  return () => {
    if (threeCleanup?.destroy) threeCleanup.destroy();
    if (scrollCleanup?.destroy) scrollCleanup.destroy();
    if (flavorCleanup?.destroy) flavorCleanup.destroy();
  };
}
