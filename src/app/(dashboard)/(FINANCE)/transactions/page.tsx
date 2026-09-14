"use client";

import React from "react";
import { PageHeader } from "@/components/page-header";
import TransactionStats from "./components/transaction-stats";
import { TransactionToolbar } from "./components/transaction-toolbar";
import { TransactionTypeFilter } from "./components/transaction-type-filter";
import { AddTransactionButton } from "./components/add-transaction-button";
import { dummyTransactions, dummyCategories } from "./components/dummy-data";
import { DataTable } from "@/components/data-table/data-table";
import { transactionColumns } from "./transaction-column";

const TransactionPage = () => {
    const [typeFilter, setTypeFilter] =
        React.useState<TransactionTypeFilter>("ALL");
    const [search, setSearch] = React.useState("");
    const [categoryFilter, setCategoryFilter] = React.useState("ALL");

    const filteredTransactions = React.useMemo(() => {
        return dummyTransactions.filter((txn) => {
            const matchesType = typeFilter === "ALL" || txn.type === typeFilter;
            const matchesCategory =
                categoryFilter === "ALL" || txn.category.id === categoryFilter;
            const matchesSearch = txn.description
                .toLowerCase()
                .includes(search.toLowerCase());
            return matchesType && matchesCategory && matchesSearch;
        });
    }, [typeFilter, search, categoryFilter]);

    const totalIncome = dummyTransactions
        .filter((t) => t.type === "INCOME")
        .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = dummyTransactions
        .filter((t) => t.type === "EXPENSE")
        .reduce((sum, t) => sum + t.amount, 0);

    const handleAddTransaction = () => {
        // open your create-transaction modal/sheet here
    };

    return (
        <div className="space-y-8 p-6">
            <PageHeader
                title="Transactions"
                description="Manage your income and expenses with ease."
                action={<AddTransactionButton onClick={handleAddTransaction} />}
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
                />

                <DataTable
                    columns={transactionColumns}
                    data={filteredTransactions}
                    getRowId={(row) => row.id}
                />
            </div>
        </div>
    );
};

export default TransactionPage;