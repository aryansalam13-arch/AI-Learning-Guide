import { Recipe, UsageData } from "@/types";

const RECIPES_KEY = "whatscookin-recipes";
const USAGE_KEY = "whatscookin-usage";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getRecipes(): Recipe[] {
  if (!isBrowser()) return [];
  try {
    const data = localStorage.getItem(RECIPES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveRecipe(recipe: Recipe): void {
  if (!isBrowser()) return;
  const recipes = getRecipes();
  recipes.unshift(recipe);
  localStorage.setItem(RECIPES_KEY, JSON.stringify(recipes));
}

export function deleteRecipe(id: string): void {
  if (!isBrowser()) return;
  const recipes = getRecipes().filter((r) => r.id !== id);
  localStorage.setItem(RECIPES_KEY, JSON.stringify(recipes));
}

export function getUsage(): UsageData {
  if (!isBrowser()) return { count: 0, resetDate: getNextResetDate() };
  try {
    const data = localStorage.getItem(USAGE_KEY);
    if (!data) return { count: 0, resetDate: getNextResetDate() };
    const usage: UsageData = JSON.parse(data);
    if (new Date(usage.resetDate) <= new Date()) {
      const reset = { count: 0, resetDate: getNextResetDate() };
      localStorage.setItem(USAGE_KEY, JSON.stringify(reset));
      return reset;
    }
    return usage;
  } catch {
    return { count: 0, resetDate: getNextResetDate() };
  }
}

export function incrementUsage(): UsageData {
  const usage = getUsage();
  usage.count += 1;
  if (isBrowser()) {
    localStorage.setItem(USAGE_KEY, JSON.stringify(usage));
  }
  return usage;
}

function getNextResetDate(): string {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString();
}
