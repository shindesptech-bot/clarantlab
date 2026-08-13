import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { connectToDatabase } from "@/lib/mongodb";
import { BlogPost } from "@/models/Blog";

export const dynamic = "force-dynamic";

// Bearer-token check against CRON_SECRET. Refuses in production if unset.
function authorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return process.env.NODE_ENV !== "production";
  const header = req.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : header;
  const a = Buffer.from(token);
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}

// Publishes every due scheduled post. Idempotent + race-safe: the status filter
// means once a doc flips to "published" it no longer matches, so a second (or
// concurrent) run can never publish it twice, and a plain draft never publishes.
async function publishDue() {
  await connectToDatabase();
  const res = await BlogPost.updateMany(
    { status: "scheduled", scheduledAt: { $ne: null, $lte: new Date() }, deletedAt: null },
    // Aggregation-pipeline update: set publishedAt to now only if not already set.
    [
      {
        $set: {
          status: "published",
          publishedAt: { $ifNull: ["$publishedAt", "$$NOW"] },
          scheduledAt: null,
        },
      },
    ],
    // Mongoose requires this flag to accept a pipeline (array) as the update.
    { updatePipeline: true },
  );
  return res.modifiedCount ?? 0;
}

async function handle(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const published = await publishDue();
    return NextResponse.json({ ok: true, published });
  } catch (err) {
    console.error("[cron/publish-scheduled]:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// GET for simple pings (uptime/cron services); POST for platform schedulers.
export const GET = handle;
export const POST = handle;
