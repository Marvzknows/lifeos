import { handleApiError } from "@/lib/server/errors/handle-api-error";
import { getCurrentUserId } from "@/lib/auth/get-current-user-id";
import { createTask } from "@/lib/server/services/task-service";
import { createTaskSchema } from "@/schemas/task-schema";
import { NextRequest, NextResponse } from "next/server";

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
