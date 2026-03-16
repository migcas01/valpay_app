import { useInvoice } from "../hooks/useInvoices";
import { Spinner } from "@/shared";
import { InvoicePaymentCallout } from "./InvoicePaymentCallout"
import { PaymentForm } from "./PaymentForm"

interface PaymentInvoiceViewProps {
  invoiceId: string;
}

export function PaymentInvoiceView({ invoiceId }: PaymentInvoiceViewProps) {
  const { data: invoice, isLoading, error } = useInvoice(invoiceId);

  if (isLoading) {
    return <Spinner size="medium" color="primary" text="Loading invoice..." />;
  }

  if (error || !invoice) {
    return <InvoicePaymentCallout type="error" title="Not found" description={} />;
  }

  if (!isPayable(invoice)) {
    return (
      <InvoicePaymentCallout
        type="warning"
        title="Invoice not payable"
        description={}
      />
    );
  }

  return (
    <PaymentForm
      invoice={{}}
    />
  );
}
