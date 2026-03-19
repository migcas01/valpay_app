import { useQuery } from "@tanstack/react-query";
import { getPseBanks } from "../api/paymentsApi";
import type { BankOption } from "../types";

export function usePseBanks() {
  return useQuery({
    queryKey: ["pse-banks"],
    queryFn: getPseBanks,
    staleTime: 10 * 60 * 60 * 1000, // 10 hours — banks rarely change
    select: (banks): BankOption[] =>
      banks.map((bank) => ({ value: bank.code, label: bank.name })),
  });
}
