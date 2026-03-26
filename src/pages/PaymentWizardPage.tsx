import { useSearchParams } from "react-router";
import { Callout, Link } from "@/shared";
import { PaymentWizard } from "@/features/payments/components/PaymentWizard";

export function PaymentWizardPage() {
  const [searchParams] = useSearchParams();
  const rawId = searchParams.get("paymentId");
  const paymentId = rawId ? Number(rawId) : null;

  if (!paymentId || isNaN(paymentId)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md space-y-4">
          <Callout
            type="error"
            title="Pago no encontrado"
            description="No se proporcionó un ID de pago válido."
          />
          <Link to="/pay">Volver al inicio</Link>
        </div>
      </div>
    );
  }

  return <PaymentWizard paymentId={paymentId} />;
}
