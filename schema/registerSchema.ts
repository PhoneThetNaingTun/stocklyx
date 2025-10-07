import * as z from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const registerSchema = z.object({
  name: z
    .string()
    .min(5, "Username must be at least 5 characters")
    .max(32, "Username must be at most 32 characters"),
  email: z.string().regex(emailRegex, "Invalid Email!"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at most 32 characters"),
  confirmPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at most 32 characters"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
