"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table/data-table";
import { getCurrentMonth } from "@/helpers/budget-month";
import { countByStatus, getBudgetStatus } from "@/helpers/budget-status";
import BudgetStats from "./components/budget-stats";
import BudgetMonthFilter from "./components/budget-month-filter";
import BudgetStatusFilter from "./components/budget-status-filter";
import AddBudgetButton from "./components/add-budget-button";
import { BudgetRowT, BudgetStatus, dummyBudgets } from "./types";
import { budgetColumns } from "./budget-columns";

const BudgetPage = () => {
    const [month, setMonth] = useState(getCurrentMonth());
    const [statusFilter, setStatusFilter] = useState<BudgetStatus>("all");

    const budgets = dummyBudgets;
    const isLoading = false;

    const stats = useMemo(
        () => ({
            totalBudgeted: budgets.reduce((sum, b) => sum + b.budgeted, 0),
            totalSpent: budgets.reduce((sum, b) => sum + b.spent, 0),
            totalRemaining: budgets.reduce((sum, b) => sum + b.remaining, 0),
            overBudgetCount: budgets.filter((b) => b.remaining < 0).length,
        }),
        [budgets],
    );
    const statusCounts = useMemo(() => countByStatus(budgets), [budgets]);

    const rows = useMemo(() => {
        const sorted = [...budgets].sort((a, b) => b.progress - a.progress);
        return statusFilter === "all"
            ? sorted
            : sorted.filter((b) => getBudgetStatus(b) === statusFilter);
    }, [budgets, statusFilter]);

    function handleAddBudget() {
        console.log("add budget for", month);
    }

    function handleEditBudget(budget: BudgetRowT) {
        console.log("edit budget", budget);
    }

    function handleDeleteBudget(id: string) {
        console.log("delete budget", id);
    }

    return (
        <div className="space-y-8 p-6">
            <PageHeader
                title="Budget"
                description="Manage your budget effectively."
                action={<AddBudgetButton onClick={handleAddBudget} />}
            />

            <div className="space-y-3">
                <BudgetMonthFilter month={month} onMonthChange={setMonth} />
                <BudgetStats {...stats} isLoading={isLoading} />
            </div>

            <div className="space-y-4">
                <BudgetStatusFilter
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                    counts={statusCounts}
                />

                <DataTable
                    columns={budgetColumns({
                        onEditBudget: handleEditBudget,
                        onDeleteBudget: handleDeleteBudget,
                    })}
                    data={rows}
                    getRowId={(row) => row.id}
                    isLoading={isLoading}
                    emptyState={
                        statusFilter === "all"
                            ? "No budgets set for this month."
                            : "No budgets match this filter."
                    }
                />
            </div>
        </div>
    );
};

export default BudgetPage;