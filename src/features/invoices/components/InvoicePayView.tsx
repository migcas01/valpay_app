import { useInvoice } from "../hooks/useInvoice";
import { Spinner, Callout } from "@/shared";
import { PaymentForm } from "./PaymentForm";
import { isPayable } from "../utils";

interface PaymentInvoiceViewProps {
  invoiceId: string;
}

export function PaymentInvoiceView({ invoiceId }: PaymentInvoiceViewProps) {
  const { data: invoice, isLoading, error } = useInvoice(invoiceId);

  if (isLoading) {
    return <Spinner size="medium" color="primary" text="Loading invoice..." />;
  }

  if (error || !invoice) {
    return (
      <Callout
        type="error"
        title="Not found"
        description={error instanceof Error ? error.message : "Invoice not found"}
      />
    );
  }

  if (!isPayable(invoice)) {
    return (
      <Callout
        type="warning"
        title="Invoice not payable"
        description={`This invoice is no longer payable. Status: ${invoice.status}`}
      />
    );
  }

  return <PaymentForm invoice={invoice} />;
}
