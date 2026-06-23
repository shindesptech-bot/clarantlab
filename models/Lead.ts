import mongoose, { Schema, model, models } from "mongoose";
import type { ILead } from "@/types";

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    company: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
  },
  { timestamps: true }
);

// Prevent model redefinition on hot-reload
export const Lead = models.Lead ?? model<ILead>("Lead", LeadSchema);
