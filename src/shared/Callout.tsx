import { Info, CircleCheck, CircleX, CircleAlert } from "lucide-react";

const calloutStyles = {
  type: {
    info: {
      background: "bg-sky-50 border-sky-200",
      title: "text-sky-900",
      description: "text-sky-700/80",
      icon: <Info size={20} className="text-blue-500" />,
    },
    success: {
      background: "border-emerald-200 bg-emerald-50 font-bold text-emerald-700",
      title: "text-emerald-900",
      description: "text-emerald-700/80",
      icon: <CircleCheck size={20} className="text-emerald-500" />,
    },
    warning: {
      background: "border-amber-200 bg-amber-50 font-bold text-amber-700",
      title: "text-amber-900",
      description: "text-amber-700/80",
      icon: <CircleAlert size={20} className="text-amber-500" />,
    },
    error: {
      background: "border-red-200 bg-red-50 font-bold text-red-700",
      title: "text-red-900",
      description: "text-red-700/80",
      icon: <CircleX size={20} className="text-red-500" />,
    },
  },
  size: {
    small: "text-xs",
    medium: "text-sm",
    large: "text-md",
  },
  weight: {
    normal: "font-normal",
    medium: "font-medium",
    bold: "font-bold",
  },
};

interface CalloutProps extends Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "className"
> {
  title: string;
  description: string;
  type?: keyof typeof calloutStyles.type;
}

export function Callout({
  type = "info",
  title,
  description,
  ...props
}: CalloutProps) {
  return (
    <div
      className={`flex gap-4 p-4 rounded-lg border ${calloutStyles["type"][type]["background"]}`}
      {...props}
    >
      <div className="shrink-0">{calloutStyles["type"][type]["icon"]}</div>
      <div className="flex flex-col gap-1">
        <h4
          className={`text-sm font-bold leading-none ${calloutStyles["type"][type]["title"]}`}
        >
          {title}
        </h4>
        <p
          className={`text-sm leading-relaxed ${calloutStyles["type"][type]["description"]}`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
