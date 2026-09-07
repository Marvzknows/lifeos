"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { CategoryT } from "./types";
import { CategoryType } from "@/generated/prisma/enums";
import CategorySection from "./components/category-section";
import { CategoryFormValues } from "@/schemas/finance/category-schema";
import { AddCategoryModal } from "./components/add-category-modal";
import { CategoryStats } from "./components/category-stats";
import { toast } from "@/components/ui/toast";

const now = new Date().toISOString();

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
    const [categories, setCategories] = useState<CategoryT[]>(dummyCategories);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalDefaultType, setModalDefaultType] = useState<CategoryType>("EXPENSE");
    const [editingCategory, setEditingCategory] = useState<CategoryT | null>(null);

    const income = categories.filter((c) => c.type === "INCOME");
    const expense = categories.filter((c) => c.type === "EXPENSE");

    function handleCategoryClick(category: CategoryT) {
        setEditingCategory(category);
        setModalOpen(true);
    }

    function handleAddClick(type: CategoryType) {
        setEditingCategory(null);
        setModalDefaultType(type);
        setModalOpen(true);
    }

    function handleDeleteCategory(category: CategoryT) {
        setCategories((prev) => prev.filter((c) => c.id !== category.id));

        toast.add({ title: `"${category.name}" deleted`, });
    }

    function handleSubmitCategory(values: CategoryFormValues) {
        if (editingCategory) {
            // Edit mode: update the existing category in place.
            setCategories((prev) =>
                prev.map((c) =>
                    c.id === editingCategory.id
                        ? {
                            ...c,
                            ...values,
                            updatedAt: new Date().toISOString(),
                        }
                        : c,
                ),
            );
        } else {
            // Add mode: append a new category.
            const newCategory: CategoryT = {
                id: crypto.randomUUID(),
                name: values.name,
                type: values.type,
                icon: values.icon,
                color: values.color,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                deletedAt: null,
            };
            setCategories((prev) => [...prev, newCategory]);
        }
    }

    return (
        <div className="space-y-8 p-6">
            <PageHeader
                title="Categories"
                description="Organize your income and expenses with custom categories."
            />

            <CategoryStats
                total={categories.length}
                income={income.length}
                expense={expense.length}
            />

            <div className="space-y-6">
                <CategorySection
                    title="Income"
                    categories={income}
                    onCategoryClick={handleCategoryClick}
                    onAddClick={() => handleAddClick("INCOME")}
                    onDeleteCategory={handleDeleteCategory}
                />
                <CategorySection
                    title="Expense"
                    categories={expense}
                    onCategoryClick={handleCategoryClick}
                    onAddClick={() => handleAddClick("EXPENSE")}
                    onDeleteCategory={handleDeleteCategory}
                />
            </div>

            <AddCategoryModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                onSubmit={handleSubmitCategory}
                defaultType={modalDefaultType}
                category={editingCategory ?? undefined}
                onDelete={handleDeleteCategory}
            />
        </div>
    );
};

export default CategoriesPage;