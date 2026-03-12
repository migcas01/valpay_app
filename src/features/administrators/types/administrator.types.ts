export type AdminRole = "admin" | "maintainer";
export type AdminStatus = "active" | "inactive" | "banned";

export interface Administrator {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: AdminStatus;
  commerceId?: string;
  commerceName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAdministratorPayload {
  name: string;
  email: string;
  password: string;
  role: AdminRole;
  commerceId?: string;
}

export interface UpdateAdministratorPayload {
  name?: string;
  role?: AdminRole;
  status?: AdminStatus;
  commerceId?: string;
}

export interface AdministratorListResponse {
  data: Administrator[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}
