import type { NavLink } from "@/types";

export const NAV_LINKS: NavLink[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "AI Integration Services", href: "/services/ai-integration" },
      { label: "MCP Implementation", href: "/services/mcp-implementation" },
      { label: "RAG Implementation", href: "/services/rag-implementation" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Financial Services", href: "/industries/financial-services" },
      { label: "Law Firms", href: "/industries/law-firms" },
    ],
  },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Process", href: "/#process" },
];
