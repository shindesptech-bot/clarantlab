// Path normalisation for redirect rules. Pure — shared by the API routes and
// the proxy lookup so stored keys and request paths match consistently.
export function normalizePath(input: string): string {
  let p = (input ?? "").trim();
  if (!p) return p;
  // Absolute targets are left as-is (they may be a full URL to another host).
  if (/^https?:\/\//i.test(p)) return p;
  if (!p.startsWith("/")) p = "/" + p;
  // Drop a trailing slash except for the root path.
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p;
}
