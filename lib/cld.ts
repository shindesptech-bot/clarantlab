// Optimize Cloudinary delivery URLs (f_auto,q_auto,w_,c_limit); pass others
// through unchanged. Idempotent.
export function cldOptimize(url: string | undefined, width?: number): string {
  if (!url) return "";
  if (!url.includes("res.cloudinary.com/") || !url.includes("/upload/")) return url;
  if (/\/upload\/[^/]*(f_auto|q_auto)/.test(url)) return url;
  const t = ["f_auto", "q_auto", ...(width ? [`w_${width}`, "c_limit"] : [])].join(",");
  return url.replace("/upload/", `/upload/${t}/`);
}
