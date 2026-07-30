import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Redirect } from "@/models/Redirect";
import type { IRedirect } from "@/types";

// PUBLIC endpoint (intentionally not under /api/admin so the proxy can read it
// without the auth gate). Returns { map: { [sourceUrl]: targetUrl } } of enabled
// rules for proxy.ts to apply. Cached; the proxy also keeps a short TTL cache.
export async function GET() {
  try {
    await connectToDatabase();
    const rules = await Redirect.find({ enabled: true }).select("sourceUrl targetUrl").lean<IRedirect[]>();
    const map: Record<string, string> = {};
    for (const r of rules) map[r.sourceUrl] = r.targetUrl;
    return NextResponse.json(
      { map },
      { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } }
    );
  } catch (err) {
    console.error("[redirects/map] GET:", err);
    // Fail open with an empty map so a DB blip never breaks page routing.
    return NextResponse.json({ map: {} }, { status: 200 });
  }
}
