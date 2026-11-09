// Personalized Onboarding Wizard (4 Steps)
import { api } from '../services/api.js';

export function openOnboardingModal(onComplete = () => {}) {
  const existing = document.getElementById('drishyam-onboarding-modal');
  if (existing) existing.remove();

  const backdrop = document.createElement('div');
  backdrop.id = 'drishyam-onboarding-modal';
  backdrop.className = 'modal-backdrop';

  let currentStep = 1;

  // Onboarding State
  const state = {
    age: 26,
    height_cm: 175,
    weight_kg: 72,
    target_weight_kg: 75,
    biological_sex: 'male',
    activity_level: 'moderate',
    primary_goal: 'lean_bulk',
    dietary_lifestyle: 'vegetarian',
    allergies: [],
    cuisine_preferences: ['North Indian', 'South Indian'],
    taste_preferences: ['spicy', 'savoury'],
    max_cooking_minutes: 45
  };

  const FITNESS_GOALS = [
    { id: 'fat_loss', title: 'Fat Loss / Cutting', desc: 'Preserve lean muscle while targeting a 500 kcal deficit and high protein density.', icon: '🔥', highlight: 'High Protein • 500 kcal Deficit' },
    { id: 'lean_bulk', title: 'Lean Bulk', desc: 'Controlled 250 kcal surplus optimizing muscle synthesis with minimal adipose gain.', icon: '💪', highlight: 'High Protein • 250 kcal Surplus' },
    { id: 'traditional_bulk', title: 'Traditional Bulk', desc: 'Robust 500 kcal surplus maximizing glycogen replenishment and strength adaptation.', icon: '⚡', highlight: 'Hearty Energy • High Carbs' },
    { id: 'dirty_bulk', title: 'Dirty Bulk', desc: 'High calorie surplus prioritizing rapid mass gain. Note: Higher fat accumulation expected.', icon: '🍔', highlight: 'Max Calories • Fast Mass' },
    { id: 'recomposition', title: 'Body Recomposition', desc: 'Simultaneous fat oxidation and muscle building via elevated protein near maintenance.', icon: '⚖️', highlight: 'High Protein • Isocaloric' },
    { id: 'maintenance', title: 'Maintenance', desc: 'Exact energy balance supporting metabolic longevity, health and daily vitality.', icon: '🌿', highlight: 'Energy Balance • Balanced Macros' },
    { id: 'general_health', title: 'General Health & Longevity', desc: 'Prioritizing dietary variety, prebiotic fibre, micronutrients and anti-inflammatory spices.', icon: '🥗', highlight: 'High Fibre • Micronutrient Rich' },
    { id: 'athletic_performance', title: 'Athletic Performance', desc: 'Carbohydrate-dense fueling for athletes, rapid glycogen turnover and quick recovery.', icon: '🏆', highlight: 'High Glycogen • Rapid Recovery' }
  ];

  const ALLERGIES_LIST = [
    { id: 'peanuts', label: 'Peanuts' },
    { id: 'tree_nuts', label: 'Tree Nuts (Almonds, Cashews)' },
    { id: 'dairy', label: 'Dairy / Lactose' },
    { id: 'eggs', label: 'Eggs' },
    { id: 'gluten', label: 'Gluten / Wheat' },
    { id: 'soy', label: 'Soy' },
    { id: 'shellfish', label: 'Shellfish' }
  ];

  function renderStep() {
    backdrop.innerHTML = `
      <div class="modal-content glass-panel" style="max-width: 680px; padding: 36px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <div>
            <span class="badge badge-amber" style="margin-bottom: 6px;">Step ${currentStep} of 4</span>
            <h3 style="font-family: var(--font-serif); font-size: 1.6rem; font-weight: 700;">
              ${currentStep === 1 ? 'Your Physical Profile' :
                currentStep === 2 ? 'Your Fitness & Nutrition Objective' :
                currentStep === 3 ? 'Dietary Lifestyle & Allergies' :
                'Cuisines & Cooking Preferences'}
            </h3>
          </div>
          <button id="onboarding-close-btn" style="color: var(--text-muted); font-size: 1.4rem;">&times;</button>
        </div>

        <div style="margin-bottom: 28px;">
          ${renderStepBody()}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 20px;">
          ${currentStep > 1 ? `
            <button id="onboarding-back-btn" class="btn-secondary" style="padding: 10px 20px;">Back</button>
          ` : `<div></div>`}
          
          <button id="onboarding-next-btn" class="btn-primary" style="padding: 12px 28px;">
            ${currentStep === 4 ? 'Complete Onboarding & Launch' : 'Continue'}
          </button>
        </div>
      </div>
    `;

    // Attach step listeners
    backdrop.querySelector('#onboarding-close-btn').onclick = () => backdrop.remove();

    const backBtn = backdrop.querySelector('#onboarding-back-btn');
    if (backBtn) {
      backBtn.onclick = () => {
        currentStep -= 1;
        renderStep();
      };
    }

    const nextBtn = backdrop.querySelector('#onboarding-next-btn');
    nextBtn.onclick = async () => {
      gatherStepData();
      if (currentStep < 4) {
        currentStep += 1;
        renderStep();
      } else {
        // Submit onboarding data to backend
        nextBtn.innerText = 'Personalizing DRISHYAM...';
        nextBtn.disabled = true;

        await api.updateProfile({
          age: state.age,
          height_cm: state.height_cm,
          weight_kg: state.weight_kg,
          target_weight_kg: state.target_weight_kg,
          biological_sex: state.biological_sex,
          activity_level: state.activity_level
        });

        await api.updatePreferences({
          dietary_lifestyle: state.dietary_lifestyle,
          allergies: state.allergies,
          cuisine_preferences: state.cuisine_preferences,
          taste_preferences: state.taste_preferences,
          max_cooking_minutes: state.max_cooking_minutes
        });

        // Compute goals
        const targets = await api.calculateGoals({
          primary_goal: state.primary_goal,
          weight_kg: state.weight_kg,
          height_cm: state.height_cm,
          age: state.age,
          biological_sex: state.biological_sex,
          activity_level: state.activity_level
        });

        if (targets) {
          await api.updateGoals({
            primary_goal: state.primary_goal,
            target_calories: targets.target_calories,
            target_protein_g: targets.target_protein_g,
            target_carbs_g: targets.target_carbs_g,
            target_fat_g: targets.target_fat_g,
            target_fibre_g: targets.target_fibre_g
          });
        }

        backdrop.remove();
        onComplete(state);
      }
    };
  }

  function renderStepBody() {
    if (currentStep === 1) {
      return `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 18px;">
          <div>
            <label style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Age</label>
            <input type="number" id="ob-age" value="${state.age}" min="14" max="100" style="width: 100%; padding: 12px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Biological Sex</label>
            <select id="ob-sex" style="width: 100%; padding: 12px; background: #141414; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;">
              <option value="male" ${state.biological_sex === 'male' ? 'selected' : ''}>Male</option>
              <option value="female" ${state.biological_sex === 'female' ? 'selected' : ''}>Female</option>
            </select>
          </div>
          <div>
            <label style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Height (cm)</label>
            <input type="number" id="ob-height" value="${state.height_cm}" min="120" max="230" style="width: 100%; padding: 12px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Current Weight (kg)</label>
            <input type="number" id="ob-weight" value="${state.weight_kg}" min="35" max="250" style="width: 100%; padding: 12px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Target Weight (kg)</label>
            <input type="number" id="ob-target-weight" value="${state.target_weight_kg}" min="35" max="250" style="width: 100%; padding: 12px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;" />
          </div>
          <div>
            <label style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">Daily Activity Level</label>
            <select id="ob-activity" style="width: 100%; padding: 12px; background: #141414; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;">
              <option value="sedentary" ${state.activity_level === 'sedentary' ? 'selected' : ''}>Sedentary (Desk Job)</option>
              <option value="light" ${state.activity_level === 'light' ? 'selected' : ''}>Light (1-2 workouts/week)</option>
              <option value="moderate" ${state.activity_level === 'moderate' ? 'selected' : ''}>Moderate (3-5 workouts/week)</option>
              <option value="active" ${state.activity_level === 'active' ? 'selected' : ''}>Active (6-7 workouts/week)</option>
              <option value="very_active" ${state.activity_level === 'very_active' ? 'selected' : ''}>Athlete / High Activity</option>
            </select>
          </div>
        </div>
      `;
    }

    if (currentStep === 2) {
      return `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; max-height: 420px; overflow-y: auto; padding-right: 4px;">
          ${FITNESS_GOALS.map(g => `
            <div class="goal-card glass-card ${state.primary_goal === g.id ? 'active' : ''}" data-goal="${g.id}" style="padding: 16px; cursor: pointer; border-width: ${state.primary_goal === g.id ? '2px' : '1px'}; border-color: ${state.primary_goal === g.id ? 'var(--accent-primary)' : 'var(--border-subtle)'}; background: ${state.primary_goal === g.id ? 'rgba(255,138,50,0.1)' : 'var(--bg-glass-card)'};">
              <div style="font-size: 1.5rem; margin-bottom: 6px;">${g.icon}</div>
              <h4 style="font-size: 0.98rem; font-weight: 700; color: #FFF; margin-bottom: 4px;">${g.title}</h4>
              <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 8px;">${g.desc}</p>
              <span class="badge badge-gold" style="font-size: 0.68rem;">${g.highlight}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    if (currentStep === 3) {
      return `
        <div>
          <label style="display: block; font-size: 0.82rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">Dietary Lifestyle</label>
          <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 24px;">
            ${['vegetarian', 'vegan', 'eggetarian', 'pescatarian', 'non-vegetarian', 'jain', 'any'].map(d => `
              <button type="button" class="diet-select-btn badge ${state.dietary_lifestyle === d ? 'badge-amber' : ''}" data-diet="${d}" style="padding: 8px 16px; cursor: pointer; text-transform: capitalize; font-size: 0.85rem;">
                ${d.replace('-', ' ')}
              </button>
            `).join('')}
          </div>

          <label style="display: block; font-size: 0.82rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">
            Food Allergies <span style="color: var(--accent-red); font-size: 0.72rem; font-family: var(--font-mono);">(HARD FILTERED OUT)</span>
          </label>
          <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 12px;">
            Selected allergens will strictly exclude recipes containing them.
          </p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            ${ALLERGIES_LIST.map(a => `
              <label style="display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); cursor: pointer; font-size: 0.85rem;">
                <input type="checkbox" class="allergy-checkbox" value="${a.id}" ${state.allergies.includes(a.id) ? 'checked' : ''} style="accent-color: var(--accent-primary);" />
                ${a.label}
              </label>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (currentStep === 4) {
      return `
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <div>
            <label style="display: block; font-size: 0.82rem; font-weight: 700; color: var(--text-primary); margin-bottom: 10px;">Favorite Cuisines</label>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${['North Indian', 'South Indian', 'Punjabi', 'Bengali', 'Asian', 'Mediterranean', 'Italian', 'Mexican'].map(c => `
                <button type="button" class="cuisine-btn badge ${state.cuisine_preferences.includes(c) ? 'badge-gold' : ''}" data-cuisine="${c}" style="padding: 8px 14px; cursor: pointer; font-size: 0.82rem;">
                  ${c}
                </button>
              `).join('')}
            </div>
          </div>

          <div>
            <label style="display: block; font-size: 0.82rem; font-weight: 700; color: var(--text-primary); margin-bottom: 10px;">Preferred Cooking Time</label>
            <select id="ob-time" style="width: 100%; padding: 12px; background: #141414; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff;">
              <option value="20" ${state.max_cooking_minutes === 20 ? 'selected' : ''}>Quick (under 20 minutes)</option>
              <option value="35" ${state.max_cooking_minutes === 35 ? 'selected' : ''}>Standard (under 35 minutes)</option>
              <option value="50" ${state.max_cooking_minutes === 50 ? 'selected' : ''}>Full Meal (under 50 minutes)</option>
              <option value="90" ${state.max_cooking_minutes === 90 ? 'selected' : ''}>Slow Simmered / Feasts (up to 90 mins)</option>
            </select>
          </div>
        </div>
      `;
    }
  }

  function gatherStepData() {
    if (currentStep === 1) {
      state.age = parseInt(backdrop.querySelector('#ob-age').value) || 26;
      state.biological_sex = backdrop.querySelector('#ob-sex').value;
      state.height_cm = parseFloat(backdrop.querySelector('#ob-height').value) || 175;
      state.weight_kg = parseFloat(backdrop.querySelector('#ob-weight').value) || 72;
      state.target_weight_kg = parseFloat(backdrop.querySelector('#ob-target-weight').value) || 75;
      state.activity_level = backdrop.querySelector('#ob-activity').value;
    }
    if (currentStep === 2) {
      // Selected goal already saved on click
    }
    if (currentStep === 3) {
      const checkedAllergies = Array.from(backdrop.querySelectorAll('.allergy-checkbox:checked')).map(cb => cb.value);
      state.allergies = checkedAllergies;
    }
    if (currentStep === 4) {
      state.max_cooking_minutes = parseInt(backdrop.querySelector('#ob-time').value) || 45;
    }
  }

  // Handle Dynamic Clicks inside modal
  backdrop.addEventListener('click', (e) => {
    // Goal selection
    const goalCard = e.target.closest('.goal-card');
    if (goalCard) {
      state.primary_goal = goalCard.getAttribute('data-goal');
      backdrop.querySelectorAll('.goal-card').forEach(c => {
        c.style.borderColor = 'var(--border-subtle)';
        c.style.background = 'var(--bg-glass-card)';
      });
      goalCard.style.borderColor = 'var(--accent-primary)';
      goalCard.style.background = 'rgba(255,138,50,0.1)';
    }

    // Diet selection
    const dietBtn = e.target.closest('.diet-select-btn');
    if (dietBtn) {
      state.dietary_lifestyle = dietBtn.getAttribute('data-diet');
      backdrop.querySelectorAll('.diet-select-btn').forEach(b => b.classList.remove('badge-amber'));
      dietBtn.classList.add('badge-amber');
    }

    // Cuisine selection
    const cuisineBtn = e.target.closest('.cuisine-btn');
    if (cuisineBtn) {
      const c = cuisineBtn.getAttribute('data-cuisine');
      if (state.cuisine_preferences.includes(c)) {
        state.cuisine_preferences = state.cuisine_preferences.filter(x => x !== c);
        cuisineBtn.classList.remove('badge-gold');
      } else {
        state.cuisine_preferences.push(c);
        cuisineBtn.classList.add('badge-gold');
      }
    }
  });

  renderStep();
  document.body.appendChild(backdrop);
}
