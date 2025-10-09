"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Store } from "@/types/store";
import { ColumnDef } from "@tanstack/react-table";
import { ArchiveCellAction } from "../../archive/stores/_components/cell-action";
import { StoreCellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const storeColumns: ColumnDef<Store>[] = [
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
    accessorKey: "store_name",
    header: "Name",
  },
  {
    accessorKey: "store_email",
    header: "Email",
  },
  {
    accessorKey: "store_phone",
    header: "Phone",
  },
  {
    accessorKey: "store_location",
    header: "Location",
  },
  {
    accessorKey: "store_city",
    header: "City",
  },
  {
    accessorKey: "store_country",
    header: "Country",
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <>
        {row.original.deletedAt ? (
          <ArchiveCellAction data={row.original} />
        ) : (
          <StoreCellAction data={row.original} />
        )}
      </>
    ),
  },
];
