import { Routes, Route, Navigate } from "react-router";
import { PublicLayout, PaymentLayout, AuthLayout } from "../layouts";

import { LoginPage } from "../pages/LoginPage";
import { PayPage } from "../pages/PayPage";
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
        <Route path="/pay/return" element={<PayReturnPage />} />
      </Route>

      {/* ── Payment wizard (full height split layout) ────── */}
      <Route element={<PaymentLayout />}>
        <Route path="/pay/payment" element={<PaymentWizardPage />} />
      </Route>

      {/* ── Redirects & 404 ──────────────────────────────── */}
      <Route path="/" element={<Navigate to="/pay" replace />} />
      <Route path="*" element={<NotFoundPage />} />

      {/* ── Dev sandbox ──────────────────────────────────── */}
      <Route path="/dev" element={<DevPage />} />
    </Routes>
  );
}
