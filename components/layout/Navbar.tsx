"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Sun, Moon, ArrowRight } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";
import { NAV_LINKS } from "@/constants/nav";

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href;
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 60,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        background: "rgba(11,15,25,0.8)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="wrap">
        <div
          className="nav-inner"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "15px 0" }}
        >
          {/* Brand — same wordmark logo as the footer */}
          <Link href="/" style={{ display: "flex", alignItems: "center", fontFamily: "var(--font-mono)", fontSize: 16 }}>
            <b style={{ display: "inline-flex", alignItems: "baseline", gap: "0.5em", letterSpacing: "0.04em", whiteSpace: "nowrap", color: "var(--fg)" }}>
              <span style={{ color: "var(--fg-faint)" }}>&lt;</span>
              <span>BUILD WITH GENIE</span>
              <span style={{ color: "var(--fg-faint)" }}>/&gt;</span>
            </b>
          </Link>

          {/* Desktop nav links */}
          <nav className="nav-links-desktop" style={{ display: "flex", alignItems: "center", gap: 30 }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 15,
                  fontWeight: 500,
                  color: isActive(link.href) ? "var(--fg)" : "var(--fg-dim)",
                  transition: "color 0.18s",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right cluster */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              style={{
                background: "transparent",
                border: "1px solid var(--line-strong)",
                borderRadius: 8,
                color: "var(--fg-dim)",
                padding: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.18s",
              }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {/* Energy CTA */}
            <Link href="/contact" className="energy-btn nav-cta" aria-label="Book a Free Consultation">
              <span className="energy-shimmer" />
              <span style={{ position: "relative", zIndex: 2, display: "inline-flex", alignItems: "center", gap: 8 }}>
                Book a Free Consultation
                <ArrowRight size={15} strokeWidth={2.4} />
              </span>
            </Link>

            {/* Mobile hamburger */}
            <button
              className="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "transparent",
                border: "1px solid var(--line-strong)",
                borderRadius: 8,
                color: "var(--fg)",
                padding: 8,
                display: "none",
              }}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "var(--bg-1)",
            borderTop: "1px solid var(--line)",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-display)",
                padding: "12px 0",
                fontSize: 15,
                fontWeight: 500,
                color: isActive(link.href) ? "var(--fg)" : "var(--fg-dim)",
                borderBottom: "1px solid var(--line)",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="energy-btn"
            style={{ marginTop: 12, width: "100%" }}
          >
            <span className="energy-shimmer" />
            <span style={{ position: "relative", zIndex: 2, display: "inline-flex", alignItems: "center", gap: 8 }}>
              Book a Free Consultation <ArrowRight size={16} strokeWidth={2.2} />
            </span>
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-links-desktop { display: none !important; }
          .nav-cta { display: none !important; }
          .hamburger { display: flex !important; }
        }
        .nav-link:hover { color: var(--fg) !important; }
      `}</style>
    </header>
  );
}
