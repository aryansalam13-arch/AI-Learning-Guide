export type ApplicationStatus =
  | "saved"
  | "applied"
  | "interviewing"
  | "offer"
  | "rejected"
  | "withdrawn";

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  saved: "Saved",
  applied: "Applied",
  interviewing: "Interviewing",
  offer: "Offer",
  rejected: "Rejected",
  withdrawn: "Withdrawn",
};

export const STATUS_COLORS: Record<ApplicationStatus, string> = {
  saved: "bg-gray-100 text-gray-700",
  applied: "bg-blue-100 text-blue-700",
  interviewing: "bg-amber-100 text-amber-700",
  offer: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  withdrawn: "bg-gray-100 text-gray-500",
};

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  location: string;
  status: ApplicationStatus;
  appliedDate: string;
  url: string;
  salary: string;
  notes: string;
  contactName: string;
  contactEmail: string;
  createdAt: string;
  updatedAt: string;
}

export interface CoverLetterRequest {
  jobDescription: string;
  resumeSummary: string;
  tone: "professional" | "enthusiastic" | "concise";
}

export interface UsageData {
  coverLettersGenerated: number;
  resetDate: string;
}

export const FREE_TIER_LIMIT = 3;
