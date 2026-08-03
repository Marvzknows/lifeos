"use client";

import { TaskStats } from "@/components/tasks/task-stats";
import { useRouter } from "next/navigation";
import { Task, taskColumns } from "./columns";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabTriggerClass } from "./types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AddTaskModal } from "./modals/add-task-modal";

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

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  return (
    <div className="space-y-6 p-6">
      <TaskStats />

      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <Tabs defaultValue="all" className="w-full md:w-auto">
          <TabsList className="h-10 w-full md:w-auto gap-1 rounded-sm bg-muted p-1 dark:bg-zinc-900">
            <TabsTrigger
              value="all"
              className={cn(tabTriggerClass, "flex-1 rounded-md cursor-pointer md:flex-none")}
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="today"
              className={cn(tabTriggerClass, "flex-1 rounded-md cursor-pointer md:flex-none")}
            >
              Today
            </TabsTrigger>
            <TabsTrigger
              value="upcoming"
              className={cn(tabTriggerClass, "flex-1 rounded-md cursor-pointer md:flex-none")}
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className={cn(tabTriggerClass, "flex-1 rounded-md cursor-pointer md:flex-none")}
            >
              Completed
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Button
          className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 text-white"
          size="lg"
          onClick={() => setIsAddTaskModalOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      <div className="space-y-6">
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

      {/* Modals */}
      <AddTaskModal
        open={isAddTaskModalOpen}
        onOpenChange={setIsAddTaskModalOpen}
      />
    </div>
  );
};

export default TasksPage;
