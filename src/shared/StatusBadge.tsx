import {
  CircleDot,
  Clock,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  ShieldX,
  RotateCcw,
  Ban,
  AlertTriangle,
  CircleDollarSign,
  CirclePause,
} from "lucide-react";

type StatusDomain = "transaction" | "payment" | "installment";

interface StatusConfig {
  label: string;
  icon: React.ElementType;
  color: string;
}

const transactionStatus: Record<string, StatusConfig> = {
  INITIALIZED: {
    label: "Inicializado",
    icon: CircleDot,
    color: "bg-slate-100 text-slate-600",
  },
  PENDING: {
    label: "Pendiente",
    icon: Clock,
    color: "bg-amber-50 text-amber-700",
  },
  AUTHORIZED: {
    label: "Autorizado",
    icon: ShieldCheck,
    color: "bg-blue-50 text-blue-700",
  },
  NOT_AUTHORIZED: {
    label: "No autorizado",
    icon: ShieldX,
    color: "bg-red-50 text-red-700",
  },
  SUCCESS: {
    label: "Exitoso",
    icon: CheckCircle2,
    color: "bg-emerald-50 text-emerald-700",
  },
  FAILED: { label: "Fallido", icon: XCircle, color: "bg-red-50 text-red-700" },
  REFUNDED: {
    label: "Reembolsado",
    icon: RotateCcw,
    color: "bg-purple-50 text-purple-700",
  },
  VOIDED: { label: "Anulado", icon: Ban, color: "bg-gray-100 text-gray-600" },
};

const paymentStatus: Record<string, StatusConfig> = {
  ACTIVE: {
    label: "Activo",
    icon: CircleDollarSign,
    color: "bg-emerald-50 text-emerald-700",
  },
  OVERDUE: {
    label: "Vencido",
    icon: AlertTriangle,
    color: "bg-amber-50 text-amber-700",
  },
  PARTIAL: {
    label: "Parcial",
    icon: CirclePause,
    color: "bg-blue-50 text-blue-700",
  },
  PAID: {
    label: "Pagado",
    icon: CheckCircle2,
    color: "bg-emerald-50 text-emerald-700",
  },
  CANCELLED: {
    label: "Cancelado",
    icon: Ban,
    color: "bg-gray-100 text-gray-600",
  },
};

const installmentStatus: Record<string, StatusConfig> = {
  PAID: {
    label: "Pagada",
    icon: CheckCircle2,
    color: "bg-emerald-50 text-emerald-700",
  },
  PARTIAL: {
    label: "Parcial",
    icon: CirclePause,
    color: "bg-blue-50 text-blue-700",
  },
  OVERDUE: {
    label: "Vencida",
    icon: AlertTriangle,
    color: "bg-amber-50 text-amber-700",
  },
  PENDING: {
    label: "Pendiente",
    icon: Clock,
    color: "bg-slate-100 text-slate-600",
  },
  CANCELLED: {
    label: "Cancelada",
    icon: Ban,
    color: "bg-gray-100 text-gray-600",
  },
};

const domains: Record<StatusDomain, Record<string, StatusConfig>> = {
  transaction: transactionStatus,
  payment: paymentStatus,
  installment: installmentStatus,
};

interface StatusBadgeProps {
  domain: StatusDomain;
  status: string;
  size?: "small" | "medium";
  className?: string;
}

export function StatusBadge({
  domain,
  status,
  size = "small",
  className = "",
}: StatusBadgeProps) {
  const config = domains[domain][status] ?? {
    label: status,
    icon: CircleDot,
    color: "bg-gray-100 text-gray-500",
  };

  const { icon: Icon, label, color } = config;
  const sizeClass =
    size === "medium" ? "text-sm px-3 py-1.5" : "text-xs px-2.5 py-1";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${color} ${sizeClass} ${className}`}
    >
      <Icon size={size === "medium" ? 14 : 12} />
      {label}
    </span>
  );
}
