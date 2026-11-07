import { getCurrentUserId } from "@/lib/auth/get-current-user-id";
import { handleApiError } from "@/lib/server/errors/handle-api-error";
import { restoreFinanceCategory } from "@/lib/server/services/finance-category-service";
import { validateIdParam } from "@/lib/server/validation/validate-id-params";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const userId = getCurrentUserId(request);
        const { id: rawId } = await params;
        const id = validateIdParam(rawId, "Category");

        const category = await restoreFinanceCategory(userId, id);
        return NextResponse.json({ category }, { status: 200 });
    } catch (error) {
        return handleApiError(error);
    }
}