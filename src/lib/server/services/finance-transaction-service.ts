import prisma from "@/lib/prisma";
import { CreateTransactionInput } from "@/schemas/finance/transaction-schema";
import { ForbiddenError, NotFoundError, ValidationError } from "../errors/errors";
import { TransactionListQuery, UpdateTransactionInput } from "@/schemas/finance/transaction-schema";
import { Prisma } from "@/generated/prisma/client";

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

const TRANSACTION_SELECT = {
    id: true,
    amount: true,
    description: true,
    transactionDate: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    category: {
        select: { id: true, name: true, type: true, icon: true, color: true },
    },
} satisfies Prisma.TransactionSelect;

const validateTransactionOwnership = async (
    transactionId: string,
    userId: string,
    opts?: { includeDeleted?: boolean }
) => {
    const transaction = await prisma.transaction.findFirst({
        where: {
            id: transactionId,
            ...(opts?.includeDeleted ? {} : { deletedAt: null }),
        },
    });
    if (!transaction) throw new NotFoundError("Transaction not found");
    if (transaction.userId !== userId) throw new ForbiddenError("Unauthorized");
    return transaction;
};

export const getFinanceTransactionById = async (
    userId: string,
    transactionId: string
) => {
    await validateTransactionOwnership(transactionId, userId, { includeDeleted: true });

    return prisma.transaction.findUniqueOrThrow({
        where: { id: transactionId },
        select: TRANSACTION_SELECT,
    });
};

// --- List with filters + pagination ---
export const listFinanceTransactions = async (
    userId: string,
    query: TransactionListQuery
) => {
    const { type, categoryId, search, fromDate, toDate, page, limit } = query;

    const where: Prisma.TransactionWhereInput = {
        userId,
        deletedAt: null,
        ...(categoryId && categoryId !== "ALL" && { categoryId }),
        ...(type !== "ALL" && { category: { type } }),
        ...(search && {
            description: { contains: search, mode: "insensitive" },
        }),
        ...((fromDate || toDate) && {
            transactionDate: {
                ...(fromDate && { gte: fromDate }),
                ...(toDate && { lte: toDate }),
            },
        }),
    };

    const [items, total] = await Promise.all([
        prisma.transaction.findMany({
            where,
            orderBy: { transactionDate: "desc" },
            skip: (page - 1) * limit,
            take: limit,
            select: TRANSACTION_SELECT,
        }),
        prisma.transaction.count({ where }),
    ]);

    return {
        items,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};

export const updateFinanceTransaction = async (
    userId: string,
    transactionId: string,
    data: UpdateTransactionInput
) => {
    const transaction = await validateTransactionOwnership(transactionId, userId);

    let category;
    if (data.categoryId) {
        category = await validateCategory(data.categoryId, userId);
    }

    if (data.type) {
        const categoryToCheck =
            category ??
            (await prisma.category.findFirst({
                where: { id: transaction.categoryId, deletedAt: null },
            }));
        if (categoryToCheck && categoryToCheck.type !== data.type) {
            throw new ValidationError(
                `Transaction type (${data.type}) must match category type (${categoryToCheck.type})`
            );
        }
    }

    return prisma.transaction.update({
        where: { id: transactionId },
        data: {
            ...(data.description !== undefined && { description: data.description }),
            ...(data.amount !== undefined && { amount: data.amount }),
            ...(data.categoryId !== undefined && { categoryId: data.categoryId }),
            ...(data.transactionDate !== undefined && {
                transactionDate: data.transactionDate,
            }),
        },
        select: TRANSACTION_SELECT,
    });
};

export const softDeleteFinanceTransaction = async (
    userId: string,
    transactionId: string
) => {
    const transaction = await validateTransactionOwnership(transactionId, userId);
    if (transaction.deletedAt) {
        throw new ValidationError("Transaction is already deleted");
    }
    return prisma.transaction.update({
        where: { id: transactionId },
        data: { deletedAt: new Date() },
        select: TRANSACTION_SELECT,
    });
};

export const restoreFinanceTransaction = async (
    userId: string,
    transactionId: string
) => {
    const transaction = await validateTransactionOwnership(transactionId, userId, {
        includeDeleted: true,
    });
    if (!transaction.deletedAt) {
        throw new ValidationError("Transaction is not deleted");
    }
    return prisma.transaction.update({
        where: { id: transactionId },
        data: { deletedAt: null },
        select: TRANSACTION_SELECT,
    });
};

export const permanentlyDeleteFinanceTransaction = async (
    userId: string,
    transactionId: string
) => {
    const transaction = await validateTransactionOwnership(transactionId, userId, {
        includeDeleted: true,
    });
    if (!transaction.deletedAt) {
        throw new ValidationError(
            "Transaction must be soft-deleted before it can be permanently deleted"
        );
    }
    await prisma.transaction.delete({ where: { id: transactionId } });
};