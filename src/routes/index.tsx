import { Routes, Route, Navigate } from "react-router";
import { AppLayout } from "../layouts/AppLayout";
import { PublicLayout } from "../layouts/PublicLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import { ProtectedRoute } from "../layouts/ProtectedRoute";

import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { InvoicesPage } from "../pages/InvoicesPage";
import { TransactionsPage } from "../pages/TransactionsPage";
import { TransactionDetailPage } from "../pages/TransactionDetailPage";
import { CommercesPage } from "../pages/CommercesPage";
import { AdministratorsPage } from "../pages/AdministratorsPage";
import { ApiKeysPage } from "../pages/ApiKeysPage";
import { PayPage } from "../pages/PayPage";
import { PayLookupPage } from "../pages/PayLookupPage";
import { PayInvoicePage } from "../pages/PayInvoicePage";
import { PayReturnPage } from "../pages/PayReturnPage";
import { PaymentWizardPage } from "../pages/PaymentWizardPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { DevPage } from "../pages/DevPage";

export function AppRoutes() {
  return (
    <Routes>
      {/* ── Auth ─────────────────────────────────────────── */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* ── Public (client payment flow) ─────────────────── */}
      <Route element={<PublicLayout />}>
        <Route path="/pay" element={<PayPage />} />
        <Route path="/pay/lookup" element={<PayLookupPage />} />
        <Route path="/pay/:id" element={<PayInvoicePage />} />
        <Route path="/pay/payment" element={<PaymentWizardPage />} />
        <Route path="/pay/return" element={<PayReturnPage />} />
      </Route>

      {/* ── Admin routes (admin + maintainer) ────────────── */}
      <Route
        element={<ProtectedRoute allowedRoles={["admin", "maintainer"]} />}
      >
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/transactions/:id" element={<TransactionDetailPage />} />
          <Route path="/api-keys" element={<ApiKeysPage />} />
        </Route>
      </Route>

      {/* ── Maintainer-only routes ────────────────────────── */}
      <Route
        element={
          <ProtectedRoute
            allowedRoles={["maintainer"]}
            redirectTo="/dashboard"
          />
        }
      >
        <Route element={<AppLayout />}>
          <Route path="/commerces" element={<CommercesPage />} />
          <Route path="/administrators" element={<AdministratorsPage />} />
        </Route>
      </Route>

      {/* ── Redirects & 404 ──────────────────────────────── */}
      <Route path="/" element={<Navigate to="/pay" replace />} />
      <Route path="*" element={<NotFoundPage />} />

      {/* ── Dev ──────────────────────────────────────────── */}
      <Route path="/dev" element={<DevPage />} />
    </Routes>
  );
}
