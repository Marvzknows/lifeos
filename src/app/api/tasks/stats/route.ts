import { getCurrentUserId } from "@/lib/auth/get-current-user-id";
import { handleApiError } from "@/lib/server/errors/handle-api-error";
import { getTaskStats } from "@/lib/server/services/task-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const userId = getCurrentUserId(request);
        const stats = await getTaskStats(userId);
        return NextResponse.json({ stats });
    } catch (error) {
        return handleApiError(error);
    }
}