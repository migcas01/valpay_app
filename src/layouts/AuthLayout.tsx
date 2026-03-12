import { Outlet } from "react-router";

// Minimal centered layout for the login page
export function AuthLayout() {
  return (
    <div className="h-screen w-screen bg-gray-50 flex items-center justify-center">
      <Outlet />
    </div>
  );
}
