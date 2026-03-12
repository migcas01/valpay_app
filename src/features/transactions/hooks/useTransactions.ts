import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../api/clients";
import type {
  Transaction,
  TransactionListResponse,
} from "../types/transaction.types";

interface UseTransactionsParams {
  page?: number;
  limit?: number;
  status?: string;
}

function transformTransaction(apiTx: Record<string, unknown>): Transaction {
  const statusObj = apiTx.TransactionStatus as
    | Record<string, unknown>
    | undefined;
  const providerObj = apiTx.Provider as Record<string, unknown> | undefined;

  const statusCode = statusObj?.code as string | undefined;
  let status: "pending" | "completed" | "failed" = "pending";
  if (statusCode === "SUCCESS" || statusCode === "AUTHORIZED")
    status = "completed";
  else if (statusCode === "FAILED" || statusCode === "NOT_AUTHORIZED")
    status = "failed";

  return {
    id: String(apiTx.id),
    paymentId: String(apiTx.invoiceId),
    externalId: apiTx.externalId ? String(apiTx.externalId) : undefined,
    provider:
      ((providerObj?.code as string)?.toLowerCase() as
        | "pse"
        | "card"
        | "cash") || "pse",
    status,
    amount: Number(apiTx.amount) || 0,
    currency: "COP",
    createdAt: String(apiTx.createdAt || ""),
    updatedAt: String(apiTx.updatedAt || ""),
  };
}

export function useTransactions(params: UseTransactionsParams = {}) {
  return useQuery({
    queryKey: ["transactions", params],
    queryFn: async (): Promise<TransactionListResponse> => {
      const { data } = await apiClient.get("/transactions/1", { params });

      // La API devuelve un array directo
      const transactions = (Array.isArray(data) ? data : data.data || []).map(
        transformTransaction,
      );

      return {
        data: transactions,
        meta: {
          total: transactions.length,
          page: params.page || 1,
          limit: params.limit || 10,
        },
      };
    },
  });
}

export function useTransaction(id: string) {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: async (): Promise<Transaction> => {
      const { data } = await apiClient.get(`/transactions/${id}`);
      // La API puede devolver un array o un objeto
      const tx = Array.isArray(data) ? data[0] : data;
      return transformTransaction(tx);
    },
    enabled: !!id,
  });
}
