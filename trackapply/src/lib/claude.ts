import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function generateCoverLetter(
  jobDescription: string,
  resumeSummary: string,
  tone: string = "professional"
): Promise<string> {
  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2048,
    system: `You are an expert career coach and cover letter writer. Write a compelling, personalized cover letter based on the job description and the candidate's resume/background.

Rules:
- Match the candidate's experience to the job requirements
- Be specific — reference actual skills and achievements from the resume
- Keep it to 3-4 paragraphs (250-400 words)
- Include a strong opening hook, relevant experience highlights, and a confident closing
- Do NOT use generic filler phrases like "I am writing to express my interest"
- Tone: ${tone}
- Output ONLY the cover letter text, no extra commentary`,
    messages: [
      {
        role: "user",
        content: `Write a cover letter for this job:\n\n--- JOB DESCRIPTION ---\n${jobDescription}\n\n--- MY BACKGROUND ---\n${resumeSummary}`,
      },
    ],
  });

  const text =
    message.content[0].type === "text" ? message.content[0].text : "";
  return text.trim();
}
