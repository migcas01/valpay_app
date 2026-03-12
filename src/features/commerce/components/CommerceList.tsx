import { useState } from "react";
import { Building2, Plus } from "lucide-react";
import { Button, Spinner, EmptyState } from "../../../shared";
import { CommerceCard } from "./CommerceCard";
import { CommerceForm } from "./CommerceForm";
import { CommerceEditForm } from "./CommerceEditForm";
import type { Commerce } from "../types/commerce.types";

interface CommerceListProps {
  commerces: Commerce[];
  isLoading?: boolean;
}

export function CommerceList({ commerces, isLoading }: CommerceListProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Commerce | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner text="Loading commerces..." size="medium" color="primary" />
      </div>
    );
  }

  if (commerces.length === 0) {
    return (
      <>
        <EmptyState
          icon={Building2}
          title="No commerces found"
          description="Register your first commerce to get started"
          action={
            <Button onClick={() => setIsCreateOpen(true)}>
              <Plus className="h-4 w-4" />
              Register Commerce
            </Button>
          }
        />
        <CommerceForm
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
        />
      </>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="h-4 w-4" />
          Register Commerce
        </Button>
      </div>

      <CommerceForm
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      {editTarget && (
        <CommerceEditForm
          commerce={editTarget}
          isOpen={!!editTarget}
          onClose={() => setEditTarget(null)}
        />
      )}

      {commerces.map((commerce) => (
        <CommerceCard
          key={commerce.id}
          commerce={commerce}
          onEdit={setEditTarget}
        />
      ))}
    </div>
  );
}
