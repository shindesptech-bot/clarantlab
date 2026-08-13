"use client";

import { useRef, useState } from "react";

/* Interactive vertical-tab explorer for the "Our Healthcare AI Services"
   section — the one part of the Healthcare page that needs client state.
   Ported from the healthcare-ai.html reference (4 tabs, arrow-key nav,
   animated panel + staggered list). Styling uses the site's design tokens. */

type Service = {
  num: string;
  title: string;
  icon: string; // inner SVG markup
  intro: string;
  points: string[];
  note: string;
};

const ICON_SPARKLE =
  '<path d="m12 3-1.9 4.6L5.5 9.5l4.6 1.9L12 16l1.9-4.6 4.6-1.9-4.6-1.9z"></path><path d="M19 14v4"></path><path d="M17 16h4"></path>';
const ICON_FLOW =
  '<path d="M12 20a8 8 0 1 0-8-8"></path><path d="M4 4v5h5"></path><path d="M12 8v4l3 2"></path>';
const ICON_CHAT =
  '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><path d="M9 10h.01"></path><path d="M13 10h.01"></path><path d="M17 10h.01"></path>';
const ICON_CHART =
  '<path d="M3 3v18h18"></path><path d="m7 15 4-5 3 3 5-7"></path>';

const SERVICES: Service[] = [
  {
    num: "01",
    title: "Generative AI in Healthcare",
    icon: ICON_SPARKLE,
    intro:
      "Generative AI in healthcare helps organizations create faster, smarter, and more personalized experiences for both patients and healthcare professionals. Build with Genie develops secure generative AI solutions that can:",
    points: [
      "Automate patient communications",
      "Summarize patient records",
      "Assist with medical research",
      "Generate clinical documentation",
      "Support healthcare knowledge management",
      "Create personalized healthcare content",
    ],
    note: "Our solutions are designed with privacy, compliance, and accuracy in mind.",
  },
  {
    num: "02",
    title: "AI-Powered Workflow Automation",
    icon: ICON_FLOW,
    intro:
      "Healthcare teams spend countless hours on repetitive administrative work. We build AI-powered automation solutions that help organizations automate:",
    points: [
      "Appointment scheduling",
      "Billing support",
      "Patient follow-ups",
      "Medical documentation",
      "Insurance verification",
      "Internal workflow approvals",
      "Referral management",
    ],
    note: "This allows healthcare professionals to focus more on patient care instead of manual processes.",
  },
  {
    num: "03",
    title: "Intelligent Patient Support",
    icon: ICON_CHAT,
    intro:
      "Patients expect quick, accurate responses at every stage of their healthcare journey. We build AI assistants that can:",
    points: [
      "Provide medication instructions",
      "Answer patient questions",
      "Send reminders",
      "Guide patients through healthcare services",
      "Schedule appointments",
      "Support multiple communication channels",
    ],
    note: "These AI assistants provide 24/7 support while reducing the workload on administrative staff.",
  },
  {
    num: "04",
    title: "Healthcare Data Intelligence",
    icon: ICON_CHART,
    intro:
      "Healthcare organizations generate massive amounts of data every day. Our AI solutions help transform that information into meaningful insights by:",
    points: [
      "Supporting resource planning",
      "Identifying operational trends",
      "Improving reporting",
      "Monitoring patient outcomes",
      "Assisting executive decision-making",
    ],
    note: "Instead of manually reviewing large datasets, leadership teams gain actionable insights in real time.",
  },
];

function Icon({ markup, size = 15, color = "currentColor" }: { markup: string; size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}

export function HealthcareServices() {
  const [tab, setTab] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKey(e: React.KeyboardEvent) {
    const delta = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    let next: number | null = null;
    if (delta) next = (tab + delta + SERVICES.length) % SERVICES.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = SERVICES.length - 1;
    if (next === null) return;
    e.preventDefault();
    setTab(next);
    tabRefs.current[next]?.focus({ preventScroll: true });
  }

  const active = SERVICES[tab];

  return (
    <div className="hc-explorer">
      {/* Tablist */}
      <div role="tablist" aria-label="Healthcare AI services" aria-orientation="vertical" className="hc-tablist">
        {SERVICES.map((s, i) => {
          const on = i === tab;
          return (
            <button
              key={s.num}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`hc-tab-${i}`}
              aria-controls={`hc-panel-${i}`}
              aria-selected={on}
              tabIndex={on ? 0 : -1}
              onClick={() => setTab(i)}
              onKeyDown={onKey}
              className="hc-tab"
              data-on={on}
            >
              <span className="hc-tab-ico" data-on={on}>
                <Icon markup={s.icon} />
              </span>
              <span style={{ minWidth: 0, textAlign: "left", display: "grid", gap: 2 }}>
                <span className="hc-tab-num" data-on={on}>{s.num}</span>
                <span style={{ fontSize: 14.5, fontWeight: 600, letterSpacing: "-0.012em", lineHeight: 1.3 }}>{s.title}</span>
              </span>
              <span className="hc-tab-dot" data-on={on} />
              <span aria-hidden className="hc-tab-line" data-on={on}>
                <span className="hc-tab-pulse" data-on={on} />
              </span>
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div className="hc-panel-shell">
        <div key={tab} role="tabpanel" id={`hc-panel-${tab}`} aria-labelledby={`hc-tab-${tab}`} className="hc-panel">
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <span className="hc-panel-ico">
              <Icon markup={active.icon} size={17} color="var(--accent-hover)" />
            </span>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", color: "var(--accent)", fontVariantNumeric: "tabular-nums" }}>
              {active.num}
            </span>
            <span style={{ flex: 1, height: 1, background: "linear-gradient(90deg, var(--accent-line), rgba(255,255,255,0.05))" }} />
          </div>
          <h3 style={{ fontSize: "clamp(20px,2.3vw,26px)", fontWeight: 700, letterSpacing: "-0.024em", lineHeight: 1.2, margin: "0 0 12px", color: "#fff" }}>
            {active.title}
          </h3>
          <p style={{ fontSize: 15, lineHeight: 1.68, color: "var(--fg-dim)", margin: "0 0 18px" }}>{active.intro}</p>
          <ul className="hc-panel-list">
            {active.points.map((p, i) => (
              <li key={p} style={{ animationDelay: `${0.05 + i * 0.035}s` }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: 4 }}>
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <p style={{ margin: "20px 0 0", paddingTop: 16, borderTop: "1px solid var(--line)", fontSize: 13.5, lineHeight: 1.6, color: "var(--fg-faint)" }}>
            {active.note}
          </p>
        </div>
      </div>

      <style>{`
        .hc-explorer { display: grid; grid-template-columns: minmax(260px, 0.37fr) minmax(0, 0.63fr); gap: clamp(18px,2.2vw,30px); align-items: start; }
        .hc-tablist { display: grid; gap: 8px; position: sticky; top: 96px; }
        .hc-tab { position: relative; display: grid; grid-template-columns: auto minmax(0,1fr) auto; align-items: center; gap: 13px; width: 100%; padding: 13px 15px; border-radius: 14px; cursor: pointer; text-align: left; font-family: inherit; border: 1px solid var(--line); background: rgba(255,255,255,0.02); color: var(--fg-soft); transition: background .28s cubic-bezier(.2,0,0,1), border-color .28s, color .28s, box-shadow .28s, transform .28s cubic-bezier(.2,0,0,1); }
        .hc-tab[data-on="true"] { border-color: rgba(59,130,246,0.5); background: linear-gradient(90deg, rgba(59,130,246,0.17), rgba(59,130,246,0.03)); box-shadow: 0 16px 44px -30px rgba(59,130,246,1), inset 0 0 0 1px rgba(59,130,246,0.10); color: #fff; transform: translateX(2px); }
        .hc-tab-ico { width: 32px; height: 32px; flex: none; border-radius: 10px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--line-strong); background: rgba(255,255,255,0.03); color: var(--fg-faint); transition: transform .28s cubic-bezier(.2,0,0,1), background .28s, border-color .28s, color .28s, box-shadow .28s; }
        .hc-tab-ico[data-on="true"] { border-color: var(--accent-line); background: rgba(59,130,246,0.16); color: var(--accent-bright); transform: scale(1.06); box-shadow: 0 0 18px -6px rgba(59,130,246,0.8); }
        .hc-tab-num { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; font-variant-numeric: tabular-nums; color: var(--fg-faintest); transition: color .25s; }
        .hc-tab-num[data-on="true"] { color: var(--accent-hover); }
        .hc-tab-dot { width: 6px; height: 6px; border-radius: 9999px; background: rgba(255,255,255,0.14); transition: background .25s, box-shadow .25s; }
        .hc-tab-dot[data-on="true"] { background: var(--accent); box-shadow: 0 0 12px rgba(59,130,246,0.95); }
        .hc-tab-line { position: absolute; left: 100%; top: 50%; width: clamp(18px,2.2vw,30px); height: 1px; overflow: hidden; background: linear-gradient(90deg, rgba(59,130,246,0.85), rgba(59,130,246,0)); opacity: 0; transform: scaleX(0); transform-origin: left center; transition: opacity .28s, transform .32s cubic-bezier(.2,0,0,1); pointer-events: none; }
        .hc-tab-line[data-on="true"] { opacity: 1; transform: scaleX(1); }
        .hc-tab-pulse { display: none; width: 40%; height: 100%; background: linear-gradient(90deg, transparent, #93c5fd, transparent); }
        .hc-tab-pulse[data-on="true"] { display: block; animation: hc-svc-travel 2.6s cubic-bezier(.2,0,0,1) infinite; }
        .hc-panel-shell { position: relative; border: 1px solid var(--line); border-radius: 16px; background: linear-gradient(160deg, rgba(59,130,246,0.055), rgba(255,255,255,0.014) 52%); padding: clamp(22px,2.6vw,32px); }
        .hc-panel { animation: hc-svc-in .34s cubic-bezier(.2,0,0,1) both; }
        .hc-panel-ico { width: 34px; height: 34px; flex: none; border-radius: 9px; display: flex; align-items: center; justify-content: center; background: rgba(59,130,246,0.13); border: 1px solid var(--accent-line); }
        .hc-panel-list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px 22px; }
        .hc-panel-list li { display: flex; gap: 9px; align-items: flex-start; font-size: 14px; line-height: 1.5; color: var(--fg-soft); animation: hc-svc-item .3s cubic-bezier(.2,0,0,1) both; }
        @keyframes hc-svc-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes hc-svc-item { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: none; } }
        @keyframes hc-svc-travel { 0% { transform: translateX(-90%); opacity: 0; } 30% { opacity: 1; } 100% { transform: translateX(260%); opacity: 0; } }
        @media (max-width: 900px) { .hc-explorer { grid-template-columns: 1fr; } .hc-tablist { position: static; } .hc-tab-line { display: none; } }
      `}</style>
    </div>
  );
}
