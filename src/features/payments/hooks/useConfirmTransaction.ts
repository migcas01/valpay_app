import { useQuery } from "@tanstack/react-query";
import { confirmTransaction } from "../api/paymentsApi";

export function useConfirmTransaction(transactionId: number) {
  return useQuery({
    queryKey: ["transactions", "confirm", transactionId],
    queryFn: () => confirmTransaction(transactionId),
    enabled: !!transactionId,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      const terminal = ["SUCCESS", "FAILED", "NOT_AUTHORIZED", "REFUNDED", "VOIDED"];
      return status && terminal.includes(status) ? false : 5000;
    },
  });
}
