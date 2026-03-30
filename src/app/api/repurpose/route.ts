import { NextRequest, NextResponse } from "next/server";
import { repurposeContent } from "@/lib/claude";
import { OutputFormat } from "@/types";

const VALID_FORMATS: OutputFormat[] = [
  "twitter",
  "linkedin",
  "email",
  "instagram",
  "blog_summary",
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, formats, tone } = body;

    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    if (content.length > 15000) {
      return NextResponse.json(
        { error: "Content must be under 15,000 characters" },
        { status: 400 }
      );
    }

    if (!formats || !Array.isArray(formats) || formats.length === 0) {
      return NextResponse.json(
        { error: "At least one output format is required" },
        { status: 400 }
      );
    }

    for (const f of formats) {
      if (!VALID_FORMATS.includes(f)) {
        return NextResponse.json(
          { error: `Invalid format: ${f}` },
          { status: 400 }
        );
      }
    }

    const validTones = ["professional", "casual", "witty", "inspirational"];
    const selectedTone = validTones.includes(tone) ? tone : "professional";

    const outputs = await repurposeContent(content, formats, selectedTone);

    return NextResponse.json({ outputs });
  } catch (error) {
    console.error("Repurpose API error:", error);
    return NextResponse.json(
      { error: "Failed to repurpose content. Please try again." },
      { status: 500 }
    );
  }
}
