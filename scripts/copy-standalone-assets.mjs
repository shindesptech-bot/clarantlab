// Copies the static assets the standalone server needs but does NOT bundle by
// default. Per Next.js docs (output.md): the minimal `server.js` does not copy
// `public` or `.next/static` — they must be placed at `standalone/public` and
// `standalone/.next/static`, after which server.js serves them automatically.
//
// Without this, `_next/static/*` (compiled CSS/JS) 404s in production and the
// site renders as unstyled HTML. Run as a `postbuild` step so the artifact is
// self-contained. Cross-platform (uses fs.cpSync, no shell `cp`).
import { cpSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const standalone = resolve(root, ".next/standalone");

if (!existsSync(standalone)) {
  console.error(
    '[copy-standalone-assets] .next/standalone not found. Is `output: "standalone"` set and has `next build` run?'
  );
  process.exit(1);
}

const copies = [
  { from: resolve(root, ".next/static"), to: resolve(standalone, ".next/static") },
  { from: resolve(root, "public"), to: resolve(standalone, "public") },
];

for (const { from, to } of copies) {
  if (!existsSync(from)) {
    console.warn(`[copy-standalone-assets] skip (missing): ${from}`);
    continue;
  }
  cpSync(from, to, { recursive: true });
  console.log(`[copy-standalone-assets] copied ${from} -> ${to}`);
}
