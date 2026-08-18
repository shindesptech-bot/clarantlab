"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { RecaptchaBox, type RecaptchaHandle } from "@/components/RecaptchaBox";
import { WEB_TO_LEAD_ACTION, SF_LEAD, FREE_EMAIL, qparam, splitName } from "@/lib/salesforceLead";
import type { ContactFormData } from "@/types";

const FIELDS = [
  { key: "name" as const, sfName: "full_name", label: "Full name", placeholder: "Jane Park", type: "text" },
  { key: "email" as const, sfName: "email", label: "Work email", placeholder: "jane@yourcompany.com", type: "email" },
  { key: "company" as const, sfName: "company", label: "Company name", placeholder: "Acme Co", type: "text" },
  { key: "phone" as const, sfName: "phone", label: "Phone number (optional)", placeholder: "+1 240 281 0320", type: "tel" },
];

// Mirrors the homepage form input language (BookingSection): translucent fill,
// stronger 1px line, 48px height, --radius-md, accent focus glow (scoped CSS below).
const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid var(--line-strong)",
  color: "var(--fg)",
  fontFamily: "inherit",
  fontSize: 14,
  height: 48,
  padding: "0 14px",
  borderRadius: "var(--radius-md)",
  outline: "none",
  width: "100%",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const EMPTY: ContactFormData = { name: "", email: "", company: "", phone: "" };

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [data, setData] = useState<ContactFormData>(EMPTY);

  // Hidden Salesforce fields populated synchronously right before native submit.
  const captchaRef = useRef<RecaptchaHandle>(null);
  const firstRef = useRef<HTMLInputElement>(null);
  const lastRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const srcRef = useRef<HTMLInputElement>(null);
  const medRef = useRef<HTMLInputElement>(null);
  const campRef = useRef<HTMLInputElement>(null);

  function set(k: keyof ContactFormData, v: string) {
    setData((d) => ({ ...d, [k]: v }));
    setFormError(null);
  }

  function fail(ev: React.FormEvent, msg: string) {
    ev.preventDefault();
    setFormError(msg);
    setSubmitting(false);
  }

  function submit(ev: React.FormEvent<HTMLFormElement>) {
    if (submitting) { ev.preventDefault(); return; } // no double-submit

    // Validate top-to-bottom; any failure blocks the native POST.
    // (This form has no message field, so there's no description to require.)
    if (!data.name.trim()) return fail(ev, "Please enter your name.");
    if (!data.email.trim()) return fail(ev, "Please enter your work email.");
    if (FREE_EMAIL.test(data.email.trim())) return fail(ev, "Please use your work email.");
    if (!data.company.trim()) return fail(ev, "Please enter your company name.");

    // reCAPTCHA — this form's own widget (empty also covers "not loaded yet").
    if (!captchaRef.current?.getResponse()) return fail(ev, "Please confirm you're not a robot.");

    // Passed. Fill hidden Salesforce fields, then let the browser POST to
    // Web-to-Lead — Salesforce redirects to retURL (/thank-you) on success.
    const { first, last } = splitName(data.name);
    if (firstRef.current) firstRef.current.value = first;
    if (lastRef.current) lastRef.current.value = last;
    if (urlRef.current) urlRef.current.value = window.location.href;
    if (srcRef.current) srcRef.current.value = qparam("utm_source");
    if (medRef.current) medRef.current.value = qparam("utm_medium");
    if (campRef.current) campRef.current.value = qparam("utm_campaign");
    setSubmitting(true);
    // No preventDefault — native submit proceeds to Salesforce.
  }

  return (
    <div style={{ border: "1px solid var(--line)", background: "var(--bg-1)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
      {/* Accent focus glow — matches the homepage accent system (inputs have no :focus rule inline). */}
      <style>{`.contact-field:focus { border-color: var(--accent) !important; box-shadow: 0 0 0 3px var(--accent-soft); }`}</style>
      {/* Body */}
      <div style={{ padding: "36px 36px 32px" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-soft)", marginBottom: 10 }}>Tell us about you</h2>
        <p style={{ color: "var(--fg-dim)", fontSize: "var(--text-sm)", lineHeight: 1.5, marginBottom: 28 }}>
          A few details and we'll route you to the right senior.
        </p>

        <form onSubmit={submit} action={WEB_TO_LEAD_ACTION} method="POST" noValidate>
          {/* Salesforce plumbing */}
          <input type="hidden" name="oid" defaultValue={SF_LEAD.oid} />
          <input type="hidden" name="retURL" defaultValue={SF_LEAD.retURL} />
          <input type="hidden" name="lead_source" defaultValue={SF_LEAD.lead_source} />
          <input type="hidden" name="recordType" defaultValue={SF_LEAD.recordType} />
          <input type="hidden" name="first_name" ref={firstRef} />
          <input type="hidden" name="last_name" ref={lastRef} />
          {/* UTM / source tracking — Salesforce custom-field IDs (Setup > Web-to-Lead). */}
          <input type="hidden" name="00N_FULL_URL_ID" ref={urlRef} />
          <input type="hidden" name="00N_UTM_SOURCE_ID" ref={srcRef} />
          <input type="hidden" name="00N_UTM_MEDIUM_ID" ref={medRef} />
          <input type="hidden" name="00N_UTM_CAMPAIGN_ID" ref={campRef} />

          {FIELDS.map((field) => (
            <div key={field.key} style={{ marginBottom: 18 }}>
              <label style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--fg-faint)", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>{field.label}</label>
              <input
                type={field.type}
                name={field.sfName}
                value={data[field.key]}
                onChange={(e) => set(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="contact-field"
                style={inputStyle}
              />
            </div>
          ))}

          <div style={{ marginBottom: 18 }}>
            <RecaptchaBox ref={captchaRef} />
          </div>

          {formError && (
            <p style={{ color: "#F87171", fontSize: "var(--text-sm)", marginTop: 4, marginBottom: 4 }}>{formError}</p>
          )}

          {/* Primary CTA — same energy-btn as the homepage hero/booking CTAs. */}
          <button
            type="submit"
            disabled={submitting}
            className="energy-btn energy-btn-full"
            style={{ marginTop: 8, opacity: submitting ? 0.7 : 1, cursor: submitting ? "not-allowed" : "pointer" }}
          >
            <span className="energy-shimmer" />
            <span style={{ position: "relative", zIndex: 2, display: "inline-flex", alignItems: "center", gap: 9 }}>
              {submitting ? "Sending…" : "Send it"} <ArrowRight size={17} strokeWidth={2.2} />
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
