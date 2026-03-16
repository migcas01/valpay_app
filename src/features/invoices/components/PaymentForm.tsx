import { useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button, Card, CardBody, Heading, Text, Callout } from "@/shared";
import { BankSelector } from "./BankSelector";
import { PaymentSummaryCard } from "./PaymentSummaryCard";
import { useCreateInvoicePayment } from "../hooks/useCreateInvoicePayment";
import { formatCurrency } from "@/utils/formatCurrency";
import type { Invoice, BankOption } from "../types";

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
  const invoiceId = JSON.stringify(invoice.id);
  const { mutate: pay, isPending: isPaying, error } = useCreateInvoicePayment();
  const [selectedBank, setSelectedBank] = useState<BankOption | null>(null);

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
              <Callout
                type="error"
                title="Payment error"
                description={error.message}
              />
            </div>
          )}

          <form className="space-y-6">
            <BankSelector value={selectedBank} onChange={setSelectedBank} />
            <SubmitButton
              label={`Pay ${formatCurrency(invoice.amount, invoice.currency)}`}
            />
            <Text variant="small" color="secondary" className="text-center">
              You will be redirected to your bank's secure portal to complete
              the payment.
            </Text>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
