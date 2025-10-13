import { Brand } from "./brand";
import { Category } from "./category";
import { MeasurementUnit } from "./measurement-unit";

export interface Product {
  id: string;
  product_name: string;
  companyId: string;
  brandId: string;
  categoryId: string;
  baseUnitId: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  brand: Brand;
  category: Category;
  baseUnit: MeasurementUnit;
}
