export interface DashboardStats {
  totalCollected: number;
  totalPending: number;
  totalFailed: number;
  transactionCount: number;
  invoiceCount: number;
  currency: string;
}

export interface RecentTransaction {
  id: string;
  externalReference: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  createdAt: string;
}

export interface DashboardData {
  stats: DashboardStats;
  recentTransactions: RecentTransaction[];
}

export interface MaintainerDashboardStats {
  totalVolume: number;
  totalPending: number;
  failedCount: number;
  transactionCount: number;
  commerceCount: number;
  adminCount: number;
  currency: string;
}

export interface MaintainerDashboardData {
  stats: MaintainerDashboardStats;
  recentTransactions: RecentTransaction[];
}
