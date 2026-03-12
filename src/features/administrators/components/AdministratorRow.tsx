import { useState, useRef, useEffect } from "react";
import { MoreVertical, Pencil, UserX, UserCheck } from "lucide-react";
import { Chip, Text } from "../../../shared";
import { useUpdateAdministrator } from "../hooks/useUpdateAdministrator";
import type { Administrator } from "../types/administrator.types";

interface AdministratorRowProps {
  admin: Administrator;
  onEdit?: (admin: Administrator) => void;
}

const roleConfig: Record<Administrator["role"], { color: "primary" | "secondary"; label: string }> = {
  maintainer: { color: "primary", label: "Maintainer" },
  admin: { color: "secondary", label: "Admin" },
};

const statusConfig: Record<
  Administrator["status"],
  { color: "success" | "default" | "danger"; label: string }
> = {
  active: { color: "success", label: "Active" },
  inactive: { color: "default", label: "Inactive" },
  banned: { color: "danger", label: "Banned" },
};

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export function AdministratorRow({ admin, onEdit }: AdministratorRowProps) {
  const updateAdmin = useUpdateAdministrator();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLTableCellElement>(null);
  const { color: roleColor, label: roleLabel } = roleConfig[admin.role];
  const { color: statusColor, label: statusLabel } = statusConfig[admin.status];

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

  const toggleBan = () => {
    setMenuOpen(false);
    const newStatus = admin.status === "banned" ? "active" : "banned";
    updateAdmin.mutate({ id: admin.id, payload: { status: newStatus } });
  };

  return (
    <tr className="border-b border-gray-100">
      <td className="py-3 px-4">
        <Text weight="medium">{admin.name}</Text>
        <Text variant="small" color="secondary">{admin.email}</Text>
      </td>
      <td className="py-3 px-4">
        <Chip color={roleColor}>{roleLabel}</Chip>
      </td>
      <td className="py-3 px-4">
        <Text variant="small" color="secondary">
          {admin.commerceName ?? "-"}
        </Text>
      </td>
      <td className="py-3 px-4">
        <Chip color={statusColor}>{statusLabel}</Chip>
      </td>
      <td className="py-3 px-4">
        <Text variant="small" color="secondary">{formatDate(admin.createdAt)}</Text>
      </td>
      <td className="py-3 px-4 text-right" ref={menuRef} style={{ position: "relative" }}>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="p-1 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-10 py-1">
            <button
              onClick={() => { setMenuOpen(false); onEdit?.(admin); }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <Pencil className="h-4 w-4" />
              Edit
            </button>
            <button
              onClick={toggleBan}
              disabled={updateAdmin.isPending}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              {admin.status === "banned" ? (
                <><UserCheck className="h-4 w-4" />Unban</>
              ) : (
                <><UserX className="h-4 w-4" />Ban</>
              )}
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
