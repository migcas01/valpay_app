import { Outlet } from "react-router";

// Minimal centered layout for the login page
export function AuthLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <Outlet />
    </div>
  );
}
