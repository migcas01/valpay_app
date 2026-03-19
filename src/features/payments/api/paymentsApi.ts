import { apiClient } from "@/lib/axios";
import type {
  Payment,
  PaymentListParams,
  PaymentListResponse,
  CreatePaymentPayload,
  PseBanksResponse,
  TransactionIntentPayload,
  TransactionIntentResponse,
  ConfirmTransactionResponse,
} from "../types";

export async function getPayment(paymentId: number): Promise<Payment> {
  const { data } = await apiClient.get<Payment>(`/payments/${paymentId}`);
  return data;
}

export async function listPayments(
  params: PaymentListParams = {}
): Promise<PaymentListResponse> {
  const { data } = await apiClient.get<PaymentListResponse>("/payments", {
    params,
  });
  return data;
}

export async function createPayment(
  payload: CreatePaymentPayload
): Promise<Payment> {
  const { data } = await apiClient.post<Payment>("/payments", payload);
  return data;
}

export async function getPseBanks(): Promise<PseBanksResponse> {
  const { data } = await apiClient.get<PseBanksResponse>("/pse-banks");
  return data;
}

export async function createTransactionIntent(
  payload: TransactionIntentPayload
): Promise<TransactionIntentResponse> {
  const { data } = await apiClient.post<TransactionIntentResponse>(
    "/transactions/intent",
    payload
  );
  return data;
}

export async function confirmTransaction(
  transactionId: number
): Promise<ConfirmTransactionResponse> {
  const { data } = await apiClient.get<ConfirmTransactionResponse>(
    `/transactions/${transactionId}/confirm`
  );
  return data;
}
