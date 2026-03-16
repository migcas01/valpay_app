import type { Invoice } from "../types"

export const isPayable = (invoice: Invoice) => invoice.status === 'pending'

export const buildInvoiceSummary = (invoice: Invoice): PaymentSummary => ({
  invoice: {
    externalReference: invoice.externalId,
    description: invoice.subject,
    amount: invoice.amount,
    currency: 'COP',
  },
  payer:    { name: 'No name', document: 'XXXXXXXXXX' },
  receiver: { name: 'John Doe' },
  items:    [{ label: 'Subtotal', amount: invoice.amount, type: 'subtotal' }],
  total:    invoice.amount,
})
