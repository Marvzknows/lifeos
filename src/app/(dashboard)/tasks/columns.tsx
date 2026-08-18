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
import { Task, TaskPriority } from "@/app/types/task";

const priorityDotColor: Record<TaskPriority, string> = {
  HIGH: "bg-red-500",
  MEDIUM: "bg-orange-500",
  LOW: "bg-blue-500",
};

const priorityRank: Record<TaskPriority, number> = {
  HIGH: 0,
  MEDIUM: 1,
  LOW: 2,
};

type TaskColumnsProps = {
  onMarkComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
};

const formatDueDate = (dueDate: string | null) => {
  if (!dueDate) {
    return "No due date";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(dueDate));
};

export const taskColumns = ({
  onMarkComplete,
  onDeleteTask,
}: TaskColumnsProps): DataTableColumn<Task>[] => [
  {
    id: "title",
    header: "Task",
    sortable: true,
    sortAccessor: (row) => row.title,
    cell: (row) => (
      <div className="space-y-1.5">
        <p className="font-medium leading-none">{row.title}</p>

        {row.description && (
          <p className="line-clamp-1 text-sm text-muted-foreground">
            {row.description}
          </p>
        )}
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
    sortAccessor: (row) => (row.dueDate ? new Date(row.dueDate) : ""),
    cell: (row) => (
      <span className="text-muted-foreground">
        {formatDueDate(row.dueDate)}
      </span>
    ),
  },

  {
    id: "status",
    header: "Status",
    sortable: true,
    sortAccessor: (row) => (row.completed ? 1 : 0),
    cell: (row) => (
      <Badge
        variant={row.completed ? "secondary" : "outline"}
        className="rounded-full"
      >
        {row.completed ? "Completed" : "Pending"}
      </Badge>
    ),
  },

  {
    id: "actions",
    header: "",
    width: "40px",
    cell: (row) => (
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

          {!row.completed && (
            <DropdownMenuItem onClick={() => onMarkComplete(row.id)}>
              Mark as Complete
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            onClick={() => onDeleteTask(row.id)}
            className="text-destructive"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
