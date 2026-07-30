import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import { BlogPost } from "@/models/Blog";
import { guard } from "@/lib/rbac";
import { toSlug } from "@/lib/blog-helpers";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const g = await guard("manage:categories");
    if (!g.ok) return g.res;
    const { id } = await params;
    const { name } = await req.json();
    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    await connectToDatabase();

    const existing = await Category.findById(id).lean<{ name: string } | null>();
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const newName = name.trim();
    const item = await Category.findByIdAndUpdate(
      id,
      { name: newName, slug: toSlug(newName) },
      { new: true, runValidators: true }
    ).lean();

    // Name-based taxonomy: propagate a rename to every post using the old name.
    if (existing.name !== newName) {
      await BlogPost.updateMany({ category: existing.name }, { $set: { category: newName } });
    }
    return NextResponse.json({ item });
  } catch (err: unknown) {
    if ((err as { code?: number }).code === 11000) {
      return NextResponse.json({ error: "A category with that name or slug already exists" }, { status: 409 });
    }
    console.error("[admin/categories/:id] PUT:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const g = await guard("manage:categories");
    if (!g.ok) return g.res;
    const { id } = await params;
    await connectToDatabase();

    const cat = await Category.findById(id).lean<{ name: string } | null>();
    if (!cat) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Block deletion while any post still uses it (matches PublicSite behaviour).
    const inUse = await BlogPost.countDocuments({ category: cat.name });
    if (inUse > 0) {
      return NextResponse.json({ error: `Category is used by ${inUse} post(s)` }, { status: 409 });
    }

    await Category.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/categories/:id] DELETE:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
