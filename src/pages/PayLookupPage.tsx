import { useSearchParams } from "react-router";
import { Spinner, Callout, Heading, Text, Link } from "../shared";
import { useClientLookup } from "../features/client-lookup";
import { InvoiceList } from "../features/invoices";
import type { DocumentType, Invoice as LookupInvoice } from "../features/client-lookup";
import type { Invoice } from "../features/invoices";

// Map client-lookup Invoice → features/invoices Invoice shape
function toInvoice(raw: LookupInvoice): Invoice {
  return {
    id: raw.id,
    externalReference: raw.externalReference,
    amount: raw.amount,
    currency: raw.currency,
    description: raw.description,
    receiverName: raw.receiverName,
    receiverId: "",
    senderDocument: raw.senderDocument,
    senderName: raw.senderName,
    status: raw.status,
    paymentId: raw.paymentId,
    createdAt: raw.createdAt,
    updatedAt: raw.createdAt,
  };
}

export function PayLookupPage() {
  const [searchParams] = useSearchParams();
  const docType = (searchParams.get("docType") ?? "CC") as DocumentType;
  const docNum = searchParams.get("docNum") ?? "";

  const { data, isLoading, error } = useClientLookup({
    documentType: docType,
    documentNumber: docNum,
  });

  if (!docNum) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center space-y-3">
          <Heading variant="h4">No document provided</Heading>
          <Link to="/pay">Go back</Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner size="medium" color="primary" text="Looking up invoices..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md space-y-4">
          <Callout
            type="error"
            title="Lookup failed"
            description={error instanceof Error ? error.message : "Could not find your invoices. Please check your information and try again."}
          />
          <Link to="/pay">Try again</Link>
        </div>
      </div>
    );
  }

  const invoices = (data?.invoices ?? []).map(toInvoice);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div>
        <Heading variant="h3" weight="bold">
          Your Invoices
        </Heading>
        <Text color="secondary" className="mt-1">
          Document: {docType} {docNum}
        </Text>
      </div>
      <InvoiceList
        invoices={invoices}
        isLoading={false}
        showPayButton
      />
      <Link to="/pay" color="secondary">
        Search with a different document
      </Link>
    </div>
  );
}
