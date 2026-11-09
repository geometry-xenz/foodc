// DRISHYAM Master Application Workspace (/app)
import { api } from '../services/api.js';
import { openOnboardingModal } from './onboardingModal.js';
import confetti from 'canvas-confetti';

export async function renderAppView(container, onNavigateToHome) {
  // Ensure user is authenticated or demo user is active
  let currentUser = await api.getMe();
  if (!currentUser) {
    const demoRes = await api.demoLogin();
    currentUser = demoRes?.user || { full_name: 'Chef Guest', email: 'guest@drishyam.ai' };
  }

  let activeTab = window.location.hash.replace('#', '') || 'dashboard';
  if (!['dashboard', 'pantry', 'recipes', 'nutrition', 'goals', 'planner', 'saved', 'shopping', 'profile'].includes(activeTab)) {
    activeTab = 'dashboard';
  }

  // App Master Shell
  container.innerHTML = `
    <div class="app-container">
      <!-- Desktop Sidebar -->
      <aside class="app-sidebar">
        <div>
          <div class="sidebar-brand">
            <div class="brand-symbol" style="width: 32px; height: 32px; font-size: 1.05rem;">D</div>
            <div>
              <div style="font-family: var(--font-serif); font-weight: 700; letter-spacing: 0.15em; font-size: 1.15rem; color: #FFF;">DRISHYAM</div>
              <div style="font-size: 0.7rem; color: var(--accent-secondary); font-family: var(--font-mono);">GASTRONOMY OS</div>
            </div>
          </div>

          <nav class="sidebar-nav">
            <div class="sidebar-item ${activeTab === 'dashboard' ? 'active' : ''}" data-tab="dashboard">
              <span style="font-size: 1.1rem;">📊</span> Dashboard
            </div>
            <div class="sidebar-item ${activeTab === 'pantry' ? 'active' : ''}" data-tab="pantry">
              <span style="font-size: 1.1rem;">🏺</span> My Pantry
            </div>
            <div class="sidebar-item ${activeTab === 'recipes' ? 'active' : ''}" data-tab="recipes">
              <span style="font-size: 1.1rem;">🍲</span> Discover Recipes
            </div>
            <div class="sidebar-item ${activeTab === 'nutrition' ? 'active' : ''}" data-tab="nutrition">
              <span style="font-size: 1.1rem;">📈</span> Nutrition Intelligence
            </div>
            <div class="sidebar-item ${activeTab === 'goals' ? 'active' : ''}" data-tab="goals">
              <span style="font-size: 1.1rem;">🎯</span> My Goals
            </div>
            <div class="sidebar-item ${activeTab === 'planner' ? 'active' : ''}" data-tab="planner">
              <span style="font-size: 1.1rem;">📅</span> Meal Planner
            </div>
            <div class="sidebar-item ${activeTab === 'saved' ? 'active' : ''}" data-tab="saved">
              <span style="font-size: 1.1rem;">⭐</span> Saved Recipes
            </div>
            <div class="sidebar-item ${activeTab === 'shopping' ? 'active' : ''}" data-tab="shopping">
              <span style="font-size: 1.1rem;">🛒</span> Shopping List
            </div>
            <div class="sidebar-item ${activeTab === 'profile' ? 'active' : ''}" data-tab="profile">
              <span style="font-size: 1.1rem;">⚙️</span> Profile & Preferences
            </div>
          </nav>
        </div>

        <div class="sidebar-footer">
          <div class="system-status-indicator">
            <span class="status-dot"></span>
            Foodoscope API & FlavorDB Active
          </div>
          <button id="sidebar-home-btn" class="btn-secondary" style="width: 100%; padding: 8px; font-size: 0.8rem;">
            ← Return to Homepage
          </button>
        </div>
      </aside>

      <!-- Main Workspace -->
      <main class="app-main">
        <header class="app-header">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="display: flex; flex-direction: column;">
              <span style="font-size: 0.78rem; color: var(--accent-secondary); font-family: var(--font-mono); text-transform: uppercase;">
                Welcome back
              </span>
              <h2 style="font-family: var(--font-serif); font-size: 1.35rem; font-weight: 700; color: #FFF;" id="header-user-name">
                ${currentUser.full_name || 'Chef'}
              </h2>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 12px;">
            <button id="header-onboarding-btn" class="btn-secondary" style="padding: 8px 16px; font-size: 0.82rem; border-color: rgba(232, 181, 106, 0.4); color: var(--accent-secondary);">
              🎯 Customize Goals
            </button>
            <button id="header-logout-btn" class="btn-secondary" style="padding: 8px 14px; font-size: 0.82rem;">
              Logout
            </button>
          </div>
        </header>

        <!-- Dynamic View Workspace -->
        <div class="app-view-content" id="workspace-content">
          <!-- Injected via loadTabContent -->
        </div>
      </main>

      <!-- Mobile Bottom Navigation -->
      <nav class="app-mobile-nav">
        <button class="mobile-nav-btn ${activeTab === 'dashboard' ? 'active' : ''}" data-tab="dashboard">
          <span style="font-size: 1.2rem;">📊</span>
          <span>Home</span>
        </button>
        <button class="mobile-nav-btn ${activeTab === 'pantry' ? 'active' : ''}" data-tab="pantry">
          <span style="font-size: 1.2rem;">🏺</span>
          <span>Pantry</span>
        </button>
        <button class="mobile-nav-btn ${activeTab === 'recipes' ? 'active' : ''}" data-tab="recipes">
          <span style="font-size: 1.2rem;">🍲</span>
          <span>Recipes</span>
        </button>
        <button class="mobile-nav-btn ${activeTab === 'nutrition' ? 'active' : ''}" data-tab="nutrition">
          <span style="font-size: 1.2rem;">📈</span>
          <span>Nutrition</span>
        </button>
        <button class="mobile-nav-btn ${activeTab === 'planner' ? 'active' : ''}" data-tab="planner">
          <span style="font-size: 1.2rem;">📅</span>
          <span>Plan</span>
        </button>
      </nav>
    </div>
  `;

  const workspace = container.querySelector('#workspace-content');

  // Navigation handlers
  container.querySelectorAll('[data-tab]').forEach(btn => {
    btn.onclick = () => {
      const tab = btn.getAttribute('data-tab');
      switchTab(tab);
    };
  });

  container.querySelector('#sidebar-home-btn').onclick = onNavigateToHome;
  container.querySelector('#header-logout-btn').onclick = () => {
    api.logout();
    onNavigateToHome();
  };
  container.querySelector('#header-onboarding-btn').onclick = () => {
    openOnboardingModal(() => {
      loadTabContent(activeTab);
    });
  };

  function switchTab(tab) {
    activeTab = tab;
    window.location.hash = tab;
    container.querySelectorAll('.sidebar-item').forEach(el => {
      el.classList.toggle('active', el.getAttribute('data-tab') === tab);
    });
    container.querySelectorAll('.mobile-nav-btn').forEach(el => {
      el.classList.toggle('active', el.getAttribute('data-tab') === tab);
    });
    loadTabContent(tab);
  }

  async function loadTabContent(tab) {
    workspace.innerHTML = `<div style="text-align: center; padding: 60px; color: var(--text-muted);">Loading ${tab}...</div>`;

    if (tab === 'dashboard') {
      await renderDashboardTab(workspace, switchTab);
    } else if (tab === 'pantry') {
      await renderPantryTab(workspace, switchTab);
    } else if (tab === 'recipes') {
      await renderRecipesTab(workspace);
    } else if (tab === 'nutrition') {
      await renderNutritionTab(workspace);
    } else if (tab === 'goals') {
      await renderGoalsTab(workspace);
    } else if (tab === 'planner') {
      await renderPlannerTab(workspace, switchTab);
    } else if (tab === 'saved') {
      await renderSavedTab(workspace);
    } else if (tab === 'shopping') {
      await renderShoppingTab(workspace);
    } else if (tab === 'profile') {
      await renderProfileTab(workspace);
    }
  }

  // Initial load
  loadTabContent(activeTab);
}

// -------------------------------------------------------------
// TAB 1: DASHBOARD
// -------------------------------------------------------------
async function renderDashboardTab(container, switchTab) {
  const [goals, summary, pantry, recs] = await Promise.all([
    api.getGoals(),
    api.getNutritionSummary(),
    api.getPantry(),
    api.recommend({ limit: 3 })
  ]);

  const targetCal = goals?.target_calories || 2400;
  const consumedCal = summary?.consumed?.calories || 0;
  const calPercent = Math.min(Math.round((consumedCal / targetCal) * 100), 100);

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <!-- Top Metric Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
        <!-- Calorie Ring Card -->
        <div class="glass-card" style="padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Daily Energy Target</span>
            <span class="badge badge-amber" style="font-size: 0.7rem; text-transform: uppercase;">${goals?.primary_goal?.replace('_', ' ') || 'Lean Bulk'}</span>
          </div>

          <div style="display: flex; align-items: baseline; gap: 8px; margin: 16px 0 8px 0;">
            <span style="font-family: var(--font-mono); font-size: 2.2rem; font-weight: 800; color: #FFF;">${consumedCal}</span>
            <span style="font-size: 0.9rem; color: var(--text-muted);">/ ${targetCal} kcal</span>
          </div>

          <!-- Progress Bar -->
          <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.06); border-radius: var(--radius-full); overflow: hidden;">
            <div style="width: ${calPercent}%; height: 100%; background: linear-gradient(90deg, #FF8A32, #E8B56A); border-radius: var(--radius-full);"></div>
          </div>
          <span style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 8px;">${targetCal - consumedCal} kcal remaining today</span>
        </div>

        <!-- Protein Card -->
        <div class="glass-card" style="padding: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Protein Target</span>
            <span style="font-size: 1.2rem;">🥩</span>
          </div>
          <div style="margin: 16px 0 8px 0;">
            <span style="font-family: var(--font-mono); font-size: 2.2rem; font-weight: 800; color: #2ED573;">${summary?.consumed?.protein_g || 0}g</span>
            <span style="font-size: 0.9rem; color: var(--text-muted);">/ ${goals?.target_protein_g || 150}g</span>
          </div>
          <span style="font-size: 0.78rem; color: var(--text-secondary);">Essential for muscle synthesis and metabolic preservation.</span>
        </div>

        <!-- Pantry Inventory Card -->
        <div class="glass-card" style="padding: 24px; cursor: pointer;" id="dash-pantry-card">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Pantry Items</span>
            <span style="font-size: 1.2rem;">🏺</span>
          </div>
          <div style="margin: 16px 0 8px 0;">
            <span style="font-family: var(--font-mono); font-size: 2.2rem; font-weight: 800; color: var(--accent-secondary);">${pantry.length}</span>
            <span style="font-size: 0.9rem; color: var(--text-muted);">ingredients available</span>
          </div>
          <span style="font-size: 0.78rem; color: var(--accent-primary); font-weight: 600;">Manage Pantry ➔</span>
        </div>
      </div>

      <!-- Recommended Recipes Grid -->
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <div>
            <h3 style="font-family: var(--font-serif); font-size: 1.4rem; font-weight: 700;">Top Recommended for Your Pantry</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">Ranked with Foodoscope FlavorDB molecular aroma pairing & your fitness goals</p>
          </div>
          <button class="btn-secondary" id="dash-all-recipes-btn" style="padding: 8px 16px; font-size: 0.82rem;">
            Explore All Dishes ➔
          </button>
        </div>

        <div class="recipes-grid">
          ${recs?.recipes?.slice(0, 3).map(r => renderRecipeCardHtml(r)).join('') || '<div style="color: var(--text-muted);">No matching recipes found yet.</div>'}
        </div>
      </div>
    </div>
  `;

  container.querySelector('#dash-pantry-card').onclick = () => switchTab('pantry');
  container.querySelector('#dash-all-recipes-btn').onclick = () => switchTab('recipes');

  attachRecipeCardEvents(container);
}

// -------------------------------------------------------------
// TAB 2: MY PANTRY (Complete Manual Pantry Management)
// -------------------------------------------------------------
async function renderPantryTab(container, switchTab) {
  let pantry = await api.getPantry();
  let filterCategory = 'All';
  let searchQuery = '';

  const CATEGORIES = ['All', 'Spices', 'Vegetables', 'Fruits', 'Grains', 'Legumes', 'Dairy', 'Meat/Seafood', 'Oils'];

  function updateList() {
    const listWrap = container.querySelector('#pantry-items-list');
    const filtered = pantry.filter(item => {
      const matchCat = filterCategory === 'All' || item.category === filterCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    listWrap.innerHTML = filtered.length === 0 ? `
      <div style="text-align: center; padding: 48px; color: var(--text-muted); grid-column: 1 / -1;">
        No ingredients found in this category. Add items above to build your kitchen inventory!
      </div>
    ` : filtered.map(item => `
      <div class="glass-card" style="padding: 16px; display: flex; justify-content: space-between; align-items: center; opacity: ${item.is_available ? 1 : 0.5};">
        <div style="display: flex; align-items: center; gap: 14px;">
          <button class="toggle-avail-btn" data-id="${item.id}" style="width: 24px; height: 24px; border-radius: 6px; border: 2px solid ${item.is_available ? '#2ED573' : 'var(--text-muted)'}; background: ${item.is_available ? '#2ED57333' : 'transparent'}; display: flex; align-items: center; justify-content: center; color: #2ED573; font-weight: 700; font-size: 0.8rem;">
            ${item.is_available ? '✓' : ''}
          </button>
          <div>
            <h4 style="font-size: 1.05rem; font-weight: 700; color: #FFF; text-transform: capitalize;">${item.name}</h4>
            <span style="font-size: 0.78rem; color: var(--text-muted);">${item.category} • ${item.quantity} ${item.unit}</span>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 8px;">
          <button class="pantry-del-btn" data-id="${item.id}" style="color: var(--text-muted); font-size: 1.2rem; padding: 4px 8px; border-radius: var(--radius-sm);" title="Delete ingredient">
            ✕
          </button>
        </div>
      </div>
    `).join('');

    // Attach row events
    listWrap.querySelectorAll('.toggle-avail-btn').forEach(btn => {
      btn.onclick = async () => {
        const id = parseInt(btn.getAttribute('data-id'));
        const item = pantry.find(i => i.id === id);
        if (item) {
          item.is_available = !item.is_available;
          await api.updatePantryItem(id, { is_available: item.is_available });
          updateList();
        }
      };
    });

    listWrap.querySelectorAll('.pantry-del-btn').forEach(btn => {
      btn.onclick = async () => {
        const id = parseInt(btn.getAttribute('data-id'));
        await api.deletePantryItem(id);
        pantry = pantry.filter(i => i.id !== id);
        updateList();
      };
    });
  }

  container.innerHTML = `
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
        <div>
          <h3 style="font-family: var(--font-serif); font-size: 1.6rem; font-weight: 700;">My Digital Kitchen Pantry</h3>
          <p style="font-size: 0.88rem; color: var(--text-secondary);">Manage every whole spice, powder, fresh aromatic, and staple sitting on your counter.</p>
        </div>

        <button id="pantry-find-recipes-btn" class="btn-primary" style="padding: 12px 24px;">
          🍲 Cook with Current Pantry ➔
        </button>
      </div>

      <!-- Add Ingredient Bar -->
      <div class="glass-panel" style="padding: 18px; margin-bottom: 24px; display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
        <input type="text" id="add-ing-name" placeholder="Add ingredient (e.g. Garam Masala, Cumin, Spinach)..." style="flex: 2; min-width: 200px; padding: 12px 16px; background: rgba(0,0,0,0.6); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;" />
        
        <select id="add-ing-category" style="flex: 1; min-width: 130px; padding: 12px; background: #141414; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;">
          ${CATEGORIES.filter(c => c !== 'All').map(c => `<option value="${c}">${c}</option>`).join('')}
        </select>

        <input type="number" id="add-ing-qty" value="100" style="width: 80px; padding: 12px; background: rgba(0,0,0,0.6); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;" />

        <select id="add-ing-unit" style="width: 80px; padding: 12px; background: #141414; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;">
          <option value="g">g</option>
          <option value="ml">ml</option>
          <option value="tbsp">tbsp</option>
          <option value="tsp">tsp</option>
          <option value="pcs">pcs</option>
        </select>

        <button id="add-ing-submit-btn" class="btn-primary" style="padding: 12px 20px;">
          + Add Item
        </button>
      </div>

      <!-- Filters & Search -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${CATEGORIES.map(cat => `
            <button class="cat-filter-btn badge ${cat === filterCategory ? 'badge-amber' : ''}" data-cat="${cat}" style="padding: 6px 14px; cursor: pointer;">
              ${cat}
            </button>
          `).join('')}
        </div>

        <input type="text" id="pantry-search-box" placeholder="Search inventory..." style="padding: 8px 14px; background: rgba(0,0,0,0.4); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff; font-size: 0.85rem;" />
      </div>

      <!-- Inventory Grid -->
      <div id="pantry-items-list" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px;">
        <!-- Rendered by updateList -->
      </div>
    </div>
  `;

  // Attach search and filter listeners
  container.querySelectorAll('.cat-filter-btn').forEach(btn => {
    btn.onclick = () => {
      filterCategory = btn.getAttribute('data-cat');
      container.querySelectorAll('.cat-filter-btn').forEach(b => b.classList.remove('badge-amber'));
      btn.classList.add('badge-amber');
      updateList();
    };
  });

  const searchBox = container.querySelector('#pantry-search-box');
  searchBox.oninput = (e) => {
    searchQuery = e.target.value;
    updateList();
  };

  // Add Item handler
  container.querySelector('#add-ing-submit-btn').onclick = async () => {
    const nameInput = container.querySelector('#add-ing-name');
    const name = nameInput.value.trim();
    if (!name) return;

    const cat = container.querySelector('#add-ing-category').value;
    const qty = parseFloat(container.querySelector('#add-ing-qty').value) || 100;
    const unit = container.querySelector('#add-ing-unit').value;

    const res = await api.addPantryItem({ name, category: cat, quantity: qty, unit, source: 'manual' });
    if (res) {
      pantry.unshift(res);
      nameInput.value = '';
      updateList();
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
    }
  };

  container.querySelector('#pantry-find-recipes-btn').onclick = () => switchTab('recipes');

  updateList();
}

// -------------------------------------------------------------
// TAB 3: DISCOVER RECIPES & RECIPE DETAIL
// -------------------------------------------------------------
async function renderRecipesTab(container) {
  let diet = 'any';
  let minutes = 45;

  async function fetchAndRender() {
    container.querySelector('#recipes-results-wrap').innerHTML = `
      <div style="text-align: center; padding: 48px; color: var(--text-muted); grid-column: 1 / -1;">
        Calculating molecular synergy and pantry utilization...
      </div>
    `;

    const data = await api.recommend({ diet, minutes });
    const recipes = data?.recipes || [];
    const unlock = data?.unlock_suggestion;

    const resultsWrap = container.querySelector('#recipes-results-wrap');
    resultsWrap.innerHTML = recipes.length === 0 ? `
      <div style="text-align: center; padding: 48px; color: var(--text-muted); grid-column: 1 / -1;">
        No recipes match your active dietary filters and cooking time. Try increasing cooking time or choosing 'any' diet.
      </div>
    ` : recipes.map(r => renderRecipeCardHtml(r)).join('');

    // Unlock Banner
    const unlockBanner = container.querySelector('#recipe-unlock-banner');
    if (unlock && unlock.ingredient) {
      unlockBanner.style.display = 'flex';
      unlockBanner.innerHTML = `
        <div style="font-size: 1.5rem;">💡</div>
        <div>
          <strong style="color: var(--accent-secondary);">The One Ingredient to Unlock More Dishes:</strong>
          <span style="color: var(--text-primary); margin-left: 6px;">${unlock.impact_description}</span>
        </div>
      `;
    } else {
      unlockBanner.style.display = 'none';
    }

    attachRecipeCardEvents(container);
  }

  container.innerHTML = `
    <div>
      <div style="margin-bottom: 24px;">
        <h3 style="font-family: var(--font-serif); font-size: 1.6rem; font-weight: 700;">Discover What You Can Actually Cook</h3>
        <p style="font-size: 0.88rem; color: var(--text-secondary);">
          Ranked using the computational gastronomy formula: 0.30×Core Coverage + 0.20×Pantry Utilisation + 0.20×FlavorDB Coherence + 0.30×Gap Fit.
        </p>
      </div>

      <!-- Unlock Suggestion Banner -->
      <div id="recipe-unlock-banner" class="glass-panel" style="padding: 16px 20px; border-color: rgba(232, 181, 106, 0.4); background: rgba(232, 181, 106, 0.08); display: none; align-items: center; gap: 14px; margin-bottom: 24px; border-radius: var(--radius-md);"></div>

      <!-- Filter Controls -->
      <div class="glass-panel" style="padding: 16px 20px; margin-bottom: 28px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <span style="font-size: 0.82rem; font-weight: 600; color: var(--text-muted); margin-right: 4px;">Diet:</span>
          ${['any', 'vegetarian', 'vegan', 'non-vegetarian'].map(d => `
            <button class="diet-tab-btn badge ${d === diet ? 'badge-amber' : ''}" data-diet="${d}" style="padding: 6px 14px; cursor: pointer; text-transform: capitalize;">
              ${d}
            </button>
          `).join('')}
        </div>

        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 0.82rem; font-weight: 600; color: var(--text-muted);">Max Time:</span>
          <select id="recipes-time-select" style="padding: 8px 12px; background: #141414; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff; font-size: 0.85rem;">
            <option value="20" ${minutes === 20 ? 'selected' : ''}>20 mins</option>
            <option value="35" ${minutes === 35 ? 'selected' : ''}>35 mins</option>
            <option value="45" ${minutes === 45 ? 'selected' : ''}>45 mins</option>
            <option value="90" ${minutes === 90 ? 'selected' : ''}>90 mins</option>
          </select>
        </div>
      </div>

      <!-- Recipe Cards Grid -->
      <div class="recipes-grid" id="recipes-results-wrap"></div>
    </div>
  `;

  container.querySelectorAll('.diet-tab-btn').forEach(btn => {
    btn.onclick = () => {
      diet = btn.getAttribute('data-diet');
      container.querySelectorAll('.diet-tab-btn').forEach(b => b.classList.remove('badge-amber'));
      btn.classList.add('badge-amber');
      fetchAndRender();
    };
  });

  const timeSelect = container.querySelector('#recipes-time-select');
  timeSelect.onchange = (e) => {
    minutes = parseInt(e.target.value);
    fetchAndRender();
  };

  fetchAndRender();
}

// -------------------------------------------------------------
// TAB 4: NUTRITION INTELLIGENCE
// -------------------------------------------------------------
async function renderNutritionTab(container) {
  const [summary, goals, history] = await Promise.all([
    api.getNutritionSummary(),
    api.getGoals(),
    api.getNutritionHistory(7)
  ]);

  const targetCal = goals?.target_calories || 2400;
  const consumedCal = summary?.consumed?.calories || 0;
  const consumedProt = summary?.consumed?.protein_g || 0;
  const targetProt = goals?.target_protein_g || 150;

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <h3 style="font-family: var(--font-serif); font-size: 1.6rem; font-weight: 700;">Nutritional Intelligence & Meal Analytics</h3>
        <p style="font-size: 0.88rem; color: var(--text-secondary);">Evidence-based metabolic calculations tracking energy balance and macronutrient distribution.</p>
      </div>

      <!-- Big Macro Dashboard -->
      <div class="glass-panel" style="padding: 28px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 16px;">
          <div>
            <span class="badge badge-amber" style="margin-bottom: 4px;">Today's Energy Balance</span>
            <h4 style="font-size: 1.35rem; font-weight: 700;">Macronutrient Target Progress</h4>
          </div>
          <div style="text-align: right;">
            <span style="font-family: var(--font-mono); font-size: 1.8rem; font-weight: 800; color: #FFF;">${consumedCal}</span>
            <span style="font-size: 0.85rem; color: var(--text-muted);">/ ${targetCal} kcal</span>
          </div>
        </div>

        <div class="macro-ring-container">
          <div class="macro-box">
            <span class="macro-label">Protein</span>
            <div class="macro-val" style="color: #2ED573;">${consumedProt}g</div>
            <span style="font-size: 0.72rem; color: var(--text-muted);">Goal: ${targetProt}g</span>
          </div>
          <div class="macro-box">
            <span class="macro-label">Carbohydrates</span>
            <div class="macro-val" style="color: #FFB800;">${summary?.consumed?.carbs_g || 0}g</div>
            <span style="font-size: 0.72rem; color: var(--text-muted);">Goal: ${goals?.target_carbs_g || 260}g</span>
          </div>
          <div class="macro-box">
            <span class="macro-label">Fats</span>
            <div class="macro-val" style="color: #FF4757;">${summary?.consumed?.fat_g || 0}g</div>
            <span style="font-size: 0.72rem; color: var(--text-muted);">Goal: ${goals?.target_fat_g || 70}g</span>
          </div>
          <div class="macro-box">
            <span class="macro-label">Dietary Fibre</span>
            <div class="macro-val" style="color: #00D2D3;">32g</div>
            <span style="font-size: 0.72rem; color: var(--text-muted);">Target: ${goals?.target_fibre_g || 35}g</span>
          </div>
        </div>
      </div>

      <!-- Recent Meals Logged -->
      <div>
        <h4 style="font-family: var(--font-serif); font-size: 1.25rem; font-weight: 700; margin-bottom: 16px;">Meals Logged Today</h4>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${summary?.recent_meals?.length > 0 ? summary.recent_meals.map(m => `
            <div class="glass-card" style="padding: 16px 20px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <span class="badge badge-gold" style="font-size: 0.68rem; margin-bottom: 4px; text-transform: uppercase;">${m.meal_type}</span>
                <h5 style="font-size: 1.05rem; font-weight: 700;">${m.title}</h5>
                <span style="font-size: 0.78rem; color: var(--text-muted);">${m.servings} serving(s)</span>
              </div>
              <div style="text-align: right;">
                <span style="font-family: var(--font-mono); font-weight: 700; color: #FFF; font-size: 1.1rem;">${m.calories} kcal</span>
                <span style="display: block; font-size: 0.78rem; color: #2ED573;">${m.protein_g}g Protein</span>
              </div>
            </div>
          `).join('') : `
            <div class="glass-panel" style="padding: 24px; text-align: center; color: var(--text-muted);">
              No meals logged today yet. Browse Discover Recipes to cook and log your dishes!
            </div>
          `}
        </div>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// TAB 5: MY GOALS
// -------------------------------------------------------------
async function renderGoalsTab(container) {
  const [goals, prof] = await Promise.all([
    api.getGoals(),
    api.getProfile()
  ]);

  container.innerHTML = `
    <div style="max-width: 800px;">
      <div style="margin-bottom: 24px;">
        <h3 style="font-family: var(--font-serif); font-size: 1.6rem; font-weight: 700;">Personalized Fitness Objectives & Targets</h3>
        <p style="font-size: 0.88rem; color: var(--text-secondary);">Configure your daily calorie, protein, carbohydrate, and fat allocations.</p>
      </div>

      <div class="glass-panel" style="padding: 28px; display: flex; flex-direction: column; gap: 20px;">
        <div>
          <label style="display: block; font-size: 0.82rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">Primary Fitness Objective</label>
          <select id="goal-primary-select" style="width: 100%; padding: 12px; background: #141414; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;">
            <option value="fat_loss" ${goals?.primary_goal === 'fat_loss' ? 'selected' : ''}>Fat Loss / Cutting (500 kcal deficit, high protein)</option>
            <option value="lean_bulk" ${goals?.primary_goal === 'lean_bulk' ? 'selected' : ''}>Lean Bulk (250 kcal surplus, clean muscle gain)</option>
            <option value="traditional_bulk" ${goals?.primary_goal === 'traditional_bulk' ? 'selected' : ''}>Traditional Bulk (500 kcal surplus, max strength)</option>
            <option value="dirty_bulk" ${goals?.primary_goal === 'dirty_bulk' ? 'selected' : ''}>Dirty Bulk (750 kcal surplus, fast mass)</option>
            <option value="recomposition" ${goals?.primary_goal === 'recomposition' ? 'selected' : ''}>Body Recomposition (Isocaloric, high protein)</option>
            <option value="maintenance" ${goals?.primary_goal === 'maintenance' ? 'selected' : ''}>Maintenance (Energy balance, vitality)</option>
            <option value="general_health" ${goals?.primary_goal === 'general_health' ? 'selected' : ''}>General Health & Longevity</option>
            <option value="athletic_performance" ${goals?.primary_goal === 'athletic_performance' ? 'selected' : ''}>Athletic Performance</option>
          </select>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <label style="display: block; font-size: 0.78rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Daily Calorie Target (kcal)</label>
            <input type="number" id="goal-calories" value="${goals?.target_calories || 2400}" style="width: 100%; padding: 12px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;" />
          </div>

          <div>
            <label style="display: block; font-size: 0.78rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Daily Protein Target (g)</label>
            <input type="number" id="goal-protein" value="${goals?.target_protein_g || 150}" style="width: 100%; padding: 12px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;" />
          </div>

          <div>
            <label style="display: block; font-size: 0.78rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Daily Carbs Target (g)</label>
            <input type="number" id="goal-carbs" value="${goals?.target_carbs_g || 260}" style="width: 100%; padding: 12px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;" />
          </div>

          <div>
            <label style="display: block; font-size: 0.78rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Daily Fat Target (g)</label>
            <input type="number" id="goal-fat" value="${goals?.target_fat_g || 70}" style="width: 100%; padding: 12px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;" />
          </div>
        </div>

        <div style="display: flex; gap: 14px; margin-top: 10px;">
          <button id="goal-recalc-btn" class="btn-secondary" style="padding: 12px 20px;">
            ⚡ Auto-Calculate from My Physical Stats
          </button>
          <button id="goal-save-btn" class="btn-primary" style="padding: 12px 24px;">
            Save Target Changes
          </button>
        </div>
      </div>
    </div>
  `;

  container.querySelector('#goal-recalc-btn').onclick = async () => {
    const selectedGoal = container.querySelector('#goal-primary-select').value;
    const calc = await api.calculateGoals({ primary_goal: selectedGoal });
    if (calc) {
      container.querySelector('#goal-calories').value = calc.target_calories;
      container.querySelector('#goal-protein').value = calc.target_protein_g;
      container.querySelector('#goal-carbs').value = calc.target_carbs_g;
      container.querySelector('#goal-fat').value = calc.target_fat_g;
    }
  };

  container.querySelector('#goal-save-btn').onclick = async () => {
    const btn = container.querySelector('#goal-save-btn');
    btn.innerText = 'Saving...';
    await api.updateGoals({
      primary_goal: container.querySelector('#goal-primary-select').value,
      target_calories: parseFloat(container.querySelector('#goal-calories').value),
      target_protein_g: parseFloat(container.querySelector('#goal-protein').value),
      target_carbs_g: parseFloat(container.querySelector('#goal-carbs').value),
      target_fat_g: parseFloat(container.querySelector('#goal-fat').value),
      target_fibre_g: 35.0
    });
    btn.innerText = 'Saved Successfully ✓';
    setTimeout(() => { btn.innerText = 'Save Target Changes'; }, 2000);
  };
}

// -------------------------------------------------------------
// TAB 6: MEAL PLANNER
// -------------------------------------------------------------
async function renderPlannerTab(container, switchTab) {
  let plans = await api.getMealPlans();
  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  container.innerHTML = `
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h3 style="font-family: var(--font-serif); font-size: 1.6rem; font-weight: 700;">Weekly Computational Meal Planner</h3>
          <p style="font-size: 0.88rem; color: var(--text-secondary);">Structure your meals across the week to effortlessly meet nutritional targets.</p>
        </div>

        <button class="btn-primary" id="planner-discover-btn" style="padding: 10px 20px;">
          + Find Dishes to Schedule ➔
        </button>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
        ${DAYS.map(day => {
          const dayPlans = plans.filter(p => p.day_of_week === day);
          return `
            <div class="glass-card" style="padding: 18px; display: flex; flex-direction: column; min-height: 200px;">
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px; margin-bottom: 12px;">
                <h4 style="font-weight: 700; color: #FFF;">${day}</h4>
                <span class="badge badge-gold" style="font-size: 0.68rem;">${dayPlans.length} meal(s)</span>
              </div>

              <div style="display: flex; flex-direction: column; gap: 8px; flex: 1;">
                ${dayPlans.length > 0 ? dayPlans.map(dp => `
                  <div style="padding: 10px; background: rgba(255,255,255,0.03); border-radius: var(--radius-sm); display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <span style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">${dp.meal_type}</span>
                      <h5 style="font-size: 0.88rem; font-weight: 700;">${dp.recipe_title}</h5>
                      <span style="font-size: 0.72rem; color: #2ED573;">${dp.calories} kcal • ${dp.protein}g protein</span>
                    </div>
                    <button class="del-plan-btn" data-id="${dp.id}" style="color: var(--text-muted); font-size: 1rem; padding: 2px;">✕</button>
                  </div>
                `).join('') : `
                  <div style="color: var(--text-muted); font-size: 0.8rem; font-style: italic; margin-top: 10px;">
                    No dishes scheduled for ${day}.
                  </div>
                `}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  container.querySelector('#planner-discover-btn').onclick = () => switchTab('recipes');

  container.querySelectorAll('.del-plan-btn').forEach(btn => {
    btn.onclick = async () => {
      const id = parseInt(btn.getAttribute('data-id'));
      await api.deleteMealPlan(id);
      renderPlannerTab(container, switchTab);
    };
  });
}

// -------------------------------------------------------------
// TAB 7: SAVED RECIPES
// -------------------------------------------------------------
async function renderSavedTab(container) {
  const saved = await api.getSavedRecipes();

  container.innerHTML = `
    <div>
      <div style="margin-bottom: 24px;">
        <h3 style="font-family: var(--font-serif); font-size: 1.6rem; font-weight: 700;">Saved Culinary Recipes</h3>
        <p style="font-size: 0.88rem; color: var(--text-secondary);">Your personal collection of saved dishes and nutritional bookmarks.</p>
      </div>

      <div class="recipes-grid">
        ${saved.length > 0 ? saved.map(s => `
          <div class="recipe-app-card">
            <div class="recipe-card-img-wrap">
              <img src="${s.image_url || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800'}" alt="${s.title}" />
              <button class="unsave-recipe-btn" data-id="${s.recipe_id}" style="position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.8); border: 1px solid var(--accent-red); color: var(--accent-red); padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.75rem;">
                Remove
              </button>
            </div>
            <div class="recipe-card-body">
              <span class="badge badge-gold" style="font-size: 0.68rem;">${s.cuisine || 'Authentic'}</span>
              <h4 style="font-size: 1.15rem; font-weight: 700;">${s.title}</h4>
              <button class="open-recipe-modal-btn btn-secondary" data-id="${s.recipe_id}" style="padding: 8px 14px; font-size: 0.85rem; margin-top: auto;">
                View Cooking Steps ➔
              </button>
            </div>
          </div>
        `).join('') : `
          <div style="padding: 48px; text-align: center; color: var(--text-muted); grid-column: 1 / -1;">
            You have not saved any recipes yet. Bookmark dishes from the Discover Recipes section!
          </div>
        `}
      </div>
    </div>
  `;

  container.querySelectorAll('.unsave-recipe-btn').forEach(btn => {
    btn.onclick = async () => {
      const id = btn.getAttribute('data-id');
      await api.unsaveRecipe(id);
      renderSavedTab(container);
    };
  });

  attachRecipeCardEvents(container);
}

// -------------------------------------------------------------
// TAB 8: SHOPPING LIST
// -------------------------------------------------------------
async function renderShoppingTab(container) {
  let [items, suggestions] = await Promise.all([
    api.getShoppingItems(),
    api.getShoppingSuggestions()
  ]);

  function updateList() {
    const listWrap = container.querySelector('#shopping-items-list');
    listWrap.innerHTML = items.length === 0 ? `
      <div style="padding: 32px; text-align: center; color: var(--text-muted);">
        Your grocery list is empty! Check the suggestions below or add items manually.
      </div>
    ` : items.map(item => `
      <div class="glass-card" style="padding: 14px 18px; display: flex; justify-content: space-between; align-items: center; opacity: ${item.is_purchased ? 0.45 : 1};">
        <label style="display: flex; align-items: center; gap: 12px; cursor: pointer; text-decoration: ${item.is_purchased ? 'line-through' : 'none'};">
          <input type="checkbox" class="toggle-shop-btn" data-id="${item.id}" ${item.is_purchased ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--accent-primary);" />
          <span style="font-size: 0.95rem; font-weight: 600;">${item.ingredient_name}</span>
          <span style="font-size: 0.78rem; color: var(--text-muted);">(${item.quantity} ${item.unit})</span>
        </label>
        <button class="del-shop-btn" data-id="${item.id}" style="color: var(--text-muted); padding: 4px;">✕</button>
      </div>
    `).join('');

    listWrap.querySelectorAll('.toggle-shop-btn').forEach(cb => {
      cb.onchange = async () => {
        const id = parseInt(cb.getAttribute('data-id'));
        await api.toggleShoppingItem(id);
        const it = items.find(i => i.id === id);
        if (it) it.is_purchased = !it.is_purchased;
        updateList();
      };
    });

    listWrap.querySelectorAll('.del-shop-btn').forEach(btn => {
      btn.onclick = async () => {
        const id = parseInt(btn.getAttribute('data-id'));
        await api.deleteShoppingItem(id);
        items = items.filter(i => i.id !== id);
        updateList();
      };
    });
  }

  container.innerHTML = `
    <div>
      <div style="margin-bottom: 24px;">
        <h3 style="font-family: var(--font-serif); font-size: 1.6rem; font-weight: 700;">Smart Kitchen Shopping List</h3>
        <p style="font-size: 0.88rem; color: var(--text-secondary);">Automatically aggregated ingredients needed to unlock recipes and replenish your pantry.</p>
      </div>

      <!-- Add item input -->
      <div class="glass-panel" style="padding: 16px; margin-bottom: 24px; display: flex; gap: 10px;">
        <input type="text" id="add-shop-name" placeholder="Add grocery item (e.g. Greek Yogurt, Fresh Cilantro)..." style="flex: 1; padding: 10px 14px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;" />
        <button id="add-shop-btn" class="btn-primary" style="padding: 10px 20px;">+ Add Item</button>
      </div>

      <div style="display: grid; grid-template-columns: 1.3fr 1fr; gap: 24px;">
        <div>
          <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 12px;">Active Groceries</h4>
          <div id="shopping-items-list" style="display: flex; flex-direction: column; gap: 8px;"></div>
        </div>

        <div>
          <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 12px;">Suggested to Unlock Recipes</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${suggestions.map(s => `
              <div class="glass-card" style="padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <h5 style="font-size: 0.9rem; font-weight: 700;">${s.ingredient_name}</h5>
                  <span style="font-size: 0.75rem; color: var(--accent-secondary);">${s.suggested_for_recipe}</span>
                </div>
                <button class="add-suggestion-btn btn-secondary" data-name="${s.ingredient_name}" style="padding: 6px 12px; font-size: 0.78rem;">
                  + Add
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  updateList();

  container.querySelector('#add-shop-btn').onclick = async () => {
    const inp = container.querySelector('#add-shop-name');
    const name = inp.value.trim();
    if (!name) return;
    const res = await api.addShoppingItem({ ingredient_name: name });
    if (res) {
      items.unshift(res);
      inp.value = '';
      updateList();
    }
  };

  container.querySelectorAll('.add-suggestion-btn').forEach(btn => {
    btn.onclick = async () => {
      const name = btn.getAttribute('data-name');
      const res = await api.addShoppingItem({ ingredient_name: name });
      if (res) {
        items.unshift(res);
        btn.innerText = 'Added ✓';
        btn.disabled = true;
        updateList();
      }
    };
  });
}

// -------------------------------------------------------------
// TAB 9: PROFILE & PREFERENCES
// -------------------------------------------------------------
async function renderProfileTab(container) {
  const [prof, pref] = await Promise.all([
    api.getProfile(),
    api.getPreferences()
  ]);

  container.innerHTML = `
    <div style="max-width: 760px;">
      <div style="margin-bottom: 24px;">
        <h3 style="font-family: var(--font-serif); font-size: 1.6rem; font-weight: 700;">Chef Profile & Dietary Exclusions</h3>
        <p style="font-size: 0.88rem; color: var(--text-secondary);">Manage physical stats, allergens, and dietary lifestyles.</p>
      </div>

      <div class="glass-panel" style="padding: 28px; display: flex; flex-direction: column; gap: 20px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <label style="display: block; font-size: 0.78rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Age</label>
            <input type="number" id="prof-age" value="${prof?.age || 26}" style="width: 100%; padding: 10px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.78rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Weight (kg)</label>
            <input type="number" id="prof-weight" value="${prof?.weight_kg || 72}" style="width: 100%; padding: 10px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.78rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Height (cm)</label>
            <input type="number" id="prof-height" value="${prof?.height_cm || 175}" style="width: 100%; padding: 10px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.78rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Dietary Lifestyle</label>
            <select id="prof-diet" style="width: 100%; padding: 10px; background: #141414; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;">
              <option value="vegetarian" ${pref?.dietary_lifestyle === 'vegetarian' ? 'selected' : ''}>Vegetarian</option>
              <option value="vegan" ${pref?.dietary_lifestyle === 'vegan' ? 'selected' : ''}>Vegan</option>
              <option value="eggetarian" ${pref?.dietary_lifestyle === 'eggetarian' ? 'selected' : ''}>Eggetarian</option>
              <option value="pescatarian" ${pref?.dietary_lifestyle === 'pescatarian' ? 'selected' : ''}>Pescatarian</option>
              <option value="non-vegetarian" ${pref?.dietary_lifestyle === 'non-vegetarian' ? 'selected' : ''}>Non-Vegetarian</option>
              <option value="jain" ${pref?.dietary_lifestyle === 'jain' ? 'selected' : ''}>Jain</option>
              <option value="any" ${pref?.dietary_lifestyle === 'any' ? 'selected' : ''}>Any</option>
            </select>
          </div>
        </div>

        <div>
          <label style="display: block; font-size: 0.78rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">
            Excluded Allergens (Separated by commas)
          </label>
          <input type="text" id="prof-allergies" value="${(pref?.allergies || []).join(', ')}" placeholder="e.g. peanuts, dairy, gluten" style="width: 100%; padding: 10px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;" />
        </div>

        <button id="prof-save-btn" class="btn-primary" style="padding: 12px 24px; align-self: flex-start;">
          Save Profile & Restrictions
        </button>
      </div>
    </div>
  `;

  container.querySelector('#prof-save-btn').onclick = async () => {
    const btn = container.querySelector('#prof-save-btn');
    btn.innerText = 'Saving...';
    
    await api.updateProfile({
      age: parseInt(container.querySelector('#prof-age').value),
      weight_kg: parseFloat(container.querySelector('#prof-weight').value),
      height_cm: parseFloat(container.querySelector('#prof-height').value)
    });

    const allergiesRaw = container.querySelector('#prof-allergies').value;
    const allergiesList = allergiesRaw.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);

    await api.updatePreferences({
      dietary_lifestyle: container.querySelector('#prof-diet').value,
      allergies: allergiesList
    });

    btn.innerText = 'Changes Saved ✓';
    setTimeout(() => { btn.innerText = 'Save Profile & Restrictions'; }, 2000);
  };
}

// -------------------------------------------------------------
// HELPER: RENDER RECIPE CARD HTML
// -------------------------------------------------------------
function renderRecipeCardHtml(r) {
  const matchPct = r.match_percentage || Math.round((r.coverage || 0.7) * 100);
  const scoreVal = r.final_personalized_score ? Math.round(r.final_personalized_score * 100) : (r.score || 85);

  return `
    <div class="recipe-app-card">
      <div class="recipe-card-img-wrap">
        <img src="${r.image_url || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800'}" alt="${r.title}" />
        <div class="recipe-match-badge">${matchPct}% Match</div>
      </div>

      <div class="recipe-card-body">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span class="badge badge-gold" style="font-size: 0.68rem;">${r.cuisine || 'Authentic'}</span>
          <span style="font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700; color: var(--accent-primary);">
            Score: ${scoreVal}/100
          </span>
        </div>

        <h4 style="font-size: 1.15rem; font-weight: 700; line-height: 1.3;">${r.title}</h4>

        <div class="recipe-meta-row">
          <span>⏱️ ${r.cook_time_minutes || r.minutes || 25} min</span>
          <span>🔥 ${r.calories_per_serving || 280} kcal</span>
          <span style="color: #2ED573;">🥩 ${r.protein_grams || 14}g protein</span>
        </div>

        <!-- Available vs Missing -->
        <div style="font-size: 0.78rem; margin: 4px 0;">
          <div style="color: #2ED573; margin-bottom: 2px;">
            ✓ In Pantry: ${r.ingredients_available ? r.ingredients_available.slice(0, 3).join(', ') : 'Cumin, Turmeric, Onion'}
          </div>
          ${r.ingredients_missing && r.ingredients_missing.length > 0 ? `
            <div style="color: var(--accent-secondary);">
              + Need: ${r.ingredients_missing.slice(0, 2).join(', ')}
            </div>
          ` : ''}
        </div>

        <!-- Why Drishyam Recommended -->
        ${r.why_drishyam_recommended ? `
          <div style="font-size: 0.75rem; color: var(--text-muted); background: rgba(255,255,255,0.02); padding: 8px; border-radius: var(--radius-sm); line-height: 1.4;">
            💡 ${r.why_drishyam_recommended}
          </div>
        ` : ''}

        <!-- One Ingredient to Buy Unlock Pill -->
        ${r.one_ingredient_to_buy || (r.unlock && r.unlock.ingredient) ? `
          <div class="unlock-box">
            <span>✨</span>
            <span>Add <strong>${r.one_ingredient_to_buy || r.unlock.ingredient}</strong> to unlock full flavor</span>
          </div>
        ` : ''}

        <div style="display: flex; gap: 8px; margin-top: auto; padding-top: 10px;">
          <button class="open-recipe-modal-btn btn-primary" data-id="${r.recipe_id || r.id}" style="flex: 1; padding: 10px; font-size: 0.85rem;">
            View Recipe ➔
          </button>
          <button class="save-card-btn btn-icon" data-id="${r.recipe_id || r.id}" title="Save to bookmarks">
            ⭐
          </button>
        </div>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// HELPER: ATTACH RECIPE CARD EVENTS (MODAL & SAVE)
// -------------------------------------------------------------
function attachRecipeCardEvents(container) {
  container.querySelectorAll('.open-recipe-modal-btn').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      openRecipeDetailModal(id);
    };
  });

  container.querySelectorAll('.save-card-btn').forEach(btn => {
    btn.onclick = async () => {
      const id = btn.getAttribute('data-id');
      await api.saveRecipe(id);
      btn.style.color = '#FFB800';
      confetti({ particleCount: 20, spread: 50, origin: { y: 0.8 } });
    };
  });
}

// -------------------------------------------------------------
// RECIPE DETAIL MODAL (Cooking Steps, Nutrition, Substitutions)
// -------------------------------------------------------------
async function openRecipeDetailModal(recipeId) {
  const existing = document.getElementById('drishyam-recipe-modal');
  if (existing) existing.remove();

  const backdrop = document.createElement('div');
  backdrop.id = 'drishyam-recipe-modal';
  backdrop.className = 'modal-backdrop';

  backdrop.innerHTML = `
    <div class="modal-content glass-panel" style="max-width: 720px; padding: 32px;">
      <div style="text-align: center; padding: 40px; color: var(--text-muted);">
        Loading recipe instructions and molecular pairings...
      </div>
    </div>
  `;
  document.body.appendChild(backdrop);

  const [recipe, instructionsData] = await Promise.all([
    api.getRecipe(recipeId),
    api.getInstructions(recipeId)
  ]);

  const rec = recipe || {
    title: 'Homestyle Dal Tadka',
    cuisine: 'North Indian',
    prep_time_minutes: 10,
    cook_time_minutes: 20,
    servings: 4,
    nutrition_per_serving: { calories: 215, protein: 11.8, carbs: 33.4, fat: 4.6, fibre: 8.2 },
    ingredients: [
      { name: 'lentils', quantity: 200, unit: 'g' },
      { name: 'turmeric', quantity: 5, unit: 'g' },
      { name: 'cumin', quantity: 5, unit: 'g' },
      { name: 'garlic', quantity: 20, unit: 'g' }
    ],
    molecular_profile: { dominant_aroma: 'cuminaldehyde + allicin + curcumin', notes: 'Tempering synergy balancing cumin terpenes with allium sulfur.' }
  };

  const steps = instructionsData?.steps || instructionsData?.instructions || rec.instructions || [
    'Rinse ingredients thoroughly.',
    'Heat oil in a pan, crackle whole spices until aromatic.',
    'Add aromatics and cook until tender.',
    'Simmer and garnish with fresh herbs before serving.'
  ];

  const nut = rec.nutrition_per_serving || { calories: 280, protein: 14, carbs: 30, fat: 10, fibre: 4 };

  backdrop.innerHTML = `
    <div class="modal-content glass-panel" style="max-width: 760px; padding: 32px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
        <div>
          <span class="badge badge-amber" style="margin-bottom: 6px;">Verified RecipeDB Preparation</span>
          <h2 style="font-family: var(--font-serif); font-size: 1.8rem; font-weight: 700; color: #FFF;">${rec.title}</h2>
          <div style="display: flex; gap: 14px; color: var(--text-muted); font-size: 0.85rem; margin-top: 6px;">
            <span>⏱️ Prep: ${rec.prep_time_minutes || 10}m</span>
            <span>🍳 Cook: ${rec.cook_time_minutes || 20}m</span>
            <span>🍽️ ${rec.servings || 2} Servings</span>
            <span>🔥 ${nut.calories} kcal/serving</span>
          </div>
        </div>
        <button id="modal-close-btn" style="color: var(--text-muted); font-size: 1.6rem; line-height: 1;">&times;</button>
      </div>

      <!-- Molecular Flavor Synergy -->
      <div class="glass-card" style="padding: 16px; margin-bottom: 24px; border-color: rgba(255, 138, 50, 0.3);">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
          <span style="font-size: 1.1rem;">🧪</span>
          <strong style="color: var(--accent-primary); font-size: 0.9rem;">FlavorDB Volatile Aroma Synergy</strong>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
          ${rec.molecular_profile?.notes || 'Ingredients share volatile terpenes and allium aroma compounds that enhance culinary depth.'}
        </p>
      </div>

      <!-- Ingredients Checklist -->
      <div style="margin-bottom: 24px;">
        <h4 style="font-size: 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 12px;">
          Ingredients Needed
        </h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          ${(rec.ingredients || []).map(ing => {
            const name = typeof ing === 'object' ? ing.name : ing;
            const amt = typeof ing === 'object' ? `${ing.quantity} ${ing.unit}` : '';
            return `
              <div style="padding: 8px 12px; background: rgba(255,255,255,0.03); border-radius: var(--radius-sm); font-size: 0.85rem; display: flex; justify-content: space-between;">
                <span>• <strong>${name}</strong></span>
                <span style="color: var(--text-muted); font-family: var(--font-mono);">${amt}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Step-by-Step Instructions -->
      <div style="margin-bottom: 28px;">
        <h4 style="font-size: 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 14px;">
          Step-by-Step Cooking Instructions
        </h4>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${steps.map((s, idx) => `
            <div style="display: flex; gap: 14px; font-size: 0.9rem; line-height: 1.6;">
              <span style="font-family: var(--font-mono); font-weight: 800; color: var(--accent-primary); width: 24px; flex-shrink: 0;">${idx + 1}.</span>
              <span style="color: var(--text-secondary);">${s}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Action Buttons -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 20px;">
        <button id="modal-save-btn" class="btn-secondary" style="padding: 10px 20px;">
          ⭐ Save to Favorites
        </button>
        <button id="modal-log-meal-btn" class="btn-primary" style="padding: 10px 24px;">
          ✓ Log This Meal as Consumed
        </button>
      </div>
    </div>
  `;

  backdrop.querySelector('#modal-close-btn').onclick = () => backdrop.remove();

  backdrop.querySelector('#modal-save-btn').onclick = async () => {
    await api.saveRecipe(recipeId);
    backdrop.querySelector('#modal-save-btn').innerText = 'Saved ✓';
  };

  backdrop.querySelector('#modal-log-meal-btn').onclick = async () => {
    const btn = backdrop.querySelector('#modal-log-meal-btn');
    btn.innerText = 'Logging...';
    await api.logMeal({
      recipe_id: recipeId,
      recipe_title: rec.title,
      meal_type: 'lunch',
      servings: 1.0,
      calories: nut.calories || 300,
      protein: nut.protein || 15,
      carbs: nut.carbs || 30,
      fat: nut.fat || 10
    });
    btn.innerText = 'Meal Logged Successfully ✓';
    confetti({ particleCount: 40, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => backdrop.remove(), 1200);
  };
}
