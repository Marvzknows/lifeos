import { getCurrentUserId } from "@/lib/auth/get-current-user-id";
import { handleApiError } from "@/lib/server/errors/handle-api-error";
import { restoreFinanceTransaction } from "@/lib/server/services/finance-transaction-service";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
    params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
    try {
        const userId = getCurrentUserId(request);
        const { id } = await params;
        const transaction = await restoreFinanceTransaction(userId, id);
        return NextResponse.json({ transaction }, { status: 200 });
    } catch (error) {
        return handleApiError(error);
    }
}