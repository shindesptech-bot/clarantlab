"use client";

import { useRef, useState } from "react";
import Script from "next/script";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/home/_shared";

// reCAPTCHA v2 (checkbox) is loaded via next/script below; this narrows the
// global it exposes so getResponse() is typed without an `any` cast.
declare global {
  interface Window {
    grecaptcha?: { getResponse: (widgetId?: number) => string };
  }
}

const RECAPTCHA_SITE_KEY = "6LfV4YstAAAAAEzLL_Z5fT8_C7AWxDfITQcsF5jN";
const WEB_TO_LEAD_ACTION =
  "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8";

// Reject personal/free inboxes — work email only.
const FREE_EMAIL =
  /(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|msn\.com|rediffmail\.com|icloud\.com|aol\.com|mail\.ru|yandex\.ru|mail\.com)$/i;

function qparam(name: string): string {
  return new URLSearchParams(window.location.search).get(name) || "";
}

// "John Michael Smith" -> { first: "John Michael", last: "Smith" }.
// Single word -> first "", last = the word (per spec).
function splitName(full: string): { first: string; last: string } {
  const trimmed = (full || "").trim();
  if (!trimmed) return { first: "", last: "" };
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return { first: "", last: parts[0] };
  const last = parts.pop() as string;
  return { first: parts.join(" "), last };
}

const PROBLEMS = [
  { label: "Reduce Manual Work", paths: ["M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z"] },
  { label: "Automate Processes", paths: ["M12 2v4", "m16.2 7.8 2.9-2.9", "M18 12h4", "m16.2 16.2 2.9 2.9", "M12 18v4", "m7.8 16.2-2.9 2.9", "M2 12h4", "m7.8 7.8-2.9-2.9"] },
  { label: "Improve Customer Experience", paths: ["M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"] },
  { label: "Increase Employee Productivity", paths: ["M13 2 3 14h9l-1 8 10-12h-9z"] },
  { label: "Make Faster Decisions", paths: ["M12 2a10 10 0 1 0 10 10", "M12 6v6l4 2"] },
  { label: "Build Internal AI Assistants", paths: ["M12 8V4H8", "M4 15a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2Z", "M9 13v2", "M15 13v2"] },
  { label: "Modernize Legacy Workflows", paths: ["M3 12a9 9 0 1 0 9-9", "M3 12v-5", "M3 7h5"] },
  { label: "Improve Operational Efficiency", paths: ["M22 12h-4l-3 9L9 3l-3 9H2"] },
  { label: "Scale Business Operations", paths: ["M3 3v18h18", "m19 9-5 5-4-4-3 3"] },
  { label: "Accelerate Digital Transformation", paths: ["M5 12h14", "m12 5 7 7-7 7"] },
];

const inputStyle: React.CSSProperties = {
  width: "100%", height: 48, padding: "0 14px", fontSize: 14, fontFamily: "inherit",
  color: "var(--fg)", background: "rgba(255,255,255,0.03)", border: "1px solid var(--line-strong)",
  borderRadius: 10, outline: "none", transition: "border-color 0.2s, box-shadow 0.2s",
};
const textareaStyle: React.CSSProperties = { ...inputStyle, height: "auto", minHeight: 104, padding: "12px 14px", lineHeight: 1.5, resize: "vertical" };

type Form = { name: string; email: string; company: string; phone: string; message: string };
const EMPTY: Form = { name: "", email: "", company: "", phone: "", message: "" };

export function BookingSection() {
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
    // Validate top-to-bottom; any failure blocks the native POST.
    if (!data.name.trim()) return fail(ev, "Please enter your name.");
    if (!data.email.trim()) return fail(ev, "Please enter your work email.");
    if (FREE_EMAIL.test(data.email.trim())) return fail(ev, "Please use your work email.");
    if (!data.company.trim()) return fail(ev, "Please enter your company name.");
    if (!data.message.trim()) return fail(ev, "Please tell us about your business challenges.");

    // reCAPTCHA — also covers the "script hasn't loaded yet" case (grecaptcha undefined).
    const token = typeof window !== "undefined" && window.grecaptcha ? window.grecaptcha.getResponse() : "";
    if (!token) return fail(ev, "Please confirm you're not a robot.");

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
    <section id="book" style={{ background: "linear-gradient(180deg, var(--bg-0), var(--bg-footer))" }}>
      {/* reCAPTCHA v2 checkbox — auto-renders the .g-recaptcha widget once loaded. */}
      <Script src="https://www.google.com/recaptcha/api.js" strategy="afterInteractive" />
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(30px,4vw,56px) 28px clamp(48px,6vw,80px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 22 }}>
          {/* problems */}
          <div style={cardStyle}>
            <h2 style={{ ...labelStyle, marginBottom: 24 }}>Business Problems We Solve</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "22px 14px" }}>
              {PROBLEMS.map((pr) => (
                <div key={pr.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 10 }}>
                  <span style={{ display: "inline-flex", width: 40, height: 40, borderRadius: 11, alignItems: "center", justifyContent: "center", background: "var(--accent-soft)", border: "1px solid var(--accent-line)" }}>
                    <Icon paths={pr.paths} size={18} />
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.3, color: "var(--fg-dim)" }}>{pr.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* form */}
          <div style={cardStyle}>
            <h2 style={labelStyle}>Book a Free Consultation</h2>
            <form onSubmit={submit} action={WEB_TO_LEAD_ACTION} method="POST" noValidate style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Salesforce plumbing */}
              <input type="hidden" name="oid" defaultValue="00D6g000005hvDi" />
              <input type="hidden" name="retURL" defaultValue="https://buildwithgenie.ai/thank-you" />
              <input type="hidden" name="lead_source" defaultValue="Website - BuildWithGenie" />
              <input type="hidden" name="recordType" defaultValue="Web" />
              <input type="hidden" name="first_name" ref={firstRef} />
              <input type="hidden" name="last_name" ref={lastRef} />
              {/* ponytail: plain names — Salesforce ignores these until they're
                  mapped to real 00N custom-field IDs from Setup > Web-to-Lead. */}
              <input type="hidden" name="full_url" ref={urlRef} />
              <input type="hidden" name="utm_source" ref={srcRef} />
              <input type="hidden" name="utm_medium" ref={medRef} />
              <input type="hidden" name="utm_campaign" ref={campRef} />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <input type="text" name="full_name" value={data.name} onChange={(e) => set("name", e.target.value)} maxLength={80} placeholder="Full Name*" style={inputStyle} aria-label="Full name" />
                <input type="email" name="email" value={data.email} onChange={(e) => set("email", e.target.value)} maxLength={80} placeholder="Work Email*" style={inputStyle} aria-label="Work email" />
                <input type="text" name="company" value={data.company} onChange={(e) => set("company", e.target.value)} maxLength={80} placeholder="Company Name*" style={inputStyle} aria-label="Company name" />
                <input type="tel" name="phone" value={data.phone} onChange={(e) => set("phone", e.target.value)} maxLength={40} placeholder="Phone Number" style={inputStyle} aria-label="Phone number" />
              </div>
              <textarea name="description" rows={4} value={data.message} onChange={(e) => set("message", e.target.value)} placeholder="Tell us about your business challenges*" style={textareaStyle} aria-label="Message" />
              <div className="g-recaptcha" data-sitekey={RECAPTCHA_SITE_KEY} data-theme="dark" style={{ display: "flex", justifyContent: "center" }} />
              {formError && <div style={{ fontSize: 16, color: "#F87171" }}>{formError}</div>}
              <button type="submit" disabled={submitting} className="energy-btn energy-btn-full" style={{ marginTop: 4, opacity: submitting ? 0.7 : 1 }}>
                <span className="energy-shimmer" />
                <span style={{ position: "relative", zIndex: 2, display: "inline-flex", alignItems: "center", gap: 9 }}>
                  {submitting ? "Sending…" : "Book Free Consultation"} <ArrowRight size={17} strokeWidth={2.2} />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
