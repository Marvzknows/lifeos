export type FinanceCategoryT = {
    id: string;
    userId: string;
    name: string;
    type: FinanceCategoryTypeT;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
};

export type FinanceCategoryTypeT = "INCOME" | "EXPENSE";

export type FinanceCategoriesListResponseT = {
    income: FinanceCategoryT[];
    expense: FinanceCategoryT[];
};


export type CreateFinanceCategoryPayloadT = {
    name: string;
    type: "INCOME" | "EXPENSE";
    icon?: string;
    color?: string;
}