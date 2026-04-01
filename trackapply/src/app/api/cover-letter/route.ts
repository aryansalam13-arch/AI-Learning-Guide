import { NextRequest, NextResponse } from "next/server";
import { generateCoverLetter } from "@/lib/claude";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { jobDescription, resumeSummary, tone } = body;

    if (!jobDescription || typeof jobDescription !== "string" || !jobDescription.trim()) {
      return NextResponse.json(
        { error: "Job description is required" },
        { status: 400 }
      );
    }

    if (!resumeSummary || typeof resumeSummary !== "string" || !resumeSummary.trim()) {
      return NextResponse.json(
        { error: "Resume / background is required" },
        { status: 400 }
      );
    }

    if (jobDescription.length > 10000) {
      return NextResponse.json(
        { error: "Job description must be under 10,000 characters" },
        { status: 400 }
      );
    }

    const validTones = ["professional", "enthusiastic", "concise"];
    const selectedTone = validTones.includes(tone) ? tone : "professional";

    const coverLetter = await generateCoverLetter(
      jobDescription,
      resumeSummary,
      selectedTone
    );

    return NextResponse.json({ coverLetter });
  } catch (error) {
    console.error("Cover letter API error:", error);
    return NextResponse.json(
      { error: "Failed to generate cover letter. Please try again." },
      { status: 500 }
    );
  }
}
