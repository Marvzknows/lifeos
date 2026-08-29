import { z } from "zod";

export const taskQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  filter: z.enum(["all", "today", "upcoming", "completed", "pending", "in_progress", "overdue"]).default("all"),
  search: z.string().trim().min(1).max(200).optional(),
  dueDate: z.date().optional(),
});

export type TaskQueryParams = z.infer<typeof taskQuerySchema>;
