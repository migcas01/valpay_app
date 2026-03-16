import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import type { Administrator, AdministratorListResponse } from "../types/administrator.types";

interface UseAdministratorsParams {
  page?: number;
  limit?: number;
  role?: string;
}

export function useAdministrators(params: UseAdministratorsParams = {}) {
  return useQuery({
    queryKey: ["administrators", params],
    queryFn: async (): Promise<AdministratorListResponse> => {
      const { data } = await apiClient.get("/admins", { params });
      return data;
    },
  });
}

export function useAdministrator(id: string) {
  return useQuery({
    queryKey: ["administrator", id],
    queryFn: async (): Promise<Administrator> => {
      const { data } = await apiClient.get(`/admins/${id}`);
      return data;
    },
    enabled: !!id,
  });
}
