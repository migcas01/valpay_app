import { Outlet } from "react-router";
import { Navbar } from "../features/navbar";

export function PaymentLayout() {
  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <Navbar />
      <main className="flex-1 flex justify-center items-stretch min-h-0">
        <Outlet />
      </main>
    </div>
  );
}
