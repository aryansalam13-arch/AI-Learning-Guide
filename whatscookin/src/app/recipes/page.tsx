"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { getRecipes, deleteRecipe } from "@/lib/storage";
import { Recipe } from "@/types";
import { formatDate } from "@/lib/utils";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setRecipes(getRecipes());
    setMounted(true);
  }, []);

  const handleDelete = (id: string) => {
    deleteRecipe(id);
    setRecipes(getRecipes());
  };

  if (!mounted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="h-32 bg-gray-200 rounded-2xl" />
          <div className="h-32 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Recipes</h1>
          <p className="text-gray-600 mt-1">{recipes.length} saved recipe{recipes.length !== 1 ? "s" : ""}</p>
        </div>
        <Link href="/cook">
          <Button>Cook Something New</Button>
        </Link>
      </div>

      {recipes.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-3xl mb-3">📭</p>
          <p className="text-gray-500 mb-4">No saved recipes yet. Generate one and save it!</p>
          <Link href="/cook">
            <Button>Start Cooking</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {recipes.map((recipe) => (
            <Card key={recipe.id} className="hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <Link href={`/recipes/${recipe.id}`} className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900">{recipe.title}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-1">{recipe.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span>&#9200; {recipe.cookTime}</span>
                    <span>&#128200; {recipe.difficulty}</span>
                    <span>{formatDate(recipe.createdAt)}</span>
                  </div>
                </Link>
                <button
                  onClick={() => handleDelete(recipe.id)}
                  className="shrink-0 rounded-lg p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  title="Delete"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
