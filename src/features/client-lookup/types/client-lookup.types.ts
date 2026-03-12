export type DocumentType = "CC" | "NIT" | "CE" | "TI" | "RC" | "PA";

export interface ClientLookupParams {
  documentType: DocumentType;
  documentNumber: string;
}

export interface Invoice {
  id: string;
  externalReference: string;
  amount: number;
  currency: string;
  description: string;
  receiverName: string;
  senderDocument: string;
  senderName: string;
  status: "pending" | "paid" | "failed";
  paymentId?: string;
  createdAt: string;
}

export interface ClientLookupResponse {
  invoices: Invoice[];
}
