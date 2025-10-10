import * as z from "zod";

export const brandSchema = z.object({
  brand_name: z
    .string()
    .min(1, "Store name must be at least 1 characters")
    .max(100, "Store name must be at most 100 characters"),
});

export type BrandSchema = z.infer<typeof brandSchema>;
