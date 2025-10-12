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
});

export type MeasurementUnitSchema = z.infer<typeof measurementUnitSchema>;
