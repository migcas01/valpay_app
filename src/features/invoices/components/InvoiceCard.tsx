import { FileText, ArrowRight } from "lucide-react";
import { Card, CardBody, Badge, Button, Heading, Text, Link } from "../../../shared";
import type { Invoice } from "../types/invoice.types";

interface InvoiceCardProps {
  invoice: Invoice;
  showPayButton?: boolean;
}

const statusColors = {
  pending: "warning",
  paid: "success",
  failed: "danger",
  cancelled: "default",
} as const;

const statusLabels = {
  pending: "Pending",
  paid: "Paid",
  failed: "Failed",
  cancelled: "Cancelled",
};

export function InvoiceCard({ invoice, showPayButton = false }: InvoiceCardProps) {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardBody>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-50 rounded-lg">
              <FileText className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <Heading variant="h4" weight="medium">
                {invoice.externalReference}
              </Heading>
              <Text variant="small" color="secondary" className="mt-1">
                {invoice.description}
              </Text>
              <div className="mt-3 flex items-center gap-4">
                <div>
                  <Text variant="small" color="secondary">
                    Amount
                  </Text>
                  <Text weight="medium">
                    {formatCurrency(invoice.amount, invoice.currency)}
                  </Text>
                </div>
                <div>
                  <Text variant="small" color="secondary">
                    Date
                  </Text>
                  <Text weight="medium">{formatDate(invoice.createdAt)}</Text>
                </div>
                <div>
                  <Text variant="small" color="secondary">
                    Status
                  </Text>
                  <Badge
                    color={statusColors[invoice.status]}
                    content={statusLabels[invoice.status]}
                  >
                    <div className="h-2 w-2 rounded-full bg-current" />
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          {showPayButton && invoice.status === "pending" && (
            <Link to={`/pay/${invoice.id}`}>
              <Button size="small">
                Pay
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
