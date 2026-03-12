export type UserRole = "maintainer" | "admin" | "client";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  commerceId?: string;
}

export interface AuthState {
  user: SessionUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
