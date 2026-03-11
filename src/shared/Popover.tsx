import { useState } from "react";
import { Info, CircleCheck, CircleX, CircleAlert } from "lucide-react";

const popoverStyles = {
  variant: {
    default: {
      background: "bg-gray-50 border-gray-200",
      title: "text-gray-900",
      description: "text-gray-600",
      icon: null,
    },
    info: {
      background: "bg-sky-50 border-sky-200",
      title: "text-sky-900",
      description: "text-sky-700/80",
      icon: <Info size={16} className="text-blue-500" />,
    },
    success: {
      background: "bg-emerald-50 border-emerald-200",
      title: "text-emerald-900",
      description: "text-emerald-700/80",
      icon: <CircleCheck size={16} className="text-emerald-500" />,
    },
    warning: {
      background: "bg-amber-50 border-amber-200",
      title: "text-amber-900",
      description: "text-amber-700/80",
      icon: <CircleAlert size={16} className="text-amber-500" />,
    },
    error: {
      background: "bg-red-50 border-red-200",
      title: "text-red-900",
      description: "text-red-700/80",
      icon: <CircleX size={16} className="text-red-500" />,
    },
  },
};

interface PopoverProps extends Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "children"
> {
  children: React.ReactNode;
  title?: string;
  description?: string;
  variant?: keyof typeof popoverStyles.variant;
}

export function Popover({
  children,
  title,
  description,
  variant = "default",
  className,
  ...props
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block" {...props}>
      <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="cursor-pointer"
      >
        {children}
      </div>
      {isOpen && (
        <div
          className={[
            "absolute z-50 w-64 rounded-lg border p-3 shadow-lg",
            popoverStyles["variant"][variant]["background"],
            className ?? "",
          ].join(" ")}
        >
          <div className="flex flex-row gap-2">
            {popoverStyles["variant"][variant]["icon"] && (
              <div className="mb-2">
                {popoverStyles["variant"][variant]["icon"]}
              </div>
            )}
            {title && (
              <h4
                className={`text-sm font-bold leading-none ${popoverStyles["variant"][variant]["title"]}`}
              >
                {title}
              </h4>
            )}
          </div>

          {description && (
            <p
              className={`mt-1 text-xs leading-relaxed ${popoverStyles["variant"][variant]["description"]}`}
            >
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
