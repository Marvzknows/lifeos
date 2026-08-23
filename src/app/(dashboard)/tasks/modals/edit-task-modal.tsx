"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
    taskFormSchema,
    TaskFormValues,
} from "@/schemas/task/task-form-schema";
import { formatDatePPP } from "@/helpers/formatDatePPP";
import { Task } from "@/app/types/task";
import { useEffect } from "react";

interface EditTaskModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    task: Task | null;
    onSubmit?: (values: TaskFormValues) => void;
    isSubmitting?: boolean;
}

export function EditTaskModal({
    open,
    onOpenChange,
    task,
    onSubmit,
    isSubmitting,
}: EditTaskModalProps) {
    const form = useForm<TaskFormValues>({
        resolver: zodResolver(taskFormSchema),
        defaultValues: {
            title: "",
            priority: undefined,
            dueDate: undefined,
            description: "",
        },
    });

    // Populate the form whenever a new task is opened for editing
    useEffect(() => {
        if (open && task) {
            form.reset({
                title: task.title,
                priority: task.priority,
                dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
                description: task.description ?? "",
            });
        }
    }, [open, task, form]);

    useEffect(() => {
        if (!open) form.reset();
    }, [open, form]);

    function handleSubmit(values: TaskFormValues) {
        onSubmit?.(values);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-lg">
                <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                    <DialogDescription>
                        Update the details for this task.
                    </DialogDescription>
                </DialogHeader>

                <form id="edit-task-form" onSubmit={form.handleSubmit(handleSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="title"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="edit-task-title">Task Title</FieldLabel>
                                    <Input
                                        {...field}
                                        id="edit-task-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="e.g. Finish dashboard redesign"
                                        autoComplete="off"
                                        className="rounded-sm"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="priority"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="edit-task-priority">Priority</FieldLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger
                                            id="edit-task-priority"
                                            aria-invalid={fieldState.invalid}
                                            className="w-full rounded-sm"
                                        >
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="LOW">Low</SelectItem>
                                            <SelectItem value="MEDIUM">Medium</SelectItem>
                                            <SelectItem value="HIGH">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="dueDate"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="edit-task-due-date">Due Date</FieldLabel>
                                    <Popover>
                                        <PopoverTrigger
                                            render={
                                                <Button
                                                    type="button"
                                                    id="edit-task-due-date"
                                                    variant="outline"
                                                    aria-invalid={fieldState.invalid}
                                                    data-empty={!field.value}
                                                    className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground rounded-sm"
                                                >
                                                    {field.value ? (
                                                        formatDatePPP(field.value)
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon data-icon="inline-end" />
                                                </Button>
                                            }
                                        />
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                defaultMonth={field.value}
                                                disabled={(date) =>
                                                    date < new Date(new Date().setHours(0, 0, 0, 0))
                                                }
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="edit-task-description">
                                        Description
                                    </FieldLabel>
                                    <Textarea
                                        {...field}
                                        id="edit-task-description"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Add any extra details about this task..."
                                        className="rounded-sm resize-none"
                                        rows={4}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>

                <DialogFooter className="pt-2 bg-transparent border-0">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        form="edit-task-form"
                        disabled={isSubmitting}
                        className="dark:text-white bg-indigo-600 hover:bg-indigo-500"
                    >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}