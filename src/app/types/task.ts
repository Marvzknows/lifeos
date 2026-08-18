import { PaginatedResponseT } from "./globals";

export type Task = {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TaskResponseT = { task: Task };
export type PaginatedTasksResponseT = PaginatedResponseT<Task>;

export type GetTasksParamsT = {
  page?: number;
  limit?: number;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  filter?: "all" | "today" | "upcoming" | "completed";
  search?: string;
};
