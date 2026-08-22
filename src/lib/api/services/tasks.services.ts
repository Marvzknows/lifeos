import { UpdateTaskPayloadT } from "@/schemas/task/task-schema";
import { apiClient } from "../axios";
import { TaskFormValues } from "@/schemas/task/task-form-schema";
import {
  GetTasksParamsT,
  PaginatedTasksResponseT,
  TaskResponseT,
} from "@/app/types/task";
import { TaskUpdateStatusSchema } from "@/schemas/task/task-update-status";

export const taskService = {
  create: async (data: TaskFormValues): Promise<TaskResponseT> => {
    const { data: response } = await apiClient.post<TaskResponseT>(
      "/tasks",
      data,
    );
    return response;
  },

  update: async (
    id: string,
    data: UpdateTaskPayloadT,
  ): Promise<TaskResponseT> => {
    const { data: response } = await apiClient.patch<TaskResponseT>(
      `/tasks/${id}`,
      data,
    );
    return response;
  },

  delete: async (id: string): Promise<TaskResponseT> => {
    const { data: response } = await apiClient.delete<TaskResponseT>(
      `/tasks/${id}`,
    );
    return response;
  },

  getById: async (id: string): Promise<TaskResponseT> => {
    const { data: response } = await apiClient.get<TaskResponseT>(
      `/tasks/${id}`,
    );
    return response;
  },

  getAll: async (
    params?: GetTasksParamsT,
  ): Promise<PaginatedTasksResponseT> => {
    const { data: response } = await apiClient.get<PaginatedTasksResponseT>(
      "/tasks",
      { params },
    );
    return response;
  },

  restore: async (id: string): Promise<TaskResponseT> => {
    const { data: response } = await apiClient.post<TaskResponseT>(
      `/tasks/${id}/restore`,
    );
    return response;
  },

  updateTaskStatus: async (
    id: string,
    status: TaskUpdateStatusSchema["status"],
  ): Promise<TaskResponseT> => {
    const { data: response } = await apiClient.patch<TaskResponseT>(
      `/tasks/${id}/status`,
      { status },
    );
    return response;
  },
};

export default taskService;
