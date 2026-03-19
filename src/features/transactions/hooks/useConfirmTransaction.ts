import { useQuery } from "@tanstack/react-query";
import { confirmTransaction } from "../../payments/api/paymentsApi";

export function useConfirmTransaction(transactionId: string) {
  return useQuery({
    queryKey: ["transaction", "confirm", transactionId],
    queryFn: () => confirmTransaction(Number(transactionId)),
    enabled: !!transactionId,
    retry: 3,
    retryDelay: 2000,
  });
}
