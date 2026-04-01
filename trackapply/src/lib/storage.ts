import { JobApplication, UsageData } from "@/types";

const APPS_KEY = "trackapply-applications";
const USAGE_KEY = "trackapply-usage";
const RESUME_KEY = "trackapply-resume";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

// --- Applications ---

export function getApplications(): JobApplication[] {
  if (!isBrowser()) return [];
  try {
    const data = localStorage.getItem(APPS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getApplication(id: string): JobApplication | null {
  return getApplications().find((a) => a.id === id) || null;
}

export function saveApplication(app: JobApplication): void {
  if (!isBrowser()) return;
  const apps = getApplications();
  const index = apps.findIndex((a) => a.id === app.id);
  if (index >= 0) {
    apps[index] = { ...app, updatedAt: new Date().toISOString() };
  } else {
    apps.unshift(app);
  }
  localStorage.setItem(APPS_KEY, JSON.stringify(apps));
}

export function deleteApplication(id: string): void {
  if (!isBrowser()) return;
  const apps = getApplications().filter((a) => a.id !== id);
  localStorage.setItem(APPS_KEY, JSON.stringify(apps));
}

// --- Usage ---

export function getUsage(): UsageData {
  if (!isBrowser())
    return { coverLettersGenerated: 0, resetDate: getNextResetDate() };
  try {
    const data = localStorage.getItem(USAGE_KEY);
    if (!data)
      return { coverLettersGenerated: 0, resetDate: getNextResetDate() };
    const usage: UsageData = JSON.parse(data);
    if (new Date(usage.resetDate) <= new Date()) {
      const reset = { coverLettersGenerated: 0, resetDate: getNextResetDate() };
      localStorage.setItem(USAGE_KEY, JSON.stringify(reset));
      return reset;
    }
    return usage;
  } catch {
    return { coverLettersGenerated: 0, resetDate: getNextResetDate() };
  }
}

export function incrementCoverLetterUsage(): UsageData {
  const usage = getUsage();
  usage.coverLettersGenerated += 1;
  if (isBrowser()) {
    localStorage.setItem(USAGE_KEY, JSON.stringify(usage));
  }
  return usage;
}

function getNextResetDate(): string {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString();
}

// --- Resume ---

export function getSavedResume(): string {
  if (!isBrowser()) return "";
  return localStorage.getItem(RESUME_KEY) || "";
}

export function saveResume(resume: string): void {
  if (!isBrowser()) return;
  localStorage.setItem(RESUME_KEY, resume);
}
