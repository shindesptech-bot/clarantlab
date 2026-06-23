import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Your name is required."),
  email: z.string().email("Please provide a valid email address."),
  company: z.string().min(1, "Your company name is required."),
  phone: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
