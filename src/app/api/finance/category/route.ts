import { getCurrentUserId } from "@/lib/auth/get-current-user-id";
import { handleApiError } from "@/lib/server/errors/handle-api-error";
import { createFinanceCategory } from "@/lib/server/services/finance-category-service";
import { createFinanceCategorySchema } from "@/schemas/finance/category-schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const userId = getCurrentUserId(request);
        const body = await request.json();
        const data = createFinanceCategorySchema.parse(body);
        const category = await createFinanceCategory(userId, data);
        return NextResponse.json({ category }, { status: 201 });
    } catch (error) {
        return handleApiError(error);
    }
}