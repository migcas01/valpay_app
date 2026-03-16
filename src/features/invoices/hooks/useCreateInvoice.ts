import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import type { CreateInvoicePayload, Invoice } from "../types";

interface CreateInvoiceApiPayload {
  externalId: string;
  subject: string;
  amount: number;
  currencyCode: string;
  metadata: Record<string, unknown>;
}

async function createInvoice(payload: CreateInvoicePayload): Promise<Invoice> {
  const apiPayload: CreateInvoiceApiPayload = {
    externalId: `INV-${Date.now()}`,
    subject: payload.description,
    amount: payload.amount,
    currencyCode: payload.currency,
    metadata: payload.metadata,
  };

  const { data } = await apiClient.post<Invoice>("invoices/", apiPayload);
  return data;
}

export function useCreateInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
}
