import { handleApiError } from "@/lib/server/errors/handle-api-error";
import { getCurrentUserId } from "@/lib/auth/get-current-user-id";
import {
  createTask,
  getPaginatedTasks,
} from "@/lib/server/services/task-service";
import { createTaskSchema } from "@/schemas/task/task-schema";
import { NextRequest, NextResponse } from "next/server";
import { taskQuerySchema } from "@/schemas/task/task-query-schema";

export async function POST(request: NextRequest) {
  try {
    const userId = getCurrentUserId(request);
    const body = await request.json();
    const data = createTaskSchema.parse(body);
    const task = await createTask(userId, data);
    return NextResponse.json({ task }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

// Paginated Tasks
export async function GET(request: NextRequest) {
  try {
    const userId = getCurrentUserId(request);

    const { searchParams } = request.nextUrl;
    const query = taskQuerySchema.parse({
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      priority: searchParams.get("priority") ?? undefined,
      filter: searchParams.get("filter") ?? undefined,
    });

    const result = await getPaginatedTasks(userId, query);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}
