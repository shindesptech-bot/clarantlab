// Salesforce Web-to-Lead — shared config + helpers for the ConsultationForm,
// which is rendered on both the homepage (BookingSection) and /contact.

export const WEB_TO_LEAD_ACTION =
  "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8";

export const SF_LEAD = {
  oid: "00D6g000005hvDi",
  retURL: "https://buildwithgenie.ai/thank-you",
  lead_source: "Web",
  recordType: "012PJ000001iq5Z",
} as const;

// Public client-side value (safe to ship). Secret keys must NEVER live here.
// reCAPTCHA v2 *Invisible* site key — must be registered as Invisible in the
// Google reCAPTCHA admin console for size:"invisible" to work.
export const RECAPTCHA_SITE_KEY = "6LdqjI8tAAAAAPPFKXNJotV4BIuBFnPNZWKIa1U-";

// Reject personal/free inboxes — work email only.
export const FREE_EMAIL =
  /(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|msn\.com|rediffmail\.com|icloud\.com|aol\.com|mail\.ru|yandex\.ru|mail\.com)$/i;

export function qparam(name: string): string {
  return new URLSearchParams(window.location.search).get(name) || "";
}

// "John Michael Smith" -> { first: "John Michael", last: "Smith" }.
// Single word -> first "", last = the word (per spec).
export function splitName(full: string): { first: string; last: string } {
  const trimmed = (full || "").trim();
  if (!trimmed) return { first: "", last: "" };
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return { first: "", last: parts[0] };
  const last = parts.pop() as string;
  return { first: parts.join(" "), last };
}
