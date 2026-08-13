import type { IBlogFaqItem } from "@/types";

// Canonical slug generator (matches the PublicSite blog slug algorithm). Pure.
export function toSlug(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Server-side authority on the scheduledAt field given a target status.
// Returns the value to persist, or an error message. Never trusts the client's
// future-check — re-validates the absolute instant here (timezone-agnostic).
export function resolveSchedule(
  status: string,
  scheduledAt: unknown,
): { scheduledAt: Date | null } | { error: string } {
  if (status !== "scheduled") return { scheduledAt: null };
  if (!scheduledAt) return { error: "A scheduled date and time is required." };
  const d = new Date(scheduledAt as string);
  if (isNaN(d.getTime())) return { error: "Invalid scheduled date and time." };
  if (d.getTime() <= Date.now()) return { error: "Please select a future date and time." };
  return { scheduledAt: d };
}

// Normalise a raw FAQ payload into clean {q,a} pairs, dropping any entry whose
// question is blank. Pure — safe on both server and client.
export function cleanFaq(faq: unknown): IBlogFaqItem[] {
  if (!Array.isArray(faq)) return [];
  return faq
    .map((item) => ({
      q: typeof item?.q === "string" ? item.q.trim() : "",
      a: typeof item?.a === "string" ? item.a.trim() : "",
    }))
    .filter((item) => item.q.length > 0);
}
