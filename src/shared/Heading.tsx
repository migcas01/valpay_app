import { tv, type VariantProps } from "tailwind-variants";

const headingStyles = tv({
  base: "",
  variants: {
    variant: {
      h1: "text-4xl",
      h2: "text-3xl",
      h3: "text-2xl",
      h4: "text-xl",
      h5: "text-lg",
      h6: "text-base",
    },
    color: {
      default:   "text-gray-900",
      primary:   "text-amber-700",
      secondary: "text-gray-700",
      success:   "text-emerald-700",
      warning:   "text-yellow-700",
      danger:    "text-red-700",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      bold:   "font-bold",
    },
  },
  defaultVariants: {
    variant: "h2",
    color: "default",
    weight: "bold",
  },
});

type HeadingVariants = VariantProps<typeof headingStyles>;

interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "color">,
    HeadingVariants {
  children: React.ReactNode;
}

export function Heading({
  variant,
  color,
  weight,
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = variant ?? "h2";

  return (
    <Tag
      className={headingStyles({ variant, color, weight, class: className })}
      {...props}
    >
      {children}
    </Tag>
  );
}
