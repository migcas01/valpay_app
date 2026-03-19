import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransactionIntent } from "../../payments/api/paymentsApi";
import type { TransactionIntentPayload } from "../../payments/types";

export function useCreateInvoicePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TransactionIntentPayload) =>
      createTransactionIntent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
}
