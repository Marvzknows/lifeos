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
import { useFinanceCategories } from "@/lib/api/services/hooks/finance.category.hooks";
import { BudgetPayloadT } from "@/schemas/finance/budget-schema";
import { BudgetModal } from "./components/budget-modal";

const BudgetPage = () => {
    const [month, setMonth] = useState(getCurrentMonth());
    const [statusFilter, setStatusFilter] = useState<BudgetStatus>("all");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingBudget, setEditingBudget] = useState<BudgetRowT | undefined>();

    const { data: categoriesData } = useFinanceCategories();
    const expenseCategories = categoriesData?.data?.expense ?? [];

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
        setEditingBudget(undefined);
        setModalOpen(true);
    }

    function handleEditBudget(budget: BudgetRowT) {
        setEditingBudget(budget);
        setModalOpen(true);
    }

    function handleSubmitBudget(values: BudgetPayloadT) {
        // TODO: edit → update mutation with { amount: values.amount }; create → create mutation with values
        console.log(editingBudget ? "update" : "create", values);
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

            <BudgetModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                categories={expenseCategories}
                month={month}
                budget={editingBudget}
                onSubmit={handleSubmitBudget}
            />
        </div>
    );
};

export default BudgetPage;