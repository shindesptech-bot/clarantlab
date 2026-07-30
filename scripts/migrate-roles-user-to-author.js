// One-off: migrate legacy user role "user" -> "author" (role reconciliation for
// the admin dashboard migration). Safe to re-run — updates only docs still on "user".
// Usage: node scripts/migrate-roles-user-to-author.js
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
    const users = client.db(dbName).collection("users");
    const before = await users.countDocuments({ role: "user" });
    const { modifiedCount } = await users.updateMany({ role: "user" }, { $set: { role: "author" } });
    console.log(`Found ${before} user(s) with role "user"; migrated ${modifiedCount} -> "author".`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
