import prisma from "@/lib/prisma";
import { ForbiddenError, NotFoundError } from "../errors/errors";
import { TaskQueryParams } from "@/schemas/task/task-query-schema";
import { buildPaginatedResult } from "./pagination";

type CreateTaskPayloadT = {
  title: string;
  description?: string;
  dueDate?: Date;
};

type AssertTaskAccessT = {
  userId: string;
  taskId: string;
};

const taskSelect = {
  id: true,
  title: true,
  completed: true,
  priority: true,
  dueDate: true,
  createdAt: true,
  updatedAt: true,
  description: true,
};

async function assertTaskAccess({ userId, taskId }: AssertTaskAccessT) {
  const task = await prisma.task.findUnique({ where: { id: taskId } });

  if (!task || task.deletedAt) throw new NotFoundError("Task not found");
  if (task.userId !== userId) {
    throw new ForbiddenError("You don't have permission to access this task");
  }

  return task;
}

export async function createTask(userId: string, data: CreateTaskPayloadT) {
  return prisma.task.create({
    data: { ...data, userId },
  });
}

export async function getTaskById(userId: string, id: string) {
  await assertTaskAccess({ userId, taskId: id });

  const task = await prisma.task.findUnique({
    where: { id },
    select: {
      ...taskSelect,
      user: { select: { id: true, email: true, name: true } },
    },
  });

  const { user, ...rest } = task!;
  return { ...rest, created_by: user.name };
}

function buildFilterWhere(filter: TaskQueryParams["filter"]) {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

  switch (filter) {
    case "today":
      return { dueDate: { gte: startOfToday, lte: startOfTomorrow } };
    case "upcoming":
      return { dueDate: { gt: startOfTomorrow } };
    case "completed":
      return { completed: true };
    case "all":
    default:
      return {};
  }
}

export async function getPaginatedTasks(
  userId: string,
  query: TaskQueryParams,
) {
  const { page, limit, priority, filter, search } = query;
  const skip = (page - 1) * limit;

  const where = {
    userId,
    deletedAt: null,
    ...(priority && { priority }),
    ...(search && {
      title: { contains: search, mode: "insensitive" as const },
    }),
    ...buildFilterWhere(filter),
  };

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,
      select: taskSelect,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.task.count({ where }),
  ]);

  return buildPaginatedResult(tasks, total, { page, limit });
}

export async function deleteTask(userId: string, id: string) {
  await assertTaskAccess({ userId, taskId: id });

  return prisma.task.update({
    where: { id },
    data: { deletedAt: new Date() },
    select: taskSelect,
  });
}
