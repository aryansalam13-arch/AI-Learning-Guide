"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { getUsage, incrementUsage, saveRecipe } from "@/lib/storage";
import { generateId } from "@/lib/utils";
import { FREE_TIER_LIMIT, Recipe } from "@/types";

const DIETARY_OPTIONS = [
  { value: "none", label: "No restrictions" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "gluten-free", label: "Gluten-Free" },
  { value: "dairy-free", label: "Dairy-Free" },
  { value: "keto", label: "Keto" },
  { value: "halal", label: "Halal" },
];

export default function CookPage() {
  const [ingredients, setIngredients] = useState("");
  const [dietary, setDietary] = useState("none");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const usage = mounted ? getUsage() : { count: 0, resetDate: "" };
  const remaining = FREE_TIER_LIMIT - usage.count;
  const isOverLimit = remaining <= 0;

  const handleGenerate = async () => {
    if (!ingredients.trim()) {
      setError("Tell us what ingredients you have!");
      return;
    }
    if (isOverLimit) {
      setError("You've used all your free recipes this month. Upgrade to Pro for unlimited recipes.");
      return;
    }

    setError("");
    setRecipe(null);
    setSaved(false);
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients, dietary }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      const data = await res.json();
      const newRecipe: Recipe = {
        id: generateId(),
        ...data.recipe,
        inputIngredients: ingredients,
        dietary,
        createdAt: new Date().toISOString(),
      };
      setRecipe(newRecipe);
      incrementUsage();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!recipe) return;
    saveRecipe(recipe);
    setSaved(true);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">What&apos;s in your fridge?</h1>
        <p className="mt-2 text-gray-600">
          List your ingredients and we&apos;ll create a recipe for you.
        </p>
        {mounted && (
          <p className="mt-2 text-sm text-gray-500">
            {isOverLimit
              ? "Free limit reached. Upgrade to Pro for unlimited recipes."
              : `${remaining} free recipe${remaining !== 1 ? "s" : ""} remaining this month`}
          </p>
        )}
      </div>

      {/* Input */}
      <Card className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Ingredients
        </label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="e.g. chicken thighs, rice, bell peppers, soy sauce, garlic, onion..."
          rows={4}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 resize-none"
        />
      </Card>

      {/* Dietary */}
      <Card className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Dietary Preference
        </label>
        <div className="flex flex-wrap gap-2">
          {DIETARY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setDietary(opt.value)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                dietary === opt.value
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Generate button */}
      <Button
        size="lg"
        className="w-full"
        onClick={handleGenerate}
        loading={loading}
        disabled={isOverLimit}
      >
        {loading ? "Cooking up a recipe..." : "Get Recipe"}
      </Button>

      {loading && (
        <p className="mt-4 text-center text-sm text-gray-500">
          Our AI chef is designing your meal... ~10 seconds
        </p>
      )}

      {/* Recipe Result */}
      {recipe && (
        <div className="mt-10">
          <Card>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{recipe.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{recipe.description}</p>
              </div>
              <button
                onClick={handleSave}
                disabled={saved}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  saved
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                }`}
              >
                {saved ? "Saved!" : "Save"}
              </button>
            </div>

            {/* Meta */}
            <div className="flex gap-4 mb-6 text-sm">
              <span className="inline-flex items-center gap-1 text-gray-600">
                <span>&#9200;</span> {recipe.cookTime}
              </span>
              <span className="inline-flex items-center gap-1 text-gray-600">
                <span>&#127860;</span> {recipe.servings} servings
              </span>
              <span className="inline-flex items-center gap-1 text-gray-600">
                <span>&#128200;</span> {recipe.difficulty}
              </span>
            </div>

            {/* Ingredients */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Ingredients</h3>
              <ul className="space-y-1.5">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-orange-500 mt-0.5">&#8226;</span>
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Instructions</h3>
              <ol className="space-y-3">
                {recipe.instructions.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-700">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-700 text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Tips */}
            {recipe.tips && (
              <div className="rounded-xl bg-orange-50 p-4">
                <p className="text-sm text-orange-800">
                  <span className="font-medium">Pro tip:</span> {recipe.tips}
                </p>
              </div>
            )}
          </Card>

          {/* Another recipe */}
          <div className="mt-6 text-center">
            <Button
              variant="secondary"
              onClick={handleGenerate}
              disabled={isOverLimit}
            >
              Try Another Recipe
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
