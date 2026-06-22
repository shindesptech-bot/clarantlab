import type { MetadataRoute } from "next";
import { SEARCH_INDEXING_ENABLED } from "@/lib/seo";

// Generates /robots.txt. Driven by the SEARCH_INDEXING_ENABLED master switch
// in lib/seo.ts — flip that flag to revert to normal crawling.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: SEARCH_INDEXING_ENABLED
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
  };
}
