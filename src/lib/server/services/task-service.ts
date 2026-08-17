import prisma from "@/lib/prisma";
import { ForbiddenError, NotFoundError } from "../errors/errors";
import { TaskQueryParams } from "@/schemas/task/task-query-schema";
import { buildPaginatedResult } from "./pagination";

type CreateTaskPayloadT = {
  title: string;
  description?: string;
  dueDate?: Date;
};

// Create task
export async function createTask(userId: string, data: CreateTaskPayloadT) {
  return prisma.task.create({
    data: { ...data, userId: userId },
  });
}

// Get task by ID
export async function getTaskById(userId: string, id: string) {
  const task = await prisma.task.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      completed: true,
      priority: true,
      dueDate: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });

  if (!task) throw new NotFoundError("Task not found");
  if (task.user.id !== userId) {
    throw new ForbiddenError("You don't have permission to view this task");
  }

  const { user, ...rest } = task;
  return { ...rest, created_by: user.name };
}

// Get paginated tasks
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

// Update task
export async function updateTask(
  userId: string,
  id: string,
  data: Partial<CreateTaskPayloadT>,
) {
  return prisma.task.update({
    where: { id, userId },
    data,
  });
}

// Delete task
export async function deleteTask(userId: string, id: string) {
  return prisma.task.delete({
    where: { id, userId },
  });
}
