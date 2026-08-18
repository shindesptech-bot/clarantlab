"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { RecaptchaBox, type RecaptchaHandle } from "@/components/RecaptchaBox";
import { WEB_TO_LEAD_ACTION, SF_LEAD, FREE_EMAIL, qparam, splitName } from "@/lib/salesforceLead";

// Shared "Book a Free Consultation" form — rendered identically on the homepage
// (BookingSection) and on /contact. Salesforce Web-to-Lead: validate → reCAPTCHA
// → split name + capture UTM → native POST → Salesforce redirects to retURL.

const inputStyle: React.CSSProperties = {
  width: "100%", height: 48, padding: "0 14px", fontSize: 14, fontFamily: "inherit",
  color: "var(--fg)", background: "rgba(255,255,255,0.03)", border: "1px solid var(--line-strong)",
  borderRadius: 10, outline: "none", transition: "border-color 0.2s, box-shadow 0.2s",
};
const textareaStyle: React.CSSProperties = { ...inputStyle, height: "auto", minHeight: 104, padding: "12px 14px", lineHeight: 1.5, resize: "vertical" };

type Form = { name: string; email: string; company: string; phone: string; message: string };
const EMPTY: Form = { name: "", email: "", company: "", phone: "", message: "" };

export function ConsultationForm() {
  const [data, setData] = useState<Form>(EMPTY);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Hidden Salesforce fields populated synchronously right before native submit.
  const firstRef = useRef<HTMLInputElement>(null);
  const lastRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const srcRef = useRef<HTMLInputElement>(null);
  const medRef = useRef<HTMLInputElement>(null);
  const campRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<RecaptchaHandle>(null);

  function set(k: keyof Form, v: string) {
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
    if (!data.name.trim()) return fail(ev, "Please enter your name.");
    if (!data.email.trim()) return fail(ev, "Please enter your work email.");
    if (FREE_EMAIL.test(data.email.trim())) return fail(ev, "Please use your work email.");
    if (!data.company.trim()) return fail(ev, "Please enter your company name.");
    if (!data.message.trim()) return fail(ev, "Please tell us about your business challenges.");

    // reCAPTCHA — this form's own widget (empty also covers "not loaded yet").
    if (!captchaRef.current?.getResponse()) return fail(ev, "Please confirm you're not a robot.");

    // Passed. Fill the hidden Salesforce fields, then let the browser POST to
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

  const cardStyle: React.CSSProperties = { border: "1px solid var(--line)", borderRadius: 18, background: "rgba(255,255,255,0.02)", padding: "clamp(22px,3vw,32px)" };
  const labelStyle: React.CSSProperties = { fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-soft)", margin: "0 0 22px" };

  return (
    <div style={cardStyle}>
      <h2 style={labelStyle}>Book a Free Consultation</h2>
      <form onSubmit={submit} action={WEB_TO_LEAD_ACTION} method="POST" noValidate style={{ display: "flex", flexDirection: "column", gap: 14 }}>
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

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <input type="text" name="full_name" value={data.name} onChange={(e) => set("name", e.target.value)} maxLength={80} placeholder="Full Name*" style={inputStyle} aria-label="Full name" />
          <input type="email" name="email" value={data.email} onChange={(e) => set("email", e.target.value)} maxLength={80} placeholder="Work Email*" style={inputStyle} aria-label="Work email" />
          <input type="text" name="company" value={data.company} onChange={(e) => set("company", e.target.value)} maxLength={80} placeholder="Company Name*" style={inputStyle} aria-label="Company name" />
          <input type="tel" name="phone" value={data.phone} onChange={(e) => set("phone", e.target.value)} maxLength={40} placeholder="Phone Number" style={inputStyle} aria-label="Phone number" />
        </div>
        <textarea name="description" rows={4} value={data.message} onChange={(e) => set("message", e.target.value)} placeholder="Tell us about your business challenges*" style={textareaStyle} aria-label="Message" />
        <RecaptchaBox ref={captchaRef} style={{ display: "flex", justifyContent: "center" }} />
        {formError && <div style={{ fontSize: 16, color: "#F87171" }}>{formError}</div>}
        <button type="submit" disabled={submitting} className="energy-btn energy-btn-full" style={{ marginTop: 4, opacity: submitting ? 0.7 : 1 }}>
          <span className="energy-shimmer" />
          <span style={{ position: "relative", zIndex: 2, display: "inline-flex", alignItems: "center", gap: 9 }}>
            {submitting ? "Sending…" : "Book Free Consultation"} <ArrowRight size={17} strokeWidth={2.2} />
          </span>
        </button>
      </form>
    </div>
  );
}
