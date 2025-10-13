"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { MeasurementUnit } from "@/types/measurement-unit";
import { ColumnDef } from "@tanstack/react-table";
import { ArchiveMeasurementUnitCellAction } from "../../archive/measurement-units/_components/cell-action";
import { MeasurementUnitCellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const measurementUnitColumns: ColumnDef<MeasurementUnit>[] = [
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
    accessorKey: "name",
    header: "Unit Name",
  },
  {
    accessorKey: "unit",
    header: "Unit",
  },
  {
    accessorKey: "baseUnit",
    header: "Base Unit",
    cell: ({ row }) => (
      <>{row.original?.baseUnit ? row.original.baseUnit.name : "-"}</>
    ),
  },
  {
    accessorKey: "operator",
    header: "Operator",
    cell: ({ row }) => (
      <>{row.original?.operator ? row.original.operator : "-"}</>
    ),
  },
  {
    accessorKey: "operation_value",
    header: "Operation Value",
    cell: ({ row }) => (
      <>{row.original?.operation_value ? row.original.operation_value : "-"}</>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
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
          <ArchiveMeasurementUnitCellAction data={row.original} />
        ) : (
          <MeasurementUnitCellAction data={row.original} />
        )}
      </>
    ),
  },
];
