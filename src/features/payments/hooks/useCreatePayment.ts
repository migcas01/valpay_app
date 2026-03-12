import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Payment, CreatePaymentPayload } from "../types/payment.types";

const API_BASE = "http://localhost:3000/api/v1";

async function createPayment(payload: CreatePaymentPayload): Promise<Payment> {
  // Transformar al formato de la API
  const apiPayload = {
    invoiceId: Number(payload.invoiceId),
    currencyCode: "COP",
    amount: 2500000, // Por ahora hardcodeado, después se obtiene de la invoice
  };

  const response = await fetch(`${API_BASE}/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(apiPayload),
  });

  if (!response.ok) {
    throw new Error("Failed to create payment");
  }

  return response.json();
}

export function useCreatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
}
