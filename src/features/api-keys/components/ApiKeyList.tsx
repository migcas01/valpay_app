import { useState } from "react";
import { KeyRound, Plus, ShieldOff } from "lucide-react";
import { Button, Spinner, EmptyState, Chip, Text, Heading } from "../../../shared";
import { ApiKeyForm } from "./ApiKeyForm";
import { ApiKeyCreatedModal } from "./ApiKeyCreatedModal";
import { useRevokeApiKey } from "../hooks/useRevokeApiKey";
import type { ApiKey, CreateApiKeyResponse } from "../types/api-key.types";

interface ApiKeyListProps {
  apiKeys: ApiKey[];
  isLoading?: boolean;
}

const statusConfig: Record<ApiKey["status"], { color: "success" | "danger"; label: string }> = {
  active: { color: "success", label: "Active" },
  revoked: { color: "danger", label: "Revoked" },
};

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const TH = ({ children, right = false }: { children: React.ReactNode; right?: boolean }) => (
  <th className={`py-3 px-4 text-sm font-medium text-gray-600 ${right ? "text-right" : "text-left"}`}>
    {children}
  </th>
);

export function ApiKeyList({ apiKeys, isLoading }: ApiKeyListProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [createdKey, setCreatedKey] = useState<CreateApiKeyResponse | null>(null);
  const revokeKey = useRevokeApiKey();

  const handleCreated = (result: CreateApiKeyResponse) => {
    setCreatedKey(result);
  };

  const handleRevoke = (key: ApiKey) => {
    if (window.confirm(`Revoke key "${key.name}"? This cannot be undone.`)) {
      revokeKey.mutate(key.id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner text="Loading API keys..." size="medium" color="primary" />
      </div>
    );
  }

  if (createdKey) {
    return (
      <ApiKeyCreatedModal
        secret={createdKey.secret}
        keyName={createdKey.apiKey.name}
        onClose={() => setCreatedKey(null)}
      />
    );
  }

  if (apiKeys.length === 0) {
    return (
      <>
        <EmptyState
          icon={KeyRound}
          title="No API keys"
          description="Create an API key to integrate with ValPay"
          action={
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="h-4 w-4" />
              Create API Key
            </Button>
          }
        />
        <ApiKeyForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onCreated={handleCreated}
        />
      </>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading variant="h5" weight="medium">
          {apiKeys.length} {apiKeys.length === 1 ? "key" : "keys"}
        </Heading>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4" />
          Create API Key
        </Button>
      </div>

      <ApiKeyForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onCreated={handleCreated}
      />

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <TH>Name</TH>
              <TH>Key Prefix</TH>
              <TH>Status</TH>
              <TH>Created</TH>
              <TH>Last Used</TH>
              <TH right>Actions</TH>
            </tr>
          </thead>
          <tbody>
            {apiKeys.map((key) => (
              <tr key={key.id} className="border-b border-gray-100">
                <td className="py-3 px-4">
                  <Text weight="medium">{key.name}</Text>
                </td>
                <td className="py-3 px-4">
                  <code className="text-sm font-mono text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                    {key.keyPrefix}...
                  </code>
                </td>
                <td className="py-3 px-4">
                  <Chip color={statusConfig[key.status].color}>
                    {statusConfig[key.status].label}
                  </Chip>
                </td>
                <td className="py-3 px-4">
                  <Text variant="small" color="secondary">
                    {formatDate(key.createdAt)}
                  </Text>
                </td>
                <td className="py-3 px-4">
                  <Text variant="small" color="secondary">
                    {key.lastUsedAt ? formatDate(key.lastUsedAt) : "Never"}
                  </Text>
                </td>
                <td className="py-3 px-4 text-right">
                  {key.status === "active" && (
                    <button
                      onClick={() => handleRevoke(key)}
                      disabled={revokeKey.isPending}
                      className="inline-flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
                    >
                      <ShieldOff className="h-4 w-4" />
                      Revoke
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
