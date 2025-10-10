export interface Brand {
  id: string;
  brand_name: string;
  brand_logo?: string;
  createdAt: Date;
  updatedAt: Date;
  companyId: string;
  deletedAt?: Date;
}
