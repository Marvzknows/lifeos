import { getCurrentUserId } from "@/lib/auth/get-current-user-id";
import { handleApiError } from "@/lib/server/errors/handle-api-error";
import {
    deleteBudget,
    getBudgetById,
    updateBudget,
} from "@/lib/server/services/finance-budget-service";
import { validateIdParam } from "@/lib/server/validation/validate-id-params";
import { updateBudgetSchema } from "@/schemas/finance/budget-schema";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: RouteContext) {
    try {
        const userId = getCurrentUserId(request);
        const id = validateIdParam((await params).id, "Budget");

        const budget = await getBudgetById(userId, id);
        return NextResponse.json({ budget }, { status: 200 });
    } catch (error) {
        return handleApiError(error);
    }
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
    try {
        const userId = getCurrentUserId(request);
        const id = validateIdParam((await params).id, "Budget");
        const body = await request.json();
        const data = updateBudgetSchema.parse(body);

        const budget = await updateBudget(userId, id, data);
        return NextResponse.json({ budget }, { status: 200 });
    } catch (error) {
        return handleApiError(error);
    }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
    try {
        const userId = getCurrentUserId(request);
        const id = validateIdParam((await params).id, "Budget");

        await deleteBudget(userId, id);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return handleApiError(error);
    }
}