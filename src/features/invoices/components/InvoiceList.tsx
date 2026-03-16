import { useState } from "react";
import { FileText, Plus } from "lucide-react";
import { Button, Spinner, EmptyState } from "@/shared";
import { InvoiceCard } from "./InvoiceCard";
import { InvoiceForm } from "./InvoiceForm";
import { useInvoices } from "../hooks/useInvoices";

interface InvoiceListProps {
  showCreateButton?: boolean;
}

export function InvoiceList({
  showCreateButton = false,
}: InvoiceListProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data: invoiceList, isLoading } = useInvoices();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner text="Loading invoices..." size="medium" color="primary" />
      </div>
    );
  }

  if ((invoiceList?.data ?? []).length === 0) {
    return (
      <>
        <EmptyState
          icon={FileText}
          title="No invoices found"
          description={
            showCreateButton
              ? "Create your first invoice to get started"
              : "No invoices match your search criteria"
          }
          action={
            showCreateButton ? (
              <Button onClick={() => setIsFormOpen(true)}>
                <Plus className="h-4 w-4" />
                New Invoice
              </Button>
            ) : undefined
          }
        />
        {showCreateButton && (
          <InvoiceForm
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
          />
        )}
      </>
    );
  }

  return (
    <div className="space-y-3">
      {showCreateButton && (
        <div className="flex justify-end">
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="h-4 w-4" />
            New Invoice
          </Button>
        </div>
      )}
      {showCreateButton && (
        <InvoiceForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
        />
      )}
      {invoiceList?.data.map((invoice) => (
        <InvoiceCard
          key={invoice.id}
          invoice={invoice}
        />
      ))}
    </div>
  );
}
