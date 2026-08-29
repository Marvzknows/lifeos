"use client";

import * as React from "react";
import { format, formatDistanceToNow, isPast } from "date-fns";
import {
    Calendar,
    CheckCircle2,
    Circle,
    Clock,
    Flag,
    MoreHorizontal,
    Pencil,
    Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Task, TaskPriority } from "@/app/types/task";
import { TaskUpdateStatusSchema } from "@/schemas/task/task-update-status";

const STATUS_META: Record<
    TaskUpdateStatusSchema["status"],
    { label: string; className: string; icon: React.ElementType }
> = {
    PENDING: { label: "Pending", className: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400", icon: Circle },
    IN_PROGRESS: { label: "In Progress", className: "bg-sky-500/10 text-sky-600 dark:text-sky-400", icon: Clock },
    COMPLETED: { label: "Completed", className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", icon: CheckCircle2 },
};

const PRIORITY_META: Record<TaskPriority, { label: string; className: string }> = {
    LOW: { label: "Low", className: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400" },
    MEDIUM: { label: "Medium", className: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
    HIGH: { label: "High", className: "bg-rose-500/10 text-rose-600 dark:text-rose-400" },
};

function getInitials(name?: string | null, email?: string) {
    if (name) {
        return name
            .split(" ")
            .map((p) => p[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();
    }
    return email?.slice(0, 2).toUpperCase() ?? "?";
}

interface ViewTaskDialogProps {
    task: Task | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    isLoading?: boolean;
    onEdit?: (task: Task) => void;
    onDelete?: (task: Task) => void;
    onStatusChange?: (task: Task, status: TaskUpdateStatusSchema["status"],) => void;
}

export function ViewTaskDialog({
    task,
    open,
    onOpenChange,
    isLoading,
    onEdit,
    onDelete,
    onStatusChange,
}: ViewTaskDialogProps) {
    const showSkeleton = isLoading && !task;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-130">
                {showSkeleton ? (
                    <TaskDialogSkeleton />
                ) : task ? (
                    <TaskDialogBody
                        task={task}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onStatusChange={onStatusChange}
                        onClose={() => onOpenChange(false)}
                    />
                ) : null}
            </DialogContent>
        </Dialog>
    );
}

function TaskDialogBody({
    task,
    onEdit,
    onDelete,
    onStatusChange,
    onClose,
}: {
    task: Task;
    onEdit?: (task: Task) => void;
    onDelete?: (task: Task) => void;
    onStatusChange?: (task: Task, status: TaskUpdateStatusSchema["status"]) => void;
    onClose: () => void;
}) {
    const status = STATUS_META[task.status];
    const priority = PRIORITY_META[task.priority];
    const StatusIcon = status.icon;
    const isComplete = task.status === "COMPLETED";
    const overdue =
        !!task.dueDate && !isComplete && isPast(new Date(task.dueDate));

    const hasActions = !!(onEdit || onDelete);
    const hasStatusToggle = !!onStatusChange;

    // assignee from the embedded user relation
    const assignee = task.user;

    return (
        <>
            {/* HEADER with title and optional actions */}
            <DialogHeader>
                <div className="flex items-start justify-between gap-3 pr-6">
                    <div className="flex items-start gap-2.5">
                        {hasStatusToggle && (
                            <button
                                type="button"
                                onClick={() =>
                                    onStatusChange?.(task, isComplete ? "PENDING" : "COMPLETED")
                                }
                                className="mt-0.5 shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                                aria-label={isComplete ? "Mark as pending" : "Mark as complete"}
                            >
                                {isComplete ? (
                                    <CheckCircle2 className="size-5 text-emerald-500" />
                                ) : (
                                    <Circle className="size-5" />
                                )}
                            </button>
                        )}
                        <DialogTitle
                            className={cn(
                                "text-left text-lg leading-snug",
                                isComplete && "text-muted-foreground line-through"
                            )}
                        >
                            {task.title}
                        </DialogTitle>
                    </div>

                    {hasActions && (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button variant="ghost" size="icon" className="size-8 shrink-0">
                                    <MoreHorizontal className="size-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {onEdit && (
                                    <DropdownMenuItem
                                        onClick={() => {
                                            onClose();
                                            onEdit(task);
                                        }}
                                    >
                                        <Pencil className="size-4" />
                                        Edit
                                    </DropdownMenuItem>
                                )}
                                {onDelete && (
                                    <DropdownMenuItem
                                        variant="destructive"
                                        onClick={() => {
                                            onClose();
                                            onDelete(task);
                                        }}
                                    >
                                        <Trash2 className="size-4" />
                                        Delete
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </DialogHeader>

            {/* BADGES: status, priority, due date */}
            <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className={cn("gap-1 font-normal", status.className)}>
                    <StatusIcon className="size-3" />
                    {status.label}
                </Badge>
                <Badge variant="secondary" className={cn("gap-1 font-normal", priority.className)}>
                    <Flag className="size-3" />
                    {priority.label} priority
                </Badge>
                {task.dueDate && (
                    <Badge
                        variant="secondary"
                        className={cn(
                            "gap-1 font-normal",
                            overdue
                                ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                                : "bg-muted text-muted-foreground"
                        )}
                    >
                        <Calendar className="size-3" />
                        {overdue ? "Overdue — " : "Due "}
                        {format(new Date(task.dueDate), "MMM d, yyyy")}
                    </Badge>
                )}
            </div>

            <Separator />

            {/* DESCRIPTION */}
            <div className="space-y-1.5">
                <p className="text-xs font-medium text-muted-foreground">Description</p>
                {task.description ? (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{task.description}</p>
                ) : (
                    <p className="text-sm text-muted-foreground italic">No description added.</p>
                )}
            </div>

            <Separator />

            {/* FOOTER: assignee + timestamps */}
            <div className="flex items-center justify-between text-sm">
                {assignee && (
                    <div className="flex items-center gap-2">
                        <Avatar className="size-6">
                            <AvatarImage
                                src={assignee.avatarUrl ?? undefined}
                                alt={assignee.name ?? assignee.email}
                            />
                            <AvatarFallback className="text-[10px]">
                                {getInitials(assignee.name, assignee.email)}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-muted-foreground">
                            {assignee.name ?? assignee.email}
                        </span>
                    </div>
                )}
                <div className="text-muted-foreground text-xs ml-auto text-right">
                    <div>Created {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}</div>
                    <div>Updated {formatDistanceToNow(new Date(task.updatedAt), { addSuffix: true })}</div>
                </div>
            </div>
        </>
    );
}

function TaskDialogSkeleton() {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2.5">
                <Skeleton className="size-5 rounded-full" />
                <Skeleton className="h-5 w-2/3" />
            </div>
            <div className="flex gap-2">
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-24 rounded-full" />
                <Skeleton className="h-5 w-28 rounded-full" />
            </div>
            <Separator />
            <div className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
            </div>
            <Separator />
            <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-32" />
            </div>
        </div>
    );
}