"use client";

import {
    TransactionTypeFilterTabs,
    TransactionTypeFilter,
} from "./transaction-type-filter";
import { TransactionSearch } from "./transaction-search";
import { CategoryFilter, CategoryOption } from "./category-filter";
import { DateRangeFilter, DateRangeValue } from "./date-range-filter";

interface TransactionToolbarProps {
    typeFilter: TransactionTypeFilter;
    onTypeFilterChange: (value: TransactionTypeFilter) => void;
    search: string;
    onSearchChange: (value: string) => void;
    categories: CategoryOption[];
    categoryFilter: string;
    onCategoryFilterChange: (value: string) => void;
    dateRange: DateRangeValue;
    onDateRangeChange: (value: DateRangeValue) => void;
}

export function TransactionToolbar({
    typeFilter,
    onTypeFilterChange,
    search,
    onSearchChange,
    categories,
    categoryFilter,
    onCategoryFilterChange,
    dateRange,
    onDateRangeChange,
}: TransactionToolbarProps) {
    return (
        <div className="flex flex-col gap-3">
            <TransactionTypeFilterTabs
                value={typeFilter}
                onChange={onTypeFilterChange}
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <TransactionSearch value={search} onChange={onSearchChange} />
                <CategoryFilter
                    categories={categories}
                    value={categoryFilter}
                    onChange={onCategoryFilterChange}
                />
                <DateRangeFilter value={dateRange} onChange={onDateRangeChange} />
            </div>
        </div>
    );
}