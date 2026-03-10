interface CardProps {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border border-gray-200 bg-white">
      {children}
    </div>
  );
}

export function CardHeader({ children }: CardProps) {
  return <div className="p-5">{children} </div>;
}

export function CardBody({ children }: CardProps) {
  return <div className="space-y-4 p-5">{children}</div>;
}

export function CardFooter({ children }: CardProps) {
  return (
    <div className="flex flex-col gap-3 bg-gray-50/50 p-5">{children}</div>
  );
}
