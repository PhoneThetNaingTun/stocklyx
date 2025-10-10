export interface Supplier {
  id: string;
  supplier_name: string;
  supplier_email?: string;
  supplier_phone?: string;
  supplier_address?: string;
  supplier_city?: string;
  supplier_country?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
