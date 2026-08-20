"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { RecaptchaBox, type RecaptchaHandle } from "@/components/RecaptchaBox";
import { WEB_TO_LEAD_ACTION, SF_LEAD, FREE_EMAIL, qparam, splitName } from "@/lib/salesforceLead";

// Shared "Book a Free Consultation" form — rendered identically on the homepage
// (BookingSection) and on /contact. Salesforce Web-to-Lead: validate → run the
// Invisible reCAPTCHA → write its token into g-recaptcha-response → split name +
// capture UTM → native POST → Salesforce redirects to retURL (/thank-you). Each
// instance owns its own reCAPTCHA widget, so multiple copies never interfere.

const inputStyle: React.CSSProperties = {
  width: "100%", height: 48, padding: "0 14px", fontSize: 14, fontFamily: "inherit",
  color: "var(--fg)", background: "rgba(255,255,255,0.03)", border: "1px solid var(--line-strong)",
  borderRadius: 10, outline: "none", transition: "border-color 0.2s, box-shadow 0.2s",
};

type Form = { name: string; email: string; company: string; phone: string };
const EMPTY: Form = { name: "", email: "", company: "", phone: "" };

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
  const tokenRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
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

  // Split the name + capture URL/UTM into the hidden Salesforce fields.
  function populateHidden() {
    const { first, last } = splitName(data.name);
    if (firstRef.current) firstRef.current.value = first;
    if (lastRef.current) lastRef.current.value = last;
    if (urlRef.current) urlRef.current.value = window.location.href;
    if (srcRef.current) srcRef.current.value = qparam("utm_source");
    if (medRef.current) medRef.current.value = qparam("utm_medium");
    if (campRef.current) campRef.current.value = qparam("utm_campaign");
  }

  async function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault(); // always: we submit natively after the invisible reCAPTCHA resolves
    if (submitting) return; // no double-submit

    // Validate top-to-bottom; any failure blocks submission. Phone is optional.
    if (!data.name.trim()) return fail(ev, "Please enter your name.");
    if (!data.email.trim()) return fail(ev, "Please enter your work email.");
    if (FREE_EMAIL.test(data.email.trim())) return fail(ev, "Please use your work email.");
    if (!data.company.trim()) return fail(ev, "Please enter your company name.");

    setSubmitting(true);
    // Run the Invisible reCAPTCHA (no user interaction unless Google shows a challenge).
    const token = await captchaRef.current?.execute();
    if (!token) { setFormError("Verification failed. Please try again."); setSubmitting(false); return; }

    if (tokenRef.current) tokenRef.current.value = token;
    populateHidden();
    formRef.current?.submit(); // native POST to Salesforce, which redirects to retURL
  }

  const cardStyle: React.CSSProperties = { border: "1px solid var(--line)", borderRadius: 18, background: "rgba(255,255,255,0.02)", padding: "clamp(22px,3vw,32px)" };
  const labelStyle: React.CSSProperties = { fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-soft)", margin: "0 0 22px" };

  return (
    <div style={cardStyle}>
      <h2 style={labelStyle}>Book a Free Consultation</h2>
      <form ref={formRef} onSubmit={submit} action={WEB_TO_LEAD_ACTION} method="POST" noValidate style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Salesforce plumbing */}
        <input type="hidden" name="oid" defaultValue={SF_LEAD.oid} />
        <input type="hidden" name="retURL" defaultValue={SF_LEAD.retURL} />
        <input type="hidden" name="lead_source" defaultValue={SF_LEAD.lead_source} />
        <input type="hidden" name="recordType" defaultValue={SF_LEAD.recordType} />
        <input type="hidden" name="first_name" ref={firstRef} />
        <input type="hidden" name="last_name" ref={lastRef} />
        {/* UTM / source tracking — replace these placeholder names with the real
            Salesforce custom-field IDs (Setup > Web-to-Lead) before go-live. */}
        <input type="hidden" name="00N_FULL_URL_ID" ref={urlRef} />
        <input type="hidden" name="00N_UTM_SOURCE_ID" ref={srcRef} />
        <input type="hidden" name="00N_UTM_MEDIUM_ID" ref={medRef} />
        <input type="hidden" name="00N_UTM_CAMPAIGN_ID" ref={campRef} />
        {/* Invisible reCAPTCHA token, written right before native submit. */}
        <input type="hidden" name="g-recaptcha-response" ref={tokenRef} />

        {/* One field per row — inputs are direct flex children (form gap = 14). */}
        <input type="text" value={data.name} onChange={(e) => set("name", e.target.value)} maxLength={80} placeholder="Full Name*" style={inputStyle} aria-label="Full name" />
        <input type="email" name="email" value={data.email} onChange={(e) => set("email", e.target.value)} maxLength={80} placeholder="Work Email*" style={inputStyle} aria-label="Work email" />
        <input type="text" name="company" value={data.company} onChange={(e) => set("company", e.target.value)} maxLength={80} placeholder="Company Name*" style={inputStyle} aria-label="Company name" />
        <input type="tel" name="phone" value={data.phone} onChange={(e) => set("phone", e.target.value)} maxLength={40} placeholder="Phone Number" style={inputStyle} aria-label="Phone number" />
        <RecaptchaBox ref={captchaRef} />
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
