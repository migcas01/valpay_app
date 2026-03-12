export interface Invoice {
  id: string;
  externalReference: string;
  amount: number;
  currency: string;
  description: string;
  receiverName: string;
  receiverId: string;
  senderDocument: string;
  senderName: string;
  senderEmail?: string;
  senderPhone?: string;
  status: "pending" | "paid" | "failed" | "cancelled";
  paymentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInvoicePayload {
  amount: number;
  currency: string;
  description: string;
  receiverId: string;
  senderDocument: string;
  senderName: string;
  senderEmail?: string;
  senderPhone?: string;
}

export interface InvoiceListResponse {
  data: Invoice[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}
