import prisma from "@/lib/prisma";
import { CreateFinanceCategoryPayloadT } from "@/schemas/finance/category-schema";

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