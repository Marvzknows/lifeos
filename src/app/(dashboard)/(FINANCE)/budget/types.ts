import { PaginatedResponseT } from "@/app/types/globals";

export type BudgetStatus = "all" | "on-track" | "warning" | "over";

export type BudgetCategoryT = {
    id: string;
    name: string;
    icon: string | null;
    color: string | null;
};

export type BudgetRowT = {
    id: string;
    category: BudgetCategoryT;
    budgeted: number;
    spent: number;
    remaining: number;
    progress: number; // percent, can be over 100
};

export type BudgetT = {
    id: string;
    amount: number;
    month: string;
    categoryId: string;
    category: BudgetCategoryT;
    createdAt: string;
    updatedAt: string;
};

export type BudgetResponseT = {
    budget: BudgetT;
};

export type PaginatedBudgetsResponseT = PaginatedResponseT<BudgetRowT>;

export type GetBudgetsParamsT = {
    month: string;
    page?: number;
    limit?: number;
    search?: string;
    status?: BudgetStatus;
};

export type BudgetSummaryResponseT = {
    summary: {
        totalBudgeted: number;
        totalSpent: number;
        totalRemaining: number;
        overBudgetCount: number;
    };
};

export const dummyBudgets: BudgetRowT[] = [
    {
        id: "b1",
        category: { id: "c1", name: "Rent", icon: "home", color: "#D85A30" },
        budgeted: 15000,
        spent: 15000,
        remaining: 0,
        progress: 100,
    },
    {
        id: "b2",
        category: { id: "c2", name: "Groceries", icon: "shopping-cart", color: "#639922" },
        budgeted: 8000,
        spent: 6240,
        remaining: 1760,
        progress: 78,
    },
    {
        id: "b3",
        category: { id: "c3", name: "Utilities", icon: "zap", color: "#BA7517" },
        budgeted: 4500,
        spent: 3825,
        remaining: 675,
        progress: 85,
    },
    {
        id: "b4",
        category: { id: "c4", name: "Transportation", icon: "car", color: "#7F77DD" },
        budgeted: 3000,
        spent: 3450,
        remaining: -450,
        progress: 115,
    },
    {
        id: "b5",
        category: { id: "c5", name: "Entertainment", icon: "gamepad-2", color: "#D4537E" },
        budgeted: 2000,
        spent: 800,
        remaining: 1200,
        progress: 40,
    },
    {
        id: "b6",
        category: { id: "c6", name: "Dining Out", icon: "utensils", color: "#E24B4A" },
        budgeted: 3500,
        spent: 4270,
        remaining: -770,
        progress: 122,
    },
    {
        id: "b7",
        category: { id: "c7", name: "Health", icon: "heart-pulse", color: "#1D9E75" },
        budgeted: 2500,
        spent: 500,
        remaining: 2000,
        progress: 20,
    },
    {
        id: "b8",
        category: { id: "c8", name: "Education", icon: "graduation-cap", color: "#378ADD" },
        budgeted: 5000,
        spent: 2500,
        remaining: 2500,
        progress: 50,
    },
    {
        id: "b9",
        category: { id: "c9", name: "Shopping", icon: "shirt", color: "#888780" },
        budgeted: 3000,
        spent: 2790,
        remaining: 210,
        progress: 93,
    },
    {
        id: "b10",
        category: { id: "c10", name: "Subscriptions", icon: "credit-card", color: "#7F77DD" },
        budgeted: 1200,
        spent: 960,
        remaining: 240,
        progress: 80,
    },
];