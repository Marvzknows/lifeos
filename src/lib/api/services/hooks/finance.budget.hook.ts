import { ApiError } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BudgetPayloadT, UpdateBudgetPayloadT } from "@/schemas/finance/budget-schema";
import { financeBudgetService } from "../finance.budget.services";
import { BudgetsListResponseT, BudgetT } from "@/app/(dashboard)/(FINANCE)/budget/types";

export const financeBudgetKeys = {
    all: ["financeBudgets"] as const,

    lists: () => [...financeBudgetKeys.all, "list"] as const,
    list: (month: string) => [...financeBudgetKeys.lists(), month] as const,

    details: () => [...financeBudgetKeys.all, "detail"] as const,
    detail: (id: string) => [...financeBudgetKeys.details(), id] as const,
};

// Get budgets (with spent / remaining / progress) for a month, "YYYY-MM"
export const useFinanceBudgets = (month: string) => {
    return useQuery<BudgetsListResponseT, ApiError>({
        queryKey: financeBudgetKeys.list(month),
        queryFn: () => financeBudgetService.getAll(month),
        placeholderData: (previousData) => previousData,
        enabled: !!month,
    });
};

// Get budget by ID
export const useViewFinanceBudget = (id: string) => {
    return useQuery<BudgetT, ApiError>({
        queryKey: financeBudgetKeys.detail(id),
        queryFn: () => financeBudgetService.getById(id),
        enabled: !!id,
    });
};

// Create budget
export const useCreateFinanceBudget = () => {
    const queryClient = useQueryClient();

    return useMutation<BudgetT, ApiError, BudgetPayloadT>({
        mutationFn: (data) => financeBudgetService.create(data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: financeBudgetKeys.lists() });
        },
    });
};

// Update budget (amount only)
export const useUpdateFinanceBudget = () => {
    const queryClient = useQueryClient();

    return useMutation<BudgetT, ApiError, { id: string; data: UpdateBudgetPayloadT }>({
        mutationFn: ({ id, data }) => financeBudgetService.update(id, data),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: financeBudgetKeys.lists() });
            queryClient.invalidateQueries({ queryKey: financeBudgetKeys.detail(variables.id) });
        },
    });
};

// Delete budget (permanent)
export const useDeleteFinanceBudget = () => {
    const queryClient = useQueryClient();

    return useMutation<void, ApiError, string>({
        mutationFn: (id) => financeBudgetService.delete(id),

        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: financeBudgetKeys.lists() });
            queryClient.removeQueries({ queryKey: financeBudgetKeys.detail(id) });
        },
    });
};