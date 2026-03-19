import { PaymentWizard } from "@/features/payments/components/PaymentWizard";

// Dev sandbox — shows the PaymentWizard with a mock paymentId.
// Change the paymentId to an existing one in your local DB.
export function DevPage() {
  return <PaymentWizard paymentId={1} />;
}
