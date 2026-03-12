import { Heading } from "../shared";
import { ApiKeyList, useApiKeys } from "../features/api-keys";

export function ApiKeysPage() {
  const { data, isLoading } = useApiKeys();

  return (
    <div className="space-y-6">
      <Heading variant="h3" weight="bold">
        API Keys
      </Heading>
      <ApiKeyList
        apiKeys={data?.data ?? []}
        isLoading={isLoading}
      />
    </div>
  );
}
