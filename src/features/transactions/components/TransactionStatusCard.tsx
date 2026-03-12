import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Clock, Loader2 } from "lucide-react";
import { Card, CardBody, Heading, Text, Spinner } from "../../../shared";
import { TransactionStatusBadge } from "./TransactionStatusBadge";
import { useConfirmTransaction } from "../hooks/useConfirmTransaction";
import { useTransactionEvents } from "../hooks/useTransactionEvents";
import type { Transaction, TransactionStatus } from "../types/transaction.types";

interface TransactionStatusCardProps {
  transactionId: string;
  initialTransaction?: Transaction;
}

const statusIcons = {
  pending: Clock,
  completed: CheckCircle,
  failed: XCircle,
};

const statusColors = {
  pending: "text-yellow-600",
  completed: "text-emerald-600",
  failed: "text-red-600",
};

const statusMessages = {
  pending: "Your payment is being processed. Please wait...",
  completed: "Your payment has been completed successfully!",
  failed: "Your payment has failed. Please try again or contact support.",
};

export function TransactionStatusCard({
  transactionId,
  initialTransaction,
}: TransactionStatusCardProps) {
  const [localStatus, setLocalStatus] = useState<TransactionStatus>(
    initialTransaction?.status || "pending"
  );
  const [message, setMessage] = useState<string>("");

  const { data: confirmedTransaction, isLoading: isConfirming } =
    useConfirmTransaction(transactionId);

  useEffect(() => {
    if (confirmedTransaction) {
      setLocalStatus(confirmedTransaction.status);
    }
  }, [confirmedTransaction]);

  useTransactionEvents({
    transactionId,
    onStatusChange: (status, msg) => {
      setLocalStatus(status);
      setMessage(msg);
    },
    enabled: localStatus === "pending",
  });

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const transaction = confirmedTransaction || initialTransaction;
  const StatusIcon = statusIcons[localStatus];

  if (isConfirming) {
    return (
      <Card>
        <CardBody>
          <div className="flex flex-col items-center justify-center py-12">
            <Spinner
              text="Confirming transaction..."
              size="medium"
              color="primary"
            />
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardBody>
        <div className="flex flex-col items-center text-center py-8">
          <div
            className={`mb-6 p-6 rounded-full ${
              localStatus === "pending"
                ? "bg-yellow-50"
                : localStatus === "completed"
                  ? "bg-emerald-50"
                  : "bg-red-50"
            }`}
          >
            {localStatus === "pending" ? (
              <Loader2
                className={`h-16 w-16 ${statusColors[localStatus]} animate-spin`}
              />
            ) : (
              <StatusIcon
                className={`h-16 w-16 ${statusColors[localStatus]}`}
              />
            )}
          </div>

          <TransactionStatusBadge status={localStatus} />

          <Heading variant="h3" weight="bold" className="mt-4">
            {localStatus === "pending"
              ? "Processing Payment"
              : localStatus === "completed"
                ? "Payment Successful"
                : "Payment Failed"}
          </Heading>

          <Text color="secondary" className="mt-2 max-w-md">
            {message || statusMessages[localStatus]}
          </Text>

          {transaction && (
            <div className="mt-8 w-full max-w-sm">
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between">
                  <Text variant="small" color="secondary">
                    Transaction ID
                  </Text>
                  <Text variant="small" className="font-mono">
                    {transaction.id.slice(0, 8)}...
                  </Text>
                </div>
                <div className="flex justify-between">
                  <Text variant="small" color="secondary">
                    Amount
                  </Text>
                  <Text weight="medium">
                    {formatCurrency(transaction.amount, transaction.currency)}
                  </Text>
                </div>
                {transaction.bankName && (
                  <div className="flex justify-between">
                    <Text variant="small" color="secondary">
                      Bank
                    </Text>
                    <Text weight="medium">{transaction.bankName}</Text>
                  </div>
                )}
                <div className="flex justify-between">
                  <Text variant="small" color="secondary">
                    Date
                  </Text>
                  <Text variant="small">
                    {formatDate(transaction.createdAt)}
                  </Text>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
