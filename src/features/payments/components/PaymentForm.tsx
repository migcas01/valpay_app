import { useState } from "react";
import { Button, Card, CardBody, Heading, Text, Callout } from "../../../shared";
import { BankSelector } from "./BankSelector";
import { PaymentSummaryCard } from "./PaymentSummaryCard";
import { useCreatePayment } from "../hooks/useCreatePayment";
import { useCreateTransaction } from "../hooks/useCreateTransaction";
import type { PaymentSummary } from "../types/payment.types";

interface PaymentFormProps {
  invoiceId: string;
  summary: PaymentSummary;
}

const RETURN_URL = `${window.location.origin}/pay/return`;

export function PaymentForm({ invoiceId, summary }: PaymentFormProps) {
  const createPayment = useCreatePayment();
  const createTransaction = useCreateTransaction();
  const [selectedBank, setSelectedBank] = useState("");
  const [error, setError] = useState<string | null>(null);

  const isPending = createPayment.isPending || createTransaction.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const payment = await createPayment.mutateAsync({ invoiceId, method: "pse" })
      .catch(() => null);

    if (!payment) {
      setError("Failed to initiate payment. Please try again.");
      return;
    }

    const transaction = await createTransaction.mutateAsync({
      paymentId: payment.id,
      bankCode: selectedBank,
      returnUrl: RETURN_URL,
    }).catch(() => null);

    if (!transaction?.redirectUrl) {
      setError("Failed to connect to bank portal. Please try again.");
      return;
    }

    window.location.href = transaction.redirectUrl;
  };

  const formattedTotal = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: summary.invoice.currency,
    maximumFractionDigits: 0,
  }).format(summary.total);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <PaymentSummaryCard summary={summary} />

      <Card>
        <CardBody>
          <Heading variant="h4" weight="medium" className="mb-2">
            Complete Payment
          </Heading>
          <Text color="secondary" className="mb-6">
            Select your bank to proceed through PSE (Pago Seguro en Línea).
          </Text>

          {error && (
            <div className="mb-4">
              <Callout type="error" title="Payment error" description={error} />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <BankSelector value={selectedBank} onChange={setSelectedBank} />

            <Button
              type="submit"
              color="primary"
              className="w-full"
              disabled={isPending || !selectedBank}
            >
              {isPending ? "Processing..." : `Pay ${formattedTotal}`}
            </Button>

            <Text variant="small" color="secondary" className="text-center">
              You will be redirected to your bank's secure portal to complete the payment.
            </Text>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
