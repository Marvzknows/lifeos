"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { BudgetStatus } from "../types";

type BudgetStatusFilterProps = {
    value: BudgetStatus;
    onValueChange: (status: BudgetStatus) => void;
    counts: Record<BudgetStatus, number>;
};

const OPTIONS: { value: BudgetStatus; label: string }[] = [
    { value: "all", label: "All" },
    { value: "on-track", label: "On track" },
    { value: "warning", label: "Warning" },
    { value: "over", label: "Over" },
];

const BudgetStatusFilter = ({ value, onValueChange, counts }: BudgetStatusFilterProps) => {
    return (
        <ToggleGroup
            value={[value]}
            onValueChange={(next: string[]) => {
                if (next[0]) onValueChange(next[0] as BudgetStatus);
            }}
            className="w-full sm:w-auto"
        >
            {OPTIONS.map((option) => (
                <ToggleGroupItem
                    key={option.value}
                    value={option.value}
                    className="h-8 flex-1 gap-1.5 px-3 text-xs sm:flex-none"
                >
                    {option.label}
                    <span className="text-muted-foreground">{counts[option.value]}</span>
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    );
};

export default BudgetStatusFilter;