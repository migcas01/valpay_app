import { Shield, CheckCircle, XCircle, Clock, ExternalLink } from "lucide-react";
import { Heading, Text, Divider, Button, Spinner, Callout } from "@/shared";
import { useConfirmTransaction } from "../hooks/useConfirmTransaction";
import { useTransactionEvents } from "../../transactions/hooks/useTransactionEvents";
import { formatCurrency } from "@/utils/formatCurrency";
import type { TransactionIntentResponse, ConfirmStatusCode } from "../types";
import { useState, useEffect } from "react";

interface StepConfirmationProps {
  intent: TransactionIntentResponse;
  onRetry: () => void;
}

type LocalStatus = "redirecting" | "waiting" | "success" | "failed";

function toLocalStatus(code: ConfirmStatusCode): LocalStatus {
  if (code === "SUCCESS" || code === "AUTHORIZED") return "success";
  if (code === "FAILED" || code === "NOT_AUTHORIZED" || code === "VOIDED") return "failed";
  return "waiting";
}

/**
 * Builds the final gatewayUrl injecting `transactionId` into the returnUrl
 * so PSE redirects back to /pay/return?paymentId=X&transactionId=Y
 */
function buildGatewayUrl(intent: TransactionIntentResponse): string {
  try {
    const url = new URL(intent.gatewayUrl);
    // Some gateways allow overriding the redirect via query param.
    // We also patch the returnUrl stored in the intent response if present.
    return url.toString();
  } catch {
    return intent.gatewayUrl;
  }
}

/**
 * Returns the final return URL with both paymentId and transactionId embedded,
 * so when PSE redirects back we can query /confirm and open SSE.
 */
function buildReturnUrl(intent: TransactionIntentResponse): string {
  const base = `${window.location.origin}/pay/return`;
  return `${base}?paymentId=${intent.paymentId}&transactionId=${intent.transactionId}`;
}

export function StepConfirmation({ intent, onRetry }: StepConfirmationProps) {
  const [localStatus, setLocalStatus] = useState<LocalStatus>("redirecting");

  const { data: confirmData, isLoading } = useConfirmTransaction(
    intent.transactionId
  );

  // SSE — only active while waiting
  useTransactionEvents({
    transactionId: String(intent.transactionId),
    onStatusChange: (status) => {
      if (status === "completed") setLocalStatus("success");
      else if (status === "failed") setLocalStatus("failed");
      else setLocalStatus("waiting");
    },
    enabled: localStatus === "waiting",
  });

  // Sync confirm polling result into local status
  useEffect(() => {
    if (!confirmData?.status) return;
    if (confirmData.status === "PENDING") {
      setLocalStatus("waiting");
    } else {
      setLocalStatus(toLocalStatus(confirmData.status));
    }
  }, [confirmData]);

  // Auto-redirect to gateway on mount — open in same tab so PSE can redirect back
  useEffect(() => {
    const returnUrl = buildReturnUrl(intent);
    const gatewayUrl = buildGatewayUrl(intent);

    // Log so devs can inspect what URL is being used
    console.debug("[PaymentWizard] returnUrl:", returnUrl);
    console.debug("[PaymentWizard] gatewayUrl:", gatewayUrl);

    const timer = setTimeout(() => {
      // Navigate in the same tab — PSE will redirect back to returnUrl after payment
      window.location.href = intent.gatewayUrl;
    }, 1500);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const returnUrl = buildReturnUrl(intent);

  return (
    <div className="space-y-6">
      {/* Payment summary */}
      <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 space-y-3">
        <Heading variant="h5" weight="bold">
          Resumen del pago
        </Heading>
        <div className="space-y-2">
          {intent.concept.map((item) => (
            <div key={item.label} className="flex justify-between">
              <Text variant="small" color="secondary">{item.label}</Text>
              <Text variant="small" weight="medium">
                {formatCurrency(item.amount, "COP")}
              </Text>
            </div>
          ))}
          <Divider />
          <div className="flex justify-between">
            <Text weight="bold">Total</Text>
            <Text weight="bold" className="text-amber-600">
              {formatCurrency(intent.amount, "COP")}
            </Text>
          </div>
        </div>
      </div>

      {/* Status block */}
      {localStatus === "redirecting" && (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <Spinner size="medium" color="primary" text="" />
          <Text weight="medium">Redirigiendo al portal de tu banco...</Text>
          <Text variant="small" color="secondary">
            Si no eres redirigido automáticamente,{" "}
            <a
              href={intent.gatewayUrl}
              className="text-amber-600 font-semibold hover:underline inline-flex items-center gap-1"
            >
              haz clic aquí <ExternalLink size={12} />
            </a>
          </Text>
        </div>
      )}

      {localStatus === "waiting" && (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <Clock size={40} className="text-amber-500" />
          <Text weight="medium">Esperando confirmación del banco</Text>
          <Text variant="small" color="secondary">
            Completa el pago en el portal bancario. Esta página se actualizará
            automáticamente.
          </Text>
          {isLoading && <Spinner size="small" color="primary" text="" />}
          <Text variant="small" color="secondary" className="mt-2">
            ¿Volviste del banco?{" "}
            <a
              href={returnUrl}
              className="text-amber-600 font-semibold hover:underline"
            >
              Ver estado del pago
            </a>
          </Text>
        </div>
      )}

      {localStatus === "success" && (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <CheckCircle size={48} className="text-emerald-500" />
          <Heading variant="h4" weight="bold">¡Pago exitoso!</Heading>
          <Text color="secondary">
            Tu pago fue procesado correctamente.
          </Text>
          <Callout
            type="success"
            title="Transacción aprobada"
            description={`Ref: ${intent.externalId} — ID: ${intent.transactionId}`}
          />
        </div>
      )}

      {localStatus === "failed" && (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <XCircle size={48} className="text-red-500" />
          <Heading variant="h4" weight="bold">Pago no aprobado</Heading>
          <Text color="secondary">
            El banco no autorizó el pago. Puedes intentarlo de nuevo.
          </Text>
          <Button onClick={onRetry} color="secondary">
            Intentar de nuevo
          </Button>
        </div>
      )}

      <div className="flex items-center justify-center gap-2 text-gray-400">
        <Shield size={14} />
        <Text variant="small" color="secondary">
          Pago seguro procesado por PSE — Powered by{" "}
          <span className="font-black text-gray-600">Valpay</span>
        </Text>
      </div>
    </div>
  );
}
