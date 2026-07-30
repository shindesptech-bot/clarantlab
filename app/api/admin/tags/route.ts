import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Tag } from "@/models/Tag";
import { BlogPost } from "@/models/Blog";
import { guard } from "@/lib/rbac";
import { toSlug } from "@/lib/blog-helpers";

export async function GET() {
  try {
    const g = await guard("manage:tags");
    if (!g.ok) return g.res;
    await connectToDatabase();
    const tags = await Tag.find().sort({ name: 1 }).lean();
    const counts = await BlogPost.aggregate([
      { $match: { deletedAt: null } },
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
    ]);
    const countMap = new Map<string, number>(counts.map((c) => [c._id, c.count]));
    const items = tags.map((t) => ({ ...t, postCount: countMap.get(t.name) ?? 0 }));
    return NextResponse.json({ items });
  } catch (err) {
    console.error("[admin/tags] GET:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const g = await guard("manage:tags");
    if (!g.ok) return g.res;
    const { name } = await req.json();
    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    await connectToDatabase();
    const item = await Tag.create({ name: name.trim(), slug: toSlug(name) });
    return NextResponse.json({ item }, { status: 201 });
  } catch (err: unknown) {
    if ((err as { code?: number }).code === 11000) {
      return NextResponse.json({ error: "A tag with that name or slug already exists" }, { status: 409 });
    }
    console.error("[admin/tags] POST:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
