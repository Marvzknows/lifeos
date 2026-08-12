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
