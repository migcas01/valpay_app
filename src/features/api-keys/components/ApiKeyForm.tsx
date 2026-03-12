import { useState } from "react";
import { Button, Input, Callout, Heading } from "../../../shared";
import { useCreateApiKey } from "../hooks/useCreateApiKey";
import type { CreateApiKeyResponse } from "../types/api-key.types";

interface ApiKeyFormProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: (result: CreateApiKeyResponse) => void;
}

export function ApiKeyForm({ isOpen, onClose, onCreated }: ApiKeyFormProps) {
  const createApiKey = useCreateApiKey();
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = await createApiKey
      .mutateAsync({ name })
      .then((data) => ({ data, error: null }))
      .catch((err: unknown) => ({
        data: null,
        error: err instanceof Error ? err.message : "Failed to create API key",
      }));

    if (result.error || !result.data) {
      setError(result.error);
      return;
    }

    setName("");
    onCreated?.(result.data);
    onClose();
  };

  return (
    <div className="space-y-4">
      <Heading variant="h4" weight="medium">
        Create API Key
      </Heading>

      {error && <Callout type="error" title="Error" description={error} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Key Name"
          type="text"
          placeholder="e.g. Production, Staging, Mobile App"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="flex gap-3 pt-2">
          <Button type="submit" color="primary" disabled={createApiKey.isPending}>
            {createApiKey.isPending ? "Creating..." : "Create Key"}
          </Button>
          <Button type="button" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
