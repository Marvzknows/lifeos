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
    .max(2000, "Description must be under 2000 characters")
    .optional(),
});
