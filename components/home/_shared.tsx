import { Reveal } from "@/components/home/Reveal";

// Inline stroke-icon builder (matches the ZIP reference's SVG style).
export function Icon({ paths, size = 20, stroke = "#7FB0FB" }: { paths: string[]; size?: number; stroke?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

// Centered eyebrow + H2 + optional lede, with the accent underline from the reference.
export function SectionHeading({
  eyebrow,
  heading,
  lede,
  underline = false,
  maxWidth = 700,
}: {
  eyebrow: string;
  heading: string;
  lede?: string;
  underline?: boolean;
  maxWidth?: number;
}) {
  return (
    <div style={{ textAlign: "center", maxWidth, margin: "0 auto clamp(40px,5vw,60px)" }}>
      <Reveal className="eyebrow" style={{ justifyContent: "center", marginBottom: 12 }}>{eyebrow}</Reveal>
      <Reveal delay={60}>
        <h2 style={{ margin: 0, textWrap: "balance" }}>{heading}</h2>
      </Reveal>
      {underline && (
        <Reveal delay={120}>
          <div style={{ width: 56, height: 3, borderRadius: 3, background: "var(--accent)", margin: "16px auto 0" }} />
        </Reveal>
      )}
      {lede && (
        <Reveal delay={120}>
          <p style={{ fontSize: "clamp(16px,1.4vw,19px)", lineHeight: 1.55, color: "var(--fg-dim)", margin: "18px auto 0", maxWidth: 640, textWrap: "pretty" }}>
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}
