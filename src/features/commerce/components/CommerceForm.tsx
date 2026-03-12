import { useState } from "react";
import { Button, Input, Callout, Heading, Divider, Text } from "../../../shared";
import { useCreateCommerce } from "../hooks/useCreateCommerce";
import type { CreateCommercePayload } from "../types/commerce.types";

const INITIAL_FORM_DATA: CreateCommercePayload = {
  name: "",
  document: "",
  email: "",
  phone: "",
};

interface CommerceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CommerceForm({ isOpen, onClose, onSuccess }: CommerceFormProps) {
  const createCommerce = useCreateCommerce();
  const [formData, setFormData] = useState<CreateCommercePayload>(INITIAL_FORM_DATA);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const set = (field: keyof CreateCommercePayload) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { error: mutationError } = await createCommerce
      .mutateAsync(formData)
      .then(() => ({ error: null }))
      .catch((err: unknown) => ({
        error: err instanceof Error ? err.message : "Failed to create commerce",
      }));

    if (mutationError) {
      setError(mutationError);
      return;
    }

    setFormData(INITIAL_FORM_DATA);
    onSuccess?.();
    onClose();
  };

  return (
    <div className="space-y-4">
      <Heading variant="h4" weight="medium">
        Register New Commerce
      </Heading>

      {error && <Callout type="error" title="Error" description={error} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Commerce Name"
          type="text"
          placeholder="My Commerce LLC"
          value={formData.name}
          onChange={set("name")}
          required
        />

        <Divider />

        <Text weight="medium" color="secondary">Legal Information</Text>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Document / NIT"
            type="text"
            placeholder="900123456-1"
            value={formData.document}
            onChange={set("document")}
            required
          />
          <Input
            label="Phone (optional)"
            type="tel"
            placeholder="+57 300 000 0000"
            value={formData.phone}
            onChange={set("phone")}
          />
        </div>

        <Input
          label="Email"
          type="email"
          placeholder="contact@commerce.com"
          value={formData.email}
          onChange={set("email")}
          required
        />

        <div className="flex gap-3 pt-2">
          <Button type="submit" color="primary" disabled={createCommerce.isPending}>
            {createCommerce.isPending ? "Creating..." : "Register Commerce"}
          </Button>
          <Button type="button" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
