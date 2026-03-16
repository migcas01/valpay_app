import { Card, CardHeader, CardBody, Heading, Text, Divider } from "@/shared";
import { formatCurrency } from "@/utils/formatCurrency";
import type { Invoice } from "../types";

interface PaymentSummaryCardProps {
  invoice: Invoice;
}

interface PaymentItem {
  item: { label: string; price: number };
  currency: string;
}

const paymentItems: { items: PaymentItem[] } = {
  items: [
    { item: { label: "Item 1", price: 1 }, currency: "COP" },
    { item: { label: "Item 2", price: 1 }, currency: "COP" },
    { item: { label: "Item 3", price: 1 }, currency: "COP" },
    { item: { label: "Item 4", price: 1 }, currency: "COP" },
  ],
};

// TODO: Fix the currency prop
function LineItem({ item, currency }: PaymentItem) {
  return (
    <div className="flex justify-between">
      <Text variant="small" color="secondary">
        {item.label}
      </Text>
      <Text weight="medium">{formatCurrency(0, currency)}</Text>
    </div>
  );
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
            <Text weight="medium">{"EDUFAST-9999"}</Text>
          </div>

          <div>
            <Text variant="small" color="secondary">
              Description
            </Text>
            <Text>{"Description"}</Text>
          </div>

          <Divider />

          <div>
            <Text variant="small" color="secondary">
              Payer
            </Text>
            <Text weight="medium">{"PAYER NAME"}</Text>
            <Text variant="small" color="secondary">
              {"PAYER DOCUMENT"}
            </Text>
          </div>

          <div>
            <Text variant="small" color="secondary">
              Receiver
            </Text>
            <Text weight="medium">{"RECEIVER NAME"}</Text>
          </div>

          <Divider />

          <div className="space-y-2">
            {paymentItems.items.map(({ item, currency }, index) => (
              <LineItem key={index} item={item} currency={currency} />
            ))}
          </div>

          <Divider />

          <div className="flex justify-between items-center">
            <Heading variant="h6" weight="bold">
              Total
            </Heading>
            <Heading variant="h5" weight="bold" color="primary">
              {formatCurrency(1, "COP")}
            </Heading>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
