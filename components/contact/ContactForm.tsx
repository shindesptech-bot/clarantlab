"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { ContactFormData, ContactFormErrors } from "@/types";

const FIELDS = [
  { key: "name" as const, label: "Full name", placeholder: "Jane Park", required: true, type: "text" },
  { key: "email" as const, label: "Work email", placeholder: "jane@yourcompany.com", required: true, type: "email" },
  { key: "company" as const, label: "Company name", placeholder: "Acme Co", required: true, type: "text" },
  { key: "phone" as const, label: "Phone number (optional)", placeholder: "+1 240 281 0320", required: false, type: "tel" },
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
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [data, setData] = useState<ContactFormData>(EMPTY);
  const [errs, setErrs] = useState<ContactFormErrors>({});

  function set(k: keyof ContactFormData, v: string) {
    setData((d) => ({ ...d, [k]: v }));
    setErrs((e) => ({ ...e, [k]: undefined }));
    setFormError(null);
  }

  function validate(): boolean {
    const e: ContactFormErrors = {};
    if (!data.name.trim()) e.name = "Required.";
    if (!data.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) e.email = "A valid email please.";
    if (!data.company.trim()) e.company = "Required.";
    setErrs(e);
    return Object.keys(e).length === 0;
  }

  async function submit() {
    if (!validate()) return;
    setSubmitting(true);
    setFormError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim(),
          company: data.company.trim(),
          phone: data.phone.trim(),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setFormError(body?.error ?? "Something went wrong. Please try again.");
        return;
      }

      setSubmittedName(data.name.trim());
      setData(EMPTY); // Clear the form after a successful submission.
      setDone(true);
    } catch {
      setFormError("Network error — please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div style={{ border: "1px solid var(--line)", background: "var(--bg-1)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
        <div style={{ padding: "56px 36px", textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--accent-soft)", border: "1px solid var(--accent-line)", color: "var(--accent)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 18 }}>✓</div>
          <h2 style={{ fontSize: 28, marginBottom: 10 }}>Got it, {submittedName.split(" ")[0]}.</h2>
          <p style={{ color: "var(--fg-dim)", maxWidth: "40ch", margin: "0 auto" }}>
            Thanks for reaching out — we've received your details and a senior will be in touch within the next business hour.
          </p>
        </div>
      </div>
    );
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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          {FIELDS.map((field) => (
            <div key={field.key} style={{ marginBottom: 18 }}>
              <label style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--fg-faint)", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>{field.label}</label>
              <input
                type={field.type}
                value={data[field.key]}
                onChange={(e) => set(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="contact-field"
                style={{ ...inputStyle, border: errs[field.key] ? "1px solid #F87171" : "1px solid var(--line-strong)" }}
              />
              {errs[field.key] && <p style={{ color: "#F87171", fontSize: "var(--text-xs)", marginTop: 4 }}>{errs[field.key]}</p>}
            </div>
          ))}

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
