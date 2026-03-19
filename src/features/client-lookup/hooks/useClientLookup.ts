import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import type { ClientLookupParams } from "../types/client-lookup.types";
import type { PaymentListResponse } from "../../payments/types";

async function fetchPayments(params: ClientLookupParams): Promise<PaymentListResponse> {
  const { data } = await apiClient.get<PaymentListResponse>("/payments", {
    params: {
      documentType: params.documentType,
      documentNumber: params.documentNumber,
    },
  });
  return data;
}

export function useClientLookup(params: ClientLookupParams) {
  return useQuery({
    queryKey: ["payments", "lookup", params.documentType, params.documentNumber],
    queryFn: () => fetchPayments(params),
    enabled: !!params.documentNumber,
  });
}
