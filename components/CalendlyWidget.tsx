"use client";

import Script from "next/script";

// Calendly's widget.js auto-initializes any .calendly-inline-widget present at
// load time from its data-url — so no manual init / document manipulation is
// needed. next/script (afterInteractive) loads it only on this page, after
// hydration, which avoids hydration mismatches.
export function CalendlyWidget() {
  return (
    <>
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/sptechusa/30min?hide_gdpr_banner=1&primary_color=07a7a7"
        style={{ minWidth: 320, width: "100%", height: 800 }}
      />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
    </>
  );
}
