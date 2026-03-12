import { Heading } from "../shared";
import { InvoiceList, useInvoices } from "../features/invoices";

export function InvoicesPage() {
  const { data, isLoading } = useInvoices();

  return (
    <div className="space-y-6">
      <Heading variant="h3" weight="bold">
        Invoices
      </Heading>
      <InvoiceList
        invoices={data?.data ?? []}
        isLoading={isLoading}
        showCreateButton
      />
    </div>
  );
}
