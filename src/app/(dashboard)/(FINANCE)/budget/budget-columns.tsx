"use client";

import { MoreVertical } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { DataTableColumn } from "@/components/data-table/data-table";
import { cn } from "@/lib/utils";
import { BudgetRowT } from "./types";

const peso = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
});

type BudgetColumnsProps = {
    onEditBudget: (budget: BudgetRowT) => void;
    onDeleteBudget: (id: string) => void;
};

// Under 80% is fine, 80-100% is a warning, over 100% is over budget.
const getProgressTone = (progress: number) => {
    if (progress > 100) {
        return {
            indicator: "[&_[data-slot=progress-indicator]]:bg-red-500",
            text: "text-red-600 dark:text-red-400",
        };
    }
    if (progress >= 80) {
        return {
            indicator: "[&_[data-slot=progress-indicator]]:bg-orange-500",
            text: "text-orange-600 dark:text-orange-400",
        };
    }
    return {
        indicator: "[&_[data-slot=progress-indicator]]:bg-green-600",
        text: "text-muted-foreground",
    };
};

export const budgetColumns = ({
    onEditBudget,
    onDeleteBudget,
}: BudgetColumnsProps): DataTableColumn<BudgetRowT>[] => [
        {
            id: "category",
            header: "Category",
            sortable: true,
            sortAccessor: (row) => row.category.name,
            cell: (row) => {
                const color = row.category.color ?? "#94a3b8";

                return (
                    <div className="flex items-center gap-2.5">
                        <span
                            className="flex size-6 shrink-0 items-center justify-center rounded-full"
                            style={{ backgroundColor: `${color}20` }}
                        >
                            <DynamicIcon
                                name={(row.category.icon ?? "circle") as IconName}
                                className="size-3.5"
                                style={{ color }}
                            />
                        </span>
                        <span className="truncate font-medium">{row.category.name}</span>
                    </div>
                );
            },
        },

        {
            id: "budgeted",
            header: "Budgeted",
            sortable: true,
            sortAccessor: (row) => row.budgeted,
            cell: (row) => <span>{peso.format(row.budgeted)}</span>,
        },

        {
            id: "spent",
            header: "Spent",
            sortable: true,
            sortAccessor: (row) => row.spent,
            cell: (row) => (
                <span className="text-muted-foreground">{peso.format(row.spent)}</span>
            ),
        },

        {
            id: "remaining",
            header: "Remaining",
            sortable: true,
            sortAccessor: (row) => row.remaining,
            cell: (row) => (
                <span
                    className={cn(
                        "font-medium",
                        row.remaining < 0 && "text-red-600 dark:text-red-400",
                    )}
                >
                    {peso.format(row.remaining)}
                </span>
            ),
        },

        {
            id: "progress",
            header: "Progress",
            sortable: true,
            sortAccessor: (row) => row.progress,
            width: "200px",
            cell: (row) => {
                const tone = getProgressTone(row.progress);

                return (
                    <div className="flex min-w-36 items-center gap-2">
                        <Progress
                            value={Math.min(row.progress, 100)}
                            className={cn("h-2 flex-1", tone.indicator)}
                            aria-label={`${row.category.name} budget used`}
                        />
                        <span className={cn("w-10 text-right text-xs tabular-nums", tone.text)}>
                            {row.progress}%
                        </span>
                    </div>
                );
            },
        },

        {
            id: "actions",
            header: "",
            width: "40px",
            cell: (row) => (
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        }
                    />

                    <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenuItem className="text-xs" onClick={() => onEditBudget(row)}>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-xs text-destructive"
                            onClick={() => onDeleteBudget(row.id)}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];