import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const COMPANY = [
  { label: "About", href: "/#why" },
 

  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// No standalone pages for each service line — route to the services hub, with
// AI Integration going to its dedicated page. ponytail: point to real routes,
// split out when each service gets its own page.
const SERVICES = [
  { label: "Mcp Implementation", href: "/services" },
  { label: "Rag Implementation", href: "/services" },
  { label: "AI Integration", href: "/services/ai-integration" },

  { label: "AI Development", href: "/services" },
  { label: "Enterprise AI Solutions", href: "/services" },
];

const CONTACT = [
  { icon: Mail, label: "support@buildwithgenie.com", href: "mailto:support@buildwithgenie.com" },
  { icon: Phone, label: "+1 240 281 0320", href: "tel:+16175550118" },
  { icon: MapPin, label: "Boston · Lisbon · Bengaluru", href: null },
];

// Inline brand glyphs (currentColor) — lucide 1.x dropped brand icons and
// react-icons isn't installed. ponytail: 6 paths beat a new dependency.
const SOCIAL = [
  { label: "X", href: "#", d: ["M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"] },
  { label: "LinkedIn", href: "#", d: ["M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"] },
  { label: "GitHub", href: "#", d: ["M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"] },
  { label: "Instagram", href: "#", d: ["M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"] },
  { label: "YouTube", href: "#", d: ["M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"] },
];

const colHead: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--fg-faint)",
  margin: "0 0 20px",
  fontWeight: 400,
};

function LinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h5 style={colHead}>{title}</h5>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
        {links.map((l) => (
          <li key={`${title}-${l.label}`}>
            <Link href={l.href} className="footer-link" style={{ color: "var(--fg-dim)", fontSize: 14, transition: "color 0.18s" }}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialRow() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
      {SOCIAL.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="footer-social"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "var(--bg-2)",
            color: "var(--fg-dim)",
            transition: "color 0.25s, border-color 0.25s, transform 0.25s, box-shadow 0.25s",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            {s.d.map((d, i) => <path key={i} d={d} />)}
          </svg>
        </a>
      ))}
    </div>
  );
}

export function Footer() {
  return (
    <footer style={{ background: "var(--bg-footer)", padding: "clamp(48px,6vw,88px) 0 40px" }}>
      <div className="wrap">
        {/* Premium card */}
        <div
          style={{
            background: "var(--bg-1)",
            border: "1px solid var(--line)",
            borderRadius: 24,
            padding: "clamp(32px,4vw,56px)",
            boxShadow: "0 40px 90px -60px rgba(0,0,0,0.8)",
          }}
        >
          <div className="footer-cols" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1.2fr", gap: "clamp(32px,4vw,64px)" }}>
            {/* Brand */}
            <div>
              <Link href="/" style={{ display: "inline-flex", alignItems: "center", fontFamily: "var(--font-mono)", fontSize: 14, marginBottom: 18 }}>
                <b style={{ display: "inline-flex", alignItems: "baseline", gap: "0.5em", letterSpacing: "0.04em", whiteSpace: "nowrap", color: "var(--fg)" }}>
                  <span style={{ color: "var(--fg-faint)" }}>&lt;</span>
                  <span>BUILD WITH GENIE</span>
                  <span style={{ color: "var(--fg-faint)" }}>/&gt;</span>
                </b>
              </Link>
              <p style={{ color: "var(--fg-dim)", fontSize: 14, lineHeight: 1.65, maxWidth: "36ch", margin: "0 0 24px" }}>
                Build With Genie helps businesses build enterprise AI solutions, intelligent automation, and scalable AI integrations.
              </p>
              <SocialRow />
            </div>

            {/* Company */}
            <LinkColumn title="Company" links={COMPANY} />

            {/* Services */}
            <LinkColumn title="Services" links={SERVICES} />

            {/* Contact */}
            <div>
              <h5 style={colHead}>Contact</h5>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 18 }}>
                {CONTACT.map((c) => {
                  const Row = (
                    <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <span
                        className="footer-contact-icon"
                        style={{
                          display: "inline-flex",
                          flexShrink: 0,
                          width: 40,
                          height: 40,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          background: "var(--accent-soft)",
                          border: "1px solid var(--accent-line)",
                          color: "var(--accent-bright)",
                          transition: "transform 0.18s, box-shadow 0.18s",
                        }}
                      >
                        <c.icon size={17} strokeWidth={1.9} />
                      </span>
                      <span style={{ color: "var(--fg-dim)", fontSize: 14, lineHeight: 1.5, overflowWrap: "anywhere" }}>{c.label}</span>
                    </span>
                  );
                  return (
                    <li key={c.label}>
                      {c.href ? (
                        <a href={c.href} className="footer-contact" style={{ display: "block", transition: "opacity 0.18s" }}>
                          {Row}
                        </a>
                      ) : (
                        Row
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Divider + bottom bar */}
          <div
            style={{
              marginTop: "clamp(32px,4vw,48px)",
              paddingTop: 32,
              borderTop: "1px solid var(--line)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--fg-faint)",
            }}
          >
            <span>© 2026 BUILD WITH GENIE</span>
            <span>BUILT FAST · REVIEWED CAREFULLY</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link:hover { color: var(--fg) !important; }
        .footer-social:hover { color: #fff !important; border-color: var(--accent) !important; transform: translateY(-2px); box-shadow: 0 6px 20px -6px rgba(59,130,246,0.6); }
        .footer-contact:hover { opacity: 0.85; }
        .footer-contact:hover .footer-contact-icon { transform: translateY(-2px); box-shadow: 0 10px 24px -12px rgba(59,130,246,0.9); }
        @media (max-width: 900px) {
          .footer-cols { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 600px) {
          .footer-cols { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </footer>
  );
}
