import mongoose from "mongoose";
import dns from "node:dns";

// Local-only workaround: the system DNS resolver (127.0.0.1) refuses every
// query (querySrv/A ECONNREFUSED), which breaks the SRV + A lookups that
// mongodb+srv:// connection strings need. Point Node at public resolvers.
// Vercel's network resolves fine, so this is gated to non-Vercel envs and
// leaves production behavior untouched. It must run in the same execution
// context (worker thread) that performs the connect, so we call it inside
// connectToDatabase rather than only as a module-load side-effect.
function ensureWorkingDns(): void {
  if (process.env.VERCEL) return;
  const PUBLIC_DNS = ["8.8.8.8", "1.1.1.1"];
  const isBroken = (servers: string[]) =>
    servers.length === 0 || servers.every((s) => s.startsWith("127."));
  // The callback resolver and the dns.promises resolver are independent
  // instances. The MongoDB driver resolves SRV via dns.promises.resolveSrv,
  // so the promises resolver is the one that actually matters here.
  if (isBroken(dns.getServers())) {
    dns.setServers(PUBLIC_DNS);
  }
  if (isBroken(dns.promises.getServers())) {
    dns.promises.setServers(PUBLIC_DNS);
  }
}

// Cache the connection on the global object so it survives Next.js hot-reload
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };
global.mongooseCache = cached;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const MONGODB_URI = process.env.MONGODB_URI;

   
    if (!MONGODB_URI) {
      throw new Error("Please define the MONGODB_URI environment variable");
    }
    ensureWorkingDns();
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    
  } catch (err) {
    // Reset so a transient failure (e.g. DNS) can be retried on the next
    // request instead of being cached as a permanently-rejected promise.
    cached.promise = null;
    throw err;
  }
  return cached.conn;
}
