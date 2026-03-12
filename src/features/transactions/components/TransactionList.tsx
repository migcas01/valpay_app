import { ArrowLeftRight } from "lucide-react";
import { Spinner, EmptyState, Link } from "../../../shared";
import { TransactionStatusBadge } from "./TransactionStatusBadge";
import type { Transaction } from "../types/transaction.types";

interface TransactionListProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

export function TransactionList({ transactions, isLoading }: TransactionListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner text="Loading transactions..." size="medium" color="primary" />
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <EmptyState
        icon={ArrowLeftRight}
        title="No transactions found"
        description="Transactions will appear here once payments are initiated"
      />
    );
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
              Transaction ID
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
              Date
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
              Provider
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
              Bank
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
              Amount
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
              Status
            </th>
            <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              className="border-b border-gray-100 hover:bg-gray-50"
            >
              <td className="py-3 px-4 text-sm font-mono">
                {transaction.id.slice(0, 8)}...
              </td>
              <td className="py-3 px-4 text-sm text-gray-600">
                {formatDate(transaction.createdAt)}
              </td>
              <td className="py-3 px-4 text-sm capitalize">
                {transaction.provider}
              </td>
              <td className="py-3 px-4 text-sm">
                {transaction.bankName || "-"}
              </td>
              <td className="py-3 px-4 text-sm font-medium">
                {formatCurrency(transaction.amount, transaction.currency)}
              </td>
              <td className="py-3 px-4">
                <TransactionStatusBadge status={transaction.status} />
              </td>
              <td className="py-3 px-4 text-right">
                <Link
                  to={`/transactions/${transaction.id}`}
                  className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
