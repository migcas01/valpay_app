import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios"
import type { CreateApiKeyPayload, CreateApiKeyResponse } from "../types/api-key.types";

export function useCreateApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateApiKeyPayload): Promise<CreateApiKeyResponse> => {
      const { data } = await apiClient.post("/api-keys", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
    },
  });
}
