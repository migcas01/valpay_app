import { ExternalLink } from "lucide-react";
import { Heading, Text, Spinner } from "@/shared";
import type { TransactionIntentResponse } from "../types";
import { useEffect } from "react";

interface StepConfirmationProps {
  intent: TransactionIntentResponse;
}

export function StepConfirmation({ intent }: StepConfirmationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = intent.gatewayUrl;
    }, 1500);
    return () => clearTimeout(timer);
  }, [intent.gatewayUrl]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
      <Spinner size="medium" color="primary" text="" />
      <Heading variant="h5" weight="bold">
        Redirigiendo al portal de tu banco...
      </Heading>
      <Text variant="small" color="secondary">
        Serás enviado automáticamente a PSE para completar el pago.
      </Text>
      <Text variant="small" color="secondary">
        Si no eres redirigido,{" "}
        <a
          href={intent.gatewayUrl}
          className="text-amber-600 font-semibold hover:underline inline-flex items-center gap-1"
        >
          haz clic aquí <ExternalLink size={12} />
        </a>
      </Text>
    </div>
  );
}
