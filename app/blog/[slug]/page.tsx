import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedPostBySlug, getRelatedPosts, getPublishedPosts } from "@/lib/blog";
import { ArticlePage } from "@/components/blog/ArticlePage";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return {};
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const ogImage = post.ogImage || post.featuredImage;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      ...(post.publishedAt ? { publishedTime: post.publishedAt } : {}),
      ...(post.updatedAt ? { modifiedTime: post.updatedAt } : {}),
      ...(ogImage ? { images: [{ url: ogImage, alt: post.imageAlt || post.title }] } : {}),
    },
  };
}

// Build JSON-LD: the author's custom schema (if valid JSON) plus an auto
// FAQPage graph derived from the post's FAQ items.
function buildJsonLd(post: Awaited<ReturnType<typeof getPublishedPostBySlug>>): string | null {
  if (!post) return null;
  const graphs: unknown[] = [];
  if (post.schemaMarkup) {
    try {
      graphs.push(JSON.parse(post.schemaMarkup));
    } catch {
      // Invalid custom JSON-LD — skip rather than emit broken markup.
    }
  }
  if (post.faq && post.faq.length) {
    graphs.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }
  return graphs.length ? JSON.stringify(graphs.length === 1 ? graphs[0] : graphs) : null;
}

export default async function ArticlePageRoute({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(slug, 3);
  const jsonLd = buildJsonLd(post);

  // Previous / next navigation across published posts (newest-first order).
  const all = await getPublishedPosts();
  const idx = all.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? { slug: all[idx - 1].slug, title: all[idx - 1].title } : null;
  const next = idx >= 0 && idx < all.length - 1 ? { slug: all[idx + 1].slug, title: all[idx + 1].title } : null;

  return (
    <>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      )}
      <ArticlePage post={post} related={related} prev={prev} next={next} />
    </>
  );
}
