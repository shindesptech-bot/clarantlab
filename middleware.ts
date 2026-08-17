import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE = "admin_session";
if (process.env.NODE_ENV === "production" && !process.env.AUTH_SECRET) {
  throw new Error("AUTH_SECRET must be set in production");
}
const SECRET = process.env.AUTH_SECRET ?? "fallback-secret";

function b64urlToBytes(str: string): Uint8Array {
  const padded = str + "=".repeat((4 - (str.length % 4)) % 4);
  const base64 = padded.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function verifySession(token: string): Promise<boolean> {
  try {
    const dot = token.lastIndexOf(".");
    if (dot === -1) return false;
    const data = token.slice(0, dot);
    const sig = token.slice(dot + 1);
    if (!data || !sig) return false;

    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      b64urlToBytes(sig) as BufferSource,
      new TextEncoder().encode(data)
    );
    if (!valid) return false;

    const payload = JSON.parse(new TextDecoder().decode(b64urlToBytes(data)));
    return payload.exp > Date.now();
  } catch {
    return false;
  }
}

// Module-scope cache of enabled redirect rules, refreshed via the public map
// endpoint. Keeps middleware off the DB on the hot path; fail-open on any error.
type RedirectCache = { map: Record<string, string>; exp: number };
let redirectCache: RedirectCache | null = null;
const REDIRECT_TTL_MS = 60_000;

async function lookupRedirect(pathname: string, origin: string): Promise<string | null> {
  if (pathname.startsWith("/api") || pathname.startsWith("/admin")) return null;
  try {
    if (!redirectCache || redirectCache.exp < Date.now()) {
      // Fetch over the container-LOCAL loopback, never the public hostname.
      // On Azure App Service a request to the app's own public URL hairpins out
      // to Front Door and hangs/fails; 127.0.0.1:$PORT stays in-container.
      // PORT is set by the platform. 2s timeout so a stalled fetch can never
      // block the first page request (the whole lookup is fail-open anyway).
      const mapOrigin = process.env.PORT ? `http://127.0.0.1:${process.env.PORT}` : origin;
      const res = await fetch(`${mapOrigin}/api/redirects/map`, {
        cache: "no-store",
        signal: AbortSignal.timeout(2000),
      });
      const data = res.ok ? await res.json() : { map: {} };
      redirectCache = { map: data.map ?? {}, exp: Date.now() + REDIRECT_TTL_MS };
    }
    const trimmed = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
    return redirectCache.map[trimmed] ?? redirectCache.map[pathname] ?? null;
  } catch {
    // Never let a redirect lookup break routing.
    redirectCache = { map: {}, exp: Date.now() + REDIRECT_TTL_MS };
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Admin API routes: coarse authentication gate returning JSON 401 (never a
  // redirect). Per-permission RBAC is enforced inside each handler via
  // lib/rbac.ts#guard — this is the defence-in-depth net the Next.js middleware
  // docs recommend so a forgotten in-route check can't leave an endpoint open.
  // The auth endpoints (login/logout) must stay reachable while unauthenticated.
  if (pathname.startsWith("/api/admin")) {
    if (pathname.startsWith("/api/admin/auth")) return NextResponse.next();
    const apiToken = req.cookies.get(ADMIN_COOKIE)?.value;
    const apiValid = apiToken ? await verifySession(apiToken) : false;
    if (!apiValid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // Admin page gate.
  if (pathname.startsWith("/admin")) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-admin-pathname", pathname);

    if (pathname === "/admin/login") {
      return NextResponse.next({ request: { headers: requestHeaders } });
    }

    const token = req.cookies.get(ADMIN_COOKIE)?.value;
    const valid = token ? await verifySession(token) : false;

    if (!valid) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Public paths: apply DB-managed 301 redirects (cached, fail-open).
  const target = await lookupRedirect(pathname, req.nextUrl.origin);
  if (target) {
    const dest = /^https?:\/\//i.test(target)
      ? target
      : new URL(target, req.nextUrl.origin).toString();
    return NextResponse.redirect(dest, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    // Public content paths for redirect handling — excludes Next internals,
    // API routes, and anything with a file extension (assets).
    "/((?!_next/|api/|.*\\.).*)",
  ],
};
