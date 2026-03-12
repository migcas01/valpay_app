import { DollarSign, Clock, XCircle, FileText } from "lucide-react";
import { Spinner, Link, Heading } from "../../../shared";
import { StatsCard } from "./StatsCard";
import { TransactionList } from "../../transactions";
import { formatCurrency } from "../../../utils";
import type { DashboardData, DashboardStats } from "../types/dashboard.types";
import type { StatsCardConfig } from "./StatsCard";

function buildStatsConfig(
  stats: DashboardStats,
  currency: string,
): StatsCardConfig[] {
  return [
    {
      title: "Total Collected",
      value: formatCurrency(stats.totalCollected, currency),
      icon: DollarSign,
      color: "success",
    },
    {
      title: "Pending Payments",
      value: formatCurrency(stats.totalPending, currency),
      icon: Clock,
      color: "warning",
    },
    {
      title: "Failed Transactions",
      value: formatCurrency(stats.totalFailed, currency),
      icon: XCircle,
      color: "danger",
    },
    {
      title: "Total Invoices",
      value: stats.invoiceCount.toString(),
      icon: FileText,
      color: "primary",
    },
  ];
}

interface DashboardAdminProps {
  data?: DashboardData;
  isLoading?: boolean;
}

export function DashboardAdmin({ data, isLoading }: DashboardAdminProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner text="Loading dashboard..." size="medium" color="primary" />
      </div>
    );
  }

  if (!data) return null;

  const statsConfig = buildStatsConfig(data.stats, data.stats.currency);

  const recentTransactions = data.recentTransactions.map((t) => ({
    id: t.id,
    paymentId: "",
    provider: "pse" as const,
    status: t.status,
    amount: t.amount,
    currency: t.currency,
    createdAt: t.createdAt,
    updatedAt: t.createdAt,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsConfig.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <Heading variant="h4" weight="bold">
            Recent Transactions
          </Heading>
          <Link to="/transactions" underline="none" weight="medium">
            View all
          </Link>
        </div>
        <TransactionList transactions={recentTransactions} />
      </div>
    </div>
  );
}
