import * as z from "zod";
import { emailRegex } from "./loginSchema";

export const storeSchema = z.object({
  store_name: z
    .string()
    .min(5, "Store name must be at least 5 characters")
    .max(100, "Store name must be at most 100 characters"),
  store_location: z
    .string()
    .min(1, "Store name must be at least 1 characters")
    .max(100, "Store name must be at most 100 characters"),
  store_phone: z
    .string()
    .min(1, "Store phone must be at least 1 characters")
    .max(100, "Store phone must be at most 100 characters"),
  store_email: z.string().regex(emailRegex, "Invalid email format!"),
  store_city: z
    .string()
    .min(1, "Store city must be at least 1 characters")
    .max(100, "Store city must be at most 100 characters"),
  store_country: z
    .string()
    .min(1, "Store country must be at least 1 characters")
    .max(100, "Store country must be at most 100 characters"),
});

export type StoreSchema = z.infer<typeof storeSchema>;
