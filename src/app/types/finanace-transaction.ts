import { FinanceCategoryTypeT } from "./finanace-category";

export type TransactionTypeT = "INCOME" | "EXPENSE";

export interface TransactionT {
    id: string;
    description: string;
    amount: number;
    type: TransactionTypeT;
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