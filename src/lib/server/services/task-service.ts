import prisma from "@/lib/prisma";

type CreateTaskPayloadT = {
  title: string;
  dueDate?: Date;
};

export async function createTask(userId: string, data: CreateTaskPayloadT) {
  return prisma.task.create({
    data: { ...data, userId: userId },
  });
}

// Get task

// Update task

// Delete task
