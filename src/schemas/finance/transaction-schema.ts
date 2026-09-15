import { z } from "zod";

export const transactionFormSchema = z.object({
    description: z.string().trim().max(255).optional(),
    amount: z
        .string()
        .trim()
        .min(1, "Amount is required")
        .refine((val) => !Number.isNaN(Number(val)), "Enter a valid number")
        .refine((val) => Number(val) > 0, "Amount must be greater than 0"),
    type: z.enum(["INCOME", "EXPENSE"]),
    categoryId: z.string().min(1, "Category is required"),
    transactionDate: z.date({ error: "Date is required" }),
});

export type TransactionFormValues = z.infer<typeof transactionFormSchema>;

// Server-side: same shape, but transactionDate arrives as a JSON string, not a Date instance
export const createTransactionSchema = transactionFormSchema.extend({
    transactionDate: z.coerce.date(),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;

export const updateTransactionSchema = z.object({
    description: z.string().trim().max(255).optional(),
    amount: z
        .string()
        .trim()
        .min(1, "Amount is required")
        .refine((val) => !Number.isNaN(Number(val)), "Enter a valid number")
        .refine((val) => Number(val) > 0, "Amount must be greater than 0")
        .optional(),
    type: z.enum(["INCOME", "EXPENSE"]).optional(),
    categoryId: z.string().min(1).optional(),
    transactionDate: z.coerce.date().optional(),
});

export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;

export const transactionListQuerySchema = z
    .object({
        type: z.enum(["ALL", "INCOME", "EXPENSE"]).default("ALL"),
        categoryId: z.string().optional(),
        search: z.string().trim().max(255).optional(),
        fromDate: z.coerce.date().optional(),
        toDate: z.coerce.date().optional(),
        page: z.coerce.number().int().min(1).default(1),
        limit: z.coerce.number().int().min(1).max(100).default(20),
    })
    .refine(
        (data) => !data.fromDate || !data.toDate || data.fromDate <= data.toDate,
        { message: "fromDate must be before or equal to toDate", path: ["fromDate"] }
    );

export type TransactionListQuery = z.infer<typeof transactionListQuerySchema>;