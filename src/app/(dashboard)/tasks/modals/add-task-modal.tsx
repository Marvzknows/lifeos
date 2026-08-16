"use client";

import * as React from "react";
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
import { taskFormSchema, TaskFormValues } from "@/schemas/task-form-schema";

function formatDatePPP(date: Date): string {
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";
  const monthYear = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
  const [month, year] = monthYear.split(" ");
  return `${month} ${day}${suffix}, ${year}`;
}

interface AddTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (values: TaskFormValues) => void;
}

export function AddTaskModal({
  open,
  onOpenChange,
  onSubmit,
}: AddTaskModalProps) {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      priority: undefined,
      dueDate: undefined,
      description: "",
    },
  });

  function handleSubmit(values: TaskFormValues) {
    onSubmit?.(values);
    onOpenChange(false);
  }

  React.useEffect(() => {
    if (!open) form.reset();
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-lg">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            Create a new task for your project or personal workspace.
          </DialogDescription>
        </DialogHeader>

        <form id="add-task-form" onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="add-task-title">Task Title</FieldLabel>
                  <Input
                    {...field}
                    id="add-task-title"
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
                  <FieldLabel htmlFor="add-task-priority">Priority</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="add-task-priority"
                      aria-invalid={fieldState.invalid}
                      className="w-full rounded-sm"
                    >
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
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
                  <FieldLabel htmlFor="add-task-due-date">Due Date</FieldLabel>
                  <Popover>
                    <PopoverTrigger
                      render={
                        <Button
                          type="button"
                          id="add-task-due-date"
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
                        // initialFocus
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
                  <FieldLabel htmlFor="add-task-description">
                    Description
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="add-task-description"
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
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="add-task-form"
            className="dark:text-white bg-indigo-600 hover:bg-indigo-500"
          >
            Create Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
