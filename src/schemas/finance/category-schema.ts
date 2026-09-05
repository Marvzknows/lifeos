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