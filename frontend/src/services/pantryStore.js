// Reactive Pantry Store with LocalStorage Persistence

const STORAGE_KEY = 'drishyam_pantry_v1';
const FILTERS_KEY = 'drishyam_filters_v1';

const DEFAULT_PANTRY = [
  { id: '1', name: 'turmeric', category: 'Spices', confidence: 0.94, quantity: 50, unit: 'g', source: 'camera', available: true },
  { id: '2', name: 'cumin', category: 'Spices', confidence: 0.92, quantity: 100, unit: 'g', source: 'camera', available: true },
  { id: '3', name: 'garlic', category: 'Vegetables', confidence: 0.88, quantity: 80, unit: 'g', source: 'manual', available: true },
  { id: '4', name: 'onion', category: 'Vegetables', confidence: 0.95, quantity: 500, unit: 'g', source: 'camera', available: true },
  { id: '5', name: 'tomato', category: 'Vegetables', confidence: 0.91, quantity: 400, unit: 'g', source: 'camera', available: true },
  { id: '6', name: 'lentils', category: 'Legumes', confidence: 0.89, quantity: 500, unit: 'g', source: 'manual', available: true }
];

const DEFAULT_FILTERS = {
  diet: 'any',
  maxMinutes: 45,
  utensils: ['pan', 'pot'],
  goals: []
};

class PantryStore {
  constructor() {
    this.items = this.loadItems();
    this.filters = this.loadFilters();
    this.listeners = new Set();
  }

  loadItems() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return [...DEFAULT_PANTRY];
  }

  saveItems() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
    } catch (e) {}
    this.notify();
  }

  loadFilters() {
    try {
      const stored = localStorage.getItem(FILTERS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return { ...DEFAULT_FILTERS };
  }

  saveFilters() {
    try {
      localStorage.setItem(FILTERS_KEY, JSON.stringify(this.filters));
    } catch (e) {}
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.items, this.filters);
    }
  }

  addItem(name, category = 'Spices', confidence = 0.9, source = 'manual') {
    const norm = name.trim().toLowerCase();
    if (!norm) return null;

    // Check if already in pantry
    const existing = this.items.find(i => i.name.toLowerCase() === norm);
    if (existing) {
      existing.confidence = Math.max(existing.confidence, confidence);
      existing.available = true;
      this.saveItems();
      return existing;
    }

    const newItem = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 4),
      name: norm,
      category,
      confidence,
      quantity: 50,
      unit: 'g',
      source,
      available: true
    };
    this.items.unshift(newItem);
    this.saveItems();
    return newItem;
  }

  removeItem(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.saveItems();
  }

  updateItem(id, updates) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      Object.assign(item, updates);
      this.saveItems();
    }
  }

  toggleAvailable(id) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.available = !item.available;
      this.saveItems();
    }
  }

  setFilter(key, value) {
    this.filters[key] = value;
    this.saveFilters();
  }

  getActiveIngredientNames() {
    return this.items
      .filter(i => i.available)
      .map(i => i.name.toLowerCase());
  }
}

export const pantryStore = new PantryStore();
