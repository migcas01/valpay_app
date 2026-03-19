import { CreditCard } from "lucide-react";
import { RadioGroup, Select, Heading, Text, Callout } from "@/shared";
import type { RadioOption } from "@/shared";
import type { SingleValue } from "react-select";
import { usePseBanks } from "../hooks/usePseBanks";
import type { BankOption, TransactionInstallment } from "../types";

export interface PaymentMethodData {
  method: "pse";
  bankCode: string;
  installmentId: number | null;
}

interface StepPaymentMethodProps {
  data: PaymentMethodData;
  onChange: (data: PaymentMethodData) => void;
  installments: TransactionInstallment[];
}

const paymentOptions: RadioOption[] = [
  {
    value: "pse",
    icon: <span className="font-black text-[10px] text-[#32325d]">PSE</span>,
    label: "PSE — Transferencia bancaria",
    active: true,
    enabled: true,
  },
  {
    value: "card",
    icon: <CreditCard size={16} strokeWidth={2.5} className="text-gray-400" />,
    label: "Tarjeta de crédito / débito",
    subtitle: "Próximamente",
    active: false,
    enabled: false,
  },
];

export function StepPaymentMethod({
  data,
  onChange,
  installments,
}: StepPaymentMethodProps) {
  const { data: banks, isLoading } = usePseBanks();

  const installmentOptions = installments.map((inst) => ({
    value: String(inst.id),
    label: `Cuota ${inst.number} — ${new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(inst.total)} (vence ${inst.dueDate})`,
  }));

  return (
    <div className="space-y-6">
      <div>
        <Heading variant="h5" weight="bold" className="mb-1">
          Método de pago
        </Heading>
        <Text variant="small" color="secondary">
          Selecciona cómo quieres pagar.
        </Text>
      </div>

      <RadioGroup
        name="paymentMethod"
        options={paymentOptions}
        value={data.method}
        onChange={(val) => onChange({ ...data, method: val as "pse" })}
      />

      {data.method === "pse" && (
        <div className="space-y-4">
          {installments.length > 1 && (
            <Select
              label="Cuota a pagar"
              options={installmentOptions}
              value={
                data.installmentId
                  ? installmentOptions.find(
                      (o) => o.value === String(data.installmentId)
                    ) ?? null
                  : null
              }
              onChange={(opt: SingleValue<{ value: string; label: string }>) =>
                onChange({
                  ...data,
                  installmentId: opt ? Number(opt.value) : null,
                })
              }
              placeholder="Selecciona una cuota..."
            />
          )}

          <Select
            label="Banco"
            isLoading={isLoading}
            options={banks ?? []}
            value={
              banks?.find((b: BankOption) => b.value === data.bankCode) ?? null
            }
            onChange={(opt: SingleValue<BankOption>) =>
              onChange({ ...data, bankCode: opt?.value ?? "" })
            }
            placeholder="Selecciona tu banco..."
          />

          {!data.bankCode && (
            <Callout
              type="info"
              title="Selecciona un banco"
              description="Debes elegir tu banco para continuar con el pago a través de PSE."
            />
          )}
        </div>
      )}
    </div>
  );
}
