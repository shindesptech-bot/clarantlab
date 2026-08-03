"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const HERO_H1 = "Build Enterprise AI Solutions with Expert Consulting & Development";

const FEATURES = [
  { label: "Enterprise Security", paths: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", "m9 12 2 2 4-4"] },
  { label: "Proven Methodology", paths: ["M9 11l3 3L22 4", "M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"] },
  { label: "AI Strategy Experts", paths: ["M12 2a10 10 0 1 0 10 10", "M12 6v6l4 2"] },
  { label: "Scalable Solutions", paths: ["M4 4h6v6H4z", "M14 4h6v6h-6z", "M4 14h6v6H4z", "M14 14h6v6h-6z"] },
];

function Icon({ paths }: { paths: string[] }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

// Single-pass typewriter for the hero H1 (matches the reference — 32ms/char).
function useTypewriter(full: string) {
  const [text, setText] = useState("");
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setText(full); return; }
    let i = 0, timer: ReturnType<typeof setTimeout>;
    const tick = () => { i++; setText(full.slice(0, i)); if (i < full.length) timer = setTimeout(tick, 32); };
    tick();
    return () => clearTimeout(timer);
  }, [full]);
  return text;
}

export function HeroSection() {
  const typed = useTypewriter(HERO_H1);

  return (
    <section style={{ position: "relative", background: "var(--bg-hero)", overflow: "hidden", isolation: "isolate" }}>
      {/* Full-bleed background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/hero-ai-core.png"
        aria-label="AI Command Center — the AI CORE connecting CRM, Documents, ERP, AI Agents, Analytics, and Automation"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", zIndex: 0 }}
      >
        <source src="/assets/hero.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay for legibility — near-solid on the left where the copy sits, fading right to keep the video visible */}
      <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(90deg, rgba(3,6,16,0.95) 0%, rgba(3,6,16,0.88) 38%, rgba(4,8,20,0.6) 70%, rgba(4,8,20,0.4) 100%)" }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1440, margin: "0 auto", padding: "clamp(20px,2.5vw,36px) clamp(28px,4vw,60px) clamp(28px,3vw,52px)" }}>
        {/* Foreground text sits on the dark video in both themes — force light tones + shadow for separation */}
        <div style={{ minWidth: 0, color: "#fff", textShadow: "0 1px 24px rgba(0,0,0,0.55)" }}>
          <div style={{ maxWidth: 720 }}>
            <div className="eyebrow" style={{ marginBottom: 22 }}>AI Consulting. AI Development. Real Business Impact.</div>
            <h1 style={{ margin: "0 0 22px", minHeight: "2.1em", textWrap: "balance" }}>
              <span>{typed}</span>
              <span aria-hidden style={{ display: "inline-block", width: 3, height: "0.9em", marginLeft: 3, background: "var(--accent)", verticalAlign: "-2px", animation: "bs-blink 1s step-end infinite" }} />
            </h1>
            <p style={{ fontSize: "clamp(16px,1.7vw,19px)", lineHeight: 1.6, color: "rgba(255,255,255,0.88)", margin: "0 0 32px", maxWidth: 560 }}>
              We help businesses transform ideas into measurable impact with custom AI solutions, automation, and intelligent systems built for the enterprise.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 40 }}>
              <Link href="/contact" className="energy-btn energy-btn-lg">
                <span className="energy-shimmer" />
                <span style={{ position: "relative", zIndex: 2, display: "inline-flex", alignItems: "center", gap: 9 }}>
                  Talk to an AI Expert <ArrowRight size={17} strokeWidth={2.2} />
                </span>
              </Link>
              <Link href="/contact" className="ghost-btn">
                <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
                  Book a Free Consultation <ArrowRight size={16} strokeWidth={2.2} />
                </span>
              </Link>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "26px 32px" }}>
              {FEATURES.map((f) => (
                <div key={f.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ display: "inline-flex", width: 30, height: 30, alignItems: "center", justifyContent: "center" }}><Icon paths={f.paths} /></span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 500, lineHeight: 1.25, color: "rgba(255,255,255,0.9)" }}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



