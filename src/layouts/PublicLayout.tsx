import { Outlet } from "react-router";
import { Navbar } from "../features/navbar";

// Public layout for unauthenticated pages (client-facing payment flow)
export function PublicLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
