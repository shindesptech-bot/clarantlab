import { Schema, model, models } from "mongoose";
import type { ICategory } from "@/types";

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true, trim: true, unique: true },
  },
  { timestamps: true }
);

export const Category = models.Category ?? model<ICategory>("Category", CategorySchema);
