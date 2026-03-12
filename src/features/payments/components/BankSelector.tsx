import { Building2 } from "lucide-react";
import { Select, Spinner, Callout } from "../../../shared";
import { useBanks } from "../hooks/useBanks";
import type { SingleValue } from "react-select";
import type { PseBank } from "../types/bank.types";

interface SelectOption {
  value: string;
  label: string;
}

interface BankSelectorProps {
  value: string;
  onChange: (bankCode: string) => void;
}

export function BankSelector({ value, onChange }: BankSelectorProps) {
  const { data, isLoading, error } = useBanks();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Spinner text="Loading banks..." size="small" color="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Callout
        type="error"
        title="Failed to load banks"
        description="Please refresh the page and try again."
      />
    );
  }

  const options: SelectOption[] = (data?.data ?? []).map((bank: PseBank) => ({
    value: bank.code,
    label: bank.name,
  }));

  const selectedOption = options.find((opt) => opt.value === value) ?? null;

  const handleChange = (option: unknown) => {
    const o = option as SingleValue<SelectOption>;
    if (o) onChange(o.value);
  };

  return (
    <Select
      label="Select Bank"
      options={options}
      value={selectedOption}
      onChange={handleChange}
      icon={Building2}
      placeholder="Choose a bank..."
    />
  );
}
