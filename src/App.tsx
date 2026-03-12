import "./App.css";
import {
  DollarSign,
  Clock,
  AlertCircle,
  FileText,
  Inbox,
  ArrowLeftRight,
} from "lucide-react";
import { Navbar } from "./features/navbar";
import { LoginForm } from "./features/auth";
import { ClientLookupForm } from "./features/client-lookup";
import { InvoiceList, InvoiceCard, InvoiceForm } from "./features/invoices";
import { PaymentSummaryCard, BankSelector } from "./features/payments";
import {
  TransactionList,
  TransactionStatusCard,
  TransactionStatusBadge,
} from "./features/transactions";
import { StatsCard } from "./features/dashboard";
import { EmptyState, Card, CardBody, Heading } from "./shared";
import type { Invoice } from "./features/invoices";
import type { Transaction } from "./features/transactions";
import type { PaymentSummary } from "./features/payments";

// --- Fixtures ---

const MOCK_INVOICE_PENDING: Invoice = {
  id: "inv-1",
  externalId: "EDUFAST-1234",
  amount: 850000,
  currency: "COP",
  subject: "Matrícula semestre 2025-1",
  receiverName: "Universidad EDUFAST",
  receiverId: "rec-1",
  senderDocument: "CC-1002500700",
  senderName: "Juan Pérez",
  senderEmail: "juan@mail.com",
  status: "pending",
  metadata: {},
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const MOCK_INVOICE_PAID: Invoice = {
  ...MOCK_INVOICE_PENDING,
  id: "inv-2",
  externalId: "EDUFAST-1100",
  status: "paid",
};

const MOCK_INVOICE_FAILED: Invoice = {
  ...MOCK_INVOICE_PENDING,
  id: "inv-3",
  externalId: "EDUFAST-0988",
  status: "failed",
};

const MOCK_INVOICE_CANCELLED: Invoice = {
  ...MOCK_INVOICE_PENDING,
  id: "inv-4",
  externalId: "EDUFAST-0750",
  status: "cancelled",
};

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "txn-aabbccdd",
    paymentId: "pay-1",
    provider: "pse",
    status: "pending",
    bankCode: "BANCOLOMBIA",
    bankName: "Bancolombia",
    amount: 850000,
    currency: "COP",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "txn-eeffgghh",
    paymentId: "pay-2",
    provider: "pse",
    status: "completed",
    bankCode: "DAVIVIENDA",
    bankName: "Davivienda",
    amount: 320000,
    currency: "COP",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "txn-iijjkkll",
    paymentId: "pay-3",
    provider: "pse",
    status: "failed",
    bankCode: "BBVA",
    bankName: "BBVA",
    amount: 150000,
    currency: "COP",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

const MOCK_PAYMENT_SUMMARY: PaymentSummary = {
  invoice: {
    externalReference: "EDUFAST-1234",
    description: "Matrícula semestre 2025-1",
    amount: 850000,
    currency: "COP",
  },
  payer: {
    name: "Juan Pérez",
    document: "CC 1002500700",
  },
  receiver: {
    name: "Universidad EDUFAST",
  },
  items: [
    { label: "Tuition fee", amount: 800000, type: "subtotal" },
    { label: "Processing fee (PSE)", amount: 50000, type: "fee" },
  ],
  total: 850000,
};

// --- Section wrapper ---

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-14">
      <Heading
        variant="h4"
        weight="bold"
        color="secondary"
        className="mb-4 pb-2 border-b border-gray-200"
      >
        {title}
      </Heading>
      {children}
    </section>
  );
}

// --- App ---

function App() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <Heading variant="h2" weight="bold" className="mb-10">
          Components Showcase
        </Heading>

        {/* ── Navbar ── */}
        <Section title="Navbar">
          <p className="text-sm text-gray-500 mb-3">
            Rendered above (reads role from session).
          </p>
        </Section>

        {/* ── StatsCard ── */}
        <Section title="StatsCard — all color variants">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatsCard
              title="Total Collected"
              value="$1,234,567"
              icon={DollarSign}
              color="success"
            />
            <StatsCard
              title="Pending Payments"
              value="$45,000"
              icon={Clock}
              color="warning"
            />
            <StatsCard
              title="Failed"
              value="$12,000"
              icon={AlertCircle}
              color="danger"
            />
            <StatsCard
              title="Total Invoices"
              value="156"
              icon={FileText}
              color="primary"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <StatsCard
              title="With trend up"
              value="$980,000"
              icon={DollarSign}
              color="success"
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard
              title="With trend down"
              value="$45,000"
              icon={Clock}
              color="warning"
              trend={{ value: 8, isPositive: false }}
            />
          </div>
        </Section>

        {/* ── TransactionStatusBadge ── */}
        <Section title="TransactionStatusBadge — all statuses">
          <div className="flex items-center gap-3">
            <TransactionStatusBadge status="pending" />
            <TransactionStatusBadge status="completed" />
            <TransactionStatusBadge status="failed" />
          </div>
        </Section>

        {/* ── EmptyState ── */}
        <Section title="EmptyState — without / with action">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardBody>
                <EmptyState
                  icon={Inbox}
                  title="No items found"
                  description="There are no items to display at this time."
                />
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <EmptyState
                  icon={ArrowLeftRight}
                  title="No transactions yet"
                  description="Transactions will appear here once payments are initiated."
                  action={
                    <button className="px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-md">
                      Create Invoice
                    </button>
                  }
                />
              </CardBody>
            </Card>
          </div>
        </Section>

        {/* ── InvoiceCard ── */}
        <Section title="InvoiceCard — all statuses">
          <div className="space-y-3">
            <InvoiceCard invoice={MOCK_INVOICE_PENDING} showPayButton />
            <InvoiceCard invoice={MOCK_INVOICE_PAID} />
            <InvoiceCard invoice={MOCK_INVOICE_FAILED} />
            <InvoiceCard invoice={MOCK_INVOICE_CANCELLED} />
          </div>
        </Section>

        {/* ── InvoiceList ── */}
        <Section title="InvoiceList — with items / loading / empty">
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">
                With items + create button
              </p>
              <InvoiceList
                invoices={[MOCK_INVOICE_PENDING, MOCK_INVOICE_PAID]}
                showPayButton
                showCreateButton
              />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Loading state</p>
              <InvoiceList invoices={[]} isLoading />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">
                Empty state (no create)
              </p>
              <InvoiceList invoices={[]} />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">
                Empty state (with create)
              </p>
              <InvoiceList invoices={[]} showCreateButton />
            </div>
          </div>
        </Section>

        {/* ── InvoiceForm ── */}
        <Section title="InvoiceForm — open state">
          <Card>
            <CardBody>
              <InvoiceForm isOpen onClose={() => {}} />
            </CardBody>
          </Card>
        </Section>

        {/* ── PaymentSummaryCard ── */}
        <Section title="PaymentSummaryCard">
          <div className="max-w-sm">
            <PaymentSummaryCard summary={MOCK_PAYMENT_SUMMARY} />
          </div>
        </Section>

        {/* ── BankSelector ── */}
        <Section title="BankSelector">
          <div className="max-w-sm">
            <BankSelector value="" onChange={() => {}} />
          </div>
        </Section>

        {/* ── TransactionList ── */}
        <Section title="TransactionList — with items / loading / empty">
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">With items</p>
              <TransactionList transactions={MOCK_TRANSACTIONS} />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Loading state</p>
              <TransactionList transactions={[]} isLoading />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Empty state</p>
              <TransactionList transactions={[]} />
            </div>
          </div>
        </Section>

        {/* ── TransactionStatusCard ── */}
        <Section title="TransactionStatusCard — pending / completed / failed">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TransactionStatusCard
              transactionId="txn-aabbccdd"
              initialTransaction={MOCK_TRANSACTIONS[0]}
            />
            <TransactionStatusCard
              transactionId="txn-eeffgghh"
              initialTransaction={MOCK_TRANSACTIONS[1]}
            />
            <TransactionStatusCard
              transactionId="txn-iijjkkll"
              initialTransaction={MOCK_TRANSACTIONS[2]}
            />
          </div>
        </Section>

        {/* ── LoginForm ── */}
        <Section title="LoginForm">
          <div className="max-w-md">
            <LoginForm />
          </div>
        </Section>

        {/* ── ClientLookupForm ── */}
        <Section title="ClientLookupForm">
          <div className="max-w-md">
            <ClientLookupForm />
          </div>
        </Section>
      </main>
    </>
  );
}

export default App;
