import { getCurrentUserId } from "@/lib/auth/get-current-user-id";
import { handleApiError } from "@/lib/server/errors/handle-api-error";
import { getBudgetList } from "@/lib/server/services/finance-budget-service";
import { getBudgetsQuerySchema } from "@/schemas/finance/budget-schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const userId = getCurrentUserId(request);
        const { month } = getBudgetsQuerySchema.parse({
            month: request.nextUrl.searchParams.get("month"),
        });

        const budgets = await getBudgetList(userId, month);
        return NextResponse.json({ data: budgets });
    } catch (error) {
        return handleApiError(error);
    }
}