import { useState } from "react";
import { Button, Input, Select, Callout, Heading, Text, Divider } from "../../../shared";
import { useCreateInvoice } from "../hooks/useCreateInvoice";
import type { SingleValue } from "react-select";
import type { CreateInvoicePayload } from "../types/invoice.types";

interface SelectOption {
  value: string;
  label: string;
}

const CURRENCIES: SelectOption[] = [
  { value: "COP", label: "Peso Colombiano (COP)" },
  { value: "USD", label: "Dólar Americano (USD)" },
];

const INITIAL_FORM_DATA: CreateInvoicePayload = {
  amount: 0,
  currency: "COP",
  description: "",
  receiverId: "",
  senderDocument: "",
  senderName: "",
  senderEmail: "",
  senderPhone: "",
};

interface InvoiceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function InvoiceForm({ isOpen, onClose, onSuccess }: InvoiceFormProps) {
  const createInvoice = useCreateInvoice();
  const [formData, setFormData] = useState<CreateInvoicePayload>(INITIAL_FORM_DATA);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { error: mutationError } = await createInvoice.mutateAsync(formData)
      .then(() => ({ error: null }))
      .catch((err: unknown) => ({
        error: err instanceof Error ? err.message : "Failed to create invoice",
      }));

    if (mutationError) {
      setError(mutationError);
      return;
    }

    setFormData(INITIAL_FORM_DATA);
    onSuccess?.();
    onClose();
  };

  const handleCurrencyChange = (option: unknown) => {
    const o = option as SingleValue<SelectOption>;
    if (o) setFormData((prev) => ({ ...prev, currency: o.value }));
  };

  const selectedCurrency = CURRENCIES.find((c) => c.value === formData.currency) ?? null;

  const set = (field: keyof CreateInvoicePayload) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="space-y-4">
      <Heading variant="h4" weight="medium">
        Create New Invoice
      </Heading>

      {error && <Callout type="error" title="Error" description={error} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Amount"
            type="number"
            placeholder="0"
            value={formData.amount}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))
            }
            required
          />
          <Select
            label="Currency"
            options={CURRENCIES}
            value={selectedCurrency}
            onChange={handleCurrencyChange}
          />
        </div>

        <Input
          label="Description"
          type="text"
          placeholder="Invoice description"
          value={formData.description}
          onChange={set("description")}
          required
        />

        <Input
          label="Receiver ID"
          type="text"
          placeholder="Receiver document number"
          value={formData.receiverId}
          onChange={set("receiverId")}
          required
        />

        <Divider />

        <Text weight="medium" color="secondary">Payer Information</Text>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Document Number"
            type="text"
            placeholder="Document number"
            value={formData.senderDocument}
            onChange={set("senderDocument")}
            required
          />
          <Input
            label="Name"
            type="text"
            placeholder="Full name"
            value={formData.senderName}
            onChange={set("senderName")}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Email (optional)"
            type="email"
            placeholder="email@example.com"
            value={formData.senderEmail}
            onChange={set("senderEmail")}
          />
          <Input
            label="Phone (optional)"
            type="tel"
            placeholder="Phone number"
            value={formData.senderPhone}
            onChange={set("senderPhone")}
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" color="primary" disabled={createInvoice.isPending}>
            {createInvoice.isPending ? "Creating..." : "Create Invoice"}
          </Button>
          <Button type="button" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
