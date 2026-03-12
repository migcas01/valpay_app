import { useQuery } from "@tanstack/react-query";
import type { Transaction } from "../types/transaction.types";

const API_BASE = "http://localhost:3000/api/v1";

async function confirmTransaction(id: string): Promise<Transaction> {
  const response = await fetch(`${API_BASE}/transactions/${id}/confirm`);

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
