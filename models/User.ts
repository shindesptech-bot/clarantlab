import { Schema, model, models } from "mongoose";
import type { IAdminUser } from "@/types";

const UserSchema = new Schema<IAdminUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    role: { type: String, enum: ["admin", "editor", "author"], default: "author" },
    avatar: { type: String },
    active: { type: Boolean, default: true },
    passwordHash: { type: String, select: false },
    lastLoginAt: { type: Date },
    // Brute-force protection (see lib/login-security.ts). Optional so
    // pre-existing docs read as undefined → treated as 0 attempts / unlocked.
    failedLoginAttempts: { type: Number, default: 0 },
    lastFailedLogin: { type: Date },
    lockUntil: { type: Date },
  },
  { timestamps: true }
);

export const User = models.User ?? model<IAdminUser>("User", UserSchema);
