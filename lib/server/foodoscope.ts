/**
 * Foodoscope Live Integration Client with caching & token budget guards.
 * Supports RecipeDB (recipes, culinary queries) and FlavorDB (molecules, volatile pairing).
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const memoryCache = new Map<string, CacheEntry<any>>();

export class FoodoscopeClient {
  private apiKey: string;
  private recipeDbBase: string;
  private flavorDbBase: string;
  private cacheTtlMs: number;
  private maxCalls: number;
  private callCount: number = 0;

  constructor() {
    this.apiKey = process.env.FOODOSCOPE_API_KEY || "M2YU8qRClJdzHF6ucZr9gzUXYfoInhmGV1_YWD06-yuHIO4-";
    this.recipeDbBase = process.env.FOODOSCOPE_RECIPEDB_BASE || "https://api.foodoscope.com";
    this.flavorDbBase = process.env.FOODOSCOPE_FLAVORDB_BASE || "https://api.foodoscope.com/flavordb";
    this.cacheTtlMs = (Number(process.env.FOODOSCOPE_CACHE_TTL) || 86400) * 1000;
    this.maxCalls = Number(process.env.FOODOSCOPE_MAX_CALLS) || 150;
  }

  public isLiveEnabled(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 0);
  }

  private async fetchWithCache<T>(url: string, options: RequestInit = {}): Promise<T | null> {
    const cacheKey = url;
    const cached = memoryCache.get(cacheKey);
    const now = Date.now();

    if (cached && now - cached.timestamp < this.cacheTtlMs) {
      return cached.data as T;
    }

    if (this.callCount >= this.maxCalls) {
      console.warn(`[Foodoscope] Max calls limit reached (${this.maxCalls}). Serving cached or fallback.`);
      return cached ? cached.data : null;
    }

    try {
      this.callCount++;
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`,
        "X-API-KEY": this.apiKey,
        ...(options.headers || {}),
      };

      const res = await fetch(url, { ...options, headers });
      if (!res.ok) {
        console.warn(`[Foodoscope] HTTP ${res.status} from ${url}`);
        return cached ? cached.data : null;
      }

      const data = await res.json();
      memoryCache.set(cacheKey, { data, timestamp: now });
      return data as T;
    } catch (err) {
      console.error(`[Foodoscope] Fetch failed for ${url}:`, err);
      return cached ? cached.data : null;
    }
  }

  /**
   * Search RecipeDB for matching recipes
   */
  public async searchRecipes(query: string, limit: number = 10) {
    const url = `${this.recipeDbBase}/recipes?search=${encodeURIComponent(query)}&limit=${limit}`;
    return this.fetchWithCache<any>(url);
  }

  /**
   * Fetch details for a specific recipe
   */
  public async getRecipeDetails(recipeId: string) {
    const url = `${this.recipeDbBase}/recipes/${encodeURIComponent(recipeId)}`;
    return this.fetchWithCache<any>(url);
  }

  /**
   * Fetch FlavorDB aroma compounds for an ingredient
   */
  public async getIngredientFlavorProfile(ingredientName: string) {
    const url = `${this.flavorDbBase}/entities?name=${encodeURIComponent(ingredientName)}`;
    return this.fetchWithCache<any>(url);
  }

  /**
   * Fetch pairing molecules between two ingredients
   */
  public async getPairingSynergy(ing1: string, ing2: string) {
    const url = `${this.flavorDbBase}/pairings?ing1=${encodeURIComponent(ing1)}&ing2=${encodeURIComponent(ing2)}`;
    return this.fetchWithCache<any>(url);
  }

  public getStatus() {
    return {
      live: this.isLiveEnabled(),
      recipeDbBase: this.recipeDbBase,
      flavorDbBase: this.flavorDbBase,
      callsUsed: this.callCount,
      maxCalls: this.maxCalls,
      cacheEntries: memoryCache.size,
    };
  }
}

export const foodoscope = new FoodoscopeClient();
