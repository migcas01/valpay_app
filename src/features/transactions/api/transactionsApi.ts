import { apiClient } from "@/lib/axios";
import type { Transaction, TransactionListResponse } from "../types/transaction.types";

interface ListTransactionsParams {
  page?: number;
  limit?: number;
  status?: string;
}

export async function listTransactions(
  params: ListTransactionsParams = {}
): Promise<TransactionListResponse> {
  const { data } = await apiClient.get("/transactions/", { params });

  const raw: Record<string, unknown>[] = Array.isArray(data)
    ? data
    : data.data ?? [];

  const transactions = raw.map(transformTransaction);

  return {
    data: transactions,
    meta: {
      total: transactions.length,
      page: params.page ?? 1,
      limit: params.limit ?? 10,
    },
  };
}

export async function getTransaction(id: string): Promise<Transaction> {
  const { data } = await apiClient.get(`/transactions/${id}`);
  const tx = Array.isArray(data) ? data[0] : data;
  return transformTransaction(tx);
}

function transformTransaction(apiTx: Record<string, unknown>): Transaction {
  const statusObj = apiTx.TransactionStatus as Record<string, unknown> | undefined;
  const providerObj = apiTx.Provider as Record<string, unknown> | undefined;
  const statusCode = statusObj?.code as string | undefined;

  let status: "pending" | "completed" | "failed" = "pending";
  if (statusCode === "SUCCESS" || statusCode === "AUTHORIZED") status = "completed";
  else if (statusCode === "FAILED" || statusCode === "NOT_AUTHORIZED") status = "failed";

  return {
    id: String(apiTx.id),
    paymentId: String(apiTx.invoiceId),
    externalId: apiTx.externalId ? String(apiTx.externalId) : undefined,
    provider:
      ((providerObj?.code as string)?.toLowerCase() as "pse" | "card" | "cash") || "pse",
    status,
    amount: Number(apiTx.amount) || 0,
    currency: "COP",
    createdAt: String(apiTx.createdAt || ""),
    updatedAt: String(apiTx.updatedAt || ""),
  };
}
