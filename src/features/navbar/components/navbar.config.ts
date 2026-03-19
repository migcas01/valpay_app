import {
  CircleDollarSign,
  LayoutDashboard,
  FileText,
  ArrowLeftRight,
  type LucideIcon,
} from "lucide-react";

export interface NavItemConfig {
  to: string;
  icon: LucideIcon;
  label: string;
}

export type NavItemsConfig = Record<string, NavItemConfig[]>;

export const navItemsConfig: NavItemsConfig = {
  public: [{ to: "/pay", icon: CircleDollarSign, label: "Pay here" }],
  admin: [
    // { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/invoices", icon: FileText, label: "Invoices" },
    { to: "/transactions", icon: ArrowLeftRight, label: "Transactions" },
    // { to: "/api-keys", icon: KeyRound, label: "API Keys" },
  ],
  maintainer: [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    // { to: "/commerces", icon: Building2, label: "Commerces" },
    // { to: "/administrators", icon: Users, label: "Administrators" },
    { to: "/transactions", icon: ArrowLeftRight, label: "Transactions" },
    // { to: "/api-keys", icon: KeyRound, label: "API Keys" },
  ],
};
