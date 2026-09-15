"use client";

import React, { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import TransactionStats from "./components/transaction-stats";
import { TransactionToolbar } from "./components/transaction-toolbar";
import { TransactionDateLabel } from "./components/transaction-date-label";
import { TransactionTypeFilter } from "./components/transaction-type-filter";
import { AddTransactionButton } from "./components/add-transaction-button";
import { CreateTransactionModal } from "./components/create-transaction-modal";
import { DateRangeValue } from "./components/date-range-filter";
import { dummyTransactions, dummyCategories } from "./components/dummy-data";
import { DataTable } from "@/components/data-table/data-table";
import { transactionColumns } from "./transaction-column";
import { TransactionFormValues } from "@/schemas/finance/transaction-schema";
import getDefaultDateRange from "@/helpers/get-default-date-range";
import { filterTransactions } from "./filter-transaction";

const TransactionPage = () => {
    const [typeFilter, setTypeFilter] = useState<TransactionTypeFilter>("ALL");
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("ALL");
    const [dateRange, setDateRange] = React.useState<DateRangeValue>(getDefaultDateRange());
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredTransactions = useMemo(
        () => filterTransactions(dummyTransactions, { typeFilter, categoryFilter, search, dateRange }),
        [typeFilter, search, categoryFilter, dateRange],
    );

    const rangeFilteredTransactions = useMemo(
        () => filterTransactions(dummyTransactions, { dateRange }),
        [dateRange],
    );

    const totalIncome = rangeFilteredTransactions
        .filter((t) => t.type === "INCOME")
        .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = rangeFilteredTransactions
        .filter((t) => t.type === "EXPENSE")
        .reduce((sum, t) => sum + t.amount, 0);

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
                    totalIncome={totalIncome}
                    totalExpense={totalExpense}
                    netBalance={totalIncome - totalExpense}
                    isLoading={false}
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
                    data={filteredTransactions}
                    getRowId={(row) => row.id}
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