import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios"
import type { Commerce, UpdateCommercePayload } from "../types/commerce.types";

interface UpdateCommerceArgs {
  id: string;
  payload: UpdateCommercePayload;
}

export function useUpdateCommerce() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: UpdateCommerceArgs): Promise<Commerce> => {
      const { data } = await apiClient.patch(`/commerces/${id}`, payload);
      return data;
    },
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["commerces"] });
      queryClient.invalidateQueries({ queryKey: ["commerce", id] });
    },
  });
}
