export type FinanceCategoryT = {
    id: string;
    userId: string;
    name: string;
    type: FinanceCategoryTypeT;
    icon: string | null;
    color: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
};

export type FinanceCategoryTypeT = "INCOME" | "EXPENSE";

export type FinanceCategoriesListResponseT = {
    data: {
        income: FinanceCategoryT[];
        expense: FinanceCategoryT[];
    }
};


export type CreateFinanceCategoryPayloadT = {
    name: string;
    type: "INCOME" | "EXPENSE";
    icon?: string;
    color?: string;
}