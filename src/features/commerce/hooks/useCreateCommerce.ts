import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios"
import type { Commerce, CreateCommercePayload } from "../types/commerce.types";

export function useCreateCommerce() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateCommercePayload): Promise<Commerce> => {
      const { data } = await apiClient.post("/commerces", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commerces"] });
    },
  });
}
