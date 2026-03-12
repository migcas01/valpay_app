import { Chip } from "../../../shared";
import type { TransactionStatus } from "../types/transaction.types";

interface TransactionStatusBadgeProps {
  status: TransactionStatus;
}

const statusConfig: Record<TransactionStatus, { color: "warning" | "success" | "danger"; label: string }> = {
  pending: { color: "warning", label: "Pending" },
  completed: { color: "success", label: "Completed" },
  failed: { color: "danger", label: "Failed" },
};

export function TransactionStatusBadge({ status }: TransactionStatusBadgeProps) {
  const { color, label } = statusConfig[status];

  return <Chip color={color}>{label}</Chip>;
}
