import { Heading } from "../shared";
import { DashboardAdmin, DashboardMaintainer, useDashboardAdmin, useDashboardMaintainer } from "../features/dashboard";
import { useRole } from "../hooks/useRole";

function AdminDashboard() {
  const { data, isLoading } = useDashboardAdmin();
  return <DashboardAdmin data={data} isLoading={isLoading} />;
}

function MaintainerDashboard() {
  const { data, isLoading } = useDashboardMaintainer();
  return <DashboardMaintainer data={data} isLoading={isLoading} />;
}

export function DashboardPage() {
  const { role } = useRole();

  return (
    <div className="space-y-6">
      <Heading variant="h3" weight="bold">
        Dashboard
      </Heading>
      {role === "maintainer" ? <MaintainerDashboard /> : <AdminDashboard />}
    </div>
  );
}
