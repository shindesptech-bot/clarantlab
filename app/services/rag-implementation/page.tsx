import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { FaqCards } from "@/components/services/FaqCards";
import type { FaqItem } from "@/types";

export const metadata: Metadata = {
  title: "RAG Implementation Services | Enterprise RAG Solutions",
  description:
    "Custom RAG implementation services that ground AI in your own business data. We build enterprise RAG solutions with secure retrieval, semantic search, and source-backed answers.",
  alternates: { canonical: "/services/rag-implementation" },
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
  cube: '<path d="m12 2 9 5v10l-9 5-9-5V7z"></path><path d="M12 12 3 7M12 12l9-5M12 12v10"></path>',
  sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M16 16h6"></path>',
  compass: '<circle cx="12" cy="12" r="9"></circle><path d="m15.5 8.5-2.6 5.6-5.6 2.6 2.6-5.6z"></path>',
  chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><path d="M9 10h.01"></path><path d="M13 10h.01"></path><path d="M17 10h.01"></path>',
  chart: '<path d="M3 3v18h18"></path><path d="m7 14 4-4 3 3 5-6"></path>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"></path>',
  target: '<circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="5"></circle><circle cx="12" cy="12" r="1.5"></circle>',
  smile: '<circle cx="12" cy="12" r="9"></circle><path d="M8 14a5 5 0 0 0 8 0"></path><path d="M9 9h.01M15 9h.01"></path>',
  lock: '<rect x="3" y="11" width="18" height="10" rx="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>',
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
  "Off-the-shelf AI answers from general training data — not from the documents, policies, and records that actually run your business. Our RAG implementation services close that gap, connecting large language models to your own knowledge sources so every answer is grounded in information you trust.",
  "Using retrieval-augmented generation, we build systems that first find the most relevant material across your content, then use it to generate accurate, source-backed responses. The result is enterprise AI that reflects how your organization really works.",
];

const CONNECT_PARAS = [
  "Most AI tools confidently generate answers with no way to tell whether they are correct. For enterprises, that uncertainty is a dealbreaker — teams can't act on information they can't verify, and a single fabricated detail can carry real cost.",
  "Retrieval-augmented generation solves this by changing the order of operations. Before the model writes a word, it searches your knowledge bases, documents, and databases for the passages most relevant to the question, using vector search and semantic matching rather than keyword guesswork.",
  "Those retrieved passages are then passed to the language model as grounding context, so responses stay anchored to your actual data — and can cite exactly where each answer came from. As an experienced RAG development company, we design that retrieval layer for accuracy, speed, and security.",
];

const SERVICES_INTRO =
  "Every organization stores knowledge differently and asks different questions of it. Our RAG development services are built around your content, your systems, and the decisions your teams need to make.";

const SERVICES = [
  { t: "Enterprise RAG Solutions", d: "For organizations with large, sprawling content libraries, we build enterprise RAG solutions that unify documents, wikis, databases, and support histories into a single retrieval layer — with the access controls, scale, and reliability production environments demand.", icon: ICON.cube },
  { t: "Custom RAG Development", d: "No two knowledge bases are alike. Our custom RAG development covers the full pipeline — ingestion, chunking, embeddings, vector storage, and retrieval tuning — engineered around your data formats, domain language, and accuracy targets.", icon: ICON.sliders },
  { t: "RAG Consulting Services", d: "Not sure where retrieval fits into your AI roadmap? Our RAG consulting services assess your content, use cases, and infrastructure, then define a practical architecture and rollout plan tied to measurable business outcomes.", icon: ICON.compass },
  { t: "AI Knowledge Assistant Development", d: "We develop AI assistants that answer questions directly from your knowledge base — for support teams, internal staff, or customers — delivering precise, cited responses instead of generic guesses.", icon: ICON.chat },
];

const CUSTOM_INTRO =
  "Generic AI assistants are trained on the public internet, not on your contracts, procedures, or product data — so they can't answer the questions that matter most to your business. A retrieval system built around your own content changes what AI can reliably do. With a tailored approach you gain:";

const CUSTOM_POINTS = [
  "Business-specific knowledge drawn from your own documents and records",
  "Higher accuracy on domain questions off-the-shelf models get wrong",
  "Security and access controls that respect your data boundaries",
  "Source-backed responses your teams can verify and cite",
  "Scalability as your content and query volume grow",
];

const BENEFITS = [
  { t: "Improve Decision-Making", d: "Give teams fast, trustworthy answers pulled from the full breadth of your organization's knowledge, so decisions rest on complete information rather than whoever happened to remember it.", icon: ICON.chart },
  { t: "Increase Productivity", d: "Employees stop hunting through folders, wikis, and inboxes. A single question surfaces the exact passage they need, with a link back to the source.", icon: ICON.bolt },
  { t: "Reduce AI Hallucinations", d: "Grounding every response in retrieved evidence keeps the model from inventing facts — a critical safeguard for regulated and high-stakes work.", icon: ICON.target },
  { t: "Better Customer Support", d: "Support assistants answer from your latest documentation and policies, giving customers consistent, accurate responses around the clock.", icon: ICON.smile },
  { t: "Protect Business Knowledge", d: "Institutional expertise stays accessible even as people change roles or leave — captured in a searchable, always-current knowledge layer.", icon: ICON.lock },
];

const PROCESS_INTRO =
  "We follow a structured approach that turns scattered content into a reliable, production-grade retrieval system while minimizing risk at every stage.";

const STEPS = [
  { n: "01", t: "Business Discovery", d: "We map your knowledge sources, the questions your teams ask, accuracy expectations, and security requirements to define the right retrieval strategy." },
  { n: "02", t: "Solution Design", d: "Our architects design the pipeline — data ingestion, chunking, embeddings, vector database, and retrieval logic — to fit your content and infrastructure." },
  { n: "03", t: "Development and Integration", d: "We build the retrieval and generation layers and connect them to your existing systems, applications, and data sources through secure interfaces." },
  { n: "04", t: "Testing and Optimization", d: "We evaluate answer accuracy, relevance, and latency against real queries, then tune retrieval and grounding until results meet your quality bar." },
  { n: "05", t: "Deployment and Ongoing Support", d: "After launch, we monitor performance, refresh knowledge as content changes, and continuously optimize the system as your needs evolve." },
];

const INDUSTRIES_INTRO =
  "Our RAG AI solutions serve organizations across a wide range of industries, including:";
const INDUSTRIES_OUTRO =
  "Every implementation is customized to meet industry-specific workflows, compliance requirements, and knowledge governance needs.";

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
  "Building a retrieval system that stays accurate in production takes more than wiring an LLM to a vector database. It demands expertise across data engineering, search, security, and applied AI. When you work with us, you get:";
const PARTNER_OUTRO =
  "We don't ship generic chatbots. Every solution is engineered to answer from your knowledge with the accuracy, security, and reliability your business depends on.";

const PARTNER_POINTS = [
  "Tailored RAG implementation services built around your knowledge",
  "Deep expertise in retrieval, embeddings, and vector search",
  "Custom RAG development for teams of every size",
  "Scalable enterprise RAG solutions ready for production",
  "Secure, access-controlled handling of sensitive data",
  "End-to-end support from strategy through deployment and tuning",
];

const FAQS: FaqItem[] = [
  { question: "What are RAG implementation services?", answer: "RAG implementation services cover the design and development of retrieval-augmented generation systems — the pipelines that let AI search your business content and generate answers grounded in it. This typically includes data ingestion, embeddings, a vector database, retrieval logic, and integration with an AI assistant or application." },
  { question: "What is retrieval-augmented generation (RAG)?", answer: "Retrieval-augmented generation is an approach where an AI model retrieves relevant information from a trusted knowledge source before generating a response. Instead of relying only on what the model learned during training, it grounds each answer in your own documents, databases, and records — improving accuracy and reducing fabricated results." },
  { question: "How is custom RAG development different from a generic AI chatbot?", answer: "A generic chatbot answers from public training data and can't see your internal knowledge. Custom RAG development builds a retrieval layer over your specific content, so responses reflect your policies, products, and records — and can cite their sources. This delivers far higher accuracy on the questions that matter to your business." },
  { question: "Which data sources can a RAG system connect to?", answer: "Our enterprise RAG solutions can retrieve from document repositories, internal wikis, knowledge bases, databases, support tickets, product documentation, and other business applications. We design the ingestion layer around the formats and systems you already use, without replacing them." },
  { question: "How do you keep our data secure in a RAG solution?", answer: "As an experienced RAG development company, we follow enterprise security practices — encrypted storage and transport, role-based access controls, and retrieval that respects your existing permissions — so users only ever see information they are authorized to access." },
  { question: "Do you provide support after the RAG solution is deployed?", answer: "Yes. We provide ongoing monitoring, knowledge refreshes, and optimization to keep answers accurate as your content changes, and to scale the system as query volume and use cases grow over time." },
];

// Decorative hero diagram — knowledge sources the retrieval layer draws from.
const NODE_LABELS = ["Documents", "Databases", "Knowledge Base", "Wikis", "Support Tickets", "Policies"];
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

/* Self-contained "query → retrieval → grounded answer" illustration for the
   connect section — replaces the AI-integration-specific PNG with an on-brand SVG. */
function RetrievalFlow() {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="A user query retrieving relevant passages from a knowledge base, then producing a grounded, source-cited answer" style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <linearGradient id="rag-flow-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#141e34" />
          <stop offset="1" stopColor="#080d1a" />
        </linearGradient>
        <radialGradient id="rag-core" cx="40%" cy="34%" r="70%">
          <stop offset="0" stopColor="#5B9BFF" />
          <stop offset="0.62" stopColor="#1D4ED8" />
          <stop offset="1" stopColor="#0F2A6B" />
        </radialGradient>
      </defs>
      <rect width="480" height="360" fill="url(#rag-flow-bg)" />

      {/* query in */}
      <rect x="26" y="150" width="96" height="40" rx="11" fill="rgba(11,18,36,0.92)" stroke="rgba(120,160,240,0.4)" />
      <text x="74" y="169" textAnchor="middle" fontFamily="var(--font-display), sans-serif" fontSize="11" fontWeight="600" fill="#EAF1FF">Question</text>
      <text x="74" y="182" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="8.5" fill="#9db4de">from your team</text>

      {/* connectors */}
      <g stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7">
        <line x1="122" y1="170" x2="196" y2="170" strokeDasharray="5 7" style={{ animation: "rag-dash 2.8s linear infinite" }} />
        <line x1="284" y1="170" x2="358" y2="170" strokeDasharray="5 7" style={{ animation: "rag-dash 3s linear infinite" }} />
      </g>

      {/* retrieval core (knowledge store + semantic search) */}
      <circle cx="240" cy="170" r="52" fill="none" stroke="rgba(120,160,240,0.28)" />
      <circle cx="240" cy="170" r="42" fill="url(#rag-core)" />
      <g stroke="#EAF1FF" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
        <ellipse cx="240" cy="158" rx="15" ry="5" />
        <path d="M225 158v14c0 2.6 6.7 4.4 15 4.4s15-1.8 15-4.4v-14" />
        <circle cx="246" cy="176" r="6" />
        <path d="m251 181 4 4" />
      </g>
      <text x="240" y="150" textAnchor="middle" fontFamily="var(--font-display), sans-serif" fontSize="9.5" fontWeight="700" letterSpacing="0.12em" fill="#EAF1FF">RETRIEVE</text>

      {/* grounded answer with cited sources */}
      <rect x="358" y="120" width="98" height="100" rx="12" fill="rgba(11,18,36,0.92)" stroke="rgba(120,160,240,0.32)" />
      <text x="372" y="140" fontFamily="var(--font-display), sans-serif" fontSize="10" fontWeight="600" fill="#EAF1FF">Answer</text>
      <rect x="372" y="150" width="70" height="6" rx="3" fill="#ffffff" opacity="0.16" />
      <rect x="372" y="162" width="70" height="6" rx="3" fill="#ffffff" opacity="0.12" />
      <rect x="372" y="174" width="46" height="6" rx="3" fill="#ffffff" opacity="0.12" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx="376" cy={195 + i * 0} r="0" />
          <rect x="372" y={190 + i * 9} width="8" height="6" rx="2" fill="#3b82f6" opacity={0.7 - i * 0.12} />
          <rect x="384" y={190 + i * 9} width={54 - i * 10} height="6" rx="3" fill="#60a5fa" opacity={0.5 - i * 0.08} />
        </g>
      ))}

      {/* knowledge-source chips feeding the store */}
      {["Docs", "Wikis", "Databases"].map((label, i) => {
        const x = 150 + i * 62;
        return (
          <g key={label}>
            <line x1={x + 26} y1="286" x2="240" y2="212" stroke="var(--accent)" strokeWidth="1.2" strokeDasharray="4 6" opacity="0.5" style={{ animation: `rag-dash ${3 + i * 0.3}s linear infinite` }} />
            <rect x={x} y="286" width="52" height="26" rx="8" fill="rgba(11,18,36,0.92)" stroke="rgba(120,160,240,0.3)" />
            <text x={x + 26} y="302" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="9" fill="#D6E2F7">{label}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function RagImplementationServicesPage() {
  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
      {/* ── HERO / H1 ────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", background: "radial-gradient(1200px 620px at 78% 8%, rgba(37,99,235,0.20), transparent 62%), var(--bg-hero)", borderBottom: "1px solid var(--line)" }}>
        <div aria-hidden style={{ position: "absolute", inset: "-10%", background: "radial-gradient(520px 380px at 20% 80%, rgba(59,130,246,0.10), transparent 70%)", animation: "rag-drift 22s ease-in-out infinite alternate", pointerEvents: "none" }} />
        <div className="rag-hero-grid" style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "clamp(48px,6vw,96px) 28px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "clamp(40px,5vw,72px)", alignItems: "center" }}>
          <div>
            <Reveal>
              <h1 style={{ margin: "0 0 24px", textWrap: "balance" }}>RAG Implementation Services</h1>
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

          {/* Orbital retrieval-core diagram (illustration) */}
          <Reveal delay={120}>
            <div style={{ position: "relative", minHeight: 460, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "relative", width: "100%", maxWidth: 520, aspectRatio: "1/1", borderRadius: 28, border: "1px solid var(--line)", background: "linear-gradient(160deg, rgba(20,30,52,0.85), rgba(8,13,26,0.9))", overflow: "hidden", boxShadow: "0 40px 90px -50px rgba(37,99,235,0.9)" }}>
                <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 60% at 50% 50%, rgba(59,130,246,0.16), transparent 70%)" }} />
                <svg viewBox="0 0 400 400" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                  <circle cx="200" cy="200" r="118" fill="none" stroke="rgba(255,255,255,0.07)" />
                  <circle cx="200" cy="200" r="164" fill="none" stroke="rgba(255,255,255,0.05)" />
                  <g stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" opacity="0.75">
                    {NODES.map((n) => (
                      <line key={n.label} x1={200} y1={200} x2={n.x * 4} y2={n.y * 4} strokeDasharray="5 7" style={{ animation: `rag-dash ${2.6 + n.i * 0.22}s linear infinite` }} />
                    ))}
                  </g>
                </svg>
                <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 128, height: 128, borderRadius: "50%", background: "radial-gradient(circle at 40% 34%, #5B9BFF, #1D4ED8 62%, #0F2A6B)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, boxShadow: "0 0 60px -6px rgba(59,130,246,0.75), inset 0 0 30px rgba(255,255,255,0.16)", animation: "rag-pulse 4.2s ease-in-out infinite" }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="6" rx="7" ry="2.6" /><path d="M5 6v12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6" /><path d="M5 12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6" /></svg>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", color: "#EAF1FF" }}>RAG</span>
                </div>
                {NODES.map((n) => (
                  <div key={n.label} style={{ position: "absolute", left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%,-50%)", padding: "7px 13px", borderRadius: 999, fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 500, color: "#D6E2F7", background: "rgba(11,18,36,0.92)", border: "1px solid rgba(120,160,240,0.32)", boxShadow: "0 8px 24px -14px rgba(0,0,0,0.9)", whiteSpace: "nowrap", animation: `rag-float ${5 + n.i * 0.4}s ease-in-out ${n.i * 0.2}s infinite` }}>
                    {n.label}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── BUILD AI THAT UNDERSTANDS YOUR BUSINESS DATA ─────────────────── */}
      <section style={{ background: "var(--bg-services)", padding: SECTION_PAD, borderBlock: "1px solid var(--line)" }}>
        <div className="rag-2col" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(360px,1fr))", gap: "clamp(36px,5vw,72px)", alignItems: "center" }}>
          {/* Left: content */}
          <div>
            <Reveal>
              <h2 style={{ textWrap: "balance", margin: `0 0 ${HEAD_MB}`, maxWidth: 520 }}>Build AI That Understands Your Business Data</h2>
            </Reveal>
            <div style={{ display: "grid", gap: 20, maxWidth: 560 }}>
              {CONNECT_PARAS.map((p, i) => (
                <Reveal key={i} delay={60 + i * 60}>
                  <p style={{ ...BODY, margin: 0 }}>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right: retrieval-flow illustration */}
          <Reveal delay={120}>
            <div style={{ position: "relative", borderRadius: 24, border: "1px solid var(--line)", overflow: "hidden", boxShadow: "0 40px 90px -55px rgba(37,99,235,0.9)" }}>
              <RetrievalFlow />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── OUR RAG DEVELOPMENT SERVICES ─────────────────────────────────── */}
      <section style={{ background: "var(--bg-hero)", padding: SECTION_PAD }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ maxWidth: 760, marginBottom: HEAD_MB }}>
            <Reveal><h2 style={{ textWrap: "balance", margin: "0 0 18px" }}>Our RAG Development Services</h2></Reveal>
            <Reveal delay={60}><p style={{ ...LEDE, margin: 0 }}>{SERVICES_INTRO}</p></Reveal>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 18 }}>
            {SERVICES.map((s, i) => (
              <Reveal key={s.t} delay={(i % 3) * 70}>
                <div className="rag-card" style={{ position: "relative", height: "100%", padding: "28px 26px", borderRadius: 20, border: "1px solid var(--line)", background: "linear-gradient(170deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))", overflow: "hidden" }}>
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

      {/* ── WHY CHOOSE CUSTOM RAG ────────────────────────────────────────── */}
      <section style={{ background: "var(--bg-services)", padding: SECTION_PAD, borderBlock: "1px solid var(--line)" }}>
        <div className="rag-2col" style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "clamp(32px,4vw,60px)", alignItems: "center" }}>
          <div>
            <Reveal><h2 style={{ textWrap: "balance", margin: "0 0 20px" }}>Why Choose Custom RAG Instead of Generic AI?</h2></Reveal>
            <Reveal delay={60}><p style={{ ...BODY, margin: 0, maxWidth: 520 }}>{CUSTOM_INTRO}</p></Reveal>
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            {CUSTOM_POINTS.map((c, i) => (
              <Reveal key={c} delay={i * 50}>
                <div className="rag-soft" style={{ display: "flex", gap: 13, alignItems: "flex-start", padding: "16px 18px", borderRadius: 14, border: "1px solid var(--line)", background: "rgba(255,255,255,0.03)", transition: "border-color .28s, background .28s" }}>
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

      {/* ── BENEFITS OF RAG IMPLEMENTATION ───────────────────────────────── */}
      <section style={{ background: "var(--bg-hero)", padding: SECTION_PAD }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal><h2 style={{ textWrap: "balance", marginBottom: HEAD_MB }}>Benefits of RAG Implementation</h2></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
            {BENEFITS.map((b, i) => (
              <Reveal key={b.t} delay={(i % 4) * 70}>
                <div className="rag-card" style={{ position: "relative", height: "100%", padding: "26px 24px", borderRadius: 20, border: "1px solid var(--line)", background: "linear-gradient(170deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))", overflow: "hidden" }}>
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

      {/* ── OUR RAG IMPLEMENTATION PROCESS ───────────────────────────────── */}
      <section style={{ background: "var(--bg-services)", padding: SECTION_PAD, borderBlock: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ maxWidth: 760, marginBottom: HEAD_MB }}>
            <Reveal><h2 style={{ textWrap: "balance", margin: "0 0 18px" }}>Our RAG Implementation Process</h2></Reveal>
            <Reveal delay={60}><p style={{ ...LEDE, margin: 0 }}>{PROCESS_INTRO}</p></Reveal>
          </div>
          <Reveal className="rag-tl">
            <div style={{ position: "relative" }}>
              <div aria-hidden style={{ position: "absolute", left: 0, right: 0, top: 21, height: 2, background: "var(--line-strong)" }} />
              <div aria-hidden className="rag-tl-line" style={{ position: "absolute", left: 0, top: 21, height: 2, width: 0, background: "linear-gradient(90deg,var(--accent-deep),var(--accent-hover))", boxShadow: "0 0 14px rgba(59,130,246,0.8)", transition: "width 1.9s cubic-bezier(.2,0,0,1)" }} />
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
                <div className="rag-industry" style={{ display: "flex", alignItems: "center", gap: 14, padding: "20px", borderRadius: 16, border: "1px solid var(--line)", background: "rgba(255,255,255,0.025)", transition: "transform .28s cubic-bezier(.2,0,0,1), border-color .28s, background .28s" }}>
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
            <div className="rag-2col" style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(30px,4vw,56px)", alignItems: "start" }}>
              <div>
                <h2 style={{ textWrap: "balance", margin: "0 0 18px" }}>Why Partner with Us for RAG Implementation Services?</h2>
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
        @keyframes rag-pulse { 0%,100% { transform: translate(-50%,-50%) scale(1); opacity: .9; } 50% { transform: translate(-50%,-50%) scale(1.06); opacity: 1; } }
        @keyframes rag-dash { to { stroke-dashoffset: -48; } }
        @keyframes rag-float { 0%,100% { transform: translate(-50%,-50%); } 50% { transform: translate(-50%,calc(-50% - 7px)); } }
        @keyframes rag-drift { from { transform: translate(-3%,-2%); } to { transform: translate(3%,2%); } }
        .rag-card { transition: transform .28s cubic-bezier(.2,0,0,1), border-color .28s, box-shadow .28s; }
        .rag-card:hover { transform: translateY(-4px); border-color: rgba(59,130,246,0.42); box-shadow: 0 26px 60px -34px rgba(59,130,246,0.95); }
        .rag-soft:hover { border-color: rgba(59,130,246,0.32) !important; background: rgba(59,130,246,0.06) !important; }
        .rag-industry:hover { transform: translateY(-3px); border-color: rgba(59,130,246,0.4); background: rgba(59,130,246,0.08); }
        .rag-tl.is-visible .rag-tl-line { width: 100%; }
        @media (prefers-reduced-motion: reduce) { .rag-tl-line { width: 100% !important; transition: none !important; } [style*="rag-pulse"], [style*="rag-dash"], [style*="rag-float"], [style*="rag-drift"] { animation: none !important; } }
      `}</style>
    </div>
  );
}
