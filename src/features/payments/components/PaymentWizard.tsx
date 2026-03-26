import { useState } from "react";
import { ArrowLeft, Shield } from "lucide-react";
import { Stepper, Button, Callout, Spinner, Heading, Text } from "@/shared";
import { usePayment } from "../hooks/usePayment";
import { useCreateTransactionIntent } from "../hooks/useCreateTransactionIntent";
import { formatCurrency } from "@/utils/formatCurrency";
import { type BasicInfoData, StepBasicInfo } from "./StepBasicInfo";
import { StepConfirmation } from "./StepConfirmation";
import { type PaymentMethodData, StepPaymentMethod } from "./StepPaymentMethod";
import type { TransactionIntentResponse } from "../types";

const STEPS = [
  { label: "Datos personales", description: "Quién paga" },
  { label: "Método de pago", description: "Banco PSE" },
  { label: "Confirmación", description: "Resultado" },
];

interface PaymentWizardProps {
  paymentId: number;
  returnUrl?: string;
}

export function PaymentWizard({
  paymentId,
  returnUrl,
}: PaymentWizardProps) {
  const [step, setStep] = useState(0);
  const [basicInfo, setBasicInfo] = useState<BasicInfoData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    documentType: "CC",
    documentNumber: "",
    address: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodData>({
    method: "pse",
    bankCode: "",
  });
  const [intent, setIntent] = useState<TransactionIntentResponse | null>(null);

  const {
    data: payment,
    isLoading: loadingPayment,
    error: paymentError,
  } = usePayment(paymentId);
  const {
    mutate: createIntent,
    isPending: submitting,
    error: intentError,
  } = useCreateTransactionIntent();

  if (loadingPayment) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <Spinner size="medium" color="primary" text="Cargando pago..." />
      </div>
    );
  }

  if (paymentError || !payment) {
    return (
      <Callout
        type="error"
        title="No se pudo cargar el pago"
        description={
          paymentError instanceof Error
            ? paymentError.message
            : "Payment not found"
        }
      />
    );
  }

  const installments = payment.installments ?? [];
  const firstInstallment = installments[0] ?? null;

  // Validation per step
  const step0Valid =
    basicInfo.fullName.trim() !== "" &&
    basicInfo.email.trim() !== "" &&
    basicInfo.phoneNumber.trim() !== "" &&
    basicInfo.documentNumber.trim() !== "" &&
    basicInfo.address.trim() !== "";

  const step1Valid =
    paymentMethod.bankCode !== "" && firstInstallment !== null;

  function handleSubmit() {
    if (!firstInstallment) return;

    // Build a temporary returnUrl with paymentId — transactionId gets appended after intent is created
    const baseReturn = returnUrl ?? `${window.location.origin}/pay/return`;

    createIntent(
      {
        paymentId,
        installmentId: firstInstallment.id,
        methodCode: "PSE",
        returnUrl: `${baseReturn}?paymentId=${paymentId}&transactionId={transactionId}`,
        sender: {
          documentType: basicInfo.documentType,
          documentNumber: basicInfo.documentNumber,
        },
        bankCode: paymentMethod.bankCode,
        fullName: basicInfo.fullName.toLowerCase(),
        email: basicInfo.email,
        phoneNumber: basicInfo.phoneNumber,
        identificationType: basicInfo.documentType,
        identificationNumber: basicInfo.documentNumber,
        address: basicInfo.address,
      },
      {
        onSuccess: (data) => {
          setIntent(data);
          setStep(2);
        },
      },
    );
  }

  return (
    <div className="flex flex-1 flex-row bg-inherit items-stretch justify-center">
      {/* (Left) Payment summary */}
      <div className="flex-1 p-4 bg-gray-100">
        <div className="h-full flex flex-col justify-center items-start p-6">
          <div className="h-3/4 w-full flex flex-col justify-start items-start p-8">
            <Text className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              Total a pagar
            </Text>
            <Heading variant="h1" className="text-5xl font-extrabold text-slate-900 mt-1">
              {formatCurrency(payment.total, "COP")}
            </Heading>

            <div className="mt-6">
              <Text className="text-base font-semibold text-slate-700">
                {payment.subject}
              </Text>
              <Text className="text-xs text-slate-400 mt-0.5 font-mono">
                {payment.externalReference}
              </Text>
            </div>

            <div className="w-full mt-6 space-y-2.5">
              {payment.concept.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="w-full flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/80 px-4 py-3"
                >
                  <Text className="text-sm text-slate-600">
                    {item.label}
                  </Text>
                  <Text className="text-sm font-semibold text-slate-800 tabular-nums">
                    {formatCurrency(item.amount, "COP")}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* (Right) Payment form */}
      <div className="flex-1 p-4 bg-white">
        <div className="h-full flex flex-col justify-center items-center p-6">
          <div className="h-3/4 w-full flex flex-col justify-center items-center">
            {/* Stepper */}
            <div className="mb-8">
              <Stepper steps={STEPS} currentStep={step} />
            </div>

            {/* Card */}
            <div className="bg-white w-full h-[500px] p-6 space-y-6 overflow-hidden flex flex-col justify-center">
              {/* Step 0 — Basic info */}
              {step === 0 && (
                <StepBasicInfo data={basicInfo} onChange={setBasicInfo} />
              )}

              {/* Step 1 — Payment method */}
              {step === 1 && (
                <StepPaymentMethod
                  data={paymentMethod}
                  onChange={setPaymentMethod}
                />
              )}

              {/* Step 2 — Confirmation */}
              {step === 2 && intent && (
                <StepConfirmation intent={intent} />
              )}

              {/* Intent error */}
              {intentError && step === 1 && (
                <Callout
                  type="error"
                  title="Error al crear el pago"
                  description={
                    intentError instanceof Error
                      ? intentError.message
                      : "Ocurrió un error. Inténtalo de nuevo."
                  }
                />
              )}

              {/* Navigation */}
              {step < 2 && (
                <div className="flex items-center justify-between pt-2">
                  {step > 0 ? (
                    <Button
                      color="secondary"
                      size="small"
                      onClick={() => setStep((s) => s - 1)}
                      disabled={submitting}
                    >
                      <ArrowLeft size={16} />
                      Atrás
                    </Button>
                  ) : (
                    <span />
                  )}

                  {step === 0 && (
                    <Button disabled={!step0Valid} onClick={() => setStep(1)}>
                      Continuar
                    </Button>
                  )}

                  {step === 1 && (
                    <Button
                      disabled={!step1Valid || submitting}
                      onClick={handleSubmit}
                    >
                      {submitting ? (
                        <Spinner size="small" color="primary" text="" />
                      ) : (
                        <>
                          <Shield size={16} />
                          Pagar ahora
                        </>
                      )}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
