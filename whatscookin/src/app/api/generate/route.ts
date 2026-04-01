import { NextRequest, NextResponse } from "next/server";
import { generateRecipe } from "@/lib/claude";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ingredients, dietary } = body;

    if (
      !ingredients ||
      typeof ingredients !== "string" ||
      !ingredients.trim()
    ) {
      return NextResponse.json(
        { error: "Please tell us what ingredients you have" },
        { status: 400 }
      );
    }

    if (ingredients.length > 2000) {
      return NextResponse.json(
        { error: "Ingredient list is too long" },
        { status: 400 }
      );
    }

    const recipe = await generateRecipe(ingredients, dietary || "none");
    return NextResponse.json({ recipe });
  } catch (error) {
    console.error("Recipe generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate recipe. Please try again." },
      { status: 500 }
    );
  }
}
