"use client";

import { TaskStats } from "@/components/tasks/task-stats";
import { useRouter } from "next/navigation";
import { Task, taskColumns } from "./columns";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { ClipboardList, Trash2 } from "lucide-react";
import { useState } from "react";
import { AddTaskModal } from "./modals/add-task-modal";
import { toast } from "@/components/ui/toast";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import TaskFilters from "./components/task-filters";

const tasks: Task[] = [
  {
    id: "1",
    title: "Finish dashboard redesign",
    tags: ["LifeOS", "Design"],
    priority: "High",
    dueDate: "2026-07-25T17:00:00",
    dueDateLabel: "Today, 5:00 PM",
    project: "LifeOS",
    projectColor: "text-indigo-500",
    completed: false,
  },
  {
    id: "2",
    title: "Review pull request #142",
    tags: ["Work", "Development"],
    priority: "Medium",
    dueDate: "2026-07-25T15:00:00",
    dueDateLabel: "Today, 3:00 PM",
    project: "Work",
    projectColor: "text-blue-500",
    completed: true,
  },
  {
    id: "3",
    title: "Grocery shopping",
    tags: ["Personal", "Errand"],
    priority: "Medium",
    dueDate: "2026-07-26T00:00:00",
    dueDateLabel: "Tomorrow",
    project: "Personal",
    projectColor: "text-green-500",
    completed: false,
  },
  {
    id: "4",
    title: "Write project documentation",
    tags: ["LifeOS", "Documentation"],
    priority: "Low",
    dueDate: "2026-07-26T00:00:00",
    dueDateLabel: "Tomorrow",
    project: "LifeOS",
    projectColor: "text-indigo-500",
    completed: false,
  },
];

const TasksPage = () => {
  const router = useRouter();
  const [openDelete, setOpenDelete] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("");

  // #region Handlers
  const handleMarkComplete = (id: string) => {
    console.log(id);
    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: "Marking task as complete...",
      success: "Task marked as complete!",
      error: "Failed to mark task as complete.",
    });
  };

  const handleDelete = () => {
    setOpenDelete(false);
    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: "Deleting task...",
      success: "Task deleted!",
      error: "Failed to delete task.",
    });
  };

  const onDeleteTask = (id: string) => {
    console.log("Delete task with id:", id);
    setOpenDelete(true);
  };

  const handleStatusChange = (value: string | null) => {
    setStatus(value ?? "all");
  };

  const handlePriorityChange = (value: string | null) => {
    setPriority(value ?? "");
  };
  // #endregion Handlers

  const filteredTasks = tasks.filter((task) => {
    if (status === "all") return true;
    if (status === "completed") return task.completed;
    if (status === "today") {
      return !task.completed && task.dueDateLabel.startsWith("Today");
    }
    if (status === "upcoming") {
      return !task.completed && !task.dueDateLabel.startsWith("Today");
    }
    return true;
  });

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
            />
          }
          columns={taskColumns({
            onMarkComplete: handleMarkComplete,
            onDeleteTask: onDeleteTask,
          })}
          data={filteredTasks}
          getRowId={(task) => task.id}
          enableRowSelection
          onRowSelectionChange={(rows) => console.log("selected:", rows)}
          onRowClick={(task) => router.push(`/tasks/${task.id}`)}
          isLoading={false}
        />
        <DataTablePagination page={2} pageCount={20} onPageChange={() => {}} />
      </div>

      {/* Modals */}
      <AddTaskModal
        open={isAddTaskModalOpen}
        onOpenChange={setIsAddTaskModalOpen}
        onSubmit={() => {
          toast.add({
            title: "Task added",
            description: "Your new task has been added.",
          });
        }}
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
