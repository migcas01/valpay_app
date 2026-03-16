import { apiClient } from "@/lib/axios";
import type { CreateIntentPayload, CreateIntentResponse, BankResponse } from "../../payments/types";

export async function createPaymentIntent(payload: CreateIntentPayload) {
  const { data } = await apiClient.post<CreateIntentResponse>("transactions/intent/", payload);
  return data;
}

export async function getBanks() {
  const { data } = await apiClient.get<BankResponse>("pse-banks/");
  return data;
}
