"use client";

import { useState } from "react";
import type { FaqItem } from "@/types";

// Card-style accordion matching the AI Integration Services design.
// (The plain-list FaqAccordion is kept for the rest of the site; this page's
//  design is card-based, so it gets its own faithful variant.)
export function FaqCards({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            style={{
              borderRadius: 16,
              border: `1px solid ${isOpen ? "var(--accent-line)" : "var(--line)"}`,
              background: "rgba(255,255,255,0.025)",
              overflow: "hidden",
              transition: "border-color 0.3s",
            }}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 18,
                padding: "20px 22px",
                background: "transparent",
                border: 0,
                textAlign: "left",
                fontFamily: "var(--font-display)",
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "var(--fg)",
              }}
            >
              {f.question}
              <span
                style={{
                  flex: "0 0 auto",
                  width: 26,
                  height: 26,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--accent-soft)",
                  border: "1px solid var(--accent-line)",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s cubic-bezier(.2,0,0,1)",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent-bright)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </button>
            <div
              style={{
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows 0.34s cubic-bezier(.2,0,0,1)",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <p style={{ margin: 0, padding: "0 22px 22px", fontSize: 15, lineHeight: 1.6, color: "var(--fg-faint)" }}>
                  {f.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
