import { useState, useTransition } from "react";
import { useNavigate } from "react-router";
import { Button, Input, Select, Card, CardBody, Heading } from "../../../shared";
import type { DocumentType } from "../types/client-lookup.types";

const DOCUMENT_TYPES = [
  { value: "CC", label: "Cédula de Ciudadanía" },
  { value: "NIT", label: "Número de Identificación Tributaria" },
  { value: "CE", label: "Cédula de Extranjería" },
  { value: "TI", label: "Tarjeta de Identidad" },
  { value: "RC", label: "Registro Civil" },
  { value: "PA", label: "Pasaporte" },
];

export function ClientLookupForm() {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const [documentType, setDocumentType] = useState<DocumentType>("CC");
  const [documentNumber, setDocumentNumber] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!documentNumber.trim()) {
      setError("Please enter your document number");
      return;
    }

    startTransition(() => {
      navigate(
        `/pay/lookup?docType=${documentType}&docNum=${documentNumber}`
      );
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-md">
        <CardBody>
          <div className="text-center mb-8">
            <Heading variant="h2" weight="bold">
              Find Your Invoice
            </Heading>
            <p className="text-gray-600 mt-2">
              Enter your document information to view your pending invoices
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                {error}
              </div>
            )}

            <Select
              label="Document Type"
              options={DOCUMENT_TYPES}
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value as DocumentType)}
            />

            <Input
              label="Document Number"
              type="text"
              placeholder="Enter your document number"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
              required
            />

            <Button
              type="submit"
              color="primary"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? "Searching..." : "Search Invoices"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
