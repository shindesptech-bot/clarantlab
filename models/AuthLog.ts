import { Schema, model, models } from "mongoose";
import type { IAuthLog } from "@/types";

// Auth audit trail — login attempts (success/fail) and account changes.
// Written by lib/login-security.ts#logAuth. Also the source for per-IP rate
// limiting (count of recent "login" events by ip). Adapted from the PublicSite
// `authlog` Prisma model.
const AuthLogSchema = new Schema<IAuthLog>(
  {
    event: { type: String, required: true }, // "login" | "password_change" | "username_change"
    email: { type: String },
    userId: { type: String },
    success: { type: Boolean, default: true },
    reason: { type: String }, // "ok" | "bad_password" | "locked" | "rate_limited" | "inactive" | "no_user"
    ip: { type: String },
    userAgent: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

AuthLogSchema.index({ ip: 1, createdAt: -1 }); // per-IP rate-limit window query
AuthLogSchema.index({ userId: 1, createdAt: -1 });

export const AuthLog = models.AuthLog ?? model<IAuthLog>("AuthLog", AuthLogSchema);
