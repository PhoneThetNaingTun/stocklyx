export enum Role {
  ADMIN = "ADMIN",
  OWNER = "OWNER",
  MANAGER = "MANAGER",
  CASHIER = "CASHIER",
}

export type User = {
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};

export interface AuthSliceState {
  token: string | null;
  user: User | null;
}
