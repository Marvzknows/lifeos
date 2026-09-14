"use client";

import {
    TransactionTypeFilterTabs,
    TransactionTypeFilter,
} from "./transaction-type-filter";
import { TransactionSearch } from "./transaction-search";
import { CategoryFilter, CategoryOption } from "./category-filter";

interface TransactionToolbarProps {
    typeFilter: TransactionTypeFilter;
    onTypeFilterChange: (value: TransactionTypeFilter) => void;
    search: string;
    onSearchChange: (value: string) => void;
    categories: CategoryOption[];
    categoryFilter: string;
    onCategoryFilterChange: (value: string) => void;
}

export function TransactionToolbar({
    typeFilter,
    onTypeFilterChange,
    search,
    onSearchChange,
    categories,
    categoryFilter,
    onCategoryFilterChange,
}: TransactionToolbarProps) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <TransactionTypeFilterTabs
                value={typeFilter}
                onChange={onTypeFilterChange}
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <TransactionSearch value={search} onChange={onSearchChange} />
                <CategoryFilter
                    categories={categories}
                    value={categoryFilter}
                    onChange={onCategoryFilterChange}
                />
            </div>
        </div>
    );
}