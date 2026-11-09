// DRISHYAM Master API Client

const BASE_URL = '/api';

class ApiClient {
  constructor() {
    this.token = localStorage.getItem('drishyam_token') || null;
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('drishyam_token', token);
    } else {
      localStorage.removeItem('drishyam_token');
    }
  }

  getHeaders(extra = {}) {
    const headers = { 'Content-Type': 'application/json', ...extra };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  async request(endpoint, options = {}) {
    options.headers = this.getHeaders(options.headers);
    try {
      const res = await fetch(`${BASE_URL}${endpoint}`, options);
      if (res.status === 401) {
        // Token expired or invalid
        // Do not crash, keep guest state
      }
      return await res.json();
    } catch (err) {
      console.warn(`API call ${endpoint} failed:`, err);
      return null;
    }
  }

  // Auth
  async register(email, password, full_name) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, full_name })
    });
    if (data?.access_token) this.setToken(data.access_token);
    return data;
  }

  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    if (data?.access_token) this.setToken(data.access_token);
    return data;
  }

  async demoLogin() {
    const data = await this.request('/auth/demo-login', { method: 'POST' });
    if (data?.access_token) this.setToken(data.access_token);
    return data;
  }

  async getMe() {
    return await this.request('/auth/me');
  }

  logout() {
    this.setToken(null);
  }

  // Profile & Goals
  async getProfile() {
    return await this.request('/profile');
  }

  async updateProfile(updates) {
    return await this.request('/profile', { method: 'PUT', body: JSON.stringify(updates) });
  }

  async getPreferences() {
    return await this.request('/preferences');
  }

  async updatePreferences(updates) {
    return await this.request('/preferences', { method: 'PUT', body: JSON.stringify(updates) });
  }

  async getGoals() {
    return await this.request('/goals');
  }

  async updateGoals(goals) {
    return await this.request('/goals', { method: 'PUT', body: JSON.stringify(goals) });
  }

  async calculateGoals(payload) {
    return await this.request('/goals/calculate', { method: 'POST', body: JSON.stringify(payload) });
  }

  // Pantry
  async getPantry() {
    return await this.request('/pantry') || [];
  }

  async addPantryItem(item) {
    return await this.request('/pantry', { method: 'POST', body: JSON.stringify(item) });
  }

  async updatePantryItem(id, updates) {
    return await this.request(`/pantry/${id}`, { method: 'PUT', body: JSON.stringify(updates) });
  }

  async deletePantryItem(id) {
    return await this.request(`/pantry/${id}`, { method: 'DELETE' });
  }

  // Recommendations
  async recommend(params = {}) {
    return await this.request('/recommend', { method: 'POST', body: JSON.stringify(params) });
  }

  // Recipes & Saved
  async getRecipe(recipeId) {
    return await this.request(`/recipes/${recipeId}`);
  }

  async getSavedRecipes() {
    return await this.request('/recipes/saved/all') || [];
  }

  async saveRecipe(recipeId) {
    return await this.request(`/recipes/${recipeId}/save`, { method: 'POST' });
  }

  async unsaveRecipe(recipeId) {
    return await this.request(`/recipes/${recipeId}/save`, { method: 'DELETE' });
  }

  async getInstructions(recipeId) {
    return await this.request(`/instructions/${recipeId}`);
  }

  // Nutrition
  async analyzeNutrition(payload) {
    return await this.request('/nutrition/analyze', { method: 'POST', body: JSON.stringify(payload) });
  }

  async getNutritionSummary(date = null) {
    return await this.request(`/nutrition/summary${date ? `?date=${date}` : ''}`);
  }

  async logMeal(meal) {
    return await this.request('/nutrition/meal-log', { method: 'POST', body: JSON.stringify(meal) });
  }

  async getNutritionHistory(days = 7) {
    return await this.request(`/nutrition/history?days=${days}`);
  }

  // Meal Planner
  async getMealPlans() {
    return await this.request('/meal-plans') || [];
  }

  async addMealPlan(plan) {
    return await this.request('/meal-plans', { method: 'POST', body: JSON.stringify(plan) });
  }

  async deleteMealPlan(planId) {
    return await this.request(`/meal-plans/${planId}`, { method: 'DELETE' });
  }

  // Shopping
  async getShoppingItems() {
    return await this.request('/shopping/items') || [];
  }

  async addShoppingItem(item) {
    return await this.request('/shopping/items', { method: 'POST', body: JSON.stringify(item) });
  }

  async toggleShoppingItem(itemId) {
    return await this.request(`/shopping/items/${itemId}`, { method: 'PUT' });
  }

  async deleteShoppingItem(itemId) {
    return await this.request(`/shopping/items/${itemId}`, { method: 'DELETE' });
  }

  async getShoppingSuggestions() {
    return await this.request('/shopping/suggestions') || [];
  }

  // FlavorDB
  async getFlavourProfile(ingredient) {
    return await this.request(`/flavour/${encodeURIComponent(ingredient)}`);
  }

  async getSubstitutes(ingredient) {
    return await this.request(`/substitute?ingredient=${encodeURIComponent(ingredient)}`);
  }

  // System
  async getHealth() {
    return await this.request('/health');
  }
}

export const api = new ApiClient();
