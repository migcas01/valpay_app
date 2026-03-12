import { Link, useLocation } from "react-router";
import type { NavItemConfig } from "./navbar.config";

export function NavItem({ to, icon: Icon, label }: NavItemConfig) {
  const { pathname } = useLocation();
  const isActive = pathname === to || (to !== "/" && pathname.startsWith(to));

  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium ${
        isActive
          ? "bg-amber-50 text-amber-700"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <Icon size={16} strokeWidth={1.75} />
      {label}
    </Link>
  );
}
