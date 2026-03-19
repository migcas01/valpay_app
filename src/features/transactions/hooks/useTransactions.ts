import { useQuery } from "@tanstack/react-query";
import { listTransactions, getTransaction } from "../api/transactionsApi";

interface UseTransactionsParams {
  page?: number;
  limit?: number;
  status?: string;
}

export function useTransactions(params: UseTransactionsParams = {}) {
  return useQuery({
    queryKey: ["transactions", params],
    queryFn: () => listTransactions(params),
  });
}

export function useTransaction(id: string) {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: () => getTransaction(id),
    enabled: !!id,
  });
}
