import { getCurrentUserId } from "@/lib/auth/get-current-user-id";
import { handleApiError } from "@/lib/server/errors/handle-api-error";
import { updateFinanceCategory } from "@/lib/server/services/finance-category-service";
import { updateFinanceCategorySchema } from "@/schemas/finance/category-schema";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const userId = getCurrentUserId(request);
        const { id } = await params;
        const body = await request.json();
        const data = updateFinanceCategorySchema.parse(body);

        const category = await updateFinanceCategory(userId, id, data);
        return NextResponse.json({ category }, { status: 200 });
    } catch (error) {
        return handleApiError(error);
    }
}