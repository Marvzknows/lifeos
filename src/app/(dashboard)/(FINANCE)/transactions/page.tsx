"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/page-header";
import TransactionStats from "./components/transaction-stats";
import { TransactionToolbar } from "./components/transaction-toolbar";
import { TransactionDateLabel } from "./components/transaction-date-label";
import { TransactionTypeFilter } from "./components/transaction-type-filter";
import { AddTransactionButton } from "./components/add-transaction-button";
import { DateRangeValue } from "./components/date-range-filter";
import { DataTable } from "@/components/data-table/data-table";
import { getTransactionColumns } from "./transaction-column";
import { TransactionFormValues } from "@/schemas/finance/transaction-schema";
import getDefaultDateRange from "@/helpers/get-default-date-range";
import {
    useCreateFinanceTransaction,
    useUpdateFinanceTransaction,
    useFinanceTransactions,
    useFinanceTransactionStats,
    useSoftDeleteFinanceTransaction,
    useViewFinanceTransaction,
} from "@/lib/api/services/hooks/finance.transaction.hooks";
import { useDebounce } from "@/hooks/use-debounce";
import { useFinanceCategories } from "@/lib/api/services/hooks/finance.category.hooks";
import { FinanceCategoryT } from "@/app/types/finanace-category";
import { TransactionT } from "@/app/types/finanace-transaction";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { toast } from "@/components/ui/toast";
import { TransactionModal } from "./components/create-transaction-modal";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { ClipboardList, Trash2 } from "lucide-react";
import { ViewTransactionModal } from "./components/view-transaction-modal";

const TransactionPage = () => {
    const [typeFilter, setTypeFilter] = useState<TransactionTypeFilter>("ALL");
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("ALL");
    const [dateRange, setDateRange] = React.useState<DateRangeValue>(getDefaultDateRange());
    const [page, setPage] = useState(1);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [editingTransaction, setEditingTransaction] = useState<TransactionT | undefined>(undefined);
    const [viewTransactionId, setViewTransactionId] = useState<string | null>(null)

    const debouncedSearch = useDebounce(search);
    const { data, isLoading } = useFinanceTransactions({
        type: typeFilter,
        ...(categoryFilter !== "ALL" && { categoryId: categoryFilter }),
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(dateRange.from && { fromDate: dateRange.from }),
        ...(dateRange.to && { toDate: dateRange.to }),
        page,
        limit: 10
    });
    const { data: statsData, isLoading: isLoadingStats } = useFinanceTransactionStats({
        fromDate: dateRange.from,
        toDate: dateRange.to,
    });
    const { data: categoriesData } = useFinanceCategories();
    const { data: viewTransactionData, isLoading: viewTransactionLoading } = useViewFinanceTransaction(viewTransactionId ?? '');
    const { mutateAsync: createTransaction, isPending: isCreating } = useCreateFinanceTransaction();
    const { mutateAsync: updateTransaction, isPending: isUpdating } = useUpdateFinanceTransaction();
    const { mutateAsync: deleteTransaction } = useSoftDeleteFinanceTransaction()

    const openCreateModal = () => {
        setEditingTransaction(undefined);
        setIsModalOpen(true);
    }

    const openEditModal = (transaction: TransactionT) => {
        setEditingTransaction(transaction);
        setIsModalOpen(true);
    }

    const handleSubmitTransaction = (values: TransactionFormValues) => {
        if (editingTransaction) {
            toast.promise(updateTransaction({ id: editingTransaction.id, data: values }), {
                loading: "Saving changes...",
                success: () => {
                    setIsModalOpen(false);
                    return {
                        title: "Transaction updated",
                        description: "Your changes have been saved.",
                    };
                },
                error: (error) => error?.message ?? "Failed to update transaction.",
            });
            return;
        }

        toast.promise(createTransaction(values), {
            loading: "Creating transaction...",
            success: () => {
                setIsModalOpen(false);
                return {
                    title: "Transaction created",
                    description: "Your transaction has been created successfully.",
                };
            },
            error: (error) => error?.message ?? "Failed to create transaction.",
        });
    }

    const handleOnDeleteTransaction = (transaction: TransactionT) => {
        setDeleteId(transaction.id);
        setOpenDelete(true);
    }

    const columns = getTransactionColumns({
        onEdit: openEditModal,
        onDelete: handleOnDeleteTransaction,
    });

    const expenseCategories = categoriesData?.data.expense.map((category: FinanceCategoryT) => ({
        id: category.id,
        name: category.name
    })) ?? [];

    const incomeCategories = categoriesData?.data.income.map((category: FinanceCategoryT) => ({
        id: category.id,
        name: category.name
    })) ?? [];

    const allCategories = [...incomeCategories, ...expenseCategories];

    const handleDelete = () => {
        if (!deleteId) return;
        setOpenDelete(false);
        toast.promise(deleteTransaction(deleteId), {
            loading: "Deleting transaction...",
            success: () => {
                setDeleteId(null);
                return {
                    title: "Transaction deleted",
                    description: "Your transaction has been deleted successfully.",
                };
            },
            error: () => {
                return {
                    title: "Failed to delete transaction",
                    description: "Something went wrong.",
                };
            },
        });
    };

    const handleRowClick = (transaction: TransactionT) => {
        setViewTransactionId(transaction.id);
    };

    const handleEditFromView = (transaction: TransactionT) => {
        setViewTransactionId(null);
        openEditModal(transaction);
    };

    const handleDeleteFromView = (transaction: TransactionT) => {
        setViewTransactionId(null);
        handleOnDeleteTransaction(transaction);
    };

    return (
        <div className="space-y-8 p-6">
            <PageHeader
                title="Transactions"
                description="Manage your income and expenses with ease."
                action={
                    <AddTransactionButton onClick={openCreateModal} />
                }
            />

            <div className="space-y-3">
                <TransactionDateLabel dateRange={dateRange} />
                <TransactionStats
                    totalIncome={Number(statsData?.totalIncome ?? 0)}
                    totalExpense={Number(statsData?.totalExpense ?? 0)}
                    netBalance={Number(statsData?.netBalance ?? 0)}
                    isLoading={isLoadingStats}
                />
            </div>

            <div className="space-y-6">
                <TransactionToolbar
                    typeFilter={typeFilter}
                    onTypeFilterChange={setTypeFilter}
                    search={search}
                    onSearchChange={setSearch}
                    categories={typeFilter === 'ALL' ? allCategories : typeFilter === 'INCOME' ? incomeCategories : expenseCategories}
                    categoryFilter={categoryFilter}
                    onCategoryFilterChange={setCategoryFilter}
                    dateRange={dateRange}
                    onDateRangeChange={setDateRange}
                />

                <DataTable
                    columns={columns}
                    data={data?.items ?? []}
                    getRowId={(row) => row.id}
                    isLoading={isLoading}
                    onRowClick={handleRowClick}
                />

                <DataTablePagination
                    page={data?.pagination?.page ?? 1}
                    pageCount={data?.pagination?.totalPages ?? 0}
                    onPageChange={(newPage) => setPage(newPage)}
                />
            </div>

            <TransactionModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                transaction={editingTransaction}
                isLoading={editingTransaction ? isUpdating : isCreating}
                onSubmit={handleSubmitTransaction}
            />

            <ConfirmationDialog
                open={openDelete}
                onOpenChange={setOpenDelete}
                intent="destructive"
                title="Delete this transaction?"
                description="This action cannot be undone."
                icon={Trash2}
                itemIcon={ClipboardList}
                // itemTitle="Grocery shopping"
                // itemSubtitle="Tomorrow • Personal"
                confirmText="Delete"
                confirmVariant="destructive"
                onConfirm={handleDelete}
                onCancel={() => setOpenDelete(false)}
            />

            <ViewTransactionModal
                open={!!viewTransactionId}
                onOpenChange={(open) => {
                    if (!open) setViewTransactionId(null);
                }}
                transaction={viewTransactionData}
                isLoading={viewTransactionLoading}
                onEdit={handleEditFromView}
                onDelete={handleDeleteFromView}
            />
        </div>
    );
};

export default TransactionPage;