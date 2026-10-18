import { AlertTriangle, PiggyBank, Receipt, Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type BudgetStatsProps = {
    totalBudgeted: number;
    totalSpent: number;
    totalRemaining: number;
    overBudgetCount: number;
    isLoading?: boolean;
};

const peso = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
});

const StatCard = ({
    label,
    value,
    icon: Icon,
    iconClassName,
    valueClassName,
    isLoading,
}: {
    label: string;
    value: string;
    icon: typeof Wallet;
    iconClassName?: string;
    valueClassName?: string;
    isLoading?: boolean;
}) => {
    return (
        <Card className="rounded-sm">
            <CardContent className="flex items-center gap-3 px-4 py-3">
                <span
                    className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-full bg-muted",
                        !isLoading && iconClassName,
                    )}
                >
                    {isLoading ? (
                        <Skeleton className="size-9 shrink-0 rounded-full" />
                    ) : (
                        <Icon className="size-4" />
                    )}
                </span>
                <div className="min-w-0 space-y-1">
                    {isLoading ? (
                        <>
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-3.5 w-20" />
                        </>
                    ) : (
                        <>
                            <p
                                className={cn(
                                    "truncate text-2xl font-medium leading-none",
                                    valueClassName,
                                )}
                            >
                                {value}
                            </p>
                            <p className="text-sm text-muted-foreground">{label}</p>
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export function BudgetStats({
    totalBudgeted,
    totalSpent,
    totalRemaining,
    overBudgetCount,
    isLoading = false,
}: BudgetStatsProps) {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
                label="Total budgeted"
                value={peso.format(totalBudgeted)}
                icon={Wallet}
                isLoading={isLoading}
            />
            <StatCard
                label="Total spent"
                value={peso.format(totalSpent)}
                icon={Receipt}
                iconClassName="bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400"
                isLoading={isLoading}
            />
            <StatCard
                label="Remaining"
                value={peso.format(totalRemaining)}
                icon={PiggyBank}
                iconClassName="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                valueClassName={totalRemaining < 0 ? "text-red-600 dark:text-red-400" : undefined}
                isLoading={isLoading}
            />
            <StatCard
                label="Over budget"
                value={String(overBudgetCount)}
                icon={AlertTriangle}
                iconClassName={
                    overBudgetCount > 0
                        ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
                        : undefined
                }
                valueClassName={overBudgetCount > 0 ? "text-red-600 dark:text-red-400" : undefined}
                isLoading={isLoading}
            />
        </div>
    );
}

export default BudgetStats;