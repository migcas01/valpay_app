import { useState } from "react";
import type { SingleValue } from "react-select";
import { Button, Input, Select, Callout, Heading } from "../../../shared";
import { useUpdateCommerce } from "../hooks/useUpdateCommerce";
import type { Commerce, UpdateCommercePayload, CommerceStatus } from "../types/commerce.types";

interface StatusOption {
  value: CommerceStatus;
  label: string;
}

const STATUS_OPTIONS: StatusOption[] = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
];

interface CommerceEditFormProps {
  commerce: Commerce;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CommerceEditForm({
  commerce,
  isOpen,
  onClose,
  onSuccess,
}: CommerceEditFormProps) {
  const updateCommerce = useUpdateCommerce();
  const [formData, setFormData] = useState<UpdateCommercePayload>({
    name: commerce.name,
    email: commerce.email,
    phone: commerce.phone ?? "",
    status: commerce.status,
  });
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const set = (field: keyof UpdateCommercePayload) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleStatusChange = (option: unknown) => {
    const o = option as SingleValue<StatusOption>;
    if (o) setFormData((prev) => ({ ...prev, status: o.value }));
  };

  const selectedStatus =
    STATUS_OPTIONS.find((o) => o.value === formData.status) ?? null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { error: mutationError } = await updateCommerce
      .mutateAsync({ id: commerce.id, payload: formData })
      .then(() => ({ error: null }))
      .catch((err: unknown) => ({
        error: err instanceof Error ? err.message : "Failed to update commerce",
      }));

    if (mutationError) {
      setError(mutationError);
      return;
    }

    onSuccess?.();
    onClose();
  };

  return (
    <div className="space-y-4">
      <Heading variant="h4" weight="medium">
        Edit Commerce
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

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            placeholder="contact@commerce.com"
            value={formData.email}
            onChange={set("email")}
          />
          <Input
            label="Phone (optional)"
            type="tel"
            placeholder="+57 300 000 0000"
            value={formData.phone}
            onChange={set("phone")}
          />
        </div>

        <Select
          label="Status"
          options={STATUS_OPTIONS}
          value={selectedStatus}
          onChange={handleStatusChange}
        />

        <div className="flex gap-3 pt-2">
          <Button type="submit" color="primary" disabled={updateCommerce.isPending}>
            {updateCommerce.isPending ? "Saving..." : "Save Changes"}
          </Button>
          <Button type="button" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
