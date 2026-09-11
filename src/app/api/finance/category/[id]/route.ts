import { getCurrentUserId } from "@/lib/auth/get-current-user-id";
import { handleApiError } from "@/lib/server/errors/handle-api-error";
import {
    getFinanceCategoryById,
    softDeleteFinanceCategory,
    updateFinanceCategory,
} from "@/lib/server/services/finance-category-service";
import { validateIdParam } from "@/lib/server/validation/validate-id-params";
import { updateFinanceCategorySchema } from "@/schemas/finance/category-schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const userId = getCurrentUserId(request);
        const { id: rawId } = await params;
        const id = validateIdParam(rawId, "Category");

        const category = await getFinanceCategoryById(userId, id);
        return NextResponse.json({ category }, { status: 200 });
    } catch (error) {
        return handleApiError(error);
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const userId = getCurrentUserId(request);
        const { id: rawId } = await params;
        const id = validateIdParam(rawId, "Category");
        const body = await request.json();
        const data = updateFinanceCategorySchema.parse(body);

        const category = await updateFinanceCategory(userId, id, data);
        return NextResponse.json({ category }, { status: 200 });
    } catch (error) {
        return handleApiError(error);
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const userId = getCurrentUserId(request);
        const { id: rawId } = await params;
        const id = validateIdParam(rawId, "Category");

        const category = await softDeleteFinanceCategory(userId, id);
        return NextResponse.json({ category }, { status: 200 });
    } catch (error) {
        return handleApiError(error);
    }
}