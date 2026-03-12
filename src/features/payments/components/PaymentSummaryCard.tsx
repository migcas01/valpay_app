import { Card, CardHeader, CardBody, Heading, Text, Divider } from "../../../shared";
import type { PaymentSummary, PaymentItem } from "../types/payment.types";

interface PaymentSummaryCardProps {
  summary: PaymentSummary;
}

const formatCurrency = (amount: number, currency: string) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency }).format(amount);

function LineItem({ item, currency }: { item: PaymentItem; currency: string }) {
  return (
    <div className="flex justify-between">
      <Text variant="small" color="secondary">
        {item.label}
      </Text>
      <Text weight="medium">{formatCurrency(item.amount, currency)}</Text>
    </div>
  );
}

export function PaymentSummaryCard({ summary }: PaymentSummaryCardProps) {
  const { currency } = summary.invoice;

  return (
    <Card>
      <CardHeader>
        <Heading variant="h4" weight="medium">
          Payment Summary
        </Heading>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          <div>
            <Text variant="small" color="secondary">Invoice Reference</Text>
            <Text weight="medium">{summary.invoice.externalReference}</Text>
          </div>

          <div>
            <Text variant="small" color="secondary">Description</Text>
            <Text>{summary.invoice.description}</Text>
          </div>

          <Divider />

          <div>
            <Text variant="small" color="secondary">Payer</Text>
            <Text weight="medium">{summary.payer.name}</Text>
            <Text variant="small" color="secondary">{summary.payer.document}</Text>
          </div>

          <div>
            <Text variant="small" color="secondary">Receiver</Text>
            <Text weight="medium">{summary.receiver.name}</Text>
          </div>

          <Divider />

          <div className="space-y-2">
            {summary.items.map((item) => (
              <LineItem key={item.label} item={item} currency={currency} />
            ))}
          </div>

          <Divider />

          <div className="flex justify-between items-center">
            <Heading variant="h6" weight="bold">Total</Heading>
            <Heading variant="h5" weight="bold" color="primary">
              {formatCurrency(summary.total, currency)}
            </Heading>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
