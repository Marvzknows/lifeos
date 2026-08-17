export const tabTriggerClass =
  "h-full rounded-md px-4 text-sm font-medium text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm dark:text-zinc-400 dark:data-[state=active]:bg-indigo-600 dark:data-[state=active]:text-white";

export type TaskTab = "all" | "today" | "upcoming" | "completed";

export type TaskStatusFilter = {
  value: "all" | "completed" | "today" | "upcoming";
  label: string;
};

export type TaskPriorityFilter = {
  value: "LOW" | "MEDIUM" | "HIGH";
  label: string;
};

export const taskStatusFilterOptions: TaskStatusFilter[] = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "today",
    label: "Today",
  },
  {
    value: "upcoming",
    label: "Upcoming",
  },
  {
    value: "completed",
    label: "Completed",
  },
];

export const taskPriorityFilterOptions: TaskPriorityFilter[] = [
  {
    value: "LOW",
    label: "Low",
  },
  {
    value: "MEDIUM",
    label: "Medium",
  },
  {
    value: "HIGH",
    label: "High",
  },
];
