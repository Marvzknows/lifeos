import prisma from "@/lib/prisma";
import { BudgetPayloadT, monthToDate, UpdateBudgetPayloadT } from "@/schemas/finance/budget-schema";
import { shiftMonth } from "@/helpers/budget-month";
import { Prisma } from "@/generated/prisma/client";
import { ForbiddenError, NotFoundError, ValidationError } from "../errors/errors";
import { assertCategoryAccess } from "./finance-category-service";

const getMonthRange = (month: string) => {
    return {
        start: new Date(`${month}-01T00:00:00+08:00`),
        end: new Date(`${shiftMonth(month, 1)}-01T00:00:00+08:00`),
    };
}

export async function getBudgetList(userId: string, month: string) {
    const { start, end } = getMonthRange(month);

    const [budgets, spending] = await Promise.all([
        prisma.budget.findMany({
            where: {
                userId,
                month: monthToDate(month),
                category: { deletedAt: null },
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                        icon: true,
                        color: true
                    }
                },
            },
            orderBy: { category: { name: "asc" } },
        }),
        prisma.transaction.groupBy({
            by: ["categoryId"],
            where: {
                userId,
                deletedAt: null,
                transactionDate: { gte: start, lt: end },
            },
            _sum: { amount: true },
        }),
    ]);

    const spentByCategory = new Map(
        spending.map((s) => [s.categoryId, s._sum.amount?.toNumber() ?? 0]),
    );

    return budgets.map((b) => {
        const budgeted = b.amount.toNumber();
        const spent = spentByCategory.get(b.categoryId) ?? 0;

        return {
            id: b.id,
            category: b.category,
            budgeted,
            spent,
            remaining: budgeted - spent,
            progress: budgeted > 0 ? Math.round((spent / budgeted) * 100) : 0,
        };
    });
}

const budgetInclude = {
    category: { select: { id: true, name: true, icon: true, color: true } },
} satisfies Prisma.BudgetInclude;

function toBudgetDto(b: Prisma.BudgetGetPayload<{ include: typeof budgetInclude }>) {
    return {
        id: b.id,
        amount: b.amount.toNumber(),
        month: b.month.toISOString(),
        categoryId: b.categoryId,
        category: b.category,
        createdAt: b.createdAt.toISOString(),
        updatedAt: b.updatedAt.toISOString(),
    };
}

async function assertBudgetAccess(userId: string, budgetId: string) {
    const budget = await prisma.budget.findUnique({ where: { id: budgetId } });

    if (!budget) throw new NotFoundError("Budget not found");
    if (budget.userId !== userId) {
        throw new ForbiddenError("You don't have permission to access this budget");
    }

    return budget;
}

export async function getBudgetById(userId: string, budgetId: string) {
    await assertBudgetAccess(userId, budgetId);

    const budget = await prisma.budget.findUniqueOrThrow({
        where: { id: budgetId },
        include: budgetInclude,
    });
    return toBudgetDto(budget);
}

export async function createBudget(userId: string, data: BudgetPayloadT) {
    const category = await assertCategoryAccess({ userId, categoryId: data.categoryId });

    if (category.type !== "EXPENSE") {
        throw new ValidationError("Budgets can only be set for expense categories");
    }

    try {
        const budget = await prisma.budget.create({
            data: {
                userId,
                categoryId: data.categoryId,
                amount: data.amount,
                month: monthToDate(data.month),
            },
            include: budgetInclude,
        });
        return toBudgetDto(budget);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            throw new ValidationError("A budget for this category and month already exists");
        }
        throw error;
    }
}

export async function updateBudget(
    userId: string,
    budgetId: string,
    data: UpdateBudgetPayloadT,
) {
    await assertBudgetAccess(userId, budgetId);

    const budget = await prisma.budget.update({
        where: { id: budgetId, userId },
        data: { amount: data.amount },
        include: budgetInclude,
    });
    return toBudgetDto(budget);
}

export async function deleteBudget(userId: string, budgetId: string) {
    await assertBudgetAccess(userId, budgetId);

    await prisma.budget.delete({ where: { id: budgetId, userId } });
}