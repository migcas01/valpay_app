import { useQuery } from "@tanstack/react-query";
import type { ClientLookupParams, ClientLookupResponse } from "../types/client-lookup.types";

async function fetchInvoices(
  params: ClientLookupParams
): Promise<ClientLookupResponse> {
  const queryString = new URLSearchParams({
    documentType: params.documentType,
    documentNumber: params.documentNumber,
  }).toString();

  const response = await fetch(`/api/v1/invoices?${queryString}`);

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
