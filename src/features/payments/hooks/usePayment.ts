import { useQuery } from "@tanstack/react-query";
import { getPayment } from "../api/paymentsApi";

export function usePayment(paymentId: number) {
  return useQuery({
    queryKey: ["payments", paymentId],
    queryFn: () => getPayment(paymentId),
    enabled: !!paymentId,
  });
}
