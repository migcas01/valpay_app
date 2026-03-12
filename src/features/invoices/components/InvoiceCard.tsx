import { FileText, ArrowRight } from "lucide-react";
import { Card, CardBody, Chip, Heading, Text, Link } from "../../../shared";
import type { Invoice } from "../types/invoice.types";

interface InvoiceCardProps {
  invoice: Invoice;
  showPayButton?: boolean;
}

const statusConfig: Record<Invoice["status"], { color: "warning" | "success" | "danger" | "default"; label: string }> = {
  pending: { color: "warning", label: "Pending" },
  paid: { color: "success", label: "Paid" },
  failed: { color: "danger", label: "Failed" },
  cancelled: { color: "default", label: "Cancelled" },
};

const formatCurrency = (amount: number, currency: string) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency }).format(amount);

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export function InvoiceCard({ invoice, showPayButton = false }: InvoiceCardProps) {
  const { color, label } = statusConfig[invoice.status];

  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gray-50 rounded-lg shrink-0">
              <FileText className="h-5 w-5 text-gray-500" />
            </div>
            <div className="space-y-1">
              <Heading variant="h5" weight="medium">
                {invoice.externalReference}
              </Heading>
              <Text variant="small" color="secondary">
                {invoice.description}
              </Text>
              <div className="flex items-center gap-4 pt-1">
                <div>
                  <Text variant="small" color="secondary">Amount</Text>
                  <Text weight="medium">
                    {formatCurrency(invoice.amount, invoice.currency)}
                  </Text>
                </div>
                <div>
                  <Text variant="small" color="secondary">Date</Text>
                  <Text weight="medium">{formatDate(invoice.createdAt)}</Text>
                </div>
                <Chip color={color}>{label}</Chip>
              </div>
            </div>
          </div>
          {showPayButton && invoice.status === "pending" && (
            <Link to={`/pay/${invoice.id}`} underline="none" className="shrink-0 flex items-center gap-1 text-sm font-medium">
              Pay <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
