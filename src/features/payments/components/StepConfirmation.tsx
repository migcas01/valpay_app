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

export function StepConfirmation({ intent, onRetry }: StepConfirmationProps) {
  const [localStatus, setLocalStatus] = useState<LocalStatus>("redirecting");

  const { data: confirmData, isLoading } = useConfirmTransaction(
    intent.transactionId
  );

  useTransactionEvents({
    transactionId: String(intent.transactionId),
    onStatusChange: (status) => {
      if (status === "completed") setLocalStatus("success");
      else if (status === "failed") setLocalStatus("failed");
      else setLocalStatus("waiting");
    },
    enabled: localStatus === "waiting",
  });

  useEffect(() => {
    if (confirmData?.status && confirmData.status !== "PENDING") {
      setLocalStatus(toLocalStatus(confirmData.status));
    } else if (confirmData?.status === "PENDING") {
      setLocalStatus("waiting");
    }
  }, [confirmData]);

  // Auto-redirect to gateway on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      window.open(intent.gatewayUrl, "_blank");
      setLocalStatus("waiting");
    }, 1500);
    return () => clearTimeout(timer);
  }, [intent.gatewayUrl]);

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
          <Text weight="medium">Abriendo el portal de tu banco...</Text>
          <Text variant="small" color="secondary">
            Si no se abre automáticamente,{" "}
            <a
              href={intent.gatewayUrl}
              target="_blank"
              rel="noopener noreferrer"
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
        </div>
      )}

      {localStatus === "success" && (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <CheckCircle size={48} className="text-emerald-500" />
          <Heading variant="h4" weight="bold">¡Pago exitoso!</Heading>
          <Text color="secondary">
            Tu pago fue procesado correctamente. Ref: {intent.externalId}
          </Text>
          <Callout
            type="success"
            title="Transacción aprobada"
            description={`ID de transacción: ${intent.transactionId}`}
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

      {/* Security note */}
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
