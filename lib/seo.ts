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
