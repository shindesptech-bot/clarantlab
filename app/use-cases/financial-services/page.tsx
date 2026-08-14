import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { FaqCards } from "@/components/services/FaqCards";
import { SITE_URL } from "@/lib/seo";
import type { FaqItem } from "@/types";

export const metadata: Metadata = {
  // Exact meta title from the brief (absolute → skips the "— Build with Genie" template).
  title: { absolute: "AI for Financial Services | AI Solutions for Finance" },
  description:
    "Transform financial operations with AI for financial services. Build custom AI solutions for finance to automate workflows, improve insights, and reduce costs.",
  keywords: [
    "ai for financial services",
    "generative ai for financial services",
    "ai in finance",
    "ai solutions for finance",
  ],
  // Public URL is the branded /industries path (rewrites to this route).
  alternates: { canonical: "/industries/financial-services" },
};

/* ── Verbatim content from the brief (source of truth — do not edit copy) ── */

const NEED_POINTS = [
  "Automate document-heavy workflows",
  "Improve fraud detection",
  "Accelerate loan approvals",
  "Enhance customer support",
  "Strengthen compliance monitoring",
  "Generate intelligent financial insights",
  "Improve forecasting and decision-making",
];

const SOLUTIONS: { title: string; body: string; icon: string }[] = [
  {
    title: "Intelligent Customer Support",
    body: "Deploy AI-powered assistants that answer customer questions, guide users through financial products, schedule appointments, and provide 24/7 support without increasing operational costs.",
    icon: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><path d="M9 10h.01"></path><path d="M13 10h.01"></path><path d="M17 10h.01"></path>',
  },
  {
    title: "AI Document Processing",
    body: "Financial teams spend countless hours reviewing applications, contracts, tax forms, invoices, and financial statements. Our AI automates document extraction, validation, classification, and processing with high accuracy.",
    icon: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path><path d="M14 3v5h5"></path><path d="m9 15 2 2 4-4"></path>',
  },
  {
    title: "Risk Assessment & Credit Analysis",
    body: "Use AI models to analyze customer profiles, transaction history, and financial behavior to support better lending decisions and reduce business risk.",
    icon: '<path d="M3 3v18h18"></path><path d="m7 15 4-5 3 3 5-7"></path>',
  },
  {
    title: "Fraud Detection",
    body: "Monitor transactions in real time to identify suspicious activities, unusual behavior, and potential fraud before significant financial losses occur.",
    icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M12 8v4"></path><path d="M12 16h.01"></path>',
  },
  {
    title: "Financial Data Intelligence",
    body: "Convert large volumes of structured and unstructured data into meaningful insights that help executives make faster and more informed business decisions.",
    icon: '<ellipse cx="12" cy="5" rx="8" ry="3"></ellipse><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"></path><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"></path>',
  },
  {
    title: "AI Workflow Automation",
    body: "Automate repetitive finance operations including approvals, customer onboarding, compliance checks, reporting, and internal processes.",
    icon: '<path d="M12 20a8 8 0 1 0-8-8"></path><path d="M4 4v5h5"></path><path d="M12 8v4l3 2"></path>',
  },
];

const GENERATIVE_POINTS = [
  "Generate financial reports instantly",
  "Summarize lengthy financial documents",
  "Answer policy and compliance questions",
  "Assist advisors with customer recommendations",
  "Create personalized customer communications",
  "Support investment research",
  "Generate internal knowledge responses",
  "Assist customer service teams with real-time suggestions",
];

const BENEFITS: { title: string; body: string; icon: string }[] = [
  {
    title: "Faster Decision-Making",
    body: "AI analyzes large datasets within seconds, helping executives respond quickly to changing market conditions.",
    icon: '<path d="M13 2 3 14h9l-1 8 10-12h-9z"></path>',
  },
  {
    title: "Reduced Operational Costs",
    body: "Automation minimizes repetitive manual work, allowing teams to focus on strategic initiatives.",
    icon: '<path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>',
  },
  {
    title: "Better Customer Experience",
    body: "Deliver faster responses, personalized recommendations, and around-the-clock support.",
    icon: '<circle cx="12" cy="12" r="9"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><path d="M9 9h.01"></path><path d="M15 9h.01"></path>',
  },
  {
    title: "Improved Compliance",
    body: "AI continuously monitors processes and identifies compliance risks before they become costly issues.",
    icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path>',
  },
  {
    title: "Higher Productivity",
    body: "Employees spend less time on administrative work and more time serving customers and growing the business.",
    icon: '<path d="M3 17l6-6 4 4 7-7"></path><path d="M14 8h6v6"></path>',
  },
  {
    title: "Better Business Intelligence",
    body: "Gain deeper visibility into financial performance, customer behavior, and operational efficiency.",
    icon: '<path d="M3 3v18h18"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path>',
  },
];

const PARTNER_POINTS: { label: string; icon: string }[] = [
  { label: "Custom AI development tailored to your business", icon: '<path d="m16 18 6-6-6-6"></path><path d="m8 6-6 6 6 6"></path>' },
  { label: "Secure and scalable AI architecture", icon: '<rect x="3" y="4" width="18" height="4" rx="1"></rect><rect x="3" y="10" width="18" height="4" rx="1"></rect><rect x="3" y="16" width="18" height="4" rx="1"></rect>' },
  { label: "Seamless integration with existing systems", icon: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.8 1.7"></path><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.8-1.7"></path>' },
  { label: "Industry-specific AI expertise", icon: '<path d="M12 2 4 6v6c0 5.5 3.8 8.7 8 10 4.2-1.3 8-4.5 8-10V6z"></path>' },
  { label: "Ongoing optimization and support", icon: '<path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 6.7 3L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-6.7-3L3 16"></path><path d="M3 21v-5h5"></path>' },
  { label: "Enterprise-grade security and data privacy", icon: '<rect x="3" y="11" width="18" height="11" rx="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>' },
];

const FAQS: FaqItem[] = [
  { question: "What is AI for financial services?", answer: "AI for financial services refers to the use of artificial intelligence to automate financial operations, improve customer experiences, detect fraud, streamline compliance, analyze data, and support better business decisions across banks, fintech companies, insurance providers, and other financial institutions." },
  { question: "How is AI used in finance?", answer: "AI in finance is commonly used for fraud detection, credit risk analysis, customer service automation, financial forecasting, document processing, compliance monitoring, workflow automation, and personalized financial recommendations." },
  { question: "What are generative AI solutions for financial services?", answer: "Generative AI for financial services helps organizations generate reports, summarize financial documents, answer compliance questions, assist customer support teams, create personalized communications, and provide intelligent knowledge management." },
  { question: "Can AI integrate with our existing financial systems?", answer: "Yes. At Build with Genie, we develop custom AI solutions that integrate with your existing CRM, ERP, banking platforms, loan management systems, insurance software, document repositories, and other enterprise applications." },
  { question: "Is your AI solution customized for our business?", answer: "Yes. Every organization has unique processes and requirements. We develop fully customized AI solutions for finance that align with your workflows, compliance needs, security standards, and long-term business objectives." },
];

/* Layout tokens reused across sections (match the healthcare page rhythm). */
const SECTION_PAD = "clamp(64px,7vw,104px) 0";
const EYEBROW: React.CSSProperties = { fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", display: "block", marginBottom: 16 };
const LEDE: React.CSSProperties = { fontSize: "clamp(15px,1.6vw,17px)", lineHeight: 1.72, color: "var(--fg-dim)", margin: 0 };

function Ico({ markup, size = 20, color = "currentColor", stroke = 1.8 }: { markup: string; size?: number; color?: string; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: markup }} />
  );
}

/* Self-contained on-brand "finance analytics" visual (no external image) —
   mirrors the healthcare page's inline DashboardMock approach. */
function FinanceMock() {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="AI-powered financial operations dashboard" style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <linearGradient id="fs-mock-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0d1526" />
          <stop offset="1" stopColor="#070c17" />
        </linearGradient>
        <linearGradient id="fs-mock-bar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#2563eb" />
          <stop offset="1" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
      <rect width="480" height="360" fill="url(#fs-mock-bg)" />
      {/* top bar */}
      <circle cx="26" cy="26" r="5" fill="#3b82f6" opacity="0.9" />
      <rect x="40" y="21" width="130" height="10" rx="5" fill="#ffffff" opacity="0.16" />
      <rect x="392" y="18" width="62" height="16" rx="8" fill="#3b82f6" opacity="0.22" />
      {/* balance card */}
      <rect x="24" y="56" width="240" height="96" rx="12" fill="#ffffff" opacity="0.04" stroke="#ffffff" strokeOpacity="0.08" />
      <rect x="40" y="74" width="86" height="9" rx="4.5" fill="#ffffff" opacity="0.18" />
      <rect x="40" y="94" width="140" height="18" rx="6" fill="#60a5fa" opacity="0.55" />
      <rect x="40" y="124" width="120" height="7" rx="3.5" fill="#ffffff" opacity="0.10" />
      {/* KPI chip */}
      <rect x="280" y="56" width="176" height="56" rx="12" fill="#ffffff" opacity="0.04" stroke="#3b82f6" strokeOpacity="0.22" />
      <rect x="296" y="72" width="60" height="12" rx="6" fill="#60a5fa" opacity="0.7" />
      <rect x="296" y="92" width="120" height="7" rx="3.5" fill="#ffffff" opacity="0.12" />
      {/* revenue chart with trend line */}
      <rect x="280" y="128" width="176" height="208" rx="12" fill="#ffffff" opacity="0.03" stroke="#ffffff" strokeOpacity="0.07" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={300 + i * 32} y={300 - (26 + i * 20)} width="16" height={26 + i * 20} rx="4" fill="url(#fs-mock-bar)" opacity={0.55 + i * 0.09} />
      ))}
      <path d="M308 288 L340 262 L372 250 L404 214 L436 190" fill="none" stroke="#bfdbfe" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
      {/* transactions list */}
      <rect x="24" y="168" width="240" height="168" rx="12" fill="#ffffff" opacity="0.03" stroke="#ffffff" strokeOpacity="0.07" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="40" y={188 + i * 36} width="24" height="24" rx="7" fill="#3b82f6" opacity={0.28 - i * 0.04} />
          <rect x="74" y={192 + i * 36} width={130 - i * 18} height="8" rx="4" fill="#ffffff" opacity="0.12" />
          <rect x="74" y={206 + i * 36} width={70 - i * 10} height="6" rx="3" fill="#ffffff" opacity="0.07" />
          <rect x="214" y={196 + i * 36} width="34" height="9" rx="4.5" fill="#60a5fa" opacity={0.5 - i * 0.06} />
        </g>
      ))}
    </svg>
  );
}

export default function FinancialServicesAIPage() {
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
        <span aria-hidden style={{ position: "absolute", top: -180, left: "45%", width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.20), transparent 65%)", filter: "blur(20px)", pointerEvents: "none", animation: "fs-pulse 9s ease-in-out infinite" }} />
        <div className="wrap" style={{ position: "relative" }}>
          <div className="fs-hero-grid" style={{ padding: "clamp(52px,6vw,92px) 0 clamp(48px,5vw,76px)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "clamp(36px,5vw,64px)", alignItems: "center" }}>
            <div>
              <Reveal>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "7px 14px 7px 10px", borderRadius: 9999, border: "1px solid var(--accent-line)", background: "var(--accent-soft)", fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent-bright)", marginBottom: 24 }}>
                  <Ico markup='<path d="M3 3v18h18"></path><path d="m7 15 4-5 3 3 5-7"></path>' size={15} color="var(--accent)" stroke={2} />
                  Financial Services
                </div>
              </Reveal>
              <Reveal delay={60}>
                <h1 style={{ fontSize: "clamp(36px, 4.8vw, 60px)", fontWeight: 700, lineHeight: 1.04, letterSpacing: "-0.028em", margin: "0 0 18px" }}>AI for Financial Services</h1>
              </Reveal>
              <Reveal delay={120}>
                <p style={{ fontSize: "clamp(18px,2.1vw,24px)", fontWeight: 500, lineHeight: 1.35, letterSpacing: "-0.015em", margin: "0 0 20px", background: "linear-gradient(92deg, var(--fg) 10%, #7fb0fa 90%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                  Transform Financial Operations with Custom AI Solutions
                </p>
              </Reveal>
              <Reveal delay={170}>
                <p style={{ fontSize: "clamp(15px,1.7vw,17.5px)", lineHeight: 1.65, color: "var(--fg-dim)", margin: "0 0 34px", maxWidth: 560 }}>
                  Build smarter financial operations with custom AI for financial services. At Build with Genie, we develop AI solutions that automate workflows, improve decision-making, reduce operational costs, and help financial organizations deliver exceptional customer experiences.
                </p>
              </Reveal>
              <Reveal delay={230}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                  <Link href="/contact" className="energy-btn energy-btn-lg">
                    <span className="energy-shimmer" />
                    <span style={{ position: "relative", zIndex: 2, display: "inline-flex", alignItems: "center", gap: 9 }}>
                      Talk to a Financial AI Expert <ArrowRight size={17} strokeWidth={2.2} />
                    </span>
                  </Link>
                  <a href="#solutions" className="ghost-btn">Explore AI Solutions for Finance</a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={140}>
              <div style={{ position: "relative" }}>
                <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", border: "1px solid var(--line-strong)", background: "#0a1120", boxShadow: "0 40px 90px -40px rgba(0,0,0,0.9), 0 0 0 1px rgba(59,130,246,0.08)" }}>
                  <FinanceMock />
                  <div style={{ padding: "12px 16px", fontSize: 12.5, lineHeight: 1.5, color: "var(--fg-faint)", borderTop: "1px solid var(--line)", background: "rgba(6,11,22,0.6)" }}>
                    Finance teams reviewing an AI-powered financial operations dashboard.
                  </div>
                </div>
                <div style={{ position: "absolute", left: -14, bottom: -18, display: "flex", alignItems: "center", gap: 11, padding: "13px 17px", borderRadius: 14, background: "rgba(10,17,32,0.92)", border: "1px solid var(--line-strong)", backdropFilter: "blur(10px)" }}>
                  <span style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(59,130,246,0.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Ico markup='<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path>' size={18} color="var(--accent)" stroke={2} />
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--fg-soft)", lineHeight: 1.3 }}>
                    Enterprise-grade<br /><span style={{ fontWeight: 400, color: "var(--fg-faint)" }}>security &amp; data privacy</span>
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── WHY DO FINANCIAL INSTITUTIONS NEED AI? ───────────────────────── */}
      <section style={{ background: "var(--bg-0)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap" style={{ padding: SECTION_PAD }}>
          <div className="fs-2col" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "clamp(36px,5vw,72px)", alignItems: "start" }}>
            <Reveal>
              <div>
                <span style={EYEBROW}>The Shift</span>
                <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.025em", margin: "0 0 22px", maxWidth: "18ch" }}>Why Do Financial Institutions Need AI?</h2>
                <p style={{ ...LEDE, marginBottom: 18 }}>
                  The financial industry generates enormous volumes of data every day. Turning that data into actionable insights manually is slow, expensive, and often inaccurate.
                </p>
                <p style={LEDE}>
                  Modern AI in finance helps organizations automate repetitive processes, detect risks earlier, improve customer engagement, and deliver personalized financial services at scale. With custom AI solutions, businesses can:
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 2, borderTop: "1px solid var(--line)" }}>
                {NEED_POINTS.map((p, i) => (
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
              Instead of replacing employees, AI enables teams to focus on higher-value work while intelligent systems handle repetitive tasks.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── OUR AI SOLUTIONS FOR FINANCE ─────────────────────────────────── */}
      <section id="solutions" style={{ background: "var(--bg-services)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap" style={{ padding: SECTION_PAD }}>
          <div style={{ maxWidth: 760, marginBottom: "clamp(38px,4vw,56px)" }}>
            <Reveal>
              <span style={EYEBROW}>Capabilities</span>
              <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.025em", margin: "0 0 20px" }}>Our AI Solutions for Finance</h2>
              <p style={LEDE}>Every financial organization operates differently. We build custom AI solutions for finance that integrate with your existing systems and workflows.</p>
            </Reveal>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
            {SOLUTIONS.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 70}>
                <div className="fs-card" style={{ position: "relative", overflow: "hidden", padding: "clamp(24px,2.6vw,30px)", borderRadius: 18, background: "var(--bg-0)", border: "1px solid var(--line)", height: "100%" }}>
                  <span className="fs-card-ico" style={{ width: 46, height: 46, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(150deg, rgba(59,130,246,0.16), rgba(59,130,246,0.05))", border: "1px solid var(--accent-line)", color: "#7db2fb" }}>
                    <Ico markup={s.icon} size={22} stroke={1.7} />
                  </span>
                  <h3 style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.012em", margin: "18px 0 12px" }}>{s.title}</h3>
                  <p style={{ fontSize: 14.5, lineHeight: 1.68, color: "#9aa4b5", margin: 0 }}>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── GENERATIVE AI FOR FINANCIAL SERVICES ─────────────────────────── */}
      <section style={{ background: "var(--bg-0)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap" style={{ padding: SECTION_PAD }}>
          <div style={{ maxWidth: 820, marginBottom: "clamp(30px,3.5vw,44px)" }}>
            <Reveal>
              <span style={EYEBROW}>What&apos;s Next</span>
              <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.025em", margin: "0 0 20px" }}>Generative AI for Financial Services</h2>
              <p style={LEDE}>The next evolution of financial technology is generative AI for financial services. Beyond automation, generative AI helps organizations create intelligent experiences for both customers and employees. Our custom generative AI solutions can:</p>
            </Reveal>
          </div>
          <Reveal delay={60}>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
              {GENERATIVE_POINTS.map((p) => (
                <li key={p} className="fs-row" style={{ display: "flex", alignItems: "center", gap: 13, padding: "16px 18px", borderRadius: 14, border: "1px solid var(--line)", background: "rgba(255,255,255,0.03)" }}>
                  <span aria-hidden style={{ flex: "none", width: 26, height: 26, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--accent-soft)", border: "1px solid var(--accent-line)" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent-bright)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  </span>
                  <span style={{ fontSize: "clamp(14.5px,1.6vw,16px)", fontWeight: 500, color: "#e2e7f0" }}>{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <p style={{ margin: "clamp(30px,3.4vw,44px) 0 0", padding: "clamp(24px,3vw,34px) clamp(24px,3vw,38px)", borderLeft: "2px solid var(--accent)", background: "linear-gradient(90deg, rgba(59,130,246,0.10), rgba(59,130,246,0))", borderRadius: "0 16px 16px 0", fontSize: "clamp(16px,1.9vw,20px)", lineHeight: 1.6, color: "var(--fg-soft)", fontWeight: 500 }}>
              Rather than searching through hundreds of documents, employees receive accurate answers in seconds.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── BENEFITS OF AI IN FINANCE ────────────────────────────────────── */}
      <section style={{ background: "var(--bg-2)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap" style={{ padding: SECTION_PAD }}>
          <div style={{ maxWidth: 800, marginBottom: "clamp(38px,4vw,56px)" }}>
            <Reveal>
              <span style={EYEBROW}>Outcomes</span>
              <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.025em", margin: "0 0 20px" }}>Benefits of AI in Finance</h2>
              <p style={LEDE}>Organizations investing in AI in finance gain measurable improvements across operations.</p>
            </Reveal>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={(i % 3) * 70}>
                <div className="fs-card" style={{ position: "relative", overflow: "hidden", padding: "clamp(24px,2.6vw,30px)", borderRadius: 18, background: "var(--bg-0)", border: "1px solid var(--line)", height: "100%" }}>
                  <span className="fs-card-ico" style={{ width: 46, height: 46, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(150deg, rgba(59,130,246,0.16), rgba(59,130,246,0.05))", border: "1px solid var(--accent-line)", color: "#7db2fb" }}>
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

      {/* ── WHY CHOOSE BUILD WITH GENIE? ─────────────────────────────────── */}
      <section style={{ position: "relative", background: "linear-gradient(150deg, #0a1428 0%, #060b16 55%, #08101f 100%)", borderTop: "1px solid var(--line)", overflow: "hidden" }}>
        <span aria-hidden style={{ position: "absolute", right: -160, top: -120, width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.20), transparent 65%)", pointerEvents: "none", animation: "fs-pulse 11s ease-in-out infinite" }} />
        <div className="wrap" style={{ position: "relative", padding: SECTION_PAD }}>
          <div className="fs-2col" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))", gap: "clamp(36px,5vw,68px)", alignItems: "center" }}>
            <Reveal>
              <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", border: "1px solid var(--line-strong)", boxShadow: "0 40px 90px -45px rgba(0,0,0,0.95)" }}>
                <FinanceMock />
                <div style={{ padding: "12px 16px", fontSize: 12.5, lineHeight: 1.5, color: "var(--fg-faint)", borderTop: "1px solid var(--line)", background: "rgba(6,11,22,0.6)" }}>
                  AI-driven financial intelligence built around your existing systems and workflows.
                </div>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div>
                <span style={EYEBROW}>The Partnership</span>
                <h2 style={{ fontSize: "clamp(26px,3.2vw,38px)", fontWeight: 700, lineHeight: 1.14, letterSpacing: "-0.025em", margin: "0 0 20px" }}>Why Choose Build with Genie?</h2>
                <p style={{ ...LEDE, marginBottom: 16 }}>At Build with Genie, we don&apos;t believe every financial institution should use the same AI solution. We build AI around your business, not the other way around.</p>
                <p style={{ ...LEDE, marginBottom: 24 }}>Our team works closely with your stakeholders to understand your goals, existing technology, security requirements, and compliance standards before developing a custom solution that delivers measurable business value.</p>
                <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg-faint)", margin: "0 0 14px" }}>With Build with Genie, you receive:</p>
                <div style={{ display: "grid", gap: 12 }}>
                  {PARTNER_POINTS.map((p) => (
                    <div key={p.label} className="fs-row" style={{ display: "flex", alignItems: "center", gap: 14, padding: "15px 18px", borderRadius: 14, border: "1px solid var(--line)", background: "rgba(255,255,255,0.03)" }}>
                      <Ico markup={p.icon} size={19} color="var(--accent)" stroke={2} />
                      <span style={{ fontSize: 16, fontWeight: 500, color: "#e2e7f0" }}>{p.label}</span>
                    </div>
                  ))}
                </div>
                <Reveal delay={60}>
                  <p style={{ margin: "clamp(24px,2.6vw,30px) 0 clamp(24px,2.6vw,30px)", fontSize: "clamp(15px,1.7vw,17px)", lineHeight: 1.66, color: "var(--fg-soft)", fontWeight: 500 }}>
                    Whether you&apos;re a growing fintech company or a large financial enterprise, we create AI solutions that scale with your organization.
                  </p>
                </Reveal>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
                  <Link href="/contact" className="energy-btn energy-btn-lg">
                    <span className="energy-shimmer" />
                    <span style={{ position: "relative", zIndex: 2, display: "inline-flex", alignItems: "center", gap: 9 }}>
                      Book a Free Consultation <ArrowRight size={17} strokeWidth={2.2} />
                    </span>
                  </Link>
                  <a href="#faq" className="ghost-btn" style={{ background: "rgba(255,255,255,0.02)" }}>Read the FAQs</a>
                </div>
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

      {/* ── Page-scoped hover states + keyframes + responsive ─────────────── */}
      <style>{`
        @keyframes fs-pulse { 0%,100% { opacity: .45; transform: scale(1); } 50% { opacity: .9; transform: scale(1.06); } }
        .fs-card { transition: transform .25s cubic-bezier(.2,0,0,1), border-color .25s, box-shadow .25s; }
        .fs-card:hover { transform: translateY(-3px); border-color: rgba(59,130,246,0.45); box-shadow: 0 18px 44px -26px rgba(59,130,246,0.7); }
        .fs-card-ico { transition: transform .25s cubic-bezier(.2,0,0,1), box-shadow .25s, border-color .25s, background .25s; }
        .fs-card:hover .fs-card-ico { transform: translateY(-2px) scale(1.05); border-color: rgba(59,130,246,0.5); background: linear-gradient(150deg, rgba(59,130,246,0.26), rgba(59,130,246,0.08)); box-shadow: 0 0 22px -6px rgba(59,130,246,0.85); }
        .fs-row { transition: border-color .25s, background .25s, transform .25s cubic-bezier(.2,0,0,1); }
        .fs-row:hover { border-color: rgba(59,130,246,0.42); background: rgba(59,130,246,0.08); transform: translateX(3px); }
        @media (prefers-reduced-motion: reduce) { .fs-pulse, [style*="fs-pulse"] { animation: none !important; } }
      `}</style>
    </div>
  );
}
