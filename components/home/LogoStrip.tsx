import { siSupabase, siGithub, siClaude, siGooglegemini, siVercel } from "simple-icons";

// AI & developer-tool ecosystem strip. Official monochrome marks (simple-icons);
// OpenAI dropped their mark from simple-icons, so Codex shows as a wordmark.
const TOOLS: { label: string; path?: string }[] = [
  { label: "Supabase", path: siSupabase.path },
  { label: "GitHub", path: siGithub.path },
  { label: "Claude Code", path: siClaude.path },
  { label: "OpenAI Codex" },
  { label: "Gemini", path: siGooglegemini.path },
  { label: "Vercel", path: siVercel.path },
  { label: "Claude", path: siClaude.path },
];

export function LogoStrip() {
  // Duplicate once so the -50% marquee loops seamlessly.
  const row = [...TOOLS, ...TOOLS];
  return (
    <div
      className="ai-marquee"
      style={{
        position: "relative",
        zIndex: 2,
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        background: "rgba(8,11,18,0.6)",
        overflow: "hidden",
      }}
    >
      <div className="ai-marquee-track" style={{ display: "flex", width: "max-content", animation: "bs-marquee 40s linear infinite", willChange: "transform" }}>
        {row.map((t, i) => (
          <div
            key={i}
            className="ai-marquee-item"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "24px 40px",
              color: "#fff",
              opacity: 0.75,
              transition: "opacity 0.2s ease",
              whiteSpace: "nowrap",
            }}
          >
            {t.path && (
              <svg height={26} viewBox="0 0 24 24" fill="currentColor" aria-hidden style={{ flexShrink: 0 }}>
                <path d={t.path} />
              </svg>
            )}
            <span style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 600, letterSpacing: "0.01em" }}>{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
