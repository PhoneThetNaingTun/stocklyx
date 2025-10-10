import * as z from "zod";

export const customerSchema = z.object({
  customer_name: z
    .string()
    .min(1, "Customer name must be at least 1 character")
    .max(100, "Customer name must be at most 100 characters"),

  customer_email: z
    .string()
    .max(100, "Customer email must be at most 100 characters")
    .optional()
    .or(z.literal("")),

  customer_phone: z
    .string()
    .max(100, "Customer phone must be at most 100 characters")
    .optional()
    .or(z.literal("")),

  customer_address: z
    .string()
    .max(100, "Customer address must be at most 100 characters")
    .optional()
    .or(z.literal("")),

  customer_city: z
    .string()
    .max(100, "Customer city must be at most 100 characters")
    .optional()
    .or(z.literal("")),

  customer_country: z
    .string()
    .max(100, "Customer country must be at most 100 characters")
    .optional()
    .or(z.literal("")),
});

export type CustomerSchema = z.infer<typeof customerSchema>;
