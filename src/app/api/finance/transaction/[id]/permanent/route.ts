import { getCurrentUserId } from "@/lib/auth/get-current-user-id";
import { handleApiError } from "@/lib/server/errors/handle-api-error";
import { permanentlyDeleteFinanceTransaction } from "@/lib/server/services/finance-transaction-service";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
    params: Promise<{ id: string }>;
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const userId = getCurrentUserId(request);
        const { id } = await params;
        await permanentlyDeleteFinanceTransaction(userId, id);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return handleApiError(error);
    }
}