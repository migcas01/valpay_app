import { Chip } from "../../../shared";
import type { TransactionStatus } from "../types/transaction.types";

interface TransactionStatusBadgeProps extends ChipProps {
  status: TransactionStatus;
}

const statusConfig = {
  pending: {
    color: "warning",
    label: "Pending",
  },
  completed: {
    color: "success",
    label: "Completed",
  },
  failed: {
    color: "danger",
    label: "Failed",
  },
} as const;

export function TransactionStatusBadge({
  status,
}: TransactionStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Chip color={config.color}>
      <div>{config.label}</div>
    </Chip>
  );
}
