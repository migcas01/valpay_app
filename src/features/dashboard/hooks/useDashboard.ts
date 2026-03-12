import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../api/clients";
import type { DashboardData, MaintainerDashboardData } from "../types/dashboard.types";

export function useDashboardAdmin() {
  return useQuery({
    queryKey: ["dashboard", "admin"],
    queryFn: async (): Promise<DashboardData> => {
      const { data } = await apiClient.get("/dashboard");
      return data;
    },
  });
}

export function useDashboardMaintainer() {
  return useQuery({
    queryKey: ["dashboard", "maintainer"],
    queryFn: async (): Promise<MaintainerDashboardData> => {
      const { data } = await apiClient.get("/dashboard/maintainer");
      return data;
    },
  });
}
