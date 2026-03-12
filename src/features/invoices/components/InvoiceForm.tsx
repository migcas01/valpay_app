import { useState } from "react";
import { Button, Input, Card, CardBody, Heading, Text } from "../../../shared";
import { useCreateInvoice } from "../hooks/useCreateInvoice";
import type { CreateInvoicePayload } from "../types/invoice.types";

const CURRENCIES = [
  { value: "COP", label: "Peso Colombiano (COP)" },
  { value: "USD", label: "Dólar Americano (USD)" },
];

interface InvoiceFormProps {
  children?: React.ReactNode;
  onSuccess?: () => void;
}

export function InvoiceForm({ children, onSuccess }: InvoiceFormProps) {
  const createInvoice = useCreateInvoice();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<CreateInvoicePayload>({
    amount: 0,
    currency: "COP",
    description: "",
    receiverId: "",
    senderDocument: "",
    senderName: "",
    senderEmail: "",
    senderPhone: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await createInvoice.mutateAsync(formData);
      setIsOpen(false);
      setFormData({
        amount: 0,
        currency: "COP",
        description: "",
        receiverId: "",
        senderDocument: "",
        senderName: "",
        senderEmail: "",
        senderPhone: "",
      });
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create invoice");
    }
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  if (!isOpen) {
    return (
      <div onClick={handleOpen}>
        {children}
      </div>
    );
  }

  return (
    <Card className="mt-4">
      <CardBody>
        <Heading variant="h3" weight="medium" className="mb-4">
          Create New Invoice
        </Heading>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Amount"
              type="number"
              placeholder="0"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: parseFloat(e.target.value) })
              }
              required
            />
            <div>
              <label className="block font-medium text-sm text-left text-gray-600 mb-1.5">
                Currency
              </label>
              <select
                className="w-full text-gray-800 bg-gray-50 py-4 px-3 rounded-md border border-transparent outline-none transition-all duration-200 focus:border-amber-500"
                value={formData.currency}
                onChange={(e) =>
                  setFormData({ ...formData, currency: e.target.value })
                }
              >
                {CURRENCIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Input
            label="Description"
            type="text"
            placeholder="Invoice description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />

          <Input
            label="Receiver ID"
            type="text"
            placeholder="Receiver document number"
            value={formData.receiverId}
            onChange={(e) =>
              setFormData({ ...formData, receiverId: e.target.value })
            }
            required
          />

          <div className="border-t border-gray-200 pt-4">
            <Text weight="medium" className="mb-4">
              Payer Information
            </Text>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Document Number"
                type="text"
                placeholder="Document number"
                value={formData.senderDocument}
                onChange={(e) =>
                  setFormData({ ...formData, senderDocument: e.target.value })
                }
                required
              />
              <Input
                label="Name"
                type="text"
                placeholder="Full name"
                value={formData.senderName}
                onChange={(e) =>
                  setFormData({ ...formData, senderName: e.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <Input
                label="Email (optional)"
                type="email"
                placeholder="email@example.com"
                value={formData.senderEmail}
                onChange={(e) =>
                  setFormData({ ...formData, senderEmail: e.target.value })
                }
              />
              <Input
                label="Phone (optional)"
                type="tel"
                placeholder="Phone number"
                value={formData.senderPhone}
                onChange={(e) =>
                  setFormData({ ...formData, senderPhone: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              color="primary"
              disabled={createInvoice.isPending}
            >
              {createInvoice.isPending ? "Creating..." : "Create Invoice"}
            </Button>
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
