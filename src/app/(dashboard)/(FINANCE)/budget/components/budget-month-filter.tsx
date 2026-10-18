"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    formatMonthLabel,
    getCurrentMonth,
    shiftMonth,
} from "@/helpers/budget-month";

type BudgetMonthFilterProps = {
    month: string;
    onMonthChange: (month: string) => void;
};

const BudgetMonthFilter = ({ month, onMonthChange }: BudgetMonthFilterProps) => {
    const isCurrentMonth = month === getCurrentMonth();

    return (
        <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-medium text-muted-foreground">
                {formatMonthLabel(month)}
            </h2>

            <div className="flex items-center gap-1">
                {!isCurrentMonth && (
                    <Button
                        type="button"
                        variant="ghost"
                        className="h-8 rounded-sm px-2 text-xs"
                        onClick={() => onMonthChange(getCurrentMonth())}
                    >
                        This month
                    </Button>
                )}
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="size-8 rounded-sm"
                    aria-label="Previous month"
                    onClick={() => onMonthChange(shiftMonth(month, -1))}
                >
                    <ChevronLeft className="size-4" />
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="size-8 rounded-sm"
                    aria-label="Next month"
                    onClick={() => onMonthChange(shiftMonth(month, 1))}
                >
                    <ChevronRight className="size-4" />
                </Button>
            </div>
        </div>
    );
};

export default BudgetMonthFilter;