import * as z from "zod";

export const productVariantSchema = z.object({
  productId: z.string(),

  variant_name: z
    .string()
    .min(1, "Variant name must be at least 1 characters")
    .max(100, "Variant name must be at most 100 characters"),
  saleUnitId: z.string(),
  quantityPerUnit: z
    .number()
    .min(1, "Quantity per unit must be at least 1")
    .positive(),
  sale_price: z.number().min(1, "Sale price must be at least 1").positive(),
  purchase_price: z
    .number()
    .min(1, "Purchase price must be at least 1")
    .positive(),
  sku: z.string().optional().or(z.literal("")).nullable(),
  barcode: z.string().optional().or(z.literal("")).nullable(),
  low_stock_quantity: z.number().optional().or(z.literal("")).nullable(),
});

export type ProductVariantSchema = z.infer<typeof productVariantSchema>;
