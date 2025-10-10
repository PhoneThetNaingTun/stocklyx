export interface Customer {
  id: string;
  customer_name: string;
  customer_email?: string;
  customer_phone?: string;
  customer_address?: string;
  customer_city?: string;
  customer_country?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
