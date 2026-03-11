const spinnerStyles = {
  color: {
    primary: {
      text: "text-amber-700",
      stroke: "border-amber-500/25 border-t-amber-500",
    },
    secondary: {
      text: "text-gray-500",
      stroke: "border-gray-600/10 border-t-gray-600",
    },
    danger: {
      text: "text-red-700",
      stroke: "border-red-600/25 border-t-red-600",
    },
  },
  size: {
    small: {
      text: "text-sm",
      shape: "h-8 w-8 border-4",
    },
    medium: {
      text: "text-base",
      shape: "h-16 w-16 border-8",
    },
    large: {
      text: "text-lg",
      shape: "h-32 w-32 border-16",
    },
  },
  weight: {
    normal: "font-normal",
    medium: "font-medium",
    bold: "font-bold",
  },
};

interface SpinnerProps extends Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "className"
> {
  color?: keyof typeof spinnerStyles.color;
  size?: keyof typeof spinnerStyles.size;
  weight?: keyof typeof spinnerStyles.weight;
  text: string;
}

export function Spinner({
  color = "primary",
  size = "small",
  weight = "normal",
  text,
  ...props
}: SpinnerProps) {
  return (
    <div className="flex flex-col items-center gap-2" {...props}>
      <div
        className={[
          "animate-spin rounded-full",
          spinnerStyles["color"][color]["stroke"],
          spinnerStyles["size"][size]["shape"],
        ].join(" ")}
      ></div>
      <span
        className={[
          spinnerStyles["color"][color]["text"],
          spinnerStyles["size"][size]["text"],
          spinnerStyles["weight"][weight],
        ].join(" ")}
      >
        {text}
      </span>
    </div>
  );
}
