export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "You don't have permission to do this") {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not found") {
    super(message, 404);
  }
}

export class QuotaExceededError extends AppError {
  constructor(message: string) {
    super(message, 429); // 429 = Too Many Requests, the correct status for quota/rate limits
  }
}

// SAMPLE USAGE
// export async function deleteTask(userId: string, taskId: string) {
//   const task = await prisma.task.findUnique({ where: { id: taskId } });

//   if (!task) {
//     throw new NotFoundError("Task not found");
//   }

//   if (task.authorId !== userId) {
//     throw new ForbiddenError("You can't delete someone else's task");
//   }

//   await prisma.task.delete({ where: { id: taskId } });
// }
