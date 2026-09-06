export type CategoryType = "INCOME" | "EXPENSE";

export type CategoryT = {
    id: string;
    name: string;
    type: CategoryType;
    icon: string | null;
    color: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}