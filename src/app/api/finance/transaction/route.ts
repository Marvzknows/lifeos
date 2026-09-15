import { getCurrentUserId } from "@/lib/auth/get-current-user-id";
import { handleApiError } from "@/lib/server/errors/handle-api-error";
import { createFinanceTransaction } from "@/lib/server/services/finance-transaction-service";
import { createTransactionSchema } from "@/schemas/finance/transaction-schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const userId = getCurrentUserId(request);
        const body = await request.json();
        const data = createTransactionSchema.parse(body);
        const transaction = await createFinanceTransaction(userId, data);
        return NextResponse.json({ transaction }, { status: 201 });
    } catch (error) {
        return handleApiError(error);
    }
}