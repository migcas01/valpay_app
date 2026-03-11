const headingStyles = {
  variant: {
    h1: "text-4xl",
    h2: "text-3xl",
    h3: "text-2xl",
    h4: "text-xl",
    h5: "text-lg",
    h6: "text-base",
  },
  color: {
    default: "text-gray-900",
    primary: "text-amber-700",
    secondary: "text-gray-700",
    success: "text-emerald-700",
    warning: "text-yellow-700",
    danger: "text-red-700",
  },
  weight: {
    normal: "font-normal",
    medium: "font-medium",
    bold: "font-bold",
  },
};

interface HeadingProps extends Omit<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >,
  "color"
> {
  variant?: keyof typeof headingStyles.variant;
  color?: keyof typeof headingStyles.color;
  weight?: keyof typeof headingStyles.weight;
  children: React.ReactNode;
}

export function Heading({
  variant = "h2",
  color = "default",
  weight = "bold",
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = variant;

  return (
    <Tag
      className={[
        headingStyles["variant"][variant],
        headingStyles["color"][color],
        headingStyles["weight"][weight],
        className ?? "",
      ].join(" ")}
      {...props}
    >
      {children}
    </Tag>
  );
}
