import Link from "next/link";
import { Reveal } from "@/components/home/Reveal";
import { Icon, SectionHeading } from "@/components/home/_shared";

const INDUSTRIES = [
  { label: "Healthcare", paths: ["M22 12h-4l-3 9L9 3l-3 9H2"] },
  { label: "Financial Services", paths: ["M3 21h18", "M5 21V9l7-5 7 5v12", "M9 21v-6h6v6"] },
  { label: "Manufacturing", paths: ["M2 20h20", "M4 20V9l5 3V9l5 3V4l5 3v13"] },
  { label: "Retail", paths: ["M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z", "M3 6h18", "M16 10a4 4 0 0 1-8 0"] },
  { label: "Insurance", paths: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"] },
  { label: "Real Estate", paths: ["M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M9 22V12h6v10"] },
  { label: "Legal", paths: ["M12 3v18", "M5 7h14", "M5 7l-3 7a4 4 0 0 0 6 0Z", "M19 7l-3 7a4 4 0 0 0 6 0Z"] },
  { label: "Logistics", paths: ["M1 3h15v13H1z", "M16 8h4l3 3v5h-7", "M5.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z", "M18.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"] },
  { label: "Technology", paths: ["M9 3H4a1 1 0 0 0-1 1v5", "M15 3h5a1 1 0 0 1 1 1v5", "M9 21H4a1 1 0 0 1-1-1v-5", "M15 21h5a1 1 0 0 0 1-1v-5", "M9 9h6v6H9z"] },
  { label: "Professional Services", paths: ["M20 7h-9", "M14 17H5", "M17 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z", "M7 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"] },
];

export function IndustriesGrid() {
  return (
    <section id="industries" style={{ background: "#050B18" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(56px,7vw,104px) 28px" }}>
        <SectionHeading
          eyebrow="Industries We Help"
          heading="Empowering Every Industry with AI Innovation"
          lede="From healthcare to logistics, we build AI solutions that solve real-world challenges and drive measurable impact."
          maxWidth={640}
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(clamp(140px, 18vw, 200px), 1fr))", gap: "clamp(14px,1.6vw,20px)" }}>
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.label} delay={(i % 5) * 50}>
              <Link href="/contact" className="ind-card" style={{ height: "100%" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40 }}>
                  <Icon paths={ind.paths} size={32} stroke="#4F8CFF" />
                </span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 14.5, fontWeight: 600, lineHeight: 1.3, color: "var(--fg)" }}>{ind.label}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
