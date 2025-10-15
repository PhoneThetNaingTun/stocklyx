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

export interface ProductVariant {
  id: string;
  productId: string;
  variant_name: string;
  saleUnitId: string;
  quantityPerUnit: number;
  sale_price: number;
  purchase_price: number;
  sku: string;
  barcode: string;
  low_stock_quantity?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  product: Product;
  saleUnit: MeasurementUnit;
}
