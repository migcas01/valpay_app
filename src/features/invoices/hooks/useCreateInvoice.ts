import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateInvoicePayload, Invoice } from "../types/invoice.types";

async function createInvoice(
  payload: CreateInvoicePayload
): Promise<Invoice> {
  const response = await fetch("/api/v1/invoices", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create invoice");
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
