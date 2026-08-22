import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title is too long"),

  priority: z.enum(["LOW", "MEDIUM", "HIGH"], {
    error: "Priority is required",
  }),

  dueDate: z.coerce
    .date({ error: "Due date must be a valid date" })
    .refine((date) => date >= new Date(new Date().setHours(0, 0, 0, 0)), {
      message: "Due date cannot be in the past",
    }),

  description: z
    .string()
    .trim()
    .max(2000, "Description must be under 2000 characters")
    .optional()
    .refine((val) => !val || val.length >= 6, {
      message: "Description must be at least 6 characters if provided",
    }),
});

export const updateTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title is too long")
    .optional(),
  description: z
    .string()
    .trim()
    .max(2000, "Description must be under 2000 characters")
    .optional()
    .refine((val) => !val || val.length >= 10, {
      message: "Description must be at least 10 characters if provided",
    }),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  dueDate: z.coerce.date({ error: "Due date must be a valid date" }).optional(),
});

export type UpdateTaskPayloadT = z.infer<typeof updateTaskSchema>;
