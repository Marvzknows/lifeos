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