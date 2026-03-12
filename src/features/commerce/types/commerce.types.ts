export type CommerceStatus = "active" | "inactive" | "suspended";

export interface Commerce {
  id: string;
  name: string;
  document: string;
  email: string;
  phone?: string;
  status: CommerceStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommercePayload {
  name: string;
  document: string;
  email: string;
  phone?: string;
}

export interface UpdateCommercePayload {
  name?: string;
  email?: string;
  phone?: string;
  status?: CommerceStatus;
}

export interface CommerceListResponse {
  data: Commerce[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}
