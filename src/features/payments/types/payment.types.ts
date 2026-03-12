export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  method: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentPayload {
  invoiceId: string;
  method: "pse" | "card" | "cash";
}

export interface PaymentSummary {
  invoice: {
    externalReference: string;
    description: string;
    amount: number;
    currency: string;
  };
  payer: {
    name: string;
    document: string;
  };
  receiver: {
    name: string;
  };
  items: PaymentItem[];
  total: number;
}

export interface PaymentItem {
  label: string;
  amount: number;
  type: "subtotal" | "fee" | "tax";
}
