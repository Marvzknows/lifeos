import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  AlertTriangle,
} from "lucide-react";

import { TaskStatCard } from "./task-stat-card";
import { TaskStatCardSkeleton } from "./task-stat-card-skeleton";
import { TaskStatsResponseT } from "@/app/types/task";

type Props = {
  stats: TaskStatsResponseT | undefined;
  isLoading?: boolean;
};

export function TaskStats({ stats, isLoading }: Props) {
  if (isLoading) {
    return (
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <TaskStatCardSkeleton />
        <TaskStatCardSkeleton />
        <TaskStatCardSkeleton />
        <TaskStatCardSkeleton />
      </section>
    );
  }

  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <TaskStatCard
        title="Today's Tasks"
        value={stats?.stats.today ?? 0}
        icon={CalendarDays}
        iconBg="bg-violet-100 dark:bg-violet-950"
        iconColor="text-violet-600"
      />

      <TaskStatCard
        title="Completed"
        value={stats?.stats.completed ?? 0}
        icon={CheckCircle2}
        iconBg="bg-green-100 dark:bg-green-950"
        iconColor="text-green-600"
      />

      <TaskStatCard
        title="Overdue"
        value={stats?.stats.overdue ?? 0}
        danger
        icon={AlertTriangle}
        iconBg="bg-red-100 dark:bg-red-950"
        iconColor="text-red-500"
      />

      <TaskStatCard
        title="Upcoming"
        value={stats?.stats.upcoming ?? 0}
        icon={Clock3}
        iconBg="bg-sky-100 dark:bg-sky-950"
        iconColor="text-sky-600"
      />
    </section>
  );
}