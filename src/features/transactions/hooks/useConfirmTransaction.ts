import { useQuery } from "@tanstack/react-query";
import type { Transaction } from "../types/transaction.types";

async function confirmTransaction(id: string): Promise<Transaction> {
  const response = await fetch(`/api/v1/transactions/${id}/confirm`);

  if (!response.ok) {
    throw new Error("Failed to confirm transaction");
  }

  return response.json();
}

export function useConfirmTransaction(transactionId: string) {
  return useQuery({
    queryKey: ["transaction", "confirm", transactionId],
    queryFn: () => confirmTransaction(transactionId),
    enabled: !!transactionId,
    retry: 3,
    retryDelay: 2000,
  });
}
