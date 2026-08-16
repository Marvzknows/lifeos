import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),
  description: z
    .string()
    .max(2000, "Description must be under 2000 characters")
    .optional(),
  dueDate: z.coerce.date({ error: "Due date must be a valid date" }).optional(),
});
