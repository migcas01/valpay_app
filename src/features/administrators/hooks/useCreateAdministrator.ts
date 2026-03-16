import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import type { Administrator, CreateAdministratorPayload } from "../types/administrator.types";

export function useCreateAdministrator() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateAdministratorPayload): Promise<Administrator> => {
      const { data } = await apiClient.post("/admins", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["administrators"] });
    },
  });
}
