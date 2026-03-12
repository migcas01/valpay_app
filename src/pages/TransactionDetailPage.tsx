import { useParams } from "react-router";
import { Link, Spinner, Callout } from "../shared";
import { TransactionStatusCard, useTransaction } from "../features/transactions";

export function TransactionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: transaction, isLoading, error } = useTransaction(id ?? "");

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="medium" color="primary" text="Loading transaction..." />
      </div>
    );
  }

  if (error || !transaction) {
    return (
      <div className="space-y-4">
        <Callout
          type="error"
          title="Not found"
          description={error instanceof Error ? error.message : "Transaction not found"}
        />
        <Link to="/transactions">Back to transactions</Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-lg">
      <Link to="/transactions" color="secondary" weight="medium">
        Back to transactions
      </Link>
      <TransactionStatusCard transactionId={transaction.id} initialTransaction={transaction} />
    </div>
  );
}
