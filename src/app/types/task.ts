import { TaskUpdateStatusSchema } from "@/schemas/task/task-update-status";
import { PaginatedResponseT } from "./globals";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";
export type TaskStatus = "all" | "today" | "upcoming" | "completed";

export type Task = {
  id: string;
  title: string;
  description: string | null;
  priority: TaskPriority;
  dueDate: string | null;
  status: TaskUpdateStatusSchema["status"];
  createdAt: string;
  updatedAt: string;
};

export type TaskResponseT = {
  task: Task;
};

export type PaginatedTasksResponseT = PaginatedResponseT<Task>;

export type GetTasksParamsT = {
  page?: number;
  limit?: number;
  priority?: TaskPriority;
  filter?: "all" | "today" | "upcoming" | "completed";
  search?: string;
  dueDate?: string;
};
