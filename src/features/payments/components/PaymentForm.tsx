import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Card, CardBody, Heading, Text } from "../../../shared";
import { BankSelector } from "./BankSelector";
import { PaymentSummaryCard } from "./PaymentSummaryCard";
import { useCreatePayment } from "../hooks/useCreatePayment";
import type { PaymentSummary } from "../types/payment.types";

interface PaymentFormProps {
  invoiceId: string;
  summary: PaymentSummary;
}

export function PaymentForm({ invoiceId, summary }: PaymentFormProps) {
  const navigate = useNavigate();
  const createPayment = useCreatePayment();
  const [selectedBank, setSelectedBank] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedBank) {
      setError("Please select a bank");
      return;
    }

    try {
      const payment = await createPayment.mutateAsync({
        invoiceId,
        method: "pse",
      });

      const response = await fetch("/api/v1/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentId: payment.id,
          bankCode: selectedBank,
          returnUrl: `${window.location.origin}/pay/return`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create transaction");
      }

      const { redirectUrl } = await response.json();
      
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <PaymentSummaryCard summary={summary} />

      <Card>
        <CardBody>
          <Heading variant="h3" weight="medium" className="mb-4">
            Complete Payment
          </Heading>

          <Text color="secondary" className="mb-6">
            Select your bank to proceed with the payment through PSE (Pago Seguro
            en Línea).
          </Text>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <BankSelector
              value={selectedBank}
              onChange={setSelectedBank}
              error={!selectedBank && error ? "Please select a bank" : undefined}
            />

            <Button
              type="submit"
              color="primary"
              className="w-full"
              disabled={createPayment.isPending || !selectedBank}
            >
              {createPayment.isPending
                ? "Processing..."
                : `Pay ${summary.invoice.currency} ${summary.total}`}
            </Button>

            <Text variant="small" color="secondary" className="text-center">
              You will be redirected to your bank&apos;s secure portal to complete
              the payment.
            </Text>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
