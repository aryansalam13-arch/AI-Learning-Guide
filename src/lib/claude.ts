import Anthropic from "@anthropic-ai/sdk";
import { OutputFormat, OUTPUT_FORMAT_LABELS } from "@/types";

const client = new Anthropic();

export async function repurposeContent(
  content: string,
  formats: OutputFormat[],
  tone: string = "professional"
): Promise<Record<OutputFormat, string>> {
  const formatInstructions = formats
    .map((f) => `- "${f}": Write a ${OUTPUT_FORMAT_LABELS[f]}`)
    .join("\n");

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    system: `You are an expert content repurposer. Given original content, you transform it into platform-specific formats.

Rules:
- Each output must be tailored to the platform's style and constraints
- Twitter/X threads: Use numbered tweets (1/, 2/, etc.), max 280 chars each, 4-8 tweets
- LinkedIn posts: Professional tone, use line breaks for readability, include a hook and CTA, 150-300 words
- Email newsletters: Include a subject line on the first line (prefixed with "Subject: "), then the body with greeting, key points, and sign-off
- Instagram captions: Engaging, use line breaks, include relevant hashtags at the end, 100-200 words
- Blog summaries: Concise 2-3 paragraph summary with key takeaways as bullet points

Tone: ${tone}

Return ONLY valid JSON with format keys and string values. No markdown code fences. Example:
{"twitter": "1/ First tweet...", "linkedin": "Content here..."}`,
    messages: [
      {
        role: "user",
        content: `Repurpose the following content into these formats:\n${formatInstructions}\n\nOriginal content:\n${content}`,
      },
    ],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";

  // Extract JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Failed to parse AI response");
  }

  const parsed = JSON.parse(jsonMatch[0]);

  // Validate all requested formats are present
  const result: Record<string, string> = {};
  for (const format of formats) {
    if (!parsed[format]) {
      throw new Error(`Missing format: ${format}`);
    }
    result[format] = parsed[format];
  }

  return result as Record<OutputFormat, string>;
}
