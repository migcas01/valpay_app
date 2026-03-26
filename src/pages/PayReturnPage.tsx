import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { Spinner, Heading, Text, Button, Callout, Divider } from "../shared";
import { useConfirmTransaction } from "../features/payments/hooks/useConfirmTransaction";
import { useTransactionEvents } from "../features/transactions/hooks/useTransactionEvents";
import { formatCurrency } from "../utils/formatCurrency";
import type { TransactionStatusCode } from "../features/payments/types";

type LocalStatus = "checking" | "waiting" | "success" | "failed";

function toLocalStatus(code: TransactionStatusCode): LocalStatus {
  if (code === "SUCCESS" || code === "AUTHORIZED") return "success";
  if (code === "FAILED" || code === "NOT_AUTHORIZED" || code === "VOIDED") return "failed";
  if (code === "INITIALIZED" || code === "PENDING") return "waiting";
  return "checking";
}

// PSE redirects back here as:
//   /pay/return?paymentId=7&transactionId=42
export function PayReturnPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const transactionId = Number(searchParams.get("transactionId") ?? "0");
  const paymentId = Number(searchParams.get("paymentId") ?? "0");

  const [localStatus, setLocalStatus] = useState<LocalStatus>("checking");

  // Step 1 — call /confirm immediately on mount
  const { data: confirmData, isLoading: isConfirming, error: confirmError } =
    useConfirmTransaction(transactionId);

  // Step 2 — react to polling result
  useEffect(() => {
    if (!confirmData?.status) return;
    setLocalStatus(toLocalStatus(confirmData.status));
  }, [confirmData]);

  // Step 3 — if still PENDING after confirm, open SSE
  const sseEnabled = localStatus === "waiting";
  useTransactionEvents({
    transactionId: String(transactionId),
    onStatusChange: (status) => {
      if (status === "completed") setLocalStatus("success");
      else if (status === "failed") setLocalStatus("failed");
    },
    enabled: sseEnabled,
  });

  // ── Guard: missing params ────────────────────────────────────
  if (!transactionId || !paymentId) {
    return (
      <div className="w-full max-w-md px-4">
        <div className="space-y-4">
          <Callout
            type="error"
            title="Referencia de pago no encontrada"
            description="No se proporcionaron los parámetros necesarios para consultar el estado del pago."
          />
          <Button color="secondary" onClick={() => navigate("/pay")}>
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  // ── Loading / checking ───────────────────────────────────────
  const isChecking = isConfirming || localStatus === "checking";

  return (
    <div className="w-full max-w-md px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8">

          {/* ── Checking / Waiting ── */}
          {(isChecking || localStatus === "waiting") && (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              {isChecking ? (
                <>
                  <Spinner size="medium" color="primary" text="" />
                  <Heading variant="h4" weight="bold">
                    Verificando tu pago...
                  </Heading>
                  <Text color="secondary">
                    Estamos consultando el estado con el banco. Esto puede tardar unos segundos.
                  </Text>
                </>
              ) : (
                <>
                  <Clock size={48} className="text-amber-500" />
                  <Heading variant="h4" weight="bold">
                    Procesando pago
                  </Heading>
                  <Text color="secondary">
                    El banco aún no ha confirmado el resultado. Estamos escuchando en tiempo real...
                  </Text>
                  <Spinner size="small" color="primary" text="" />
                </>
              )}
            </div>
          )}

          {/* ── Success ── */}
          {localStatus === "success" && (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <CheckCircle size={56} className="text-emerald-500" />
              <Heading variant="h3" weight="bold">¡Pago exitoso!</Heading>
              <Text color="secondary">
                Tu pago fue procesado y aprobado correctamente.
              </Text>

              {confirmData && (
                <div className="w-full mt-2 space-y-3">
                  <Divider />
                  {confirmData.amount !== undefined && (
                    <div className="flex justify-between">
                      <Text variant="small" color="secondary">Monto</Text>
                      <Text weight="bold" className="text-emerald-600">
                        {formatCurrency(confirmData.amount, "COP")}
                      </Text>
                    </div>
                  )}
                  {confirmData.externalReference && (
                    <div className="flex justify-between">
                      <Text variant="small" color="secondary">Referencia</Text>
                      <Text variant="small" className="font-mono">{confirmData.externalReference}</Text>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <Text variant="small" color="secondary">ID Transacción</Text>
                    <Text variant="small" className="font-mono">{transactionId}</Text>
                  </div>
                </div>
              )}

              <Button className="w-full mt-4" onClick={() => navigate("/pay")}>
                Realizar otro pago
              </Button>
            </div>
          )}

          {/* ── Failed ── */}
          {localStatus === "failed" && (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <XCircle size={56} className="text-red-500" />
              <Heading variant="h3" weight="bold">Pago no aprobado</Heading>
              <Text color="secondary">
                El banco no autorizó la transacción. Puedes intentarlo de nuevo con otro banco o método.
              </Text>
              <Callout
                type="error"
                title="Transacción rechazada"
                description={`ID: ${transactionId}`}
              />
              <Button
                className="w-full"
                color="secondary"
                onClick={() =>
                  navigate(`/pay/payment?paymentId=${paymentId}`)
                }
              >
                Intentar de nuevo
              </Button>
            </div>
          )}

          {/* ── Confirm error ── */}
          {confirmError && (
            <div className="mt-4">
              <Callout
                type="error"
                title="Error al verificar el pago"
                description={
                  confirmError instanceof Error
                    ? confirmError.message
                    : "No se pudo consultar el estado. Intenta recargar la página."
                }
              />
            </div>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Powered by <span className="font-black text-gray-600">Valpay</span>
        </p>
      </div>
    );
}
