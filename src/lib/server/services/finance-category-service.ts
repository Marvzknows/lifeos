import prisma from "@/lib/prisma";
import { CreateFinanceCategoryPayloadT } from "@/schemas/finance/category-schema";
import { ForbiddenError, NotFoundError } from "../errors/errors";

type AssertCategoryAccessT = {
    userId: string;
    categoryId: string;
    allowDeleted?: boolean;
};

async function assertCategoryAccess({
    userId,
    categoryId,
    allowDeleted,
}: AssertCategoryAccessT) {
    const category = await prisma.category.findUnique({ where: { id: categoryId } });

    if (!category) throw new NotFoundError("Category not found");
    if (!allowDeleted && category.deletedAt)
        throw new NotFoundError("Category not found");
    if (category.userId !== userId) {
        throw new ForbiddenError("You don't have permission to access this category");
    }

    return category;
}

export async function createFinanceCategory(userId: string, data: CreateFinanceCategoryPayloadT) {
    return await prisma.category.create({
        data: { ...data, userId },
    });
}

export async function getFinanceCategoriesList(userId: string) {
    const income = await prisma.category.findMany({
        where: { userId, type: "INCOME", deletedAt: null },
    });
    const expense = await prisma.category.findMany({
        where: { userId, type: "EXPENSE", deletedAt: null },
    });
    return { income, expense };
}

export async function updateFinanceCategory(
    userId: string,
    categoryId: string,
    data: Partial<CreateFinanceCategoryPayloadT>
) {
    await assertCategoryAccess({ userId, categoryId });

    return await prisma.category.update({
        where: { id: categoryId, userId },
        data,
    });
}

export async function getFinanceCategoryById(userId: string, categoryId: string) {
    return await assertCategoryAccess({ userId, categoryId });
}

export async function softDeleteFinanceCategory(userId: string, categoryId: string) {
    await assertCategoryAccess({ userId, categoryId });

    return await prisma.category.update({
        where: { id: categoryId, userId },
        data: { deletedAt: new Date() },
    });
}

export async function restoreFinanceCategory(userId: string, categoryId: string) {
    const category = await assertCategoryAccess({ userId, categoryId, allowDeleted: true });

    if (!category.deletedAt) return category;

    return await prisma.category.update({
        where: { id: categoryId, userId },
        data: { deletedAt: null },
    });
}

export async function hardDeleteFinanceCategory(userId: string, categoryId: string) {
    await assertCategoryAccess({ userId, categoryId, allowDeleted: true });

    return await prisma.category.delete({
        where: { id: categoryId, userId },
    });
}