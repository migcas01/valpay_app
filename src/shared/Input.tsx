import type { LucideIcon } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  label?: string;
  icon?: LucideIcon;
}

export function Input({
  label,
  type,
  placeholder,
  icon: Icon,
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">
      <label>
        {label && (
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
            {label}
          </span>
        )}
        <div className="relative">
          {Icon && (
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <Icon size={20} />
            </span>
          )}
          <input
            type={type}
            placeholder={placeholder}
            className={[
              "block w-full pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none placeholder:text-gray-400",
              Icon ? "pl-10" : "pl-2.5",
            ].join(" ")}
            {...props}
          />
        </div>
      </label>
    </div>
  );
}
