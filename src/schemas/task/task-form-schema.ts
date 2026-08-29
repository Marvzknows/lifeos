import { z } from "zod";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const taskFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Task title is required")
    .max(100, "Task title must not exceed 100 characters"),

  priority: z.enum(["LOW", "MEDIUM", "HIGH"], {
    message: "Priority is required",
  }),

  dueDate: z.date().refine((date) => date >= today, {
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

export type TaskFormValues = z.infer<typeof taskFormSchema>;
