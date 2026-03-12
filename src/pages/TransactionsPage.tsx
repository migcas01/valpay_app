import { Heading } from "../shared";
import { TransactionList, useTransactions } from "../features/transactions";

export function TransactionsPage() {
  const { data, isLoading } = useTransactions();

  return (
    <div className="space-y-6">
      <Heading variant="h3" weight="bold">
        Transactions
      </Heading>
      <TransactionList
        transactions={data?.data ?? []}
        isLoading={isLoading}
      />
    </div>
  );
}
