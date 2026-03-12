import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateInvoicePayload, Invoice } from "../types/invoice.types";

const API_BASE = "http://localhost:3000/api/v1";

async function createInvoice(
  payload: CreateInvoicePayload
): Promise<Invoice> {
  // Transformar formato frontend al formato de la API
  const apiPayload = {
    externalId: `INV-${Date.now()}`,
    subject: payload.description,
    amount: payload.amount,
    currencyCode: payload.currency,
    metadata: {
      receiverId: payload.receiverId,
      senderDocument: payload.senderDocument,
      senderName: payload.senderName,
      senderEmail: payload.senderEmail,
      senderPhone: payload.senderPhone,
    },
  };

  const response = await fetch(`${API_BASE}/invoices`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(apiPayload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create invoice");
  }

  return response.json();
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
