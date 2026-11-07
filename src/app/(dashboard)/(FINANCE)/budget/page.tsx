"use client";

import { useMemo, useState } from "react";
import { Trash2, Wallet } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table/data-table";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { toast } from "@/components/ui/toast";
import { getCurrentMonth } from "@/helpers/budget-month";
import { countByStatus, getBudgetStatus } from "@/helpers/budget-status";
import { peso } from "@/helpers/format-peso";
import { useFinanceCategories } from "@/lib/api/services/hooks/finance.category.hooks";
import {
    useCreateFinanceBudget,
    useDeleteFinanceBudget,
    useFinanceBudgets,
    useUpdateFinanceBudget,
} from "@/lib/api/services/hooks/finance.budget.hook";
import { BudgetPayloadT } from "@/schemas/finance/budget-schema";
import BudgetStats from "./components/budget-stats";
import BudgetMonthFilter from "./components/budget-month-filter";
import BudgetStatusFilter from "./components/budget-status-filter";
import AddBudgetButton from "./components/add-budget-button";
import { BudgetModal } from "./components/budget-modal";
import { BudgetRowT, BudgetStatus } from "./types";
import { budgetColumns } from "./budget-columns";

const BudgetPage = () => {
    const [month, setMonth] = useState(getCurrentMonth());
    const [statusFilter, setStatusFilter] = useState<BudgetStatus>("all");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingBudget, setEditingBudget] = useState<BudgetRowT | undefined>();
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    // #region Queries
    const { data: categoriesData } = useFinanceCategories();
    const expenseCategories = categoriesData?.data?.expense ?? [];

    const { data: budgetsData, isLoading } = useFinanceBudgets(month);
    const budgets = useMemo(() => budgetsData?.data ?? [], [budgetsData]);
    // #endregion

    // #region Mutations
    const { mutateAsync: createBudget, isPending: isCreating } = useCreateFinanceBudget();
    const { mutateAsync: updateBudget, isPending: isUpdating } = useUpdateFinanceBudget();
    const { mutateAsync: deleteBudget } = useDeleteFinanceBudget();
    // #endregion

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

    const deletingBudget = budgets.find((b) => b.id === deleteId);

    // #region Handlers
    const handleAddBudget = () => {
        setEditingBudget(undefined);
        setModalOpen(true);
    };

    const handleEditBudget = (budget: BudgetRowT) => {
        setEditingBudget(budget);
        setModalOpen(true);
    };

    const handleSubmitBudget = (values: BudgetPayloadT) => {
        const isEditing = Boolean(editingBudget);

        const request = editingBudget
            ? updateBudget({ id: editingBudget.id, data: { amount: values.amount } })
            : createBudget(values);

        toast.promise(request, {
            loading: isEditing ? "Updating budget..." : "Creating budget...",
            success: () => {
                setModalOpen(false);
                setEditingBudget(undefined);
                return {
                    title: isEditing ? "Budget updated" : "Budget created",
                    description: "Your budget has been saved successfully.",
                };
            },
            error: (error) => error?.message ?? "Failed to save budget.",
        });
    };

    const handleOnDeleteBudget = (id: string) => {
        setDeleteId(id);
        setOpenDelete(true);
    };

    const handleDeleteBudget = () => {
        if (!deleteId) return;
        setOpenDelete(false);

        toast.promise(deleteBudget(deleteId), {
            loading: "Deleting budget...",
            success: () => {
                setDeleteId(null);
                return {
                    title: "Budget deleted",
                    description: "The budget has been removed.",
                };
            },
            error: (error) => error?.message ?? "Failed to delete budget.",
        });
    };
    // #endregion

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
                        onDeleteBudget: handleOnDeleteBudget,
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
                isLoading={isCreating || isUpdating}
            />

            <ConfirmationDialog
                open={openDelete}
                onOpenChange={setOpenDelete}
                intent="destructive"
                title="Delete this budget?"
                description="This permanently removes the budget. Your transactions aren't affected."
                icon={Trash2}
                itemIcon={Wallet}
                itemTitle={deletingBudget?.category.name}
                itemSubtitle={
                    deletingBudget ? `${peso.format(deletingBudget.budgeted)} budgeted` : undefined
                }
                confirmText="Delete"
                confirmVariant="destructive"
                onConfirm={handleDeleteBudget}
                onCancel={() => setOpenDelete(false)}
            />
        </div>
    );
};

export default BudgetPage;