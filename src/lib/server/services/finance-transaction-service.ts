import prisma from "@/lib/prisma";
import { CreateTransactionInput } from "@/schemas/finance/transaction-schema";
import { ForbiddenError, NotFoundError, ValidationError } from "../errors/errors";

const validateCategory = async (categoryId: string, userId: string) => {
    const category = await prisma.category.findFirst({
        where: { id: categoryId, deletedAt: null },
    });
    if (!category) throw new NotFoundError("Category not found");
    if (category.userId !== userId) throw new ForbiddenError("Unauthorized");
    return category;
};

export const createFinanceTransaction = async (
    userId: string,
    data: CreateTransactionInput
) => {
    const category = await validateCategory(data.categoryId, userId);

    if (category.type !== data.type) {
        throw new ValidationError(
            `Transaction type (${data.type}) must match category type (${category.type})`
        );
    }

    return await prisma.transaction.create({
        data: {
            userId,
            description: data.description,
            amount: data.amount,
            categoryId: category.id,
            transactionDate: data.transactionDate,
        },
        select: {
            id: true,
            amount: true,
            description: true,
            transactionDate: true,
            createdAt: true,
            updatedAt: true,
            category: {
                select: {
                    id: true,
                    name: true,
                    type: true,
                },
            },
        },
    });
};