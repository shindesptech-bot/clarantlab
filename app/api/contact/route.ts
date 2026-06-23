import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";
import { contactSchema } from "@/lib/validations";

const WEB_TO_LEAD_URL =
  "https://sptechusa--spt2024.sandbox.my.site.com/services/apexrest/v1/WebToLead/submit";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields (name, email, company); phone is optional.
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, company, phone } = parsed.data;

    // Build the payload in the exact shape the WebToLead endpoint expects.
    const payload = {
      name,
      email,
      company,
      phone: phone ?? "",
    };

    // Forward the lead to Salesforce WebToLead.
    const sfRes = await fetch(WEB_TO_LEAD_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!sfRes.ok) {
      const detail = await sfRes.text().catch(() => "");
      console.error("[contact] WebToLead error:", sfRes.status, detail);
      return NextResponse.json(
        { error: "We couldn't submit your request. Please try again." },
        { status: 502 }
      );
    }

    // Persist a copy locally (best-effort — never fail the request on this).
    try {
      await connectToDatabase();
      await Lead.create({ name, email, company, phone });
    } catch (dbErr) {
      console.error("[contact] DB persist error (non-fatal):", dbErr);
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("[contact] POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
