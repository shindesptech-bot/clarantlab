// Role-based access control for the admin dashboard.
// Ported/adapted from the PublicSite reference (lib/rbac.ts) onto Build With
// Genie's existing custom HMAC session (lib/session.ts) — NOT next-auth.
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifySession, type SessionPayload } from "@/lib/session";

const ADMIN_COOKIE = "admin_session";

export type Role = "admin" | "editor" | "author";

export type Permission =
  | "manage:users"
  | "manage:blogs"
  | "manage:testimonials"
  | "manage:categories"
  | "manage:tags"
  | "manage:use-cases"
  | "manage:redirects"
  | "view:analytics"
  | "upload:media";

// Admin implicitly has every permission (see hasPermission short-circuit), so
// it's omitted here. Editors manage content; authors are the lowest privilege.
const ROLE_PERMISSIONS: Record<Exclude<Role, "admin">, Permission[]> = {
  editor: [
    "manage:blogs",
    "manage:testimonials",
    "manage:categories",
    "manage:tags",
    "manage:use-cases",
    "manage:redirects",
    "view:analytics",
    "upload:media",
  ],
  author: ["upload:media"],
};

// Legacy docs used role "user"; anything unrecognised falls back to the lowest
// privilege ("author") so a bad/missing role can never escalate.
export function normalizeRole(role?: string | null): Role {
  const r = (role ?? "").toLowerCase();
  return r === "admin" || r === "editor" || r === "author" ? r : "author";
}

export function hasPermission(role: string | undefined | null, permission: Permission): boolean {
  const r = normalizeRole(role);
  if (r === "admin") return true;
  return ROLE_PERMISSIONS[r].includes(permission);
}

// Reads + verifies the admin session cookie. Returns the payload or null.
export async function getSessionUser(): Promise<SessionPayload | null> {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!token) return null;
  return verifySession(token);
}

type GuardResult =
  | { ok: true; session: SessionPayload }
  | { ok: false; res: NextResponse };

// Route-handler guard. Usage:
//   const g = await guard("manage:users"); if (!g.ok) return g.res;
//   const session = g.session;
// Omit the permission to require only an authenticated session.
export async function guard(permission?: Permission): Promise<GuardResult> {
  const session = await getSessionUser();
  if (!session) {
    return { ok: false, res: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  if (session.active === false) {
    return { ok: false, res: NextResponse.json({ error: "Account is inactive" }, { status: 403 }) };
  }
  if (permission && !hasPermission(session.role, permission)) {
    return { ok: false, res: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  return { ok: true, session };
}

// admin/editor can edit any resource; author only their own (by author id).
export function canEdit(role: string | undefined | null, userId: string, resourceAuthorId: string): boolean {
  const r = normalizeRole(role);
  if (r === "admin" || r === "editor") return true;
  return userId === resourceAuthorId;
}
