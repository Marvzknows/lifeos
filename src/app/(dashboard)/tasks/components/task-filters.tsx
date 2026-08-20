import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { taskPriorityFilterOptions, taskStatusFilterOptions } from "../types";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { capitalizeWords } from "@/helpers/capitalize-words";

type Props = {
  onAddTask: () => void;
  status: string;
  onStatusChange: (value: string | null) => void;
  priority: string;
  onPriorityChange: (value: string | null) => void;
  search: string;
  onSearchChange: (value: string | null) => void;
};

const TaskFilters = ({
  onAddTask,
  onStatusChange,
  status,
  onPriorityChange,
  priority,
  search,
  onSearchChange,
}: Props) => {
  return (
    <div className="border-b">
      {/* Header */}
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="shrink-0">
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Tasks
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Organize and keep track of your tasks.
          </p>
        </div>

        <div className="flex w-full flex-col gap-2.5 sm:flex-row md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              type="search"
              placeholder="Search task title"
              className="h-8 rounded-sm pl-9"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <Button
            onClick={onAddTask}
            className="h-8 text-xs w-full rounded-sm bg-indigo-600 px-3 text-white hover:bg-indigo-500 sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-2.5 border-t bg-muted/20 px-4 py-3 sm:flex-row sm:items-center sm:px-6">
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="h-9 w-full rounded-md bg-background sm:w-45">
            <span className="text-muted-foreground">Status:</span>
            <SelectValue>{capitalizeWords(status)}</SelectValue>
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {taskStatusFilterOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={priority} onValueChange={onPriorityChange}>
          <SelectTrigger className="h-9 w-full rounded-md bg-background sm:w-45">
            <span className="text-muted-foreground">Priority:</span>
            {priority ? (
              <SelectValue>{capitalizeWords(priority)}</SelectValue>
            ) : (
              <SelectValue placeholder="All" />
            )}
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {taskPriorityFilterOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TaskFilters;
