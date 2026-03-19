const buttonStyles = {
  color: {
    primary:
      "bg-amber-500 active:bg-amber-600 hover:border-amber-600 text-white",
    secondary:
      "bg-gray-100 active:bg-gray-300 hover:border-gray-300 text-gray-700",
    danger: "bg-red-600 active:bg-red-700 hover:border-red-700 text-white",
  },
  size: {
    small: "text-sm px-3 py-1.5",
    medium: "text-base px-4 py-2",
    large: "text-lg px-5 py-2.5",
  },
  weight: {
    normal: "font-normal",
    medium: "font-medium",
    bold: "font-bold",
  },
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "submit" | "reset" | "button";
  color?: keyof typeof buttonStyles.color;
  weight?: keyof typeof buttonStyles.weight;
  size?: keyof typeof buttonStyles.size;
  children: React.ReactNode;
}

export function Button({
  color = "primary",
  weight = "medium",
  size = "medium",
  type = "button",
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center gap-2 min-w-36 border border-transparent rounded-md transition-all duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-25",
        buttonStyles["color"][color],
        buttonStyles["weight"][weight],
        buttonStyles["size"][size],
        className ?? "",
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
