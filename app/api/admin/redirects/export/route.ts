import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { connectToDatabase } from "@/lib/mongodb";
import { Redirect } from "@/models/Redirect";
import { guard } from "@/lib/rbac";
import type { IRedirect } from "@/types";

export async function GET() {
  try {
    const g = await guard("manage:redirects");
    if (!g.ok) return g.res;
    await connectToDatabase();
    const redirects = await Redirect.find().sort({ createdAt: -1 }).lean<IRedirect[]>();

    const aoa = [
      ["From URL", "To URL", "Status", "Created Date"],
      ...redirects.map((r) => [
        r.sourceUrl,
        r.targetUrl,
        r.enabled ? "Active" : "Inactive",
        r.createdAt ? new Date(r.createdAt).toISOString() : "",
      ]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(aoa);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Redirects");
    const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" }) as Buffer;

    return new NextResponse(new Uint8Array(buf), {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="redirects.xlsx"',
      },
    });
  } catch (err) {
    console.error("[admin/redirects/export] GET:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
