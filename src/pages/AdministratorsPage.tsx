import { Heading } from "../shared";
import { AdministratorList, useAdministrators } from "../features/administrators";

export function AdministratorsPage() {
  const { data, isLoading } = useAdministrators();

  return (
    <div className="space-y-6">
      <Heading variant="h3" weight="bold">
        Administrators
      </Heading>
      <AdministratorList
        administrators={data?.data ?? []}
        isLoading={isLoading}
      />
    </div>
  );
}
