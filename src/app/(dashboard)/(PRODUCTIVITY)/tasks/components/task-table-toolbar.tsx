"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { tabTriggerClass, TaskTab } from "../types";

interface TasksTableToolbarProps {
  value: TaskTab;
  onValueChange: (value: TaskTab) => void;
  onAddTask: () => void;
}

export function TasksTableToolbar({
  value,
  onValueChange,
  onAddTask,
}: TasksTableToolbarProps) {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
      <Tabs
        value={value}
        onValueChange={onValueChange}
        className="w-full md:w-auto"
      >
        <TabsList className="h-10 w-full md:w-auto gap-1 rounded-sm bg-muted p-1 dark:bg-zinc-900">
          <TabsTrigger
            value="all"
            className={cn(
              tabTriggerClass,
              "flex-1 rounded-md cursor-pointer md:flex-none",
            )}
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="today"
            className={cn(
              tabTriggerClass,
              "flex-1 rounded-md cursor-pointer md:flex-none",
            )}
          >
            Today
          </TabsTrigger>
          <TabsTrigger
            value="upcoming"
            className={cn(
              tabTriggerClass,
              "flex-1 rounded-md cursor-pointer md:flex-none",
            )}
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className={cn(
              tabTriggerClass,
              "flex-1 rounded-md cursor-pointer md:flex-none",
            )}
          >
            Completed
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Button
        className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 text-white"
        size="lg"
        onClick={onAddTask}
      >
        <Plus className="mr-2 h-4 w-4" />
        New Task
      </Button>
    </div>
  );
}
