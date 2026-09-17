"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/page-header";
import TransactionStats from "./components/transaction-stats";
import { TransactionToolbar } from "./components/transaction-toolbar";
import { TransactionDateLabel } from "./components/transaction-date-label";
import { TransactionTypeFilter } from "./components/transaction-type-filter";
import { AddTransactionButton } from "./components/add-transaction-button";
import { CreateTransactionModal } from "./components/create-transaction-modal";
import { DateRangeValue } from "./components/date-range-filter";
import { dummyCategories } from "./components/dummy-data";
import { DataTable } from "@/components/data-table/data-table";
import { transactionColumns } from "./transaction-column";
import { TransactionFormValues } from "@/schemas/finance/transaction-schema";
import getDefaultDateRange from "@/helpers/get-default-date-range";
import { useFinanceTransactions, useFinanceTransactionStats } from "@/lib/api/services/hooks/finance.transaction.hooks";
import { useDebounce } from "@/hooks/use-debounce";

const TransactionPage = () => {
    const [typeFilter, setTypeFilter] = useState<TransactionTypeFilter>("ALL");
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("ALL");
    const [dateRange, setDateRange] = React.useState<DateRangeValue>(getDefaultDateRange());
    const [isModalOpen, setIsModalOpen] = useState(false);

    const debouncedSearch = useDebounce(search);
    const { data, isLoading } = useFinanceTransactions({
        type: typeFilter,
        categoryId: categoryFilter,
        search: debouncedSearch,
        fromDate: dateRange.from,
        toDate: dateRange.to,
        page: 1,
        limit: 1
    });
    const { data: statsData, isLoading: isLoadingStats } = useFinanceTransactionStats();

    function handleCreateTransaction(values: TransactionFormValues) {
        // call your create-transaction mutation here
        console.log(values);
        setIsModalOpen(false);
    }

    return (
        <div className="space-y-8 p-6">
            <PageHeader
                title="Transactions"
                description="Manage your income and expenses with ease."
                action={
                    <AddTransactionButton onClick={() => setIsModalOpen(true)} />
                }
            />

            <div className="space-y-3">
                <TransactionDateLabel dateRange={dateRange} />
                <TransactionStats
                    totalIncome={Number(statsData?.totalIncome) ?? 0}
                    totalExpense={Number(statsData?.totalExpense) ?? 0}
                    netBalance={Number(statsData?.totalIncome) - Number(statsData?.totalExpense)}
                    isLoading={isLoadingStats}
                />
            </div>

            <div className="space-y-6">
                <TransactionToolbar
                    typeFilter={typeFilter}
                    onTypeFilterChange={setTypeFilter}
                    search={search}
                    onSearchChange={setSearch}
                    categories={dummyCategories}
                    categoryFilter={categoryFilter}
                    onCategoryFilterChange={setCategoryFilter}
                    dateRange={dateRange}
                    onDateRangeChange={setDateRange}
                />

                <DataTable
                    columns={transactionColumns}
                    data={data?.items ?? []}
                    getRowId={(row) => row.id}
                    isLoading={isLoading}
                // enableRowSelection
                />
            </div>

            <CreateTransactionModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                categories={dummyCategories}
                onSubmit={handleCreateTransaction}
            />
        </div>
    );
};

export default TransactionPage;