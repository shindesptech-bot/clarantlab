import { Schema, model, models } from "mongoose";
import type { ITag } from "@/types";

const TagSchema = new Schema<ITag>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true, trim: true, unique: true },
  },
  { timestamps: true }
);

export const Tag = models.Tag ?? model<ITag>("Tag", TagSchema);
