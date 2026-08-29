import { getCurrentUserId } from "@/lib/auth/get-current-user-id";
import { handleApiError } from "@/lib/server/errors/handle-api-error";
import {
  getTaskById,
  softDeleteTask,
  updateTask,
} from "@/lib/server/services/task-service";
import { updateTaskSchema } from "@/schemas/task/task-schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const userId = getCurrentUserId(request);

    const task = await getTaskById(userId, id);
    return NextResponse.json({ task }, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const userId = getCurrentUserId(request);

    await softDeleteTask(userId, id);
    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const userId = getCurrentUserId(request);
    const { id } = await params;
    const body = await request.json();
    const data = updateTaskSchema.parse(body);

    const task = await updateTask(userId, id, data);
    return NextResponse.json({ task }, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}
