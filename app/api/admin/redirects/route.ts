import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Redirect } from "@/models/Redirect";
import { guard } from "@/lib/rbac";
import { normalizePath } from "@/lib/redirects";

export async function GET(req: NextRequest) {
  try {
    const g = await guard("manage:redirects");
    if (!g.ok) return g.res;
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") ?? "";
    const filter: Record<string, unknown> = {};
    if (search) {
      filter.$or = [
        { sourceUrl: { $regex: search, $options: "i" } },
        { targetUrl: { $regex: search, $options: "i" } },
      ];
    }
    const redirects = await Redirect.find(filter).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ redirects });
  } catch (err) {
    console.error("[admin/redirects] GET:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const g = await guard("manage:redirects");
    if (!g.ok) return g.res;
    const body = await req.json();
    const sourceUrl = normalizePath(body.sourceUrl ?? "");
    const targetUrl = normalizePath(body.targetUrl ?? "");
    const enabled = body.enabled ?? true;

    if (!sourceUrl || !targetUrl) {
      return NextResponse.json({ error: "Source and target URLs are required" }, { status: 400 });
    }
    if (sourceUrl === targetUrl) {
      return NextResponse.json({ error: "Source and target cannot be the same" }, { status: 400 });
    }

    await connectToDatabase();
    const redirect = await Redirect.create({ sourceUrl, targetUrl, enabled });
    return NextResponse.json({ redirect }, { status: 201 });
  } catch (err: unknown) {
    if ((err as { code?: number }).code === 11000) {
      return NextResponse.json({ error: "A redirect for that source URL already exists" }, { status: 409 });
    }
    console.error("[admin/redirects] POST:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
