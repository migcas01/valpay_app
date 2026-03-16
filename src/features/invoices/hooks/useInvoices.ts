import { useQuery } from "@tanstack/react-query";
import { listInvoices } from "../api/invoicesApi";

interface UseInvoicesParams {
  page?: number;
  limit?: number;
  sort?: "created_at" | "updated_at";
  order?: "DESC" | "ASC";
  search?: string;
}

export function useInvoices(params: UseInvoicesParams = {}) {
  return useQuery({
    queryKey: ["invoices", params],
    queryFn: listInvoices,
  });
}
