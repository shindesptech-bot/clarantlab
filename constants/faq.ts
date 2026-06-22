import type { FaqItem } from "@/types";

export const HOME_FAQ: FaqItem[] = [
  {
    question: "Is AI-generated code safe to ship?",
    answer:
      "Every line is reviewed by a senior engineer before it lands on main. We treat AI like a fast, tireless junior — its output is checked, tested and owned by a human. Our pods carry malpractice-equivalent professional liability insurance on every engagement.",
  },
  {
    question: "Who owns the code, the IP and the models?",
    answer:
      "You own 100% of the code and all IP from day one. We use enterprise tiers of Claude, Gemini and OpenAI which do not train on your data. We can also run fully on-prem or in your VPC for regulated workloads.",
  },
  {
    question: "What if AI gets it wrong?",
    answer:
      "It will, regularly. The humans in the loop catch it. We run automated review, unit tests, type checks, security scans and a human PR review on every change — same as any disciplined engineering team. AI being wrong is a normal part of the process, not a crisis.",
  },
  {
    question: "Can you work with our existing team?",
    answer:
      "Yes. About a third of our engagements are embedded — a pod sits inside your team, uses your tools and processes, and ramps your engineers on the same AI workflows. By the end of the quarter, your team is faster too.",
  },
  {
    question: "What does it cost?",
    answer:
      "A 14-day MVP starts at $24k. A modernization or embedded pod is typically $30–80k per month depending on size. Book a scoping call and we'll give you a fixed, signed quote for your scope.",
  },
  {
    question: "How do you handle compliance — SOC 2, HIPAA, GDPR?",
    answer:
      "We are SOC 2 Type II. HIPAA BAA available. For GDPR / data residency we deploy to the region you need. For air-gapped requirements we deliver source + a hand-off doc.",
  },
  {
    question: "What stacks do you work in?",
    answer:
      "Defaults: TypeScript / React / Next.js / Python / Postgres / AWS or Vercel. We've shipped in Rust, Go, Swift, Kotlin, Elixir and a half-dozen others. Tell us your stack — if our seniors know it, we'll match a pod to it.",
  },
];
