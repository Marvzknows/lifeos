import z from "zod";

export const budgetSchema = z.object({
    categoryId: z.uuid({ error: "Select a category" }),
    amount: z
        .number({ error: "Enter a valid amount" })
        .positive("Amount must be greater than 0")
        .max(9_999_999_999.99, "Amount is too large")
        .multipleOf(0.01, "Use at most 2 decimal places"),
    // "YYYY-MM", e.g. "2026-10"
    month: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Month must be YYYY-MM"),
});

export type BudgetPayloadT = z.infer<typeof budgetSchema>;

// PATCH: only the amount is editable (category + month identify the budget)
export const updateBudgetSchema = budgetSchema.pick({ amount: true });
export type UpdateBudgetPayloadT = z.infer<typeof updateBudgetSchema>;

export const monthToDate = (month: string) => new Date(`${month}-01T00:00:00.000Z`);