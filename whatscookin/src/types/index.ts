export interface Recipe {
  id: string;
  title: string;
  description: string;
  cookTime: string;
  servings: string;
  difficulty: "Easy" | "Medium" | "Hard";
  ingredients: string[];
  instructions: string[];
  tips: string;
  inputIngredients: string;
  dietary: string;
  createdAt: string;
}

export interface UsageData {
  count: number;
  resetDate: string;
}

export const FREE_TIER_LIMIT = 5;
