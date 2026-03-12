import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../api/clients";
import type { ApiKeyListResponse } from "../types/api-key.types";

export function useApiKeys() {
  return useQuery({
    queryKey: ["api-keys"],
    queryFn: async (): Promise<ApiKeyListResponse> => {
      const { data } = await apiClient.get("/api-keys");
      return data;
    },
  });
}
