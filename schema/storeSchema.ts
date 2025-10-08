import * as z from "zod";

export const storeSchema = z.object({
  store_name: z
    .string()
    .min(5, "Store name must be at least 5 characters")
    .max(100, "Store name must be at most 100 characters"),
  store_location: z
    .string()
    .min(5, "Store name must be at least 5 characters")
    .max(100, "Store name must be at most 100 characters"),
});

export type StoreSchema = z.infer<typeof storeSchema>;
