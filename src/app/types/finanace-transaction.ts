import { FinanceCategoryTypeT } from "./finanace-category";

export type TransactionTypeFilterT = "ALL" | "INCOME" | "EXPENSE";

export type TransactionT = {
    id: string;
    description: string;
    amount: number;
    transactionDate: string;
    category: {
        id: string;
        name: string;
        type: FinanceCategoryTypeT
    };
}

export type TransactionCategoryOptionT = {
    id: string;
    name: string;
    type: "INCOME" | "EXPENSE";
}

export type TransactionPaginationT = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export type TransactionsListResponseT = {
    items: TransactionT[];
    pagination: TransactionPaginationT;
}

export type TransactionStatsT = {
    totalIncome: string;
    totalExpense: string;
    netBalance: string;
}

export type TransactionListFiltersT = {
    type?: TransactionTypeFilterT;
    categoryId?: string;
    search?: string;
    fromDate?: Date;
    toDate?: Date;
    page?: number;
    limit?: number;
}

export type TransactionStatsFiltersT = {
    fromDate?: Date;
    toDate?: Date;
}