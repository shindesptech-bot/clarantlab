import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeading } from "@/components/home/_shared";
import { CalendlyWidget } from "@/components/CalendlyWidget";

export const metadata: Metadata = {
  // `absolute` bypasses the layout's "%s — Build with Genie" template so the
  // title reads exactly as requested.
  title: { absolute: "Thank You | BuildWithGenie" },
  description:
    "Thank you for contacting BuildWithGenie. Schedule your free consultation with our team.",
};

export default function ThankYouPage() {
  return (
    <section style={{ background: "linear-gradient(180deg, var(--bg-hero), var(--bg-0))", overflowX: "hidden" }}>
      {/* Icon scale-in — Reveal (used below) only does fade-up, so the check gets its own tiny keyframe. */}
      <style>{`
        @keyframes ty-pop { from { opacity: 0; transform: scale(0.82); } to { opacity: 1; transform: none; } }
        .ty-icon { animation: ty-pop 0.5s cubic-bezier(0.2,0,0,1) both; }
        @media (prefers-reduced-motion: reduce) { .ty-icon { animation: none; } }
      `}</style>

      <div className="wrap" style={{ maxWidth: 880, padding: "clamp(56px,8vw,96px) 20px clamp(64px,8vw,112px)" }}>
        {/* Confirmation */}
        <div style={{ textAlign: "center" }}>
          <div
            className="ty-icon"
            style={{ width: 72, height: 72, borderRadius: 9999, margin: "0 auto 26px", background: "var(--accent-soft)", border: "1px solid var(--accent-line)", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <Check size={34} color="var(--accent-bright)" strokeWidth={2.6} />
          </div>
          <Reveal delay={60}>
            <h1 style={{ margin: 0, textWrap: "balance" }}>Thank You!</h1>
          </Reveal>
          <Reveal delay={120}>
            <p style={{ fontSize: "clamp(18px,1.8vw,22px)", fontWeight: 500, color: "var(--fg-soft)", margin: "18px auto 0", maxWidth: 560, textWrap: "balance" }}>
              Your consultation request has been received.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p style={{ fontSize: "clamp(15px,1.2vw,17px)", lineHeight: 1.6, color: "var(--fg-dim)", margin: "16px auto 0", maxWidth: 600, textWrap: "pretty" }}>
              Thanks for reaching out to BuildWithGenie. Our team has received your information and we&rsquo;re looking forward to learning more about your business.
            </p>
          </Reveal>
        </div>

        {/* Divider */}
        <div style={{ width: 120, height: 1, background: "var(--line)", margin: "clamp(44px,6vw,68px) auto" }} />

        {/* Schedule */}
        <SectionHeading
          eyebrow="Next step"
          heading="Schedule Your Free Consultation"
          lede="Choose a convenient time below and book your 30-minute consultation with our team."
        />

        {/* Calendly */}
        <Reveal>
          <div style={{ border: "1px solid var(--line)", borderRadius: "var(--radius-lg)", background: "rgba(255,255,255,0.02)", padding: "clamp(10px,1.6vw,18px)", overflow: "hidden" }}>
            <CalendlyWidget />
          </div>
        </Reveal>

        {/* Footer */}
        <Reveal delay={80}>
          <p style={{ textAlign: "center", fontSize: 14, color: "var(--fg-faint)", margin: "clamp(28px,4vw,40px) 0 0" }}>
            Need help?{" "}
            <Link href="/contact" style={{ color: "var(--accent)" }} className="learn-link">
              Contact our team.
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
