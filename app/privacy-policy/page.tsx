import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | Build with Genie" },
  description:
    "Learn how Build with Genie collects, uses, protects, and manages information when you visit our website, contact us, or use our AI services.",
  alternates: { canonical: "/privacy-policy" },
};

// Content is the source of truth — do not edit copy. Structure only.
type Block =
  | { p: string }
  | { list: string[] };

const SECTIONS: { id: string; num: string; title: string; blocks: Block[] }[] = [
  {
    id: "information-we-collect",
    num: "01",
    title: "Information We Collect",
    blocks: [
      { p: "We may collect shared information including:" },
      {
        list: [
          "Name",
          "Company",
          "Business email",
          "Phone number",
          "Information submitted through contact or consultation forms",
          "Project requirements and business information",
          "Documents, data, or other information you voluntarily provide while working with us",
        ],
      },
      {
        p: "We may also automatically collect basic website usage information, such as IP address, browser type, device information, pages visited, and website interactions.",
      },
    ],
  },
  {
    id: "how-we-use-your-information",
    num: "02",
    title: "How We Use Your Information",
    blocks: [
      { p: "We may use the collected information to:" },
      {
        list: [
          "Respond to inquiries and consultation requests",
          "Provide, develop, and support our AI services",
          "Maintain website security and prevent misuse",
          "Understand your business and AI requirements",
          "Communicate with clients and prospective clients",
          "Comply with applicable legal requirements",
        ],
      },
      { p: "We use information only for legitimate business and service-related purposes." },
    ],
  },
  {
    id: "ai-services-and-client-information",
    num: "03",
    title: "AI Services and Client Information",
    blocks: [
      {
        p: "Build with Genie provides custom AI solutions, consulting, automation, integrations, and AI development services for businesses.",
      },
      {
        p: "When you work with us, you may provide business information, documents, datasets, workflows, or other materials required for your project. We use this information to deliver and support the services you request.",
      },
      {
        p: "We take reasonable steps to protect confidential business information and restrict access to authorized personnel and service providers who need it to perform their responsibilities.",
      },
    ],
  },
  {
    id: "cookies-and-analytics",
    num: "04",
    title: "Cookies and Analytics",
    blocks: [
      {
        p: "Our website may use cookies and similar technologies to improve website functionality, understand visitor behavior, analyze traffic, and improve our services.",
      },
      {
        p: "You can manage or disable cookies through your browser settings. Disabling certain cookies may affect some website functionality.",
      },
    ],
  },
  {
    id: "data-security",
    num: "05",
    title: "Data Security",
    blocks: [
      {
        p: "We use reasonable administrative, technical, and organizational measures to help protect your information from unauthorized access, loss, misuse, or disclosure.",
      },
    ],
  },
  {
    id: "your-privacy-choices",
    num: "06",
    title: "Your Privacy Choices",
    blocks: [
      {
        p: "Depending on applicable law, you may have the right to request access to, correction of, or deletion of certain personal information we hold about you.",
      },
      {
        p: "To make a privacy-related request, please contact us using the information below. We may need to verify your identity before processing certain requests.",
      },
    ],
  },
  {
    id: "childrens-privacy",
    num: "07",
    title: "Children's Privacy",
    blocks: [
      {
        p: "Our website and services are intended for businesses and business professionals. We do not knowingly collect personal information from children under 13.",
      },
      {
        p: "If you believe a child has provided personal information to us, please contact us so we can take appropriate action.",
      },
    ],
  },
  {
    id: "changes-to-this-privacy-policy",
    num: "08",
    title: "Changes to This Privacy Policy",
    blocks: [
      {
        p: "We may update this Privacy Policy from time to time to reflect changes in our services, technology, business practices, or legal requirements.",
      },
      { p: "Any updates will be posted on this page with a revised Effective Date." },
    ],
  },
  {
    id: "contact-us",
    num: "09",
    title: "Contact Us",
    blocks: [
      {
        p: "If you have questions about this Privacy Policy or how we handle information, please contact us:",
      },
    ],
  },
];

const paragraph = (text: string, key: React.Key) => (
  <p
    key={key}
    style={{ color: "var(--fg-dim)", fontSize: 16, lineHeight: 1.7, maxWidth: "68ch" }}
  >
    {text}
  </p>
);

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        heading="Privacy Policy"
        lede="At Build with Genie, we respect your privacy and are committed to protecting the information you share with us. This Privacy Policy explains how we collect, use, and protect information when you visit buildwithgenie.ai, contact us, or use our AI services."
      >
        <div
          style={{
            marginTop: 28,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--fg-faint)",
          }}
        >
          Last Updated: <span style={{ color: "var(--accent)" }}>August 11, 2026</span>
        </div>
      </PageHero>

      <div className="wrap">
        <div
          className="privacy-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "240px 1fr",
            gap: 80,
            padding: "72px 0 120px",
            alignItems: "start",
          }}
        >
          {/* Table of contents — sticky on desktop, native collapsible on mobile */}
          <details className="privacy-toc" open>
            <summary
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--accent)",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                marginBottom: 16,
                cursor: "pointer",
              }}
            >
              On this page
            </summary>
            <nav aria-label="Privacy Policy sections">
              <ol
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="toc-link">
                      <span style={{ color: "var(--fg-faint)", flexShrink: 0 }}>{s.num}</span>
                      <span>{s.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </details>

          {/* Policy content */}
          <div style={{ minWidth: 0 }}>
            {SECTIONS.map((s) => (
              <section
                key={s.id}
                id={s.id}
                style={{ scrollMarginTop: 100, marginBottom: 56 }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: "var(--accent)",
                    letterSpacing: "0.16em",
                    marginBottom: 12,
                  }}
                >
                  {s.num}
                </div>
                <h2
                  style={{
                    fontSize: 26,
                    letterSpacing: "-0.01em",
                    marginBottom: 20,
                    paddingBottom: 16,
                    borderBottom: "1px solid var(--line)",
                  }}
                >
                  {s.title}
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {s.blocks.map((b, i) =>
                    "p" in b ? (
                      paragraph(b.p, i)
                    ) : (
                      <ul
                        key={i}
                        style={{
                          listStyle: "none",
                          margin: 0,
                          padding: 0,
                          display: "flex",
                          flexDirection: "column",
                          gap: 12,
                          maxWidth: "68ch",
                        }}
                      >
                        {b.list.map((item) => (
                          <li
                            key={item}
                            style={{
                              display: "grid",
                              gridTemplateColumns: "18px 1fr",
                              gap: 12,
                              fontSize: 16,
                              color: "var(--fg-dim)",
                              lineHeight: 1.55,
                            }}
                          >
                            <span
                              style={{ color: "var(--accent)", fontSize: 11, marginTop: 5 }}
                              aria-hidden="true"
                            >
                              ▸
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ),
                  )}

                  {/* Contact block appended to section 9 */}
                  {s.id === "contact-us" && (
                    <div
                      style={{
                        border: "1px solid var(--line)",
                        borderRadius: "var(--radius-md)",
                        background: "var(--bg-1)",
                        padding: 28,
                        maxWidth: "68ch",
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                      }}
                    >
                      <div style={{ fontSize: 18, fontWeight: 600, color: "var(--fg)" }}>
                        Build with Genie
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 14,
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                        }}
                      >
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                          <span style={{ color: "var(--fg-faint)", minWidth: 72 }}>Website</span>
                          <a
                            href="https://buildwithgenie.ai"
                            className="toc-link"
                            style={{ display: "inline", padding: 0 }}
                          >
                            buildwithgenie.ai
                          </a>
                        </div>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                          <span style={{ color: "var(--fg-faint)", minWidth: 72 }}>Email</span>
                          <a
                            href="mailto:support@buildwithgenie.ai"
                            className="toc-link"
                            style={{ display: "inline", padding: 0, overflowWrap: "anywhere" }}
                          >
                            support@buildwithgenie.ai
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .toc-link {
          display: flex;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 12.5px;
          color: var(--fg-dim);
          text-decoration: none;
          padding: 6px 8px;
          border-radius: 6px;
          border-left: 2px solid transparent;
          line-height: 1.4;
          transition: color .15s, background .15s, border-color .15s;
        }
        .toc-link:hover { color: var(--fg); background: var(--accent-soft); border-left-color: var(--accent-line); }
        a:focus-visible, summary:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
          border-radius: 4px;
        }
        .privacy-toc { position: sticky; top: 96px; }
        .privacy-toc > summary { display: none; }
        .privacy-toc > summary::-webkit-details-marker { display: none; }
        @media (max-width: 900px) {
          .privacy-layout { grid-template-columns: 1fr !important; gap: 32px !important; }
          .privacy-toc {
            position: static !important;
            border: 1px solid var(--line);
            border-radius: var(--radius-md);
            padding: 16px 18px;
            background: var(--bg-1);
          }
          .privacy-toc > summary { display: list-item; margin-bottom: 0; }
          .privacy-toc[open] > summary { margin-bottom: 16px; }
        }
      `}</style>
    </>
  );
}
