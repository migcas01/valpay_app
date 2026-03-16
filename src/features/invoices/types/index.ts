export type InvoiceStatus =
  | "pending"
  | "partial"
  | "completed"
  | "failed"
  | "refunded";

export type IntentStatus =
  | "pending"
  | "authorized"
  | "not_authorized"
  | "success"
  | "failed"
  | "refunded"
  | "voided";

export interface InvoiceResponsible {
  documentType: string;
  documentNumber: string;
}

export interface Invoice {
  id: number;
  externalId: string;
  subject: string;
  amount: number;
  taxAmount: number;
  total: number;
  status: InvoiceStatus;
  currency: string;
  receiver: string;
  responsibles: InvoiceResponsible[];
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateIntentPayload {
  invoiceId: number;
  amount: number;
  providerCode: string;
  description: string;
  identificationType: string;
  identificationNumber: string;
  redirectUrl: string;
  bankCode: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface CreateIntentResponse {
  status: IntentStatus;
  amount: number;
  gatewayUrl: string;
  externalId: string;
  requestAt: string;
  transactionId: number;
  invoiceId: number;
}

export interface CreateInvoicePayload {
  externalId: string;
  amount: number;
  currency: string;
  description: string;
  metadata: Record<string, unknown>;
}

export interface InvoiceListResponse {
  data: Invoice[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface BankItem {
  code: string;
  name: string;
}

export type BankResponse = BankItem[];

export interface BankOption {
  value: string;
  label: string;
}
