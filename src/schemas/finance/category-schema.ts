import z from "zod";

export const createFinanceCategorySchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Name is required")
        .max(100, "Name is too long"),

    type: z.enum(["INCOME", "EXPENSE"], {
        error: "Type is required",
    }),

    icon: z.string().trim().max(100, "Icon is too long").optional(),

    color: z.string().trim().max(20, "Color is too long").optional(),
});

export type CreateFinanceCategoryPayloadT = z.infer<typeof createFinanceCategorySchema>;

export const updateFinanceCategorySchema = createFinanceCategorySchema.partial();
export type UpdateFinanceCategoryPayloadT = z.infer<typeof updateFinanceCategorySchema>;

export const categoryFormSchema = z.object({
    name: z
        .string()
        .min(1, "Category name is required")
        .max(50, "Keep it under 50 characters"),
    type: z.enum(["INCOME", "EXPENSE"], {
        error: "Select a category type",
    }),
    icon: z.string().min(1, "Pick an icon"),
    color: z.string().min(1, "Pick a color"),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;