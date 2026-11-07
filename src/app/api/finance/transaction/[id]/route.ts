import { getCurrentUserId } from "@/lib/auth/get-current-user-id";
import { handleApiError } from "@/lib/server/errors/handle-api-error";
import {
    getFinanceTransactionById,
    softDeleteFinanceTransaction,
    updateFinanceTransaction,
} from "@/lib/server/services/finance-transaction-service";
import { updateTransactionSchema } from "@/schemas/finance/transaction-schema";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
    params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const userId = getCurrentUserId(request);
        const { id } = await params;
        const transaction = await getFinanceTransactionById(userId, id);
        return NextResponse.json({ transaction }, { status: 200 });
    } catch (error) {
        return handleApiError(error);
    }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
    try {
        const userId = getCurrentUserId(request);
        const { id } = await params;
        const body = await request.json();
        const data = updateTransactionSchema.parse(body);
        const transaction = await updateFinanceTransaction(userId, id, data);
        return NextResponse.json({ transaction }, { status: 200 });
    } catch (error) {
        return handleApiError(error);
    }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const userId = getCurrentUserId(request);
        const { id } = await params;
        const transaction = await softDeleteFinanceTransaction(userId, id);
        return NextResponse.json({ transaction }, { status: 200 });
    } catch (error) {
        return handleApiError(error);
    }
}