import { Outlet } from "react-router";
import { Navbar } from "../features/navbar";

export function AppLayout() {
  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-stretch max-w-6xl w-full mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
