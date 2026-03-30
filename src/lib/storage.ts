import { RepurposeResult, UsageData } from "@/types";

const RESULTS_KEY = "repurpose-results";
const USAGE_KEY = "repurpose-usage";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getResults(): RepurposeResult[] {
  if (!isBrowser()) return [];
  try {
    const data = localStorage.getItem(RESULTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveResult(result: RepurposeResult): void {
  if (!isBrowser()) return;
  const results = getResults();
  results.unshift(result);
  localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
}

export function deleteResult(id: string): void {
  if (!isBrowser()) return;
  const results = getResults().filter((r) => r.id !== id);
  localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
}

export function getUsage(): UsageData {
  if (!isBrowser()) return { count: 0, resetDate: getNextResetDate() };
  try {
    const data = localStorage.getItem(USAGE_KEY);
    if (!data) return { count: 0, resetDate: getNextResetDate() };
    const usage: UsageData = JSON.parse(data);
    if (new Date(usage.resetDate) <= new Date()) {
      const reset = { count: 0, resetDate: getNextResetDate() };
      localStorage.setItem(USAGE_KEY, JSON.stringify(reset));
      return reset;
    }
    return usage;
  } catch {
    return { count: 0, resetDate: getNextResetDate() };
  }
}

export function incrementUsage(): UsageData {
  const usage = getUsage();
  usage.count += 1;
  if (isBrowser()) {
    localStorage.setItem(USAGE_KEY, JSON.stringify(usage));
  }
  return usage;
}

function getNextResetDate(): string {
  const now = new Date();
  const reset = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return reset.toISOString();
}
