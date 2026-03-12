import { DollarSign, Clock, XCircle, ArrowLeftRight, Building2, Users } from "lucide-react";
import { Spinner, Link, Heading } from "../../../shared";
import { StatsCard } from "./StatsCard";
import { TransactionList } from "../../transactions";
import type { MaintainerDashboardData, MaintainerDashboardStats } from "../types/dashboard.types";
import type { StatsCardConfig } from "./StatsCard";

function buildStatsConfig(stats: MaintainerDashboardStats, currency: string): StatsCardConfig[] {
  const format = (amount: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);

  return [
    { title: "Total Volume", value: format(stats.totalVolume), icon: DollarSign, color: "success" },
    { title: "Pending Volume", value: format(stats.totalPending), icon: Clock, color: "warning" },
    { title: "Failed Transactions", value: stats.failedCount.toString(), icon: XCircle, color: "danger" },
    { title: "Total Transactions", value: stats.transactionCount.toString(), icon: ArrowLeftRight, color: "primary" },
    { title: "Active Commerces", value: stats.commerceCount.toString(), icon: Building2, color: "primary" },
    { title: "Administrators", value: stats.adminCount.toString(), icon: Users, color: "primary" },
  ];
}

interface DashboardMaintainerProps {
  data?: MaintainerDashboardData;
  isLoading?: boolean;
}

export function DashboardMaintainer({ data, isLoading }: DashboardMaintainerProps) {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
