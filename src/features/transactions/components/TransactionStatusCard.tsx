import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { Card, CardBody, Heading, Text, Spinner, Divider } from "../../../shared";
import { TransactionStatusBadge } from "./TransactionStatusBadge";
import { useConfirmTransaction } from "../hooks/useConfirmTransaction";
import { useTransactionEvents } from "../hooks/useTransactionEvents";
import type { Transaction, TransactionStatus } from "../types/transaction.types";
import type { ConfirmStatusCode } from "../../payments/types";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";

interface TransactionStatusCardProps {
  transactionId: string;
  initialTransaction?: Transaction;
}

const statusConfig: Record<TransactionStatus, {
  icon: React.ElementType;
  iconColor: string;
  bgColor: string;
  title: string;
  defaultMessage: string;
}> = {
  pending: {
    icon: Clock,
    iconColor: "text-yellow-600",
    bgColor: "bg-yellow-50",
    title: "Processing Payment",
    defaultMessage: "Your payment is being processed. Please wait...",
  },
  completed: {
    icon: CheckCircle,
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
    title: "Payment Successful",
    defaultMessage: "Your payment has been completed successfully!",
  },
  failed: {
    icon: XCircle,
    iconColor: "text-red-600",
    bgColor: "bg-red-50",
    title: "Payment Failed",
    defaultMessage: "Your payment has failed. Please try again or contact support.",
  },
};

function toLocalStatus(code: ConfirmStatusCode): TransactionStatus {
  if (code === "SUCCESS" || code === "AUTHORIZED") return "completed";
  if (code === "FAILED" || code === "NOT_AUTHORIZED" || code === "VOIDED") return "failed";
  return "pending";
}

export function TransactionStatusCard({
  transactionId,
  initialTransaction,
}: TransactionStatusCardProps) {
  const [localStatus, setLocalStatus] = useState<TransactionStatus>(
    initialTransaction?.status ?? "pending"
  );
  const [sseMessage, setSseMessage] = useState("");

  const { data: confirmData, isLoading: isConfirming } =
    useConfirmTransaction(transactionId);

  useEffect(() => {
    if (confirmData?.status) {
      setLocalStatus(toLocalStatus(confirmData.status));
    }
  }, [confirmData]);

  useTransactionEvents({
    transactionId,
    onStatusChange: (status, msg) => {
      setLocalStatus(status);
      setSseMessage(msg);
    },
    enabled: localStatus === "pending",
  });

  if (isConfirming) {
    return (
      <Card>
        <CardBody>
          <div className="flex flex-col items-center justify-center py-12">
            <Spinner text="Confirming transaction..." size="medium" color="primary" />
          </div>
        </CardBody>
      </Card>
    );
  }

  const transaction = initialTransaction;
  const { icon: StatusIcon, iconColor, bgColor, title, defaultMessage } =
    statusConfig[localStatus];

  return (
    <Card>
      <CardBody>
        <div className="flex flex-col items-center text-center py-8 gap-4">
          <div className={`p-6 rounded-full ${bgColor}`}>
            <StatusIcon className={`h-14 w-14 ${iconColor}`} />
          </div>

          <TransactionStatusBadge status={localStatus} />

          <Heading variant="h3" weight="bold">
            {title}
          </Heading>

          <Text color="secondary" className="max-w-md">
            {sseMessage || defaultMessage}
          </Text>

          {transaction && (
            <div className="w-full max-w-sm mt-4">
              <Divider />
              <div className="pt-4 space-y-3">
                <div className="flex justify-between">
                  <Text variant="small" color="secondary">Transaction ID</Text>
                  <Text variant="small" className="font-mono">
                    {transaction.id.slice(0, 8)}...
                  </Text>
                </div>
                <div className="flex justify-between">
                  <Text variant="small" color="secondary">Amount</Text>
                  <Text weight="medium">
                    {formatCurrency(transaction.amount, transaction.currency)}
                  </Text>
                </div>
                {transaction.bankName && (
                  <div className="flex justify-between">
                    <Text variant="small" color="secondary">Bank</Text>
                    <Text weight="medium">{transaction.bankName}</Text>
                  </div>
                )}
                <div className="flex justify-between">
                  <Text variant="small" color="secondary">Date</Text>
                  <Text variant="small">{formatDate(transaction.createdAt)}</Text>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
