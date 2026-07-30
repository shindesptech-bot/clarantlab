import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";
import { hashPassword } from "@/lib/password";
import { guard } from "@/lib/rbac";

// True if demoting/deactivating/deleting this user would leave zero active
// admins — which would lock everyone out of the dashboard.
async function isLastActiveAdmin(id: string): Promise<boolean> {
  const target = await User.findById(id).select("role active").lean<{ role?: string; active?: boolean }>();
  if (!target || target.role !== "admin" || target.active === false) return false;
  const otherAdmins = await User.countDocuments({ _id: { $ne: id }, role: "admin", active: true });
  return otherAdmins === 0;
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const g = await guard("manage:users");
    if (!g.ok) return g.res;
    const { id } = await params;
    await connectToDatabase();
    const user = await User.findById(id).lean();
    if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ user });
  } catch (err) {
    console.error("[admin/users/:id] GET:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const g = await guard("manage:users");
    if (!g.ok) return g.res;
    const { id } = await params;
    const body = await req.json();
    const { name, email, role, avatar, active, password } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    await connectToDatabase();

    // Self-protection: you can't demote or deactivate your own account.
    if (id === g.session.id) {
      if (role && role !== "admin") {
        return NextResponse.json({ error: "You cannot change your own role" }, { status: 400 });
      }
      if (active === false) {
        return NextResponse.json({ error: "You cannot deactivate your own account" }, { status: 400 });
      }
    }

    // Don't let the last active admin be demoted or deactivated.
    if ((role && role !== "admin") || active === false) {
      if (await isLastActiveAdmin(id)) {
        return NextResponse.json({ error: "Cannot remove the last active admin" }, { status: 409 });
      }
    }

    const update: Record<string, unknown> = { name, email, role, avatar, active };
    if (password && password.length >= 6) {
      update.passwordHash = hashPassword(password);
    }

    const user = await User.findByIdAndUpdate(id, update, { new: true, runValidators: true }).lean();
    if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ user });
  } catch (err: unknown) {
    if ((err as { code?: number }).code === 11000) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }
    console.error("[admin/users/:id] PUT:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const g = await guard("manage:users");
    if (!g.ok) return g.res;
    const { id } = await params;
    await connectToDatabase();

    if (id === g.session.id) {
      return NextResponse.json({ error: "You cannot delete your own account" }, { status: 400 });
    }
    if (await isLastActiveAdmin(id)) {
      return NextResponse.json({ error: "Cannot delete the last active admin" }, { status: 409 });
    }

    const user = await User.findByIdAndDelete(id).lean();
    if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/users/:id] DELETE:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
