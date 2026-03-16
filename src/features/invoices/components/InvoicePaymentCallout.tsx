import { Callout } from "@/shared";

interface InvoicePaymentCalloutProps {
  type?: "success" | "warning" | "error",
  title: string,
  description: string
}

export function InvoicePaymentCallout({ type = "success", title , description }: InvoicePaymentCalloutProps) {
  return (
    <Callout
      type={type}
      title={title}
      description={description}
    />
  )
}
