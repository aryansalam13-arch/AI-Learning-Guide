export type OutputFormat =
  | "twitter"
  | "linkedin"
  | "email"
  | "instagram"
  | "blog_summary";

export const OUTPUT_FORMAT_LABELS: Record<OutputFormat, string> = {
  twitter: "Twitter/X Thread",
  linkedin: "LinkedIn Post",
  email: "Email Newsletter",
  instagram: "Instagram Caption",
  blog_summary: "Blog Summary",
};

export const OUTPUT_FORMAT_ICONS: Record<OutputFormat, string> = {
  twitter: "𝕏",
  linkedin: "in",
  email: "✉",
  instagram: "📷",
  blog_summary: "📝",
};

export interface RepurposeRequest {
  content: string;
  formats: OutputFormat[];
  tone?: "professional" | "casual" | "witty" | "inspirational";
}

export interface RepurposeResult {
  id: string;
  originalContent: string;
  outputs: Record<OutputFormat, string>;
  tone: string;
  createdAt: string;
}

export interface UsageData {
  count: number;
  resetDate: string;
}

export const FREE_TIER_LIMIT = 3;
