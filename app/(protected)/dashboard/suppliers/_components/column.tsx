"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Supplier } from "@/types/supplier";
import { ColumnDef } from "@tanstack/react-table";
import { ArchiveSupplierCellAction } from "../../archive/suppliers/_components/cell-action";
import { SupplierCellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const supplierColumns: ColumnDef<Supplier>[] = [
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
  {
    accessorKey: "supplier_name",
    header: "Name",
  },
  {
    accessorKey: "supplier_email",
    header: "Email",
  },
  {
    accessorKey: "supplier_phone",
    header: "Phone",
  },
  {
    accessorKey: "supplier_address",
    header: "Address",
  },
  {
    accessorKey: "supplier_city",
    header: "City",
  },
  {
    accessorKey: "supplier_country",
    header: "Country",
  },
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
          <ArchiveSupplierCellAction data={row.original} />
        ) : (
          <SupplierCellAction data={row.original} />
        )}
      </>
    ),
  },
];
