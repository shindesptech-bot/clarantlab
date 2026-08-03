import type { NavLink } from "@/types";

export const NAV_LINKS: NavLink[] = [
  {
    label: "Services",
    href: "/services",
    children: [{ label: "AI Integration Services", href: "/services/ai-integration-services" }],
  },
  { label: "Industries", href: "/industries" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Process", href: "/#process" },
];
