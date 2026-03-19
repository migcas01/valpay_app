import { useState } from "react";
import { Button, Card, CardBody, Heading, Text } from "@/shared";
import { BankSelector } from "./BankSelector";
import { PaymentSummaryCard } from "./PaymentSummaryCard";
import { formatCurrency } from "@/utils/formatCurrency";
import type { Invoice, BankOption } from "../types";

interface PaymentFormProps {
  invoice: Invoice;
}

export function PaymentForm({ invoice }: PaymentFormProps) {
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
          <div className="space-y-6">
            <BankSelector value={selectedBank} onChange={setSelectedBank} />
            <Button type="button" color="primary" className="w-full" disabled={!selectedBank}>
              {`Pay ${formatCurrency(invoice.total ?? invoice.amount, "COP")}`}
            </Button>
            <Text variant="small" color="secondary" className="text-center">
              You will be redirected to your bank's secure portal to complete the payment.
            </Text>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
