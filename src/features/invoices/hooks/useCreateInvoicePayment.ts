import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPaymentIntent } from "../api/paymentsApi";
import type { CreateIntentPayload } from "../types";

export function useCreateInvoicePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateIntentPayload) => createPaymentIntent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
}
