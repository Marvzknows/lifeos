"use client";

import React, { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import TransactionStats from "./components/transaction-stats";
import { TransactionToolbar } from "./components/transaction-toolbar";
import { TransactionTypeFilter } from "./components/transaction-type-filter";
import { AddTransactionButton } from "./components/add-transaction-button";
import { CreateTransactionModal } from "./components/create-transaction-modal";
import { DateRangeValue } from "./components/date-range-filter";
import { dummyTransactions, dummyCategories } from "./components/dummy-data";
import { DataTable } from "@/components/data-table/data-table";
import { transactionColumns } from "./transaction-column";
import { TransactionFormValues } from "@/schemas/finance/transaction-schema";

const TransactionPage = () => {
    const [typeFilter, setTypeFilter] = useState<TransactionTypeFilter>("ALL");
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("ALL");
    const [dateRange, setDateRange] = useState<DateRangeValue>({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredTransactions = useMemo(() => {
        return dummyTransactions.filter((txn) => {
            const matchesType = typeFilter === "ALL" || txn.type === typeFilter;
            const matchesCategory =
                categoryFilter === "ALL" || txn.category.id === categoryFilter;
            const matchesSearch = txn.description
                .toLowerCase()
                .includes(search.toLowerCase());

            const txnDate = new Date(txn.transactionDate);
            const matchesFrom = !dateRange.from || txnDate >= dateRange.from;
            const matchesTo = !dateRange.to || txnDate <= dateRange.to;

            return (
                matchesType &&
                matchesCategory &&
                matchesSearch &&
                matchesFrom &&
                matchesTo
            );
        });
    }, [typeFilter, search, categoryFilter, dateRange]);

    const totalIncome = dummyTransactions
        .filter((t) => t.type === "INCOME")
        .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = dummyTransactions
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

            <TransactionStats
                totalIncome={totalIncome}
                totalExpense={totalExpense}
                netBalance={totalIncome - totalExpense}
                isLoading={false}
            />

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