import { useSearchParams } from "react-router";
import { Link } from "../shared";
import { TransactionStatusCard } from "../features/transactions";

// PSE redirects back here after the bank flow with ?transactionId=...
export function PayReturnPage() {
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get("transactionId") ?? "";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-lg space-y-6">
        {transactionId ? (
          <TransactionStatusCard transactionId={transactionId} />
        ) : (
          <div className="text-center">
            <p className="text-gray-600">No transaction reference found.</p>
          </div>
        )}
        <div className="text-center">
          <Link to="/pay" color="secondary">
            Make another payment
          </Link>
        </div>
      </div>
    </div>
  );
}
