import * as z from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const loginSchema = z.object({
  email: z.string().regex(emailRegex, "Invalid email format!"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at most 32 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
