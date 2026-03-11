const badgeStyles = {
  color: {
    default: "border-gray-200 bg-gray-100 font-bold text-gray-600",
    primary: "border-amber-200 bg-amber-50 font-bold text-amber-700",
    secondary: "border-gray-200 bg-gray-50 font-bold text-gray-700",
    success: "border-emerald-200 bg-emerald-50 font-bold text-emerald-700",
    warning: "border-yellow-200 bg-yellow-50 font-bold text-yellow-700",
    danger: "border-red-200 bg-red-50 font-bold text-red-700",
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

interface BadgeProps extends Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "content"
> {
  color?: keyof typeof badgeStyles.color;
  size?: keyof typeof badgeStyles.size;
  weight?: keyof typeof badgeStyles.weight;
  content: string | number;
  children: React.ReactNode;
}

export function Badge({
  color = "primary",
  size = "small",
  weight = "normal",
  content,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <div className="flex relative w-fit">
      <div
        className={[
          "absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full border px-1.5 z-10",
          badgeStyles["color"][color],
          badgeStyles["size"][size],
          badgeStyles["weight"][weight],
          className ?? "",
        ].join(" ")}
        {...props}
      >
        <span>{content}</span>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
