import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Building2,
  FileText,
  ArrowLeftRight,
  KeyRound,
  Users,
  CircleDollarSign,
} from "lucide-react";

export type NavItemConfig = {
  to: string;
  icon: LucideIcon;
  label: string;
};

export const navItemsConfig = {
  public: [
    { to: "/pay", icon: CircleDollarSign, label: "Pay here" },
  ] as NavItemConfig[],
  admin: [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/invoices", icon: FileText, label: "Invoices" },
    { to: "/transactions", icon: ArrowLeftRight, label: "Transactions" },
    { to: "/api-keys", icon: KeyRound, label: "API Keys" },
  ] as NavItemConfig[],
  maintainer: [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/commerces", icon: Building2, label: "Commerces" },
    { to: "/administrators", icon: Users, label: "Administrators" },
    { to: "/transactions", icon: ArrowLeftRight, label: "Transactions" },
    { to: "/api-keys", icon: KeyRound, label: "API Keys" },
  ] as NavItemConfig[],
};

export type Role = "public" | "admin" | "maintainer";
