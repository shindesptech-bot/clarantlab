"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { NAV_LINKS } from "@/constants/nav";
import type { NavLink } from "@/types";

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<string | null>(null);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href;
  };
  // A parent is active when the current path is the parent or any of its children.
  const isBranchActive = (link: NavLink) =>
    isActive(link.href) || !!link.children?.some((c) => pathname === c.href || pathname.startsWith(c.href + "/"));

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
            {NAV_LINKS.map((link) =>
              link.children?.length ? (
                <NavDropdown key={link.href} link={link} active={isBranchActive(link)} pathname={pathname} />
              ) : (
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
              )
            )}
          </nav>

          {/* Right cluster */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
          {NAV_LINKS.map((link) =>
            link.children?.length ? (
              <div key={link.href} style={{ borderBottom: "1px solid var(--line)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily: "var(--font-display)",
                      padding: "12px 0",
                      fontSize: 15,
                      fontWeight: 500,
                      color: isBranchActive(link) ? "var(--fg)" : "var(--fg-dim)",
                    }}
                  >
                    {link.label}
                  </Link>
                  <button
                    onClick={() => setMobileSub(mobileSub === link.href ? null : link.href)}
                    aria-label={`Toggle ${link.label} submenu`}
                    aria-expanded={mobileSub === link.href}
                    style={{ background: "transparent", border: 0, color: "var(--fg-dim)", padding: 8, display: "flex" }}
                  >
                    <ChevronDown
                      size={16}
                      style={{ transition: "transform 0.2s", transform: mobileSub === link.href ? "rotate(180deg)" : "none" }}
                    />
                  </button>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: mobileSub === link.href ? "1fr" : "0fr",
                    transition: "grid-template-rows 0.28s cubic-bezier(.2,0,0,1)",
                  }}
                >
                  <div style={{ overflow: "hidden" }}>
                    {link.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setMenuOpen(false)}
                        style={{
                          display: "block",
                          fontFamily: "var(--font-display)",
                          padding: "10px 0 10px 16px",
                          fontSize: 14,
                          fontWeight: 500,
                          color: isActive(c.href) ? "var(--accent-bright)" : "var(--fg-faint)",
                        }}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
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
            )
          )}
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
        .nav-dd-item:hover { color: var(--fg) !important; background: var(--accent-soft) !important; }
      `}</style>
    </header>
  );
}

// Desktop nav item with a submenu — opens on hover, focus, or click; closes on
// mouse-leave, blur, Escape, or outside click. aria-expanded reflects real state.
function NavDropdown({ link, active, pathname }: { link: NavLink; active: boolean; pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      style={{ position: "relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <Link
        href={link.href}
        className="nav-link"
        aria-haspopup="menu"
        aria-expanded={open}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          fontFamily: "var(--font-display)",
          fontSize: 15,
          fontWeight: 500,
          color: active ? "var(--fg)" : "var(--fg-dim)",
          transition: "color 0.18s",
        }}
      >
        {link.label}
        <ChevronDown size={14} style={{ transition: "transform 0.18s", transform: open ? "rotate(180deg)" : "none" }} />
      </Link>

      {/* Outer wrapper is flush to the trigger (top:100%) with a transparent
          paddingTop bridge — so moving the cursor into the menu never crosses a
          dead zone that would fire mouseleave and close it. */}
      <div
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          // Negative marginTop pulls the wrapper up so it overlaps the trigger's
          // bottom (top:100% can resolve a few px below it in a flex row), and the
          // paddingTop restores the visible gap as a transparent hover bridge — no dead zone.
          marginTop: -12,
          paddingTop: 24,
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          transform: open ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 0.18s ease, transform 0.18s ease, visibility 0.18s",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div
          role="menu"
          aria-label={link.label}
          style={{
            minWidth: 240,
            padding: 6,
            borderRadius: 12,
            border: "1px solid var(--line-strong)",
            background: "var(--bg-2)",
            boxShadow: "0 18px 40px -18px rgba(0,0,0,0.7)",
          }}
        >
          {link.children!.map((c) => {
            const on = pathname === c.href || pathname.startsWith(c.href + "/");
            return (
              <Link
                key={c.href}
                href={c.href}
                role="menuitem"
                className="nav-dd-item"
                style={{
                  display: "block",
                  padding: "10px 12px",
                  borderRadius: 8,
                  fontFamily: "var(--font-display)",
                  fontSize: 14,
                  fontWeight: 500,
                  color: on ? "var(--fg)" : "var(--fg-dim)",
                  background: on ? "var(--accent-soft)" : "transparent",
                  transition: "color 0.15s, background 0.15s",
                }}
              >
                {c.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
