import { useParams } from "react-router";
import { Spinner, Callout, Link } from "../shared";
import { useInvoice } from "../features/invoices";
import { PaymentForm } from "../features/payments";
import type { Invoice } from "../features/invoices";
import type { PaymentSummary } from "../features/payments";

// Build a PaymentSummary from an Invoice for the PSE payment form
function buildSummary(invoice: Invoice): PaymentSummary {
  const subtotal = invoice.amount;
  return {
    invoice: {
      externalReference: invoice.externalReference,
      description: invoice.description,
      amount: invoice.amount,
      currency: invoice.currency,
    },
    payer: {
      name: invoice.senderName,
      document: invoice.senderDocument,
    },
    receiver: {
      name: invoice.receiverName,
    },
    items: [
      { label: "Subtotal", amount: subtotal, type: "subtotal" },
    ],
    total: subtotal,
  };
}

export function PayInvoicePage() {
  const { id } = useParams<{ id: string }>();
  const { data: invoice, isLoading, error } = useInvoice(id ?? "");

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
            description={error instanceof Error ? error.message : "Invoice not found"}
          />
          <Link to="/pay">Back to search</Link>
        </div>
      </div>
    );
  }

  if (invoice.status !== "pending") {
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

  const summary = buildSummary(invoice);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <PaymentForm invoiceId={invoice.id} summary={summary} />
    </div>
  );
}
