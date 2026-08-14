"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Icon } from "@/components/home/_shared";

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
  const [done, setDone] = useState(false);

  function set(k: keyof Form, v: string) {
    setData((d) => ({ ...d, [k]: v }));
    setFormError(null);
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!data.name.trim() || !data.email.trim() || !data.company.trim() || !data.message.trim()) {
      setFormError("Please fill in the required fields.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
      setFormError("Please enter a valid work email.");
      return;
    }
    setSubmitting(true);
    setFormError(null);
    try {
      // /api/contact stores name/email/company/phone; industry & message are sent
      // for completeness (ignored server-side until the backend is extended).
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name.trim(), email: data.email.trim(), company: data.company.trim(),
          phone: data.phone.trim(), message: data.message.trim(),
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setFormError(body?.error ?? "Something went wrong. Please try again.");
        return;
      }
      setDone(true);
    } catch {
      setFormError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const cardStyle: React.CSSProperties = { border: "1px solid var(--line)", borderRadius: 18, background: "rgba(255,255,255,0.02)", padding: "clamp(22px,3vw,32px)" };
  const labelStyle: React.CSSProperties = { fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-soft)", margin: "0 0 22px" };

  return (
    <section id="book" style={{ background: "linear-gradient(180deg, var(--bg-0), var(--bg-footer))" }}>
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
            {done ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "40px 12px" }}>
                <div style={{ width: 64, height: 64, borderRadius: 9999, background: "rgba(59,130,246,0.14)", border: "1px solid var(--accent-line)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  <Check size={30} color="var(--accent-bright)" strokeWidth={2.6} />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 8px", color: "#fff" }}>Thank you</h3>
                <p style={{ fontSize: 14, color: "var(--fg-dim)", margin: 0, maxWidth: 320 }}>Your request is in. An AI expert will reach out within one business day.</p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <input type="text" value={data.name} onChange={(e) => set("name", e.target.value)} placeholder="Full Name*" style={inputStyle} aria-label="Full name" />
                  <input type="email" value={data.email} onChange={(e) => set("email", e.target.value)} placeholder="Work Email*" style={inputStyle} aria-label="Work email" />
                  <input type="text" value={data.company} onChange={(e) => set("company", e.target.value)} placeholder="Company Name*" style={inputStyle} aria-label="Company name" />
                  <input type="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} placeholder="Phone Number" style={inputStyle} aria-label="Phone number" />
                </div>
                <textarea rows={4} value={data.message} onChange={(e) => set("message", e.target.value)} placeholder="Tell us about your business challenges*" style={textareaStyle} aria-label="Message" />
                {formError && <div style={{ fontSize: 16, color: "#F87171" }}>{formError}</div>}
                <button type="submit" disabled={submitting} className="energy-btn energy-btn-full" style={{ marginTop: 4, opacity: submitting ? 0.7 : 1 }}>
                  <span className="energy-shimmer" />
                  <span style={{ position: "relative", zIndex: 2, display: "inline-flex", alignItems: "center", gap: 9 }}>
                    {submitting ? "Sending…" : "Book Free Consultation"} <ArrowRight size={17} strokeWidth={2.2} />
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
