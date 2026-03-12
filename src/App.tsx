import "./App.css";
import { DollarSign, Clock, AlertCircle, FileText, Inbox } from "lucide-react";
import { Navbar } from "./features/navbar";
import { LoginForm } from "./features/auth";
import { ClientLookupForm } from "./features/client-lookup";
import { InvoiceList, InvoiceCard, InvoiceForm } from "./features/invoices";
import {
  PaymentSummaryCard,
  BankSelector,
  PaymentForm,
} from "./features/payments";
import {
  TransactionList,
  TransactionStatusCard,
  TransactionStatusBadge,
} from "./features/transactions";
import { StatsCard, DashboardAdmin } from "./features/dashboard";
import { EmptyState, Card, CardBody } from "./shared";

function App() {
  return (
    <>
      {/*<Navbar />*/}
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-8">Components Debug</h1>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            Navbar (conditionally rendered)
          </h2>
          <Navbar />
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">LoginForm</h2>
          <div className="max-w-md">{/*<LoginForm />*/}</div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">ClientLookupForm</h2>
          <ClientLookupForm />
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">StatsCard</h2>
          <div className="grid grid-cols-4 gap-4">
            <StatsCard
              title="Total Collected"
              value="$1,234,567"
              icon={DollarSign}
              color="success"
            />

            <StatsCard
              title="Pending"
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
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">TransactionStatusBadge</h2>
          <div className="flex gap-2">
            <TransactionStatusBadge status="pending" />
            <TransactionStatusBadge status="completed" />
            <TransactionStatusBadge status="failed" />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">EmptyState</h2>
          <Card>
            <CardBody>
              <EmptyState
                icon={Inbox}
                title="No items found"
                description="There are no items to display at this time."
              />
            </CardBody>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">EmptyState with action</h2>
          <Card>
            <CardBody>
              <EmptyState
                icon={Inbox}
                title="No invoices yet"
                description="Create your first invoice to get started."
                action={
                  <button className="px-4 py-2 bg-amber-500 text-white rounded-md">
                    Create Invoice
                  </button>
                }
              />
            </CardBody>
          </Card>
        </section>
      </main>
    </>
  );
}

export default App;
