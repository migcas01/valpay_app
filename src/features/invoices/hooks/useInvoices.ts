import { useQuery } from "@tanstack/react-query";
import type { Invoice, InvoiceListResponse } from "../types/invoice.types";

interface UseInvoicesParams {
  page?: number;
  limit?: number;
  status?: string;
}

async function fetchInvoices(
  params: UseInvoicesParams = {}
): Promise<InvoiceListResponse> {
  const searchParams = new URLSearchParams();
  
  if (params.page) searchParams.set("page", params.page.toString());
  if (params.limit) searchParams.set("limit", params.limit.toString());
  if (params.status) searchParams.set("status", params.status);

  const response = await fetch(`/api/v1/invoices?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch invoices");
  }

  return response.json();
}

export function useInvoices(params: UseInvoicesParams = {}) {
  return useQuery({
    queryKey: ["invoices", params],
    queryFn: () => fetchInvoices(params),
  });
}

export function useInvoice(id: string) {
  return useQuery({
    queryKey: ["invoice", id],
    queryFn: async (): Promise<Invoice> => {
      const response = await fetch(`/api/v1/invoices/${id}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch invoice");
      }
      
      return response.json();
    },
    enabled: !!id,
  });
}
