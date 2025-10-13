import { Operator } from "@/types/measurement-unit";
import * as z from "zod";

export const measurementUnitSchema = z.object({
  name: z
    .string()
    .min(1, "Name must be at least 1 characters")
    .max(50, "Name must be at most 50 characters"),
  unit: z
    .string()
    .min(1, "Unit must be at least 1 characters")
    .max(50, "Unit must be at most 50 characters"),
  baseUnitId: z.string().optional().or(z.literal("")).nullable(),
  operator: z.enum(Operator).optional().or(z.literal("")).nullable(),
  operation_value: z.number().optional().or(z.literal("")).nullable(),
  description: z.string().optional().or(z.literal("")).nullable(),
});

export type MeasurementUnitSchema = z.infer<typeof measurementUnitSchema>;
