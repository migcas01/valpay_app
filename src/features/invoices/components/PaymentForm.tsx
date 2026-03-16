import { useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button, Card, CardBody, Heading, Text, Callout } from "@/shared";
import { BankSelector } from "./BankSelector";
import { PaymentSummaryCard } from "./PaymentSummaryCard";
import { useCreatePayment } from "../hooks/useCreatePayment";
import { useCreateTransaction } from "../hooks/useCreateTransaction";
import { formatCurrency } from "@/utils/formatCurrency";
import type { Invoice, BankOption } from "../types";

const RETURN_URL = `${window.location.origin}/pay/return`;

interface PaymentFormProps {
  invoice: Invoice;
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" color="primary" className="w-full" disabled={pending}>
      {pending ? "Processing..." : label}
    </Button>
  );
}

export function PaymentForm({ invoice }: PaymentFormProps) {
  const createPayment = useCreatePayment();
  const createTransaction = useCreateTransaction();
  const [selectedBank, setSelectedBank] = useState<BankOption | null>(null);

  const [error, formAction] = useActionState(
    async (_: string | null) => {
      const payment = await createPayment.mutateAsync({
        invoiceId: invoice.id,
        method: "pse",
      }).catch(() => null);

      if (!payment) return "Failed to initiate payment. Please try again.";

      const transaction = await createTransaction.mutateAsync({
        paymentId: payment.id,
        bankCode: selectedBank,
        returnUrl: RETURN_URL,
      }).catch(() => null);

      if (!transaction?.redirectUrl) return "Failed to connect to bank portal. Please try again.";

      window.location.href = transaction.redirectUrl;
      return null;
    },
    null
  );

  const currency = invoice?.currency ?? "COP";
  const total = invoice?.total ?? 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <PaymentSummaryCard invoice={invoice} />
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
          <form action={formAction} className="space-y-6">
            <BankSelector value={selectedBank} onChange={setSelectedBank} />
            <SubmitButton label={`Pay ${formatCurrency(total, currency)}`} />
            <Text variant="small" color="secondary" className="text-center">
              You will be redirected to your bank's secure portal to complete the payment.
            </Text>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
