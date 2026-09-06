import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type CategoryStatsProps = {
    total: number;
    income: number;
    expense: number;
}

const StatCard = ({
    label,
    value,
    icon: Icon,
    iconClassName,
}: {
    label: string;
    value: number;
    icon: typeof Wallet;
    iconClassName?: string;
}) => {
    return (
        <Card className="rounded-sm">
            <CardContent className="flex items-center gap-3 px-4 py-3">
                <span
                    className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-full bg-muted",
                        iconClassName,
                    )}
                >
                    <Icon className="size-4" />
                </span>
                <div>
                    <p className="text-2xl font-medium leading-none">{value}</p>
                    <p className="text-sm text-muted-foreground">{label}</p>
                </div>
            </CardContent>
        </Card>
    );
}

export function CategoryStats({ total, income, expense }: CategoryStatsProps) {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <StatCard label="Total categories" value={total} icon={Wallet} />
            <StatCard
                label="Income categories"
                value={income}
                icon={TrendingUp}
                iconClassName="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
            />
            <StatCard
                label="Expense categories"
                value={expense}
                icon={TrendingDown}
                iconClassName="bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
            />
        </div>
    );
}

export default CategoryStats;