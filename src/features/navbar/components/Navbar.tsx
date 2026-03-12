import { useRole } from "../../../hooks/useRole";
import { navItemsConfig } from "./navbar.config";
import { NavItem } from "./NavItem";
import { NavbarSkeleton } from "./NavbarSkeleton";
import { UserMenu, LoginButton } from "./NavbarActions";

export function Navbar() {
  const { role, isLoading } = useRole();

  if (isLoading) return <NavbarSkeleton />;

  const items = navItemsConfig[role ?? "public"];
  const isAuthenticated = role !== "public";

  return (
    <nav className="h-14 px-6 border-b border-gray-100 flex items-center justify-between bg-white">
      <div className="flex items-center gap-6">
        <span className="text-base font-semibold tracking-tight text-gray-900">
          ValPay
        </span>
        <div className="flex items-center gap-1">
          {items.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </div>
      </div>

      {isAuthenticated ? <UserMenu /> : <LoginButton />}
    </nav>
  );
}
