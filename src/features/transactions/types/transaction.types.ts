export type TransactionStatus = "pending" | "completed" | "failed";

export interface Transaction {
  id: string;
  paymentId: string;
  externalId?: string;
  provider: "pse" | "card" | "cash";
  status: TransactionStatus;
  bankCode?: string;
  bankName?: string;
  amount: number;
  currency: string;
  returnUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionListResponse {
  data: Transaction[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface TransactionEvent {
  type: "status_change";
  status: TransactionStatus;
  message: string;
  timestamp: string;
}
