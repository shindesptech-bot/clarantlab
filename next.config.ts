import type { NextConfig } from "next";
import { SEARCH_INDEXING_ENABLED } from "./lib/seo";

const nextConfig: NextConfig = {
  // Standalone output for Azure App Service deployment
  output: "standalone",

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

  // Allow Cloudinary images
  images: {
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
