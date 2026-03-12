import { Building2 } from "lucide-react";
import { Select, Spinner } from "../../../shared";
import { useBanks } from "../hooks/useBanks";
import type { PseBank } from "../types/bank.types";

interface BankSelectorProps {
  value: string;
  onChange: (bankCode: string) => void;
  error?: string;
}

export function BankSelector({ value, onChange, error }: BankSelectorProps) {
  const { data, isLoading, error: banksError } = useBanks();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Spinner text="Loading banks..." size="small" color="primary" />
      </div>
    );
  }

  if (banksError) {
    return (
      <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
        Failed to load banks. Please try again.
      </div>
    );
  }

  const options = (data?.data ?? []).map((bank: PseBank) => ({
    value: bank.code,
    label: bank.name,
  }));

  return (
    <Select
      label="Select Bank"
      options={[
        { value: "", label: "Choose a bank" },
        ...options,
      ]}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      icon={Building2}
      error={error}
    />
  );
}
