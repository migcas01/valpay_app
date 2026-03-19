import { useQuery } from "@tanstack/react-query";
import { listPayments } from "../api/paymentsApi";
import type { PaymentListParams } from "../types";

export function usePayments(params: PaymentListParams = {}) {
  return useQuery({
    queryKey: ["payments", params],
    queryFn: () => listPayments(params),
  });
}
