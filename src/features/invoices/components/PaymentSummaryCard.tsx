import { Card, CardHeader, CardBody, Heading, Text, Divider } from "@/shared";
import { formatCurrency } from "@/utils/formatCurrency";
import type { Invoice } from "../types";

interface PaymentSummaryCardProps {
  invoice: Invoice;
}

export function PaymentSummaryCard({ invoice }: PaymentSummaryCardProps) {
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
            <Text variant="small" color="secondary">
              Invoice Reference
            </Text>
            <Text weight="medium">{invoice.externalId}</Text>
          </div>

          <div>
            <Text variant="small" color="secondary">
              Description
            </Text>
            <Text>{invoice.subject}</Text>
          </div>

          <Divider />

          <div>
            <Text variant="small" color="secondary">
              Responsible
            </Text>
            <Text weight="medium">
              {invoice.responsibles[0]?.documentNumber}
            </Text>
          </div>

          <div>
            <Text variant="small" color="secondary">
              Receiver
            </Text>
            <Text weight="medium">{invoice.receiver}</Text>
          </div>

          <Divider />

          <div className="flex justify-between items-center">
            <Heading variant="h6" weight="bold">
              Total
            </Heading>
            <Heading variant="h5" weight="bold" color="primary">
              {formatCurrency(invoice.total, "COP")}
            </Heading>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
