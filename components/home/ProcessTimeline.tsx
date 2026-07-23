"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/home/Reveal";

const STEPS = [
  { n: 1, title: "Discover", desc: "We understand your business, challenges, workflows, and goals to identify the highest impact opportunities." },
  { n: 2, title: "Strategy", desc: "We build an AI roadmap with the right technologies, architecture, and success metrics." },
  { n: 3, title: "Design", desc: "Our architects design secure, scalable, and future-ready AI solutions tailored to your business." },
  { n: 4, title: "Build", desc: "We develop production-ready AI applications using modern technologies and best practices." },
  { n: 5, title: "Deploy", desc: "We integrate, test, and deploy with minimal disruption and ensure your team is ready to adopt." },
  { n: 6, title: "Optimize", desc: "We continuously monitor, improve, and evolve your AI solutions for long-term business value." },
];

export function ProcessTimeline() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="process" style={{ background: "var(--bg-0)" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(48px,6vw,80px) 28px" }}>
        <div style={{ textAlign: "center", margin: "0 auto clamp(36px,4vw,56px)", maxWidth: 760 }}>
          <Reveal><p style={{ fontFamily: "var(--font-display)", fontSize: 12.5, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8FA0BC", margin: "0 0 18px" }}>Our AI Development Process</p></Reveal>
          <Reveal delay={60}><h2 style={{ color: "#fff", margin: 0, textWrap: "balance" }}>How We Turn AI Initiatives into Business Impact</h2></Reveal>
          <Reveal delay={120}><p style={{ fontSize: "clamp(18px,1.4vw,17px)", lineHeight: 1.6, color: "#9FB0CC", margin: "20px auto 0", maxWidth: 640 }}>Our structured six-stage methodology helps organizations move from AI strategy and planning to deployment, adoption, and continuous optimization while delivering measurable business outcomes.</p></Reveal>
        </div>
        <div ref={ref} style={{ position: "relative" }}>
          <svg viewBox="0 0 1160 20" preserveAspectRatio="none" className="tl-line" style={{ position: "absolute", top: 15, left: 0, width: "100%", height: 20, overflow: "visible" }}>
            <line x1="30" y1="6" x2="1130" y2="6" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
            <line x1="30" y1="6" x2="1130" y2="6" stroke="#3B82F6" strokeWidth="2.5" strokeDasharray="1100" strokeDashoffset={on ? 0 : 1100} style={{ filter: "drop-shadow(0 0 6px rgba(59,130,246,0.8))", transition: "stroke-dashoffset 1.9s cubic-bezier(.4,0,.2,1)" }} />
          </svg>
          <div className="tl-grid">
            {STEPS.map((ps, i) => (
              <div key={ps.n} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <span style={{ width: 34, height: 34, borderRadius: 9999, background: on ? "linear-gradient(135deg, #3B82F6, #2563EB)" : "#10151F", border: `2px solid ${on ? "#3B82F6" : "rgba(255,255,255,0.2)"}`, color: on ? "#fff" : "#8FA0BC", boxShadow: on ? "0 0 18px -2px rgba(59,130,246,0.9)" : "none", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, marginBottom: 20, transition: "all .5s", transitionDelay: `${300 + i * 260}ms` }}>{ps.n}</span>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600, color: "var(--fg)", marginBottom: 7 }}>{ps.n}. {ps.title}</div>
                <div style={{ fontSize: 14, lineHeight: 1.5, color: "var(--fg-faint)", maxWidth: 170 }}>{ps.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .tl-grid { position: relative; display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; }
        @media (max-width: 860px) {
          .tl-grid { grid-template-columns: repeat(3, 1fr); gap: 32px 12px; }
          .tl-line { display: none; }
        }
        @media (max-width: 520px) {
          .tl-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  );
}
