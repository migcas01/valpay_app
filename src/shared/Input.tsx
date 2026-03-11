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
    <div className="w-full">
      {label && (
        <label className="block font-medium text-sm text-left text-gray-600 mb-1.5 font-sans">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          type={type}
          placeholder={placeholder}
          className="
            w-full
            text-gray-800
            bg-gray-50
            py-4
            px-3
            rounded-md
            border
            border-transparent
            placeholder:text-gray-500
            outline-none
            transition-all
            duration-200
            focus:border-amber-500
          "
          {...props}
        />

        {Icon && (
          <div className="absolute right-4 text-gray-400 pointer-events-none">
            <Icon size={20} />
          </div>
        )}
      </div>
    </div>
  );
}
