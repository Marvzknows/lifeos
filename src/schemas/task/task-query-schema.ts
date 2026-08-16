import { z } from "zod";

export const taskQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  filter: z.enum(["all", "today", "upcoming", "completed"]).default("all"),
});

export type TaskQueryParams = z.infer<typeof taskQuerySchema>;
