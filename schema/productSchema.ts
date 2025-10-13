import * as z from "zod";

export const productSchema = z.object({
  product_name: z
    .string()
    .min(1, "Product name must be at least 1 characters")
    .max(500, "Product name must be at most 500 characters"),

  description: z.string().optional().or(z.literal("")).nullable(),
  categoryId: z.string(),
  brandId: z.string(),
  baseUnitId: z.string(),
});

export type ProductSchema = z.infer<typeof productSchema>;
