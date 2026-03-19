// Re-exports for backwards compatibility inside the invoices feature.
// The actual implementation lives in features/payments/api/paymentsApi.ts
export {
  createTransactionIntent as createPaymentIntent,
  getPseBanks as getBanks,
} from "../../payments/api/paymentsApi";
