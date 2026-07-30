import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";
import { verifyPassword } from "@/lib/password";
import { signSession } from "@/lib/session";
import {
  getClientInfo,
  isIpRateLimited,
  lockAfterFailure,
  logAuth,
  messageForCode,
} from "@/lib/login-security";

export async function POST(req: NextRequest) {
  const { ip, userAgent } = getClientInfo(req);
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    // Per-IP throttle before any DB lookup or password work.
    if (await isIpRateLimited(ip)) {
      await logAuth({ event: "login", email, success: false, reason: "rate_limited", ip, userAgent });
      return NextResponse.json({ error: messageForCode("rate_limited") }, { status: 429 });
    }

    await connectToDatabase();
    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail, active: true }).select("+passwordHash");

    // No user (or inactive) — generic message, don't reveal which.
    if (!user || !user.passwordHash) {
      await logAuth({ event: "login", email: normalizedEmail, success: false, reason: "no_user", ip, userAgent });
      return NextResponse.json({ error: messageForCode(null) }, { status: 401 });
    }

    // Locked account (lockUntil in the future).
    if (user.lockUntil && user.lockUntil.getTime() > Date.now()) {
      await logAuth({ event: "login", email: normalizedEmail, userId: user._id.toString(), success: false, reason: "locked", ip, userAgent });
      return NextResponse.json({ error: messageForCode("locked") }, { status: 401 });
    }

    const valid = verifyPassword(password, user.passwordHash);
    if (!valid) {
      // A prior lock that has since expired resets the counter before this failure.
      const priorAttempts =
        user.lockUntil && user.lockUntil.getTime() <= Date.now() ? 0 : user.failedLoginAttempts ?? 0;
      const { failedLoginAttempts, lockUntil } = lockAfterFailure(priorAttempts);
      await User.findByIdAndUpdate(user._id, {
        failedLoginAttempts,
        lastFailedLogin: new Date(),
        lockUntil,
      });
      await logAuth({ event: "login", email: normalizedEmail, userId: user._id.toString(), success: false, reason: "bad_password", ip, userAgent });
      const error = lockUntil ? messageForCode("locked") : messageForCode(null);
      return NextResponse.json({ error }, { status: 401 });
    }

    // Success — clear any lockout state and record the login.
    await User.findByIdAndUpdate(user._id, {
      lastLoginAt: new Date(),
      failedLoginAttempts: 0,
      lockUntil: null,
      lastFailedLogin: null,
    });
    await logAuth({ event: "login", email: normalizedEmail, userId: user._id.toString(), success: true, reason: "ok", ip, userAgent });

    const token = signSession({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      active: user.active !== false,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
    });

    const res = NextResponse.json({ success: true, role: user.role });
    res.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
