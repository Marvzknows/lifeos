import {
  GetTasksParamsT,
  PaginatedTasksResponseT,
  TaskResponseT,
  TaskStatsResponseT,
} from "@/app/types/task";
import { TaskFormValues } from "@/schemas/task/task-form-schema";
import { UpdateTaskPayloadT } from "@/schemas/task/task-schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "../../axios";
import taskService from "../tasks.services";
import { toast } from "@/components/ui/toast";
import { TaskUpdateStatusSchema } from "@/schemas/task/task-update-status";

export const taskKeys = {
  all: ["tasks"] as const,

  lists: () => [...taskKeys.all, "list"] as const,

  list: (params?: GetTasksParamsT) => [...taskKeys.lists(), params] as const,

  details: () => [...taskKeys.all, "detail"] as const,

  detail: (id: string) => [...taskKeys.details(), id] as const,

  stats: () => [...taskKeys.all, "stats"] as const,
};

// Get all tasks
export const useTasks = (params?: GetTasksParamsT) => {
  return useQuery<PaginatedTasksResponseT, ApiError>({
    queryKey: taskKeys.list(params),
    queryFn: () => taskService.getAll(params),
  });
};

// Get task by ID
export const useTask = (id: string) => {
  return useQuery<TaskResponseT, ApiError>({
    queryKey: taskKeys.detail(id),
    queryFn: () => taskService.getById(id),
    enabled: !!id,
  });
};

// Create task
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<TaskResponseT, ApiError, TaskFormValues>({
    mutationFn: (data) => taskService.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: taskKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: taskKeys.stats(),
      });
    },

    onError: (error) => {
      toast.add({
        title: "Failed to create task",
        description: error.message || "Something went wrong.",
      });
    },
  });
};

// Update task
export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<
    TaskResponseT,
    ApiError,
    {
      id: string;
      data: UpdateTaskPayloadT;
    }
  >({
    mutationFn: ({ id, data }) => taskService.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: taskKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: taskKeys.detail(variables.id),
      });
    },

    onError: (error) => {
      toast.add({
        title: "Failed to update task",
        description: error.message || "Something went wrong.",
      });
    },
  });
};

// Delete task
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation<TaskResponseT, ApiError, string>({
    mutationFn: (id) => taskService.delete(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: taskKeys.all,
      });

      queryClient.removeQueries({
        queryKey: taskKeys.detail(id),
      });

      queryClient.invalidateQueries({
        queryKey: taskKeys.stats(),
      });
    },

    onError: (error) => {
      toast.add({
        title: "Failed to delete task",
        description: error.message || "Something went wrong.",
      });
    },
  });
};

// Restore task
export const useRestoreTask = () => {
  const queryClient = useQueryClient();

  return useMutation<TaskResponseT, ApiError, string>({
    mutationFn: (id) => taskService.restore(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: taskKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: taskKeys.detail(id),
      });

      queryClient.invalidateQueries({
        queryKey: taskKeys.stats(),
      });

      toast.add({
        title: "Task restored",
        description: "Your task has been restored successfully.",
      });
    },

    onError: (error) => {
      toast.add({
        title: "Failed to restore task",
        description: error.message || "Something went wrong.",
      });
    },
  });
};

// Mark as complete/pending
export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<TaskResponseT, ApiError, { id: string; status: TaskUpdateStatusSchema["status"] }>({
    mutationFn: ({ id, status }) => taskService.updateTaskStatus(id, status),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: taskKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: taskKeys.detail(variables.id),
      });

      queryClient.invalidateQueries({
        queryKey: taskKeys.stats(),
      });
    },

    onError: (error) => {
      toast.add({
        title: "Failed to update task status",
        description: error.message || "Something went wrong.",
      });
    },
  });
};

// Get task statistics
export const useTaskStats = () => {
  return useQuery<TaskStatsResponseT, ApiError>({
    queryKey: taskKeys.stats(),
    queryFn: () => taskService.taskStats(),
  });
};