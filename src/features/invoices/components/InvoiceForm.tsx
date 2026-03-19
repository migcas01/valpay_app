import { useState } from "react";
import { Button, Input, Select, Callout, Heading, Text, Divider } from "../../../shared";
import { useCreateInvoice } from "../hooks/useCreateInvoice";
import type { SingleValue } from "react-select";
import type { CreateInvoicePayload } from "../types";

interface SelectOption {
  value: string;
  label: string;
}

const CURRENCIES: SelectOption[] = [
  { value: "COP", label: "Peso Colombiano (COP)" },
  { value: "USD", label: "Dólar Americano (USD)" },
];

interface LocalFormState {
  subject: string;
  currencyCode: string;
  amount: number;
  description: string;
}

const INITIAL_FORM: LocalFormState = {
  subject: "",
  currencyCode: "COP",
  amount: 0,
  description: "",
};

interface InvoiceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function InvoiceForm({ isOpen, onClose, onSuccess }: InvoiceFormProps) {
  const createInvoice = useCreateInvoice();
  const [form, setForm] = useState<LocalFormState>(INITIAL_FORM);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const payload: CreateInvoicePayload = {
      externalId: `INV-${Date.now()}`,
      subject: form.subject,
      currencyCode: form.currencyCode,
      items: [{ label: form.description || form.subject, amount: form.amount, type: "fixed" }],
    };

    const { error: mutationError } = await createInvoice
      .mutateAsync(payload)
      .then(() => ({ error: null }))
      .catch((err: unknown) => ({
        error: err instanceof Error ? err.message : "Failed to create invoice",
      }));

    if (mutationError) {
      setError(mutationError);
      return;
    }

    setForm(INITIAL_FORM);
    onSuccess?.();
    onClose();
  };

  const set = (field: keyof LocalFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const selectedCurrency = CURRENCIES.find((c) => c.value === form.currencyCode) ?? null;

  return (
    <div className="space-y-4">
      <Heading variant="h4" weight="medium">
        Create New Invoice
      </Heading>

      {error && <Callout type="error" title="Error" description={error} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Subject"
          type="text"
          placeholder="Invoice subject"
          value={form.subject}
          onChange={set("subject")}
          required
        />

        <Input
          label="Description (optional)"
          type="text"
          placeholder="Item description"
          value={form.description}
          onChange={set("description")}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Amount"
            type="number"
            placeholder="0"
            value={form.amount}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))
            }
            required
          />
          <Select
            label="Currency"
            options={CURRENCIES}
            value={selectedCurrency}
            onChange={(opt: SingleValue<SelectOption>) => {
              if (opt) setForm((prev) => ({ ...prev, currencyCode: opt.value }));
            }}
          />
        </div>

        <Divider />
        <Text variant="small" color="secondary">
          An installment will be generated automatically for 30 days from now.
        </Text>

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
