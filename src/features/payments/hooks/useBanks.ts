import { useQuery } from "@tanstack/react-query";
import type { PseBank, PseBankListResponse } from "../types/bank.types";

async function fetchBanks(): Promise<PseBankListResponse> {
  const response = await fetch("/api/v1/pse-banks");

  if (!response.ok) {
    throw new Error("Failed to fetch banks");
  }

  return response.json();
}

export function useBanks() {
  return useQuery({
    queryKey: ["pse-banks"],
    queryFn: fetchBanks,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours as per spec
  });
}
