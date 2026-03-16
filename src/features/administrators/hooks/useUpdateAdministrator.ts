import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import type { Administrator, UpdateAdministratorPayload } from "../types/administrator.types";

interface UpdateAdministratorArgs {
  id: string;
  payload: UpdateAdministratorPayload;
}

export function useUpdateAdministrator() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: UpdateAdministratorArgs): Promise<Administrator> => {
      const { data } = await apiClient.patch(`/admins/${id}`, payload);
      return data;
    },
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["administrators"] });
      queryClient.invalidateQueries({ queryKey: ["administrator", id] });
    },
  });
}
