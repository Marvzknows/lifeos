"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { CategoryType } from "@/generated/prisma/enums";
import CategorySection from "./components/category-section";
import { CategoryFormValues } from "@/schemas/finance/category-schema";
import { AddCategoryModal } from "./components/add-category-modal";
import { CategoryStats } from "./components/category-stats";
import { toast } from "@/components/ui/toast";
import { useCreateFinanceCategory, useFinanceCategories, useUpdateFinanceCategory } from "@/lib/api/services/hooks/finance.category.hooks";
import { FinanceCategoryT } from "@/app/types/finanace-category";

const CategoriesPage = () => {
    const { data, isLoading } = useFinanceCategories();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalDefaultType, setModalDefaultType] = useState<CategoryType>("EXPENSE");
    const [editingCategory, setEditingCategory] = useState<FinanceCategoryT | null>(null);

    const income = data?.data?.income ?? [];
    const expense = data?.data?.expense ?? [];
    const total = income.length + expense.length;

    // #region Mutation
    const { mutateAsync: createCategory, isPending: isCreating, } = useCreateFinanceCategory();
    const { mutateAsync: updateCategory, isPending: isUpdating } = useUpdateFinanceCategory();
    // #endregion


    // #region Handlers
    const handleCategoryClick = (category: FinanceCategoryT) => {
        setEditingCategory(category);
        setModalOpen(true);
    }

    const handleAddClick = (type: CategoryType) => {
        setEditingCategory(null);
        setModalDefaultType(type);
        setModalOpen(true);
    }

    const handleDeleteCategory = (category: FinanceCategoryT) => {
        toast.add({ title: `"${category.name}" deleted`, });
    }

    const handleSubmitCategory = (values: CategoryFormValues) => {
        if (editingCategory) {
            toast.promise(updateCategory({ id: editingCategory.id, data: values }), {
                loading: "Updating category...",
                success: () => {
                    setModalOpen(false);
                    return {
                        title: "Category updated",
                        description: "Your category has been updated successfully.",
                    };
                },
                error: (error) => {
                    return error?.message ?? "Failed to update category.";
                },
            });
        } else {
            toast.promise(createCategory(values), {
                loading: "Creating category...",
                success: () => {
                    setModalOpen(false);
                    return {
                        title: "Category created",
                        description: "Your category has been created successfully.",
                    };
                },
                error: (error) => {
                    return error?.message ?? "Failed to create category.";
                },
            });
        }
    }
    // #endregion

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
                isLoading={isLoading}
            />

            <div className="space-y-6">
                <CategorySection
                    title="Income"
                    categories={income ?? []}
                    onCategoryClick={handleCategoryClick}
                    onAddClick={() => handleAddClick("INCOME")}
                    onDeleteCategory={handleDeleteCategory}
                    isLoading={isLoading}
                />
                <CategorySection
                    title="Expense"
                    categories={expense ?? []}
                    onCategoryClick={handleCategoryClick}
                    onAddClick={() => handleAddClick("EXPENSE")}
                    onDeleteCategory={handleDeleteCategory}
                    isLoading={isLoading}
                />
            </div>

            <AddCategoryModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                onSubmit={handleSubmitCategory}
                defaultType={modalDefaultType}
                category={editingCategory ?? undefined}
                onDelete={handleDeleteCategory}
                isLoading={isCreating || isUpdating}
            />
        </div>
    );
};

export default CategoriesPage;