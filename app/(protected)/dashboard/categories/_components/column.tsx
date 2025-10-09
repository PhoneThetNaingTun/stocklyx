"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Category } from "@/types/category";
import { ColumnDef } from "@tanstack/react-table";
import { ArchiveCategoryCellAction } from "../../archive/categories/_components/cell-action";
import { CategoryCellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const categoryColumns: ColumnDef<Category>[] = [
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
    accessorKey: "category_name",
    header: "Name",
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
          <ArchiveCategoryCellAction data={row.original} />
        ) : (
          <CategoryCellAction data={row.original} />
        )}
      </>
    ),
  },
];
