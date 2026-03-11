const textStyles = {
  variant: {
    p: "text-base",
    span: "text-base",
    strong: "text-base font-bold",
    em: "text-base italic",
    small: "text-sm",
    code: "text-base font-mono bg-gray-100 px-1 rounded",
  },
  color: {
    default: "text-black",
    primary: "text-amber-600",
    secondary: "text-gray-600",
    success: "text-emerald-600",
    warning: "text-yellow-600",
    danger: "text-red-600",
  },
  weight: {
    normal: "font-normal",
    medium: "font-medium",
    bold: "font-bold",
  },
};

interface TextProps extends Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>,
  "color"
> {
  variant?: keyof typeof textStyles.variant;
  color?: keyof typeof textStyles.color;
  weight?: keyof typeof textStyles.weight;
  children: React.ReactNode;
}

export function Text({
  variant = "p",
  color = "default",
  weight = "normal",
  className,
  children,
  ...props
}: TextProps) {
  const Component = variant === "span" ? "span" 
    : variant === "strong" ? "strong" 
    : variant === "em" ? "em"
    : variant === "small" ? "small"
    : variant === "code" ? "code"
    : "p";

  return (
    <Component
      className={[
        textStyles["variant"][variant],
        textStyles["color"][color],
        textStyles["weight"][weight],
        className ?? "",
      ].join(" ")}
      {...props}
    >
      {children}
    </Component>
  );
}
