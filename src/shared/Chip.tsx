const chipStyles = {
  color: {
    default: "bg-gray-100 text-gray-600 border border-gray-200",
    primary: "bg-amber-50 text-amber-700 border border-amber-200",
    secondary: "bg-gray-50 text-gray-700 border border-gray-200",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    warning: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    danger: "bg-red-50 text-red-700 border border-red-200",
  },
  dotColor: {
    default: "bg-gray-400",
    primary: "bg-amber-500",
    secondary: "bg-gray-500",
    success: "bg-emerald-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
  },
  size: {
    small: "text-xs px-2 py-1",
    medium: "text-sm px-2 py-1.5",
    large: "text-md px-4 py-2",
  },
  weight: {
    normal: "font-normal",
    medium: "font-medium",
    bold: "font-bold",
  },
};

interface ChipProps extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> {
  children: React.ReactNode;
  color?: keyof typeof chipStyles.color;
  size?: keyof typeof chipStyles.size;
  weight?: keyof typeof chipStyles.weight;
}

export function Chip({
  color = "default",
  size = "medium",
  weight = "normal",
  children,
  ...props
}: ChipProps) {
  return (
    <span
      className={[
        "gap-1.5 inline-flex items-center m-2 px-3 py-1 rounded-full text-xs font-bold",
        chipStyles["color"][color],
        chipStyles["size"][size],
        chipStyles["weight"][weight],
      ].join(" ")}
      {...props}
    >
      <span
        className={[
          "w-1.5 h-1.5 rounded-full",
          chipStyles["dotColor"][color],
        ].join(" ")}
      ></span>
      {children}
    </span>
  );
}
