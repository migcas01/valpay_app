import { Select } from "@/shared";
import { Building2 } from "lucide-react";
import type { SingleValue } from "react-select";
import { useBanks } from "../hooks/useBanks";
import type { BankOption } from "../types"

interface BankSelectorProps {
  value: BankOption | null;
  onChange: (option: BankOption | null) => void;
}

export function BankSelector({ value, onChange }: BankSelectorProps) {
  const { data: options, isLoading, isError } = useBanks();

  return (
    <Select
      label="Select Bank"
      isDisabled={isLoading || isError}
      options={options}
      value={value}
      onChange={(option: SingleValue<BankOption>) => onChange(option ?? null)}
      icon={Building2}
      placeholder="Choose a bank..."
    />
  );
}
