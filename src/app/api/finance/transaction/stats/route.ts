import { getCurrentUserId } from "@/lib/auth/get-current-user-id";
import { handleApiError } from "@/lib/server/errors/handle-api-error";
import { getFinanceTransactionStats } from "@/lib/server/services/finance-transaction-service";
import { ValidationError } from "@/lib/server/errors/errors";
import { NextRequest, NextResponse } from "next/server";

function getDefaultDateRange() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const fifteenth = new Date(now.getFullYear(), now.getMonth(), 15, 23, 59, 59, 999);
    const to = now < fifteenth ? now : fifteenth;
    return { fromDate: startOfMonth, toDate: to };
}

export async function GET(request: NextRequest) {
    try {
        const userId = getCurrentUserId(request);

        const fromParam = request.nextUrl.searchParams.get("fromDate");
        const toParam = request.nextUrl.searchParams.get("toDate");

        let fromDate: Date | undefined;
        let toDate: Date | undefined;

        if (fromParam || toParam) {
            fromDate = fromParam ? new Date(fromParam) : undefined;
            toDate = toParam ? new Date(toParam) : undefined;

            if ((fromDate && isNaN(fromDate.getTime())) || (toDate && isNaN(toDate.getTime()))) {
                throw new ValidationError("Invalid date format");
            }
            if (fromDate && toDate && fromDate > toDate) {
                throw new ValidationError("fromDate must be before or equal to toDate");
            }
        } else {
            const defaults = getDefaultDateRange();
            fromDate = defaults.fromDate;
            toDate = defaults.toDate;
        }

        const stats = await getFinanceTransactionStats(userId, { fromDate, toDate });
        return NextResponse.json(stats, { status: 200 });
    } catch (error) {
        return handleApiError(error);
    }
}