import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { Icon, SectionHeading } from "@/components/home/_shared";

const SERVICES = [
  { title: "AI Consulting Services", desc: "Strategic assessments, technical evaluations, and AI roadmaps that deliver measurable business outcomes.", paths: ["M12 2a10 10 0 1 0 10 10", "M12 6v6l4 2"] },
  { title: "Custom AI Solutions", desc: "Tailored AI solutions designed around your workflows, objectives, and operational requirements.", paths: ["M20 7 12 3 4 7l8 4 8-4Z", "M4 7v10l8 4", "M20 7v10l-8 4", "M12 11v10"] },
  { title: "Generative AI Development", desc: "Enterprise search, AI assistants, document intelligence, knowledge systems, and copilots.", paths: ["M5 3v4", "M3 5h4", "M19 17v4", "M17 19h4", "M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z"] },
  { title: "AI Automation Services", desc: "Automate repetitive tasks, streamline processes, and improve productivity across your organization.", paths: ["M12 2v4", "m16.2 7.8 2.9-2.9", "M18 12h4", "m16.2 16.2 2.9 2.9", "M12 18v4", "m7.8 16.2-2.9 2.9", "M2 12h4", "m7.8 7.8-2.9-2.9"] },
  { title: "Autonomous AI Agents", desc: "Intelligent agents that understand context, make decisions, and execute complex workflows.", paths: ["M12 8V4H8", "M4 15a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2Z", "M9 13v2", "M15 13v2"] },
  { title: "Enterprise AI Solutions", desc: "Secure, scalable AI systems that integrate with your enterprise applications and data.", paths: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", "m9 12 2 2 4-4"] },
  { title: "AI Strategy Consulting", desc: "Successful AI adoption starts with a clear strategy, not just the latest technology. ", paths: ["M6 16a3 3 0 1 0 0 6 3 3 0 1 0 0-6", "M18 2a3 3 0 1 0 0 6 3 3 0 1 0 0-6", "M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"] },
  { title: "AI Architecture Services", desc: "Our AI architects design secure, scalable, enterprise-ready AI architectures that integrate seamlessly with cloud platforms.", paths: ["M9 2h6v6H9z", "M2 16h6v6H2z", "M16 16h6v6h-6z", "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3", "M12 12V8"] },
];

export function ServicesPreview() {
  return (
    <section id="services" style={{ background: "var(--bg-services)" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(48px,6vw,88px) 28px" }}>
        <SectionHeading eyebrow="Our Services" heading="AI Services Built Around Your Business" underline />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {SERVICES.map((sv, i) => (
            <Reveal key={sv.title} delay={i * 60}>
              <div className="sv-card" style={{ height: "100%" }}>
                <span style={{ display: "inline-flex", width: 52, height: 52, borderRadius: 13, alignItems: "center", justifyContent: "center", background: "var(--accent-soft)", border: "1px solid var(--accent-line)", marginBottom: 18 }}>
                  <Icon paths={sv.paths} size={24} />
                </span>
                <h3 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em", margin: "0 0 10px", color: "var(--fg)" }}>{sv.title}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--fg-dim)", margin: "0 0 18px" }}>{sv.desc}</p>
                <Link href="/services" className="learn-link" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13.5, fontWeight: 600, fontFamily: "var(--font-display)" }}>
                  Learn More <ArrowRight size={15} strokeWidth={2.2} />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
