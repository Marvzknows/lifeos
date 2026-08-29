import z from "zod";

export const taskUpdateStatusSchema = z.object({
  status: z.enum(["PENDING", "COMPLETED", "IN_PROGRESS"], {
    error: "Invalid status"
  }),
});

export type TaskUpdateStatusSchema = z.infer<typeof taskUpdateStatusSchema>;