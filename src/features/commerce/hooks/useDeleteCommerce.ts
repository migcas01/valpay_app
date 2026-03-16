import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios"

export function useDeleteCommerce() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await apiClient.delete(`/commerces/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commerces"] });
    },
  });
}
