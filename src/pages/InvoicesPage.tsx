import { Heading } from "@/shared";
import { InvoiceList } from "../features/invoices";

export function InvoicesPage() {
  return (
    <div className="space-y-6">
      <Heading variant="h3" weight="bold">
        Invoices
      </Heading>
      <InvoiceList
        showCreateButton
      />
    </div>
  );
}
