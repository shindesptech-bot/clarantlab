const { MongoClient } = require("mongodb");
const { scryptSync, randomBytes } = require("crypto");
const dns = require("node:dns");
const fs = require("node:fs");
const path = require("node:path");

// Read MONGODB_URI from .env.local so this stays in sync with the app and we
// never hardcode (stale) credentials/cluster here.
function loadMongoUri() {
  const envPath = path.resolve(__dirname, "..", ".env.local");
  const line = fs
    .readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .find((l) => l.startsWith("MONGODB_URI="));
  if (!line) throw new Error("MONGODB_URI not found in .env.local");
  return line.slice("MONGODB_URI=".length).trim();
}

// Local-only: the system resolver refuses SRV lookups, so point Node at public
// DNS (same workaround the app uses in lib/mongodb.ts).
const broken = (s) => s.length === 0 || s.every((x) => x.startsWith("127."));
if (broken(dns.getServers())) dns.setServers(["8.8.8.8", "1.1.1.1"]);
if (broken(dns.promises.getServers())) dns.promises.setServers(["8.8.8.8", "1.1.1.1"]);

const uri = loadMongoUri();

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = scryptSync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}

const users = [
  {
    name: "Admin",
    email: "admin@sptechusa.com",
    password: "Admin@1234",
    role: "admin",
    active: true,
  },
  {
    name: "Editor",
    email: "editor@sptechusa.com",
    password: "Editor@1234",
    role: "editor",
    active: true,
  },
  {
    name: "Author",
    email: "author@sptechusa.com",
    password: "Author@1234",
    role: "editor",
    active: true,
  },
];

async function seed() {
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
  try {
    await client.connect();
    const db = client.db("ai-service");
    const col = db.collection("users");

    for (const user of users) {
      const existing = await col.findOne({ email: user.email });
      if (existing) {
        // Update password hash in case it changed
        await col.updateOne(
          { email: user.email },
          { $set: { passwordHash: hashPassword(user.password), role: user.role, active: true } }
        );
        console.log(`✅ Updated: ${user.email} (${user.role})`);
      } else {
        await col.insertOne({
          name: user.name,
          email: user.email,
          role: user.role,
          active: user.active,
          passwordHash: hashPassword(user.password),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        console.log(`✅ Created: ${user.email} (${user.role})`);
      }
    }

    console.log("\n--- Credentials ---");
    users.forEach(u => console.log(`${u.role.toUpperCase().padEnd(8)} ${u.email} / ${u.password}`));
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await client.close();
  }
}

seed();
