import { ArrowLeftRight } from "lucide-react";
import { Spinner, EmptyState, Link } from "../../../shared";
import { TransactionStatusBadge } from "./TransactionStatusBadge";
import type { Transaction } from "../types/transaction.types";

interface TransactionListProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

const formatCurrency = (amount: number, currency: string) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency }).format(amount);

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const TH = ({ children, right = false }: { children: React.ReactNode; right?: boolean }) => (
  <th className={`py-3 px-4 text-sm font-medium text-gray-600 ${right ? "text-right" : "text-left"}`}>
    {children}
  </th>
);

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

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <TH>Transaction ID</TH>
            <TH>Date</TH>
            <TH>Provider</TH>
            <TH>Bank</TH>
            <TH>Amount</TH>
            <TH>Status</TH>
            <TH right>Actions</TH>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-b border-gray-100">
              <td className="py-3 px-4 text-sm font-mono text-gray-700">
                {transaction.id.slice(0, 8)}...
              </td>
              <td className="py-3 px-4 text-sm text-gray-600">
                {formatDate(transaction.createdAt)}
              </td>
              <td className="py-3 px-4 text-sm text-gray-700 capitalize">
                {transaction.provider}
              </td>
              <td className="py-3 px-4 text-sm text-gray-700">
                {transaction.bankName ?? "-"}
              </td>
              <td className="py-3 px-4 text-sm font-medium text-gray-900">
                {formatCurrency(transaction.amount, transaction.currency)}
              </td>
              <td className="py-3 px-4">
                <TransactionStatusBadge status={transaction.status} />
              </td>
              <td className="py-3 px-4 text-right">
                <Link to={`/transactions/${transaction.id}`} underline="none" weight="medium">
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
