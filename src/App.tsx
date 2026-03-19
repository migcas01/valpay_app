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
import { InvoiceList, InvoiceForm } from "./features/invoices";
import {
  TransactionList,
  TransactionStatusCard,
  TransactionStatusBadge,
} from "./features/transactions";
import { StatsCard } from "./features/dashboard";
import { EmptyState, Card, CardBody, Heading } from "./shared";
import type { Transaction } from "./features/transactions";

// --- Fixtures ---

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

        {/* ── StatsCard ── */}
        <Section title="StatsCard — all color variants">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatsCard title="Total Collected" value="$1,234,567" icon={DollarSign} color="success" />
            <StatsCard title="Pending Payments" value="$45,000" icon={Clock} color="warning" />
            <StatsCard title="Failed" value="$12,000" icon={AlertCircle} color="danger" />
            <StatsCard title="Total Invoices" value="156" icon={FileText} color="primary" />
          </div>
        </Section>

        {/* ── TransactionStatusBadge ── */}
        <Section title="TransactionStatusBadge">
          <div className="flex items-center gap-3">
            <TransactionStatusBadge status="pending" />
            <TransactionStatusBadge status="completed" />
            <TransactionStatusBadge status="failed" />
          </div>
        </Section>

        {/* ── EmptyState ── */}
        <Section title="EmptyState">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardBody>
                <EmptyState icon={Inbox} title="No items found" description="There are no items to display." />
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <EmptyState
                  icon={ArrowLeftRight}
                  title="No transactions yet"
                  description="Transactions will appear here once payments are initiated."
                />
              </CardBody>
            </Card>
          </div>
        </Section>

        {/* ── InvoiceList ── */}
        <Section title="InvoiceList">
          <InvoiceList showCreateButton />
        </Section>

        {/* ── InvoiceForm ── */}
        <Section title="InvoiceForm">
          <Card>
            <CardBody>
              <InvoiceForm isOpen onClose={() => {}} />
            </CardBody>
          </Card>
        </Section>

        {/* ── TransactionList ── */}
        <Section title="TransactionList">
          <div className="space-y-6">
            <TransactionList transactions={MOCK_TRANSACTIONS} />
            <TransactionList transactions={[]} isLoading />
            <TransactionList transactions={[]} />
          </div>
        </Section>

        {/* ── TransactionStatusCard ── */}
        <Section title="TransactionStatusCard">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TransactionStatusCard transactionId="txn-aabbccdd" initialTransaction={MOCK_TRANSACTIONS[0]} />
            <TransactionStatusCard transactionId="txn-eeffgghh" initialTransaction={MOCK_TRANSACTIONS[1]} />
            <TransactionStatusCard transactionId="txn-iijjkkll" initialTransaction={MOCK_TRANSACTIONS[2]} />
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
