import { DollarSign, Clock, XCircle, FileText } from "lucide-react";
import { Spinner, Link } from "../../../shared";
import { StatsCard } from "./StatsCard";
import { TransactionList } from "../../transactions";
import type { DashboardData } from "../types/dashboard.types";

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

  if (!data) {
    return null;
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const stats = [
    {
      title: "Total Collected",
      value: formatCurrency(data.stats.totalCollected, data.stats.currency),
      icon: DollarSign,
      color: "success" as const,
    },
    {
      title: "Pending Payments",
      value: formatCurrency(data.stats.totalPending, data.stats.currency),
      icon: Clock,
      color: "warning" as const,
    },
    {
      title: "Failed Transactions",
      value: formatCurrency(data.stats.totalFailed, data.stats.currency),
      icon: XCircle,
      color: "danger" as const,
    },
    {
      title: "Total Invoices",
      value: data.stats.invoiceCount.toString(),
      icon: FileText,
      color: "primary" as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
          <Link
            to="/transactions"
            className="text-amber-600 hover:text-amber-700 text-sm font-medium"
          >
            View all
          </Link>
        </div>
        <TransactionList
          transactions={data.recentTransactions.map((t) => ({
            id: t.id,
            paymentId: "",
            provider: "pse",
            status: t.status,
            amount: t.amount,
            currency: t.currency,
            createdAt: t.createdAt,
            updatedAt: t.createdAt,
          }))}
        />
      </div>
    </div>
  );
}
