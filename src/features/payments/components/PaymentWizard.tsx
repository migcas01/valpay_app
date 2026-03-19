import { useState } from "react";
import { ArrowLeft, Shield } from "lucide-react";
import { Stepper, Button, Callout, Spinner } from "@/shared";
import { StepBasicInfo } from "./StepBasicInfo";
import { StepPaymentMethod } from "./StepPaymentMethod";
import { StepConfirmation } from "./StepConfirmation";
import { usePayment } from "../hooks/usePayment";
import { useCreateTransactionIntent } from "../hooks/useCreateTransactionIntent";
import { formatCurrency } from "@/utils/formatCurrency";
import type { BasicInfoData } from "./StepBasicInfo";
import type { PaymentMethodData } from "./StepPaymentMethod";
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

export function PaymentWizard({ paymentId, returnUrl }: PaymentWizardProps) {
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
    installmentId: null,
  });
  const [intent, setIntent] = useState<TransactionIntentResponse | null>(null);

  const { data: payment, isLoading: loadingPayment, error: paymentError } =
    usePayment(paymentId);
  const { mutate: createIntent, isPending: submitting, error: intentError } =
    useCreateTransactionIntent();

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

  const installments = payment.TransactionInstallments ?? [];
  // If only one installment, auto-select it
  const resolvedInstallmentId =
    paymentMethod.installmentId ??
    (installments.length === 1 ? installments[0].id : null);

  const selectedInstallment = installments.find(
    (i) => i.id === resolvedInstallmentId
  );

  // Validation per step
  const step0Valid =
    basicInfo.fullName.trim() !== "" &&
    basicInfo.email.trim() !== "" &&
    basicInfo.phoneNumber.trim() !== "" &&
    basicInfo.documentNumber.trim() !== "" &&
    basicInfo.address.trim() !== "";

  const step1Valid =
    paymentMethod.bankCode !== "" && resolvedInstallmentId !== null;

  function handleSubmit() {
    if (!resolvedInstallmentId) return;

    const effectiveReturnUrl =
      returnUrl ?? `${window.location.origin}/pay/return`;

    createIntent(
      {
        paymentId,
        installmentId: resolvedInstallmentId,
        providerCode: "PSE",
        returnUrl: effectiveReturnUrl,
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
      }
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F9FC] flex items-start justify-center p-4 pt-8">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-[#32325d]">
            {payment.subject}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Ref: {payment.externalId}
          </p>
          {selectedInstallment && (
            <p className="text-xl font-bold text-amber-500 mt-2">
              {formatCurrency(selectedInstallment.total, "COP")}
            </p>
          )}
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <Stepper steps={STEPS} currentStep={step} />
        </div>

        {/* Card */}
        <div className="bg-white rounded-[20px] shadow-[0_15px_35px_0_rgba(50,50,93,0.1)] p-6 space-y-6">
          {/* Step 0 — Basic info */}
          {step === 0 && (
            <StepBasicInfo data={basicInfo} onChange={setBasicInfo} />
          )}

          {/* Step 1 — Payment method */}
          {step === 1 && (
            <StepPaymentMethod
              data={{ ...paymentMethod, installmentId: resolvedInstallmentId }}
              onChange={setPaymentMethod}
              installments={installments}
            />
          )}

          {/* Step 2 — Confirmation */}
          {step === 2 && intent && (
            <StepConfirmation
              intent={intent}
              onRetry={() => {
                setIntent(null);
                setStep(1);
              }}
            />
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
                <Button
                  disabled={!step0Valid}
                  onClick={() => setStep(1)}
                >
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

        <p className="text-center text-xs text-gray-400 mt-4">
          Powered by <span className="font-black text-gray-600">Valpay</span>
        </p>
      </div>
    </div>
  );
}
