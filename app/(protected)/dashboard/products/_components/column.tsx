"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { ArchiveProductCellAction } from "../../archive/products/_components/cell-action";
import { ProductCellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const productColumns: ColumnDef<Product>[] = [
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
  { accessorKey: "product_name", header: "Product Name" },
  {
    accessorKey: "brand",
    header: "Brand",
    cell: ({ row }) => row.original.brand.brand_name,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => row.original.category.category_name,
  },
  {
    accessorKey: "baseUnit",
    header: "Base Unit",
    cell: ({ row }) => row.original.baseUnit.name,
  },
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
        {row.original.deletedAt ? (
          <ArchiveProductCellAction data={row.original} />
        ) : (
          <ProductCellAction data={row.original} />
        )}
      </>
    ),
  },
];
