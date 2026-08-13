import { Schema, model, models } from "mongoose";
import type { IBlogPostDoc } from "@/types";

const BlogSchema = new Schema<IBlogPostDoc>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    featuredImage: { type: String },
    status: { type: String, enum: ["draft", "scheduled", "published"], default: "draft" },
    // Scheduled auto-publish: absolute UTC instant + the IANA zone the admin
    // picked (kept only so the editor/dashboard can redisplay in that zone).
    scheduledAt: { type: Date, default: null },
    scheduledTimezone: { type: String },
    author: { type: String, required: true },
    tags: [{ type: String, trim: true }],
    category: { type: String, trim: true },
    seoTitle: { type: String },
    seoDescription: { type: String },
    seoKeywords: { type: String },
    // SEO / Open Graph + accessibility
    ogImage: { type: String },
    imageAlt: { type: String },
    // Custom JSON-LD injected into the public page <head>
    schemaMarkup: { type: String },
    // FAQ — stored as an array of { q, a }; also powers FAQPage JSON-LD
    faq: { type: [{ q: String, a: String, _id: false }], default: undefined },
    // Manual read-time in minutes (1–60). Falls back to a computed estimate.
    readMin: { type: Number, min: 1, max: 60 },
    // Set once, on first publish.
    publishedAt: { type: Date },
    // Soft delete — null/absent = live, a timestamp = in Trash.
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// ponytail: soft-delete filtered explicitly per-query (see lib/blog.ts + admin
// blog GET), not via a global pre-find hook — avoids the classic footgun of the
// hook silently catching the by-id lookups that edit/restore/permanent-delete need.
BlogSchema.index({ deletedAt: 1 });
// Drives the cron publisher's due-posts query.
BlogSchema.index({ status: 1, scheduledAt: 1 });

export const BlogPost = models.BlogPost ?? model<IBlogPostDoc>("BlogPost", BlogSchema);
