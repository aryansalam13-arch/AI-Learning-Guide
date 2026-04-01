"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { getRecipes } from "@/lib/storage";
import { Recipe } from "@/types";
import { formatDate } from "@/lib/utils";

export default function RecipeDetailPage() {
  const params = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const recipes = getRecipes();
    const found = recipes.find((r) => r.id === params.id);
    setRecipe(found || null);
    setMounted(true);
  }, [params.id]);

  if (!mounted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 bg-gray-200 rounded" />
          <div className="h-64 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Recipe not found</h1>
        <p className="mt-2 text-gray-600">It may have been deleted.</p>
        <Link href="/recipes" className="mt-6 inline-block">
          <Button>Back to Recipes</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <Link href="/recipes" className="text-sm text-orange-600 hover:text-orange-700 font-medium mb-6 inline-block">
        &larr; Back to recipes
      </Link>

      <Card>
        <h1 className="text-2xl font-bold text-gray-900">{recipe.title}</h1>
        <p className="text-gray-600 mt-2">{recipe.description}</p>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 mt-4 mb-6 text-sm">
          <span className="inline-flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1 text-gray-600">
            &#9200; {recipe.cookTime}
          </span>
          <span className="inline-flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1 text-gray-600">
            &#127860; {recipe.servings} servings
          </span>
          <span className="inline-flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1 text-gray-600">
            &#128200; {recipe.difficulty}
          </span>
          <span className="inline-flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1 text-gray-600">
            &#128197; {formatDate(recipe.createdAt)}
          </span>
        </div>

        {/* What you had */}
        <div className="rounded-xl bg-orange-50 p-4 mb-6">
          <p className="text-sm text-orange-800">
            <span className="font-medium">Made from:</span> {recipe.inputIngredients}
          </p>
        </div>

        {/* Ingredients */}
        <div className="mb-6">
          <h2 className="font-semibold text-gray-900 mb-3">Ingredients</h2>
          <ul className="space-y-2">
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
          <h2 className="font-semibold text-gray-900 mb-3">Instructions</h2>
          <ol className="space-y-4">
            {recipe.instructions.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-700">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-700 text-xs font-bold">
                  {i + 1}
                </span>
                <span className="pt-1">{step}</span>
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

      <div className="mt-8 text-center">
        <Link href="/cook">
          <Button size="lg">Cook Something Else</Button>
        </Link>
      </div>
    </div>
  );
}
