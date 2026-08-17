import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { taskPriorityFilterOptions, taskStatusFilterOptions } from "../types";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  onAddTask: () => void;
  status: string;
  onStatusChange: (value: string | null) => void;
  priority: string;
  onPriorityChange: (value: string | null) => void;
};

const TaskFilters = ({
  onAddTask,
  onStatusChange,
  status,
  onPriorityChange,
  priority,
}: Props) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-row">
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="rounded w-full sm:w-45">
            <span className="text-muted-foreground">Status:</span>
            <SelectValue placeholder="All" />
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
          <SelectTrigger className="rounded w-full sm:w-45">
            <span className="text-muted-foreground">Priority:</span>
            <SelectValue placeholder="All" />
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

      <Button
        className="rounded w-full bg-indigo-600 hover:bg-indigo-500 text-white sm:w-auto"
        size="lg"
        onClick={onAddTask}
      >
        <Plus className="mr-2 h-4 w-4" />
        New Task
      </Button>
    </div>
  );
};

export default TaskFilters;
