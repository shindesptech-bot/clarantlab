import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeading } from "@/components/home/_shared";
import { FaqCards } from "@/components/services/FaqCards";
import type { FaqItem } from "@/types";

export const metadata: Metadata = {
  title: "AI Integration Services",
  description:
    "We connect AI models, agents, and automation directly to your CRM, ERP, databases, cloud, and daily tools — so intelligence lives inside your workflows, not beside them.",
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
  spark: '<path d="m12 3 2 5 5 2-5 2-2 5-2-5-5-2 5-2z"></path>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"></path>',
  clock: '<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path>',
  chart: '<path d="M3 3v18h18"></path><path d="m7 14 4-4 3 3 5-6"></path>',
  smile: '<circle cx="12" cy="12" r="9"></circle><path d="M8 14a5 5 0 0 0 8 0"></path><path d="M9 9h.01M15 9h.01"></path>',
  gears: '<circle cx="12" cy="12" r="3"></circle><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"></path>',
  scale: '<path d="M4 20V10M10 20V4M16 20v-8M22 20V7"></path>',
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

const HERO_STATS = [
  { v: "40+", k: "Systems integrated" },
  { v: "6–10 wks", k: "Typical time to production" },
  { v: "SOC 2", k: "Aligned delivery practices" },
];

const INTRO_BULLETS = [
  { t: "Works with your current stack", d: "CRM, ERP, data warehouses, cloud, Slack, email, and document stores — connected, not replaced." },
  { t: "Secure by design", d: "Role-based access, private networking, audit logs, and data-residency controls from day one." },
  { t: "Automation where it pays", d: "We target the workflows with real volume and real cost, then measure the delta." },
  { t: "Built to extend", d: "A clean integration layer means the next AI use case takes weeks, not quarters." },
];

const ARCH_ROWS = [
  { n: "01", t: "Source systems", s: "CRM · ERP · DB · Docs" },
  { n: "02", t: "Secure data layer", s: "Access · Audit" },
  { n: "03", t: "AI orchestration", s: "Models · Agents" },
  { n: "04", t: "Delivery surfaces", s: "Slack · Email · App" },
];

const SERVICES = [
  { t: "Enterprise AI Integration", d: "Large-scale rollouts across core systems, with governance, SSO, and change management built in.", icon: ICON.cube },
  { t: "AI Software Integration", d: "Embed models and copilots directly into your product or internal software via clean, versioned APIs.", icon: ICON.plug },
  { t: "Business AI Integration", d: "Automate the operational workflows your teams run daily — intake, triage, reporting, follow-up.", icon: ICON.flow },
  { t: "Custom AI Integration", d: "Purpose-built agents and pipelines for the problems no off-the-shelf tool understands.", icon: ICON.spark },
];

const OFF_SHELF = [
  "Generic outputs that ignore your business rules",
  "No access to your proprietary data",
  "Vendor-controlled roadmap and pricing",
  "Limited security and compliance configuration",
  "Workflows must bend to the tool",
  "Hard to measure real business impact",
];

const CUSTOM_AI = [
  "Trained and grounded on your own knowledge",
  "Connected to live systems and records",
  "You own the architecture and the roadmap",
  "Enterprise security, audit, and residency controls",
  "The tool bends to your workflow",
  "Instrumented against defined business KPIs",
];

const BENEFITS = [
  { t: "Improve Productivity", d: "Teams spend their hours on judgement work while AI handles retrieval, drafting, and routing.", icon: ICON.bolt },
  { t: "Reduce Manual Work", d: "Repetitive data entry, reconciliation, and copy-paste between systems simply stop happening.", icon: ICON.clock },
  { t: "Better Decisions", d: "Answers grounded in your live data, with sources attached — not guesses from a stale export.", icon: ICON.chart },
  { t: "Customer Experience", d: "Faster responses, consistent quality, and context carried across every channel.", icon: ICON.smile },
  { t: "Automation", d: "End-to-end processes that run without a human in the loop until a human is actually needed.", icon: ICON.gears },
  { t: "Scalability", d: "Volume grows without headcount growing with it — the integration layer absorbs the load.", icon: ICON.scale },
];

const STEPS = [
  { n: "01", t: "Discovery", d: "Systems audit, workflow mapping, and a ranked list of integration opportunities by value." },
  { n: "02", t: "Design", d: "Target architecture, data flows, security model, and success metrics agreed up front." },
  { n: "03", t: "Development", d: "Integrations, orchestration, and agents built in short iterations you review each week." },
  { n: "04", t: "Testing", d: "Accuracy evaluation, load and failure testing, and security review before anyone depends on it." },
  { n: "05", t: "Deployment", d: "Phased rollout, team enablement, monitoring, and ongoing optimization against the metrics." },
];

const INDUSTRIES = [
  { t: "Healthcare", icon: ICON.heart }, { t: "Finance", icon: ICON.bank }, { t: "Insurance", icon: ICON.shield },
  { t: "Manufacturing", icon: ICON.factory }, { t: "Retail", icon: ICON.cart }, { t: "Legal", icon: ICON.gavel },
  { t: "Real Estate", icon: ICON.home }, { t: "Technology", icon: ICON.chip }, { t: "Professional Services", icon: ICON.users },
];

const CHOOSE_US = [
  { t: "Experience", d: "Delivery teams who have shipped AI into regulated, high-volume environments before." },
  { t: "Enterprise Security", d: "Least-privilege access, encryption in transit and at rest, full audit trails." },
  { t: "Scalable Architecture", d: "Integration patterns that hold up as use cases and data volume multiply." },
  { t: "Custom Development", d: "Built for your processes and your data model — never a rebranded template." },
  { t: "Long-term Support", d: "Monitoring, model updates, and optimization long after go-live." },
];

const FAQS: FaqItem[] = [
  { question: "How long does an AI integration project take?", answer: "Most first integrations reach production in six to ten weeks. Discovery and design typically take two weeks, with build, testing, and phased rollout following in short iterations you review weekly." },
  { question: "Do we have to replace our existing systems?", answer: "No. Our approach is explicitly additive. We connect to your CRM, ERP, databases, and document stores through their existing APIs and build the intelligence layer on top of what you already run." },
  { question: "How is our data kept secure?", answer: "Data stays inside your boundary wherever possible. We implement role-based access, private networking, encryption in transit and at rest, complete audit logging, and data-residency controls agreed with your security team during design." },
  { question: "Which AI models do you work with?", answer: "We are model-agnostic and select based on the task, cost, and compliance profile — including OpenAI, Claude, Gemini, and self-hosted open models. The orchestration layer lets you switch models later without rebuilding integrations." },
  { question: "How do you measure business impact?", answer: "Success metrics are defined during design and instrumented in the build: hours saved, cycle-time reduction, error rate, deflection rate, or revenue influenced. You get reporting against those numbers after go-live, not anecdotes." },
  { question: "What support do you provide after deployment?", answer: "Ongoing monitoring, incident response, model and prompt updates, accuracy tuning, and quarterly optimization reviews to expand the integration into new workflows." },
];

const NODE_LABELS = ["CRM", "ERP", "Databases", "Cloud", "Slack", "Email", "Documents", "APIs"];

// Deterministic orbital positions for the hero AI-core diagram (percent within box).
const NODES = NODE_LABELS.map((label, i) => {
  const ang = (i / NODE_LABELS.length) * Math.PI * 2 - Math.PI / 2;
  return { label, x: 50 + Math.cos(ang) * 34, y: 50 + Math.sin(ang) * 36, i };
});

// Homepage section rhythm + typography tokens (reused verbatim, no new values).
const SECTION_PAD = "clamp(48px,6vw,88px) 28px";
const HEAD_MB = "clamp(40px,5vw,60px)";
// Card title = homepage sv-card <h3>: 18 / 600 / -0.01em / display font.
const CARD_TITLE: React.CSSProperties = { fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em", color: "var(--fg)" };
// Body paragraph = homepage base paragraph (16 / 1.6) and hero/section lede (clamp / 1.6).
const BODY: React.CSSProperties = { fontSize: 16, lineHeight: 1.6, color: "var(--fg-dim)" };
const LEDE: React.CSSProperties = { fontSize: "clamp(16px,1.7vw,19px)", lineHeight: 1.6, color: "var(--fg-dim)" };

export default function AiIntegrationServicesPage() {
  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", background: "radial-gradient(1200px 620px at 78% 8%, rgba(37,99,235,0.20), transparent 62%), var(--bg-hero)", borderBottom: "1px solid var(--line)" }}>
        <div aria-hidden style={{ position: "absolute", inset: "-10%", background: "radial-gradient(520px 380px at 20% 80%, rgba(59,130,246,0.10), transparent 70%)", animation: "aii-drift 22s ease-in-out infinite alternate", pointerEvents: "none" }} />
        <div className="aii-hero-grid" style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "clamp(44px,5vw,72px) 28px clamp(28px,3vw,52px)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "clamp(40px,5vw,72px)", alignItems: "center" }}>
          <div>
            <Reveal>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "7px 14px", borderRadius: 999, border: "1px solid var(--accent-line)", background: "var(--accent-soft)", fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent-bright)", marginBottom: 22, whiteSpace: "nowrap" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }} />
                AI Integration Services
              </div>
            </Reveal>
            <Reveal delay={60}>
              <h1 style={{ margin: "0 0 22px", textWrap: "balance" }}>
                Integrate AI into the systems your business already runs on
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p style={{ ...LEDE, margin: "0 0 32px", maxWidth: 560 }}>
                We connect AI models, agents, and automation directly to your CRM, ERP, databases, cloud, and daily tools — so intelligence lives inside your workflows, not beside them.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 40 }}>
                <Link href="/contact" className="energy-btn energy-btn-lg">
                  <span className="energy-shimmer" />
                  <span style={{ position: "relative", zIndex: 2, display: "inline-flex", alignItems: "center", gap: 9 }}>
                    Talk to an AI Expert <ArrowRight size={17} strokeWidth={2.2} />
                  </span>
                </Link>
                <Link href="/contact" className="ghost-btn">Book Consultation</Link>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 14, maxWidth: 540 }}>
                {HERO_STATS.map((s) => (
                  <div key={s.k} style={{ padding: "16px 18px", borderRadius: 14, border: "1px solid var(--line)", background: "rgba(255,255,255,0.02)" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--fg)" }}>{s.v}</div>
                    <div style={{ fontSize: 13, color: "var(--fg-faint)", marginTop: 4 }}>{s.k}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Orbital AI-core diagram */}
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

      {/* ── INTRODUCTION ─────────────────────────────────────────────────── */}
      <section id="overview" style={{ background: "var(--bg-hero)", padding: SECTION_PAD }}>
        <div className="aii-2col" style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(380px,1fr))", gap: "clamp(40px,5vw,72px)", alignItems: "center" }}>
          <div>
            <Reveal className="eyebrow" style={{ marginBottom: 16 }}>Introduction</Reveal>
            <Reveal delay={60}><h2 style={{ textWrap: "balance", marginBottom: 20 }}>Connect AI with Your Existing Business Systems</h2></Reveal>
            <Reveal delay={100}>
              <p style={{ ...LEDE, margin: "0 0 30px", maxWidth: 520 }}>
                Most organizations already own the data and tools they need. What is missing is the intelligence layer between them. Our AI integration services embed models, agents, and automation into that layer — securely, and without replacing what already works.
              </p>
            </Reveal>
            <div style={{ display: "grid", gap: 14 }}>
              {INTRO_BULLETS.map((b, i) => (
                <Reveal key={b.t} delay={i * 60}>
                  <div className="aii-soft" style={{ display: "flex", gap: 13, alignItems: "flex-start", padding: "14px 16px", borderRadius: 14, border: "1px solid var(--line)", background: "rgba(255,255,255,0.02)", transition: "border-color .28s, background .28s" }}>
                    <span style={{ flex: "0 0 auto", width: 22, height: 22, borderRadius: 7, background: "var(--accent-soft)", border: "1px solid var(--accent-line)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-bright)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                    </span>
                    <div>
                      <div style={{ ...CARD_TITLE, fontSize: 16 }}>{b.t}</div>
                      <div style={{ fontSize: 13.5, lineHeight: 1.55, color: "var(--fg-faint)", marginTop: 3 }}>{b.d}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={120}>
            <div style={{ position: "relative", borderRadius: 24, border: "1px solid var(--line)", background: "linear-gradient(165deg, rgba(18,27,48,0.9), rgba(8,13,26,0.95))", padding: "clamp(24px,3vw,36px)", overflow: "hidden" }}>
              <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(70% 50% at 50% 0%, rgba(59,130,246,0.14), transparent 70%)" }} />
              <div style={{ position: "relative", display: "grid", gap: 14 }}>
                <div className="eyebrow" style={{ color: "var(--fg-faintest)" }}>Integration Architecture</div>
                {ARCH_ROWS.map((r) => (
                  <div key={r.n} style={{ display: "flex", alignItems: "center", gap: 12, padding: "15px 16px", borderRadius: 14, border: "1px solid var(--line)", background: "rgba(255,255,255,0.03)" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "var(--accent-bright)", width: 26 }}>{r.n}</span>
                    <span style={{ flex: 1, fontFamily: "var(--font-display)", fontSize: 14.5, fontWeight: 600, color: "var(--fg)" }}>{r.t}</span>
                    <span style={{ fontSize: 12, color: "var(--fg-faintest)" }}>{r.s}</span>
                  </div>
                ))}
                <div aria-hidden style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.55), transparent)", margin: "4px 0" }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 16px", borderRadius: 14, border: "1px solid var(--accent-line)", background: "var(--accent-soft)" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 14.5, fontWeight: 600, color: "var(--fg)" }}>Measurable business outcome</span>
                  <span style={{ fontSize: 12, color: "var(--accent-bright)" }}>Live</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section id="services" style={{ background: "var(--bg-services)", padding: SECTION_PAD, borderBlock: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ maxWidth: 720, marginBottom: HEAD_MB }}>
            <Reveal className="eyebrow" style={{ marginBottom: 16 }}>Our AI Integration Services</Reveal>
            <Reveal delay={60}><h2 style={{ textWrap: "balance" }}>Four ways we embed AI into your operations</h2></Reveal>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18 }}>
            {SERVICES.map((s, i) => (
              <Reveal key={s.t} delay={i * 70}>
                <Link href="/contact" className="aii-card" style={{ position: "relative", display: "block", height: "100%", padding: "28px 26px 24px", borderRadius: 20, border: "1px solid var(--line)", background: "linear-gradient(170deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015))", overflow: "hidden", color: "inherit" }}>
                  <span aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(80% 60% at 50% 0%, rgba(59,130,246,0.14), transparent 70%)", opacity: 0.9 }} />
                  <span style={{ position: "relative", display: "flex", width: 44, height: 44, borderRadius: 13, alignItems: "center", justifyContent: "center", background: "var(--accent-soft)", border: "1px solid var(--accent-line)", marginBottom: 20 }}>
                    <Ico markup={s.icon} size={20} />
                  </span>
                  <span style={{ ...CARD_TITLE, position: "relative", display: "block", marginBottom: 10 }}>{s.t}</span>
                  <span style={{ ...BODY, position: "relative", display: "block", marginBottom: 20 }}>{s.d}</span>
                  <span className="learn-link" style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-display)", fontSize: 13.5, fontWeight: 600 }}>
                    Learn more <ArrowRight size={15} strokeWidth={2.2} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CUSTOM AI ────────────────────────────────────────────────── */}
      <section id="why" style={{ background: "var(--bg-hero)", padding: SECTION_PAD }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <SectionHeading eyebrow="Why Custom AI?" heading="Off-the-shelf AI adapts you. Custom AI adapts to you." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 18 }}>
            <Reveal>
              <div style={{ height: "100%", padding: "30px 28px", borderRadius: 22, border: "1px solid var(--line)", background: "rgba(255,255,255,0.02)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 22 }}>
                  <span style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F1837A" strokeWidth="2.4" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                  </span>
                  <span style={{ ...CARD_TITLE, fontSize: 17 }}>Off-the-shelf AI</span>
                </div>
                <div style={{ display: "grid", gap: 13 }}>
                  {OFF_SHELF.map((o) => (
                    <div key={o} style={{ display: "flex", gap: 11, alignItems: "flex-start", fontSize: 16, lineHeight: 1.55, color: "var(--fg-faint)" }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#F1837A" strokeWidth="2.6" strokeLinecap="round" style={{ flex: "0 0 auto", marginTop: 4 }}><path d="M18 6 6 18M6 6l12 12" /></svg>{o}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div style={{ position: "relative", height: "100%", padding: "30px 28px", borderRadius: 22, border: "1px solid var(--accent-line)", background: "linear-gradient(170deg, rgba(37,99,235,0.14), rgba(255,255,255,0.02))", boxShadow: "0 30px 70px -46px rgba(59,130,246,0.9)", overflow: "hidden" }}>
                <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(70% 50% at 50% 0%, rgba(59,130,246,0.16), transparent 72%)" }} />
                <div style={{ position: "relative" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 22 }}>
                    <span style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(52,211,153,0.14)", border: "1px solid rgba(52,211,153,0.32)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--good)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                    </span>
                    <span style={{ ...CARD_TITLE, fontSize: 17 }}>Custom AI Integration</span>
                  </div>
                  <div style={{ display: "grid", gap: 13 }}>
                    {CUSTOM_AI.map((c) => (
                      <div key={c} style={{ display: "flex", gap: 11, alignItems: "flex-start", fontSize: 16, lineHeight: 1.55, color: "var(--fg-soft)" }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--good)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto", marginTop: 4 }}><path d="M20 6 9 17l-5-5" /></svg>{c}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────────────── */}
      <section id="benefits" style={{ background: "var(--bg-services)", padding: SECTION_PAD, borderBlock: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ maxWidth: 700, marginBottom: HEAD_MB }}>
            <Reveal className="eyebrow" style={{ marginBottom: 16 }}>Benefits</Reveal>
            <Reveal delay={60}><h2 style={{ textWrap: "balance" }}>What changes once AI is inside the workflow</h2></Reveal>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
            {BENEFITS.map((b, i) => (
              <Reveal key={b.t} delay={(i % 3) * 70}>
                <div className="aii-card" style={{ position: "relative", height: "100%", padding: "26px 24px", borderRadius: 20, border: "1px solid var(--line)", background: "linear-gradient(170deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))", overflow: "hidden" }}>
                  <span aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(70% 60% at 20% 0%, rgba(59,130,246,0.16), transparent 68%)" }} />
                  <span style={{ position: "relative", display: "flex", width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center", background: "var(--accent-soft)", border: "1px solid var(--accent-line)", marginBottom: 18 }}>
                    <Ico markup={b.icon} size={19} />
                  </span>
                  <div style={{ ...CARD_TITLE, position: "relative", marginBottom: 9 }}>{b.t}</div>
                  <div style={{ ...BODY, position: "relative" }}>{b.d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────── */}
      <section id="process" style={{ background: "var(--bg-hero)", padding: SECTION_PAD }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <SectionHeading eyebrow="AI Integration Process" heading="A disciplined path from discovery to production" />
          <Reveal className="aii-tl">
            <div style={{ position: "relative" }}>
              <div aria-hidden style={{ position: "absolute", left: 0, right: 0, top: 21, height: 2, background: "var(--line-strong)" }} />
              <div aria-hidden className="aii-tl-line" style={{ position: "absolute", left: 0, top: 21, height: 2, width: 0, background: "linear-gradient(90deg,var(--accent-deep),var(--accent-hover))", boxShadow: "0 0 14px rgba(59,130,246,0.8)", transition: "width 1.9s cubic-bezier(.2,0,0,1)" }} />
              <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 22 }}>
                {STEPS.map((p) => (
                  <div key={p.n}>
                    <span style={{ display: "flex", width: 44, height: 44, borderRadius: "50%", alignItems: "center", justifyContent: "center", background: "var(--bg-hero)", border: "1px solid var(--accent-line)", fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: "var(--accent-bright)", boxShadow: "0 0 22px -6px rgba(59,130,246,0.9)", marginBottom: 18 }}>{p.n}</span>
                    <div style={{ ...CARD_TITLE, fontSize: 17, marginBottom: 8 }}>{p.t}</div>
                    <div style={{ ...BODY, fontSize: 13.5 }}>{p.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── INDUSTRIES ───────────────────────────────────────────────────── */}
      <section id="industries" style={{ background: "var(--bg-services)", padding: SECTION_PAD, borderBlock: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ maxWidth: 700, marginBottom: HEAD_MB }}>
            <Reveal className="eyebrow" style={{ marginBottom: 16 }}>Industries</Reveal>
            <Reveal delay={60}><h2 style={{ textWrap: "balance" }}>Integration work shaped by your sector</h2></Reveal>
          </div>
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
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────────────────── */}
      <section style={{ background: "var(--bg-hero)", padding: SECTION_PAD }}>
        <Reveal>
          <div style={{ position: "relative", maxWidth: 1080, margin: "0 auto", borderRadius: 28, border: "1px solid var(--line-strong)", background: "linear-gradient(160deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", padding: "clamp(34px,4.5vw,60px)", overflow: "hidden" }}>
            <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 70% at 88% 0%, rgba(59,130,246,0.2), transparent 66%)" }} />
            <div className="aii-2col" style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(30px,4vw,56px)", alignItems: "center" }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 16 }}>Why Choose Us</div>
                <h2 style={{ textWrap: "balance", marginBottom: 16 }}>An integration partner your security team will approve of</h2>
                <p style={{ ...BODY }}>We work the way enterprise teams need us to: scoped, documented, reviewable, and accountable for outcomes after go-live.</p>
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                {CHOOSE_US.map((c) => (
                  <div key={c.t} style={{ display: "flex", gap: 13, alignItems: "flex-start", padding: "15px 17px", borderRadius: 14, border: "1px solid var(--line-strong)", background: "rgba(255,255,255,0.04)" }}>
                    <span style={{ flex: "0 0 auto", width: 22, height: 22, borderRadius: 7, background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.32)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--good)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                    </span>
                    <div>
                      <div style={{ ...CARD_TITLE, fontSize: 16 }}>{c.t}</div>
                      <div style={{ fontSize: 13.5, lineHeight: 1.55, color: "var(--fg-faint)", marginTop: 3 }}>{c.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" style={{ background: "var(--bg-services)", padding: SECTION_PAD, borderTop: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <SectionHeading eyebrow="FAQ" heading="Questions enterprise teams ask us" />
          <FaqCards items={FAQS} />
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", background: "radial-gradient(900px 480px at 50% 0%, rgba(37,99,235,0.24), transparent 66%), var(--bg-hero)", padding: SECTION_PAD, textAlign: "center", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", inset: "-20%", background: "radial-gradient(420px 320px at 30% 70%, rgba(59,130,246,0.12), transparent 70%)", animation: "aii-drift 20s ease-in-out infinite alternate" }} />
        <Reveal>
          <div style={{ position: "relative", maxWidth: 780, margin: "0 auto" }}>
            <h2 style={{ textWrap: "balance", marginBottom: 20 }}>Ready to integrate AI into your business?</h2>
            <p style={{ ...LEDE, margin: "0 auto 34px", maxWidth: "60ch" }}>Start with a working session. We will map your systems, identify the highest-value integration, and give you a scoped plan — no obligation.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
              <Link href="/contact" className="energy-btn energy-btn-lg">
                <span className="energy-shimmer" />
                <span style={{ position: "relative", zIndex: 2, display: "inline-flex", alignItems: "center", gap: 9 }}>
                  Talk to an Expert <ArrowRight size={17} strokeWidth={2.2} />
                </span>
              </Link>
              <Link href="/contact" className="ghost-btn">Book Consultation</Link>
            </div>
          </div>
        </Reveal>
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
