"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ProductVariant } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import Barcode from "react-barcode";
import { ProductVariantCellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const productVariantColumns: ColumnDef<ProductVariant>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  { accessorKey: "sku", header: "SKU" },
  { accessorKey: "variant_name", header: "Variant Name" },
  {
    accessorKey: "saleUnit",
    header: "Sale Unit",
    cell: ({ row }) => row.original.saleUnit.name,
  },
  { accessorKey: "quantityPerUnit", header: "Quantity Per Unit" },
  { accessorKey: "sale_price", header: "Sale Price" },
  { accessorKey: "purchase_price", header: "Purchase Price" },
  {
    accessorKey: "barcode",
    header: "Barcode",
    cell: ({ row }) => (
      <Barcode
        value={row.original.barcode}
        format="CODE128"
        width={1}
        height={40}
        displayValue={true}
      />
    ),
  },
  { accessorKey: "low_stock_quantity", header: "Low stock quantity" },
  { accessorKey: "description", header: "Description" },
  {
    header: "Date",
    cell: ({ row }) => {
      return row.original.deletedAt
        ? `Archived At : ${new Date(
            row.original.deletedAt
          ).toLocaleDateString()}`
        : `Created At : ${new Date(
            row.original.createdAt
          ).toLocaleDateString()}`;
    },
  },

  {
    header: "Actions",
    cell: ({ row }) => (
      <>
        <ProductVariantCellAction data={row.original} />
      </>
    ),
  },
];
