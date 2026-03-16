import { ArrowRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Chip,
  Heading,
  Text,
  Link,
  Button,
} from "../../../shared";
import { formatCurrency } from "../../../utils";
import type { Invoice } from "../types";

interface InvoiceCardProps {
  invoice: Invoice;
}

const statusConfig = {
  pending: { color: "default", label: "Pending" },
  partial: { color: "warning", label: "Partial" },
  completed: { color: "success", label: "Paid" },
  failed: { color: "danger", label: "Failed" },
  refunded: { color: "secondary", label: "Cancelled" },
} as const;

export function InvoiceCard({ invoice }: InvoiceCardProps) {
  const { color, label } = statusConfig[invoice.status];

  return (
    <Card>
      <CardHeader className="flex w-full justify-between items-center">
        <div>
          <Heading variant="h4">Invoice {invoice.externalId}</Heading>
          <Text>{invoice.subject}</Text>
        </div>
        <Chip color={color}>{label}</Chip>
      </CardHeader>
      <CardBody>
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <Heading
              variant="h5"
              className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"
            >
              Client
            </Heading>
            <Text className="text-sm font-semibold text-gray-800">
              {"No name"}
            </Text>
          </div>
          <div className="sm:text-right">
            <Heading
              variant="h5"
              className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"
            >
              Expiration
            </Heading>
            <Text className="text-sm font-semibold text-gray-800">No date</Text>
          </div>
        </section>

        <section>
          <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-100/50">
                  <th className="px-4 py-3 text-xs font-bold text-gray-600 uppercase">
                    Concept
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-600 uppercase text-right">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-600 uppercase text-right">
                    Pricing
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-800">Item 1</td>
                  <td className="px-4 py-3 text-sm text-gray-600 text-right">
                    1
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800 font-medium text-right">
                    $120.000
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-800">Item 2</td>
                  <td className="px-4 py-3 text-sm text-gray-600 text-right">
                    1
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800 font-medium text-right">
                    $30.000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </CardBody>
      <CardFooter className="flex flex-row justify-between items-center">
        <section className="flex flex-col">
          <Text>Subtotal</Text>
          <Text>{formatCurrency(invoice.amount, invoice.currency)}</Text>
        </section>
        <section>
          {invoice.status !== "completed" && (
            <Link to={`/pay/${invoice.id}`} underline="none">
              <Button className="flex flex-row self-end">
                <section>
                  <ArrowRight className="h-4 w-4" />
                </section>
                <p>Pay</p>
              </Button>
            </Link>
          )}
        </section>
      </CardFooter>
    </Card>
  );
}
