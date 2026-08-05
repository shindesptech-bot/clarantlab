import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEARCH_INDEXING_ENABLED } from "@/lib/seo";

// Self-hosted (was a render-blocking @import from fonts.googleapis.com in globals.css).
// Variable fonts → all weights 400–700 covered; swap matches the prior &display=swap.
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap", variable: "--f-space-grotesk" });
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--f-inter" });

export const metadata: Metadata = {
  title: {
    default: "Build with Genie — Ship faster with AI",
    template: "%s — Build with Genie",
  },
  description:
    "We design, architect, build, test and deliver production software using Claude, Gemini and OpenAI every step. A senior pod, not a body shop.",
  keywords: ["AI development", "software agency", "Claude Code", "MVP", "Next.js"],
  authors: [{ name: "Build with Genie" }],
  openGraph: {
    title: "Build with Genie — Ship faster with AI",
    description:
      "A senior pod + AI stack. 14-day MVPs, legacy modernization, AI features. 3–6× faster than a traditional agency.",
    type: "website",
    siteName: "Build with Genie",
  },
  twitter: {
    card: "summary_large_image",
    title: "Build with Genie",
    description: "Ship software at Genie speed — without a 30-person team.",
  },
  // Driven by the SEARCH_INDEXING_ENABLED master switch in lib/seo.ts.
  robots: SEARCH_INDEXING_ENABLED
    ? { index: true, follow: true }
    : {
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false },
      },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
