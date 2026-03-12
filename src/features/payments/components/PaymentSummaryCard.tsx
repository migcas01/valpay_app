import { Card, CardBody, CardHeader, Heading, Text, Divider } from "../../../shared";
import type { PaymentSummary } from "../types/payment.types";

interface PaymentSummaryCardProps {
  summary: PaymentSummary;
}

export function PaymentSummaryCard({ summary }: PaymentSummaryCardProps) {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <Heading variant="h3" weight="medium">
          Payment Summary
        </Heading>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          <div>
            <Text variant="small" color="secondary">
              Invoice Reference
            </Text>
            <Text weight="medium">{summary.invoice.externalReference}</Text>
          </div>

          <div>
            <Text variant="small" color="secondary">
              Description
            </Text>
            <Text>{summary.invoice.description}</Text>
          </div>

          <Divider />

          <div>
            <Text variant="small" color="secondary">
              Payer
            </Text>
            <Text weight="medium">{summary.payer.name}</Text>
            <Text variant="small" color="secondary">
              {summary.payer.document}
            </Text>
          </div>

          <div>
            <Text variant="small" color="secondary">
              Receiver
            </Text>
            <Text weight="medium">{summary.receiver.name}</Text>
          </div>

          <Divider />

          <div className="space-y-2">
            {summary.items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <Text variant="small" color="secondary">
                  {item.label}
                </Text>
                <Text weight="medium">
                  {formatCurrency(item.amount, summary.invoice.currency)}
                </Text>
              </div>
            ))}
          </div>

          <Divider />

          <div className="flex justify-between items-center">
            <Text weight="bold" variant="h4">
              Total
            </Text>
            <Text weight="bold" variant="h3" color="primary">
              {formatCurrency(summary.total, summary.invoice.currency)}
            </Text>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
