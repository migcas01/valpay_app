// ── Payment status ────────────────────────────────────────────
export type PaymentStatusCode = "ACTIVE" | "OVERDUE" | "PARTIAL" | "PAID" | "CANCELLED";

export type InstallmentStatusCode = "PAID" | "PARTIAL" | "OVERDUE" | "PENDING" | "CANCELLED";

export type TransactionStatusCode =
  | "INITIALIZED"
  | "PENDING"
  | "AUTHORIZED"
  | "NOT_AUTHORIZED"
  | "SUCCESS"
  | "FAILED"
  | "REFUNDED"
  | "VOIDED";

export interface PseBank {
  code: string;
  name: string;
}

export type PseBanksResponse = PseBank[];

export interface BankOption {
  value: string;
  label: string;
}

export interface PaymentItem {
  label: string;
  amount: number;
  type?: "fixed" | "percent";
}

export interface ConceptItem {
  label: string;
  amount: number;
}

export interface PaymentInstallment {
  id: number;
  amount: number;
  dueDate: string;
  installmentStatus: InstallmentStatusCode;
}

export interface Payment {
  id: number;
  currency: string;
  externalReference: string;
  subject: string;
  billingAnchor: string;
  receiverName: string;
  status: PaymentStatusCode;
  concept: ConceptItem[];
  total: number;
  installments: PaymentInstallment[];
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentPayload {
  externalReference: string;
  subject: string;
  currencyCode: string;
  items: PaymentItem[];
  installments?: number;
  billingAnchor?: string;
}

export interface PaymentListParams {
  page?: number;
  limit?: number;
  sort?: "created_at" | "updated_at";
  order?: "ASC" | "DESC";
  search?: string;
}

export interface PaymentListResponse {
  data: Payment[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface TransactionIntentPayload {
  paymentId: number;
  installmentId: number;
  methodCode: "PSE";
  returnUrl: string;
  amount?: number; // optional: partial payment
  sender: {
    documentType: string;
    documentNumber: string;
  };
  bankCode: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  identificationType: string;
  identificationNumber: string;
  address: string;
}

export interface TransactionIntentResponse {
  status: "pending";
  amount: number;
  gatewayUrl: string;
  externalReference: string;
  requestAt: string;
  transactionId: number;
  paymentId: number;
}

export interface ConfirmTransactionResponse {
  status: TransactionStatusCode;
  invoiceNumber?: number;
  amount?: number;
  externalReference?: string;
}
