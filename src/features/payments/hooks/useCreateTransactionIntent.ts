import { useMutation } from "@tanstack/react-query";
import { createTransactionIntent } from "../api/paymentsApi";
import type { TransactionIntentPayload } from "../types";

export function useCreateTransactionIntent() {
  return useMutation({
    mutationFn: (payload: TransactionIntentPayload) =>
      createTransactionIntent(payload),
  });
}
