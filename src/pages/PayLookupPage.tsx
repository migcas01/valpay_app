import { useSearchParams, useNavigate } from "react-router";
import { Spinner, Callout, Heading, Text, Link, Button } from "../shared";
import { useClientLookup } from "../features/client-lookup";
import type { DocumentType } from "../features/client-lookup";

export function PayLookupPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
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
            description={
              error instanceof Error
                ? error.message
                : "Could not find your invoices. Please check your information and try again."
            }
          />
          <Link to="/pay">Try again</Link>
        </div>
      </div>
    );
  }

  const invoices = data?.invoices ?? [];

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

      {invoices.length === 0 ? (
        <Text color="secondary">No invoices found for this document.</Text>
      ) : (
        <div className="space-y-3">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
            >
              <div>
                <Text weight="medium">{invoice.description}</Text>
                <Text variant="small" color="secondary">
                  Ref: {invoice.externalReference}
                </Text>
              </div>
              <div className="flex items-center gap-3">
                <Text weight="bold">
                  {new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: invoice.currency,
                  }).format(invoice.amount)}
                </Text>
                {invoice.status !== "paid" && (
                  <Button
                    size="small"
                    onClick={() =>
                      navigate(
                        `/pay/payment?paymentId=${invoice.paymentId}&docType=${docType}&docNum=${docNum}`
                      )
                    }
                  >
                    Pay
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Link to="/pay" color="secondary">
        Search with a different document
      </Link>
    </div>
  );
}
