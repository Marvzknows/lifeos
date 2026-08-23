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
import { capitalizeWords } from "@/helpers/capitalize-words";
import { TaskUpdateStatusSchema } from "@/schemas/task/task-update-status";

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
  handleChangeTaskStatus: (id: string, status: TaskUpdateStatusSchema["status"]) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (task: Task) => void;
};

const statusBadgeColor: Record<TaskUpdateStatusSchema["status"], string> = {
  COMPLETED:
    "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400",
  PENDING:
    "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-400",
  IN_PROGRESS:
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-400",
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
  handleChangeTaskStatus,
  onDeleteTask,
  onEditTask,
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

          <span>{capitalizeWords(row.priority)}</span>
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
      sortAccessor: (row) => (row.status === "COMPLETED" ? 1 : 0),
      cell: (row) => {
        const status = row.status;

        return (
          <Badge
            variant="outline"
            className={`rounded-sm ${statusBadgeColor[status]}`}
          >
            {capitalizeWords(status)}
          </Badge>
        );
      },
    },

    {
      id: "actions",
      header: "",
      width: "40px",
      cell: (row) => {
        const statusOptions: { value: TaskUpdateStatusSchema["status"]; label: string }[] = [
          { value: "PENDING", label: "Mark as Pending" },
          { value: "IN_PROGRESS", label: "Mark as In Progress" },
          { value: "COMPLETED", label: "Mark as Complete" },
        ];

        return (
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
              <DropdownMenuItem className={'text-xs'} onClick={() => onEditTask(row)}>Edit</DropdownMenuItem>

              {statusOptions
                .filter((option) => option.value !== row.status)
                .map((option) => (
                  <DropdownMenuItem
                    className={'text-xs'}
                    key={option.value}
                    onClick={() => handleChangeTaskStatus(row.id, option.value)}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}

              <DropdownMenuItem
                onClick={() => onDeleteTask(row.id)}
                className="text-destructive text-xs"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
