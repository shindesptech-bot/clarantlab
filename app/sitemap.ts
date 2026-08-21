import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getPublishedPosts } from "@/lib/blog";
import { USE_CASES } from "@/constants/use-cases";

// Static public routes (admin + api are excluded — they're not for indexing).
const STATIC_PATHS = [
  "/",
  "/services",
  "/services/ai-integration",
  "/services/mcp-implementation",
  "/services/rag-implementation",
  "/industries/healthcare",
  "/industries/financial-services",
  "/industries/law-firms",
  "/work",
  "/blog",
  "/use-cases",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const useCaseEntries: MetadataRoute.Sitemap = USE_CASES.map((uc) => ({
    url: `${SITE_URL}/use-cases/${uc.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // getPublishedPosts already returns [] on DB failure — sitemap stays valid.
  const posts = await getPublishedPosts();
  const blogEntries: MetadataRoute.Sitemap = posts.map((p) => {
    // lastmod = last modification (updatedAt), falling back to publishedAt.
    const d = new Date(p.updatedAt ?? p.publishedAt ?? p.date);
    return {
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: isNaN(d.getTime()) ? now : d,
      changeFrequency: "monthly",
      priority: 0.6,
    };
  });

  return [...staticEntries, ...useCaseEntries, ...blogEntries];
}
