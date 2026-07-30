import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Redirect } from "@/models/Redirect";
import { guard } from "@/lib/rbac";
import { normalizePath } from "@/lib/redirects";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const g = await guard("manage:redirects");
    if (!g.ok) return g.res;
    const { id } = await params;
    const body = await req.json();

    await connectToDatabase();
    const update: Record<string, unknown> = {};
    if (body.sourceUrl !== undefined) update.sourceUrl = normalizePath(body.sourceUrl);
    if (body.targetUrl !== undefined) update.targetUrl = normalizePath(body.targetUrl);
    if (body.enabled !== undefined) update.enabled = body.enabled;

    if (update.sourceUrl && update.targetUrl && update.sourceUrl === update.targetUrl) {
      return NextResponse.json({ error: "Source and target cannot be the same" }, { status: 400 });
    }

    const redirect = await Redirect.findByIdAndUpdate(id, update, { new: true, runValidators: true }).lean();
    if (!redirect) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ redirect });
  } catch (err: unknown) {
    if ((err as { code?: number }).code === 11000) {
      return NextResponse.json({ error: "A redirect for that source URL already exists" }, { status: 409 });
    }
    console.error("[admin/redirects/:id] PUT:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const g = await guard("manage:redirects");
    if (!g.ok) return g.res;
    const { id } = await params;
    await connectToDatabase();
    const redirect = await Redirect.findByIdAndDelete(id).lean();
    if (!redirect) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/redirects/:id] DELETE:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
