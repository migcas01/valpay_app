import { apiClient } from "@/lib/axios";
import type {
  Invoice,
  CreateInvoicePayload,
  InvoiceListResponse,
} from "../types";

export async function getInvoice(invoiceId: string) {
  const { data } = await apiClient.get<Invoice>(`invoices/${invoiceId}`);
  return data;
}

export async function listInvoices() {
  const { data } = await apiClient.get<InvoiceListResponse>("invoices/");
  return data;
}

export async function createInvoice(payload: CreateInvoicePayload) {
  const { data } = await apiClient.post("invoices/", payload);
  return data;
}
