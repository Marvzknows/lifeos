"use client";

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group";

export type TransactionTypeFilter = "ALL" | "INCOME" | "EXPENSE";

type TransactionTypeFilterProps = {
    value: TransactionTypeFilter;
    onChange: (value: TransactionTypeFilter) => void;
}

export function TransactionTypeFilterTabs({
    value,
    onChange,
}: TransactionTypeFilterProps) {
    return (
        <ToggleGroup
            value={[value]}
            onValueChange={(val: string[]) => {
                const next = val[0];
                if (next) onChange(next as TransactionTypeFilter);
            }}
            multiple={false}
            className="w-fit"
            variant="outline"
        >
            <ToggleGroupItem value="ALL" className="px-4">
                All
            </ToggleGroupItem>
            <ToggleGroupItem value="INCOME" className="px-4">
                Income
            </ToggleGroupItem>
            <ToggleGroupItem value="EXPENSE" className="px-4">
                Expenses
            </ToggleGroupItem>
        </ToggleGroup>
    );
}