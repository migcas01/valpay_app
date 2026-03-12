interface CardProps extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={[
        "w-full overflow-hidden rounded-xl border border-gray-200 bg-white",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardProps) {
  return <section className={["p-5", className].join(" ")}>{children}</section>;
}

export function CardBody({ children, className }: CardProps) {
  return (
    <section className={["space-y-4 p-5", className].join(" ")}>
      {children}
    </section>
  );
}

export function CardFooter({ children, className }: CardProps) {
  return (
    <section
      className={["flex flex-col gap-3 bg-gray-50/50 p-5", className].join(" ")}
    >
      {children}
    </section>
  );
}
