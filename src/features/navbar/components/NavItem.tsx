import { Link } from "react-router";
import type { LucideIcon } from "lucide-react";

interface NavItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  active: boolean;
}

export function NavItem({ to, icon: Icon, label, active }: NavItemProps) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 px-3 py-2 rounded-md  transition-colors text-sm font-medium text-gray-600 hover:text-amber-600"
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}
