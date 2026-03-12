import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Payment, CreatePaymentPayload } from "../types/payment.types";

async function createPayment(payload: CreatePaymentPayload): Promise<Payment> {
  const response = await fetch("/api/v1/payments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
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
