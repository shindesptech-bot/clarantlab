"use client";

import { useState } from "react";
import type { ContactFormData, ContactFormErrors } from "@/types";

const FIELDS = [
  { key: "name" as const, label: "Full name", placeholder: "Jane Park", required: true, type: "text" },
  { key: "email" as const, label: "Work email", placeholder: "jane@yourcompany.com", required: true, type: "email" },
  { key: "company" as const, label: "Company name", placeholder: "Acme Co", required: true, type: "text" },
  { key: "phone" as const, label: "Phone number (optional)", placeholder: "+1 617 555 0118", required: false, type: "tel" },
];

const inputStyle: React.CSSProperties = {
  background: "var(--bg-0)",
  border: "1px solid var(--line)",
  color: "var(--fg)",
  fontFamily: "inherit",
  fontSize: 15,
  padding: "12px 14px",
  borderRadius: 8,
  outline: "none",
  width: "100%",
  transition: "border-color 0.15s",
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
      {/* Body */}
      <div style={{ padding: "36px 36px 32px" }}>
        <h2 style={{ fontSize: 26, letterSpacing: "-0.02em", marginBottom: 6 }}>Tell us about you</h2>
        <p style={{ color: "var(--fg-dim)", fontSize: 14, marginBottom: 28 }}>
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
              <label style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-faint)", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>{field.label}</label>
              <input
                type={field.type}
                value={data[field.key]}
                onChange={(e) => set(field.key, e.target.value)}
                placeholder={field.placeholder}
                style={{ ...inputStyle, border: errs[field.key] ? "1px solid #ff8866" : "1px solid var(--line)" }}
              />
              {errs[field.key] && <p style={{ color: "#ff8866", fontSize: 12, marginTop: 4 }}>{errs[field.key]}</p>}
            </div>
          ))}

          {formError && (
            <p style={{ color: "#ff8866", fontSize: 13, marginTop: 4, marginBottom: 4 }}>{formError}</p>
          )}

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 12 }}>
            <button
              type="submit"
              disabled={submitting}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 18px", fontSize: 14, borderRadius: 8, border: "1px solid var(--accent)", background: "var(--accent)", color: "#0a0a0a", fontWeight: 500, cursor: submitting ? "not-allowed" : "pointer", opacity: submitting ? 0.7 : 1 }}
            >
              {submitting ? "Sending…" : "Send it"} <span>→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
