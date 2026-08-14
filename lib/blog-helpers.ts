import type { IBlogFaqItem } from "@/types";

// Canonical slug generator (matches the PublicSite blog slug algorithm). Pure.
export function toSlug(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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
