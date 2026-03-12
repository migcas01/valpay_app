import { useState, useRef, useEffect } from "react";
import { Building2, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Card, CardBody, Chip, Heading, Text } from "../../../shared";
import { useDeleteCommerce } from "../hooks/useDeleteCommerce";
import type { Commerce } from "../types/commerce.types";

interface CommerceCardProps {
  commerce: Commerce;
  onEdit?: (commerce: Commerce) => void;
}

const statusConfig: Record<
  Commerce["status"],
  { color: "success" | "default" | "danger"; label: string }
> = {
  active: { color: "success", label: "Active" },
  inactive: { color: "default", label: "Inactive" },
  suspended: { color: "danger", label: "Suspended" },
};

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export function CommerceCard({ commerce, onEdit }: CommerceCardProps) {
  const deleteCommerce = useDeleteCommerce();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { color, label } = statusConfig[commerce.status];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleDelete = () => {
    setMenuOpen(false);
    if (window.confirm(`Delete commerce "${commerce.name}"? This cannot be undone.`)) {
      deleteCommerce.mutate(commerce.id);
    }
  };

  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gray-50 rounded-lg shrink-0">
              <Building2 className="h-5 w-5 text-gray-500" />
            </div>
            <div className="space-y-1">
              <Heading variant="h5" weight="medium">
                {commerce.name}
              </Heading>
              <Text variant="small" color="secondary">
                {commerce.email}
              </Text>
              <div className="flex items-center gap-4 pt-1">
                <div>
                  <Text variant="small" color="secondary">Document</Text>
                  <Text weight="medium">{commerce.document}</Text>
                </div>
                {commerce.phone && (
                  <div>
                    <Text variant="small" color="secondary">Phone</Text>
                    <Text weight="medium">{commerce.phone}</Text>
                  </div>
                )}
                <div>
                  <Text variant="small" color="secondary">Registered</Text>
                  <Text weight="medium">{formatDate(commerce.createdAt)}</Text>
                </div>
                <Chip color={color}>{label}</Chip>
              </div>
            </div>
          </div>
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="p-1 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-10 py-1">
                <button
                  onClick={() => { setMenuOpen(false); onEdit?.(commerce); }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleteCommerce.isPending}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
