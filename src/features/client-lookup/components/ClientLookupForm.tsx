import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Input, Select, Card, CardBody, Heading, Text, Callout } from "../../../shared";
import type { SingleValue } from "react-select";
import type { DocumentType } from "../types/client-lookup.types";

interface SelectOption {
  value: string;
  label: string;
}

const DOCUMENT_TYPES: SelectOption[] = [
  { value: "CC", label: "Cédula de Ciudadanía" },
  { value: "NIT", label: "Número de Identificación Tributaria" },
  { value: "CE", label: "Cédula de Extranjería" },
  { value: "TI", label: "Tarjeta de Identidad" },
  { value: "RC", label: "Registro Civil" },
  { value: "PA", label: "Pasaporte" },
];

export function ClientLookupForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);
    navigate(`/pay/lookup?docType=${documentType}&docNum=${encodeURIComponent(documentNumber)}`);
  };

  const handleDocumentTypeChange = (option: unknown) => {
    const o = option as SingleValue<SelectOption>;
    if (o) setDocumentType(o.value as DocumentType);
  };

  const selectedOption = DOCUMENT_TYPES.find((opt) => opt.value === documentType) ?? null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-md">
        <CardBody>
          <div className="text-center mb-8">
            <Heading variant="h2" weight="bold">
              Find Your Invoice
            </Heading>
            <Text color="secondary" className="mt-2">
              Enter your document information to view your pending invoices
            </Text>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <Callout type="error" title="Error" description={error} />}

            <Select
              label="Document Type"
              options={DOCUMENT_TYPES}
              value={selectedOption}
              onChange={handleDocumentTypeChange}
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
              disabled={isLoading}
            >
              {isLoading ? "Searching..." : "Search Invoices"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
