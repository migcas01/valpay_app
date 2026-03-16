import { useQuery } from "@tanstack/react-query";
import { getInvoice } from "../api/invoicesApi";

export function useInvoice(id: string) {
  return useQuery({
    queryKey: ["invoices", id],
    queryFn: () => getInvoice(id),
  });
}
