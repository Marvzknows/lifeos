import prisma from "@/lib/prisma";
import { CreateFinanceCategoryPayloadT } from "@/schemas/finance/category-schema";

export async function createFinanceCategory(userId: string, data: CreateFinanceCategoryPayloadT) {
    return await prisma.category.create({
        data: { ...data, userId },
    });
}
