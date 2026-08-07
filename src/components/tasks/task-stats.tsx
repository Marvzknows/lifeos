import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  AlertTriangle,
} from "lucide-react";

import { TaskStatCard } from "./task-stat-card";

export function TaskStats() {
  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <TaskStatCard
        title="Today's Tasks"
        value={7}
        icon={CalendarDays}
        iconBg="bg-violet-100 dark:bg-violet-950"
        iconColor="text-violet-600"
      />

      <TaskStatCard
        title="Completed"
        value={18}
        icon={CheckCircle2}
        iconBg="bg-green-100 dark:bg-green-950"
        iconColor="text-green-600"
      />

      <TaskStatCard
        title="Overdue"
        value={2}
        danger
        icon={AlertTriangle}
        iconBg="bg-red-100 dark:bg-red-950"
        iconColor="text-red-500"
      />

      <TaskStatCard
        title="Upcoming"
        value={11}
        icon={Clock3}
        iconBg="bg-sky-100 dark:bg-sky-950"
        iconColor="text-sky-600"
      />
    </section>
  );
}
