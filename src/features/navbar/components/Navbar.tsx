import { useLocation, Link } from "react-router";
import { Building2 } from "lucide-react";
import { Button } from "../../../shared";
import { useRole } from "../../../hooks/useRole";
import { authClient } from "../../../auth/client";
import { NavbarSkeleton } from "./NavbarSkeleton";
import { NavItem } from "./NavItem";
import { NavLogo } from "./NavLogo";
import { UserMenu } from "./UserMenu";
import { navItemsConfig, type Role } from "./navItems";
import { NavLogin } from "./NavLogin";

const { useSession } = authClient;

export function Navbar() {
  const location = useLocation();
  const { role, isLoading: isRoleLoading } = useRole();
  const { data: session, isPending: isSessionPending } = useSession();

  const isLoading = isRoleLoading || isSessionPending;

  const isActive = (path: string) => location.pathname.startsWith(path);

  if (isLoading) {
    return <NavbarSkeleton />;
  }

  const currentNavItems = navItemsConfig[role as Role] || navItemsConfig.public;
  const isPublic = role === "public";

  return (
    <nav className="sticky bg-white w-full shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <NavLogo to={isPublic ? "/" : "/dashboard"} />
            {!isPublic && (
              <div className="flex items-center gap-1">
                {currentNavItems.map((item) => (
                  <NavItem
                    key={item.to}
                    to={item.to}
                    icon={item.icon}
                    label={item.label}
                    active={
                      isActive(item.to) &&
                      (item.to !== "/dashboard" ||
                        location.pathname === "/dashboard")
                    }
                  />
                ))}
              </div>
            )}
            {currentNavItems.map((navItem, index) => {
              const { label, icon: Icon, to } = navItem;

              return (
                <Link
                  to={to}
                  key={index}
                  className="flex flex-row items-center justify-center text-sm font-medium text-gray-600 hover:text-amber-600 transition-colors"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  <div>{label}</div>
                </Link>
              );
            })}
          </div>

          <NavLogin isUser={isPublic} />
        </div>
      </div>
    </nav>
  );
}
