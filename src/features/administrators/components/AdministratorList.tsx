import { useState } from "react";
import { Users, Plus } from "lucide-react";
import { Button, Spinner, EmptyState } from "../../../shared";
import { AdministratorRow } from "./AdministratorRow";
import { AdministratorForm } from "./AdministratorForm";
import type { Administrator } from "../types/administrator.types";

interface AdministratorListProps {
  administrators: Administrator[];
  isLoading?: boolean;
}

const TH = ({ children, right = false }: { children: React.ReactNode; right?: boolean }) => (
  <th className={`py-3 px-4 text-sm font-medium text-gray-600 ${right ? "text-right" : "text-left"}`}>
    {children}
  </th>
);

export function AdministratorList({ administrators, isLoading }: AdministratorListProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Administrator | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner text="Loading administrators..." size="medium" color="primary" />
      </div>
    );
  }

  if (administrators.length === 0) {
    return (
      <>
        <EmptyState
          icon={Users}
          title="No administrators found"
          description="Create the first administrator account"
          action={
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="h-4 w-4" />
              Create Administrator
            </Button>
          }
        />
        <AdministratorForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
        />
      </>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4" />
          Create Administrator
        </Button>
      </div>

      <AdministratorForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />

      {/* Edit modal placeholder — reuses form with pre-filled data */}
      {editTarget && (
        <AdministratorForm
          isOpen={!!editTarget}
          onClose={() => setEditTarget(null)}
        />
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <TH>Name / Email</TH>
              <TH>Role</TH>
              <TH>Commerce</TH>
              <TH>Status</TH>
              <TH>Created</TH>
              <TH right>Actions</TH>
            </tr>
          </thead>
          <tbody>
            {administrators.map((admin) => (
              <AdministratorRow
                key={admin.id}
                admin={admin}
                onEdit={setEditTarget}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
