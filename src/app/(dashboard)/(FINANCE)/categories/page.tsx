"use client";

import { PageHeader } from "@/components/page-header";
import { CategoryT } from "./types";
import { CategoryType } from "@/generated/prisma/enums";
import CategorySection from "./components/category-section";

const now = new Date().toISOString();

// icon values are lucide's kebab-case names, e.g. "shopping-cart"
const dummyCategories: CategoryT[] = [
    { id: "1", name: "Salary", type: "INCOME", icon: "wallet", color: "#16a34a", createdAt: now, updatedAt: now, deletedAt: null },
    { id: "2", name: "Freelance", type: "INCOME", icon: "briefcase", color: "#0ea5e9", createdAt: now, updatedAt: now, deletedAt: null },
    { id: "3", name: "Investments", type: "INCOME", icon: "trending-up", color: "#0d9488", createdAt: now, updatedAt: now, deletedAt: null },
    { id: "4", name: "Rent", type: "EXPENSE", icon: "home", color: "#dc2626", createdAt: now, updatedAt: now, deletedAt: null },
    { id: "5", name: "Groceries", type: "EXPENSE", icon: "shopping-cart", color: "#f97316", createdAt: now, updatedAt: now, deletedAt: null },
    { id: "6", name: "Utilities", type: "EXPENSE", icon: "zap", color: "#eab308", createdAt: now, updatedAt: now, deletedAt: null },
    { id: "7", name: "Transportation", type: "EXPENSE", icon: "car", color: "#7c3aed", createdAt: now, updatedAt: now, deletedAt: null },
    { id: "8", name: "Entertainment", type: "EXPENSE", icon: "clapperboard", color: "#ec4899", createdAt: now, updatedAt: now, deletedAt: null },
];

const CategoriesPage = () => {
    const income = dummyCategories.filter((c) => c.type === "INCOME");
    const expense = dummyCategories.filter((c) => c.type === "EXPENSE");

    function handleCategoryClick(category: CategoryT) {
        // TODO: open edit dialog, pre-filled with this category
        console.log("edit category", category);
    }

    function handleAddClick(type: CategoryType) {
        // TODO: open add dialog, pre-selecting this type
        console.log("add category", type);
    }

    return (
        <div className="space-y-8 p-6">
            <PageHeader
                title="Categories"
                description="Organize your income and expenses with custom categories."
            />

            <div className="space-y-6">
                <CategorySection
                    title="Income"
                    categories={income}
                    onCategoryClick={handleCategoryClick}
                    onAddClick={() => handleAddClick("INCOME")}
                />
                <CategorySection
                    title="Expense"
                    categories={expense}
                    onCategoryClick={handleCategoryClick}
                    onAddClick={() => handleAddClick("EXPENSE")}
                />
            </div>
        </div>
    );
};

export default CategoriesPage;