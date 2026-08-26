"use client";

import { TaskStats } from "@/components/tasks/task-stats";
import { taskColumns } from "./columns";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { ClipboardList, Trash2 } from "lucide-react";
import { useState } from "react";
import { AddTaskModal } from "./modals/add-task-modal";
import { toast } from "@/components/ui/toast";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import TaskFilters from "./components/task-filters";
import { useCreateTask, useDeleteTask, useTasks, useTaskStats, useUpdateTask, useUpdateTaskStatus, useViewTask } from "@/lib/api/services/hooks/tasks.hooks";
import { Task, TaskPriority, TaskStatus } from "@/app/types/task";
import { useDebounce } from "@/hooks/use-debounce";
import { TaskFormValues } from "@/schemas/task/task-form-schema";
import { EditTaskModal } from "./modals/edit-task-modal";
import { TaskUpdateStatusSchema } from "@/schemas/task/task-update-status";
import { capitalizeWords } from "@/helpers/capitalize-words";
import { formatDateForApi } from "@/helpers/formatDateForApi";
import { ViewTaskDialog } from "./components/task-view-details-modal";

const PAGE_SIZE = 10;

const TasksPage = () => {

  const [openDelete, setOpenDelete] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewTaskId, setViewTaskId] = useState<string | null>(null);

  // Filters
  const [status, setStatus] = useState<TaskStatus>("all");
  const [priority, setPriority] = useState<TaskPriority | "">("");
  const [search, setSearch] = useState("");
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const debouncedSearch = useDebounce(search);
  const { data, isLoading } = useTasks({
    page,
    limit: PAGE_SIZE,
    filter: status,
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(priority && { priority }),
    ...(dueDate && { dueDate: formatDateForApi(dueDate) }),
  });

  const { data: stats, isLoading: isLoadingStats } = useTaskStats();

  const { mutateAsync: createTask, isPending: createTaskLoading } = useCreateTask();
  const { mutateAsync: deleteTask, isPending: deleteTaskLoading } = useDeleteTask();
  const { mutateAsync: updateTaskStatus, isPending: updateTaskStatusLoading } = useUpdateTaskStatus();
  const { mutateAsync: updateTask, isPending: updateTaskLoading } = useUpdateTask();
  const { data: viewTaskData, isLoading: viewTaskLoading } = useViewTask(viewTaskId ?? '');

  const isLoadingHandlers = createTaskLoading
    || deleteTaskLoading
    || updateTaskStatusLoading
    || updateTaskLoading
    || viewTaskLoading;
  // #region Handlers
  const handleRowClick = (task: Task) => {
    setViewTaskId(task.id);
  };

  const handleChangeTaskStatus = (id: string, status: TaskUpdateStatusSchema['status']) => {
    if (!id) return
    toast.promise(updateTaskStatus({ id, status }), {
      loading: `Marking task as ${capitalizeWords(status)}...`,
      success: {
        title: "Task status updated",
        description: "Your task status has been updated successfully.",
      },
      error: "Failed to mark task as complete.",
    });
  };

  const handleDelete = () => {
    if (!deleteId) return;
    setOpenDelete(false);
    toast.promise(deleteTask(deleteId), {
      loading: "Deleting task...",
      success: () => {
        setDeleteId(null);
        return {
          title: "Task deleted",
          description: "Your task has been deleted successfully.",
        };
      },
      error: () => {
        return {
          title: "Failed to delete task",
          description: "Something went wrong.",
        };
      },
    });
  };

  const onDeleteTask = (id: string) => {
    setDeleteId(id);
    setOpenDelete(true);
  };

  const onEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleStatusChange = (value: string | null) => {
    setStatus((value ?? "all") as TaskStatus);
    setPage(1);
  };

  const handlePriorityChange = (value: string | null) => {
    setPriority((value ?? "") as TaskPriority | "");
  };

  const handleSearchChange = (value: string | null) => {
    setSearch(value ?? "");
    setPage(1);
  };

  const handleOnSubmitTask = (values: TaskFormValues) => {
    toast.promise(createTask(values), {
      loading: "Creating task...",
      success: () => {
        setIsAddTaskModalOpen(false);
        return {
          title: "Task created",
          description: "Your task has been created successfully.",
        };
      },
      error: (error) => {
        return error?.message ?? "Failed to create task.";
      },
    });
  };

  const handleOnSubmitEditTask = (values: TaskFormValues) => {
    if (!editingTask) return;

    toast.promise(updateTask({ id: editingTask.id, data: values }), {
      loading: "Saving changes...",
      success: () => {
        setEditingTask(null);
        return {
          title: "Task updated",
          description: "Your task has been updated successfully.",
        };
      },
      error: (error) => error?.message ?? "Failed to update task.",
    });
  };

  const handleDueDateChange = (date?: Date) => {
    setDueDate(date);
    setPage(1);
  };

  const handleResetFilters = () => {
    setStatus("all");
    setPriority("");
    setSearch("");
    setDueDate(undefined);
    setPage(1);
  };
  // #endregion Handlers

  return (
    <div className="space-y-6 p-6">
      <TaskStats stats={stats} isLoading={isLoadingStats} />

      <div className="space-y-6">
        <DataTable
          header={
            <TaskFilters
              onAddTask={() => setIsAddTaskModalOpen(true)}
              onStatusChange={handleStatusChange}
              status={status}
              onPriorityChange={handlePriorityChange}
              priority={priority}
              search={search}
              onSearchChange={handleSearchChange}
              isLoading={isLoadingHandlers}
              dueDate={dueDate}
              onDueDateChange={handleDueDateChange}
              onResetFilters={handleResetFilters}
            />
          }
          columns={taskColumns({
            handleChangeTaskStatus: handleChangeTaskStatus,
            onDeleteTask: onDeleteTask,
            onEditTask,
          })}
          data={data?.data ?? []}
          getRowId={(task) => task.id}
          enableRowSelection={true}
          onRowSelectionChange={(rows) => console.log("selected:", rows)}
          onRowClick={handleRowClick}
          isLoading={isLoading}
        />

        <DataTablePagination
          page={data?.pagination?.page ?? 1}
          pageCount={data?.pagination?.totalPages ?? 0}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>

      {/* Modals */}
      <AddTaskModal
        open={isAddTaskModalOpen}
        onOpenChange={setIsAddTaskModalOpen}
        onSubmit={handleOnSubmitTask}
      />

      <EditTaskModal
        open={!!editingTask}
        onOpenChange={(open) => !open && setEditingTask(null)}
        task={editingTask}
        onSubmit={handleOnSubmitEditTask}
        isSubmitting={updateTaskLoading}
      />

      <ConfirmationDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        intent="destructive"
        title="Delete this task?"
        description="This action cannot be undone."
        icon={Trash2}
        itemIcon={ClipboardList}
        // itemTitle="Grocery shopping"
        // itemSubtitle="Tomorrow • Personal"
        confirmText="Delete"
        confirmVariant="destructive"
        onConfirm={handleDelete}
        onCancel={() => setOpenDelete(false)}
      />

      <ViewTaskDialog
        task={viewTaskData?.task ?? null}
        open={!!viewTaskId}
        onOpenChange={(open) => !open && setViewTaskId(null)}
        isLoading={viewTaskLoading}
        onEdit={(task) => {
          setEditingTask(task);
          setViewTaskId(null);
        }}
        onDelete={(task) => {
          setOpenDelete(true);
          setDeleteId(task.id);
        }}
      />
    </div>
  );
};

export default TasksPage;
