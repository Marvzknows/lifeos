import { getCurrentUserId } from "@/lib/auth/get-current-user-id";
import { handleApiError } from "@/lib/server/errors/handle-api-error";
import { createFinanceTransaction, listFinanceTransactions } from "@/lib/server/services/finance-transaction-service";
import { createTransactionSchema, transactionListQuerySchema } from "@/schemas/finance/transaction-schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const userId = getCurrentUserId(request);
        const searchParams = Object.fromEntries(request.nextUrl.searchParams);
        const query = transactionListQuerySchema.parse(searchParams);
        const result = await listFinanceTransactions(userId, query);
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return handleApiError(error);
    }
}

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