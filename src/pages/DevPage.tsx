import { PaymentSelector } from "../components/PaymentSelector";

export function DevPage() {
  return (
    <PaymentSelector
      amount="$100.00"
      onClose={() => console.log("Close clicked")}
      onSubmit={(data) => console.log("Payment data:", data)}
    />
  );
}
