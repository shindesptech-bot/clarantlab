import { createHmac } from "crypto";

if (process.env.NODE_ENV === "production" && !process.env.AUTH_SECRET) {
  throw new Error("AUTH_SECRET must be set in production");
}
const SECRET = process.env.AUTH_SECRET ?? "fallback-secret";

export interface SessionPayload {
  id: string;
  email: string;
  role: string;
  // Signed into the token so route guards can reject a deactivated account
  // without a DB round-trip. Older tokens without it read as undefined (treated
  // as active until they expire).
  active?: boolean;
  exp: number;
}

export function signSession(payload: SessionPayload): string {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = createHmac("sha256", SECRET).update(data).digest("base64url");
  return `${data}.${sig}`;
}

export function verifySession(token: string): SessionPayload | null {
  try {
    const [data, sig] = token.split(".");
    if (!data || !sig) return null;
    const expected = createHmac("sha256", SECRET).update(data).digest("base64url");
    if (sig !== expected) return null;
    const payload: SessionPayload = JSON.parse(Buffer.from(data, "base64url").toString());
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}
