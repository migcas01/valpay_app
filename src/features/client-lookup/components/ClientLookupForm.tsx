import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Button,
  Input,
  Select,
  Card,
  CardBody,
  Heading,
  Text,
  Callout,
  Spinner,
} from "@/shared";

import type { SingleValue } from "react-select";
import type { DocumentType } from "../types/client-lookup.types";
import { useClientLookup } from "../hooks/useClientLookup";
import type { Payment } from "../../payments/types";

interface SelectOption {
  value: string;
  label: string;
}

const DOCUMENT_TYPES: SelectOption[] = [
  { value: "CC", label: "Cédula de Ciudadanía" },
  { value: "NIT", label: "Número de Identificación Tributaria" },
  { value: "CE", label: "Cédula de Extranjería" },
  { value: "TI", label: "Tarjeta de Identidad" },
  { value: "RC", label: "Registro Civil" },
  { value: "PA", label: "Pasaporte" },
];

const STATUS_LABELS: Record<string, string> = {
  ACTIVE: "Pendiente",
  PARTIAL: "Parcial",
  PAID: "Pagado",
  OVERDUE: "Vencido",
};

export function ClientLookupForm() {
  const navigate = useNavigate();
  const [documentType, setDocumentType] = useState<DocumentType>("CC");
  const [documentNumber, setDocumentNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { data, isLoading, error } = useClientLookup(
    submitted ? { documentType, documentNumber } : { documentType, documentNumber: "" }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (documentNumber.trim()) setSubmitted(true);
  };

  const handleDocumentTypeChange = (option: unknown) => {
    const o = option as SingleValue<SelectOption>;
    if (o) {
      setDocumentType(o.value as DocumentType);
      setSubmitted(false);
    }
  };

  const selectedOption = DOCUMENT_TYPES.find((o) => o.value === documentType) ?? null;
  const payments = data?.data ?? [];

  return (
    <div className="flex items-start justify-center bg-[#F6F9FC] pt-12 px-4">
      <div className="w-full max-w-md space-y-4">
        <Card>
          <CardBody>
            <div className="text-center mb-6">
              <Heading variant="h3" weight="bold">
                Consultar pagos
              </Heading>
              <Text color="secondary" className="mt-1">
                Ingresa tu documento para ver los pagos pendientes
              </Text>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Select
                label="Tipo de documento"
                options={DOCUMENT_TYPES}
                value={selectedOption}
                onChange={handleDocumentTypeChange}
              />
              <Input
                label="Número de documento"
                type="text"
                placeholder="Ej. 1234567890"
                value={documentNumber}
                onChange={(e) => {
                  setDocumentNumber(e.target.value);
                  setSubmitted(false);
                }}
                required
              />
              <Button type="submit" color="primary" className="w-full" disabled={isLoading}>
                {isLoading ? "Buscando..." : "Buscar pagos"}
              </Button>
            </form>
          </CardBody>
        </Card>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-6">
            <Spinner size="medium" color="primary" text="Buscando pagos..." />
          </div>
        )}

        {/* Error */}
        {error && (
          <Callout
            type="error"
            title="Error al buscar"
            description={
              error instanceof Error
                ? error.message
                : "No se pudieron obtener los pagos. Verifica tu documento."
            }
          />
        )}

        {/* Results */}
        {submitted && !isLoading && !error && payments.length === 0 && (
          <Callout
            type="info"
            title="Sin pagos pendientes"
            description="No se encontraron pagos activos para este documento."
          />
        )}

        {payments.length > 0 && (
          <div className="space-y-3">
            <Text weight="bold" className="text-slate-700">
              Pagos encontrados ({payments.length})
            </Text>
            {payments.map((payment: Payment) => {
              const statusCode = payment.status;
              const isPaid = statusCode === "PAID";
              const installment = payment.installments?.[0];

              return (
                <div
                  key={payment.id}
                  className={[
                    "bg-white rounded-xl border p-4 space-y-3",
                    isPaid ? "border-gray-100 opacity-60" : "border-gray-100",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Text weight="bold" className="text-slate-700">
                        {payment.subject}
                      </Text>
                      <Text variant="small" color="secondary">
                        Ref: {payment.externalReference}
                      </Text>
                    </div>
                    <span
                      className={[
                        "text-xs font-bold px-2 py-0.5 rounded-full shrink-0",
                        statusCode === "PAID"
                          ? "bg-emerald-50 text-emerald-700"
                          : statusCode === "OVERDUE"
                            ? "bg-red-50 text-red-700"
                            : "bg-amber-50 text-amber-700",
                      ].join(" ")}
                    >
                      {STATUS_LABELS[statusCode ?? ""] ?? statusCode}
                    </span>
                  </div>

                  {installment && (
                    <div className="flex justify-between items-center">
                      <Text variant="small" color="secondary">
                        Vence: {installment.dueDate}
                      </Text>
                      <Text weight="bold" className="text-amber-600">
                        {new Intl.NumberFormat("es-CO", {
                          style: "currency",
                          currency: "COP",
                        }).format(installment.total)}
                      </Text>
                    </div>
                  )}

                  {!isPaid && (
                    <Button
                      size="small"
                      className="w-full"
                      onClick={() => navigate(`/pay/payment?paymentId=${payment.id}`)}
                    >
                      Pagar ahora
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <p className="text-center text-xs text-gray-400 pb-6">
          Powered by <span className="font-black text-gray-600">Valpay</span>
        </p>
      </div>
    </div>
  );
}
