import { type LucideIcon } from "lucide-react";
import { Card, CardBody, Text, Heading } from "../../../shared";

export interface StatsCardConfig {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: "primary" | "success" | "warning" | "danger";
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const colorStyles: Record<NonNullable<StatsCardConfig["color"]>, { bg: string; icon: string }> = {
  primary: { bg: "bg-amber-50", icon: "text-amber-600" },
  success: { bg: "bg-emerald-50", icon: "text-emerald-600" },
  warning: { bg: "bg-yellow-50", icon: "text-yellow-600" },
  danger: { bg: "bg-red-50", icon: "text-red-600" },
};

export function StatsCard({ title, value, icon: Icon, trend, color = "primary" }: StatsCardConfig) {
  const styles = colorStyles[color];

  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between">
          <div>
            <Text variant="small" color="secondary">
              {title}
            </Text>
            <Heading variant="h4" weight="bold" className="mt-1">
              {value}
            </Heading>
            {trend && (
              <Text
                variant="small"
                color={trend.isPositive ? "success" : "danger"}
                className="mt-1"
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
