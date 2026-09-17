import { TransactionCategoryOptionT } from "@/app/types/finanace-transaction";

export const dummyCategories: TransactionCategoryOptionT[] = [
    { id: "cat-1", name: "Salary", type: "INCOME" },
    { id: "cat-2", name: "Groceries", type: "EXPENSE" },
    { id: "cat-3", name: "Transportation", type: "EXPENSE" },
    { id: "cat-4", name: "Food and drink", type: "EXPENSE" },
    { id: "cat-5", name: "Freelance", type: "INCOME" },
];