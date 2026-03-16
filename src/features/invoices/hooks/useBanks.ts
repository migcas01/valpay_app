import { useQuery } from "@tanstack/react-query";
import { getBanks } from "../api/paymentsApi"
import type { BankResponse } from "../../payments/types"

export function useBanks() {
  return useQuery({
    queryKey: ["pse-banks"],
    queryFn: getBanks,
    staleTime: 10 * 60 * 60 * 1000, // 10 hours as per spec,
    select: (data: BankResponse) => data.map((bank) => ({ value: bank.code, label: bank.name })),
  });
}
