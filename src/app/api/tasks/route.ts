import { handleApiError } from "@/lib/server/errors/handle-api-error";
import { getCurrentUserId } from "@/lib/server/get-current-user-id";
import { createTask } from "@/lib/server/services/task-service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const userId = getCurrentUserId(request);
    const body = await request.json();
    const task = await createTask(userId, body);
    return NextResponse.json({ task }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
