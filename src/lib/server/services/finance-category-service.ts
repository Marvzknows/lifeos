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
        where: { userId, type: "INCOME" },
    });
    const expense = await prisma.category.findMany({
        where: { userId, type: "EXPENSE" },
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