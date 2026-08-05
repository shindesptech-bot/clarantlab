"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AUTHOR_BIOS } from "@/constants/blog";
import { CtaStrip } from "@/components/ui/CtaStrip";
import { cldOptimize } from "@/lib/cld";
import type { PublicPost } from "@/types";
import "./article.css";

// Placeholder gradient variants for related cards that have no cover image.
const PH_COLORS = ["ph-a", "ph-b", "ph-c", "ph-d", "ph-e", "ph-f"] as const;

interface TocItem {
  id: string;
  label: string;
}

// Parse <h2>/<h3> headings from the CMS HTML, inject id attributes, and build
// the table of contents — mirrors the reference's server-shared helper.
function processContent(content: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  if (!content) return { html: "", toc };
  const html = content.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (_m, level: string, attrs: string, inner: string) => {
      const text = inner.replace(/<[^>]+>/g, "").trim();
      const id =
        text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
          .substring(0, 60) || `section-${toc.length}`;
      toc.push({ id, label: text });
      return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
    }
  );
  return { html, toc };
}

interface AdjacentPost {
  slug: string;
  title: string;
}

interface Props {
  post: PublicPost;
  related: PublicPost[];
  prev?: AdjacentPost | null;
  next?: AdjacentPost | null;
}

export function ArticlePage({ post, related, prev, next }: Props) {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [copied, setCopied] = useState(false);
  const [pageUrl, setPageUrl] = useState("");

  const { html: contentHtml, toc } = processContent(post.contentHtml);

  // ── Scroll progress bar ──
  useEffect(() => {
    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop || document.body.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      setProgress(height > 0 ? (scrolled / height) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  // ── Active TOC section tracking ──
  useEffect(() => {
    if (toc.length === 0) return;
    const handler = () => {
      const fromTop = window.scrollY + 160;
      let current = toc[0].id;
      toc.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= fromTop) current = id;
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [toc]);

  // ── Share URLs — computed after mount so SSR and client HTML match ──
  useEffect(() => {
    setPageUrl(encodeURIComponent(location.href));
  }, []);

  const shareTitle = encodeURIComponent(post.title);
  const twitterHref = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${shareTitle}`;
  const linkedinHref = `https://linkedin.com/sharing/share-offsite/?url=${pageUrl}`;

  function handleCopy(e: React.MouseEvent) {
    e.preventDefault();
    if (navigator.clipboard) navigator.clipboard.writeText(location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const authorName = post.author;
  const initials = post.authorInitials;
  // Case-insensitive bio lookup — stored author names vary in casing.
  const authorBio =
    Object.entries(AUTHOR_BIOS).find(
      ([name]) => name.toLowerCase() === authorName.trim().toLowerCase()
    )?.[1] ?? "";
  const tags = post.tags ?? [];
  const faqItems = post.faq ?? [];

  return (
    <div className="atg-post">
      <div className="read-progress" aria-hidden="true">
        <div className="read-progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <main>
        {/* ── HERO ── */}
        <section className="post2-hero">
          <div className="post2-bg" aria-hidden="true">
            <div className="glow" />
            <div className="grid" />
          </div>
          <div className="container post2-hero-inner">
            <nav className="post2-crumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep">›</span>
              <Link href="/blog">Blog</Link>
              <span className="sep">›</span>
              <span>{post.title}</span>
            </nav>

            <Link className="post2-category" href="/blog">
              {post.category} · {post.readTime} read
            </Link>

            <h1 className="post2-title">{post.title}</h1>

            {post.excerpt && <p className="post2-deck">{post.excerpt}</p>}

            <div className="post2-byline-strip">
              <span className="byline-avatar" aria-hidden="true">
                {initials}
              </span>
              <strong>{authorName}</strong>
              {post.date && (
                <>
                  <span className="sep">·</span>
                  <span>{post.date}</span>
                </>
              )}
            </div>

            <div
              className={`post2-cover${post.featuredImage ? " has-img" : ""}`}
              role="img"
              aria-label={post.imageAlt || `Cover image for ${post.title}`}
            >
              {post.featuredImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={cldOptimize(post.featuredImage, 1600)}
                  alt={post.imageAlt || post.title}
                  className="post2-cover-img"
                  decoding="async"
                  fetchPriority="high"
                />
              ) : (
                <div className="ph" />
              )}
            </div>
          </div>
        </section>

        {/* ── BODY ── */}
        <div className="container">
          <div className={`post2-body${toc.length === 0 ? " no-toc" : ""}`}>
            {toc.length > 0 && (
              <aside className="post2-toc" aria-label="On this page">
                <div className="post2-toc-h">On this page</div>
                <ul className="post2-toc-list">
                  {toc.map(({ id, label }) => (
                    <li key={id}>
                      <a href={`#${id}`} className={activeSection === id ? "is-current" : ""}>
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            <article className="prose2">
              <div dangerouslySetInnerHTML={{ __html: contentHtml }} suppressHydrationWarning />

              {faqItems.length > 0 && (
                <section className="post2-faq" id="faq" aria-labelledby="faq-h">
                  <h2 className="post2-faq-h" id="faq-h">
                    Frequently asked questions
                  </h2>
                  {faqItems.map((item, i) => (
                    <details key={i} className="faq-item" open={i === 0}>
                      <summary>{item.q}</summary>
                      <div className="faq-body">{item.a}</div>
                    </details>
                  ))}
                </section>
              )}

              {tags.length > 0 && (
                <div className="post2-tags" aria-label="Article tags">
                  {tags.map((tag) => (
                    <Link key={tag} href="/blog">
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}

              <div className="author-foot">
                <span className="author-avatar" aria-hidden="true">
                  {initials}
                </span>
                <div className="author-info">
                  <h4>{authorName}</h4>
                  {authorBio && <p>{authorBio}</p>}
                </div>
              </div>

              {/* ── PREV / NEXT NAVIGATION ── */}
              {(prev || next) && (
                <nav className="post-nav" aria-label="More articles">
                  {prev ? (
                    <Link className="post-nav-card is-prev" href={`/blog/${prev.slug}`}>
                      <span className="post-nav-label">
                        <svg className="post-nav-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M19 12H5" />
                          <path d="m12 19-7-7 7-7" />
                        </svg>
                        Previous Article
                      </span>
                      <span className="post-nav-title">{prev.title}</span>
                    </Link>
                  ) : (
                    <span aria-hidden="true" />
                  )}

                  {next ? (
                    <Link className="post-nav-card is-next" href={`/blog/${next.slug}`}>
                      <span className="post-nav-label">
                        Next Article
                        <svg className="post-nav-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </span>
                      <span className="post-nav-title">{next.title}</span>
                    </Link>
                  ) : (
                    <span aria-hidden="true" />
                  )}
                </nav>
              )}
            </article>

            <aside className="post2-rail" aria-label="Share">
              <div>
                <div className="rail-h">Share</div>
                <div className="rail-actions" style={{ marginTop: 10 }}>
                  <a className="rail-btn" href={twitterHref} aria-label="Share on Twitter" target="_blank" rel="noopener noreferrer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 4h3l-7 8 8 10h-6l-5-6.5L5 22H2l7.5-8.5L2 4h6l4.5 6Z" />
                    </svg>
                  </a>
                  <a className="rail-btn" href={linkedinHref} aria-label="Share on LinkedIn" target="_blank" rel="noopener noreferrer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                  <button
                    className="rail-btn"
                    aria-label={copied ? "Copied!" : "Copy link"}
                    onClick={handleCopy}
                    style={{
                      background: copied ? "var(--accent-soft)" : undefined,
                      color: copied ? "var(--accent)" : undefined,
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 1 0-7-7l-1 1" />
                      <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 1 0 7 7l1-1" />
                    </svg>
                  </button>
                </div>
              </div>
            </aside>
          </div>

          {/* ── RELATED POSTS ── */}
          {related.length > 0 && (
            <section className="related" aria-labelledby="related-h">
              <div className="blog-eyebrow-row">
                <span className="eyebrow" id="related-h">
                  Continue reading
                </span>
                <Link className="view-all" href="/blog">
                  All articles
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="posts-grid">
                {related.map((p, i) => (
                  <article key={p.slug} className="post-card">
                    <Link href={`/blog/${p.slug}`} className="post-card-media" tabIndex={-1} aria-hidden="true">
                      {p.featuredImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={cldOptimize(p.featuredImage, 800)} alt={p.title} className="post-card-img" loading="lazy" />
                      ) : (
                        <div className={`ph ${PH_COLORS[i % PH_COLORS.length]}`} />
                      )}
                    </Link>
                    <div className="post-card-body">
                      <span className="post-card-tag">{p.category}</span>
                      <h3 className="post-card-title">
                        <Link href={`/blog/${p.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                          {p.title}
                        </Link>
                      </h3>
                      {p.excerpt && <p className="post-card-excerpt">{p.excerpt}</p>}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* ── CTA — reuses BWG's existing CtaStrip (branding preserved) ── */}
          <div style={{ padding: "var(--section-pad-y-sm) 0" }}>
            <CtaStrip
              heading="Have an idea sitting in a doc somewhere?"
              body="Show it to us. 30 minutes, no slides. We'll tell you the smallest version we'd ship and how long it'd take."
            />
          </div>
        </div>
      </main>
    </div>
  );
}
