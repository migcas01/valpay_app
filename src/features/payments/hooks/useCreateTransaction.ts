import { useMutation } from "@tanstack/react-query";

const API_BASE = "http://localhost:3000/api/v1";

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
  // Transformar al formato de la API /transactions/intent
  const apiPayload = {
    paymentId: Number(payload.paymentId),
    providerCode: "PSE",
    amount: 2500000,
    identificationType: "CC",
    identificationNumber: "1234567890",
    bankCode: payload.bankCode,
    fullName: "Cliente Test",
    email: "cliente@test.com",
    phoneNumber: "3001234567",
    address: "Calle 123 # 45-67",
  };

  const response = await fetch(`${API_BASE}/transactions/intent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(apiPayload),
  });

  if (!response.ok) {
    throw new Error("Failed to create transaction");
  }

  const data = await response.json();
  
  // Transformar respuesta al formato que espera el frontend
  return {
    id: String(data.transactionId),
    redirectUrl: data.gatewayUrl,
  };
}

export function useCreateTransaction() {
  return useMutation({ mutationFn: createTransaction });
}
