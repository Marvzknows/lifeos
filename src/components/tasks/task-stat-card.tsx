import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TaskStatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  //   trend?: number;
  //   trendLabel?: string;
  danger?: boolean;
}

export function TaskStatCard({
  title,
  value,
  icon: Icon,
  iconColor,
  iconBg,
  //   trend,
  //   trendLabel,
}: TaskStatCardProps) {
  return (
    <Card className="rounded-md">
      <CardContent className="space-y-6 p-6">
        <div className="flex flex-row justify-between gap-4 md:justify-start">
          <div
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-2xl",
              iconBg,
            )}
          >
            <Icon className={cn("h-7 w-7", iconColor)} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{title}</p>

              <h2 className="mt-2 text-4xl font-bold tracking-tight">
                {value}
              </h2>
            </div>
          </div>
        </div>

        {/* {trend !== undefined && (
          <div className="flex items-center gap-2 text-sm">
            {trend >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}

            <span
              className={cn(
                "font-medium",
                trend >= 0 ? "text-green-600" : "text-red-500",
              )}
            >
              {trend > 0 ? "+" : ""}
              {trend}
            </span>

            <span className="text-muted-foreground">{trendLabel}</span>
          </div>
        )} */}
      </CardContent>
    </Card>
  );
}
