import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../api/clients";
import type { Transaction, TransactionListResponse } from "../types/transaction.types";

interface UseTransactionsParams {
  page?: number;
  limit?: number;
  status?: string;
}

export function useTransactions(params: UseTransactionsParams = {}) {
  return useQuery({
    queryKey: ["transactions", params],
    queryFn: async (): Promise<TransactionListResponse> => {
      const { data } = await apiClient.get("/transactions", { params });
      return data;
    },
  });
}

export function useTransaction(id: string) {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: async (): Promise<Transaction> => {
      const { data } = await apiClient.get(`/transactions/${id}`);
      return data;
    },
    enabled: !!id,
  });
}
