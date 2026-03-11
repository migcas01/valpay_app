const linkStyles = {
  color: {
    primary: "text-amber-600 hover:text-amber-700",
    secondary: "text-gray-600 hover:text-gray-700",
    success: "text-emerald-600 hover:text-emerald-700",
    warning: "text-yellow-600 hover:text-yellow-700",
    danger: "text-red-600 hover:text-red-700",
    default: "text-black hover:text-gray-800",
  },
  underline: {
    none: "no-underline",
    hover: "no-underline hover:underline",
    always: "underline",
  },
  weight: {
    normal: "font-normal",
    medium: "font-medium",
    bold: "font-bold",
  },
};

interface LinkProps extends Omit<
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >,
  "color"
> {
  color?: keyof typeof linkStyles.color;
  underline?: keyof typeof linkStyles.underline;
  weight?: keyof typeof linkStyles.weight;
  children: React.ReactNode;
}

export function Link({
  color = "primary",
  underline = "always",
  weight = "normal",
  className,
  children,
  ...props
}: LinkProps) {
  return (
    <a
      className={[
        "transition-colors duration-200",
        linkStyles["color"][color],
        linkStyles["underline"][underline],
        linkStyles["weight"][weight],
        className ?? "",
      ].join(" ")}
      {...props}
    >
      {children}
    </a>
  );
}
