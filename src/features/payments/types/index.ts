// ── Payment status ────────────────────────────────────────────
export type PaymentStatusCode = "ACTIVE" | "PARTIAL" | "PAID" | "OVERDUE";

export type InstallmentStatusCode =
  | "PENDING"
  | "PARTIAL"
  | "PAID"
  | "OVERDUE";

// ── Transaction status (raw API codes) ───────────────────────
export type TransactionStatusCode =
  | "PENDING"
  | "SUCCESS"
  | "FAILED"
  | "NOT_AUTHORIZED"
  | "AUTHORIZED"
  | "REFUNDED"
  | "VOIDED";

// ── PSE Banks ────────────────────────────────────────────────
export interface PseBank {
  code: string;
  name: string;
}

export type PseBanksResponse = PseBank[];

export interface BankOption {
  value: string;
  label: string;
}

// ── Payment items ────────────────────────────────────────────
export interface PaymentItem {
  label: string;
  amount: number;
  type?: "fixed" | "percent";
}

export interface ConceptItem {
  label: string;
  amount: number;
}

// ── Installments ─────────────────────────────────────────────
export interface TransactionInstallment {
  id: number;
  number: number;
  dueDate: string;
  InstallmentStatus: { code: InstallmentStatusCode };
  concept: ConceptItem[];
  total: number;
}

// ── Payment entity ───────────────────────────────────────────
export interface Payment {
  id: number;
  externalId: string;
  subject: string;
  installments: number;
  billingAnchor: string;
  PaymentStatus: { code: PaymentStatusCode };
  TransactionInstallments: TransactionInstallment[];
}

// ── Create payment ────────────────────────────────────────────
export interface CreatePaymentPayload {
  externalId: string;
  subject: string;
  currencyCode: string;
  items: PaymentItem[];
  installments?: number;
  billingAnchor?: string;
}

// ── List payments ─────────────────────────────────────────────
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

// ── Transaction intent ────────────────────────────────────────
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
  externalId: string;
  requestAt: string;
  transactionId: number;
  paymentId: number;
  concept: ConceptItem[];
}

// ── Confirm transaction ───────────────────────────────────────
export type ConfirmStatusCode =
  | "PENDING"
  | "SUCCESS"
  | "FAILED"
  | "NOT_AUTHORIZED"
  | "AUTHORIZED"
  | "REFUNDED"
  | "VOIDED";

export interface ConfirmTransactionResponse {
  status: ConfirmStatusCode;
  invoiceNumber?: number;
  amount?: number;
  externalId?: string;
}
