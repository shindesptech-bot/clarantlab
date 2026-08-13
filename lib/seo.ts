// ─── Search-engine indexing master switch ─────────────────────────────────────
//
// Single source of truth for whether crawlers may index the site.
//
//   false → site is hidden from search engines:
//             • robots.txt          → "User-Agent: * / Disallow: /"
//             • <meta name=robots>  → "noindex, nofollow"
//             • X-Robots-Tag header → "noindex, nofollow"
//
//   true  → normal indexing (allow crawling, index + follow).
//
// TO REVERT (re-enable search engines): change this one value to `true`.
// Nothing else needs to be touched — robots.ts, the root layout metadata,
// and the next.config headers all read from here.
export const SEARCH_INDEXING_ENABLED = false;

// Canonical production origin — drives metadataBase, canonical URLs, OG tags and
// the sitemap. Override per-environment with NEXT_PUBLIC_SITE_URL; falls back to
// the brand domain. No trailing slash.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://buildwithgenie.com"
).replace(/\/$/, "");
