import { Heading } from "../shared";
import { CommerceList, useCommerces } from "../features/commerce";

export function CommercesPage() {
  const { data, isLoading } = useCommerces();

  return (
    <div className="space-y-6">
      <Heading variant="h3" weight="bold">
        Commerces
      </Heading>
      <CommerceList
        commerces={data?.data ?? []}
        isLoading={isLoading}
      />
    </div>
  );
}
