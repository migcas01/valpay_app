import { useQuery } from "@tanstack/react-query";
import type { ClientLookupParams, ClientLookupResponse } from "../types/client-lookup.types";

const API_BASE = "http://localhost:3000/api/v1";

async function fetchInvoices(
  params: ClientLookupParams
): Promise<ClientLookupResponse> {
  const queryString = new URLSearchParams({
    documentType: params.documentType,
    documentNumber: params.documentNumber,
  }).toString();

  const response = await fetch(`${API_BASE}/invoices?${queryString}`);

  if (!response.ok) {
    throw new Error("Failed to fetch invoices");
  }

  return response.json();
}

export function useClientLookup(params: ClientLookupParams) {
  return useQuery({
    queryKey: ["invoices", params.documentType, params.documentNumber],
    queryFn: () => fetchInvoices(params),
    enabled: !!params.documentNumber,
  });
}
