// lib/validation.ts
import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().min(2, "Please enter your name."),
    email: z.string().email("Please enter a valid email."),
    // Phone is optional (matches your label "Phone (optional)")
    phone: z.string().trim().optional(),
    message: z.string().min(10, "Please provide a few more details."),
    tour: z.string().optional(),
    date: z.string().optional(),
    honeypot: z.string().optional(),
    startedAt: z.number().optional(),
});

// Very important: infer the type directly from the schema
export type ContactInput = z.infer<typeof contactSchema>;
