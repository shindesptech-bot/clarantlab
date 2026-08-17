"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/home/_shared";

const ITEMS = [
  { n: "01", title: "Dedicated Forward Deployed Engineers", desc: "Senior AI engineers embedded directly in your team from day one.", support: "Your FDE learns your systems, data, and goals — acting as an extension of your team, not an outside vendor.", bullets: ["Embedded senior engineers, not junior contractors", "Deep context on your systems and data", "Direct accountability from day one"], paths: ["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8", "M22 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75"] },
  { n: "02", title: "Tailored AI Strategy", desc: "A roadmap built around your business, data, and goals — never a template.", support: "We prioritize the highest-value opportunities first and tie every initiative to a measurable business outcome.", bullets: ["Roadmap mapped to your business goals", "Highest-ROI opportunities prioritized first", "Every initiative tied to a metric"], paths: ["M12 2a10 10 0 1 0 10 10", "M12 6v6l4 2"] },
  { n: "03", title: "Faster AI Implementation", desc: "Production value in weeks, not quarters, using proven methods.", support: "Battle-tested accelerators and reusable components compress delivery timelines without cutting corners.", bullets: ["First production value in weeks", "Reusable accelerators cut build time", "No corners cut on quality"], paths: ["M13 2 3 14h9l-1 8 10-12h-9z"] },
  { n: "04", title: "Enterprise-Ready Security", desc: "SSO, audit trails, and governance native to every solution we ship.", support: "We meet your compliance requirements from day one — SOC 2, HIPAA, on-prem/VPC deployment, and role-based access.", bullets: ["SOC 2 & HIPAA-aligned by default", "On-prem / VPC deployment options", "SSO, RBAC, and full audit trails"], paths: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", "m9 12 2 2 4-4"] },
  { n: "05", title: "Scalable AI Architecture", desc: "Cloud-native systems engineered to grow with your usage.", support: "Architectures designed for reliability and elastic scale, so performance holds as adoption expands across teams.", bullets: ["Cloud-native, elastic scaling", "Reliable under growing load", "Grows across teams without rework"], paths: ["M4 4h6v6H4z", "M14 4h6v6h-6z", "M4 14h6v6H4z", "M14 14h6v6h-6z"] },
  { n: "06", title: "Seamless Integrations", desc: "Connect AI into your CRM, ERP, cloud, and internal tools.", support: "AI works inside the tools your teams already use, with 200+ connectors and custom enterprise integrations.", bullets: ["200+ prebuilt connectors", "Works inside your existing tools", "Custom enterprise integrations"], paths: ["M9 17H7A5 5 0 0 1 7 7h2", "M15 7h2a5 5 0 1 1 0 10h-2", "M8 12h8"] },
  { n: "07", title: "End-to-End AI Consulting", desc: "From Deployment to Long-Term Success, One Trusted Partner.", support: "Strategy, design, build, deploy, and optimize — all handled by one accountable team, not a chain of hand-offs.", bullets: ["One accountable team, no hand-offs", "Strategy through deployment covered", "Single point of ownership"], paths: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", "M14 2v6h6", "M9 15l2 2 4-4"] },
  { n: "08", title: "Continuous Optimization & Support", desc: "Ongoing monitoring, tuning, and improvements after go-live.", support: "We track performance, refine prompts and models, and expand capabilities as your business evolves.", bullets: ["Ongoing monitoring after go-live", "Models and prompts continuously tuned", "Capabilities expand with your business"], paths: ["M3 12a9 9 0 1 0 9-9", "M3 12v-5", "M3 7h5"] },
  { n: "09", title: "Business-First AI Approach", desc: "Every engagement tied to measurable business outcomes.", support: "Technology serves the business case — we start from ROI and work backward to the right AI solution.", bullets: ["Starts from ROI, not technology", "Outcomes measured, not just shipped", "Business case drives every decision"], paths: ["M3 3v18h18", "m19 9-5 5-4-4-3 3"] },
];

export function WhyChoose() {
  const [sel, setSel] = useState(0);
  const secRef = useRef<HTMLElement | null>(null);
  const clicked = useRef(false);
  const active = ITEMS[sel];

  // Scroll-driven index (mirrors the reference's setupWhyOS); a click pins selection.
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (clicked.current || ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const sec = secRef.current;
        if (!sec) return;
        const r = sec.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = r.height - vh * 0.5;
        if (total <= 0) return;
        let frac = (vh * 0.45 - r.top) / total;
        frac = Math.max(0, Math.min(0.999, frac));
        setSel(Math.floor(frac * ITEMS.length));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={secRef} id="whychoose" style={{ position: "relative", overflow: "hidden", background: "var(--bg-services)" }}>
      <div style={{ position: "absolute", inset: "-30%", zIndex: 0, pointerEvents: "none", background: "radial-gradient(600px 500px at 30% 30%, rgba(59,130,246,0.12), transparent 60%), radial-gradient(560px 480px at 78% 72%, rgba(59,130,246,0.08), transparent 62%)", animation: "bs-drift 18s ease-in-out infinite alternate" }} />
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "clamp(48px,6vw,88px) 28px" }}>
        <div style={{ marginBottom: "clamp(30px,4vw,52px)", maxWidth: 640 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Why Build with Genie</div>
          <h2 style={{ margin: 0 }}>Why companies choose Build with Genie</h2>
        </div>

        <div className="wc-grid">
          {/* left — number index */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {ITEMS.map((it, i) => {
              const on = i === sel;
              const done = i < sel;
              return (
                <button
                  key={it.n}
                  onClick={() => { clicked.current = true; setSel(i); }}
                  style={{ display: "flex", alignItems: "baseline", gap: 16, padding: "clamp(10px,1.4vw,16px) 0", borderTop: `1px solid ${on ? "rgba(59,130,246,0.45)" : "var(--line)"}`, background: "transparent", textAlign: "left", width: "100%", cursor: "pointer" }}
                >
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px,3.4vw,40px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1, color: on ? "var(--accent-bright)" : done ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.28)", textShadow: on ? "0 0 22px rgba(59,130,246,0.5)" : "none", minWidth: "1.6em", transition: "color 0.4s, text-shadow 0.4s" }}>{it.n}</span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(14px,1.6vw,18px)", fontWeight: 600, lineHeight: 1.25, color: on ? "#fff" : done ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.55)", transition: "color 0.4s" }}>{it.title}</span>
                </button>
              );
            })}
          </div>

          {/* right — sticky detail card */}
          <div className="wc-sticky">
            <div style={{ position: "relative", border: "1px solid var(--line)", borderRadius: 20, background: "rgba(255,255,255,0.03)", padding: "clamp(26px,3.2vw,44px)", overflow: "hidden", boxShadow: "0 24px 60px -34px rgba(59,130,246,0.5)" }}>
              <div aria-hidden style={{ position: "absolute", top: 0, right: 0, fontFamily: "var(--font-display)", fontSize: "clamp(110px,17vw,190px)", fontWeight: 700, lineHeight: 0.8, color: "rgba(59,130,246,0.08)", padding: "8px 18px", pointerEvents: "none" }}>{active.n}</div>
              <div key={active.n} style={{ position: "relative", animation: "bs-rise .5s cubic-bezier(.2,0,0,1) both" }}>
                <span style={{ display: "inline-flex", width: 52, height: 52, borderRadius: 14, alignItems: "center", justifyContent: "center", background: "var(--accent-soft)", border: "1px solid var(--accent-line)", marginBottom: 18 }}>
                  <Icon paths={active.paths} size={24} />
                </span>
                <h3 style={{ fontSize: "clamp(21px,2.5vw,29px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 12px", color: "#fff" }}>{active.title}</h3>
                <p style={{ fontSize: "clamp(15px,1.6vw,17px)", lineHeight: 1.55, color: "rgba(255,255,255,0.75)", margin: "0 0 12px", maxWidth: 540 }}>{active.desc}</p>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.55)", margin: "0 0 22px", maxWidth: 540 }}>{active.support}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 26 }}>
                  {active.bullets.map((b) => (
                    <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ flex: "none", marginTop: 2, color: "var(--accent-bright)" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                      </span>
                      <span style={{ fontSize: 16, lineHeight: 1.4, color: "rgba(255,255,255,0.82)" }}>{b}</span>
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="energy-btn">
                  <span className="energy-shimmer" />
                  <span style={{ position: "relative", zIndex: 2, display: "inline-flex", alignItems: "center", gap: 8 }}>
                    Book a Free Consultation <ArrowRight size={15} strokeWidth={2.4} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .wc-grid { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: clamp(28px,5vw,80px); align-items: start; }
        .wc-sticky { position: sticky; top: clamp(72px, 9vh, 104px); align-self: start; }
        @media (max-width: 860px) {
          .wc-grid { grid-template-columns: 1fr; gap: 28px; }
          .wc-sticky { position: static; }
        }
      `}</style>
    </section>
  );
}
