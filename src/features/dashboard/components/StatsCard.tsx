import { type LucideIcon } from "lucide-react";
import { Card, CardBody, Text } from "../../../shared";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "primary" | "success" | "warning" | "danger";
}

const colorStyles = {
  primary: {
    bg: "bg-amber-50",
    icon: "text-amber-600",
  },
  success: {
    bg: "bg-emerald-50",
    icon: "text-emerald-600",
  },
  warning: {
    bg: "bg-yellow-50",
    icon: "text-yellow-600",
  },
  danger: {
    bg: "bg-red-50",
    icon: "text-red-600",
  },
};

export function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  color = "primary",
}: StatsCardProps) {
  const styles = colorStyles[color];

  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between">
          <div>
            <Text variant="small" color="secondary">
              {title}
            </Text>
            <Text variant="h2" weight="bold" className="mt-1">
              {value}
            </Text>
            {trend && (
              <Text
                variant="small"
                className={`mt-2 ${
                  trend.isPositive ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {trend.isPositive ? "+" : "-"}
                {Math.abs(trend.value)}% from last month
              </Text>
            )}
          </div>
          <div className={`p-3 rounded-lg ${styles.bg}`}>
            <Icon className={`h-6 w-6 ${styles.icon}`} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
