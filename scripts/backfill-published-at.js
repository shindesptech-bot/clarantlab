// One-off: backfill publishedAt for already-published posts created before the
// publishedAt field existed. Maps publishedAt = createdAt (their original
// displayed date) so no publication date is lost or reset to "today".
// Idempotent — only touches published docs where publishedAt is missing/null.
// Usage: node scripts/backfill-published-at.js
const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");

function loadEnv() {
  const envPath = path.join(__dirname, "..", ".env.local");
  const raw = fs.readFileSync(envPath, "utf8");
  for (const line of raw.split("\n")) {
    const m = line.match(/^\s*MONGODB_URI\s*=\s*(.+)\s*$/);
    if (m) return m[1].trim().replace(/^["']|["']$/g, "");
  }
  throw new Error("MONGODB_URI not found in .env.local");
}

async function main() {
  const uri = loadEnv();
  const dbName = (uri.match(/\/([^/?]+)\?/) || [])[1] || "ai-service";
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
  try {
    await client.connect();
    const col = client.db(dbName).collection("blogposts");

    // Missing OR explicitly null — either means "never backfilled".
    const filter = { status: "published", $or: [{ publishedAt: { $exists: false } }, { publishedAt: null }] };
    const before = await col.countDocuments(filter);

    // $set from another field requires an aggregation-pipeline update.
    const { modifiedCount } = await col.updateMany(filter, [{ $set: { publishedAt: "$createdAt" } }]);
    console.log(`Found ${before} published post(s) without publishedAt; backfilled ${modifiedCount} from createdAt.`);

    // Self-check: nothing published should be left without a publishedAt.
    const remaining = await col.countDocuments(filter);
    if (remaining !== 0) throw new Error(`Backfill incomplete: ${remaining} published post(s) still missing publishedAt.`);
    console.log("OK — every published post now has a publishedAt.");
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
