const buttonStyles = {
  color: {
    primary:
      "bg-brand-500 active:bg-brand-600 hover:border-brand-600 text-white",
    secondary:
      "bg-neutral-100 active:bg-neutral-300 hover:border-neutral-300 text-neutral-700",
    danger:
      "bg-danger-600 active:bg-danger-700 hover:border-danger-700 text-white",
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
  type: "submit" | "reset" | "button";
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
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        "min-w-36 m-1 border border-transparent rounded-md transition-all duration-200 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300",
        buttonStyles["color"][color],
        buttonStyles["weight"][weight],
        buttonStyles["size"][size],
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
