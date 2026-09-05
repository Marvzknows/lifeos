"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { cn } from "@/lib/utils";

type CategoryType = "INCOME" | "EXPENSE";

interface Category {
    id: string;
    name: string;
    type: CategoryType;
    color: string | null;
}

const dummyCategories: Category[] = [
    { id: "1", name: "Salary", type: "INCOME", color: "#16a34a" },
    { id: "2", name: "Freelance", type: "INCOME", color: "#0ea5e9" },
    { id: "3", name: "Investments", type: "INCOME", color: "#0d9488" },
    { id: "4", name: "Rent", type: "EXPENSE", color: "#dc2626" },
    { id: "5", name: "Groceries", type: "EXPENSE", color: "#f97316" },
    { id: "6", name: "Utilities", type: "EXPENSE", color: "#eab308" },
    { id: "7", name: "Transportation", type: "EXPENSE", color: "#7c3aed" },
    { id: "8", name: "Entertainment", type: "EXPENSE", color: "#ec4899" },
];

function CategoryPill({
    category,
    onClick,
}: {
    category: Category;
    onClick: (category: Category) => void;
}) {
    return (
        <button
            type="button"
            onClick={() => onClick(category)}
            className={cn(
                "inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5",
                "text-sm transition-colors hover:bg-accent",
            )}
        >
            <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: category.color ?? "#94a3b8" }}
            />
            {category.name}
        </button>
    );
}

function AddCategoryPill({ onClick }: { onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "inline-flex items-center gap-1.5 rounded-full border border-dashed px-3 py-1.5",
                "text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
            )}
        >
            <Plus className="size-3.5" />
            Add
        </button>
    );
}

function CategorySection({
    title,
    categories,
    onCategoryClick,
    onAddClick,
}: {
    title: string;
    categories: Category[];
    onCategoryClick: (category: Category) => void;
    onAddClick: () => void;
}) {
    return (
        <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                    <CategoryPill
                        key={category.id}
                        category={category}
                        onClick={onCategoryClick}
                    />
                ))}
                <AddCategoryPill onClick={onAddClick} />
            </div>
        </div>
    );
}

const CategoriesPage = () => {
    const income = dummyCategories.filter((c) => c.type === "INCOME");
    const expense = dummyCategories.filter((c) => c.type === "EXPENSE");

    function handleCategoryClick(category: Category) {
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