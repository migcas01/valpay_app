export type InvoiceStatus =
  | "pending"
  | "partial"
  | "completed"
  | "failed"
  | "refunded";

export interface Invoice {
  id: number;
  externalId: string;
  subject: string;
  currency: string;
  amount: number;
  status: InvoiceStatus;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateIntentPayload {
  "invoiceId": 1,
  "amount": 75000,
  "providerCode": "PSE",
  "description": "A transaction",
  "identificationType": "CC",
  "identificationNumber": "1002582736",
  "redirectUrl": "https://valpay.com/terminate?ticketId=123456",
  "bankCode": "1022",
  "fullName": "Miguel Angel Castillo Amador",
  "email": "miguel126xl9@outlook.es",
  "phoneNumber": "3187137398",
  "address": "Calle 71 Sur #88-21"
}

export interface CreateIntentResponse {
  "status": "PENDING",
  "amount": 75000,
  "gatewayUrl": "https://registro.desarrollo.pse.com.co/PSENF/index.html?enc=0q%2b8AVCq4lJvE8QKeAi0rKoalrlS%2bqxWlpxpVRpSye0%3d",
  "externalId": "5429211",
  "requestAt": "2026-03-15T22:56:42.878Z",
  "transactionId": 2,
  "invoiceId": 1
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
