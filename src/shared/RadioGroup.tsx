export interface RadioOption {
  icon: React.ReactNode;
  label: string;
  subtitle?: string;
  enabled?: boolean;
  active: boolean;
  value: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name: string;
}

export function RadioGroup({ options, value, onChange, name }: RadioGroupProps) {
  return (
    <fieldset className="space-y-3">
      {options.map((option) => {
        const isSelected = value ? value === option.value : option.active;
        const isEnabled = option.enabled !== false;

        return (
          <label
            key={option.value}
            className={[
              "block p-4 rounded-xl cursor-pointer transition-all",
              isSelected
                ? "border-2 border-amber-500 bg-white shadow-sm"
                : "border border-gray-100",
              !isEnabled && "opacity-60 cursor-not-allowed",
            ].join(" ")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={[
                    "w-10 h-7 rounded border flex items-center justify-center",
                    isEnabled
                      ? "bg-[#f6f9fc] border-gray-100"
                      : "bg-gray-50 border-gray-200",
                  ].join(" ")}
                >
                  {option.icon}
                </div>
                <div className="flex flex-col">
                  <span
                    className={[
                      "text-sm font-bold",
                      isEnabled ? "text-[#32325d]" : "text-gray-800",
                    ].join(" ")}
                  >
                    {option.label}
                  </span>
                  {option.subtitle && (
                    <span className="text-[11px] text-gray-500">
                      {option.subtitle}
                    </span>
                  )}
                </div>
              </div>
              <div
                className={[
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                  isSelected ? "border-amber-500" : "border-gray-300",
                ].join(" ")}
              >
                {isSelected && (
                  <div className="w-2.5 h-2.5 bg-amber-500 rounded-full"></div>
                )}
              </div>
            </div>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={isSelected}
              disabled={!isEnabled}
              onChange={() => isEnabled && onChange?.(option.value)}
              className="sr-only"
            />
          </label>
        );
      })}
    </fieldset>
  );
}
