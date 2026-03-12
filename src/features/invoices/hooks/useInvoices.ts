import { useQuery } from "@tanstack/react-query";
import type { Invoice, InvoiceListResponse } from "../types/invoice.types";

const API_BASE = "http://localhost:3000/api/v1";

interface UseInvoicesParams {
  page?: number;
  limit?: number;
  status?: string;
}

// Transformar respuesta de la API al formato del frontend
function transformInvoice(apiInvoice: Record<string, unknown>): Invoice {
  const metadata = (apiInvoice.metadata as Record<string, unknown>) || {};
  
  return {
    id: String(apiInvoice.id),
    externalId: String(apiInvoice.externalId || ""),
    subject: String(apiInvoice.subject || ""),
    metadata: metadata,
    amount: Number(metadata.amount) || 0,
    currency: String(metadata.currency) || "COP",
    receiverName: String(metadata.receiverName || ""),
    receiverId: String(metadata.receiverId || ""),
    senderDocument: String(metadata.senderDocument || ""),
    senderName: String(metadata.senderName || ""),
    senderEmail: metadata.senderEmail ? String(metadata.senderEmail) : undefined,
    senderPhone: metadata.senderPhone ? String(metadata.senderPhone) : undefined,
    status: "pending" as const,
    paymentId: undefined,
    createdAt: String(apiInvoice.createdAt || ""),
    updatedAt: String(apiInvoice.updatedAt || ""),
  };
}

async function fetchInvoices(
  params: UseInvoicesParams = {}
): Promise<InvoiceListResponse> {
  const searchParams = new URLSearchParams();
  
  if (params.page) searchParams.set("page", params.page.toString());
  if (params.limit) searchParams.set("limit", params.limit.toString());
  if (params.status) searchParams.set("status", params.status);

  const response = await fetch(`${API_BASE}/invoices?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch invoices");
  }

  const data = await response.json();
  
  // La API retorna un array directo, transformar cada invoice
  const invoices = (Array.isArray(data) ? data : data.data || []).map(transformInvoice);
  
  return {
    data: invoices,
    meta: {
      total: invoices.length,
      page: params.page || 1,
      limit: params.limit || 10,
    },
  };
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
      const response = await fetch(`${API_BASE}/invoices/${id}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch invoice");
      }
      
      const data = await response.json();
      return transformInvoice(data);
    },
    enabled: !!id,
  });
}
