import { FileText, Plus } from "lucide-react";
import { Button, Spinner, EmptyState, Card, CardBody } from "../../../shared";
import { InvoiceCard } from "./InvoiceCard";
import { InvoiceForm } from "./InvoiceForm";
import type { Invoice } from "../types/invoice.types";

interface InvoiceListProps {
  invoices: Invoice[];
  isLoading?: boolean;
  showPayButton?: boolean;
  showCreateButton?: boolean;
}

export function InvoiceList({
  invoices,
  isLoading,
  showPayButton = false,
  showCreateButton = false,
}: InvoiceListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner text="Loading invoices..." size="medium" color="primary" />
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
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
            <InvoiceForm>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Invoice
              </Button>
            </InvoiceForm>
          ) : undefined
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      {showCreateButton && (
        <div className="flex justify-end mb-4">
          <InvoiceForm>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Invoice
            </Button>
          </InvoiceForm>
        </div>
      )}
      {invoices.map((invoice) => (
        <InvoiceCard
          key={invoice.id}
          invoice={invoice}
          showPayButton={showPayButton}
        />
      ))}
    </div>
  );
}
