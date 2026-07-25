"use client";

import { TaskStats } from "@/components/tasks/task-stats";
import { useRouter } from "next/navigation";
import { Task, taskColumns } from "./columns";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";

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

  return (
    <div className="space-y-6 p-6">
      <TaskStats />

      <div>
        <DataTable
          columns={taskColumns}
          data={tasks}
          getRowId={(task) => task.id}
          enableRowSelection
          onRowSelectionChange={(rows) => console.log("selected:", rows)}
          onRowClick={(task) => router.push(`/tasks/${task.id}`)}
          isLoading={false}
        />
        <DataTablePagination page={2} pageCount={20} onPageChange={() => {}} />
      </div>
    </div>
  );
};

export default TasksPage;
