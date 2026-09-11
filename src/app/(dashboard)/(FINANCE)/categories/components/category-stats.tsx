import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type CategoryStatsProps = {
    total: number;
    income: number;
    expense: number;
    isLoading?: boolean;
};

const StatCard = ({
    label,
    value,
    icon: Icon,
    iconClassName,
    isLoading,
}: {
    label: string;
    value: number;
    icon: typeof Wallet;
    iconClassName?: string;
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
                <div className="space-y-1">
                    {isLoading ? (
                        <>
                            <Skeleton className="h-6 w-8" />
                            <Skeleton className="h-3.5 w-24" />
                        </>
                    ) : (
                        <>
                            <p className="text-2xl font-medium leading-none">{value}</p>
                            <p className="text-sm text-muted-foreground">{label}</p>
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export function CategoryStats({
    total,
    income,
    expense,
    isLoading = false,
}: CategoryStatsProps) {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <StatCard
                label="Total categories"
                value={total}
                icon={Wallet}
                isLoading={isLoading}
            />
            <StatCard
                label="Income categories"
                value={income}
                icon={TrendingUp}
                iconClassName="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                isLoading={isLoading}
            />
            <StatCard
                label="Expense categories"
                value={expense}
                icon={TrendingDown}
                iconClassName="bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
                isLoading={isLoading}
            />
        </div>
    );
}

export default CategoryStats;