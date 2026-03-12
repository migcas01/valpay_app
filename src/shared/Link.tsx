import { Link as RouterLink, type LinkProps as RouterLinkProps } from "react-router";

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

interface CustomLinkProps extends Omit<RouterLinkProps, "color"> {
  color?: keyof typeof linkStyles.color;
  underline?: keyof typeof linkStyles.underline;
  weight?: keyof typeof linkStyles.weight;
}

export function Link({
  color = "primary",
  underline = "always",
  weight = "normal",
  className,
  children,
  ...props
}: CustomLinkProps) {
  return (
    <RouterLink
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
    </RouterLink>
  );
}
