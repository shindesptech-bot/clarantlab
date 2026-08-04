import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { FaqCards } from "@/components/services/FaqCards";
import type { FaqItem } from "@/types";

export const metadata: Metadata = {
  title: "AI Integration Services | Custom Enterprise AI Solutions",
  description:
    "Connect AI with your existing business systems using custom AI integration services. Automate workflows, improve productivity, and scale with enterprise AI solutions.",
};

/* ── Inline stroke-icon (supports circle/rect/path markup like the design) ── */
function Ico({ markup, size = 20, stroke = "var(--accent-bright)" }: { markup: string; size?: number; stroke?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}

const ICON = {
  plug: '<path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0z"></path><path d="M12 18v4"></path>',
  cube: '<path d="m12 2 9 5v10l-9 5-9-5V7z"></path><path d="M12 12 3 7M12 12l9-5M12 12v10"></path>',
  flow: '<rect x="3" y="3" width="7" height="7" rx="2"></rect><rect x="14" y="14" width="7" height="7" rx="2"></rect><path d="M10 6.5h4a3 3 0 0 1 3 3V14"></path>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"></path>',
  clock: '<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path>',
  chart: '<path d="M3 3v18h18"></path><path d="m7 14 4-4 3 3 5-6"></path>',
  smile: '<circle cx="12" cy="12" r="9"></circle><path d="M8 14a5 5 0 0 0 8 0"></path><path d="M9 9h.01M15 9h.01"></path>',
  heart: '<path d="M12 21s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9z"></path>',
  bank: '<path d="m3 10 9-6 9 6"></path><path d="M5 10v9M19 10v9M9 10v9M15 10v9M3 21h18"></path>',
  shield: '<path d="M12 2 4 6v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10V6z"></path>',
  factory: '<path d="M3 21V9l6 4V9l6 4V4h6v17z"></path>',
  cart: '<circle cx="9" cy="20" r="1.6"></circle><circle cx="18" cy="20" r="1.6"></circle><path d="M2 3h3l2.6 12h11L21 7H6"></path>',
  gavel: '<path d="m14 3 7 7-3 3-7-7z"></path><path d="m9 8 7 7"></path><path d="M4 21h10"></path>',
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"></path>',
  chip: '<rect x="6" y="6" width="12" height="12" rx="2"></rect><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"></path>',
  users: '<circle cx="9" cy="8" r="3.5"></circle><path d="M2.5 20a6.5 6.5 0 0 1 13 0"></path><path d="M17 8.5a3 3 0 0 1 0 5M18 20a6.6 6.6 0 0 0-2-4.4"></path>',
};

/* ── Verbatim content (single source of truth — do not edit wording) ────── */
const INTRO_PARAS = [
  "AI can only deliver real business value when it works seamlessly with the systems your teams already use. Our AI integration services help businesses connect AI with CRMs, ERPs, cloud platforms, customer support tools, databases, and custom applications to automate workflows, improve decision-making, and increase productivity.",
  "Whether you're a growing business or a large enterprise, we build AI solutions that fit your existing technology. Every integration is designed around your goals, processes, and infrastructure.",
];

const CONNECT_PARAS = [
  "Many organizations invest in AI but struggle to integrate it with their current software. Disconnected systems create data silos, duplicate work, and inconsistent experiences for employees and customers.",
  "Our AI integration solutions eliminate these challenges by connecting AI to the platforms your business already relies on. Instead of creating another standalone tool, we make AI a natural part of your daily operations.",
  "As an experienced AI integration company, we help businesses integrate AI into sales, customer service, finance, HR, operations, and other business functions with minimal disruption.",
];

const SERVICES_INTRO =
  "Every business has unique workflows and technology requirements. That's why we provide custom AI integration services designed specifically for your organization.";

const SERVICES = [
  { t: "Enterprise AI Integration", d: "Large organizations often use multiple business applications across departments. Our Enterprise AI integration services connect AI with enterprise platforms to streamline operations, improve collaboration, and enable intelligent automation across the organization.", icon: ICON.cube },
  { t: "AI Software Integration", d: "Modern businesses rely on a variety of software platforms. Our AI software integration services connect AI with your existing applications, including CRM systems, ERP platforms, customer support software, document management systems, marketing automation tools, communication platforms, internal knowledge bases, and custom business applications.", icon: ICON.plug },
  { t: "Business AI Integration", d: "Our Business AI integration approach focuses on solving operational challenges rather than simply deploying new technology. We integrate AI to help businesses automate repetitive workflows, reduce manual tasks, improve customer experiences, generate business insights, speed up decision-making, and improve employee productivity.", icon: ICON.flow },
];

const CUSTOM_INTRO =
  "Generic AI tools often require businesses to change their workflows. We believe your AI should adapt to your business, not the other way around. Our custom AI integration services are built around your existing infrastructure, business rules, and operational processes. This provides:";

const CUSTOM_POINTS = [
  "Faster adoption across teams",
  "Higher security and compliance",
  "Better accuracy using your business data",
  "Seamless integration with existing software",
  "Flexible scalability as your business grows",
];

const BENEFITS = [
  { t: "Improve Productivity", d: "Employees spend less time switching between applications and more time focusing on valuable work.", icon: ICON.bolt },
  { t: "Better Business Decisions", d: "AI can analyze data across multiple systems to provide faster and more accurate insights.", icon: ICON.chart },
  { t: "Reduce Manual Work", d: "Automating repetitive tasks improves efficiency while reducing operational costs.", icon: ICON.clock },
  { t: "Better Customer Experiences", d: "Connected AI enables faster responses, personalized interactions, and more consistent customer service.", icon: ICON.smile },
];

const PROCESS_INTRO =
  "We follow a structured approach that minimizes risk while delivering measurable business outcomes.";

const STEPS = [
  { n: "01", t: "Business Discovery", d: "We begin by understanding your business goals, existing software, workflows, and integration requirements." },
  { n: "02", t: "Solution Design", d: "Our experts design AI integration solutions that fit your technology stack while identifying opportunities for automation and operational improvements." },
  { n: "03", t: "Development and Integration", d: "We develop and integrate AI with your existing systems using secure APIs, cloud services, and modern integration frameworks." },
  { n: "04", t: "Testing and Optimization", d: "Before deployment, we thoroughly test every integration to ensure accuracy, reliability, security, and performance." },
  { n: "05", t: "Deployment and Ongoing Support", d: "After launch, we monitor system performance, optimize workflows, and provide ongoing support as your business evolves." },
];

const INDUSTRIES_INTRO =
  "Our AI integration company works with organizations across multiple industries, including:";
const INDUSTRIES_OUTRO =
  "Every project is customized to meet industry-specific workflows, compliance requirements, and business goals.";

const INDUSTRIES = [
  { t: "Healthcare", icon: ICON.heart },
  { t: "Financial Services", icon: ICON.bank },
  { t: "Insurance", icon: ICON.shield },
  { t: "Manufacturing", icon: ICON.factory },
  { t: "Retail", icon: ICON.cart },
  { t: "Real Estate", icon: ICON.home },
  { t: "Legal", icon: ICON.gavel },
  { t: "Professional Services", icon: ICON.users },
  { t: "Technology", icon: ICON.chip },
];

const PARTNER_INTRO =
  "Choosing the right partner is just as important as choosing the right technology. When you work with us, you get:";
const PARTNER_OUTRO =
  "We don't believe in one-size-fits-all AI. Every solution is designed to solve real business challenges while fitting naturally into your existing operations.";

const PARTNER_POINTS = [
  "Tailored AI integration services built around your business",
  "Deep expertise in AI software integration",
  "Flexible custom AI integration services for companies of all sizes",
  "Scalable Enterprise AI integration strategies",
  "Secure, reliable, and future-ready implementations",
  "End-to-end support from planning through deployment and optimization",
];

const FAQS: FaqItem[] = [
  { question: "What are AI integration services?", answer: "AI integration services involve connecting AI technologies with your existing business systems, applications, and workflows. This allows organizations to automate processes, improve decision-making, and increase efficiency without replacing their current software." },
  { question: "What is Enterprise AI integration?", answer: "Enterprise AI integration is the process of integrating AI across multiple departments and enterprise applications such as CRM, ERP, customer support, HR, and finance systems. It enables organizations to streamline operations, share data securely, and scale AI initiatives across the business." },
  { question: "Why should I choose custom AI integration services instead of off-the-shelf AI tools?", answer: "Custom AI integration services are built around your business processes, existing software, and specific goals. Unlike generic AI tools, custom integrations provide better accuracy, smoother workflows, greater flexibility, and easier adoption by your teams." },
  { question: "How do you ensure data security during AI integration?", answer: "As an experienced AI integration company, we follow industry best practices for data security, secure API connections, encryption, user access controls, and compliance with applicable regulations to ensure your business data remains protected throughout the integration process." },
  { question: "Can AI integrate with our existing systems without replacing them?", answer: "Yes. Our AI integration solutions are designed to work with your existing technology stack. In most cases, AI can be integrated with your current software, allowing you to improve operations without replacing your existing systems." },
  { question: "Do you provide support after the AI integration is complete?", answer: "Yes. We provide ongoing monitoring, maintenance, optimization, and support to ensure your AI integration services continue to perform efficiently as your business grows and your technology evolves." },
];

// Decorative hero diagram — system names drawn from the systems named in the intro copy.
const NODE_LABELS = ["CRM", "ERP", "Cloud", "Databases", "Customer Support", "Applications"];
const NODES = NODE_LABELS.map((label, i) => {
  const ang = (i / NODE_LABELS.length) * Math.PI * 2 - Math.PI / 2;
  return { label, x: 50 + Math.cos(ang) * 34, y: 50 + Math.sin(ang) * 36, i };
});

// Homepage section rhythm + typography tokens (reused verbatim, no new values).
const SECTION_PAD = "clamp(48px,6vw,88px) 28px";
const HEAD_MB = "clamp(28px,3.5vw,44px)";
const CARD_TITLE: React.CSSProperties = { fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em", color: "var(--fg)" };
const BODY: React.CSSProperties = { fontSize: 16, lineHeight: 1.6, color: "var(--fg-dim)" };
const LEDE: React.CSSProperties = { fontSize: "clamp(16px,1.7vw,19px)", lineHeight: 1.6, color: "var(--fg-dim)" };

export default function AiIntegrationServicesPage() {
  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
      {/* ── HERO / H1 ────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", background: "radial-gradient(1200px 620px at 78% 8%, rgba(37,99,235,0.20), transparent 62%), var(--bg-hero)", borderBottom: "1px solid var(--line)" }}>
        <div aria-hidden style={{ position: "absolute", inset: "-10%", background: "radial-gradient(520px 380px at 20% 80%, rgba(59,130,246,0.10), transparent 70%)", animation: "aii-drift 22s ease-in-out infinite alternate", pointerEvents: "none" }} />
        <div className="aii-hero-grid" style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "clamp(48px,6vw,96px) 28px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "clamp(40px,5vw,72px)", alignItems: "center" }}>
          <div>
            <Reveal>
              <h1 style={{ margin: "0 0 24px", textWrap: "balance" }}>AI Integration Services</h1>
            </Reveal>
            {INTRO_PARAS.map((p, i) => (
              <Reveal key={i} delay={80 + i * 60}>
                <p style={{ ...LEDE, margin: i === 0 ? "0 0 20px" : "0 0 32px", maxWidth: 640 }}>{p}</p>
              </Reveal>
            ))}
            <Reveal delay={220}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                <Link href="/contact" className="energy-btn energy-btn-lg">
                  <span className="energy-shimmer" />
                  <span style={{ position: "relative", zIndex: 2, display: "inline-flex", alignItems: "center", gap: 9 }}>
                    Contact Us <ArrowRight size={17} strokeWidth={2.2} />
                  </span>
                </Link>
                <Link href="/contact" className="ghost-btn">Book a Consultation</Link>
              </div>
            </Reveal>
          </div>

          {/* Orbital AI-core diagram (illustration) */}
          <Reveal delay={120}>
            <div style={{ position: "relative", minHeight: 460, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "relative", width: "100%", maxWidth: 520, aspectRatio: "1/1", borderRadius: 28, border: "1px solid var(--line)", background: "linear-gradient(160deg, rgba(20,30,52,0.85), rgba(8,13,26,0.9))", overflow: "hidden", boxShadow: "0 40px 90px -50px rgba(37,99,235,0.9)" }}>
                <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 60% at 50% 50%, rgba(59,130,246,0.16), transparent 70%)" }} />
                <svg viewBox="0 0 400 400" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                  <circle cx="200" cy="200" r="118" fill="none" stroke="rgba(255,255,255,0.07)" />
                  <circle cx="200" cy="200" r="164" fill="none" stroke="rgba(255,255,255,0.05)" />
                  <g stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" opacity="0.75">
                    {NODES.map((n) => (
                      <line key={n.label} x1={200} y1={200} x2={n.x * 4} y2={n.y * 4} strokeDasharray="5 7" style={{ animation: `aii-dash ${2.6 + n.i * 0.22}s linear infinite` }} />
                    ))}
                  </g>
                </svg>
                <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 128, height: 128, borderRadius: "50%", background: "radial-gradient(circle at 40% 34%, #5B9BFF, #1D4ED8 62%, #0F2A6B)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, boxShadow: "0 0 60px -6px rgba(59,130,246,0.75), inset 0 0 30px rgba(255,255,255,0.16)", animation: "aii-pulse 4.2s ease-in-out infinite" }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="4" /><path d="M9 9h6v6H9z" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" /></svg>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", color: "#EAF1FF" }}>AI CORE</span>
                </div>
                {NODES.map((n) => (
                  <div key={n.label} style={{ position: "absolute", left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%,-50%)", padding: "7px 13px", borderRadius: 999, fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 500, color: "#D6E2F7", background: "rgba(11,18,36,0.92)", border: "1px solid rgba(120,160,240,0.32)", boxShadow: "0 8px 24px -14px rgba(0,0,0,0.9)", whiteSpace: "nowrap", animation: `aii-float ${5 + n.i * 0.4}s ease-in-out ${n.i * 0.2}s infinite` }}>
                    {n.label}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CONNECT AI WITH YOUR EXISTING BUSINESS SYSTEMS ───────────────── */}
      <section style={{ background: "var(--bg-services)", padding: SECTION_PAD, borderBlock: "1px solid var(--line)" }}>
        <div className="aii-2col" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(360px,1fr))", gap: "clamp(36px,5vw,72px)", alignItems: "center" }}>
          {/* Left: content */}
          <div>
            <Reveal>
              <h2 style={{ textWrap: "balance", margin: `0 0 ${HEAD_MB}`, maxWidth: 520 }}>Connect AI with Your Existing Business Systems</h2>
            </Reveal>
            <div style={{ display: "grid", gap: 20, maxWidth: 560 }}>
              {CONNECT_PARAS.map((p, i) => (
                <Reveal key={i} delay={60 + i * 60}>
                  <p style={{ ...BODY, margin: 0 }}>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right: integration illustration */}
          <Reveal delay={120}>
            <div style={{ position: "relative", borderRadius: 24, border: "1px solid var(--line)", overflow: "hidden", boxShadow: "0 40px 90px -55px rgba(37,99,235,0.9)" }}>
              <img
                src="/assets/ai-integration-systems.png"
                alt="AI connected to CRM, Sales, Customer Service, HR, Marketing, Data & Analytics, Operations, and Finance systems"
                width={1536}
                height={1024}
                loading="lazy"
                style={{ display: "block", width: "100%", height: "auto" }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── OUR AI INTEGRATION SERVICES ──────────────────────────────────── */}
      <section style={{ background: "var(--bg-hero)", padding: SECTION_PAD }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ maxWidth: 760, marginBottom: HEAD_MB }}>
            <Reveal><h2 style={{ textWrap: "balance", margin: "0 0 18px" }}>Our AI Integration Services</h2></Reveal>
            <Reveal delay={60}><p style={{ ...LEDE, margin: 0 }}>{SERVICES_INTRO}</p></Reveal>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 18 }}>
            {SERVICES.map((s, i) => (
              <Reveal key={s.t} delay={i * 70}>
                <div className="aii-card" style={{ position: "relative", height: "100%", padding: "28px 26px", borderRadius: 20, border: "1px solid var(--line)", background: "linear-gradient(170deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))", overflow: "hidden" }}>
                  <span aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(80% 60% at 50% 0%, rgba(59,130,246,0.14), transparent 70%)", opacity: 0.9 }} />
                  <span style={{ position: "relative", display: "flex", width: 44, height: 44, borderRadius: 13, alignItems: "center", justifyContent: "center", background: "var(--accent-soft)", border: "1px solid var(--accent-line)", marginBottom: 20 }}>
                    <Ico markup={s.icon} size={20} />
                  </span>
                  <h3 style={{ ...CARD_TITLE, position: "relative", margin: "0 0 12px" }}>{s.t}</h3>
                  <p style={{ ...BODY, position: "relative", margin: 0 }}>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE CUSTOM AI INTEGRATION ─────────────────────────────── */}
      <section style={{ background: "var(--bg-services)", padding: SECTION_PAD, borderBlock: "1px solid var(--line)" }}>
        <div className="aii-2col" style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "clamp(32px,4vw,60px)", alignItems: "center" }}>
          <div>
            <Reveal><h2 style={{ textWrap: "balance", margin: "0 0 20px" }}>Why Choose Custom AI Integration Instead of Off-the-Shelf Solutions?</h2></Reveal>
            <Reveal delay={60}><p style={{ ...BODY, margin: 0, maxWidth: 520 }}>{CUSTOM_INTRO}</p></Reveal>
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            {CUSTOM_POINTS.map((c, i) => (
              <Reveal key={c} delay={i * 50}>
                <div className="aii-soft" style={{ display: "flex", gap: 13, alignItems: "flex-start", padding: "16px 18px", borderRadius: 14, border: "1px solid var(--line)", background: "rgba(255,255,255,0.03)", transition: "border-color .28s, background .28s" }}>
                  <span style={{ flex: "0 0 auto", width: 24, height: 24, borderRadius: 8, background: "rgba(52,211,153,0.14)", border: "1px solid rgba(52,211,153,0.32)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--good)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  </span>
                  <span style={{ fontSize: 16, lineHeight: 1.5, color: "var(--fg-soft)" }}>{c}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS OF AI INTEGRATION ───────────────────────────────────── */}
      <section style={{ background: "var(--bg-hero)", padding: SECTION_PAD }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal><h2 style={{ textWrap: "balance", marginBottom: HEAD_MB }}>Benefits of AI Integration for Your Business</h2></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
            {BENEFITS.map((b, i) => (
              <Reveal key={b.t} delay={(i % 4) * 70}>
                <div className="aii-card" style={{ position: "relative", height: "100%", padding: "26px 24px", borderRadius: 20, border: "1px solid var(--line)", background: "linear-gradient(170deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))", overflow: "hidden" }}>
                  <span aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(70% 60% at 20% 0%, rgba(59,130,246,0.16), transparent 68%)" }} />
                  <span style={{ position: "relative", display: "flex", width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center", background: "var(--accent-soft)", border: "1px solid var(--accent-line)", marginBottom: 18 }}>
                    <Ico markup={b.icon} size={19} />
                  </span>
                  <h3 style={{ ...CARD_TITLE, position: "relative", margin: "0 0 9px" }}>{b.t}</h3>
                  <p style={{ ...BODY, position: "relative", margin: 0 }}>{b.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR AI INTEGRATION PROCESS ───────────────────────────────────── */}
      <section style={{ background: "var(--bg-services)", padding: SECTION_PAD, borderBlock: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ maxWidth: 760, marginBottom: HEAD_MB }}>
            <Reveal><h2 style={{ textWrap: "balance", margin: "0 0 18px" }}>Our AI Integration Process</h2></Reveal>
            <Reveal delay={60}><p style={{ ...LEDE, margin: 0 }}>{PROCESS_INTRO}</p></Reveal>
          </div>
          <Reveal className="aii-tl">
            <div style={{ position: "relative" }}>
              <div aria-hidden style={{ position: "absolute", left: 0, right: 0, top: 21, height: 2, background: "var(--line-strong)" }} />
              <div aria-hidden className="aii-tl-line" style={{ position: "absolute", left: 0, top: 21, height: 2, width: 0, background: "linear-gradient(90deg,var(--accent-deep),var(--accent-hover))", boxShadow: "0 0 14px rgba(59,130,246,0.8)", transition: "width 1.9s cubic-bezier(.2,0,0,1)" }} />
              <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 22 }}>
                {STEPS.map((p) => (
                  <div key={p.n}>
                    <span style={{ display: "flex", width: 44, height: 44, borderRadius: "50%", alignItems: "center", justifyContent: "center", background: "var(--bg-services)", border: "1px solid var(--accent-line)", fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: "var(--accent-bright)", boxShadow: "0 0 22px -6px rgba(59,130,246,0.9)", marginBottom: 18 }}>{p.n}</span>
                    <h3 style={{ ...CARD_TITLE, fontSize: 17, margin: "0 0 8px" }}>{p.t}</h3>
                    <p style={{ ...BODY, fontSize: 13.5, margin: 0 }}>{p.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── INDUSTRIES WE SERVE ──────────────────────────────────────────── */}
      <section style={{ background: "var(--bg-hero)", padding: SECTION_PAD }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal><h2 style={{ textWrap: "balance", margin: "0 0 16px" }}>Industries We Serve</h2></Reveal>
          <Reveal delay={60}><p style={{ ...LEDE, margin: `0 0 ${HEAD_MB}`, maxWidth: 720 }}>{INDUSTRIES_INTRO}</p></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14 }}>
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.t} delay={(i % 4) * 50}>
                <div className="aii-industry" style={{ display: "flex", alignItems: "center", gap: 14, padding: "20px", borderRadius: 16, border: "1px solid var(--line)", background: "rgba(255,255,255,0.025)", transition: "transform .28s cubic-bezier(.2,0,0,1), border-color .28s, background .28s" }}>
                  <span style={{ flex: "0 0 auto", width: 38, height: 38, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--accent-soft)", border: "1px solid var(--accent-line)" }}>
                    <Ico markup={ind.icon} size={18} />
                  </span>
                  <span style={{ ...CARD_TITLE, fontSize: 15.5 }}>{ind.t}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}><p style={{ ...BODY, margin: "clamp(28px,3.5vw,44px) 0 0", maxWidth: 820 }}>{INDUSTRIES_OUTRO}</p></Reveal>
        </div>
      </section>

      {/* ── WHY PARTNER WITH US ──────────────────────────────────────────── */}
      <section style={{ background: "var(--bg-services)", padding: SECTION_PAD, borderBlock: "1px solid var(--line)" }}>
        <Reveal>
          <div style={{ position: "relative", maxWidth: 1080, margin: "0 auto", borderRadius: 28, border: "1px solid var(--line-strong)", background: "linear-gradient(160deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", padding: "clamp(34px,4.5vw,60px)", overflow: "hidden" }}>
            <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 70% at 88% 0%, rgba(59,130,246,0.2), transparent 66%)" }} />
            <div className="aii-2col" style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(30px,4vw,56px)", alignItems: "start" }}>
              <div>
                <h2 style={{ textWrap: "balance", margin: "0 0 18px" }}>Why Partner with Us for AI Integration Services?</h2>
                <p style={{ ...BODY, margin: "0 0 20px" }}>{PARTNER_INTRO}</p>
                <p style={{ ...BODY, margin: 0 }}>{PARTNER_OUTRO}</p>
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                {PARTNER_POINTS.map((c) => (
                  <div key={c} style={{ display: "flex", gap: 13, alignItems: "flex-start", padding: "15px 17px", borderRadius: 14, border: "1px solid var(--line-strong)", background: "rgba(255,255,255,0.04)" }}>
                    <span style={{ flex: "0 0 auto", width: 24, height: 24, borderRadius: 8, background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.32)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--good)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                    </span>
                    <span style={{ fontSize: 16, lineHeight: 1.5, color: "var(--fg-soft)" }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FAQs ─────────────────────────────────────────────────────────── */}
      <section id="faq" style={{ background: "var(--bg-hero)", padding: SECTION_PAD }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <Reveal><h2 style={{ textWrap: "balance", marginBottom: HEAD_MB }}>FAQs</h2></Reveal>
          <FaqCards items={FAQS} />
        </div>
      </section>

      <style>{`
        @keyframes aii-pulse { 0%,100% { transform: translate(-50%,-50%) scale(1); opacity: .9; } 50% { transform: translate(-50%,-50%) scale(1.06); opacity: 1; } }
        @keyframes aii-dash { to { stroke-dashoffset: -48; } }
        @keyframes aii-float { 0%,100% { transform: translate(-50%,-50%); } 50% { transform: translate(-50%,calc(-50% - 7px)); } }
        @keyframes aii-drift { from { transform: translate(-3%,-2%); } to { transform: translate(3%,2%); } }
        .aii-card { transition: transform .28s cubic-bezier(.2,0,0,1), border-color .28s, box-shadow .28s; }
        .aii-card:hover { transform: translateY(-4px); border-color: rgba(59,130,246,0.42); box-shadow: 0 26px 60px -34px rgba(59,130,246,0.95); }
        .aii-soft:hover { border-color: rgba(59,130,246,0.32) !important; background: rgba(59,130,246,0.06) !important; }
        .aii-industry:hover { transform: translateY(-3px); border-color: rgba(59,130,246,0.4); background: rgba(59,130,246,0.08); }
        .aii-tl.is-visible .aii-tl-line { width: 100%; }
        @media (prefers-reduced-motion: reduce) { .aii-tl-line { width: 100% !important; transition: none !important; } }
      `}</style>
    </div>
  );
}
