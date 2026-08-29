import { getCurrentUserId } from "@/lib/auth/get-current-user-id";
import { handleApiError } from "@/lib/server/errors/handle-api-error";
import { updateTaskStatus } from "@/lib/server/services/task-service";
import { taskUpdateStatusSchema } from "@/schemas/task/task-update-status";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest,
  { params }: { params: Promise<{ id: string }> },) {
  try {
    const userId = getCurrentUserId(request);
    const { id } = await params;
    const body = await request.json();
    const data = taskUpdateStatusSchema.parse(body);
    const task = await updateTaskStatus(userId, id, data.status);
    return NextResponse.json({ task }, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }

}