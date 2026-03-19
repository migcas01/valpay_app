import { useParams } from "react-router";
import { Spinner, Callout, Link } from "@/shared";
import { useInvoice, PaymentForm, isPayable } from "@/features/invoices";

export function PayInvoicePage() {
  const { id } = useParams<{ id: string }>();
  const { data: invoice, isLoading, error } = useInvoice(id!);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner size="medium" color="primary" text="Loading invoice..." />
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md space-y-4">
          <Callout
            type="error"
            title="Not found"
            description={
              error instanceof Error ? error.message : "Invoice not found"
            }
          />
          <Link to="/pay">Back to search</Link>
        </div>
      </div>
    );
  }

  if (!isPayable(invoice)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md space-y-4">
          <Callout
            type="warning"
            title="Invoice not payable"
            description={`This invoice is no longer payable. Its current status is ${invoice.status}.`}
          />
          <Link to="/pay">Back to search</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <PaymentForm invoice={invoice} />
    </div>
  );
}
