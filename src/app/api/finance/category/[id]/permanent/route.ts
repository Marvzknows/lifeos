import { getCurrentUserId } from "@/lib/auth/get-current-user-id";
import { handleApiError } from "@/lib/server/errors/handle-api-error";
import { hardDeleteFinanceCategory } from "@/lib/server/services/finance-category-service";
import { validateIdParam } from "@/lib/server/validation/validate-id-params";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const userId = getCurrentUserId(request);
        const { id: rawId } = await params;
        const id = validateIdParam(rawId, "Category");

        await hardDeleteFinanceCategory(userId, id);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return handleApiError(error);
    }
}