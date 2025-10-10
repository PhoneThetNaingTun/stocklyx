// @/schema/supplierSchema.ts

import * as z from "zod";

export const supplierSchema = z.object({
  supplier_name: z
    .string()
    .min(1, "supplier name must be at least 1 character")
    .max(100, "supplier name must be at most 100 characters"),

  supplier_email: z
    .string()
    .max(100, "supplier email must be at most 100 characters")
    .optional()
    .or(z.literal(""))

    .nullable(),

  supplier_phone: z
    .string()
    .max(100, "supplier phone must be at most 100 characters")
    .optional()
    .or(z.literal(""))

    .nullable(),

  supplier_address: z
    .string()
    .max(100, "supplier address must be at most 100 characters")
    .optional()
    .or(z.literal(""))

    .nullable(),

  supplier_city: z
    .string()
    .max(100, "supplier city must be at most 100 characters")
    .optional()
    .or(z.literal(""))

    .nullable(),

  supplier_country: z
    .string()
    .max(100, "supplier country must be at most 100 characters")
    .optional()
    .or(z.literal(""))

    .nullable(),
});

export type SupplierSchema = z.infer<typeof supplierSchema>;
