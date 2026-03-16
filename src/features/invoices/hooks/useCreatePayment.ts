import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPaymentIntent } from "../api/paymentsApi"
import type { CreateIntentPayload} from "../../payments/types";

export function useCreatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateIntentPayload) => createPaymentIntent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
}
