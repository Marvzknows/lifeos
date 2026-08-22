"use client";

import { TaskStats } from "@/components/tasks/task-stats";
import { useRouter } from "next/navigation";
import { taskColumns } from "./columns";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { ClipboardList, Trash2 } from "lucide-react";
import { useState } from "react";
import { AddTaskModal } from "./modals/add-task-modal";
import { toast } from "@/components/ui/toast";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import TaskFilters from "./components/task-filters";
import { useCreateTask, useDeleteTask, useTasks, useUpdateTaskStatus } from "@/lib/api/services/hooks/tasks.hooks";
import { TaskPriority, TaskStatus } from "@/app/types/task";
import { useDebounce } from "@/hooks/use-debounce";
import { TaskFormValues } from "@/schemas/task/task-form-schema";

const PAGE_SIZE = 10;

const TasksPage = () => {
  const router = useRouter();

  const [openDelete, setOpenDelete] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [status, setStatus] = useState<TaskStatus>("all");
  const [priority, setPriority] = useState<TaskPriority | "">("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search);
  const { data, isLoading, isFetching } = useTasks({
    page,
    limit: PAGE_SIZE,
    filter: status,
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(priority && { priority }),
  });

  const { mutateAsync: createTask, isPending: createTaskLoading } = useCreateTask();
  const { mutateAsync: deleteTask, isPending: deleteTaskLoading } = useDeleteTask();
  const { mutateAsync: updateTaskStatus, isPending: updateTaskStatusLoading } = useUpdateTaskStatus();
  const isLoadingHandlers = createTaskLoading || deleteTaskLoading || updateTaskStatusLoading;
  // #region Handlers

  const handleMarkComplete = (id: string) => {
    if (!id) return
    toast.promise(updateTaskStatus({ id, status: "COMPLETED" }), {
      loading: "Marking task as complete...",
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

  // #endregion Handlers

  return (
    <div className="space-y-6 p-6">
      <TaskStats />

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
            />
          }
          columns={taskColumns({
            onMarkComplete: handleMarkComplete,
            onDeleteTask: onDeleteTask,
          })}
          data={data?.data ?? []}
          getRowId={(task) => task.id}
          enableRowSelection
          onRowSelectionChange={(rows) => console.log("selected:", rows)}
          onRowClick={(task) => router.push(`/tasks/${task.id}`)}
          isLoading={isLoading || isFetching}
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
    </div>
  );
};

export default TasksPage;
