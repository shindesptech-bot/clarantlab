import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { connectToDatabase } from "@/lib/mongodb";
import { Redirect } from "@/models/Redirect";
import { guard } from "@/lib/rbac";
import { normalizePath } from "@/lib/redirects";

const FROM_ALIASES = ["from url", "from", "source", "source url", "sourceurl"];
const TO_ALIASES = ["to url", "to", "target", "target url", "targeturl", "destination"];
const MAX_ERRORS = 50;

// Pull a value from a row by trying each header alias (case-insensitive).
function pick(row: Record<string, unknown>, aliases: string[]): string {
  const lowered = new Map(Object.entries(row).map(([k, v]) => [k.trim().toLowerCase(), v]));
  for (const a of aliases) {
    const v = lowered.get(a);
    if (v != null && String(v).trim()) return String(v).trim();
  }
  return "";
}

export async function POST(req: NextRequest) {
  try {
    const g = await guard("manage:redirects");
    if (!g.ok) return g.res;

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const buf = Buffer.from(await file.arrayBuffer());
    const wb = XLSX.read(buf, { type: "buffer" });
    const sheet = wb.Sheets[wb.SheetNames[0]];
    if (!sheet) return NextResponse.json({ error: "The file has no sheets" }, { status: 400 });

    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: "" });

    await connectToDatabase();
    let imported = 0;
    const errors: string[] = [];

    for (let i = 0; i < rows.length; i++) {
      const sourceUrl = normalizePath(pick(rows[i], FROM_ALIASES));
      const targetUrl = normalizePath(pick(rows[i], TO_ALIASES));
      if (!sourceUrl || !targetUrl) {
        if (errors.length < MAX_ERRORS) errors.push(`Row ${i + 2}: missing source or target`);
        continue;
      }
      if (sourceUrl === targetUrl) {
        if (errors.length < MAX_ERRORS) errors.push(`Row ${i + 2}: source equals target`);
        continue;
      }
      try {
        await Redirect.updateOne(
          { sourceUrl },
          { $set: { sourceUrl, targetUrl, enabled: true } },
          { upsert: true }
        );
        imported++;
      } catch {
        if (errors.length < MAX_ERRORS) errors.push(`Row ${i + 2}: failed to save`);
      }
    }

    return NextResponse.json({ imported, total: rows.length, errors });
  } catch (err) {
    console.error("[admin/redirects/import] POST:", err);
    return NextResponse.json({ error: "Could not read the file" }, { status: 500 });
  }
}
