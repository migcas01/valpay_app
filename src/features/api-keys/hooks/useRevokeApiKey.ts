import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";

export function useRevokeApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await apiClient.post(`/api-keys/${id}/revoke`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
    },
  });
}
