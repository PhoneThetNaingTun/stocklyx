export enum Operator {
  MUTIPLY = "MULTIPLY",
  DIVIDE = "DIVIDE",
}

export interface MeasurementUnit {
  id: string;
  name: string;
  unit: string;
  baseUnitId?: string;
  operator?: Operator;
  operation_value?: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  baseUnit: MeasurementUnit;
}
