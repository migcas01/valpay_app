import type { Invoice } from "../types";

export const isPayable = (invoice: Invoice) => invoice.status === "pending";
