import type { NextConfig } from "next";
import { SEARCH_INDEXING_ENABLED } from "./lib/seo";

const nextConfig: NextConfig = {
  // Default `.next` output + `next start -p $PORT` on Azure App Service (matches
  // the working PublicSite deployment). No standalone artifact / server.js.

  // While indexing is disabled, attach X-Robots-Tag: noindex, nofollow to every
  // response (covers non-HTML assets that meta tags can't reach). Driven by the
  // SEARCH_INDEXING_ENABLED master switch in lib/seo.ts — flip it to revert.
  async headers() {
    if (SEARCH_INDEXING_ENABLED) return [];
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },

  // Industries is served from the existing /use-cases pages — keep the URL as
  // /industries without moving files. ponytail: rewrite, rename the folder if
  // /use-cases must stop resolving.
  async rewrites() {
    return [{ source: "/industries/:path*", destination: "/use-cases/:path*" }];
  },

  // Permanent (301) redirect from the old service URL to the shortened one.
  async redirects() {
    return [
      {
        source: "/services/ai-integration-services",
        destination: "/services/ai-integration",
        // 301 (not the `permanent: true` 308) — matches the requested status.
        statusCode: 301,
      },
    ];
  },

  // Allow Cloudinary images
  images: {
    // Serve modern formats — AVIF first (smallest), WebP fallback.
    formats: ["image/avif", "image/webp"],
    // Next 16 defaults qualities to [75]; allow 90 for the high-detail hero visual.
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  // Strict mode for better error detection during development
  reactStrictMode: true,
};

export default nextConfig;
