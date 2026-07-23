"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/home/_shared";

const CHECKLIST = [
  "Identify high-value AI opportunities",
  "Create an AI roadmap with strategy consulting",
  "Deliver custom AI solutions",
  "Modernize operations through automation",
  "Integrate AI into enterprise platforms",
  "Optimize AI performance over time",
];

const PLANNER = [
  { title: "Your Business Team", sub: "Stakeholders & Domain Experts", paths: ["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8"] },
  { title: "Forward Deployed Engineer", sub: "AI Architects · Engineers · Consultants", paths: ["M12 2a4 4 0 0 0-4 4v2a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4Z", "M4 22a8 8 0 0 1 16 0"] },
  { title: "AI Solution", sub: "Custom · Scalable · Secure", paths: ["M12 8V4H8", "M4 15a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2Z", "M9 13v2", "M15 13v2"] },
  { title: "Business Impact", sub: "Growth · Efficiency · Innovation", paths: ["M3 3v18h18", "m19 9-5 5-4-4-3 3"] },
];

// Fires once when the element scrolls into view.
function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, active };
}

export function WhyFde() {
  const scan = useInView(0.35);
  const plan = useInView(0.3);

  return (
    <section style={{ background: "var(--bg-0)" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(48px,6vw,88px) 28px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "clamp(28px,3vw,44px)", alignItems: "start" }}>
          {/* LEFT — scanner checklist */}
          <div ref={scan.ref}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Why Build with Genie</div>
            <h3 style={{ margin: "0 0 16px", color: "var(--fg)" }}>Forward Deployed Engineers Who Deliver Real Impact</h3>
            <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--fg-dim)", margin: "0 0 24px" }}>
              Our Forward Deployed Engineers (FDEs) become an extension of your team, combining AI expertise with business understanding to solve real challenges and drive measurable results.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {CHECKLIST.map((ck, i) => {
                const on = scan.active;
                return (
                  <div key={ck} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span
                      style={{
                        flex: "none",
                        width: 22,
                        height: 22,
                        borderRadius: 9999,
                        background: on ? "var(--accent)" : "rgba(255,255,255,0.06)",
                        border: `1px solid ${on ? "var(--accent)" : "var(--line-strong)"}`,
                        boxShadow: on ? "0 0 12px -2px rgba(59,130,246,0.9)" : "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.4s",
                        transitionDelay: `${i * 160}ms`,
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={on ? "#fff" : "var(--fg-faint)"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.4s", transitionDelay: `${i * 160}ms` }}>
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                    <span style={{ fontSize: 14.5, color: "var(--fg)" }}>{ck}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* MIDDLE — agent planner */}
          <div>
            <div ref={plan.ref} style={{ border: "1px solid var(--line-strong)", borderRadius: 18, background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))", padding: 22 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 11.5, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-dim)", marginBottom: 18 }}>
                How We Work Together
              </div>
              <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 12 }}>
                <span
                  style={{
                    position: "absolute",
                    left: 25,
                    top: 24,
                    bottom: 24,
                    width: 2,
                    background: "linear-gradient(180deg, var(--accent), rgba(59,130,246,0.2))",
                    transformOrigin: "top",
                    transform: plan.active ? "scaleY(1)" : "scaleY(0)",
                    transition: "transform 1.2s cubic-bezier(.4,0,.2,1)",
                  }}
                />
                {PLANNER.map((pl, i) => (
                  <div
                    key={pl.title}
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "15px 16px",
                      borderRadius: 13,
                      border: `1px solid ${plan.active ? "var(--accent-line)" : "var(--line)"}`,
                      background: plan.active ? "rgba(59,130,246,0.06)" : "rgba(255,255,255,0.02)",
                      opacity: plan.active ? 1 : 0.4,
                      transform: plan.active ? "translateX(0)" : "translateX(8px)",
                      transition: "opacity 0.5s, transform 0.5s, border-color 0.5s, background 0.5s",
                      transitionDelay: `${260 + i * 300}ms`,
                    }}
                  >
                    <span style={{ flex: "none", width: 22, height: 22, borderRadius: 9999, background: "rgba(59,130,246,0.16)", border: "1px solid var(--accent-line)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
                      <Icon paths={pl.paths} size={13} />
                    </span>
                    <div>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 600, color: "var(--fg)", lineHeight: 1.2 }}>{pl.title}</div>
                      <div style={{ fontSize: 11.5, color: "var(--fg-faint)", marginTop: 2 }}>{pl.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — FDE photo */}
          <div>
            <div style={{ position: "relative", borderRadius: 18, overflow: "hidden", minHeight: 320, height: "100%", border: "1px solid var(--line)" }}>
              <Image src="/assets/fde-team.png" alt="Forward Deployed Engineers collaborating with a client team" fill sizes="(max-width: 900px) 100vw, 33vw" style={{ objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,15,25,0.15) 30%, rgba(11,15,25,0.9))", pointerEvents: "none" }} />
              <div style={{ position: "absolute", left: 22, right: 22, bottom: 22, pointerEvents: "none" }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em", margin: "0 0 8px", color: "#fff" }}>Your FDE Becomes Part of Your Team</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "var(--fg-dim)", margin: 0 }}>Working side-by-side from discovery to deployment and beyond.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
