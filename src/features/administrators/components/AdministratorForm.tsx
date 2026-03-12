import { useState } from "react";
import type { SingleValue } from "react-select";
import { Button, Input, Select, Callout, Heading, Divider, Text } from "../../../shared";
import { useCreateAdministrator } from "../hooks/useCreateAdministrator";
import type { CreateAdministratorPayload, AdminRole } from "../types/administrator.types";

interface RoleOption {
  value: AdminRole;
  label: string;
}

const ROLE_OPTIONS: RoleOption[] = [
  { value: "admin", label: "Admin (commerce-scoped)" },
  { value: "maintainer", label: "Maintainer (superadmin)" },
];

const INITIAL_FORM_DATA: CreateAdministratorPayload = {
  name: "",
  email: "",
  password: "",
  role: "admin",
  commerceId: "",
};

interface AdministratorFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AdministratorForm({ isOpen, onClose, onSuccess }: AdministratorFormProps) {
  const createAdmin = useCreateAdministrator();
  const [formData, setFormData] = useState<CreateAdministratorPayload>(INITIAL_FORM_DATA);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const set = (field: keyof CreateAdministratorPayload) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleRoleChange = (option: unknown) => {
    const o = option as SingleValue<RoleOption>;
    if (o) setFormData((prev) => ({ ...prev, role: o.value }));
  };

  const selectedRole = ROLE_OPTIONS.find((o) => o.value === formData.role) ?? null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const payload: CreateAdministratorPayload = {
      ...formData,
      // Only include commerceId for admin role
      commerceId: formData.role === "admin" ? formData.commerceId : undefined,
    };

    const { error: mutationError } = await createAdmin
      .mutateAsync(payload)
      .then(() => ({ error: null }))
      .catch((err: unknown) => ({
        error: err instanceof Error ? err.message : "Failed to create administrator",
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
        Create Administrator
      </Heading>

      {error && <Callout type="error" title="Error" description={error} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="Jane Smith"
            value={formData.name}
            onChange={set("name")}
            required
          />
          <Input
            label="Email"
            type="email"
            placeholder="admin@commerce.com"
            value={formData.email}
            onChange={set("email")}
            required
          />
        </div>

        <Input
          label="Temporary Password"
          type="password"
          placeholder="Minimum 8 characters"
          value={formData.password}
          onChange={set("password")}
          required
        />

        <Divider />

        <Text weight="medium" color="secondary">Permissions</Text>

        <Select
          label="Role"
          options={ROLE_OPTIONS}
          value={selectedRole}
          onChange={handleRoleChange}
        />

        {formData.role === "admin" && (
          <Input
            label="Commerce ID"
            type="text"
            placeholder="Commerce identifier"
            value={formData.commerceId}
            onChange={set("commerceId")}
            required
          />
        )}

        <div className="flex gap-3 pt-2">
          <Button type="submit" color="primary" disabled={createAdmin.isPending}>
            {createAdmin.isPending ? "Creating..." : "Create Administrator"}
          </Button>
          <Button type="button" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
