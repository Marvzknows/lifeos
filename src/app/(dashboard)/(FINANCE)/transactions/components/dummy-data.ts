export type TransactionType = "INCOME" | "EXPENSE";

export interface Transaction {
    id: string;
    description: string;
    amount: number;
    type: TransactionType;
    transactionDate: string;
    category: {
        id: string;
        name: string;
    };
}

export const dummyCategories = [
    { id: "cat-1", name: "Salary" },
    { id: "cat-2", name: "Groceries" },
    { id: "cat-3", name: "Transportation" },
    { id: "cat-4", name: "Food and drink" },
    { id: "cat-5", name: "Freelance" },
];

export const dummyTransactions: Transaction[] = [
    {
        id: "txn-1",
        description: "September salary",
        amount: 45000,
        type: "INCOME",
        transactionDate: "2026-09-13",
        category: { id: "cat-1", name: "Salary" },
    },
    {
        id: "txn-2",
        description: "Grocery shopping at SM",
        amount: 2500,
        type: "EXPENSE",
        transactionDate: "2026-09-13",
        category: { id: "cat-2", name: "Groceries" },
    },
    {
        id: "txn-3",
        description: "Gas refill",
        amount: 1590,
        type: "EXPENSE",
        transactionDate: "2026-09-11",
        category: { id: "cat-3", name: "Transportation" },
    },
    {
        id: "txn-4",
        description: "Coffee with client",
        amount: 150.5,
        type: "EXPENSE",
        transactionDate: "2026-09-10",
        category: { id: "cat-4", name: "Food and drink" },
    },
    {
        id: "txn-5",
        description: "Freelance web project",
        amount: 12000,
        type: "INCOME",
        transactionDate: "2026-09-08",
        category: { id: "cat-5", name: "Freelance" },
    },
];