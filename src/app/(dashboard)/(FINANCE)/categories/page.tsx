"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { CategoryType } from "@/generated/prisma/enums";
import CategorySection from "./components/category-section";
import { CategoryFormValues } from "@/schemas/finance/category-schema";
import { AddCategoryModal } from "./components/add-category-modal";
import { CategoryStats } from "./components/category-stats";
import { toast } from "@/components/ui/toast";
import { useFinanceCategories } from "@/lib/api/services/hooks/finance.category.hooks";
import { FinanceCategoryT } from "@/app/types/finanace-category";

const CategoriesPage = () => {
    const { data, isLoading } = useFinanceCategories();
    console.log(data)
    const [modalOpen, setModalOpen] = useState(false);
    const [modalDefaultType, setModalDefaultType] = useState<CategoryType>("EXPENSE");
    const [editingCategory, setEditingCategory] = useState<FinanceCategoryT | null>(null);

    const income = data?.income ?? [];
    const expense = data?.expense ?? [];
    const total = income.length + expense.length;

    function handleCategoryClick(category: FinanceCategoryT) {
        setEditingCategory(category);
        setModalOpen(true);
    }

    function handleAddClick(type: CategoryType) {
        setEditingCategory(null);
        setModalDefaultType(type);
        setModalOpen(true);
    }

    function handleDeleteCategory(category: FinanceCategoryT) {
        toast.add({ title: `"${category.name}" deleted`, });
    }

    function handleSubmitCategory(values: CategoryFormValues) {
        if (editingCategory) {
            // Edit mode: update the existing category in place.
            // setCategories((prev) =>
            //     prev.map((c) =>
            //         c.id === editingCategory.id
            //             ? {
            //                 ...c,
            //                 ...values,
            //                 updatedAt: new Date().toISOString(),
            //             }
            //             : c,
            //     ),
            // );
        } else {
            // Add mode: append a new category.
            // const newCategory: CategoryT = {
            //     id: crypto.randomUUID(),
            //     name: values.name,
            //     type: values.type,
            //     icon: values.icon,
            //     color: values.color,
            //     createdAt: new Date().toISOString(),
            //     updatedAt: new Date().toISOString(),
            //     deletedAt: null,
            // };
            // setCategories((prev) => [...prev, newCategory]);
        }
    }

    return (
        <div className="space-y-8 p-6">
            <PageHeader
                title="Categories"
                description="Organize your income and expenses with custom categories."
            />

            <CategoryStats
                total={total ?? 0}
                income={income.length}
                expense={expense.length}
            />

            <div className="space-y-6">
                <CategorySection
                    title="Income"
                    categories={data?.income ?? []}
                    onCategoryClick={handleCategoryClick}
                    onAddClick={() => handleAddClick("INCOME")}
                    onDeleteCategory={handleDeleteCategory}
                />
                <CategorySection
                    title="Expense"
                    categories={data?.expense ?? []}
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