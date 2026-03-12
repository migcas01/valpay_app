import { Navigate, Outlet } from "react-router";
import { Spinner } from "../shared";
import { useRole } from "../hooks/useRole";
import type { JSX } from "react";

type Role = "maintainer" | "admin" | "public";

interface ProtectedRouteProps {
  // Roles allowed to access this route
  allowedRoles: Role[];
  // Where to redirect if not authorized (defaults to /login)
  redirectTo?: string;
}

export function ProtectedRoute({
  allowedRoles,
  redirectTo = "/login",
}: ProtectedRouteProps): JSX.Element {
  const { role, isLoading } = useRole();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="medium" color="primary" text="Loading..." />
      </div>
    );
  }

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
