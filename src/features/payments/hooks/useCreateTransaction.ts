import { useMutation } from "@tanstack/react-query";

interface CreateTransactionPayload {
  paymentId: string;
  bankCode: string;
  returnUrl: string;
}

interface CreateTransactionResponse {
  id: string;
  redirectUrl: string;
}

async function createTransaction(
  payload: CreateTransactionPayload
): Promise<CreateTransactionResponse> {
  const response = await fetch("/api/v1/transactions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create transaction");
  }

  return response.json();
}

export function useCreateTransaction() {
  return useMutation({ mutationFn: createTransaction });
}
