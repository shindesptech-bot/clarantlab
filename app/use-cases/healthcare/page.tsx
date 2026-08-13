import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { FaqCards } from "@/components/services/FaqCards";
import { HealthcareServices } from "@/components/healthcare/HealthcareServices";
import { SITE_URL } from "@/lib/seo";
import type { FaqItem } from "@/types";

export const metadata: Metadata = {
  title: "Healthcare AI Solutions & Services",
  description:
    "Explore healthcare AI solutions and services to automate workflows, improve patient experiences, streamline operations, and enable smarter decisions.",
  keywords: [
    "healthcare ai solutions",
    "ai in healthcare",
    "healthcare ai services",
    "artificial intelligence in healthcare",
    "generative ai in healthcare",
  ],
  // Public URL is the branded /industries path (rewrites to this route).
  alternates: { canonical: "/industries/healthcare" },
};

/* ── Verbatim content from the healthcare-ai.html reference ─────────────── */
const SHIFT_POINTS = [
  "Reduce administrative workload",
  "Improve patient engagement",
  "Improve healthcare accessibility",
  "Support data-driven decision-making",
  "Speed up clinical documentation",
  "Enhance operational efficiency",
];

const BENEFITS: { title: string; body: string; icon: string }[] = [
  {
    title: "Improved Patient Experience",
    body: "AI enables faster responses, personalized communication, and more efficient patient interactions, creating a better overall healthcare experience.",
    icon: '<path d="M19.5 12.6 12 20l-7.5-7.4A4.6 4.6 0 0 1 12 6.6a4.6 4.6 0 0 1 7.5 6z"></path><path d="M6.8 12.4h2.4L10.6 10l1.8 4.6 1.4-2.2h3"></path>',
  },
  {
    title: "Faster Clinical Documentation",
    body: "AI can assist in generating structured clinical notes, summaries, and documentation, reducing the time clinicians spend on administrative work.",
    icon: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path><path d="M14 3v5h5"></path><path d="m9 15 2 2 4-4"></path>',
  },
  {
    title: "Reduced Administrative Burden",
    body: "By automating repetitive tasks, healthcare staff can dedicate more time to patient care instead of paperwork and manual processes.",
    icon: '<path d="M4 6h5"></path><path d="M4 12h5"></path><path d="M4 18h5"></path><path d="m12.5 5.5 1.6 1.6 3.4-3.4"></path><path d="m12.5 11.5 1.6 1.6 3.4-3.4"></path><path d="M13 18h7"></path><path d="m17 15 3 3-3 3"></path>',
  },
  {
    title: "Smarter Decision Making",
    body: "AI analyzes healthcare data to uncover trends and insights that help businesses make informed strategic decisions.",
    icon: '<path d="M12 3a4 4 0 0 0-4 4c-1.4.7-2 2-2 3.4 0 1.3.6 2.4 1.6 3.1V16a3 3 0 0 0 3 3h1.4"></path><path d="M12 3a4 4 0 0 1 4 4c1.4.7 2 2 2 3.4"></path><path d="M14 21v-4"></path><path d="M17.5 21v-6"></path><path d="M21 21v-9"></path>',
  },
  {
    title: "Enhanced Employee Productivity",
    body: "Healthcare professionals gain intelligent tools that simplify daily tasks, improve collaboration, and reduce burnout caused by repetitive administrative work.",
    icon: '<path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M2 20v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1"></path><path d="M16.5 5.5a3 3 0 0 1 0 5.6"></path><path d="m18 17 2-2 2 2"></path><path d="M20 15v6"></path>',
  },
  {
    title: "Better Operational Efficiency",
    body: "Healthcare organizations can streamline scheduling, patient intake, billing, and internal workflows, leading to improved productivity.",
    icon: '<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 9 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 4.6 9a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"></path>',
  },
];

const PARTNER_POINTS: { label: string; icon: string }[] = [
  { label: "Industry-focused AI expertise", icon: '<path d="M12 2 4 6v6c0 5.5 3.8 8.7 8 10 4.2-1.3 8-4.5 8-10V6z"></path>' },
  { label: "Custom AI development", icon: '<path d="m16 18 6-6-6-6"></path><path d="m8 6-6 6 6 6"></path>' },
  { label: "Security-first development", icon: '<rect x="3" y="11" width="18" height="11" rx="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>' },
  { label: "Seamless integration", icon: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.8 1.7"></path><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.8-1.7"></path>' },
  { label: "Built for growth", icon: '<path d="M3 17l6-6 4 4 7-7"></path><path d="M14 8h6v6"></path>' },
];

const INDUSTRIES: { label: string; icon: string }[] = [
  { label: "Hospitals", icon: '<path d="M3 21h18"></path><path d="M5 21V7l7-4 7 4v14"></path><path d="M12 9v6"></path><path d="M9 12h6"></path>' },
  { label: "Diagnostic Centers", icon: '<path d="M3 12h4l2 5 4-10 2 5h6"></path>' },
  { label: "Healthcare Networks", icon: '<circle cx="12" cy="12" r="2.5"></circle><circle cx="5" cy="6" r="2"></circle><circle cx="19" cy="6" r="2"></circle><circle cx="5" cy="18" r="2"></circle><circle cx="19" cy="18" r="2"></circle><path d="m6.7 7.3 3.6 3.4M17.3 7.3l-3.6 3.4M6.7 16.7l3.6-3.4M17.3 16.7l-3.6-3.4"></path>' },
  { label: "Health Insurance Providers", icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M12 9v5"></path><path d="M9.5 11.5h5"></path>' },
  { label: "Private Clinics", icon: '<rect x="3" y="8" width="18" height="13" rx="2"></rect><path d="M9 8V5a3 3 0 0 1 6 0v3"></path><path d="M12 12v5"></path><path d="M9.5 14.5h5"></path>' },
  { label: "Behavioral Health Organizations", icon: '<path d="M12 4a4 4 0 0 0-4 4v1a4 4 0 0 0 0 8 3 3 0 0 0 4 2.8"></path><path d="M12 4a4 4 0 0 1 4 4v1a4 4 0 0 1 0 8 3 3 0 0 1-4 2.8"></path><path d="M12 4v15.8"></path>' },
  { label: "Multi-Specialty Practices", icon: '<rect x="2" y="9" width="8" height="12" rx="1.5"></rect><rect x="14" y="3" width="8" height="18" rx="1.5"></rect><path d="M5 13h2M5 17h2M17 7h2M17 11h2M17 15h2"></path>' },
];

const JOURNEY: { title: string; sub: string; icon: string; last?: boolean }[] = [
  { title: "Healthcare", sub: "Better care for every patient", icon: '<path d="M19.5 12.6 12 20l-7.5-7.4A4.6 4.6 0 0 1 12 6.6a4.6 4.6 0 0 1 7.5 6z"></path><path d="M6.8 12.4h2.4L10.6 10l1.8 4.6 1.4-2.2h3"></path>' },
  { title: "AI Transformation", sub: "Smarter technology, stronger impact", icon: '<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path><path d="M9.5 8.5 12 11"></path><path d="M6.8 15.1 12 15"></path><path d="M15 13a3 3 0 1 0 0-6"></path><path d="M18 9v.01"></path><path d="M19.5 14.5a3 3 0 1 0-4.5 2.6V19"></path>' },
  { title: "Better Outcomes", sub: "Improved results everywhere", icon: '<path d="M12 3.5 5 6v5.5c0 4 3 7.2 7 9 4-1.8 7-5 7-9V6z"></path><path d="m9.2 12.2 1.9 1.9 3.7-3.9"></path>' },
  { title: "Build with Genie", sub: "Turning your vision into reality", icon: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>', last: true },
];

const FAQS: FaqItem[] = [
  { question: "What are healthcare AI solutions?", answer: "Healthcare AI solutions are artificial intelligence applications designed to help healthcare organizations improve patient care, automate administrative tasks, analyze medical data, and optimize operational workflows. These solutions can be customized to meet the specific needs of hospitals, clinics, healthcare providers, payers, and healthcare technology companies." },
  { question: "How is AI used in healthcare?", answer: "AI in healthcare is used across various functions, including patient scheduling, clinical documentation, medical imaging support, virtual assistants, predictive analytics, billing automation, patient communication, and operational management. AI helps healthcare professionals reduce manual work while improving efficiency and decision-making." },
  { question: "What is generative AI in healthcare?", answer: "Generative AI in healthcare uses advanced AI models to create, summarize, and organize information. It can assist with generating clinical documentation, summarizing patient records, creating personalized patient communications, supporting medical research, and improving knowledge management while helping healthcare teams save time." },
  { question: "What are the benefits of using AI in healthcare?", answer: "The benefits of using AI in healthcare include improved patient experiences, reduced administrative workload, faster clinical documentation, better operational efficiency, enhanced decision-making, increased staff productivity, and scalable healthcare operations that support long-term growth." },
  { question: "What healthcare AI services does Build with Genie provide?", answer: "Build with Genie offers custom healthcare AI services tailored to your organization's requirements. Our services include AI application development, workflow automation, AI-powered virtual assistants, generative AI solutions, healthcare analytics, intelligent document processing, and seamless integration with existing healthcare systems." },
  { question: "Can healthcare AI solutions be customized for our organization?", answer: "Absolutely. Every healthcare organization has unique workflows and business objectives. Build with Genie specializes in developing custom healthcare AI solutions that align with your operational requirements, existing infrastructure, and long-term goals." },
  { question: "Why choose Build with Genie for healthcare AI services?", answer: "Rather than offering one-size-fits-all software, Build with Genie designs and develop custom AI solutions tailored to your business. Our team works closely with healthcare organizations to build secure, scalable, and intelligent AI applications that improve patient care, streamline operations, and deliver measurable business value." },
];

/* Layout tokens reused across sections (match the ai-integration page rhythm). */
const SECTION_PAD = "clamp(64px,7vw,104px) 0";
const EYEBROW: React.CSSProperties = { fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", display: "block", marginBottom: 16 };
const LEDE: React.CSSProperties = { fontSize: "clamp(15px,1.6vw,17px)", lineHeight: 1.72, color: "var(--fg-dim)", margin: 0 };

function Ico({ markup, size = 20, color = "currentColor", stroke = 1.8 }: { markup: string; size?: number; color?: string; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: markup }} />
  );
}

/* Lightweight inline "AI patient dashboard" mock — replaces the reference photo
   slot with a self-contained, on-brand visual (no external image needed). */
function DashboardMock() {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="AI-powered patient summary dashboard" style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <linearGradient id="hc-mock-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0d1526" />
          <stop offset="1" stopColor="#070c17" />
        </linearGradient>
        <linearGradient id="hc-mock-bar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#2563eb" />
          <stop offset="1" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
      <rect width="480" height="360" fill="url(#hc-mock-bg)" />
      {/* top bar */}
      <circle cx="26" cy="26" r="5" fill="#3b82f6" opacity="0.9" />
      <rect x="40" y="21" width="120" height="10" rx="5" fill="#ffffff" opacity="0.16" />
      <rect x="392" y="18" width="62" height="16" rx="8" fill="#3b82f6" opacity="0.22" />
      {/* patient card */}
      <rect x="24" y="56" width="240" height="120" rx="12" fill="#ffffff" opacity="0.04" stroke="#ffffff" strokeOpacity="0.08" />
      <circle cx="56" cy="88" r="16" fill="#3b82f6" opacity="0.28" />
      <rect x="82" y="80" width="110" height="9" rx="4.5" fill="#ffffff" opacity="0.22" />
      <rect x="82" y="96" width="70" height="8" rx="4" fill="#ffffff" opacity="0.12" />
      <rect x="40" y="124" width="208" height="7" rx="3.5" fill="#ffffff" opacity="0.10" />
      <rect x="40" y="140" width="176" height="7" rx="3.5" fill="#ffffff" opacity="0.10" />
      <rect x="40" y="156" width="120" height="7" rx="3.5" fill="#ffffff" opacity="0.10" />
      {/* metric chips */}
      <rect x="280" y="56" width="176" height="56" rx="12" fill="#ffffff" opacity="0.04" stroke="#3b82f6" strokeOpacity="0.22" />
      <rect x="296" y="72" width="60" height="12" rx="6" fill="#60a5fa" opacity="0.7" />
      <rect x="296" y="92" width="120" height="7" rx="3.5" fill="#ffffff" opacity="0.12" />
      {/* chart */}
      <rect x="280" y="128" width="176" height="208" rx="12" fill="#ffffff" opacity="0.03" stroke="#ffffff" strokeOpacity="0.07" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={300 + i * 32} y={300 - (26 + i * 20)} width="16" height={26 + i * 20} rx="4" fill="url(#hc-mock-bar)" opacity={0.55 + i * 0.09} />
      ))}
      {/* activity list */}
      <rect x="24" y="192" width="240" height="144" rx="12" fill="#ffffff" opacity="0.03" stroke="#ffffff" strokeOpacity="0.07" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx="48" cy={220 + i * 30} r="6" fill="#3b82f6" opacity={0.75 - i * 0.12} />
          <rect x="66" y={216 + i * 30} width={150 - i * 22} height="8" rx="4" fill="#ffffff" opacity="0.12" />
        </g>
      ))}
    </svg>
  );
}

export default function HealthcareAIPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", background: "var(--bg-hero)", overflow: "hidden" }}>
        <span aria-hidden style={{ position: "absolute", top: -180, left: "45%", width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.20), transparent 65%)", filter: "blur(20px)", pointerEvents: "none", animation: "hc-pulse 9s ease-in-out infinite" }} />
        <div className="wrap" style={{ position: "relative" }}>
          <div className="hc-hero-grid" style={{ padding: "clamp(52px,6vw,92px) 0 clamp(48px,5vw,76px)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "clamp(36px,5vw,64px)", alignItems: "center" }}>
            <div>
              <Reveal>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "7px 14px 7px 10px", borderRadius: 9999, border: "1px solid var(--accent-line)", background: "var(--accent-soft)", fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent-bright)", marginBottom: 24 }}>
                  <Ico markup='<path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>' size={15} color="var(--accent)" stroke={2} />
                  Healthcare
                </div>
              </Reveal>
              <Reveal delay={60}>
                <h1 style={{ fontSize: "clamp(36px, 4.8vw, 60px)", fontWeight: 700, lineHeight: 1.04, letterSpacing: "-0.028em", margin: "0 0 18px" }}>AI for Healthcare Solutions</h1>
              </Reveal>
              <Reveal delay={120}>
                <p style={{ fontSize: "clamp(18px,2.1vw,24px)", fontWeight: 500, lineHeight: 1.35, letterSpacing: "-0.015em", margin: "0 0 20px", background: "linear-gradient(92deg, var(--fg) 10%, #7fb0fa 90%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                  Intelligent AI. Better Healthcare. Greater Impact.
                </p>
              </Reveal>
              <Reveal delay={170}>
                <p style={{ fontSize: "clamp(15px,1.7vw,17.5px)", lineHeight: 1.65, color: "var(--fg-dim)", margin: "0 0 34px", maxWidth: 540 }}>
                  Transform healthcare with AI tailored to your organization. Our custom healthcare AI services improve efficiency, streamline workflows, and elevate patient experiences.
                </p>
              </Reveal>
              <Reveal delay={230}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                  <Link href="/contact" className="energy-btn energy-btn-lg">
                    <span className="energy-shimmer" />
                    <span style={{ position: "relative", zIndex: 2, display: "inline-flex", alignItems: "center", gap: 9 }}>
                      Talk to a Healthcare AI Expert <ArrowRight size={17} strokeWidth={2.2} />
                    </span>
                  </Link>
                  <a href="#services" className="ghost-btn">Explore Healthcare AI Services</a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={140}>
              <div style={{ position: "relative" }}>
                <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", border: "1px solid var(--line-strong)", background: "#0a1120", boxShadow: "0 40px 90px -40px rgba(0,0,0,0.9), 0 0 0 1px rgba(59,130,246,0.08)" }}>
                  <DashboardMock />
                  <div style={{ padding: "12px 16px", fontSize: 12.5, lineHeight: 1.5, color: "var(--fg-faint)", borderTop: "1px solid var(--line)", background: "rgba(6,11,22,0.6)" }}>
                    Healthcare professionals reviewing an AI-powered patient summary dashboard.
                  </div>
                </div>
                <div style={{ position: "absolute", left: -14, bottom: -18, display: "flex", alignItems: "center", gap: 11, padding: "13px 17px", borderRadius: 14, background: "rgba(10,17,32,0.92)", border: "1px solid var(--line-strong)", backdropFilter: "blur(10px)" }}>
                  <span style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(59,130,246,0.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Ico markup='<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path>' size={18} color="var(--accent)" stroke={2} />
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--fg-soft)", lineHeight: 1.3 }}>
                    Security-first<br /><span style={{ fontWeight: 400, color: "var(--fg-faint)" }}>healthcare AI development</span>
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── WHY AI IS TRANSFORMING HEALTHCARE ────────────────────────────── */}
      <section style={{ background: "var(--bg-0)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap" style={{ padding: SECTION_PAD }}>
          <div className="hc-2col" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "clamp(36px,5vw,72px)", alignItems: "start" }}>
            <Reveal>
              <div>
                <span style={EYEBROW}>The Shift</span>
                <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.025em", margin: "0 0 22px", maxWidth: "15ch" }}>Why AI is Transforming Healthcare?</h2>
                <p style={{ ...LEDE, marginBottom: 18 }}>
                  The adoption of AI in healthcare is changing how organizations manage patient care, clinical operations, medical records, scheduling, billing, and administrative tasks. Instead of replacing healthcare professionals, AI enables them to spend less time on manual work and more time focusing on patients. Healthcare organizations are using AI to:
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 2, borderTop: "1px solid var(--line)" }}>
                {SHIFT_POINTS.map((p, i) => (
                  <li key={p} style={{ display: "flex", alignItems: "center", gap: 18, padding: "20px 6px", borderBottom: "1px solid var(--line)" }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", letterSpacing: "0.08em", minWidth: 26 }}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ fontSize: "clamp(15px,1.7vw,18px)", fontWeight: 500, color: "#e2e7f0" }}>{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal>
            <p style={{ margin: "clamp(40px,4vw,56px) 0 0", padding: "clamp(24px,3vw,34px) clamp(24px,3vw,38px)", borderLeft: "2px solid var(--accent)", background: "linear-gradient(90deg, rgba(59,130,246,0.10), rgba(59,130,246,0))", borderRadius: "0 16px 16px 0", fontSize: "clamp(16px,1.9vw,20px)", lineHeight: 1.6, color: "var(--fg-soft)", fontWeight: 500 }}>
              As artificial intelligence in healthcare continues to evolve, organizations that invest in custom AI solutions gain a significant advantage in efficiency, scalability, and patient satisfaction.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── OUR HEALTHCARE AI SERVICES (interactive) ─────────────────────── */}
      <section id="services" style={{ background: "var(--bg-services)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap" style={{ padding: SECTION_PAD }}>
          <div style={{ maxWidth: 760, marginBottom: "clamp(38px,4vw,56px)" }}>
            <Reveal>
              <span style={EYEBROW}>Capabilities</span>
              <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.025em", margin: "0 0 20px" }}>Our Healthcare AI Services</h2>
              <p style={LEDE}>Every healthcare organization operates differently. That&apos;s why we don&apos;t offer one-size-fits-all products. Our healthcare AI services are designed around your specific business requirements, existing systems, compliance needs, and long-term goals.</p>
            </Reveal>
          </div>
          <Reveal>
            <HealthcareServices />
          </Reveal>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────────────── */}
      <section style={{ background: "var(--bg-2)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap" style={{ padding: SECTION_PAD }}>
          <div style={{ maxWidth: 800, marginBottom: "clamp(38px,4vw,56px)" }}>
            <Reveal>
              <span style={EYEBROW}>Outcomes</span>
              <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.025em", margin: "0 0 20px" }}>Benefits of Using AI in Healthcare</h2>
              <p style={LEDE}>Implementing AI is not just about adopting new technology, it&apos;s about improving healthcare delivery across every department.</p>
            </Reveal>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={(i % 3) * 70}>
                <div className="hc-benefit" style={{ position: "relative", overflow: "hidden", padding: "clamp(24px,2.6vw,30px)", borderRadius: 18, background: "var(--bg-0)", border: "1px solid var(--line)", height: "100%" }}>
                  <span className="hc-benefit-ico" style={{ width: 46, height: 46, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(150deg, rgba(59,130,246,0.16), rgba(59,130,246,0.05))", border: "1px solid var(--accent-line)", color: "#7db2fb" }}>
                    <Ico markup={b.icon} size={22} stroke={1.7} />
                  </span>
                  <h3 style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.012em", margin: "18px 0 12px" }}>{b.title}</h3>
                  <p style={{ fontSize: 14.5, lineHeight: 1.68, color: "#9aa4b5", margin: 0 }}>{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE BUILD WITH GENIE ──────────────────────────────────── */}
      <section style={{ background: "var(--bg-hero)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap" style={{ padding: SECTION_PAD }}>
          <div className="hc-2col" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))", gap: "clamp(36px,5vw,68px)", alignItems: "center" }}>
            <Reveal>
              <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", border: "1px solid var(--line-strong)", boxShadow: "0 40px 90px -45px rgba(0,0,0,0.95)" }}>
                <DashboardMock />
                <div style={{ padding: "12px 16px", fontSize: 12.5, lineHeight: 1.5, color: "var(--fg-faint)", borderTop: "1px solid var(--line)", background: "rgba(6,11,22,0.6)" }}>
                  Digital healthcare analytics dashboard powered by AI in a hospital operations environment.
                </div>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div>
                <span style={EYEBROW}>The Partnership</span>
                <h3 style={{ fontSize: "clamp(26px,3.2vw,38px)", fontWeight: 700, lineHeight: 1.14, letterSpacing: "-0.025em", margin: "0 0 20px" }}>Why Choose Build with Genie for Healthcare AI Solutions?</h3>
                <p style={{ ...LEDE, marginBottom: 28 }}>Choosing the right AI partner is just as important as choosing the right technology. At Build with Genie, we focus on building custom AI solutions that align with your healthcare organization&apos;s objectives rather than offering generic software. You gain:</p>
                <div style={{ display: "grid", gap: 12 }}>
                  {PARTNER_POINTS.map((p) => (
                    <div key={p.label} className="hc-row" style={{ display: "flex", alignItems: "center", gap: 14, padding: "15px 18px", borderRadius: 14, border: "1px solid var(--line)", background: "rgba(255,255,255,0.03)" }}>
                      <Ico markup={p.icon} size={19} color="var(--accent)" stroke={2} />
                      <span style={{ fontSize: 16, fontWeight: 500, color: "#e2e7f0" }}>{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES WE SUPPORT ────────────────────────────────────────── */}
      <section style={{ background: "var(--bg-0)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap" style={{ padding: "clamp(60px,6vw,92px) 0" }}>
          <Reveal>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: 18, marginBottom: "clamp(30px,3.5vw,44px)" }}>
              <div>
                <span style={EYEBROW}>Who We Serve</span>
                <h3 style={{ fontSize: "clamp(26px,3.2vw,38px)", fontWeight: 700, lineHeight: 1.14, letterSpacing: "-0.025em", margin: 0 }}>Industries We Support</h3>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--fg-dim)", margin: 0, maxWidth: 460 }}>Our healthcare AI solutions are designed for a wide range of organizations, including:</p>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14 }}>
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.label} delay={(i % 4) * 50}>
                <div className="hc-tile" style={{ display: "flex", alignItems: "center", gap: 13, padding: "20px", borderRadius: 16, border: "1px solid var(--line)", background: "linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0.012))", height: "100%" }}>
                  <Ico markup={ind.icon} size={20} color="var(--accent-hover)" />
                  <span style={{ fontSize: 15.5, fontWeight: 500, color: "#e2e7f0" }}>{ind.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONCLUSION / CTA ─────────────────────────────────────────────── */}
      <section style={{ position: "relative", background: "linear-gradient(150deg, #0a1428 0%, #060b16 55%, #08101f 100%)", borderTop: "1px solid var(--line)", overflow: "hidden" }}>
        <span aria-hidden style={{ position: "absolute", right: -160, top: -120, width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.20), transparent 65%)", pointerEvents: "none", animation: "hc-pulse 11s ease-in-out infinite" }} />
        <span aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(rgba(96,165,250,0.16) 1px, transparent 1px)", backgroundSize: "34px 34px", maskImage: "radial-gradient(60% 55% at 88% 78%, #000, transparent 70%)", WebkitMaskImage: "radial-gradient(60% 55% at 88% 78%, #000, transparent 70%)" }} />
        <div className="wrap" style={{ position: "relative", padding: "clamp(40px,4.4vw,66px) 0" }}>
          <div className="hc-conc-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.14fr) minmax(0, 0.86fr)", gap: "clamp(28px,3.6vw,64px)", alignItems: "center" }}>
            <div style={{ minWidth: 0 }}>
              <Reveal>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "7px 16px", border: "1px solid rgba(96,165,250,0.34)", borderRadius: 9999, background: "var(--accent-soft)", marginBottom: "clamp(18px,2.2vw,26px)" }}>
                  <span aria-hidden style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent-hover)", boxShadow: "0 0 10px rgba(96,165,250,0.9)" }} />
                  <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent-bright)" }}>Conclusion</span>
                </div>
              </Reveal>
              <Reveal delay={60}>
                <h2 style={{ fontSize: "clamp(24px,2.9vw,34px)", fontWeight: 700, lineHeight: 1.26, letterSpacing: "-0.026em", margin: "0 0 clamp(24px,2.8vw,34px)" }}>
                  The future of AI in healthcare is centered on delivering <span style={{ color: "var(--accent-hover)" }}>better patient outcomes</span>, improving <span style={{ color: "var(--accent-hover)" }}>operational efficiency</span>, and empowering healthcare professionals with <span style={{ color: "var(--accent-hover)" }}>intelligent technology</span>.
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <div style={{ border: "1px solid var(--line)", borderRadius: 18, background: "rgba(255,255,255,0.014)", padding: "clamp(18px,2vw,24px)" }}>
                  {[
                    { icon: '<path d="M8 8h.01"></path><path d="M12 8h.01"></path><path d="M16 8h.01"></path><path d="M8 12h.01"></path><path d="M12 12h.01"></path><path d="M16 12h.01"></path><path d="M8 16h.01"></path><path d="M12 16h.01"></path><path d="M16 16h.01"></path>', text: "Whether you're looking to automate workflows, enhance patient engagement, implement generative AI in healthcare, or build entirely custom AI applications, Build with Genie can help you turn your vision into reality." },
                    { icon: '<path d="M9.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M3.5 19v-.8a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4V19"></path><path d="M16.5 5.6a3 3 0 0 1 0 5.5"></path><path d="M18 14.4a4 4 0 0 1 2.5 3.7V19"></path>', text: "Our team works closely with healthcare organizations to design, develop, and deploy scalable healthcare AI services that solve real business problems and create measurable impact." },
                  ].map((row, i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "auto minmax(0,1fr)", gap: 18, alignItems: "start", paddingTop: i ? 20 : 0, marginTop: i ? 20 : 0, borderTop: i ? "1px solid var(--line)" : "none" }}>
                      <span aria-hidden style={{ width: 38, height: 38, flex: "none", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(96,165,250,0.3)", background: "var(--accent-soft)", color: "#8fbefc" }}>
                        <Ico markup={row.icon} size={17} stroke={1.7} />
                      </span>
                      <p style={{ fontSize: "clamp(14.5px,1.5vw,15.5px)", lineHeight: 1.72, color: "#b3bccb", margin: 0 }}>{row.text}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={140}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginTop: "clamp(20px,2.4vw,28px)" }}>
                  <Link href="/contact" className="energy-btn energy-btn-lg">
                    <span className="energy-shimmer" />
                    <span style={{ position: "relative", zIndex: 2, display: "inline-flex", alignItems: "center", gap: 9 }}>
                      Book a Free Consultation <ArrowRight size={17} strokeWidth={2.2} />
                    </span>
                  </Link>
                  <a href="#faq" className="ghost-btn" style={{ background: "rgba(255,255,255,0.02)" }}>Read the FAQs</a>
                </div>
              </Reveal>
            </div>

            {/* Animated journey diagram (decorative) */}
            <Reveal delay={120}>
              <div aria-hidden className="hc-journey" style={{ display: "grid", justifyItems: "start", alignSelf: "center" }}>
                {JOURNEY.map((n, i) => (
                  <div key={n.title} style={{ display: "contents" }}>
                    <div className="hc-jnode" style={{ display: "grid", gridTemplateColumns: "auto minmax(0,1fr)", alignItems: "center", gap: 16 }}>
                      <span className="hc-jring" data-last={n.last} style={{ position: "relative", width: 52, height: 52, flex: "none", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${n.last ? "rgba(96,165,250,0.7)" : "rgba(96,165,250,0.34)"}`, background: n.last ? "radial-gradient(circle at 50% 40%, rgba(59,130,246,0.26), rgba(9,14,26,0.6))" : "radial-gradient(circle at 50% 40%, rgba(59,130,246,0.14), rgba(9,14,26,0.6))", boxShadow: n.last ? "0 0 30px -6px rgba(59,130,246,0.9)" : "0 0 18px -8px rgba(59,130,246,0.6)", color: n.last ? "#bfdbfe" : "#8fbefc", animation: `hc-node-in .5s cubic-bezier(.2,0,0,1) both`, animationDelay: `${0.15 + i * 0.35}s` }}>
                        <Ico markup={n.icon} size={22} stroke={1.6} />
                      </span>
                      <span style={{ display: "grid", gap: 4, minWidth: 0 }}>
                        <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.012em", color: n.last ? "var(--accent-hover)" : "var(--fg)" }}>{n.title}</span>
                        <span style={{ fontSize: 12.5, lineHeight: 1.45, color: "var(--fg-faint)" }}>{n.sub}</span>
                      </span>
                    </div>
                    {!n.last && (
                      <span className="hc-jlink" style={{ width: 1, height: 54, marginLeft: 26, position: "relative", overflow: "hidden", background: "linear-gradient(180deg, rgba(96,165,250,0.55), rgba(96,165,250,0.18))", transformOrigin: "top", animation: "hc-line-draw .4s cubic-bezier(.2,0,0,1) both", animationDelay: `${0.32 + i * 0.35}s` }}>
                        <span style={{ display: "block", width: "100%", height: "40%", background: "linear-gradient(180deg, transparent, #bfdbfe, transparent)", animation: "hc-signal-down 3.2s cubic-bezier(.2,0,0,1) infinite", animationDelay: `${i * 0.5}s` }} />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FAQs ─────────────────────────────────────────────────────────── */}
      <section id="faq" style={{ background: "var(--bg-services)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap" style={{ padding: SECTION_PAD, maxWidth: 980 }}>
          <Reveal>
            <div style={{ marginBottom: "clamp(32px,3.5vw,48px)" }}>
              <span style={EYEBROW}>Answers</span>
              <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.025em", margin: 0 }}>FAQs</h2>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <FaqCards items={FAQS} />
          </Reveal>
        </div>
      </section>

      {/* ── Page-scoped hover states + journey keyframes + responsive ────── */}
      <style>{`
        @keyframes hc-pulse { 0%,100% { opacity: .45; transform: scale(1); } 50% { opacity: .9; transform: scale(1.06); } }
        @keyframes hc-node-in { from { opacity: 0; transform: scale(.86); } to { opacity: 1; transform: none; } }
        @keyframes hc-line-draw { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes hc-signal-down { 0% { transform: translateY(-120%); opacity: 0; } 25% { opacity: 1; } 100% { transform: translateY(280%); opacity: 0; } }
        .hc-benefit { transition: transform .25s cubic-bezier(.2,0,0,1), border-color .25s, box-shadow .25s; }
        .hc-benefit:hover { transform: translateY(-3px); border-color: rgba(59,130,246,0.45); box-shadow: 0 18px 44px -26px rgba(59,130,246,0.7); }
        .hc-benefit-ico { transition: transform .25s cubic-bezier(.2,0,0,1), box-shadow .25s, border-color .25s, background .25s; }
        .hc-benefit:hover .hc-benefit-ico { transform: translateY(-2px) scale(1.05); border-color: rgba(59,130,246,0.5); background: linear-gradient(150deg, rgba(59,130,246,0.26), rgba(59,130,246,0.08)); box-shadow: 0 0 22px -6px rgba(59,130,246,0.85); }
        .hc-row { transition: border-color .25s, background .25s, transform .25s cubic-bezier(.2,0,0,1); }
        .hc-row:hover { border-color: rgba(59,130,246,0.42); background: rgba(59,130,246,0.08); transform: translateX(3px); }
        .hc-tile { transition: border-color .25s, transform .25s cubic-bezier(.2,0,0,1), box-shadow .25s; }
        .hc-tile:hover { border-color: rgba(59,130,246,0.45); transform: translateY(-3px); box-shadow: 0 16px 40px -26px rgba(59,130,246,0.75); }
        .hc-jnode:hover .hc-jring { transform: scale(1.07); border-color: rgba(96,165,250,0.75); box-shadow: 0 0 26px -6px rgba(59,130,246,0.95); }
        @media (max-width: 900px) { .hc-conc-grid { grid-template-columns: 1fr !important; } .hc-journey { order: -1; } }
        @media (prefers-reduced-motion: reduce) { .hc-jring, .hc-jlink, .hc-jlink > span { animation: none !important; } }
      `}</style>
    </div>
  );
}
