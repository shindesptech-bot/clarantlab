import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { BlogPost } from "@/models/Blog";
import { guard } from "@/lib/rbac";
import { sanitizeHtml } from "@/lib/content-html";
import { cleanFaq } from "@/lib/blog-helpers";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const g = await guard("manage:blogs");
    if (!g.ok) return g.res;
    const { id } = await params;
    await connectToDatabase();
    const post = await BlogPost.findById(id).lean();
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ post });
  } catch (err) {
    console.error("[admin/blog/:id] GET:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const g = await guard("manage:blogs");
    if (!g.ok) return g.res;
    const { id } = await params;
    const body = await req.json();
    const {
      title, slug, excerpt, content, featuredImage,
      status, author, tags, category,
      seoTitle, seoDescription, seoKeywords,
      ogImage, imageAlt, schemaMarkup, faq, readMin,
    } = body;

    if (!title || !slug || !excerpt || !content || !author) {
      return NextResponse.json({ error: "Title, slug, excerpt, content, and author are required" }, { status: 400 });
    }

    await connectToDatabase();

    // publishedAt is set once, on the first transition to "published".
    const existing = await BlogPost.findById(id).select("publishedAt").lean<{ publishedAt?: Date } | null>();
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const update: Record<string, unknown> = {
      title, slug, excerpt,
      content: sanitizeHtml(content),
      featuredImage,
      status, author, tags, category,
      seoTitle, seoDescription, seoKeywords,
      ogImage, imageAlt, schemaMarkup,
      faq: cleanFaq(faq),
      readMin: readMin || undefined,
    };
    if (status === "published" && !existing.publishedAt) {
      update.publishedAt = new Date();
    }

    const post = await BlogPost.findByIdAndUpdate(id, update, { new: true, runValidators: true }).lean();
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ post });
  } catch (err: unknown) {
    if ((err as { code?: number }).code === 11000) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }
    console.error("[admin/blog/:id] PUT:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Soft delete by default (moves to Trash); ?permanent=1 hard-deletes.
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const g = await guard("manage:blogs");
    if (!g.ok) return g.res;
    const { id } = await params;
    const permanent = new URL(req.url).searchParams.get("permanent") === "1";
    await connectToDatabase();

    const post = permanent
      ? await BlogPost.findByIdAndDelete(id).lean()
      : await BlogPost.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true }).lean();

    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/blog/:id] DELETE:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Restore a soft-deleted post from Trash.
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const g = await guard("manage:blogs");
    if (!g.ok) return g.res;
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    if (!body?.restore) {
      return NextResponse.json({ error: "Unsupported operation" }, { status: 400 });
    }
    await connectToDatabase();
    const post = await BlogPost.findByIdAndUpdate(id, { deletedAt: null }, { new: true }).lean();
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/blog/:id] PATCH:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
