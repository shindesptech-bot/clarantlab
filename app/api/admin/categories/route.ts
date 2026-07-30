import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import { BlogPost } from "@/models/Blog";
import { guard } from "@/lib/rbac";
import { toSlug } from "@/lib/blog-helpers";

export async function GET() {
  try {
    const g = await guard("manage:categories");
    if (!g.ok) return g.res;
    await connectToDatabase();
    const cats = await Category.find().sort({ name: 1 }).lean();
    // One aggregate for usage counts (posts store the category name).
    const counts = await BlogPost.aggregate([
      { $match: { deletedAt: null } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);
    const countMap = new Map<string, number>(counts.map((c) => [c._id, c.count]));
    const items = cats.map((c) => ({ ...c, postCount: countMap.get(c.name) ?? 0 }));
    return NextResponse.json({ items });
  } catch (err) {
    console.error("[admin/categories] GET:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const g = await guard("manage:categories");
    if (!g.ok) return g.res;
    const { name } = await req.json();
    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    await connectToDatabase();
    const item = await Category.create({ name: name.trim(), slug: toSlug(name) });
    return NextResponse.json({ item }, { status: 201 });
  } catch (err: unknown) {
    if ((err as { code?: number }).code === 11000) {
      return NextResponse.json({ error: "A category with that name or slug already exists" }, { status: 409 });
    }
    console.error("[admin/categories] POST:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
