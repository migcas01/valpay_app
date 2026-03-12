import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../api/clients";
import type { Commerce, CommerceListResponse } from "../types/commerce.types";

interface UseCommercesParams {
  page?: number;
  limit?: number;
  status?: string;
}

export function useCommerces(params: UseCommercesParams = {}) {
  return useQuery({
    queryKey: ["commerces", params],
    queryFn: async (): Promise<CommerceListResponse> => {
      const { data } = await apiClient.get("/commerces", { params });
      return data;
    },
  });
}

export function useCommerce(id: string) {
  return useQuery({
    queryKey: ["commerce", id],
    queryFn: async (): Promise<Commerce> => {
      const { data } = await apiClient.get(`/commerces/${id}`);
      return data;
    },
    enabled: !!id,
  });
}
