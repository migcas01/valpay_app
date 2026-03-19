import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInvoice } from "../api/invoicesApi";
import type { CreateInvoicePayload } from "../types";

export function useCreateInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateInvoicePayload) => createInvoice(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
}
