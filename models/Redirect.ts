import { Schema, model, models } from "mongoose";
import type { IRedirect } from "@/types";

// 301 redirect rules managed from the dashboard and applied by middleware.ts.
// sourceUrl is a normalised path ("/old-page"); targetUrl is a path or absolute URL.
const RedirectSchema = new Schema<IRedirect>(
  {
    sourceUrl: { type: String, required: true, trim: true, unique: true },
    targetUrl: { type: String, required: true, trim: true },
    enabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// The proxy map endpoint fetches only enabled rules — index the filter it uses.
RedirectSchema.index({ enabled: 1 });

export const Redirect = models.Redirect ?? model<IRedirect>("Redirect", RedirectSchema);
