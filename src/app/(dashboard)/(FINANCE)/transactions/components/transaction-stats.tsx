import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type TransactionStatsProps = {
    totalIncome: number;
    totalExpense: number;
    netBalance: number;
    isLoading?: boolean;
};

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
    }).format(value);

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
                <div className="space-y-1">
                    {isLoading ? (
                        <>
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-3.5 w-24" />
                        </>
                    ) : (
                        <>
                            <p
                                className={cn(
                                    "text-2xl font-medium leading-none",
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

export function TransactionStats({
    totalIncome,
    totalExpense,
    netBalance,
    isLoading = false,
}: TransactionStatsProps) {
    const isPositive = netBalance >= 0;

    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <StatCard
                label="Total income"
                value={formatCurrency(totalIncome)}
                icon={TrendingUp}
                iconClassName="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                valueClassName="text-green-700 dark:text-green-400"
                isLoading={isLoading}
            />
            <StatCard
                label="Total expenses"
                value={formatCurrency(totalExpense)}
                icon={TrendingDown}
                iconClassName="bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
                valueClassName="text-red-700 dark:text-red-400"
                isLoading={isLoading}
            />
            <StatCard
                label="Net balance"
                value={formatCurrency(netBalance)}
                icon={Wallet}
                iconClassName={cn(
                    isPositive
                        ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
                )}
                valueClassName={cn(
                    isPositive
                        ? "text-green-700 dark:text-green-400"
                        : "text-red-700 dark:text-red-400",
                )}
                isLoading={isLoading}
            />
        </div>
    );
}

export default TransactionStats;