import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { FaqCards } from "@/components/services/FaqCards";
import type { FaqItem } from "@/types";

export const metadata: Metadata = {
  title: "MCP Implementation Services | MCP Consulting & Integration",
  description:
    "Get secure MCP implementation services to connect AI with business systems. We provide MCP consulting, server development, integration, and custom solutions.",
  alternates: { canonical: "/services/mcp-implementation" },
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
  compass: '<circle cx="12" cy="12" r="9"></circle><path d="m15.5 8.5-2.6 5.6-5.6 2.6 2.6-5.6z"></path>',
  server: '<rect x="3" y="4" width="18" height="7" rx="2"></rect><rect x="3" y="13" width="18" height="7" rx="2"></rect><path d="M7 7.5h.01M7 16.5h.01"></path>',
  plug: '<path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0z"></path><path d="M12 18v4"></path>',
  sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M16 16h6"></path>',
  heart: '<path d="M12 21s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9z"></path>',
  bank: '<path d="m3 10 9-6 9 6"></path><path d="M5 10v9M19 10v9M9 10v9M15 10v9M3 21h18"></path>',
  shield: '<path d="M12 2 4 6v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10V6z"></path>',
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"></path>',
  gavel: '<path d="m14 3 7 7-3 3-7-7z"></path><path d="m9 8 7 7"></path><path d="M4 21h10"></path>',
};

/* ── Verbatim content (single source of truth — do not edit wording) ────── */
const HERO_PARA =
  "If your AI can't access your business data, it can't deliver meaningful results. Our MCP Implementation services connect AI with your existing systems using the Model Context Protocol (MCP), giving it the context it needs to work smarter, automate processes, and support your business every day.";

const CONNECT_PARAS = [
  "Many companies are investing in AI, but they quickly discover one common problem. AI doesn't know enough about their business.",
  "Important information is scattered across different platforms, making it difficult for AI to provide accurate answers or complete tasks. Our model context protocol implementation services solve this problem by creating a secure bridge between your AI applications and your business systems.",
  "Instead of building separate integrations for every tool, MCP provides one standardized way for AI to access the information it needs. The result is smarter AI, faster workflows, and a much better experience for your team.",
  "With our MCP consulting services, we help you build an AI ecosystem that's connected, secure, and ready to scale.",
];

const SERVICES_INTRO =
  "Every organization uses different systems and has different AI goals. That's why we never take a one-size-fits-all approach. Our MCP development services are designed around the way your business works.";

const SERVICES = [
  { t: "MCP Consulting Services", d: "Not sure where to start? We'll evaluate your existing systems, identify the best use cases for MCP, and create a roadmap that supports your AI strategy and business objectives.", icon: ICON.compass },
  { t: "MCP Server Development", d: "Our MCP server development services create secure MCP servers that allow AI models and agents to communicate with your business applications while maintaining proper authentication and access controls.", icon: ICON.server },
  { t: "MCP Integration Services", d: "Our MCP Integration Services connect AI with CRMs, ERPs, cloud storage, internal knowledge bases, databases, document management platforms, and custom business applications.", icon: ICON.plug },
  { t: "Custom MCP Solutions", d: "Every organization operates differently. Our Custom MCP Solutions are built to match your workflows, infrastructure, security requirements, and long-term business goals.", icon: ICON.sliders },
];

const PROCESS_INTRO =
  "We follow a structured approach that securely connects your AI with the systems your teams rely on, while delivering measurable business outcomes.";

const STEPS = [
  { n: "01", t: "Discovery and Assessment", d: "We evaluate your current systems, business processes, AI objectives, and integration requirements to determine the best implementation strategy." },
  { n: "02", t: "Solution Architecture", d: "Our experts design an MCP architecture that securely connects your AI applications with the systems your teams rely on every day." },
  { n: "03", t: "MCP Development", d: "Our engineers build secure MCP servers, connectors, APIs, and integrations tailored to your environment and business needs." },
  { n: "04", t: "Testing and Validation", d: "Before deployment, we thoroughly test every integration to verify performance, reliability, security, and compatibility across connected systems." },
  { n: "05", t: "Deployment and Continuous Support", d: "After implementation, we provide ongoing monitoring, optimization, maintenance, and support to keep your MCP infrastructure running efficiently as your business evolves." },
];

const INDUSTRIES_INTRO =
  "Our AI MCP Implementation services support organizations across a wide range of industries, including:";
const INDUSTRIES_OUTRO =
  "Every implementation is customized to meet industry-specific workflows, compliance requirements, and operational needs.";

const INDUSTRIES = [
  { t: "Healthcare", icon: ICON.heart },
  { t: "Financial Services", icon: ICON.bank },
  { t: "Insurance", icon: ICON.shield },
  { t: "Real Estate", icon: ICON.home },
  { t: "Legal", icon: ICON.gavel },
];

const PARTNER_INTRO =
  "Implementing MCP requires expertise in AI, system architecture, integrations, and enterprise security. Our team combines all these capabilities to deliver solutions that create real business value. When you work with us, you get:";
const PARTNER_OUTRO =
  "We build AI solutions that work seamlessly with your existing technology, helping your business unlock the full potential of connected AI.";

const PARTNER_POINTS = [
  "Experienced MCP Consulting Services",
  "Secure and scalable model context protocol implementation",
  "Custom MCP server development built for your business",
  "Flexible Custom MCP Solutions",
  "Reliable MCP Integration Services for existing systems",
  "End-to-end MCP Development Services from strategy to deployment",
  "Ongoing optimization and technical support",
];

const FAQS: FaqItem[] = [
  { question: "What is MCP Implementation?", answer: "MCP Implementation is the process of implementing the Model Context Protocol to securely connect AI applications with business systems, databases, APIs, and software. It allows AI to access the right information and tools while maintaining security and governance." },
  { question: "What is Model Context Protocol (MCP)?", answer: "Model Context Protocol (MCP) is an open standard that enables AI applications to communicate with external systems through a consistent interface. It simplifies integrations and allows AI to securely access business data and tools." },
  { question: "What are MCP Consulting Services?", answer: "MCP Consulting Services help businesses plan, design, and implement MCP solutions based on their existing infrastructure, AI goals, and business requirements. Consultants identify the best architecture and integration strategy for long-term success." },
  { question: "Why do businesses need MCP Server Development?", answer: "MCP server development creates the secure connection between AI applications and business systems. It allows AI models to access approved data, tools, and services while maintaining authentication, permissions, and security controls." },
  { question: "Can MCP integrate with our existing software?", answer: "Yes. Our MCP Integration Services are designed to connect with existing CRM platforms, ERP systems, cloud storage, document management systems, databases, APIs, and custom business applications without replacing your current technology." },
  { question: "Do you provide ongoing support after MCP implementation?", answer: "Yes. We provide continuous monitoring, maintenance, optimization, and technical support to ensure your MCP infrastructure remains secure, reliable, and ready to support future AI initiatives." },
];

// Decorative hero diagram — the MCP hub bridges the AI core to business systems.
const NODE_LABELS = ["CRM", "ERP", "Cloud Storage", "Databases", "Knowledge Base", "Applications"];
const NODES = NODE_LABELS.map((label, i) => {
  const ang = (i / NODE_LABELS.length) * Math.PI * 2 - Math.PI / 2;
  return { label, x: 50 + Math.cos(ang) * 34, y: 50 + Math.sin(ang) * 36, i };
});

// Systems named in the Section-1 copy, drawn in the connect-section bridge illustration.
const BRIDGE_SYSTEMS = ["CRM", "ERP", "Cloud Storage", "Databases", "Knowledge Base"];

// Homepage section rhythm + typography tokens (reused verbatim, no new values).
const SECTION_PAD = "clamp(48px,6vw,88px) 28px";
const HEAD_MB = "clamp(28px,3.5vw,44px)";
const CARD_TITLE: React.CSSProperties = { fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em", color: "var(--fg)" };
const BODY: React.CSSProperties = { fontSize: 16, lineHeight: 1.6, color: "var(--fg-dim)" };
const LEDE: React.CSSProperties = { fontSize: "clamp(16px,1.7vw,19px)", lineHeight: 1.6, color: "var(--fg-dim)" };

/* Self-contained "AI ↔ MCP ↔ systems" bridge illustration for the connect
   section — replaces the AI-integration-specific PNG with an on-brand SVG. */
function McpBridge() {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="AI connected through an MCP server to CRM, ERP, cloud storage, databases, and knowledge base systems" style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <linearGradient id="mcp-bridge-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#141e34" />
          <stop offset="1" stopColor="#080d1a" />
        </linearGradient>
        <radialGradient id="mcp-hub" cx="40%" cy="34%" r="70%">
          <stop offset="0" stopColor="#5B9BFF" />
          <stop offset="0.62" stopColor="#1D4ED8" />
          <stop offset="1" stopColor="#0F2A6B" />
        </radialGradient>
      </defs>
      <rect width="480" height="360" fill="url(#mcp-bridge-bg)" />
      {/* connectors: AI → hub, hub → each system */}
      <g stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7">
        <line x1="96" y1="180" x2="220" y2="180" strokeDasharray="5 7" style={{ animation: "mcp-dash 2.8s linear infinite" }} />
        {BRIDGE_SYSTEMS.map((_, i) => {
          const y = 60 + i * 60;
          return <line key={i} x1="260" y1="180" x2="372" y2={y} strokeDasharray="5 7" style={{ animation: `mcp-dash ${2.6 + i * 0.2}s linear infinite` }} />;
        })}
      </g>
      {/* AI node */}
      <g>
        <rect x="40" y="150" width="60" height="60" rx="16" fill="rgba(11,18,36,0.92)" stroke="rgba(120,160,240,0.4)" />
        <text x="70" y="185" textAnchor="middle" fontFamily="var(--font-display), sans-serif" fontSize="15" fontWeight="600" fill="#EAF1FF">AI</text>
      </g>
      {/* MCP hub */}
      <circle cx="240" cy="180" r="40" fill="url(#mcp-hub)" />
      <circle cx="240" cy="180" r="52" fill="none" stroke="rgba(120,160,240,0.28)" />
      <text x="240" y="185" textAnchor="middle" fontFamily="var(--font-display), sans-serif" fontSize="15" fontWeight="700" letterSpacing="0.08em" fill="#EAF1FF">MCP</text>
      {/* system chips */}
      {BRIDGE_SYSTEMS.map((label, i) => {
        const y = 60 + i * 60;
        return (
          <g key={label}>
            <rect x="372" y={y - 16} width="88" height="32" rx="9" fill="rgba(11,18,36,0.92)" stroke="rgba(120,160,240,0.32)" />
            <text x="416" y={y + 4} textAnchor="middle" fontFamily="var(--font-display), sans-serif" fontSize="10.5" fontWeight="500" fill="#D6E2F7">{label}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function McpImplementationServicesPage() {
  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
      {/* ── HERO / H1 ────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", background: "radial-gradient(1200px 620px at 78% 8%, rgba(37,99,235,0.20), transparent 62%), var(--bg-hero)", borderBottom: "1px solid var(--line)" }}>
        <div aria-hidden style={{ position: "absolute", inset: "-10%", background: "radial-gradient(520px 380px at 20% 80%, rgba(59,130,246,0.10), transparent 70%)", animation: "mcp-drift 22s ease-in-out infinite alternate", pointerEvents: "none" }} />
        <div className="mcp-hero-grid" style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "clamp(48px,6vw,96px) 28px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "clamp(40px,5vw,72px)", alignItems: "center" }}>
          <div>
            <Reveal>
              <h1 style={{ margin: "0 0 24px", textWrap: "balance" }}>MCP Implementation Services</h1>
            </Reveal>
            <Reveal delay={80}>
              <p style={{ ...LEDE, margin: "0 0 32px", maxWidth: 640 }}>{HERO_PARA}</p>
            </Reveal>
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

          {/* Orbital MCP-hub diagram (illustration) */}
          <Reveal delay={120}>
            <div style={{ position: "relative", minHeight: 460, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "relative", width: "100%", maxWidth: 520, aspectRatio: "1/1", borderRadius: 28, border: "1px solid var(--line)", background: "linear-gradient(160deg, rgba(20,30,52,0.85), rgba(8,13,26,0.9))", overflow: "hidden", boxShadow: "0 40px 90px -50px rgba(37,99,235,0.9)" }}>
                <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 60% at 50% 50%, rgba(59,130,246,0.16), transparent 70%)" }} />
                <svg viewBox="0 0 400 400" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                  <circle cx="200" cy="200" r="118" fill="none" stroke="rgba(255,255,255,0.07)" />
                  <circle cx="200" cy="200" r="164" fill="none" stroke="rgba(255,255,255,0.05)" />
                  <g stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" opacity="0.75">
                    {NODES.map((n) => (
                      <line key={n.label} x1={200} y1={200} x2={n.x * 4} y2={n.y * 4} strokeDasharray="5 7" style={{ animation: `mcp-dash ${2.6 + n.i * 0.22}s linear infinite` }} />
                    ))}
                  </g>
                </svg>
                <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 128, height: 128, borderRadius: "50%", background: "radial-gradient(circle at 40% 34%, #5B9BFF, #1D4ED8 62%, #0F2A6B)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, boxShadow: "0 0 60px -6px rgba(59,130,246,0.75), inset 0 0 30px rgba(255,255,255,0.16)", animation: "mcp-pulse 4.2s ease-in-out infinite" }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0z" /><path d="M12 18v4" /></svg>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", color: "#EAF1FF" }}>MCP</span>
                </div>
                {NODES.map((n) => (
                  <div key={n.label} style={{ position: "absolute", left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%,-50%)", padding: "7px 13px", borderRadius: 999, fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 500, color: "#D6E2F7", background: "rgba(11,18,36,0.92)", border: "1px solid rgba(120,160,240,0.32)", boxShadow: "0 8px 24px -14px rgba(0,0,0,0.9)", whiteSpace: "nowrap", animation: `mcp-float ${5 + n.i * 0.4}s ease-in-out ${n.i * 0.2}s infinite` }}>
                    {n.label}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── USE MCP TO INTEGRATE AI WITH YOUR COMPANY ────────────────────── */}
      <section style={{ background: "var(--bg-services)", padding: SECTION_PAD, borderBlock: "1px solid var(--line)" }}>
        <div className="mcp-2col" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(360px,1fr))", gap: "clamp(36px,5vw,72px)", alignItems: "center" }}>
          {/* Left: content */}
          <div>
            <Reveal>
              <h2 style={{ textWrap: "balance", margin: `0 0 ${HEAD_MB}`, maxWidth: 560 }}>Use Model Context Protocol to Integrate AI with Your Company</h2>
            </Reveal>
            <div style={{ display: "grid", gap: 20, maxWidth: 560 }}>
              {CONNECT_PARAS.map((p, i) => (
                <Reveal key={i} delay={60 + i * 60}>
                  <p style={{ ...BODY, margin: 0 }}>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right: MCP bridge illustration */}
          <Reveal delay={120}>
            <div style={{ position: "relative", borderRadius: 24, border: "1px solid var(--line)", overflow: "hidden", boxShadow: "0 40px 90px -55px rgba(37,99,235,0.9)" }}>
              <McpBridge />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── OUR MCP IMPLEMENTATION SERVICES ──────────────────────────────── */}
      <section style={{ background: "var(--bg-hero)", padding: SECTION_PAD }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ maxWidth: 760, marginBottom: HEAD_MB }}>
            <Reveal><h2 style={{ textWrap: "balance", margin: "0 0 18px" }}>Our MCP Implementation Services</h2></Reveal>
            <Reveal delay={60}><p style={{ ...LEDE, margin: 0 }}>{SERVICES_INTRO}</p></Reveal>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 18 }}>
            {SERVICES.map((s, i) => (
              <Reveal key={s.t} delay={(i % 3) * 70}>
                <div className="mcp-card" style={{ position: "relative", height: "100%", padding: "28px 26px", borderRadius: 20, border: "1px solid var(--line)", background: "linear-gradient(170deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))", overflow: "hidden" }}>
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

      {/* ── OUR MCP IMPLEMENTATION PROCESS ───────────────────────────────── */}
      <section style={{ background: "var(--bg-services)", padding: SECTION_PAD, borderBlock: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ maxWidth: 760, marginBottom: HEAD_MB }}>
            <Reveal><h2 style={{ textWrap: "balance", margin: "0 0 18px" }}>Our MCP Implementation Process</h2></Reveal>
            <Reveal delay={60}><p style={{ ...LEDE, margin: 0 }}>{PROCESS_INTRO}</p></Reveal>
          </div>
          <Reveal className="mcp-tl">
            <div style={{ position: "relative" }}>
              <div aria-hidden style={{ position: "absolute", left: 0, right: 0, top: 21, height: 2, background: "var(--line-strong)" }} />
              <div aria-hidden className="mcp-tl-line" style={{ position: "absolute", left: 0, top: 21, height: 2, width: 0, background: "linear-gradient(90deg,var(--accent-deep),var(--accent-hover))", boxShadow: "0 0 14px rgba(59,130,246,0.8)", transition: "width 1.9s cubic-bezier(.2,0,0,1)" }} />
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
                <div className="mcp-industry" style={{ display: "flex", alignItems: "center", gap: 14, padding: "20px", borderRadius: 16, border: "1px solid var(--line)", background: "rgba(255,255,255,0.025)", transition: "transform .28s cubic-bezier(.2,0,0,1), border-color .28s, background .28s" }}>
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
            <div className="mcp-2col" style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(30px,4vw,56px)", alignItems: "start" }}>
              <div>
                <h2 style={{ textWrap: "balance", margin: "0 0 18px" }}>Why Partner with Build with Genie for MCP Implementation?</h2>
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
        @keyframes mcp-pulse { 0%,100% { transform: translate(-50%,-50%) scale(1); opacity: .9; } 50% { transform: translate(-50%,-50%) scale(1.06); opacity: 1; } }
        @keyframes mcp-dash { to { stroke-dashoffset: -48; } }
        @keyframes mcp-float { 0%,100% { transform: translate(-50%,-50%); } 50% { transform: translate(-50%,calc(-50% - 7px)); } }
        @keyframes mcp-drift { from { transform: translate(-3%,-2%); } to { transform: translate(3%,2%); } }
        .mcp-card { transition: transform .28s cubic-bezier(.2,0,0,1), border-color .28s, box-shadow .28s; }
        .mcp-card:hover { transform: translateY(-4px); border-color: rgba(59,130,246,0.42); box-shadow: 0 26px 60px -34px rgba(59,130,246,0.95); }
        .mcp-industry:hover { transform: translateY(-3px); border-color: rgba(59,130,246,0.4); background: rgba(59,130,246,0.08); }
        .mcp-tl.is-visible .mcp-tl-line { width: 100%; }
        @media (prefers-reduced-motion: reduce) { .mcp-tl-line { width: 100% !important; transition: none !important; } [style*="mcp-pulse"], [style*="mcp-dash"], [style*="mcp-float"], [style*="mcp-drift"] { animation: none !important; } }
      `}</style>
    </div>
  );
}
