import { Outlet } from "react-router";
import { Navbar } from "../features/navbar";

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex justify-center items-center">
        <Outlet />
      </main>
    </div>
  );
}
