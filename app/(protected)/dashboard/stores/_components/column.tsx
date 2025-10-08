"use client";

import { Store } from "@/types/store";
import { ColumnDef } from "@tanstack/react-table";
import { StoreCellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const storeColumns: ColumnDef<Store>[] = [
  {
    accessorKey: "store_name",
    header: "Name",
  },
  {
    accessorKey: "store_location",
    header: "Location",
  },
  {
    header: "Actions",
    cell: ({ row }) => <StoreCellAction data={row.original} />,
  },
];
