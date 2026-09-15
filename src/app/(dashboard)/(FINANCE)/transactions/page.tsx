"use client";

import React from "react";
import { PageHeader } from "@/components/page-header";
import TransactionStats from "./components/transaction-stats";
import { TransactionToolbar } from "./components/transaction-toolbar";
import { TransactionTypeFilter } from "./components/transaction-type-filter";
import { AddTransactionButton } from "./components/add-transaction-button";
import { CreateTransactionModal } from "./components/create-transaction-modal";
import { dummyTransactions, dummyCategories } from "./components/dummy-data";
import { DataTable } from "@/components/data-table/data-table";
import { transactionColumns } from "./transaction-column";
import { TransactionFormValues } from "@/schemas/finance/transaction-schema";

const TransactionPage = () => {
    const [typeFilter, setTypeFilter] =
        React.useState<TransactionTypeFilter>("ALL");
    const [search, setSearch] = React.useState("");
    const [categoryFilter, setCategoryFilter] = React.useState("ALL");
    const [isModalOpen, setIsModalOpen] = React.useState(false);

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
                />

                <DataTable
                    columns={transactionColumns}
                    data={filteredTransactions}
                    getRowId={(row) => row.id}
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