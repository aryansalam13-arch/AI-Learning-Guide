import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function generateRecipe(
  ingredients: string,
  dietary: string = "none"
): Promise<{
  title: string;
  description: string;
  cookTime: string;
  servings: string;
  difficulty: "Easy" | "Medium" | "Hard";
  ingredients: string[];
  instructions: string[];
  tips: string;
}> {
  const dietaryNote =
    dietary && dietary !== "none"
      ? `\nDietary restriction: ${dietary}. The recipe MUST comply with this restriction.`
      : "";

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2048,
    system: `You are a creative home chef. Given a list of ingredients someone has on hand, suggest ONE delicious recipe they can make.

Rules:
- Use PRIMARILY the ingredients they listed (you may add basic pantry staples like salt, pepper, oil, butter, garlic)
- Be specific with quantities and times
- Keep it practical for a home kitchen
- Include a short, appetizing description
- Rate difficulty as Easy, Medium, or Hard${dietaryNote}

Return ONLY valid JSON (no markdown fences) in this exact format:
{
  "title": "Recipe Name",
  "description": "A short appetizing description (1-2 sentences)",
  "cookTime": "25 minutes",
  "servings": "2-3",
  "difficulty": "Easy",
  "ingredients": ["1 cup rice", "2 chicken thighs", ...],
  "instructions": ["Step 1...", "Step 2...", ...],
  "tips": "One helpful tip for this recipe"
}`,
    messages: [
      {
        role: "user",
        content: `I have these ingredients: ${ingredients}\n\nWhat can I make?`,
      },
    ],
  });

  const text =
    message.content[0].type === "text" ? message.content[0].text : "";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Failed to parse recipe");
  }
  return JSON.parse(jsonMatch[0]);
}
