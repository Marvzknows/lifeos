import { TransactionCategoryOptionT, TransactionT } from "@/app/types/finanace-transaction";

export const dummyCategories: TransactionCategoryOptionT[] = [
    { id: "cat-1", name: "Salary", type: "INCOME" },
    { id: "cat-2", name: "Groceries", type: "EXPENSE" },
    { id: "cat-3", name: "Transportation", type: "EXPENSE" },
    { id: "cat-4", name: "Food and drink", type: "EXPENSE" },
    { id: "cat-5", name: "Freelance", type: "INCOME" },
];

export const dummyTransactions: TransactionT[] = [
    {
        id: "txn-1",
        description: "September salary",
        amount: 45000,
        type: "INCOME",
        transactionDate: "2026-09-13",
        category: { id: "cat-1", name: "Salary", type: "INCOME" },
    },
    {
        id: "txn-2",
        description: "Grocery shopping at SM",
        amount: 2500,
        type: "EXPENSE",
        transactionDate: "2026-09-13",
        category: { id: "cat-2", name: "Groceries", type: "EXPENSE" },
    },
    {
        id: "txn-3",
        description: "Gas refill",
        amount: 1590,
        type: "EXPENSE",
        transactionDate: "2026-09-11",
        category: { id: "cat-3", name: "Transportation", type: "EXPENSE" },
    },
    {
        id: "txn-4",
        description: "Coffee with client",
        amount: 150.5,
        type: "EXPENSE",
        transactionDate: "2026-09-10",
        category: { id: "cat-4", name: "Food and drink", type: "EXPENSE" },
    },
    {
        id: "txn-5",
        description: "Freelance web project",
        amount: 12000,
        type: "INCOME",
        transactionDate: "2026-09-08",
        category: { id: "cat-5", name: "Freelance", type: "INCOME" },
    },
];