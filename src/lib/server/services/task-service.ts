import prisma from "@/lib/prisma";
import { ForbiddenError, NotFoundError } from "../errors/errors";

type CreateTaskPayloadT = {
  title: string;
  dueDate?: Date;
};

export async function createTask(userId: string, data: CreateTaskPayloadT) {
  return prisma.task.create({
    data: { ...data, userId: userId },
  });
}

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
