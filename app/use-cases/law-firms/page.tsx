import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { FaqCards } from "@/components/services/FaqCards";
import type { FaqItem } from "@/types";

export const metadata: Metadata = {
  // Exact meta title from the brief (absolute → skips the "— Build with Genie" template).
  title: { absolute: "AI for Law Firms | Custom Legal AI Solutions" },
  description:
    "Build smarter legal operations with custom AI solutions for law firms. Automate workflows, accelerate research, and improve efficiency with legal AI.",
  keywords: [
    "ai for law",
    "ai in legal industry",
    "ai for law firms",
    "artificial intelligence in law",
    "legal ai software",
    "ai solutions for law firms",
  ],
  // Public URL is the branded /industries path (rewrites to this route).
  alternates: { canonical: "/industries/law-firms" },
};

/* ── Verbatim content from the brief (source of truth — do not edit copy) ── */

const SHIFT_POINTS = [
  "Reduce administrative workload",
  "Accelerate legal research",
  "Improve document review accuracy",
  "Automate client communication",
  "Organize legal knowledge efficiently",
  "Support attorneys with intelligent insights",
  "Improve operational efficiency",
];

const SOLUTIONS: { title: string; body: string; icon: string }[] = [
  {
    title: "AI-Powered Legal Research",
    body: "Searching through statutes, case law, contracts, and internal knowledge bases can take hours. Our AI solutions help attorneys quickly locate relevant legal information by searching across multiple sources using natural language queries, significantly reducing research time.",
    icon: '<circle cx="11" cy="11" r="7"></circle><path d="m21 21-4.3-4.3"></path>',
  },
  {
    title: "Intelligent Contract Review",
    body: "Reviewing contracts manually is both time-consuming and prone to human error. Our AI can identify missing clauses, highlight legal risks, compare contract versions, detect inconsistencies, and summarize lengthy agreements. These capabilities help legal teams review contracts faster while maintaining accuracy.",
    icon: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path><path d="M14 3v5h5"></path><path d="m9 15 2 2 4-4"></path>',
  },
  {
    title: "AI Document Summarization",
    body: "Legal documents often span hundreds of pages. Instead of reading every page manually, AI generates concise summaries, extracts key information, and highlights important obligations, deadlines, and legal terms.",
    icon: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path><path d="M14 3v5h5"></path><path d="M9 13h6"></path><path d="M9 17h4"></path>',
  },
  {
    title: "AI Knowledge Management",
    body: "Legal knowledge is one of a firm's most valuable assets. Our AI systems organize internal documents, case files, legal precedents, policies, and research into an intelligent searchable knowledge base, making information instantly accessible across your organization.",
    icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>',
  },
  {
    title: "AI Client Support",
    body: "Many law firms receive the same client questions repeatedly. We develop intelligent AI assistants that can answer FAQs, guide new clients through intake, schedule consultations, collect required information, and route inquiries to the appropriate legal team. This improves response times while reducing administrative work.",
    icon: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><path d="M9 10h.01"></path><path d="M13 10h.01"></path><path d="M17 10h.01"></path>',
  },
  {
    title: "Workflow Automation",
    body: "Routine legal operations often involve multiple manual processes. Our AI solutions for law firms automate workflows such as client onboarding, matter intake, document generation, case updates, appointment scheduling, internal approvals, and email responses. Automation helps legal teams spend less time on repetitive work and more time serving clients.",
    icon: '<path d="M12 20a8 8 0 1 0-8-8"></path><path d="M4 4v5h5"></path><path d="M12 8v4l3 2"></path>',
  },
];

const PRACTICE_AREAS: { title: string; body: string; icon: string }[] = [
  {
    title: "Corporate Law",
    body: "Automate contract analysis, compliance reviews, due diligence, and document management.",
    icon: '<rect x="4" y="2" width="16" height="20" rx="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M8 10h.01"></path><path d="M16 10h.01"></path><path d="M8 14h.01"></path><path d="M16 14h.01"></path>',
  },
  {
    title: "Litigation",
    body: "Accelerate case research, organize evidence, summarize depositions, and streamline case preparation.",
    icon: '<path d="m14.5 12.5-8 8a2.12 2.12 0 1 1-3-3l8-8"></path><path d="m16 16 6-6"></path><path d="m8 8 6-6"></path><path d="m9 7 8 8"></path><path d="m21 11-8-8"></path>',
  },
  {
    title: "Real Estate Law",
    body: "Review agreements, manage property documentation, and automate transaction workflows.",
    icon: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><path d="M9 22V12h6v10"></path>',
  },
  {
    title: "Employment Law",
    body: "Analyze employment contracts, HR policies, compliance documentation, and legal notices.",
    icon: '<rect x="2" y="7" width="20" height="14" rx="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>',
  },
  {
    title: "Intellectual Property",
    body: "Organize patent documentation, trademark filings, and research records using AI-powered search.",
    icon: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18 9 18 7.5a6 6 0 0 0-12 0c0 1.5.5 2.7 1.5 4 .8.8 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path>',
  },
  {
    title: "Family Law",
    body: "Automate document collection, client intake, scheduling, and case documentation.",
    icon: '<path d="M14 19a4 4 0 0 0-8 0"></path><circle cx="10" cy="9" r="3"></circle><path d="M18 19a4 4 0 0 0-3-3.87"></path><path d="M15 6.13a3 3 0 0 1 0 5.75"></path>',
  },
];

const CAPABILITIES: { title: string; body: string; icon: string }[] = [
  {
    title: "AI Document Intelligence",
    body: "Extract information from legal documents automatically.",
    icon: '<path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><path d="M7 8h8"></path><path d="M7 12h10"></path><path d="M7 16h6"></path>',
  },
  {
    title: "Retrieval-Augmented Generation (RAG)",
    body: "Search your firm's internal legal documents and receive accurate answers based only on your own knowledge base.",
    icon: '<ellipse cx="12" cy="5" rx="8" ry="3"></ellipse><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"></path><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"></path>',
  },
  {
    title: "Secure AI Chatbots",
    body: "Create internal AI assistants for attorneys or client-facing assistants for legal support.",
    icon: '<rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="8" cy="16" r="1"></circle><circle cx="16" cy="16" r="1"></circle><path d="M12 7v4"></path><path d="M12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>',
  },
  {
    title: "Intelligent Search",
    body: "Instantly locate clauses, precedents, regulations, and case files using conversational search.",
    icon: '<circle cx="11" cy="11" r="7"></circle><path d="m21 21-4.3-4.3"></path><path d="M8 11h6"></path>',
  },
  {
    title: "AI Workflow Automation",
    body: "Automate repetitive legal processes across departments.",
    icon: '<path d="M12 20a8 8 0 1 0-8-8"></path><path d="M4 4v5h5"></path><path d="M12 8v4l3 2"></path>',
  },
  {
    title: "Predictive Insights",
    body: "Analyze legal data to identify trends, workload patterns, and operational opportunities.",
    icon: '<path d="M3 3v18h18"></path><path d="m7 15 4-5 3 3 5-7"></path>',
  },
];

const BENEFITS: { title: string; body: string; icon: string }[] = [
  {
    title: "Increase Productivity",
    body: "Reduce time spent on repetitive administrative work.",
    icon: '<path d="M3 17l6-6 4 4 7-7"></path><path d="M14 8h6v6"></path>',
  },
  {
    title: "Improve Accuracy",
    body: "Minimize manual errors in document review and legal research.",
    icon: '<circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="5"></circle><circle cx="12" cy="12" r="1"></circle>',
  },
  {
    title: "Deliver Faster Client Service",
    body: "Respond to client requests more quickly with AI-powered support.",
    icon: '<path d="M13 2 3 14h9l-1 8 10-12h-9z"></path>',
  },
  {
    title: "Scale Operations",
    body: "Handle growing workloads without increasing administrative overhead.",
    icon: '<path d="M3 3v18h18"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path>',
  },
  {
    title: "Strengthen Knowledge Sharing",
    body: "Make institutional knowledge available across the entire organization.",
    icon: '<circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><path d="m8.6 13.5 6.8 4"></path><path d="m15.4 6.5-6.8 4"></path>',
  },
  {
    title: "Improve Decision-Making",
    body: "Provide attorneys with faster access to relevant legal information and insights.",
    icon: '<path d="M12 3a4 4 0 0 0-4 4c-1.4.7-2 2-2 3.4 0 1.3.6 2.4 1.6 3.1V16a3 3 0 0 0 3 3h1.4"></path><path d="M12 3a4 4 0 0 1 4 4c1.4.7 2 2 2 3.4"></path><path d="M14 21v-4"></path><path d="M17.5 21v-6"></path><path d="M21 21v-9"></path>',
  },
];

const PROCESS: { title: string; body: string; icon: string }[] = [
  {
    title: "Discovery",
    body: "We understand your firm's challenges, workflows, and business objectives.",
    icon: '<circle cx="11" cy="11" r="7"></circle><path d="m21 21-4.3-4.3"></path>',
  },
  {
    title: "Strategy",
    body: "Our team identifies high-impact opportunities where AI can create measurable value.",
    icon: '<circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="5"></circle><circle cx="12" cy="12" r="1"></circle>',
  },
  {
    title: "Development",
    body: "We build custom AI applications using modern AI technologies and enterprise-grade architectures.",
    icon: '<path d="m16 18 6-6-6-6"></path><path d="m8 6-6 6 6 6"></path>',
  },
  {
    title: "Integration",
    body: "Our solutions integrate seamlessly with your existing systems and legal software.",
    icon: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.8 1.7"></path><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.8-1.7"></path>',
  },
  {
    title: "Testing & Optimization",
    body: "Every solution is validated for accuracy, security, and performance before deployment.",
    icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path>',
  },
  {
    title: "Ongoing Support",
    body: "We continuously improve and optimize your AI solution as your business evolves.",
    icon: '<path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 6.7 3L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-6.7-3L3 16"></path><path d="M3 21v-5h5"></path>',
  },
];

const PARTNER_POINTS: { label: string; icon: string }[] = [
  { label: "Custom AI aligned to your firm's goals", icon: '<path d="m16 18 6-6-6-6"></path><path d="m8 6-6 6 6 6"></path>' },
  { label: "Security, accuracy, and scalability by design", icon: '<rect x="3" y="11" width="18" height="11" rx="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>' },
  { label: "Seamless integration with existing platforms", icon: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.8 1.7"></path><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.8-1.7"></path>' },
  { label: "Compliance-aware enterprise architecture", icon: '<path d="M12 2 4 6v6c0 5.5 3.8 8.7 8 10 4.2-1.3 8-4.5 8-10V6z"></path>' },
  { label: "Document intelligence, search, and automation", icon: '<path d="M3 3v18h18"></path><path d="m7 15 4-5 3 3 5-7"></path>' },
];

const JOURNEY: { title: string; sub: string; icon: string; last?: boolean }[] = [
  { title: "Legal Practice", sub: "Precision for every client", icon: '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path><path d="M7 21h10"></path><path d="M12 3v18"></path><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"></path>' },
  { title: "AI Transformation", sub: "Smarter technology, stronger impact", icon: '<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path><path d="M9.5 8.5 12 11"></path><path d="M6.8 15.1 12 15"></path><path d="M15 13a3 3 0 1 0 0-6"></path><path d="M18 9v.01"></path><path d="M19.5 14.5a3 3 0 1 0-4.5 2.6V19"></path>' },
  { title: "Better Outcomes", sub: "Faster, more efficient service", icon: '<path d="M12 3.5 5 6v5.5c0 4 3 7.2 7 9 4-1.8 7-5 7-9V6z"></path><path d="m9.2 12.2 1.9 1.9 3.7-3.9"></path>' },
  { title: "Build with Genie", sub: "Turning your vision into reality", icon: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>', last: true },
];

const FAQS: FaqItem[] = [
  { question: "What is AI for law?", answer: "AI for law refers to artificial intelligence technologies that help legal professionals automate repetitive tasks such as legal research, contract review, document analysis, client communication, and workflow management." },
  { question: "How is AI used in the legal industry?", answer: "AI in the legal industry is used for document review, legal research, contract analysis, knowledge management, workflow automation, predictive analytics, and AI-powered client support." },
  { question: "Does Build With Genie offer custom AI solutions for law firms?", answer: "Yes. We design and develop AI solutions for law firms tailored to your firm's workflows, business goals, and existing technology rather than offering generic software." },
  { question: "Can AI replace lawyers?", answer: "No. Artificial intelligence in law is designed to support legal professionals by automating repetitive work and providing faster access to information. Attorneys remain responsible for legal strategy, judgment, and client representation." },
  { question: "What types of law firms can benefit from legal AI software?", answer: "Small firms, mid-sized practices, and large enterprise law firms can all benefit from legal AI software by improving efficiency, reducing operational costs, and enhancing client service." },
  { question: "Is AI secure for handling legal documents?", answer: "Yes. When implemented correctly, enterprise AI solutions can include encryption, role-based access controls, audit logging, and secure deployment options to help protect confidential legal information." },
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

/* Self-contained on-brand "legal document review" visual (no external image) —
   mirrors the healthcare page's inline DashboardMock approach. */
function LegalMock() {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="AI-powered legal document review dashboard" style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <linearGradient id="lf-mock-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0d1526" />
          <stop offset="1" stopColor="#070c17" />
        </linearGradient>
        <linearGradient id="lf-mock-bar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#2563eb" />
          <stop offset="1" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
      <rect width="480" height="360" fill="url(#lf-mock-bg)" />
      {/* top bar */}
      <circle cx="26" cy="26" r="5" fill="#3b82f6" opacity="0.9" />
      <rect x="40" y="21" width="140" height="10" rx="5" fill="#ffffff" opacity="0.16" />
      <rect x="386" y="18" width="68" height="16" rx="8" fill="#3b82f6" opacity="0.22" />
      {/* contract document panel */}
      <rect x="24" y="56" width="240" height="280" rx="12" fill="#ffffff" opacity="0.04" stroke="#ffffff" strokeOpacity="0.08" />
      <rect x="44" y="78" width="120" height="11" rx="5.5" fill="#ffffff" opacity="0.22" />
      <rect x="44" y="100" width="200" height="7" rx="3.5" fill="#ffffff" opacity="0.10" />
      <rect x="44" y="116" width="200" height="7" rx="3.5" fill="#ffffff" opacity="0.10" />
      <rect x="44" y="132" width="160" height="7" rx="3.5" fill="#ffffff" opacity="0.10" />
      {/* highlighted clause */}
      <rect x="40" y="150" width="208" height="26" rx="6" fill="#3b82f6" opacity="0.14" stroke="#3b82f6" strokeOpacity="0.34" />
      <rect x="52" y="160" width="150" height="7" rx="3.5" fill="#60a5fa" opacity="0.6" />
      <rect x="44" y="188" width="200" height="7" rx="3.5" fill="#ffffff" opacity="0.10" />
      <rect x="44" y="204" width="176" height="7" rx="3.5" fill="#ffffff" opacity="0.10" />
      <rect x="44" y="220" width="200" height="7" rx="3.5" fill="#ffffff" opacity="0.10" />
      <rect x="44" y="236" width="130" height="7" rx="3.5" fill="#ffffff" opacity="0.10" />
      {/* signature block */}
      <rect x="44" y="288" width="96" height="9" rx="4.5" fill="#ffffff" opacity="0.16" />
      <path d="M44 312 q10 -10 20 0 t20 0 t20 0" fill="none" stroke="#bfdbfe" strokeWidth="2.2" strokeLinecap="round" opacity="0.8" />
      {/* clause-review checklist */}
      <rect x="280" y="56" width="176" height="150" rx="12" fill="#ffffff" opacity="0.04" stroke="#3b82f6" strokeOpacity="0.22" />
      <rect x="296" y="72" width="80" height="10" rx="5" fill="#60a5fa" opacity="0.7" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx="303" cy={104 + i * 24} r="7" fill="#3b82f6" opacity="0.2" />
          <path d={`M300 ${104 + i * 24} l2 2 4 -4`} fill="none" stroke="#7db2fb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="318" y={100 + i * 24} width={110 - i * 14} height="7" rx="3.5" fill="#ffffff" opacity="0.12" />
        </g>
      ))}
      {/* risk-score chart */}
      <rect x="280" y="222" width="176" height="114" rx="12" fill="#ffffff" opacity="0.03" stroke="#ffffff" strokeOpacity="0.07" />
      <rect x="296" y="238" width="70" height="8" rx="4" fill="#ffffff" opacity="0.14" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={298 + i * 32} y={316 - (16 + i * 14)} width="16" height={16 + i * 14} rx="4" fill="url(#lf-mock-bar)" opacity={0.55 + i * 0.09} />
      ))}
    </svg>
  );
}

export default function LawFirmsAIPage() {
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
        <span aria-hidden style={{ position: "absolute", top: -180, left: "45%", width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.20), transparent 65%)", filter: "blur(20px)", pointerEvents: "none", animation: "lf-pulse 9s ease-in-out infinite" }} />
        <div className="wrap" style={{ position: "relative" }}>
          <div className="lf-hero-grid" style={{ padding: "clamp(52px,6vw,92px) 0 clamp(48px,5vw,76px)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "clamp(36px,5vw,64px)", alignItems: "center" }}>
            <div>
              <Reveal>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "7px 14px 7px 10px", borderRadius: 9999, border: "1px solid var(--accent-line)", background: "var(--accent-soft)", fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent-bright)", marginBottom: 24 }}>
                  <Ico markup='<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path><path d="M7 21h10"></path><path d="M12 3v18"></path><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"></path>' size={15} color="var(--accent)" stroke={2} />
                  Law Firms
                </div>
              </Reveal>
              <Reveal delay={60}>
                <h1 style={{ fontSize: "clamp(36px, 4.8vw, 60px)", fontWeight: 700, lineHeight: 1.04, letterSpacing: "-0.028em", margin: "0 0 18px" }}>AI for Law Firms</h1>
              </Reveal>
              <Reveal delay={120}>
                <p style={{ fontSize: "clamp(18px,2.1vw,24px)", fontWeight: 500, lineHeight: 1.35, letterSpacing: "-0.015em", margin: "0 0 20px", background: "linear-gradient(92deg, var(--fg) 10%, #7fb0fa 90%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                  Custom AI Solutions Built for Modern Legal Practices
                </p>
              </Reveal>
              <Reveal delay={170}>
                <p style={{ fontSize: "clamp(15px,1.7vw,17.5px)", lineHeight: 1.65, color: "var(--fg-dim)", margin: "0 0 34px", maxWidth: 560 }}>
                  Legal work demands precision, speed, and efficiency. Build With Genie delivers custom AI solutions for law firms that automate routine tasks, simplify legal workflows, and help firms leverage the power of AI in the legal industry to serve clients more effectively.
                </p>
              </Reveal>
              <Reveal delay={230}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                  <Link href="/contact" className="energy-btn energy-btn-lg">
                    <span className="energy-shimmer" />
                    <span style={{ position: "relative", zIndex: 2, display: "inline-flex", alignItems: "center", gap: 9 }}>
                      Talk to a Legal AI Expert <ArrowRight size={17} strokeWidth={2.2} />
                    </span>
                  </Link>
                  <a href="#solutions" className="ghost-btn">Explore Legal AI Solutions</a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={140}>
              <div style={{ position: "relative" }}>
                <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", border: "1px solid var(--line-strong)", background: "#0a1120", boxShadow: "0 40px 90px -40px rgba(0,0,0,0.9), 0 0 0 1px rgba(59,130,246,0.08)" }}>
                  <LegalMock />
                  <div style={{ padding: "12px 16px", fontSize: 12.5, lineHeight: 1.5, color: "var(--fg-faint)", borderTop: "1px solid var(--line)", background: "rgba(6,11,22,0.6)" }}>
                    Legal teams reviewing contracts with an AI-powered clause and risk analysis dashboard.
                  </div>
                </div>
                <div style={{ position: "absolute", left: -14, bottom: -18, display: "flex", alignItems: "center", gap: 11, padding: "13px 17px", borderRadius: 14, background: "rgba(10,17,32,0.92)", border: "1px solid var(--line-strong)", backdropFilter: "blur(10px)" }}>
                  <span style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(59,130,246,0.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Ico markup='<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path>' size={18} color="var(--accent)" stroke={2} />
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--fg-soft)", lineHeight: 1.3 }}>
                    Security-first<br /><span style={{ fontWeight: 400, color: "var(--fg-faint)" }}>legal AI development</span>
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── WHY ARE LAW FIRMS INVESTING IN AI? ───────────────────────────── */}
      <section style={{ background: "var(--bg-0)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap" style={{ padding: SECTION_PAD }}>
          <div className="lf-2col" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "clamp(36px,5vw,72px)", alignItems: "start" }}>
            <Reveal>
              <div>
                <span style={EYEBROW}>The Shift</span>
                <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.025em", margin: "0 0 22px", maxWidth: "18ch" }}>Why Are Law Firms Investing in AI?</h2>
                <p style={{ ...LEDE, marginBottom: 18 }}>
                  The legal industry is under increasing pressure to improve efficiency while maintaining accuracy and compliance. Clients expect faster responses, transparent communication, and cost-effective legal services. This is why more firms are adopting AI in the legal industry to automate time-consuming tasks without compromising quality.
                </p>
                <p style={LEDE}>
                  With the right AI strategy, law firms can:
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
              Rather than replacing legal professionals, artificial intelligence in law empowers attorneys to focus on higher-value legal work.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── OUR AI SOLUTIONS FOR LAW FIRMS ───────────────────────────────── */}
      <section id="solutions" style={{ background: "var(--bg-services)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap" style={{ padding: SECTION_PAD }}>
          <div style={{ maxWidth: 760, marginBottom: "clamp(38px,4vw,56px)" }}>
            <Reveal>
              <span style={EYEBROW}>Capabilities</span>
              <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.025em", margin: "0 0 20px" }}>Our AI Solutions for Law Firms</h2>
              <p style={LEDE}>Every legal practice operates differently. Build With Genie develops customized AI systems that integrate seamlessly with your existing technology and business processes.</p>
            </Reveal>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
            {SOLUTIONS.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 70}>
                <div className="lf-card" style={{ position: "relative", overflow: "hidden", padding: "clamp(24px,2.6vw,30px)", borderRadius: 18, background: "var(--bg-0)", border: "1px solid var(--line)", height: "100%" }}>
                  <span className="lf-card-ico" style={{ width: 46, height: 46, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(150deg, rgba(59,130,246,0.16), rgba(59,130,246,0.05))", border: "1px solid var(--accent-line)", color: "#7db2fb" }}>
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

      {/* ── HOW AI SUPPORTS DIFFERENT LEGAL PRACTICES ────────────────────── */}
      <section style={{ background: "var(--bg-0)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap" style={{ padding: SECTION_PAD }}>
          <div style={{ maxWidth: 760, marginBottom: "clamp(38px,4vw,56px)" }}>
            <Reveal>
              <span style={EYEBROW}>Practice Areas</span>
              <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.025em", margin: "0 0 20px" }}>How AI Supports Different Legal Practices?</h2>
              <p style={LEDE}>Our solutions are designed for firms across multiple practice areas.</p>
            </Reveal>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
            {PRACTICE_AREAS.map((a, i) => (
              <Reveal key={a.title} delay={(i % 3) * 70}>
                <div className="lf-card" style={{ position: "relative", overflow: "hidden", padding: "clamp(24px,2.6vw,30px)", borderRadius: 18, background: "var(--bg-2)", border: "1px solid var(--line)", height: "100%" }}>
                  <span className="lf-card-ico" style={{ width: 46, height: 46, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(150deg, rgba(59,130,246,0.16), rgba(59,130,246,0.05))", border: "1px solid var(--accent-line)", color: "#7db2fb" }}>
                    <Ico markup={a.icon} size={22} stroke={1.7} />
                  </span>
                  <h3 style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.012em", margin: "18px 0 12px" }}>{a.title}</h3>
                  <p style={{ fontSize: 14.5, lineHeight: 1.68, color: "#9aa4b5", margin: 0 }}>{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI CAPABILITIES WE BUILD ─────────────────────────────────────── */}
      <section style={{ background: "var(--bg-services)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap" style={{ padding: SECTION_PAD }}>
          <div style={{ maxWidth: 760, marginBottom: "clamp(38px,4vw,56px)" }}>
            <Reveal>
              <span style={EYEBROW}>What We Build</span>
              <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.025em", margin: "0 0 20px" }}>AI Capabilities We Build</h2>
              <p style={LEDE}>Unlike off-the-shelf platforms, Build With Genie develops custom AI applications tailored to your firm&apos;s needs.</p>
            </Reveal>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 70}>
                <div className="lf-card" style={{ position: "relative", overflow: "hidden", padding: "clamp(24px,2.6vw,30px)", borderRadius: 18, background: "var(--bg-0)", border: "1px solid var(--line)", height: "100%" }}>
                  <span className="lf-card-ico" style={{ width: 46, height: 46, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(150deg, rgba(59,130,246,0.16), rgba(59,130,246,0.05))", border: "1px solid var(--accent-line)", color: "#7db2fb" }}>
                    <Ico markup={c.icon} size={22} stroke={1.7} />
                  </span>
                  <h3 style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.012em", margin: "18px 0 12px" }}>{c.title}</h3>
                  <p style={{ fontSize: 14.5, lineHeight: 1.68, color: "#9aa4b5", margin: 0 }}>{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS OF AI FOR LAW FIRMS ─────────────────────────────────── */}
      <section style={{ background: "var(--bg-2)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap" style={{ padding: SECTION_PAD }}>
          <div style={{ maxWidth: 800, marginBottom: "clamp(38px,4vw,56px)" }}>
            <Reveal>
              <span style={EYEBROW}>Outcomes</span>
              <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.025em", margin: "0 0 20px" }}>Benefits of AI for Law Firms</h2>
              <p style={LEDE}>Adopting legal AI software provides measurable business value across legal operations.</p>
            </Reveal>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={(i % 3) * 70}>
                <div className="lf-card" style={{ position: "relative", overflow: "hidden", padding: "clamp(24px,2.6vw,30px)", borderRadius: 18, background: "var(--bg-0)", border: "1px solid var(--line)", height: "100%" }}>
                  <span className="lf-card-ico" style={{ width: 46, height: 46, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(150deg, rgba(59,130,246,0.16), rgba(59,130,246,0.05))", border: "1px solid var(--accent-line)", color: "#7db2fb" }}>
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

      {/* ── OUR AI DEVELOPMENT PROCESS ───────────────────────────────────── */}
      <section style={{ background: "var(--bg-0)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap" style={{ padding: SECTION_PAD }}>
          <div style={{ maxWidth: 760, marginBottom: "clamp(38px,4vw,56px)" }}>
            <Reveal>
              <span style={EYEBROW}>How We Work</span>
              <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.025em", margin: 0 }}>Our AI Development Process</h2>
            </Reveal>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
            {PROCESS.map((step, i) => (
              <Reveal key={step.title} delay={(i % 3) * 70}>
                <div className="lf-card" style={{ position: "relative", overflow: "hidden", padding: "clamp(24px,2.6vw,30px)", borderRadius: 18, background: "var(--bg-services)", border: "1px solid var(--line)", height: "100%" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                    <span className="lf-card-ico" style={{ width: 46, height: 46, flex: "none", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(150deg, rgba(59,130,246,0.16), rgba(59,130,246,0.05))", border: "1px solid var(--accent-line)", color: "#7db2fb" }}>
                      <Ico markup={step.icon} size={22} stroke={1.7} />
                    </span>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em", color: "rgba(125,178,251,0.28)", fontVariantNumeric: "tabular-nums" }}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.012em", margin: "0 0 12px" }}>{step.title}</h3>
                  <p style={{ fontSize: 14.5, lineHeight: 1.68, color: "#9aa4b5", margin: 0 }}>{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE BUILD WITH GENIE? ─────────────────────────────────── */}
      <section style={{ background: "var(--bg-hero)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap" style={{ padding: SECTION_PAD }}>
          <div className="lf-2col" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))", gap: "clamp(36px,5vw,68px)", alignItems: "center" }}>
            <Reveal>
              <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", border: "1px solid var(--line-strong)", boxShadow: "0 40px 90px -45px rgba(0,0,0,0.95)" }}>
                <LegalMock />
                <div style={{ padding: "12px 16px", fontSize: 12.5, lineHeight: 1.5, color: "var(--fg-faint)", borderTop: "1px solid var(--line)", background: "rgba(6,11,22,0.6)" }}>
                  Custom legal AI built around your firm&apos;s systems, security, and compliance requirements.
                </div>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div>
                <span style={EYEBROW}>The Partnership</span>
                <h2 style={{ fontSize: "clamp(26px,3.2vw,38px)", fontWeight: 700, lineHeight: 1.14, letterSpacing: "-0.025em", margin: "0 0 20px" }}>Why Choose Build With Genie?</h2>
                <p style={{ ...LEDE, marginBottom: 16 }}>Build With Genie doesn&apos;t sell one-size-fits-all AI products. We build custom AI systems that align with your firm&apos;s goals, technology stack, compliance requirements, and operational processes.</p>
                <p style={{ ...LEDE, marginBottom: 24 }}>Our team works closely with your organization to design AI solutions that integrate with existing platforms while maintaining security, accuracy, and scalability. Whether you need document intelligence, intelligent search, workflow automation, or enterprise AI assistants, we deliver solutions built specifically for your legal practice.</p>
                <div style={{ display: "grid", gap: 12 }}>
                  {PARTNER_POINTS.map((p) => (
                    <div key={p.label} className="lf-row" style={{ display: "flex", alignItems: "center", gap: 14, padding: "15px 18px", borderRadius: 14, border: "1px solid var(--line)", background: "rgba(255,255,255,0.03)" }}>
                      <Ico markup={p.icon} size={19} color="var(--accent)" stroke={2} />
                      <span style={{ fontSize: 16, fontWeight: 500, color: "#e2e7f0" }}>{p.label}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginTop: "clamp(24px,2.6vw,30px)" }}>
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

      {/* ── CONCLUSION / CTA ─────────────────────────────────────────────── */}
      <section style={{ position: "relative", background: "linear-gradient(150deg, #0a1428 0%, #060b16 55%, #08101f 100%)", borderTop: "1px solid var(--line)", overflow: "hidden" }}>
        <span aria-hidden style={{ position: "absolute", right: -160, top: -120, width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.20), transparent 65%)", pointerEvents: "none", animation: "lf-pulse 11s ease-in-out infinite" }} />
        <span aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(rgba(96,165,250,0.16) 1px, transparent 1px)", backgroundSize: "34px 34px", maskImage: "radial-gradient(60% 55% at 88% 78%, #000, transparent 70%)", WebkitMaskImage: "radial-gradient(60% 55% at 88% 78%, #000, transparent 70%)" }} />
        <div className="wrap" style={{ position: "relative", padding: "clamp(40px,4.4vw,66px) 0" }}>
          <div className="lf-conc-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.14fr) minmax(0, 0.86fr)", gap: "clamp(28px,3.6vw,64px)", alignItems: "center" }}>
            <div style={{ minWidth: 0 }}>
              <Reveal>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "7px 16px", border: "1px solid rgba(96,165,250,0.34)", borderRadius: 9999, background: "var(--accent-soft)", marginBottom: "clamp(18px,2.2vw,26px)" }}>
                  <span aria-hidden style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent-hover)", boxShadow: "0 0 10px rgba(96,165,250,0.9)" }} />
                  <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent-bright)" }}>The Future</span>
                </div>
              </Reveal>
              <Reveal delay={60}>
                <h2 style={{ fontSize: "clamp(24px,2.9vw,34px)", fontWeight: 700, lineHeight: 1.26, letterSpacing: "-0.026em", margin: "0 0 clamp(24px,2.8vw,34px)" }}>
                  The future of AI in the legal industry is about <span style={{ color: "var(--accent-hover)" }}>greater efficiency</span>, <span style={{ color: "var(--accent-hover)" }}>improved client experiences</span>, and <span style={{ color: "var(--accent-hover)" }}>smarter decision-making</span>.
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <div style={{ border: "1px solid var(--line)", borderRadius: 18, background: "rgba(255,255,255,0.014)", padding: "clamp(18px,2vw,24px)" }}>
                  {[
                    { icon: '<path d="M3 17l6-6 4 4 7-7"></path><path d="M14 8h6v6"></path>', text: "Organizations investing in AI for law firms today are building a competitive advantage by reducing manual work, improving legal operations, and enabling attorneys to focus on complex legal matters that require human expertise." },
                    { icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path>', text: "With custom AI solutions from Build With Genie, your firm can modernize operations while maintaining the quality, security, and professionalism your clients expect." },
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
              <div aria-hidden className="lf-journey" style={{ display: "grid", justifyItems: "start", alignSelf: "center" }}>
                {JOURNEY.map((n, i) => (
                  <div key={n.title} style={{ display: "contents" }}>
                    <div className="lf-jnode" style={{ display: "grid", gridTemplateColumns: "auto minmax(0,1fr)", alignItems: "center", gap: 16 }}>
                      <span className="lf-jring" data-last={n.last} style={{ position: "relative", width: 52, height: 52, flex: "none", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${n.last ? "rgba(96,165,250,0.7)" : "rgba(96,165,250,0.34)"}`, background: n.last ? "radial-gradient(circle at 50% 40%, rgba(59,130,246,0.26), rgba(9,14,26,0.6))" : "radial-gradient(circle at 50% 40%, rgba(59,130,246,0.14), rgba(9,14,26,0.6))", boxShadow: n.last ? "0 0 30px -6px rgba(59,130,246,0.9)" : "0 0 18px -8px rgba(59,130,246,0.6)", color: n.last ? "#bfdbfe" : "#8fbefc", animation: `lf-node-in .5s cubic-bezier(.2,0,0,1) both`, animationDelay: `${0.15 + i * 0.35}s` }}>
                        <Ico markup={n.icon} size={22} stroke={1.6} />
                      </span>
                      <span style={{ display: "grid", gap: 4, minWidth: 0 }}>
                        <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.012em", color: n.last ? "var(--accent-hover)" : "var(--fg)" }}>{n.title}</span>
                        <span style={{ fontSize: 12.5, lineHeight: 1.45, color: "var(--fg-faint)" }}>{n.sub}</span>
                      </span>
                    </div>
                    {!n.last && (
                      <span className="lf-jlink" style={{ width: 1, height: 54, marginLeft: 26, position: "relative", overflow: "hidden", background: "linear-gradient(180deg, rgba(96,165,250,0.55), rgba(96,165,250,0.18))", transformOrigin: "top", animation: "lf-line-draw .4s cubic-bezier(.2,0,0,1) both", animationDelay: `${0.32 + i * 0.35}s` }}>
                        <span style={{ display: "block", width: "100%", height: "40%", background: "linear-gradient(180deg, transparent, #bfdbfe, transparent)", animation: "lf-signal-down 3.2s cubic-bezier(.2,0,0,1) infinite", animationDelay: `${i * 0.5}s` }} />
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
        @keyframes lf-pulse { 0%,100% { opacity: .45; transform: scale(1); } 50% { opacity: .9; transform: scale(1.06); } }
        @keyframes lf-node-in { from { opacity: 0; transform: scale(.86); } to { opacity: 1; transform: none; } }
        @keyframes lf-line-draw { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes lf-signal-down { 0% { transform: translateY(-120%); opacity: 0; } 25% { opacity: 1; } 100% { transform: translateY(280%); opacity: 0; } }
        .lf-card { transition: transform .25s cubic-bezier(.2,0,0,1), border-color .25s, box-shadow .25s; }
        .lf-card:hover { transform: translateY(-3px); border-color: rgba(59,130,246,0.45); box-shadow: 0 18px 44px -26px rgba(59,130,246,0.7); }
        .lf-card-ico { transition: transform .25s cubic-bezier(.2,0,0,1), box-shadow .25s, border-color .25s, background .25s; }
        .lf-card:hover .lf-card-ico { transform: translateY(-2px) scale(1.05); border-color: rgba(59,130,246,0.5); background: linear-gradient(150deg, rgba(59,130,246,0.26), rgba(59,130,246,0.08)); box-shadow: 0 0 22px -6px rgba(59,130,246,0.85); }
        .lf-row { transition: border-color .25s, background .25s, transform .25s cubic-bezier(.2,0,0,1); }
        .lf-row:hover { border-color: rgba(59,130,246,0.42); background: rgba(59,130,246,0.08); transform: translateX(3px); }
        .lf-jnode:hover .lf-jring { transform: scale(1.07); border-color: rgba(96,165,250,0.75); box-shadow: 0 0 26px -6px rgba(59,130,246,0.95); }
        @media (max-width: 900px) { .lf-conc-grid { grid-template-columns: 1fr !important; } .lf-journey { order: -1; } }
        @media (prefers-reduced-motion: reduce) { .lf-jring, .lf-jlink, .lf-jlink > span, [style*="lf-pulse"] { animation: none !important; } }
      `}</style>
    </div>
  );
}
