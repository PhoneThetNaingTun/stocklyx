"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Customer } from "@/types/customer";
import { ColumnDef } from "@tanstack/react-table";
import { ArchiveCustomerCellAction } from "../../archive/customers/_components/cell-action";
import { CustomerCellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const customerColumns: ColumnDef<Customer>[] = [
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
    accessorKey: "customer_name",
    header: "Name",
  },
  {
    accessorKey: "customer_email",
    header: "Email",
  },
  {
    accessorKey: "customer_phone",
    header: "Phone",
  },
  {
    accessorKey: "customer_address",
    header: "Address",
  },
  {
    accessorKey: "customer_city",
    header: "City",
  },
  {
    accessorKey: "customer_country",
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
          <ArchiveCustomerCellAction data={row.original} />
        ) : (
          <CustomerCellAction data={row.original} />
        )}
      </>
    ),
  },
];
