import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Tag } from "@/models/Tag";
import { BlogPost } from "@/models/Blog";
import { guard } from "@/lib/rbac";
import { toSlug } from "@/lib/blog-helpers";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const g = await guard("manage:tags");
    if (!g.ok) return g.res;
    const { id } = await params;
    const { name } = await req.json();
    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    await connectToDatabase();

    const existing = await Tag.findById(id).lean<{ name: string } | null>();
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const newName = name.trim();
    const item = await Tag.findByIdAndUpdate(
      id,
      { name: newName, slug: toSlug(newName) },
      { new: true, runValidators: true }
    ).lean();

    // Propagate the rename into every post's tags array (all matching elements).
    if (existing.name !== newName) {
      await BlogPost.updateMany(
        { tags: existing.name },
        { $set: { "tags.$[el]": newName } },
        { arrayFilters: [{ el: existing.name }] }
      );
    }
    return NextResponse.json({ item });
  } catch (err: unknown) {
    if ((err as { code?: number }).code === 11000) {
      return NextResponse.json({ error: "A tag with that name or slug already exists" }, { status: 409 });
    }
    console.error("[admin/tags/:id] PUT:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const g = await guard("manage:tags");
    if (!g.ok) return g.res;
    const { id } = await params;
    await connectToDatabase();

    const tag = await Tag.findById(id).lean<{ name: string } | null>();
    if (!tag) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Tags cascade-clean: pull the tag name out of every post that uses it.
    await BlogPost.updateMany({ tags: tag.name }, { $pull: { tags: tag.name } });
    await Tag.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/tags/:id] DELETE:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
