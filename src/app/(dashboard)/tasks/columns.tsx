"use client";

import { MoreVertical } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumn } from "@/components/data-table/data-table";

export type TaskPriority = "Low" | "Medium" | "High";

export interface Task {
  id: string;
  title: string;
  tags: string[];
  priority: TaskPriority;
  dueDate: string; // ISO string, used for sorting
  dueDateLabel: string; // formatted, used for display
  project: string;
  projectColor: string; // tailwind text color class, e.g. "text-indigo-500"
  completed: boolean;
}

const priorityDotColor: Record<TaskPriority, string> = {
  High: "bg-red-500",
  Medium: "bg-orange-500",
  Low: "bg-blue-500",
};

const priorityRank: Record<TaskPriority, number> = {
  High: 0,
  Medium: 1,
  Low: 2,
};

export const taskColumns: DataTableColumn<Task>[] = [
  {
    id: "title",
    header: "Task",
    sortable: true,
    sortAccessor: (row) => row.title,
    cell: (row) => (
      <div className="space-y-1.5">
        <p className="font-medium leading-none">{row.title}</p>
        <div className="flex gap-1.5">
          {row.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="rounded-full font-normal"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "priority",
    header: "Priority",
    sortable: true,
    sortAccessor: (row) => priorityRank[row.priority],
    cell: (row) => (
      <div className="flex items-center gap-2">
        <span
          className={`h-2 w-2 rounded-full ${priorityDotColor[row.priority]}`}
        />
        <span>{row.priority}</span>
      </div>
    ),
  },
  {
    id: "dueDate",
    header: "Due Date",
    sortable: true,
    sortAccessor: (row) => row.dueDate,
    cell: (row) => (
      <span className="text-muted-foreground">{row.dueDateLabel}</span>
    ),
  },
  {
    id: "project",
    header: "Project",
    sortable: true,
    sortAccessor: (row) => row.project,
    cell: (row) => (
      <div className="flex items-center gap-1.5">
        <span className={`text-xs ${row.projectColor}`}>●</span>
        <span>{row.project}</span>
      </div>
    ),
  },
  {
    id: "actions",
    header: "",
    width: "40px",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
